/* Vertex institutional documents. All links come from 00 General / Documents / Output.
   Drive sharing is managed separately; this script never changes permissions. */
(function(){
  "use strict";
  const documents=[["identity","file-text","1beZCQBOXTKgIbuRWefFCqfiCIiv2BEkh","1-2Y8jZYOHMBXJtRihj6nQiRo0MCgHUjD"],["plan","route","1ilCDPNlgfXO_5J2-KjHJYK_cvwZsAPj9","1gotaw8yT0ToyOUlC2oquqv-L-vyQ2Z30"],["organization","sitemap","1iA4molMqj_5Y12YhxCO0vjNbZ9OE3WzU","1Zc37VS0E0LTShLBl0z_oapU4PpafbLFX"],["career","briefcase","1tUaQeslYHh77okuw7wGlV1443q-JE8UL","1ct7FONz9urRzJ-lZ3BIbxlB_h1mtKVY6"],["work","clipboard-check","1SASdzJhfouNGCc6VDk_t2keYx7apIWq2","1Qyx5evtPWfOzixWxPHDqX-KsJiVZL06z"],["communication","messages","1alLJrZUhG9053X-mVIaj77jqqfXGd8HN","1i-aO1j1nFq6UJqSlro3Rhekka9NoDOqo"],["coordination","circles-relation","1CQau-iFbaoNSpkQ_x4ifCpkcr4QGCtbf","1nHpgHMwYHONUyHG8C9rpqT_6tq5pATQM"],["meetings","calendar-event","1xeF5dlnK13PkVqpO7-rj2swZsaiVa7_w","12GtYE7-EE11qfu5hACOPuQf0eMHTMFLc"],["culture","users","1lOd1CFgI6EQ-R6QCeYO41IUfS4L8iCC1","1IAWQ-sNrkquPWShYR1HpHiH6qYSWnaOy"]];
  const copy=window.__vertexDocumentsTranslations || {};
  const english=[["Vertex Identity","Explore our origins, legal identity and journey through technology. Learn how we define our company and its development in one reference."],["Vertex Plan","Discover our long-term direction and growth roadmap. Learn how strategic stages, priorities and responsibilities shape our plans."],["Organizational Structure","Meet our leadership layers, departments and areas of responsibility. Understand how roles and decision-making are organized."],["Career Principles","Explore the journey from application and onboarding to professional growth. See how membership, evaluation and contribution are handled."],["Working Procedures","Learn how tasks are chosen, managed and completed at Vertex. Discover our approach to flexible work and accountability for outcomes."],["Communication Principles","Understand our approach to internal and external communication. Explore our standards for respectful collaboration, representation and trustworthy information."],["Coordination Principles","Explore how teams collaborate, report progress and resolve obstacles. Learn how ownership and coordination work across the organization."],["Meeting Principles","Learn about our meeting formats, participants and decision processes. Discover our standards for focused meetings that lead to action."],["Vertex Culture","Explore our shared values and the way we work together. Learn about a culture built on respect, trust, accountability and growth."]];
  const turkish=[["Vertex Kimliği","Vertex'in tarihini, hukuki kimliğini ve teknolojik yolculuğunu keşfedin. Şirketin kurumsal tanımını ve gelişimini tek belgede inceleyin."],["Vertex Planı","Uzun vadeli hedeflerimizi ve büyüme yol haritamızı öğrenin. Stratejik aşamalarımızın hangi ilkelerle planlandığını görün."],["Organizasyonel Yapı","Yönetim kademelerimizi, departmanlarımızı ve sorumluluk alanlarını tanıyın. Kurum içindeki görev ve karar yapısını inceleyin."],["Kariyer Esasları","Başvurudan oryantasyona ve kariyer gelişimine uzanan süreçleri keşfedin. Üyelik, değerlendirme ve katkının nasıl ele alındığını öğrenin."],["Çalışma Usulleri","Vertex'te görevlerin nasıl seçildiğini, yürütüldüğünü ve tamamlandığını okuyun. Esnek çalışma ve sonuç odaklı sorumluluk ilkelerimizi tanıyın."],["İletişim Esasları","Kurum içindeki ve dışındaki iletişim yaklaşımımızı öğrenin. Saygılı iş birliği, doğru temsil ve güvenilir bilgi paylaşımına ilişkin ilkeleri inceleyin."],["Koordinasyon Esasları","Ekipler arası iş birliği ve raporlama süreçlerimizi keşfedin. Görev sahipliğinin ve sorun çözme mekanizmalarının nasıl çalıştığını görün."],["Toplantı Esasları","Toplantı türlerimizi, katılımcı düzenimizi ve karar süreçlerimizi tanıyın. Verimli, amaç odaklı toplantılar için izlediğimiz kuralları inceleyin."],["Vertex Kültürü","Ortak değerlerimizi ve birlikte çalışma anlayışımızı keşfedin. Saygı, güven, sorumluluk ve öğrenme üzerine kurduğumuz kültürü tanıyın."]];
  const tabler={
    "file-text":'<path d="M14 2v6h6"/><path d="M4 4a2 2 0 0 1 2 -2h8l6 6v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"/><path d="M8 13h8m-8 4h8"/>',
    "route":'<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a4 4 0 0 0 0 -8h-4a4 4 0 0 1 0 -8h6"/>',
    "sitemap":'<rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="9" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v6m-7 4v-4h14v4m-7 -4v4"/>',
    "briefcase":'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2M3 13a20 20 0 0 0 18 0m-9 0v2"/>',
    "clipboard-check":'<rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 14l2 2l4 -4"/>',
    "messages":'<path d="M7 19l-4 3v-13a3 3 0 0 1 3 -3h9a3 3 0 0 1 3 3v7a3 3 0 0 1 -3 3z"/><path d="M8 10h6m-6 4h4M10 3h8a3 3 0 0 1 3 3v9"/>',
    "circles-relation":'<circle cx="5" cy="8" r="3"/><circle cx="19" cy="8" r="3"/><circle cx="12" cy="19" r="3"/><path d="M7.8 9.3l2.8 7.1m5.6 -7.1l-2.8 7.1M8 8h8"/>',
    "calendar-event":'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10 -4v4M3 11h18m-13 5h3"/>',
    "users":'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6m1 3a5 5 0 0 1 3 5v1"/>'
  };
  function element(tag,classname){
    const el=document.createElement(tag);
    if(classname)el.className=classname;
    return el;
  }
  function icon(name){
    const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("viewBox","0 0 24 24");
    svg.setAttribute("fill","none");
    svg.setAttribute("stroke","currentColor");
    svg.setAttribute("stroke-width","1.7");
    svg.setAttribute("stroke-linecap","round");
    svg.setAttribute("stroke-linejoin","round");
    svg.setAttribute("aria-hidden","true");
    svg.setAttribute("focusable","false");
    svg.innerHTML=tabler[name]||tabler["file-text"];
    return svg;
  }
  function render(){
    const grid=document.querySelector("#more-info-grid");
    if(!grid||grid.dataset.ready)return;
    const lang=(document.documentElement.lang||"en").toLowerCase().split("-")[0];
    const localized=lang==="tr"?turkish:(copy[lang]||english);
    if(!Array.isArray(localized)||localized.length!==9)return;
    const fragment=document.createDocumentFragment();
    documents.forEach(([key,symbol,trId,enId],index)=>{
      const card=element("a","more-info-card"+(index===0?" more-info-card--featured":""));
      card.href="https://drive.google.com/file/d/"+(lang==="tr"?trId:enId)+"/view";
      card.target="_blank";
      card.rel="noopener noreferrer";
      card.dataset.document=key;
      card.style.setProperty("--card-index",index);
      const iconArea=element("span","more-info-icon");
      iconArea.appendChild(icon(symbol));
      const divider=element("span","more-info-divider");
      divider.setAttribute("aria-hidden","true");
      const content=element("span","more-info-content");
      const heading=element("span","more-info-title");
      heading.textContent=localized[index][0];
      const description=element("span","more-info-description");
      description.textContent=localized[index][1];
      content.append(heading,description);
      const arrow=element("span","more-info-arrow");
      arrow.setAttribute("aria-hidden","true");
      arrow.textContent="↗";
      card.append(iconArea,divider,content,arrow);
      fragment.appendChild(card);
    });
    grid.replaceChildren(fragment);
    grid.dataset.ready="true";
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",render,{once:true});
  else render();
})();