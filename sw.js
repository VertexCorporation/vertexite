/* Cache only public static, non-sensitive assets for seven days.
   Dynamic team/news POST requests use js/public-data-cache.js instead. */
const STATIC_CACHE = 'vertex-static-v5';
const META_CACHE = 'vertex-static-meta-v5';
const WEEK = 7 * 24 * 60 * 60 * 1000;
self.addEventListener('install',event=>{event.waitUntil(self.skipWaiting());});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(names.filter(name=>name.startsWith('vertex-') && name!==STATIC_CACHE && name!==META_CACHE)
      .map(name=>caches.delete(name)));
    await self.clients.claim();
  })());
});
function staticAsset(url) {
  if(url.origin!==self.location.origin)return false;
  if(!/^\/assets\/(?:geo|lottie|team|partners|fonts)\//.test(url.pathname))return false;
  return /\.(?:json|svg|png|jpe?g|webp|woff2)$/.test(url.pathname);
}
function metaRequest(request) {
  return new Request(new URL('/__vertex_cache_meta?url='+encodeURIComponent(request.url),self.registration.scope).href);
}
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(!staticAsset(url))return;
  event.respondWith((async()=>{
    const content=await caches.open(STATIC_CACHE),meta=await caches.open(META_CACHE);
    const saved=await content.match(request),metaKey=metaRequest(request);
    let savedAt=0;
    try{const stamp=await meta.match(metaKey);if(stamp)savedAt=Number(await stamp.text());}catch(_){}
    if(saved && savedAt>0 && Date.now()-savedAt<WEEK)return saved;
    try{
      const response=await fetch(request);
      if(response && response.ok){
        event.waitUntil(Promise.all([
          content.put(request,response.clone()),
          meta.put(metaKey,new Response(String(Date.now()),{headers:{'Content-Type':'text/plain'}}))
        ]).catch(()=>{}));
      }
      return response;
    }catch(error){
      if(saved)return saved; // Static offline fallback, even if expired.
      throw error;
    }
  })());
});
