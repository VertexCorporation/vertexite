/* Presentation only: native form values, validation and booking remain authoritative. */
(() => {
  const form = document.getElementById('joinForm');
  if (!form) return;
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const moving = new WeakMap();
  function panelMotion(panel, open) {
    moving.get(panel)?.cancel();
    if (open) panel.hidden = false;
    panel.style.pointerEvents = '';
    if (reduced.matches || !panel.animate) { panel.hidden = !open; return; }
    const frames = [{opacity:0,transform:'translateY(4px) scale(.98)'},{opacity:1,transform:'translateY(0) scale(1)'}];
    panel.style.pointerEvents = open ? '' : 'none';
    const animation = panel.animate(open ? frames : [...frames].reverse(), {duration:open?200:150,easing:'cubic-bezier(.2,.8,.2,1)'});
    moving.set(panel, animation);
    animation.finished.then(() => {
      if (moving.get(panel) !== animation) return;
      panel.hidden = !open; panel.style.pointerEvents = ''; moving.delete(panel);
    }).catch(() => {});
  }

  // The library closes immediately for correct focus/ARIA state. A short inert
  // visual snapshot supplies the exit motion without delaying its actual close.
  const phone = document.getElementById('joinPhone');
  let phonePanel = null, snapshot = null;
  function rememberPhone() {
    if (!phonePanel || phonePanel.classList.contains('iti__hide')) return;
    const rect = phonePanel.getBoundingClientRect();
    snapshot = {rect, node:phonePanel.cloneNode(true)};
  }
  phone?.addEventListener('open:countryselector', () => {
    document.querySelectorAll('.iti-exit-shell').forEach(el => el.remove());
    phonePanel = document.querySelector('.iti__country-selector:not(.iti__hide)');
    if (!phonePanel) return;
    rememberPhone();
    if (!reduced.matches) phonePanel.animate([{opacity:0,transform:'translateY(4px) scale(.98)'},{opacity:1,transform:'none'}], {duration:200,easing:'cubic-bezier(.2,.8,.2,1)'});
  });
  document.addEventListener('pointerdown', rememberPhone, true);
  document.addEventListener('keydown', rememberPhone, true);
  phone?.addEventListener('close:countryselector', () => {
    phonePanel = null;
    if (!snapshot || reduced.matches) return;
    const {rect, node} = snapshot; snapshot = null;
    const shell = document.createElement('div'); shell.className = 'iti iti-exit-shell'; shell.inert = true; shell.setAttribute('aria-hidden','true');
    shell.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;z-index:1070;pointer-events:none;overflow:hidden`;
    [node, ...node.querySelectorAll('[id]')].forEach(el => el.removeAttribute('id'));
    node.classList.remove('iti__hide'); node.style.cssText = 'position:static;width:100%;height:100%;max-height:100%;margin:0';
    shell.append(node); document.body.append(shell);
    shell.animate([{opacity:1,transform:'none'},{opacity:0,transform:'translateY(4px) scale(.98)'}], {duration:150,easing:'ease-out'}).finished.then(()=>shell.remove()).catch(()=>shell.remove());
  });

  // A listbox adds consistent motion while keeping the existing select as the
  // single value and validation source consumed by the application integration.
  const select = document.getElementById('joinTeam');
  if (!select) return;
  const label = document.querySelector('label[for="joinTeam"]');
  if (label) label.id ||= 'joinTeamLabel';
  const wrap = document.createElement('div'); wrap.className = 'application-select';
  select.before(wrap); wrap.append(select);
  const button = document.createElement('button'); button.type = 'button'; button.className = 'application-select-trigger';
  button.id = 'joinTeamTrigger'; button.setAttribute('role','combobox'); button.setAttribute('aria-haspopup','listbox');button.setAttribute('aria-expanded','false');button.setAttribute('aria-required',String(select.required));
  button.setAttribute('aria-labelledby',`${label?.id || ''} joinTeamValue`.trim());
  const value = document.createElement('span');value.id = 'joinTeamValue';button.append(value);
  const list = document.createElement('div');list.id = 'joinTeamOptions';list.className = 'application-options';list.hidden = true;list.setAttribute('role','listbox');if(label)list.setAttribute('aria-labelledby',label.id);
  button.setAttribute('aria-controls',list.id);
  const error = document.createElement('small');error.id = 'joinTeamError';error.className = 'application-select-error';error.hidden = true;error.setAttribute('role','alert');button.setAttribute('aria-describedby',error.id);
  wrap.append(button,list,error);
  const options = [...select.options].filter(o=>!o.disabled && o.value), items = options.map((option,i)=>{
    const item = document.createElement('div'); item.className = 'application-option';item.id = `joinTeamOption-${i}`;item.setAttribute('role','option');item.textContent = option.textContent;list.append(item);
    item.addEventListener('pointerdown',e=>e.preventDefault());
    item.addEventListener('click',()=>choose(i));return item;
  });
  let open = false, active = 0, typed = '', typeTimer;
  function sync() {
    value.textContent = select.selectedOptions[0]?.textContent || '';
    items.forEach((item,i)=>item.setAttribute('aria-selected',String(select.value===options[i].value)));
    if (select.validity.valid) {error.hidden = true;button.removeAttribute('aria-invalid');}
  }
  function highlight(i) {
    active = (i + items.length) % items.length;
    items.forEach((item,j)=>item.classList.toggle('is-active',j===active));
    button.setAttribute('aria-activedescendant',items[active].id);
    if (open) items[active].scrollIntoView({block:'nearest'});
  }
  function toggle(next) {
    open = next;list.inert = !open;list.setAttribute('aria-hidden',String(!open));button.setAttribute('aria-expanded',String(open));
    if (open) {
      list.hidden = false;const rect = button.getBoundingClientRect();
      wrap.classList.toggle('opens-above',rect.bottom+Math.min(list.scrollHeight,340)>innerHeight-12 && rect.top>Math.min(list.scrollHeight,340)+12);
      highlight(Math.max(0,options.findIndex(o=>o.value===select.value)));
    } else button.removeAttribute('aria-activedescendant');
    panelMotion(list,open);
  }
  function choose(i) {
    select.value = options[i].value;select.dispatchEvent(new Event('input',{bubbles:true}));select.dispatchEvent(new Event('change',{bubbles:true}));sync();toggle(false);button.focus({preventScroll:true});
  }
  button.addEventListener('click',()=>toggle(!open));
  button.addEventListener('keydown',e=>{
    if (['ArrowDown','ArrowUp','Home','End'].includes(e.key)) {e.preventDefault();const wasOpen=open;if(!open)toggle(true);highlight(e.key==='Home'?0:e.key==='End'?items.length-1:wasOpen?active+(e.key==='ArrowDown'?1:-1):active);}
    else if (e.key==='Escape' && open) {e.preventDefault();toggle(false);}
    else if ((e.key==='Enter'||e.key===' ') && open) {e.preventDefault();choose(active);}
    else if (e.key==='Tab' && open) toggle(false);
    else if (e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&e.key!==' ') {e.preventDefault();typed+=e.key;clearTimeout(typeTimer);typeTimer=setTimeout(()=>typed='',800);const i=options.findIndex(o=>o.textContent.trim().toLocaleLowerCase().startsWith(typed.toLocaleLowerCase()));if(i>=0){if(!open)toggle(true);highlight(i);}}
  });
  document.addEventListener('pointerdown',e=>{if(open&&!wrap.contains(e.target))toggle(false);});
  select.addEventListener('change',sync);
  select.addEventListener('invalid',e=>{e.preventDefault();button.setAttribute('aria-invalid','true');error.textContent=select.validationMessage;error.hidden=false;button.focus({preventScroll:true});});
  label?.addEventListener('click',e=>{e.preventDefault();button.focus();});
  form.addEventListener('reset',()=>setTimeout(()=>{toggle(false);sync();error.hidden=true;button.removeAttribute('aria-invalid');},0));
  // The source stays focusable for native validation/programmatic integrations,
  // but only the enhanced combobox is exposed to keyboard and screen readers.
  select.classList.add('enhanced-select-source');select.tabIndex=-1;select.setAttribute('aria-hidden','true');sync();
})();
