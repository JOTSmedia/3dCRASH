/* Integrated terminal sequence. All dynamics after the last usable altitude are illustrative.
   No measured impact energy, airspeed, crater dimensions, blast yield or debris boundaries are asserted. */
(function(){
"use strict";
function buildJet(){
const G=Array.from({length:5},()=>({p:[],n:[]}));
const sub=(a,b)=>a.map((v,i)=>v-b[i]),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],norm=a=>{let h=Math.hypot(...a)||1;return a.map(v=>v/h)},dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
function tri(m,a,b,c,na,nb,nc){let n=norm(cross(sub(b,a),sub(c,a))),g=G[m];g.p.push(...a,...b,...c);g.n.push(...(na||n),...(nb||n),...(nc||n))}
function quad(m,a,b,c,d){tri(m,a,b,c);tri(m,a,c,d)}
function solid(p,o,m){if(dot(cross(sub(p[1],p[0]),sub(p[2],p[0])),o)<0)p=p.slice().reverse();let a=p.map(p=>p.map((v,i)=>v+o[i])),b=p.map(p=>p.map((v,i)=>v-o[i]));for(let i=1;i<a.length-1;i++){tri(m,a[0],a[i],a[i+1]);tri(m,b[0],b[i+1],b[i])}for(let i=0;i<a.length;i++){let j=(i+1)%a.length;quad(m,a[i],b[i],b[j],a[j])}}
const B=[[-8.94,.025,.035,.08],[-8,.20,.24,.10],[-6.8,.47,.52,.06],[-5.3,.75,.80,.02],[-3.6,.94,1.01,0],[2.4,.98,1.03,0],[4.1,.93,.98,.01],[5.3,.81,.86,-.02],[6.35,.62,.63,-.12],[7.3,.39,.40,-.23],[8.2,.16,.18,-.28],[8.94,.002,.002,-.28]];
function loft(S,x=0,y=0,m=0,N=32){let R=S.map((q,j)=>{let a=S[Math.max(0,j-1)],b=S[Math.min(S.length-1,j+1)];return Array.from({length:N},(_,k)=>{let t=k*2*Math.PI/N,c=Math.cos(t),s=Math.sin(t);return{p:[x+q[1]*c,y+q[3]+q[2]*s,q[0]],n:norm(cross([-q[1]*s,q[2]*c,0],[(b[1]-a[1])*c,b[3]-a[3]+(b[2]-a[2])*s,b[0]-a[0]]))}})});for(let j=0;j<R.length-1;j++)for(let k=0;k<N;k++){let a=R[j][k],b=R[j][(k+1)%N],c=R[j+1][(k+1)%N],d=R[j+1][k];tri(m,a.p,b.p,c.p,a.n,b.n,c.n);tri(m,a.p,c.p,d.p,a.n,c.n,d.n)}}
function sec(z){let j=0;while(j<B.length-2&&B[j+1][0]<z)j++;let a=B[j],b=B[j+1],u=Math.max(0,Math.min(1,(z-a[0])/(b[0]-a[0])));return a.map((v,i)=>v+(b[i]-v)*u)}
function skin(z,y,s,d=.012){let q=sec(z),h=(y-q[3])/q[2];return[s*(q[1]*Math.sqrt(Math.max(0,1-h*h))+d),y,z]}
function disk(x,y,z,r,m,N=24){for(let i=0;i<N;i++){let a=i*2*Math.PI/N,b=(i+1)*2*Math.PI/N;tri(m,[x,y,z],[x+r*Math.cos(a),y+r*Math.sin(a),z],[x+r*Math.cos(b),y+r*Math.sin(b),z])}}
function ring(x,y,z,ri,ro,m,N=32){for(let i=0;i<N;i++){let a=i*2*Math.PI/N,b=(i+1)*2*Math.PI/N;quad(m,[x+ro*Math.cos(a),y+ro*Math.sin(a),z],[x+ro*Math.cos(b),y+ro*Math.sin(b),z],[x+ri*Math.cos(b),y+ri*Math.sin(b),z],[x+ri*Math.cos(a),y+ri*Math.sin(a),z])}}
function oval(s,z,ry,rz,m,d){let c=skin(z,.30,s,d);for(let k=0;k<24;k++){let a=k*Math.PI/12,b=(k+1)*Math.PI/12,p=skin(z+rz*Math.cos(a),.30+ry*Math.sin(a),s,d),q=skin(z+rz*Math.cos(b),.30+ry*Math.sin(b),s,d);if(s>0)tri(m,c,q,p);else tri(m,c,p,q)}}
function patch(z0,z1,a0,a1,m){let P=(u,v)=>{let z=z0+(z1-z0)*u,q=sec(z),a=a0+(a1-a0)*v;return[(q[1]+.015)*Math.cos(a),q[3]+(q[2]+.015)*Math.sin(a),z]};for(let j=0;j<10;j++)for(let k=0;k<8;k++){let u=j/10,v=k/8;quad(m,P(u,v),P(u,v+1/8),P(u+1/10,v+1/8),P(u+1/10,v))}}
loft(B);
for(let s of [-1,1]){
solid([[s*.72,-.56,1.65],[s*2.65,-.47,.50],[s*6.25,-.18,-1.95],[s*6.25,-.18,-2.75],[s*.80,-.56,-2.25]],[0,.075,0],0);
solid([[s*6.23,-.16,-1.97],[s*6.647,1.12,-2.57],[s*6.58,1.16,-2.98],[s*6.23,-.14,-2.77]],[s*.028,0,0],1);
solid([[s*6.53,.93,-2.52],[s*6.645,1.12,-2.57],[s*6.58,1.16,-2.98],[s*6.45,.96,-2.94]],[s*.030,0,0],2);
solid([[s*.62,.16,-3.90],[s*1.58,.38,-4.28],[s*1.58,.38,-5.55],[s*.61,.16,-5.90]],[0,.08,0],0);
loft([[-6.75,.28,.29,0],[-6.40,.43,.44,0],[-5.85,.53,.54,0],[-3.75,.54,.55,0],[-3.20,.48,.49,0]],s*1.57,.38,0,28);
ring(s*1.57,.38,-3.19,.405,.485,4);disk(s*1.57,.38,-3.30,.408,3);ring(s*1.57,.38,-6.76,.22,.29,4);disk(s*1.57,.38,-6.77,.222,3);
loft([[-3.31,.13,.13,0],[-3.20,.005,.005,0]],s*1.57,.38,4,16);
solid([[s*.05,2.88,-7.15],[s*2.32,2.93,-8.03],[s*2.32,2.93,-8.64],[s*.06,2.88,-8.38]],[0,.045,0],0);
solid([[s*.24,-.50,-5.88],[s*.88,-1.30,-7.35],[s*.64,-1.20,-8.45],[s*.15,-.32,-8.20]],[s*.035,0,0],0);
for(let z of(s>0?[3.65,2.20,.75,-.70,-2.15,-3.60]:[3.10,1.60,.10,-1.40,-2.90])){oval(s,z,.325,.25,2,.016);oval(s,z,.285,.212,1,.024)}
for(let[yc,w,m]of[[-.15,.095,1],[-.32,.028,2]])for(let i=0;i<50;i++){let z0=-7.1+i*14.2/50,z1=-7.1+(i+1)*14.2/50,t=z=>Math.min(1,(z+7.1)/.8,(7.1-z)/.8);quad(m,skin(z0,yc-w*t(z0),s,.020),skin(z0,yc+w*t(z0),s,.020),skin(z1,yc+w*t(z1),s,.020),skin(z1,yc-w*t(z1),s,.020))}
}
solid([[0,.42,-5.90],[0,2.95,-7.30],[0,3.02,-8.30],[0,.36,-8.50]],[.085,0,0],1);
solid([[0,2.40,-7.02],[0,2.54,-7.09],[0,2.62,-8.36],[0,2.48,-8.38]],[.09,0,0],2);
patch(5.57,7.02,.78,1.485,1);patch(5.57,7.02,Math.PI-1.485,Math.PI-.78,1);patch(4.74,5.51,.40,.89,1);patch(4.74,5.51,Math.PI-.89,Math.PI-.40,1);
return G;
}

const WGS={lon:-80.113590,lat:26.633412},BBOX=[-80.145,26.615,-80.082,26.66],START=[7942.955,-80.101837,26.635483,8750];
const FALLBACK=[[7943.529,-80.102355,26.634888],[7945.55,-80.104376,26.633286],[7947.317,-80.106449,26.632416],[7948.875,-80.108314,26.632004],[7950.399,-80.110139,26.632023],[7951.54,-80.111424,26.632278]];
const MAT=[[222,233,240],[24,61,83],[220,177,107],[8,20,27],[121,149,165]],DEG=Math.PI/180,START_CLIP=20,CONTACT=26.5;
let canvas,ctx,container,image,imageReady=false,initialized=false,lastArgs={clip:0,active:false,view:""},path=[],triangles=[],pieces=new Map(),meshBounds,orbit=0,zoom=1,examine=false,drag=null,pointers=new Map(),pinchDistance=0,frameInfo={};
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t,smooth=t=>{t=clamp(t);return t*t*(3-2*t)},add=(a,b)=>a.map((v,i)=>v+b[i]),sub=(a,b)=>a.map((v,i)=>v-b[i]),mul=(a,s)=>a.map(v=>v*s),dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],unit=a=>{let n=Math.hypot(...a)||1;return a.map(v=>v/n)};
function seeded(n){let v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v)}
function geo(lon,lat){return[(lon-WGS.lon)*111320*Math.cos(WGS.lat*DEG),0,(lat-WGS.lat)*111320]}
function rotate(v,angles){let[x,y,z]=v,[a,b,c]=angles,co=Math.cos(a),si=Math.sin(a);[y,z]=[y*co-z*si,y*si+z*co];co=Math.cos(b);si=Math.sin(b);[x,z]=[x*co+z*si,-x*si+z*co];co=Math.cos(c);si=Math.sin(c);return[x*co-y*si,x*si+y*co,z]}
function buildMesh(){
 triangles=[];pieces.clear();
 buildJet().forEach((g,m)=>{for(let i=0;i<g.p.length;i+=9){let p=[g.p.slice(i,i+3),g.p.slice(i+3,i+6),g.p.slice(i+6,i+9)],c=[0,1,2].map(k=>(p[0][k]+p[1][k]+p[2][k])/3),id;
 if(Math.abs(c[0])>2.5)id=c[0]>0?5:6;else if(c[2]<-5.8&&c[1]>1)id=7;else if(Math.abs(c[0])>1.1&&c[2]<-3)id=c[0]>0?8:9;else id=clamp(Math.floor((c[2]+8.94)/3.6),0,4);
 triangles.push({p,m,id});if(!pieces.has(id))pieces.set(id,{sum:[0,0,0],n:0});let g2=pieces.get(id);g2.sum=add(g2.sum,c);g2.n++}});
 pieces.forEach((g,id)=>{g.p=mul(g.sum,1/g.n);g.v=[(seeded(id+10)-.5)*35,10+seeded(id+20)*25,(seeded(id+30)-.5)*35];g.spin=[(seeded(id+40)-.5)*3,(seeded(id+50)-.5)*3,(seeded(id+60)-.5)*3]});
}
function parseRows(rows){return(rows||[]).map(p=>{if(Array.isArray(p)){if(p.length>=3&&p[0]>100)return[p[1],p[2]];if(p.length>=2&&p[0]<-20)return[p[0],p[1]]}if(p&&Number.isFinite(p.lon)&&Number.isFinite(p.lat))return[p.lon,p.lat];return null}).filter(p=>p&&p[0]>=BBOX[0]&&p[0]<=BBOX[2]&&p[1]>=BBOX[1]&&p[1]<=BBOX[3])}
function init(options={}){
 if(initialized)return window.TERMINAL_FLIGHT;
 container=typeof options.container==="string"?document.querySelector(options.container):options.container;
 if(!container)container=document.getElementById("stage");if(!container)return window.TERMINAL_FLIGHT;
 let rows=parseRows(options.after);if(!rows.length)rows=parseRows(FALLBACK);
 path=[[START[1],START[2]],...rows,[WGS.lon,WGS.lat]].map(p=>geo(...p));
 // These are horizontal sample locations. Altitude between the boundary and impact is NOT recorded.
 canvas=document.createElement("canvas");canvas.id="terminal-flight-canvas";canvas.setAttribute("aria-label","Illustrative three-dimensional continuation from the last usable altitude to the preliminary accident location, followed by an aerial evidence-context view.");canvas.style.cssText="position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;display:none;touch-action:pan-y;";container.append(canvas);ctx=canvas.getContext("2d",{alpha:false});buildMesh();
 image=new Image();image.decoding="async";image.onload=()=>{imageReady=true;repaint()};image.onerror=()=>{imageReady=false;repaint()};image.src="./assets/crash-area-satellite.jpg";
 canvas.addEventListener("pointerdown",e=>{if(!examine)return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});canvas.setPointerCapture(e.pointerId);if(pointers.size===1)drag={x:e.clientX,orbit};if(pointers.size===2){let p=[...pointers.values()];pinchDistance=Math.hypot(p[1].x-p[0].x,p[1].y-p[0].y);drag=null}});
 canvas.addEventListener("pointermove",e=>{if(!examine||!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){let p=[...pointers.values()],d=Math.hypot(p[1].x-p[0].x,p[1].y-p[0].y);if(pinchDistance>0)zoom=clamp(zoom*pinchDistance/Math.max(10,d),.55,2.6);pinchDistance=d}else if(drag)orbit=drag.orbit+(e.clientX-drag.x)*.006;repaint()});
 const release=e=>{pointers.delete(e.pointerId);drag=null;pinchDistance=0};canvas.addEventListener("pointerup",release);canvas.addEventListener("pointercancel",release);
 canvas.addEventListener("wheel",e=>{if(!examine)return;e.preventDefault();zoom=clamp(zoom*Math.exp(e.deltaY*.001),.55,2.6);repaint()},{passive:false});
 canvas.addEventListener("keydown",e=>{if(!examine)return;if(["ArrowLeft","ArrowRight","+","=","-","0"].includes(e.key)){e.preventDefault();if(e.key==="ArrowLeft")orbit-=.15;if(e.key==="ArrowRight")orbit+=.15;if(e.key==="+"||e.key==="=")zoom=clamp(zoom*.9,.55,2.6);if(e.key==="-")zoom=clamp(zoom*1.1,.55,2.6);if(e.key==="0"){orbit=0;zoom=1}repaint()}});
 window.addEventListener("resize",repaint);initialized=true;return window.TERMINAL_FLIGHT;
}
function catmull(a,b,c,d,t){let t2=t*t,t3=t2*t;return b.map((v,i)=>.5*((2*v)+(-a[i]+c[i])*t+(2*a[i]-5*v+4*c[i]-d[i])*t2+(-a[i]+3*v-3*c[i]+d[i])*t3))}
function horizontal(u){u=clamp(u);let q=u*(path.length-1),j=Math.min(path.length-2,Math.floor(q)),t=q-j;return catmull(path[Math.max(0,j-1)],path[j],path[j+1],path[Math.min(path.length-1,j+2)],t)}
function position(u){let p=horizontal(u);p[1]=START[3]*.3048*Math.pow(Math.max(0,1-u),.88);return p}
function basis(u){let eps=.001,a=position(Math.max(0,u-eps)),b=position(Math.min(1,u+eps)),f=unit(sub(b,a)),r=unit(cross([0,1,0],f));if(Math.hypot(...r)<.1)r=[1,0,0];let up=unit(cross(f,r));return{f,r,up}}
function localToWorld(p,b){return add(add(mul(b.r,p[0]),mul(b.up,p[1])),mul(b.f,p[2]))}
function render(args={}){
 lastArgs={...lastArgs,...args};if(!initialized)init({container:document.getElementById("stage")});if(!initialized||!ctx)return;
 const clip=clamp(Number(lastArgs.clip)||0,0,30),active=Boolean(lastArgs.active)&&clip>=START_CLIP;
 if(!active){canvas.style.display="none";canvas.style.pointerEvents="none";canvas.tabIndex=-1;examine=false;frameInfo={active:false,clip};return}
 const nextExamine=Boolean(lastArgs.examine)&&clip>=29.99;
 if(nextExamine&&!examine){orbit=0;zoom=1}if(!nextExamine){orbit=0;zoom=1;pointers.clear();drag=null}
 examine=nextExamine;canvas.style.display="block";canvas.style.pointerEvents=examine?"auto":"none";canvas.style.touchAction=examine?"none":"pan-y";canvas.style.cursor=examine?"grab":"default";canvas.tabIndex=examine?0:-1;canvas.style.opacity="1";
 const box=container.getBoundingClientRect(),w=Math.max(1,box.width),h=Math.max(1,box.height),dpr=Math.min(window.devicePixelRatio||1,1.5);
 if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}ctx.setTransform(dpr,0,0,dpr,0,0);
 const u=clamp((clip-START_CLIP)/(CONTACT-START_CLIP)),post=Math.max(0,clip-CONTACT),aerial=smooth(post/3.5),p=position(u),b=basis(Math.min(.998,u)),contactB=basis(.998),focal=Math.min(w*1.08,h*1.05),desired=Math.min(w*.30,240);
 const distance=260+p[1]*.45;
 const rawScale=desired*Math.hypot(distance,distance*.70)/(17.88*focal),scale=clamp(rawScale,1.4,36);
 let pose=[p[0],p[1]+Math.max(0,-b.f[1])*8.94*scale,p[2]];
 let flat=unit([b.f[0],0,b.f[2]]),side=unit(cross([0,1,0],flat)),offset=add(mul(flat,-distance*.76),mul(side,distance*.65));offset[1]=distance*.7;
 let target=[pose[0],pose[1]-Math.min(200,p[1]*.10),pose[2]],eye=add(pose,offset);
 const impactDistance=260,impactScale=clamp(desired*Math.hypot(impactDistance,impactDistance*.70)/(17.88*focal),1.4,36),impactOrigin=[0,Math.max(0,-contactB.f[1])*8.94*impactScale,0],endFlat=unit([contactB.f[0],0,contactB.f[2]]),endSide=unit(cross([0,1,0],endFlat)),endOff=add(mul(endFlat,-impactDistance*.76),mul(endSide,impactDistance*.65)),angle0=Math.atan2(endOff[2],endOff[0]);
 if(post>0){const angle=angle0+smooth(post/3.5)*.95+orbit,radius=lerp(Math.hypot(endOff[0],endOff[2]),480,aerial)*zoom,height=lerp(impactOrigin[1]+182,650,aerial)*zoom;eye=[Math.cos(angle)*radius,height,Math.sin(angle)*radius];target=[0,lerp(impactOrigin[1],0,aerial),0]}
 const forward=unit(sub(target,eye)),right=unit(cross(forward,[0,1,0])),up=unit(cross(right,forward));
 const project=v=>{let q=sub(v,eye),z=dot(q,forward);return[w*.5+dot(q,right)*focal/z,h*.46-dot(q,up)*focal/z,z]};
 const bg=ctx.createLinearGradient(0,0,0,h);bg.addColorStop(0,"#162f42");bg.addColorStop(.45,"#254252");bg.addColorStop(1,"#0a1725");ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
 drawGround(project,w,h);
 // The complete horizontal chain is geography, not a terminal speed/time solution.
 ctx.save();ctx.setLineDash([5,7]);drawLine(path.map(q=>[q[0],2,q[2]]),project,"#edbd7790",1.6);ctx.restore();
 if(u<1){let trail=[];for(let j=0;j<=Math.floor(u*70);j++){let q=position(j/70);trail.push(q)}if(trail.length>1){ctx.save();ctx.setLineDash([3,8]);drawLine(trail,project,"#b8e5e68c",1.4);ctx.restore()}}
 if(post>0)drawScar(project,post);
 const faces=[];
 for(let tri of triangles){
   let vertices;
   if(post<=0){vertices=tri.p.map(q=>add(pose,mul(localToWorld(q,b),scale)))}
   else{
     const g=pieces.get(tri.id),c=add(impactOrigin,mul(localToWorld(g.p,contactB),impactScale)),travel=(1-Math.exp(-post*1.25))/1.25,loc=[c[0]+g.v[0]*travel,c[1]+g.v[1]*post-42*post*post,c[2]+g.v[2]*travel];loc[1]=Math.max(1.8,loc[1]);const rot=g.spin.map(v=>v*Math.min(post,1.65));
     vertices=tri.p.map(q=>add(loc,rotate(mul(localToWorld(sub(q,g.p),contactB),impactScale),rot)));
   }
   const q=vertices.map(project);if(q.some(p2=>p2[2]<=3)||q.every(p2=>p2[0]<-50)||q.every(p2=>p2[0]>w+50)||q.every(p2=>p2[1]<-50)||q.every(p2=>p2[1]>h+50))continue;
   const normal=unit(cross(sub(vertices[1],vertices[0]),sub(vertices[2],vertices[0]))),light=.47+.53*Math.abs(dot(normal,unit([-.45,1,-.25]))),col=MAT[tri.m].map(v=>Math.round(v*light)),dark=post>0?lerp(1,.49,smooth(post/2)):1;
   faces.push({q,depth:(q[0][2]+q[1][2]+q[2][2])/3,color:"rgb("+col.map(v=>Math.round(v*dark)).join(",")+")"});
 }
 faces.sort((a,b2)=>b2.depth-a.depth);
 for(const face of faces){ctx.beginPath();face.q.forEach((v,i)=>i?ctx.lineTo(v[0],v[1]):ctx.moveTo(v[0],v[1]));ctx.closePath();ctx.fillStyle=face.color;ctx.fill()}
 if(post>0)drawClouds(project,post,focal);
 if(post>1.1)drawEvidenceMarker(project,post,w,h);
 // A mild atmospheric veil is a rendering treatment, not reconstructed accident weather.
 const vignette=ctx.createRadialGradient(w*.5,h*.45,Math.min(w,h)*.18,w*.5,h*.5,Math.max(w,h)*.7);vignette.addColorStop(0,"#07101b00");vignette.addColorStop(1,"#07101b90");ctx.fillStyle=vignette;ctx.fillRect(0,0,w,h);
 labels(w,h,clip,post,examine);
 frameInfo={active:true,clip,phase:post<=0?"illustrative-descent":post<.7?"illustrative-impact":"aerial-context",post,examine,orbit,zoom,imageReady,anchor:{...WGS},illustrative:true,planeScreen:project(post?impactOrigin:pose).slice(0,2),camera:{eye,target},altitudeIsIllustrative:true};
}
function drawGround(project,w,h){
 const rows=18,cols=24,west=BBOX[0],south=BBOX[1],east=BBOX[2],north=BBOX[3];
 if(!imageReady){let points=[geo(west,south),geo(east,south),geo(east,north),geo(west,north)];fillWorld(points,project,"#17343a");for(let i=0;i<=24;i++){let lon=lerp(west,east,i/24);drawLine([geo(lon,south),geo(lon,north)],project,"#436b7350",1)}for(let i=0;i<=18;i++){let lat=lerp(south,north,i/18);drawLine([geo(west,lat),geo(east,lat)],project,"#436b7350",1)}return}
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
   const u=x/cols,v=y/rows,u1=(x+1)/cols,v1=(y+1)/rows;
   const pts=[project(geo(lerp(west,east,u),lerp(north,south,v))),project(geo(lerp(west,east,u1),lerp(north,south,v))),project(geo(lerp(west,east,u1),lerp(north,south,v1))),project(geo(lerp(west,east,u),lerp(north,south,v1)))];
   if(pts.some(p=>p[2]<8)||pts.every(p=>p[0]<-100)||pts.every(p=>p[0]>w+100)||pts.every(p=>p[1]<-100)||pts.every(p=>p[1]>h+100))continue;
   const uv=[[u*image.width,v*image.height],[u1*image.width,v*image.height],[u1*image.width,v1*image.height],[u*image.width,v1*image.height]];
   texturedTriangle([pts[0],pts[1],pts[2]],[uv[0],uv[1],uv[2]]);texturedTriangle([pts[0],pts[2],pts[3]],[uv[0],uv[2],uv[3]]);
 }
 ctx.fillStyle="#09233420";ctx.fillRect(0,0,w,h);
}
function texturedTriangle(p,t){
 const[x0,y0]=t[0],[x1,y1]=t[1],[x2,y2]=t[2],den=x0*(y1-y2)+x1*(y2-y0)+x2*(y0-y1);if(Math.abs(den)<.0001)return;
 const A=(p[0][0]*(y1-y2)+p[1][0]*(y2-y0)+p[2][0]*(y0-y1))/den,B=(p[0][1]*(y1-y2)+p[1][1]*(y2-y0)+p[2][1]*(y0-y1))/den,C=(p[0][0]*(x2-x1)+p[1][0]*(x0-x2)+p[2][0]*(x1-x0))/den,D=(p[0][1]*(x2-x1)+p[1][1]*(x0-x2)+p[2][1]*(x1-x0))/den,E=(p[0][0]*(x1*y2-x2*y1)+p[1][0]*(x2*y0-x0*y2)+p[2][0]*(x0*y1-x1*y0))/den,F=(p[0][1]*(x1*y2-x2*y1)+p[1][1]*(x2*y0-x0*y2)+p[2][1]*(x0*y1-x1*y0))/den;
 ctx.save();ctx.beginPath();p.forEach((v,i)=>i?ctx.lineTo(v[0],v[1]):ctx.moveTo(v[0],v[1]));ctx.closePath();ctx.clip();ctx.transform(A,B,C,D,E,F);ctx.drawImage(image,0,0);ctx.restore();
}
function drawLine(points,project,color,width=1){if(points.length<2)return;ctx.beginPath();let started=false;for(let p of points){let q=project(p);if(q[2]<=2){started=false;continue}if(started)ctx.lineTo(q[0],q[1]);else{ctx.moveTo(q[0],q[1]);started=true}}ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke()}
function fillWorld(points,project,color,stroke){let p=points.map(project);if(p.some(q=>q[2]<2))return;ctx.beginPath();p.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.closePath();ctx.fillStyle=color;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke()}}
function drawScar(project,post){
 // Visual symbol only: radius in renderer coordinates is not a surveyed physical boundary.
 const progress=smooth(post/.65),rim=[];for(let j=0;j<45;j++){let a=j/45*Math.PI*2,r=(24+seeded(j+400)*11)*progress;rim.push([Math.cos(a)*r,.4,Math.sin(a)*r*.72])}
 fillWorld(rim,project,"#101b1bbd","#c7ad7460");for(let j=0;j<14;j++){let a=j/14*Math.PI*2,r=25+seeded(j+601)*18;drawLine([[Math.cos(a)*14,.5,Math.sin(a)*12],[Math.cos(a)*r,.5,Math.sin(a)*r]],project,"#1622207a",1)}
}
function drawClouds(project,post,focal){
 const puffs=[];
 for(let j=0;j<55;j++){let delay=seeded(j+1000)*.8,t=Math.max(0,post-delay);if(t<=0)continue;let a=seeded(j+1100)*Math.PI*2,r=(8+seeded(j+1200)*28)*(1-Math.exp(-t*.8)),rise=(8+seeded(j+1300)*27)*t,p=project([Math.cos(a)*r+t*8,rise,Math.sin(a)*r]),size=(11+seeded(j+1400)*13)*(1+t*.8)*focal/p[2];puffs.push({p,size,j,t})}
 puffs.sort((a,b)=>b.p[2]-a.p[2]);for(let puff of puffs){if(puff.p[2]<2||puff.size<1)continue;let fire=post<.65&&puff.j%3===0,alpha=fire?clamp(.72-post*.7,0,.72):clamp(.18-puff.t*.012,.08,.18);const g=ctx.createRadialGradient(puff.p[0],puff.p[1],0,puff.p[0],puff.p[1],puff.size);g.addColorStop(0,fire?"rgba(255,199,112,"+alpha+")":"rgba(78,89,90,"+alpha+")");g.addColorStop(.5,fire?"rgba(218,125,55,"+alpha*.55+")":"rgba(104,112,106,"+alpha*.65+")");g.addColorStop(1,"rgba(70,80,81,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(puff.p[0],puff.p[1],puff.size,0,Math.PI*2);ctx.fill()}
 if(post<.25){let q=project([0,9,0]),radius=(20+post*140)*focal/q[2],g=ctx.createRadialGradient(q[0],q[1],0,q[0],q[1],radius);g.addColorStop(0,"rgba(255,231,177,"+(1-post/.25)*.8+")");g.addColorStop(1,"rgba(248,164,70,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(q[0],q[1],radius,0,Math.PI*2);ctx.fill()}
}
function drawEvidenceMarker(project,post,w,h){
 const opacity=clamp((post-1.1)/.8),rings=[60,79];ctx.save();ctx.globalAlpha=opacity;
 for(let r of rings){let pts=[];for(let j=0;j<=80;j++){let a=j/80*Math.PI*2;pts.push([Math.cos(a)*r,2,Math.sin(a)*r])}ctx.setLineDash(r===79?[3,6]:[]);drawLine(pts,project,r===60?"#77e4d5":"#d5bc88a0",1.1)}ctx.setLineDash([]);
 let q=project([0,3,0]);ctx.strokeStyle="#baf6e9";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(q[0]-5,q[1]);ctx.lineTo(q[0]+5,q[1]);ctx.moveTo(q[0],q[1]-5);ctx.lineTo(q[0],q[1]+5);ctx.stroke();
 let label="NTSB PRELIMINARY LOCATION",sub="Context marker · not a measured crater boundary";ctx.font="600 10px system-ui";let tw=Math.max(ctx.measureText(label).width,ctx.measureText(sub).width),x=clamp(q[0]+55,14,w-tw-25),y=clamp(q[1]-55,80,h-150);ctx.strokeStyle="#77e4d599";ctx.beginPath();ctx.moveTo(q[0]+5,q[1]-5);ctx.lineTo(x-6,y+9);ctx.stroke();ctx.fillStyle="#07131ddc";ctx.fillRect(x-8,y-11,tw+20,43);ctx.fillStyle="#a7f7e6";ctx.fillText(label,x,y+3);ctx.font="9px system-ui";ctx.fillStyle="#c0d0d8";ctx.fillText(sub,x,y+18);ctx.restore();
}
function labels(w,h,clip,post,isExamine){
 const small=w<600,font=small?8:9,main="RECONSTRUCTED TERMINAL SEGMENT",sub="NOT MEASURED IMPACT DYNAMICS";ctx.textAlign="center";ctx.font="600 "+font+"px system-ui";
 let width=Math.min(w-26,465),x=(w-width)/2,y=13;ctx.fillStyle="#07131de8";ctx.fillRect(x,y,width,46);ctx.strokeStyle="#bda06380";ctx.strokeRect(x+.5,y+.5,width-1,45);ctx.fillStyle="#edbd77";ctx.fillText(main+" · "+sub,w/2,y+15,Math.max(1,width-15));ctx.font=(small?8:9)+"px system-ui";ctx.fillStyle="#bdced9";ctx.fillText("Jet avatar enlarged · Satellite basemap is not flight-date imagery",w/2,y+31,width-14);
 if(post>.8){ctx.font="600 "+(small?9:11)+"px system-ui";ctx.fillStyle="#bcf4e7";ctx.fillText("AERIAL AFTERMATH · ILLUSTRATIVE DAMAGE LAYER",w/2,78,Math.max(1,w-24))}
 if(isExamine){ctx.font=(small?9:10)+"px system-ui";let label=small?"DRAG TO ORBIT · PINCH TO ZOOM":"DRAG TO ORBIT · SCROLL TO ZOOM · ARROW KEYS / + − / 0";ctx.fillStyle="#07131ddf";ctx.fillRect(Math.max(15,w*.5-240),91,Math.min(w-30,480),27);ctx.fillStyle="#a7e9db";ctx.fillText(label,w/2,108,w-42)}
 if(!imageReady){ctx.font="9px system-ui";ctx.fillStyle="#edbd77";ctx.fillText("Satellite asset unavailable — schematic ground shown",w/2,post>.8?132:78,w-30)}
 ctx.textAlign="start";
}
function repaint(){if(initialized&&lastArgs.active)render(lastArgs)}
function getState(){return{initialized,examine,imageReady,clip:lastArgs.clip,active:frameInfo.active||false,frame:frameInfo}}
window.TERMINAL_FLIGHT={init,render,getState};
})();

