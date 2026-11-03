(function () {
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

const SOURCES={ntsb:"https://www.ntsb.gov/investigations/Pages/ERA27MA026.aspx",faa:"https://www.faa.gov/newsroom/statements/accident_incidents",track:"https://www.flightradar24.com/blog/flight-tracking-news/major-incident/learjet-60-crashes-near-west-palm-beach-florida/",docket:"https://data.ntsb.gov/Docket/?NTSBNumber=ERA27MA026",method:"https://www.ntsb.gov/investigations/process/Pages/goteam.aspx"};
const NARRATION=[
"This is an illustrative impact mechanics demonstration, not a measured reconstruction of N seven two two Bravo Delta's impact. An aircraft carries kinetic energy, proportional to mass and the square of speed. During abrupt ground contact, kinetic energy is transferred into structural deformation, moving debris, ground displacement, heat and sound. Fuel combustion can add a visible fireball. Neither that fireball nor a crater's outline uniquely identifies the object. Actual impact speed, mass, angle, ground properties and forensic measurements are needed to quantify this accident. The animation is conceptual and the crater is not measured.",
"The evidence is not evenly balanced. The F A A and N T S B identify a Learjet sixty. Public tracking data and reported air traffic control communications independently support an aircraft flight and emergency. The N T S B investigation remains ongoing. The marked satellite basemap is geographic context, not an image of the accident or a measured crater. No published measured crater geometry, released serial-number matches or explosive laboratory results were located in the sources reviewed. No affirmative evidence identifying a missile or drone was located. That is not a claim that every alternative has been forensically excluded.",
"The supplied references mix real-world imagery, commentary and generated illustrations. The bomb-crater versus plane-crash-crater drawing is not a survey of this accident. The T N T comparison and generated crater are not measured energy or crater data. A generated missing-stabilizer overlay cannot establish an actual component failure. A cockpit clip carrying an earlier date cannot authenticate the accident cockpit. References can guide presentation, but only corroborated evidence can support a reconstruction."
];
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
let root,nav,previousFocus,canvas,ctx,shown=false,mode=0,time=0,playing=false,last=0,raf=0,yaw=.77,narrating=false,drag=null;
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
const triangles=[], groups=new Map(), palette=[[221,233,238],[29,66,82],[207,167,106],[12,23,33],[112,139,154]];
function seed(n){let x=Math.sin(n*127.1+31.7)*43758.5453;return x-Math.floor(x)}
function prepModel(){
  buildJet().forEach((g,m)=>{for(let i=0;i<g.p.length;i+=9){
    let p=[g.p.slice(i,i+3),g.p.slice(i+3,i+6),g.p.slice(i+6,i+9)];
    let c=[0,1,2].map(k=>(p[0][k]+p[1][k]+p[2][k])/3),id;
    if(Math.abs(c[0])>2.5)id=c[0]>0?5:6;else if(c[2]<-5.8&&c[1]>1)id=7;
    else if(Math.abs(c[0])>1.1&&c[2]<-3)id=c[0]>0?8:9;
    else id=clamp(Math.floor((c[2]+8.94)/4.48),0,3);
    triangles.push({p,m,id});
    if(!groups.has(id))groups.set(id,{sum:[0,0,0],n:0});
    let gr=groups.get(id);for(let k=0;k<3;k++)gr.sum[k]+=c[k];gr.n++;
  }});
  groups.forEach((g,id)=>{g.p=g.sum.map(v=>v/g.n);g.v=[(seed(id+1)-.5)*11,1+seed(id+20)*5,3+seed(id+31)*5];g.spin=[(seed(id+42)-.5)*2,(seed(id+53)-.5)*2,(seed(id+64)-.5)*2]});
}
function init(){
 if(document.getElementById("impact-lab"))return;
 const host=document.querySelector("header nav");
 if(!host){setTimeout(init,100);return}
 nav=document.createElement("button");nav.id="impact-nav";nav.textContent="IMPACT & AFTERMATH";nav.setAttribute("aria-pressed","false");host.append(nav);document.body.classList.add("impact-ready");
 root=document.createElement("section");root.id="impact-lab";root.hidden=true;root.setAttribute("role","dialog");root.setAttribute("aria-label","Impact, aftermath and evidence laboratory");root.setAttribute("aria-modal","true");
 root.innerHTML=`<div class="il-shell">
 <div class="il-top"><div><span class="il-kicker">N722BD / EVIDENCE LABORATORY</span><h1>Impact is a process.<br>Evidence is a separate question.</h1><p class="il-intro">Explore what high-energy aircraft impact can do — and what the available record actually establishes. The main replay now continues to a clearly labeled illustrative impact and aerial scene. This laboratory explains mechanics; it does not turn that rendering into measured evidence.</p></div><div><div class="il-top-actions"><button id="il-narrate" type="button" aria-pressed="false">▶ NARRATE THIS VIEW</button><button id="il-close" type="button">← RETURN TO FLIGHT</button></div><div id="il-narration-status" class="il-narration-status" aria-live="polite"></div></div></div>
 <div class="il-tabs" role="tablist" aria-label="Evidence views"><button id="il-tab-0" role="tab" aria-controls="il-pane-0" aria-selected="true" tabindex="0">01 / IMPACT MECHANICS</button><button id="il-tab-1" role="tab" aria-controls="il-pane-1" aria-selected="false" tabindex="-1">02 / AFTERMATH & EVIDENCE</button><button id="il-tab-2" role="tab" aria-controls="il-pane-2" aria-selected="false" tabindex="-1">03 / REFERENCE AUDIT</button></div>
 <div id="il-pane-0" class="il-pane" role="tabpanel" aria-labelledby="il-tab-0"><div class="il-grid"><div class="il-view"><canvas id="il-canvas" role="img" aria-label="Perspective three-dimensional conceptual Learjet impact animation. Illustrative only, not measured accident conditions."></canvas><div class="il-view-label"><span class="il-badge">ILLUSTRATIVE — NOT MEASURED N722BD IMPACT</span></div><div id="il-scene-step" class="il-scene-step">01 / MOMENTUM BEFORE CONTACT</div><div class="il-scene-hint" style="bottom:133px">DRAG TO ORBIT · SCHEMATIC TERRAIN · NO MEASURED IMPACT PARAMETERS</div><div class="il-controls"><button id="il-play" aria-pressed="false">▶ PLAY</button><input id="il-scrub" type="range" min="0" max="10" step=".01" value="0" aria-label="Illustrative impact sequence time, zero to ten seconds"><span id="il-clock" class="il-clock">0.0 / 10.0 s · DEMO</span></div><div id="il-caption" class="il-caption" aria-live="off"></div></div>
 <div class="il-stack"><section class="il-card"><span class="il-phase">ENERGY ACCOUNTING / QUALITATIVE</span><h2>Kinetic energy changes form.</h2><div class="il-equation">E<sub>k</sub> = ½mv² <span>not an accident estimate</span></div><p>Impact transfers kinetic energy into deformation, debris motion, displaced ground, heat and sound.</p><div class="il-energy"><span>JET MOTION</span><div class="il-meter"><i id="il-motion"></i></div></div><div class="il-energy"><span>TRANSFER</span><div class="il-meter il-gold"><i id="il-transfer"></i></div></div><small>Animated bars explain a transfer concept. They are not measured energy shares.</small></section>
 <section class="il-card"><span class="il-phase">WHAT A CRATER CAN — AND CANNOT — TELL US</span><h2>Shape alone cannot identify a weapon.</h2><p>Aircraft can fragment violently and form concentrated ground damage. Fireball appearance is not a measurement of explosive yield.</p><div class="il-factors"><span>Impact angle</span><span>Mass</span><span>Speed</span><span>Breakup</span><span>Soil / pavement</span><span>Moisture</span></div><div class="il-note">The displayed depression, fragmentation timing, attitude, particle paths and fire are schematic. No dimensions or accident impact speeds are inferred.</div></section></div></div></div>
 <div id="il-pane-1" class="il-pane" role="tabpanel" aria-labelledby="il-tab-1" hidden><div class="il-grid"><section class="il-card"><span class="il-phase">GEOGRAPHIC CONTEXT / NOT CRATER PHOTOGRAPHY</span><h2>Reported impact area · Palm Beach County</h2><div class="il-map"><img src="./assets/crash-area-satellite.jpg" alt="Satellite basemap of the Cresthaven area, with the NTSB preliminary location marked. Not flight-date imagery or a close-up crater photograph." loading="lazy"><span class="il-map-point" aria-hidden="true"></span><span class="il-map-label">NTSB PRELIMINARY POINT<br>26.633412° N · 80.113590° W</span><span class="il-map-north">↑ N</span></div><p class="il-map-caption">Basemap context, not flight-date imagery, an impact survey or a crater photograph. Preliminary point: <strong>26.633412, −80.113590</strong>. Bounding box: west −80.145 / south 26.615 / east −80.082 / north 26.660. Map placement is approximate at this display scale.</p><div class="il-note">A crater assessment requires a measured survey, ground properties, debris mapping and laboratory evidence. A screenshot is not a substitute.</div></section>
 <div class="il-stack"><section class="il-card il-verdict"><span class="il-status">SUPPORTED BY CORROBORATING SOURCES</span><h2>Learjet accident</h2><ul class="il-checks"><li><span>✓</span><span>FAA and NTSB identify a Learjet 60 accident; NTSB case <strong>ERA27MA026</strong>.</span></li><li><span>✓</span><span>Public flight tracking identifies <strong>N722BD</strong>; the aircraft track and reported ATC emergency communications support an aircraft flight.</span></li><li><span>✓</span><span>The official investigation remains ongoing. The public docket was not released when reviewed.</span></li></ul></section><section class="il-card il-unknown"><span class="il-status">NO AFFIRMATIVE EVIDENCE LOCATED</span><h2>Missile or drone substitution</h2><p>No affirmative missile or drone identification was located in the official sources reviewed. A crater resemblance does not outweigh positive aircraft identification and flight evidence.</p><small>This is not a declaration that every alternative has been forensically excluded.</small></section></div></div>
 <div class="il-two"><section class="il-card"><h3>Not located in the published record reviewed</h3><p>Measured crater diameter and depth; a released wreckage-to-serial-number matching report; explosive-residue laboratory results; a validated terminal impact speed, mass and attitude.</p><small>“Not located” means unavailable in the reviewed public material, not that investigators lack or will never publish it.</small></section><section class="il-card"><h3>Groundspeed ≠ impact speed</h3><p>A tracking point is not a measurement of touchdown or impact. Groundspeed is not airspeed. A radar or ADS-B endpoint cannot authenticate a crater or establish an explosive yield.</p><small>The flight display and this conceptual impact view deliberately retain that boundary.</small></section></div></div>
 <div id="il-pane-2" class="il-pane" role="tabpanel" aria-labelledby="il-tab-2" hidden><div class="il-card" style="margin-bottom:16px"><span class="il-phase">SUPPLIED REFERENCES / PROVENANCE CHECK</span><h2>Visually compelling does not mean measured.</h2><p>These references informed the presentation style. The following details cannot be promoted into accident evidence. No social-media footage is embedded here.</p></div><div class="il-audit-list">
 <article class="il-card il-audit"><div class="il-audit-time">00:02<small>03-11-21 CLIP</small></div><div><h3>Generic crater comparison</h3><p>The “BOMB CRATER / PLANE CRASH CRATER” image is an illustrated comparison, not a photograph or survey of the N722BD impact site. It cannot identify the object involved.</p></div></article>
 <article class="il-card il-audit"><div class="il-audit-time">01:10<small>v15044… CLIP</small></div><div><h3>TNT comparison and generated crater</h3><p>The energy comparison at 01:10 and CG crater at 01:14 are presentation graphics, not measured impact energy, explosive yield or crater geometry. No TNT-equivalence estimate is carried into this reconstruction.</p></div></article>
 <article class="il-card il-audit"><div class="il-audit-time">00:38<small>03-09-59 CLIP</small></div><div><h3>Missing-stabilizer overlay</h3><p>The generated aircraft overlay does not establish that a stabilizer detached from the real aircraft, when it detached, or why. Component failure requires corroborated photographs, recovered parts and investigation findings.</p></div></article>
 <article class="il-card il-audit"><div class="il-audit-time">00:13<small>03-07-53 CLIP</small></div><div><h3>Cockpit clip is not authenticated to this flight</h3><p>The visible cockpit credit is dated “9/2/26.” It does not establish footage from the November 1 accident flight. It may be a visual reference for a cockpit, not evidence of the accident crew's actions.</p></div></article></div></div>
 <div class="il-linkrow"><a href="${SOURCES.ntsb}" target="_blank" rel="noopener">NTSB investigation ↗</a><a href="${SOURCES.faa}" target="_blank" rel="noopener">FAA statement ↗</a><a href="${SOURCES.track}" target="_blank" rel="noopener">Public flight-track / ATC reporting ↗</a><a href="${SOURCES.docket}" target="_blank" rel="noopener">NTSB docket status ↗</a><a href="${SOURCES.method}" target="_blank" rel="noopener">Investigation methods ↗</a></div>
 <p class="il-footer">REVIEWED 03 NOV 2026 · EDUCATIONAL VISUALIZATION · NOT AN NTSB SIMULATION · NO CLAIM OF A COMPLETED PROBABLE-CAUSE FINDING</p></div>`;
 root.querySelector(".il-map-caption").insertAdjacentHTML("beforeend", "<br><small>Imagery: Esri, Vantor, Earthstar Geographics and the GIS User Community.</small>");
 document.body.append(root);
 const end=document.getElementById("endnotice");
 if(end){const b=document.createElement("button");b.type="button";b.className="il-entry";b.textContent="INSPECT IMPACT EVIDENCE →";b.addEventListener("click",()=>open());end.append(b)}
 canvas=document.getElementById("il-canvas");ctx=canvas.getContext("2d");prepModel();
 nav.addEventListener("click",()=>shown?close():open());
 document.getElementById("il-close").addEventListener("click",close);
 ["replay","analysis","sources"].forEach(id=>document.getElementById(id)?.addEventListener("click",()=>{if(shown)close(false)}));
 for(let i=0;i<3;i++){const el=document.getElementById("il-tab-"+i);el.addEventListener("click",()=>setMode(i));el.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();setMode((i+(e.key==="ArrowRight"?1:2))%3);document.getElementById("il-tab-"+mode).focus()}})}
 document.getElementById("il-play").addEventListener("click",()=>{if(time>=10)time=0;playing=!playing;syncPlay();last=performance.now();requestDraw()});
 document.getElementById("il-scrub").addEventListener("input",e=>{time=Number(e.target.value);playing=false;syncPlay();requestDraw()});
 document.getElementById("il-narrate").addEventListener("click",speak);
 canvas.addEventListener("pointerdown",e=>{drag={x:e.clientX,yaw};canvas.setPointerCapture(e.pointerId)});
 canvas.addEventListener("pointermove",e=>{if(drag){yaw=drag.yaw+(e.clientX-drag.x)*.008;requestDraw()}});
 canvas.addEventListener("pointerup",()=>drag=null);canvas.addEventListener("pointercancel",()=>drag=null);
 window.addEventListener("resize",()=>{if(shown){positionOverlay();requestDraw()}});
 document.addEventListener("visibilitychange",()=>{if(document.hidden&&playing){playing=false;syncPlay()}});
 document.addEventListener("keydown",e=>{if(!shown)return;if(e.key==="Escape"){e.preventDefault();close()}if(e.key==="Tab"){const f=Array.from(root.querySelectorAll('button,a,input')).filter(x=>!x.closest('[hidden]')&&!x.disabled);if(!f.length)return;let first=f[0],lastEl=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();lastEl.focus()}else if(!e.shiftKey&&document.activeElement===lastEl){e.preventDefault();first.focus()}}});
 window.IMPACT_LAB={open,close,setMode,getState:()=>({shown,mode,time,playing})};
}
function positionOverlay(){const h=document.querySelector("header");if(h)root.style.top=Math.max(0,h.getBoundingClientRect().bottom)+"px"}
function open(which=0){window.CRASH_APP?.pause?.();previousFocus=document.activeElement;shown=true;root.hidden=false;nav.classList.add("on");nav.setAttribute("aria-pressed","true");positionOverlay();setMode(which);document.getElementById("il-close").focus();last=performance.now();requestDraw()}
function close(restore=true){shown=false;playing=false;stopSpeech();root.hidden=true;nav.classList.remove("on");nav.setAttribute("aria-pressed","false");syncPlay();if(restore&&previousFocus?.isConnected)previousFocus.focus()}
function setMode(i){mode=clamp(i,0,2);stopSpeech();for(let j=0;j<3;j++){let tab=document.getElementById("il-tab-"+j);tab.setAttribute("aria-selected",String(j===mode));tab.tabIndex=j===mode?0:-1;document.getElementById("il-pane-"+j).hidden=j!==mode}if(mode!==0){playing=false;syncPlay()}requestDraw()}
function syncPlay(){let b=document.getElementById("il-play");if(b){b.textContent=playing?"Ⅱ PAUSE":time>=10?"↻ REPLAY":"▶ PLAY";b.setAttribute("aria-pressed",String(playing))}}
function stopSpeech(){if(narrating){if(window.CRASH_VOICE)window.CRASH_VOICE.stop();else if(window.speechSynthesis)window.speechSynthesis.cancel();}narrating=false;const b=document.getElementById("il-narrate");if(b){b.textContent="▶ NARRATE THIS VIEW";b.setAttribute("aria-pressed","false")}const s=document.getElementById("il-narration-status");if(s)s.textContent=""}
function speak(){if(narrating){stopSpeech();return}const status=document.getElementById("il-narration-status");if(!window.CRASH_VOICE){status.textContent="Voice unavailable. The full explanation is shown in the panels.";return}narrating=true;document.getElementById("il-narrate").textContent="■ STOP NARRATION";document.getElementById("il-narrate").setAttribute("aria-pressed","true");status.textContent="Educational device voice · not a recording of ATC or 911";window.CRASH_VOICE.speak(NARRATION[mode],{onend:stopSpeech,onerror:()=>{stopSpeech();status.textContent="Voice is unavailable. Choose an installed English voice in Voice Settings; the explanation remains visible."}})}
function requestDraw(){if(!raf&&shown&&mode===0)raf=requestAnimationFrame(frame)}
function frame(now){raf=0;if(!shown||mode!==0)return;if(playing){time=Math.min(10,time+Math.max(0,(now-last)/1000));if(time>=10){playing=false;syncPlay()}}last=now;draw();if(playing)requestDraw()}
function rotate(p,rx,ry,rz){let[x,y,z]=p,c=Math.cos(rx),s=Math.sin(rx);[y,z]=[y*c-z*s,y*s+z*c];c=Math.cos(ry);s=Math.sin(ry);[x,z]=[x*c+z*s,-x*s+z*c];c=Math.cos(rz);s=Math.sin(rz);return[x*c-y*s,x*s+y*c,z]}
function draw(){
 let box=canvas.getBoundingClientRect(),w=box.width,h=box.height;if(w<1||h<1||!ctx)return;
 let dpr=Math.min(devicePixelRatio||1,1.7);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}
 ctx.setTransform(dpr,0,0,dpr,0,0);
 let bg=ctx.createLinearGradient(0,0,0,h);bg.addColorStop(0,"#0b2131");bg.addColorStop(.6,"#0b1725");bg.addColorStop(1,"#07121e");ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
 let eye=[Math.cos(yaw)*70,45,Math.sin(yaw)*70],target=[0,13,-10],forward=unit(sub(target,eye)),right=unit(cross(forward,[0,1,0])),up=cross(right,forward),focal=Math.min(w*.94,h*1.45);
 function project(p){let q=sub(p,eye),z=dot(q,forward);return[w*.5+dot(q,right)*focal/z,h*.49-dot(q,up)*focal/z,z]}
 function line(points,color,width=1){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();points.forEach((p,i)=>{let q=project(p);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])});ctx.stroke()}
 function poly(points,color,stroke){ctx.beginPath();points.forEach((p,i)=>{let q=project(p);i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])});ctx.closePath();ctx.fillStyle=color;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=.7;ctx.stroke()}}
 poly([[-34,0,-36],[34,0,-36],[34,0,34],[-34,0,34]],"#112938");
 for(let g=-32;g<=32;g+=4){line([[g,.02,-34],[g,.02,34]],"#30556455");line([[-34,.02,g],[34,.02,g]],"#30556455")}
 const contact=3.7,post=Math.max(0,time-contact),impact=clamp(post/.6,0,1),approach=clamp(time/contact,0,1);
 const crater=clamp(post/1.5,0,1),rim=[];
 for(let j=0;j<48;j++){let a=j/48*Math.PI*2,rad=(1+.12*Math.sin(j*2.8))*crater;rim.push([Math.cos(a)*4.1*rad,.06,Math.sin(a)*3.1*rad+2])}
 if(crater>0){poly(rim,"#16211e","#82694f");for(let j=0;j<48;j++)poly([rim[j],rim[(j+1)%48],[0,-2.1*crater,2]],j%3===0?"#182729":"#1c302f");line(rim.concat([rim[0]]),"#b7956244",1)}
 const pitch=.54,pose=[0,23+(4.7-23)*approach,-28+20.4*approach],render=[];
 const groupTransforms=new Map();
 groups.forEach((g,id)=>{const center=rotate(g.p,pitch,0,0);center[1]+=4.7;center[2]-=7.6;let tt=post,travel=(1-Math.exp(-tt*.65))/.65;let position=[center[0]+g.v[0]*travel,Math.max(.25,center[1]+g.v[1]*tt-4*tt*tt),center[2]+g.v[2]*travel];groupTransforms.set(id,{center,position,rotation:g.spin.map(v=>v*tt*clamp(1.2-tt*.12,.3,1.2))})});
 for(let tri of triangles){let points=tri.p.map(p=>{if(!post){let q=rotate(p,pitch,0,0);return[q[0]+pose[0],q[1]+pose[1],q[2]+pose[2]]}const g=groups.get(tri.id),tr=groupTransforms.get(tri.id);let q=rotate(sub(p,g.p),pitch,0,0);q=rotate(q,...tr.rotation);return q.map((v,k)=>v+tr.position[k])});
 let n=unit(cross(sub(points[1],points[0]),sub(points[2],points[0]))),brightness=.54+.46*Math.abs(dot(n,unit([-.5,1,.4]))),color=palette[tri.m].map(v=>Math.round(v*brightness)),q=points.map(project);
 if(q.every(p=>p[2]>1))render.push({q,z:(q[0][2]+q[1][2]+q[2][2])/3,color:"rgb("+color.join(",")+")"});
 }
 render.sort((a,b)=>b.z-a.z);
 for(let tr of render){ctx.beginPath();tr.q.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=tr.color;ctx.fill()}
 // Seeded, schematic particle field: not a reconstruction of debris size or trajectories.
 if(post>0){let particles=[];for(let j=0;j<45;j++){let a=seed(j+100)*Math.PI*2,rate=1.6+seed(j+200)*4,r=post*rate;let y=Math.max(.2,(3+seed(j+300)*8)*post-2.3*post*post),p=project([Math.cos(a)*r,y,2+Math.sin(a)*r]),size=(1.8+seed(j+400)*3.8)*(1+post*.45)*focal/p[2];particles.push({p,size,j})}particles.sort((a,b)=>b.p[2]-a.p[2]);for(let p of particles){const fire=post<1.9&&p.j%3===0,alpha=fire?clamp(1-post/2,0,.65):clamp(.42-post*.035,0,.35);let grad=ctx.createRadialGradient(p.p[0],p.p[1],0,p.p[0],p.p[1],Math.max(1,p.size));grad.addColorStop(0,fire?"rgba(255,187,87,"+alpha+")":"rgba(162,152,128,"+alpha+")");grad.addColorStop(1,"rgba(90,88,80,0)");ctx.fillStyle=grad;ctx.beginPath();ctx.arc(p.p[0],p.p[1],Math.max(1,p.size),0,Math.PI*2);ctx.fill()}}
 if(time<contact){let from=project([pose[0],pose[1]+4,pose[2]]),to=project([pose[0],pose[1]-1.4,pose[2]+6]);arrow(from,to,"#69e1cd",2);ctx.font="10px system-ui";ctx.fillStyle="#a7f5e6";ctx.fillText("MOTION",from[0]+8,from[1]-8)}
 if(post>0&&post<3){let center=project([0,1,2]),ring=(post*30)%110;ctx.strokeStyle="rgba(237,189,119,"+Math.max(0,.55-post*.15)+")";ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(center[0],center[1],ring,ring*.25,-.2,0,Math.PI*2);ctx.stroke()}
 // Perspective reference axes are scene coordinates, deliberately not geographic bearings.
 let o=project([-23,.1,17]),a=project([-17,.1,17]),b=project([-23,6,17]);arrow(o,a,"#456f82",1);arrow(o,b,"#69e1cd88",1);
 ctx.font="9px system-ui";ctx.fillStyle="#8aaaba";ctx.fillText("3D SCHEMATIC",o[0]-12,o[1]+18);
 let stage=time<contact?0:post<1.2?1:post<3.8?2:3;
 const steps=["01 / MOMENTUM BEFORE CONTACT","02 / ABRUPT DECELERATION","03 / STRUCTURAL BREAKUP + GROUND RESPONSE","04 / AFTERMATH IS NOT AN IDENTIFIER"];
 const captions=["A simplified Learjet approaches an illustrative ground plane. Attitude and descent are chosen to explain mechanics, not reproduce the unknown terminal state.","Contact transfers kinetic energy into deformation and moving fragments. Abrupt deceleration can destroy recognizable aircraft geometry without implying a warhead.","Fragments, displaced ground and a possible fuel-fed fire are different processes. The dust, flame and depression shown are conceptual, not event measurements.","The appearance of a crater cannot, by itself, distinguish a plane, drone or missile. Identification depends on corroborated flight, wreckage and forensic evidence."];
 document.getElementById("il-scene-step").textContent=steps[stage];document.getElementById("il-caption").textContent=captions[stage];
 document.getElementById("il-motion").style.width=(100*(1-clamp(post/1.6,0,1)))+"%";document.getElementById("il-transfer").style.width=(100*clamp(post/1.6,0,1))+"%";
 document.getElementById("il-clock").textContent=time.toFixed(1)+" / 10.0 s · DEMO";document.getElementById("il-scrub").value=time;
 function arrow(a,b,color,width){ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();const ang=Math.atan2(b[1]-a[1],b[0]-a[0]);ctx.beginPath();ctx.moveTo(b[0],b[1]);ctx.lineTo(b[0]-8*Math.cos(ang-.4),b[1]-8*Math.sin(ang-.4));ctx.lineTo(b[0]-8*Math.cos(ang+.4),b[1]-8*Math.sin(ang+.4));ctx.closePath();ctx.fill()}
}
function sub(a,b){return a.map((v,i)=>v-b[i])}
function dot(a,b){return a.reduce((s,v,i)=>s+v*b[i],0)}
function cross(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]}
function unit(p){const n=Math.hypot(...p)||1;return p.map(v=>v/n)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();

