/* Full-viewport globe → scattered nodes → edges → a second geometric world. */
(function(){'use strict';
function smooth(a,b,x){const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);}
function sceneAt(seconds){const t=((seconds%32)+32)%32,reset=smooth(27,32,t);return {time:t,earth:1-.9*smooth(11,19,t)*(1-reset),nodes:smooth(.7,10,t)*(1-reset),edges:smooth(2.2,14,t)*(1-reset),shell:smooth(8,18,t)*(1-reset),reset,phase:t<.7?'world':t<2.2?'nodes':t<14?'connections':t<27?'network':'transition'};}
function unitNodes(count=180){return Array.from({length:count},(_,i)=>{const y=1-2*(i+.5)/count,r=Math.sqrt(1-y*y),a=i*Math.PI*(3-Math.sqrt(5));return [Math.cos(a)*r,y,Math.sin(a)*r];});}
function nodeBirth(index,count){return .7+((index*73)%count)/count*8.5;}
function globeFrame(width,height){return {cx:width*.36,cy:height*.49,radius:Math.max(width*.76,height*.68)};}
if(typeof module==='object'&&module.exports){module.exports={sceneAt,unitNodes,nodeBirth,globeFrame};return;}
const canvas=document.getElementById('origin-world');if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),nodes=unitNodes(),edges=[];
nodes.forEach((p,i)=>nodes.forEach((q,j)=>{if(j>i&&Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2])<.32)edges.push([i,j]);}));
let width=0,height=0,land=[],frame=0,previous=0,elapsed=0,lastPaint=0;
function project(p,angle,scale=1){const layout=globeFrame(width,height),x=p[0]*Math.cos(angle)+p[2]*Math.sin(angle),z=p[2]*Math.cos(angle)-p[0]*Math.sin(angle);const y=p[1]*.97-z*.24,depth=z*.97+p[1]*.24;return [layout.cx+x*layout.radius*scale,layout.cy-y*layout.radius*scale,depth];}
function resize(){width=canvas.parentElement.clientWidth;height=canvas.parentElement.clientHeight;const dpr=Math.min(devicePixelRatio||1,1.75);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);paint();}
function paint(){
 ctx.clearRect(0,0,width,height);const s=sceneAt(reduced.matches?18:elapsed),dark=document.documentElement.dataset.theme==='dark',ink=dark?'211,211,222':'58,56,72',violet=dark?'178,157,224':'112,88,163',angle=elapsed*.03;
 if(canvas.dataset.phase!==s.phase)canvas.dataset.phase=s.phase;
 function path(points,alpha,color=ink,lineWidth=.7){ctx.beginPath();let pen=false;for(const p of points){if(p[2]<0){pen=false;continue;}if(pen)ctx.lineTo(p[0],p[1]);else{ctx.moveTo(p[0],p[1]);pen=true;}}ctx.lineWidth=lineWidth;ctx.strokeStyle=`rgba(${color},${alpha})`;ctx.stroke();}
 for(let lat=-60;lat<=60;lat+=30){const a=lat*Math.PI/180;path(Array.from({length:100},(_,i)=>{const l=i/99*Math.PI*2;return project([Math.cos(a)*Math.cos(l),Math.sin(a),Math.cos(a)*Math.sin(l)],angle);}),.2*s.earth);}
 for(let lon=0;lon<180;lon+=30){const l=lon*Math.PI/180;path(Array.from({length:120},(_,i)=>{const a=i/119*Math.PI*2;return project([Math.cos(a)*Math.cos(l),Math.sin(a),Math.cos(a)*Math.sin(l)],angle);}),.17*s.earth);}
 land.forEach(arc=>path(arc.map(p=>project(p,angle)),.64*s.earth));
 const base=nodes.map(p=>project(p,angle)),shellScale=1+.09*s.shell,outer=nodes.map(p=>project(p,angle+.075*s.shell,shellScale));
 // Birth ranks are scattered across the globe, rather than sweeping offscreen from a pole.
 nodes.forEach((_,i)=>{const visibility=smooth(nodeBirth(i,nodes.length),nodeBirth(i,nodes.length)+1.4,s.time)*(1-s.reset),p=base[i];if(p[2]<0||visibility===0)return;ctx.beginPath();ctx.arc(p[0],p[1],2+(.5+.5*Math.sin(elapsed*.75+i))*.65,0,Math.PI*2);ctx.fillStyle=`rgba(${violet},${visibility*(.55+.3*p[2])})`;ctx.fill();if(i%5===0){ctx.beginPath();ctx.arc(p[0],p[1],5.5,0,Math.PI*2);ctx.fillStyle=`rgba(${violet},${visibility*.08})`;ctx.fill();}});
 edges.forEach(([i,j])=>{const birth=Math.max(nodeBirth(i,nodes.length),nodeBirth(j,nodes.length))+1.3,growth=smooth(birth,birth+2.2,s.time)*(1-s.reset);if(growth===0)return;const a=outer[i],b=outer[j];if(a[2]<-.04||b[2]<-.04)return;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(a[0]+(b[0]-a[0])*growth,a[1]+(b[1]-a[1])*growth);ctx.lineWidth=.9;ctx.strokeStyle=`rgba(${i%7===0?violet:ink},${growth*(.23+.3*Math.max(0,(a[2]+b[2])/2))})`;ctx.stroke();});
 outer.forEach((p,i)=>{if(p[2]<0)return;const strength=s.shell*(.45+.4*p[2]);ctx.beginPath();ctx.arc(p[0],p[1],i%9===0?2.8:1.6,0,Math.PI*2);ctx.fillStyle=`rgba(${i%9===0?violet:ink},${strength})`;ctx.fill();});
}
function tick(now){frame=0;if(document.hidden||reduced.matches)return;if(previous)elapsed+=Math.max(0,(now-previous)/1000);previous=now;if(now-lastPaint>=33){lastPaint=now;paint();}frame=requestAnimationFrame(tick);}
function sync(){cancelAnimationFrame(frame);frame=0;previous=0;paint();if(!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick);}
reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);window.addEventListener('resize',resize,{passive:true});if(window.visualViewport)window.visualViewport.addEventListener('resize',resize,{passive:true});new MutationObserver(paint).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});resize();sync();
fetch('/assets/geo/countries-110m.json',{credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error('globe');return r.json();}).then(topology=>{const tr=topology.transform;land=topology.arcs.map(arc=>{let x=0,y=0;return arc.map(p=>{x+=p[0];y+=p[1];const lon=(x*tr.scale[0]+tr.translate[0])*Math.PI/180,lat=(y*tr.scale[1]+tr.translate[1])*Math.PI/180;return [Math.cos(lat)*Math.cos(lon),Math.sin(lat),Math.cos(lat)*Math.sin(lon)];});});paint();}).catch(()=>{/* The graticule and full network still render if coastline data is unavailable. */});
})();
