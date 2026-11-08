/* Use the same verified publication contract as the application booker. */
(() => {
  'use strict';
  const link=document.querySelector('[data-solutions-contact]');
  if(!link)return;
  const booking='https://cal.com/team/vertex/15-minutes-meeting';
  const whatsapp='https://wa.me/447400412824';
  const endpoint='https://europe-west1-vertex-ai-1618.cloudfunctions.net/getInterviewAvailability?kind=solutions';
  let pending,checkedAt=0,available=false,busy=false;
  async function check(){
    if(pending)return pending;
    pending=(async()=>{
      try{
        const response=await fetch(endpoint,{cache:'no-store',credentials:'omit',signal:AbortSignal.timeout(8500)});
        const data=response.ok?await response.json():null;
        available=data?.available===true&&Number.isFinite(data.checkedAt)&&Math.abs(Date.now()-data.checkedAt)<30000;
      }catch{available=false;}
      checkedAt=Date.now();
      return available;
    })();
    try{return await pending;}finally{pending=null;}
  }
  void check();
  function team(){document.querySelector('a[href="#team"]')?.click();}
  link.addEventListener('click',async event=>{
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();if(busy)return;busy=true;
    // Open within the gesture, before awaiting the publication check.
    const destination=window.open('about:blank','_blank');
    if(destination)destination.opener=null;
    link.setAttribute('aria-busy','true');
    try{
      if(Date.now()-checkedAt>15000)await check();
      if(!destination||destination.closed){team();return;}
      destination.location.replace(available?booking:whatsapp);
      // Universal WhatsApp links support both the app and the web client.
      // Cross-origin/app success is not observable: keep the team available
      // in this tab if WhatsApp cannot open on the visitor's device.
      if(!available)team();
    }catch{try{destination?.close();}catch{}team();}
    finally{busy=false;link.removeAttribute('aria-busy');}
  });
})();
