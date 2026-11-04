/* Full-viewport globe → scattered nodes → edges → a second geometric world. */
(function(){'use strict';
function smooth(a,b,x){const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);}
function sceneAt(seconds){const t=((seconds%32)+32)%32,reset=smooth(27,32,t);return {time:t,earth:1-.9*smooth(11,19,t)*(1-reset),nodes:smooth(.7,10,t)*(1-reset),edges:smooth(2.2,14,t)*(1-reset),shell:smooth(8,18,t)*(1-reset),reset,phase:t<.7?'world':t<2.2?'nodes':t<14?'connections':t<27?'network':'transition'};}
function unitNodes(count=180){return Array.from({length:count},(_,i)=>{const y=1-2*(i+.5)/count,r=Math.sqrt(1-y*y),a=i*Math.PI*(3-Math.sqrt(5));return [Math.cos(a)*r,y,Math.sin(a)*r];});}
function nodeBirth(index,count){return index%9===0?.7+((index*73)%count)/count*2:3+((index*73)%count)/count*7;}
function globeFrame(width,height){return {cx:width*.36,cy:height*.49,radius:Math.max(width*.76,height*.68)};}
if(typeof module==='object'&&module.exports){module.exports={sceneAt,unitNodes,nodeBirth,globeFrame};return;}
const canvas=document.getElementById('beacon-world');if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;
const neutral=canvas.dataset.variant==='neutral';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let nodes=[],edges=[],cycle=-1;
function regenerate(){
 nodes=unitNodes().map(p=>{const q=p.map(v=>v+(Math.random()-.5)*.11),n=Math.hypot(...q);return q.map(v=>v/n)});
 edges=[];nodes.forEach((p,i)=>nodes.forEach((q,j)=>{if(j>i&&Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2])<.33)edges.push([i,j])}));
}
regenerate();
let width=0,height=0,land=[],frame=0,previous=0,elapsed=0;
// Unit graticule coordinates never change. Build them once, not on every frame.
const parallels=[],meridians=[];
for(let lat=-60;lat<=60;lat+=30){const a=lat*Math.PI/180;parallels.push(Array.from({length:100},(_,i)=>{const l=i/99*Math.PI*2;return [Math.cos(a)*Math.cos(l),Math.sin(a),Math.cos(a)*Math.sin(l)];}));}
for(let lon=0;lon<180;lon+=30){const l=lon*Math.PI/180;meridians.push(Array.from({length:120},(_,i)=>{const a=i/119*Math.PI*2;return [Math.cos(a)*Math.cos(l),Math.sin(a),Math.cos(a)*Math.sin(l)];}));}
function projector(angle,scale=1){
 const layout=globeFrame(width,height),cos=Math.cos(angle),sin=Math.sin(angle);
 function point(p){const x=p[0]*cos+p[2]*sin,z=p[2]*cos-p[0]*sin,y=p[1]*.97-z*.24,depth=z*.97+p[1]*.24;return [layout.cx+x*layout.radius*scale,layout.cy-y*layout.radius*scale,depth];}
 // Stream country/graticule points straight into the canvas path. Keep the
 // original arithmetic, clipping and stroke order, without per-point arrays.
 point.trace=function(points){let pen=false;for(let i=0;i<points.length;i++){
  const p=points[i],x=p[0]*cos+p[2]*sin,z=p[2]*cos-p[0]*sin,y=p[1]*.97-z*.24,depth=z*.97+p[1]*.24;
  if(depth<0){pen=false;continue;}
  const px=layout.cx+x*layout.radius*scale,py=layout.cy-y*layout.radius*scale;
  if(pen)ctx.lineTo(px,py);else{ctx.moveTo(px,py);pen=true;}
 }};
 return point;
}
function resize(){const nextWidth=canvas.parentElement.clientWidth,nextHeight=canvas.parentElement.clientHeight;
 // Browser chrome expands/collapses during phone scrolling. Keep the same projection
 // until the layout width changes (rotation), rather than resizing the sphere mid-gesture.
 if(width===nextWidth&&nextWidth<=900&&height>0)return;
 if(width===nextWidth&&height===nextHeight)return;
 width=nextWidth;height=nextHeight;const dpr=Math.min(devicePixelRatio||1,1.75);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);paint();}
function paint(){
 const currentCycle=Math.floor(elapsed/32);if(currentCycle!==cycle){cycle=currentCycle;regenerate();}
 ctx.clearRect(0,0,width,height);const s=sceneAt(reduced.matches?18:elapsed),dark=document.documentElement.dataset.theme==='dark',ink=dark?'211,211,222':'58,56,72',violet=neutral?ink:(dark?'244,201,93':'187,151,0'),angle=elapsed*.03;
 if(canvas.dataset.phase!==s.phase)canvas.dataset.phase=s.phase;
 const baseProject=projector(angle),shellScale=1+.09*s.shell,outerProject=projector(angle+.075*s.shell,shellScale);
 function path(points,projection,alpha,color=ink,lineWidth=.7){ctx.beginPath();projection.trace(points);ctx.lineWidth=lineWidth;ctx.strokeStyle=`rgba(${color},${alpha})`;ctx.stroke();}
 parallels.forEach(points=>path(points,baseProject,.2*s.earth));
 meridians.forEach(points=>path(points,baseProject,.17*s.earth));
 land.forEach(arc=>path(arc,baseProject,.64*s.earth));
 // The same coastlines return on the outer shell, with no resampling.
 land.forEach(arc=>path(arc,outerProject,.6*s.shell*(1-s.reset),violet,.85));
 const base=nodes.map(baseProject),outer=nodes.map(outerProject);
 // Birth ranks are scattered across the globe, rather than sweeping offscreen from a pole.
 nodes.forEach((_,i)=>{const visibility=smooth(nodeBirth(i,nodes.length),nodeBirth(i,nodes.length)+1.4,s.time)*(1-s.reset),p=base[i];if(p[2]<0||visibility===0)return;ctx.beginPath();ctx.arc(p[0],p[1],2+(.5+.5*Math.sin(elapsed*.75+i))*.65,0,Math.PI*2);ctx.fillStyle=`rgba(${violet},${visibility*(.55+.3*p[2])})`;ctx.fill();if(!neutral&&i%9===0){ctx.beginPath();ctx.arc(p[0],p[1],38,0,Math.PI*2);const glow=ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],38);glow.addColorStop(0,`rgba(${violet},${visibility*.25})`);glow.addColorStop(1,`rgba(${violet},0)`);ctx.fillStyle=glow;ctx.fill();}});
 edges.forEach(([i,j])=>{const birth=Math.max(nodeBirth(i,nodes.length),nodeBirth(j,nodes.length))+1.3,growth=smooth(birth,birth+2.2,s.time)*(1-s.reset);if(growth===0)return;const a=outer[i],b=outer[j];if(a[2]<-.04||b[2]<-.04)return;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(a[0]+(b[0]-a[0])*growth,a[1]+(b[1]-a[1])*growth);ctx.lineWidth=.9;ctx.strokeStyle=`rgba(${violet},${growth*(.23+.3*Math.max(0,(a[2]+b[2])/2))})`;ctx.stroke();});
 outer.forEach((p,i)=>{if(p[2]<0)return;const strength=s.shell*(.45+.4*p[2]);ctx.beginPath();ctx.arc(p[0],p[1],i%9===0?2.8:1.6,0,Math.PI*2);ctx.fillStyle=`rgba(${violet},${strength})`;ctx.fill();});
}
function tick(now){frame=0;if(document.hidden||reduced.matches)return;if(previous)elapsed+=Math.max(0,Math.min(.1,(now-previous)/1000));previous=now;paint();frame=requestAnimationFrame(tick);}
function sync(){cancelAnimationFrame(frame);frame=0;previous=0;paint();if(!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick);}
reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);window.addEventListener('resize',resize,{passive:true});if(window.visualViewport)window.visualViewport.addEventListener('resize',resize,{passive:true});new MutationObserver(paint).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});resize();sync();
fetch('/assets/geo/countries-110m.json',{credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error('globe');return r.json();}).then(topology=>{const tr=topology.transform;land=topology.arcs.map(arc=>{let x=0,y=0;return arc.map(p=>{x+=p[0];y+=p[1];const lon=(x*tr.scale[0]+tr.translate[0])*Math.PI/180,lat=(y*tr.scale[1]+tr.translate[1])*Math.PI/180;return [Math.cos(lat)*Math.cos(lon),Math.sin(lat),Math.cos(lat)*Math.sin(lon)];});});paint();}).catch(()=>{/* The graticule and full network still render if coastline data is unavailable. */});
})();
