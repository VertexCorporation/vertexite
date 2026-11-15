// Public biographies use the existing Console-managed directory and HTML shell.
// Only the routes in _routes.json invoke this worker; all other assets stay static.
const languages = ['ar','az','de','en','es','fr','hi','id','it','ja','ko','nl','pt','ru','tr','zh'];
const designTitles = {"tr":"Tasarım Direktörü (CDO)","en":"Chief Design Officer (CDO)","de":"Designvorstand (CDO)","es":"Director de Diseño (CDO)","fr":"Directeur du Design (CDO)","it":"Direttore del Design (CDO)","ja":"最高デザイン責任者 (CDO)","ko":"최고디자인책임자 (CDO)","pt":"Diretor de Design (CDO)","ru":"Директор по дизайну (CDO)","zh":"首席设计官 (CDO)","ar":"الرئيس التنفيذي للتصميم (CDO)","hi":"मुख्य डिजाइन अधिकारी (CDO)","id":"Direktur Desain (CDO)","nl":"Directeur Ontwerp (CDO)","az":"Dizayn Direktoru (CDO)"};
const origin = 'https://vertexishere.com';
const photoVariants = {"https://firebasestorage.googleapis.com/v0/b/vertex-ai-1618.firebasestorage.app/o/site-team%2Fphotos%2F2f87e5dc17c3a041c6e3e659fa9ee431901575fb02ca86034a4ec0d311978f4a.png":"/assets/team/optimized-a2b2e41b727efc13.webp","https://firebasestorage.googleapis.com/v0/b/vertex-ai-1618.firebasestorage.app/o/site-team%2Fphotos%2F18d0a45bf26e56d18a0741277d68157f0eace2dc0b3aba55766c664b0935c3d8.png":"/assets/team/optimized-6543b8e5f3a24269.webp","https://firebasestorage.googleapis.com/v0/b/vertex-ai-1618.firebasestorage.app/o/site-team%2Fphotos%2Fd24f2869733cd79a9c0371aed2350d6deb730e0bb2e4a18e30878826e3c998bc.png":"/assets/team/optimized-0f9329f6a824355c.webp","https://firebasestorage.googleapis.com/v0/b/vertex-ai-1618.firebasestorage.app/o/site-team%2Fphotos%2F6789fcbb5bbd5d62cf5596c0d6e6585ace3a2fe472f86005ea75e9fff82eb1ff.png":"/assets/team/optimized-8139f801d983d216.webp","https://firebasestorage.googleapis.com/v0/b/vertex-ai-1618.firebasestorage.app/o/site-team%2Fphotos%2Feeb8df59df0ddb78fa682ef9cee1a11530137d3faac39a010de4e83daf8e7e15.png":"/assets/team/optimized-6d012e2077f00040.webp","https://firebasestorage.googleapis.com/v0/b/vertex-ai-1618.firebasestorage.app/o/site-team%2Fphotos%2Fbffc6621ea7e10651ab9a93a79f7833b8c2b2f1f33222e5c6d73076b32ba0a6a.png":"/assets/team/optimized-6fc059891c5452fd.webp","https://firebasestorage.googleapis.com/v0/b/vertex-ai-1618.firebasestorage.app/o/site-team%2Fphotos%2Ff532f5a600b5b8ae63ad69c8f45d879e6a57760d3b254fc563d9680b4414ec26.png":"/assets/team/optimized-f48e07831bf6dc58.webp","https://firebasestorage.googleapis.com/v0/b/vertex-ai-1618.firebasestorage.app/o/site-team%2Fphotos%2Fdf6e7d56c45f9610907e67e297b748a0723d387e788ad466b2274dc4fee1b6cd.png":"/assets/team/optimized-7833709e5029c9f9.webp"};
function optimizedPhoto(value) {
  if (!value) return null;
  const url = new URL(value), key = url.origin + url.pathname;
  return photoVariants[key] ? origin + photoVariants[key] : value;
}
const endpoint = 'https://listsiteteam-o5h7dmtija-ew.a.run.app/';
const ids = /^[a-zA-Z0-9_-]{1,128}$/;
const memory = new Map();
const pending = new Map();
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
function safeUrl(value) {
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : null; } catch { return null; }
}
function biography(card, lang) {
  const value = key => typeof card?.biographies?.[key] === 'string' ? card.biographies[key].trim() : '';
  return value(lang) || value(card?.bioSourceLang) || (typeof card?.bio === 'string' ? card.bio.trim() : '') || value('en') || value('tr');
}
function translated(card, lang) {
  return !!card.biographies?.[lang]?.trim() || (card.bioSourceLang === lang && !!card.bio?.trim());
}
function founder(card) {
  return card?.positionCode === 'CEO' && String(card.name).toLocaleLowerCase('tr').replace(/ı/g,'i').normalize('NFD').replace(/[\u0300-\u036f]/g,'') === 'mustafa caki';
}
function profileUrl(card, lang) {
  return origin + '/' + lang + (founder(card) ? '/mustafa' : '/profile?id=' + encodeURIComponent(card.id));
}
function socialLinks(card) {
  const aliases = {linkedin:'linkedin',instagram:'instagram',twitter:'x',x:'x',tiktok:'tiktok',mail:'email',email:'email','e-mail':'email'};
  const labels = {linkedin:'LinkedIn',instagram:'Instagram',x:'X',tiktok:'TikTok',email:'Email'};
  return (Array.isArray(card.links) ? card.links : []).flatMap(link => {
    const key = aliases[String(link.label).trim().toLowerCase()];
    if (!key) return [];
    let href = safeUrl(link.url);
    if (key === 'email') {
      const address = String(link.url || '').replace(/^mailto:/i,'');
      href = /^[A-Za-z0-9.!#$&'*+\/=^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,63}$/.test(address) && address.length <= 254 ? 'mailto:' + address : null;
    }
    return href ? [{key, label:labels[key], href}] : [];
  }).sort((a,b) => ['linkedin','instagram','x','tiktok','email'].indexOf(a.key) - ['linkedin','instagram','x','tiktok','email'].indexOf(b.key));
}
function cleanCards(data) {
  if (!Array.isArray(data?.cards) || data.cards.length > 50) throw Error('Invalid public directory');
  return {cards:data.cards.filter(c => ids.test(c.id) && typeof c.name === 'string' && c.name.length <= 200).map(c => ({
    id:c.id, name:c.name, position:String(c.position || '').slice(0,200), positionCode:c.positionCode,
    imageUrl:safeUrl(c.imageUrl), links:socialLinks(c).map(l => ({label:l.label,url:l.href})),
    biographies:Object.fromEntries(languages.filter(l => typeof c.biographies?.[l] === 'string' && c.biographies[l].length <= 100000).map(l => [l,c.biographies[l]])),
    bio:typeof c.bio === 'string' ? c.bio.slice(0,100000) : '', bioSourceLang:languages.includes(c.bioSourceLang) ? c.bioSourceLang : 'en',
  }))};
}
async function directory(lang, ctx) {
  const local = memory.get(lang);
  if (local && Date.now() - local.at < 60000) return local.value;
  if (pending.has(lang)) return pending.get(lang);
  const task = (async () => {
    const cache = globalThis.caches?.default;
    const key = new Request(origin + '/__profile-directory-v1?lang=' + lang);
    let cached;
    try { cached = await cache?.match(key); } catch {}
    if (cached && Date.now() - Number(cached.headers.get('X-Profile-Fetched-At') || 0) < 60000) {
      const value = cleanCards(await cached.json()); memory.set(lang,{value,at:Number(cached.headers.get('X-Profile-Fetched-At'))}); return value;
    }
    const response = await fetch(endpoint, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({data:{lang}}),signal:AbortSignal.timeout(8000)});
    if (!response.ok) throw Error('Public directory unavailable');
    const body = await response.text();
    if (body.length > 4000000) throw Error('Oversized public directory');
    const value = cleanCards(JSON.parse(body).result);
    const at = Date.now();
    memory.set(lang,{value,at});
    if (cache) ctx.waitUntil(cache.put(key,new Response(JSON.stringify(value),{headers:{'Content-Type':'application/json','Cache-Control':'public, max-age=60','X-Profile-Fetched-At':String(at)}})).catch(()=>{}));
    return value;
  })();
  pending.set(lang,task);
  try { return await task; } finally { pending.delete(lang); }
}
function fill(html, id, content) {
  const pattern = new RegExp('(<(h1|h2|p|div|article)\\b[^>]*\\bid="' + id + '"[^>]*>)[\\s\\S]*?</\\2>');
  if (!pattern.test(html)) throw Error('Profile template missing ' + id);
  return html.replace(pattern, (_all,open,tag) => open + content + '</' + tag + '>');
}
function renderProfile(template, card, lang, indexable = true) {
  if (card.positionCode === 'CDO') card = {...card,position:designTitles[lang] || designTitles.en};
  const text = biography(card,lang), canonical = profileUrl(card,lang), links = socialLinks(card), image = optimizedPhoto(safeUrl(card.imageUrl));
  const title = card.name + ' | ' + card.position + ' · Vertex';
  const description = (card.name + ' — ' + card.position + '. ' + text.replace(/\s+/g,' ')).slice(0,160);
  const alternates = languages.filter(l => translated(card,l));
  const personId = origin + '/#person-' + encodeURIComponent(card.id);
  const schema = {'@context':'https://schema.org','@type':'ProfilePage','@id':canonical + '#profile',url:canonical,name:title,inLanguage:lang,
    mainEntity:{'@type':'Person','@id':personId,name:card.name,identifier:card.id,url:canonical,jobTitle:card.position,description,
      ...(image ? {image} : {}),sameAs:links.filter(l=>l.key !== 'email').map(l=>l.href),worksFor:{'@type':'Organization','@id':origin + '/#organization',name:'Vertex',url:origin + '/'}}};
  const meta = '<meta name="description" content="' + esc(description) + '">' +
    '<link rel="canonical" href="' + esc(canonical) + '">' +
    alternates.map(l=>'<link rel="alternate" hreflang="' + l + '" href="' + esc(profileUrl(card,l)) + '">').join('') +
    (alternates.includes('en') ? '<link rel="alternate" hreflang="x-default" href="' + esc(profileUrl(card,'en')) + '">' : '') +
    [['og:type','profile'],['og:site_name','Vertex'],['og:title',title],['og:description',description],['og:url',canonical],...(image ? [['og:image',image],['og:image:alt',card.name]] : [])].map(([key,value])=>'<meta property="' + key + '" content="' + esc(value) + '">').join('') +
    '<meta name="twitter:card" content="' + (image ? 'summary_large_image' : 'summary') + '"><meta name="twitter:title" content="' + esc(title) + '"><meta name="twitter:description" content="' + esc(description) + '">' +
    (image ? '<meta name="twitter:image" content="' + esc(image) + '">' : '') +
    '<script type="application/ld+json">' + json(schema) + '</script>' +
    '<script type="application/json" id="vp-data">' + json({version:1,lang,card:{...card,imageUrl:image,links:links.map(l=>({label:l.label,url:l.href})),biographies:{[lang]:text},bio:undefined,bioSourceLang:lang},urls:Object.fromEntries(languages.map(l=>[l,profileUrl(card,l)]))}) + '</script>';
  let html = template.replace(/<title>[\s\S]*?<\/title>/,()=>'<title>' + esc(title) + '</title>')
    .replace(/<meta\s+name="robots"[^>]*>/,'<meta name="robots" content="' + (indexable && translated(card,lang) ? 'index,follow,max-image-preview:large' : 'noindex,follow') + '">')
    .replace('</head>',()=>meta + '</head>')
    .replace(/(<section\b[^>]*id="vp-content") hidden/,'$1 data-server-rendered="true"');
  html = fill(html,'vp-name',esc(card.name));
  html = fill(html,'vp-role',esc(card.position) + ' · Vertex');
  html = fill(html,'vp-bio',text.split(/\n\s*\n/).filter(p=>p.trim()).map(p=>'<p>' + esc(p.trim()) + '</p>').join(''));
  html = fill(html,'vp-photo',image ? '<img src="' + esc(image) + '" alt="' + esc(card.name) + '" width="160" height="160" fetchpriority="high" decoding="async">' : '');
  html = fill(html,'vp-links-title',lang === 'tr' ? 'Bağlantılar' : 'Links');
  html = fill(html,'vp-links',links.map(l=>'<a class="vp-link" data-social="' + l.key + '" href="' + esc(l.href) + '"' + (l.key === 'email' ? '' : ' target="_blank" rel="noopener noreferrer"') + '><img src="/assets/' + l.key + '.svg?v=solid261026e" alt="" width="20" height="20"><span>' + l.label + '</span></a>').join(''));
  html = html.replace(/(<a\b[^>]*class="lang-row[^>]*href=")[^"]*\/([a-z]{2})\/("[^>]*>)/g,(_m,start,l,end)=>start + esc(profileUrl(card,l)) + end);
  return html;
}
function renderSitemap(cards) {
  const rows = cards.flatMap(card=>languages.filter(l=>translated(card,l) && biography(card,l)).map(lang=>'<url><loc>' + esc(profileUrl(card,lang)) + '</loc>' +
    languages.filter(l=>translated(card,l)).map(l=>'<xhtml:link rel="alternate" hreflang="' + l + '" href="' + esc(profileUrl(card,l)) + '"/>').join('') + '</url>'));
  return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' + rows.join('') + '</urlset>';
}
function errorResponse(status, message) {
  return new Response('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="robots" content="noindex,follow"><title>Vertex | Profile</title><h1>' + message + '</h1><a href="/en/#team">Vertex</a></html>',{status,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex','X-Content-Type-Options':'nosniff',...(status===503?{'Retry-After':'60'}:{})}});
}
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url), parts = url.pathname.split('/').filter(Boolean);
    const sitemap = url.pathname === '/sitemap-profiles.xml';
    const lang = languages.includes(parts[0]) ? parts[0] : null;
    const alias = (lang && (parts[1] === 'mustafa' || parts[1] === 'mustafa.html' || parts[1] === 'mustafa-caki' || parts[1] === 'mustafa-caki.html' || (parts[1] === 'team' && parts[2] === 'mustafa-caki'))) || url.pathname.replace(/\/$/,'') === '/team/mustafa-caki';
    const profile = lang && parts.length === 2 && ['profile','profile.html'].includes(parts[1]);
    if (!sitemap && !alias && !profile) return env.ASSETS.fetch(request);
    if (!['GET','HEAD'].includes(request.method)) return new Response(null,{status:405,headers:{Allow:'GET, HEAD','X-Robots-Tag':'noindex'}});
    if (url.hostname === 'www.vertexishere.com') return Response.redirect(origin + url.pathname + url.search,301);
    try {
      const language = lang || 'en';
      if (sitemap) {
        const data = await directory('en',ctx);
        return new Response(request.method==='HEAD' ? null : renderSitemap(data.cards),{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=60','X-Content-Type-Options':'nosniff'}});
      }
      const id = url.searchParams.get('id'), slug = alias ? 'mustafa-caki' : url.searchParams.get('slug');
      if ((!id && !['mustafa','mustafa-caki'].includes(slug)) || (id && (!ids.test(id) || slug))) return errorResponse(404,'Profile not found');
      const data = await directory(language,ctx);
      const card = data.cards.find(c=>id ? c.id === id : founder(c));
      if (!card || !biography(card,language)) return errorResponse(404,'Profile not found');
      const canonical = new URL(profileUrl(card,language));
      if (url.pathname !== canonical.pathname || (founder(card) && url.search)) return Response.redirect(new URL(canonical.pathname + canonical.search,url.origin).href,301);
      const templateUrl = new URL('/' + language + '/profile',url.origin);
      const template = await env.ASSETS.fetch(new Request(templateUrl,{method:'GET'}));
      if (!template.ok || !template.headers.get('Content-Type')?.includes('text/html')) throw Error('Profile shell unavailable');
      const html = renderProfile(await template.text(),card,language,!url.hostname.endsWith('.pages.dev'));
      return new Response(request.method==='HEAD' ? null : html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'public, max-age=60','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','X-Vertex-Profile':'server-rendered-v1'}});
    } catch {
      return errorResponse(503,'Profile temporarily unavailable');
    }
  },
};
