/* Public read-only data cache. Never cache account, application or verification requests. */
(function (root) {
  'use strict';
  var PREFIX = 'vertex-public-v3:', WEEK = 7 * 24 * 60 * 60 * 1000;
  var MAX_STALE = 30 * 24 * 60 * 60 * 1000;
  var memory = Object.create(null), pending = Object.create(null);
  function storage() { try { return root.localStorage; } catch (_) { return null; } }
  function read(key) {
    var raw = memory[key], store = storage();
    if (!raw && store) { try { raw = store.getItem(PREFIX + key); } catch (_) {} }
    if (!raw) return null;
    try {
      var entry = JSON.parse(raw), age = Date.now() - entry.savedAt;
      if (entry.v !== 3 || !Number.isFinite(age) || age < -60000 || age > MAX_STALE || entry.value == null) return null;
      return { value: entry.value, savedAt: entry.savedAt, age: Math.max(0, age), fresh: age < WEEK };
    } catch (_) { return null; }
  }
  function save(key, value) {
    var raw;
    try { raw = JSON.stringify({v:3,savedAt:Date.now(),value:value}); } catch (_) { return false; }
    memory[key] = raw;
    var store = storage();
    if (store) {
      try { store.setItem(PREFIX + key, raw); }
      catch (_) {
        /* Storage quota: prune only this application's old public snapshots. */
        try {
          Object.keys(store).filter(function(k){ return k.startsWith(PREFIX) && k !== PREFIX + key; })
            .forEach(function(k){ var e; try{e=JSON.parse(store.getItem(k));}catch(_){} if(!e || Date.now() - e.savedAt > WEEK)store.removeItem(k); });
          store.setItem(PREFIX + key, raw);
        } catch (_) {}
      }
    }
    return true;
  }
  function cooldown(key, duration) {
    var store = storage();
    if (!store) return;
    try { store.setItem(PREFIX + 'retry:' + key, String(Date.now() + duration)); } catch (_) {}
  }
  function blocked(key) {
    var store=storage(); if(!store)return false;
    try { return Number(store.getItem(PREFIX + 'retry:' + key)) > Date.now(); } catch (_) { return false; }
  }
  function release(key) {
    var store=storage(); if(!store)return;
    try { store.removeItem(PREFIX + 'retry:' + key); } catch (_) {}
  }
  function load(key, loader, validate, options) {
    options=options||{};
    var cached=read(key), ttl=Number.isFinite(options.ttl)?options.ttl:WEEK;
    if(cached && cached.age < ttl && (!validate || validate(cached.value)))
      return Promise.resolve({value:cached.value,source:'cache'});
    if(blocked(key)) {
      if(cached && (!validate || validate(cached.value)))return Promise.resolve({value:cached.value,source:'stale'});
      return Promise.reject(new Error('temporary request cooldown'));
    }
    if(pending[key])return pending[key];
    pending[key]=Promise.resolve().then(loader).then(function(value){
      if(validate && !validate(value))throw new Error('invalid public data');
      save(key,value);release(key);
      return {value:value,source:'network'};
    }).catch(function(error){
      cooldown(key,options.cooldownMs||120000);
      if(cached && (!validate || validate(cached.value)))return {value:cached.value,source:'stale'};
      throw error;
    }).finally(function(){delete pending[key];});
    return pending[key];
  }
  function fetchJSON(url, options, timeoutMs) {
    var abort=typeof AbortController!=='undefined'?new AbortController():null;
    var timer=abort?setTimeout(function(){abort.abort();},timeoutMs||11000):null;
    var opts=Object.assign({credentials:'omit'},options||{});
    if(abort)opts.signal=abort.signal;
    return fetch(url,opts).then(function(res){
      if(!res.ok)throw new Error('public endpoint '+res.status);
      return res.json();
    }).finally(function(){if(timer)clearTimeout(timer);});
  }
  root.VertexPublicCache = {WEEK:WEEK,read:read,save:save,load:load,fetchJSON:fetchJSON};
})(window);
