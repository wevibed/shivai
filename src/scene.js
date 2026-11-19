import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
export const FINISHES={'Brushed gold':[0xd4af37,.22,'#d4af37'],'Chrome':[0xf2f2f2,.05,'#e9e9e9'],'Matte black':[0x1b1b1d,.45,'#1b1b1d'],'Rose gold':[0xc98b7a,.2,'#c98b7a']};
export function createShowroom(canvas,ui){
const offs=[],on=(t,e,f)=>{t.addEventListener(e,f);offs.push(()=>t.removeEventListener(e,f))};let raf;
const cv=canvas;let R;
try{R=new THREE.WebGLRenderer({canvas:cv,antialias:true})}catch(e){}
if(!R){ui.onNoGL&&ui.onNoGL();return null}
R.setPixelRatio(Math.min(devicePixelRatio,1.75));R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFShadowMap;
R.toneMapping=THREE.ACESFilmicToneMapping;R.outputEncoding=THREE.sRGBEncoding;R.setClearColor(0x050506);
const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(34,1,.05,60);S.fog=new THREE.Fog(0x050506,9,24);
const es=new THREE.Scene();es.add(new THREE.Mesh(new THREE.SphereGeometry(40,24,12),new THREE.MeshBasicMaterial({color:0x17171a,side:THREE.BackSide})));
[[0,25,0,40,1,40,4],[-25,8,6,1,18,28,3],[25,5,-8,1,14,24,3],[0,5,30,30,10,1,2]].forEach(([x,y,z,w,h,d,i])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshBasicMaterial({color:new THREE.Color(1,.95,.88).multiplyScalar(i)}));m.position.set(x,y,z);es.add(m)});
const ENV=new THREE.PMREMGenerator(R).fromScene(es,.02).texture;
const mat=(c,m,r,e=1,x={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,metalness:m,roughness:r,envMap:ENV,envMapIntensity:e},x));
function tex(w,h,fn,rx,ry){const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'));const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);t.anisotropy=4;t.encoding=THREE.sRGBEncoding;return t}
const rnd=Math.random;
// white Calacatta-style marble with grey veins
const marble=(rx,ry,base='#f1efeb')=>tex(512,512,x=>{x.fillStyle=base;x.fillRect(0,0,512,512);for(let i=0;i<4000;i++){x.fillStyle='rgba(120,120,125,'+rnd()*.05+')';x.fillRect(rnd()*512,rnd()*512,rnd()*3+1,rnd()*3+1)}
 for(let i=0;i<9;i++){x.strokeStyle='rgba(95,98,105,'+(.12+rnd()*.25)+')';x.lineWidth=.6+rnd()*2.2;x.beginPath();let px=rnd()*512,py=0;x.moveTo(px,py);for(let k=0;k<8;k++){px+=(rnd()-.5)*110;py+=64;x.lineTo(px,py)}x.stroke()}},rx,ry);
// warm travertine / plaster
const trav=(rx,ry)=>tex(512,512,x=>{x.fillStyle='#d9cdb8';x.fillRect(0,0,512,512);for(let i=0;i<6000;i++){x.fillStyle='rgba('+(rnd()<.5?'255,250,240':'120,95,60')+','+rnd()*.08+')';x.fillRect(rnd()*512,rnd()*512,rnd()*3+1,rnd()*2+.5)}
 for(let i=0;i<22;i++){x.fillStyle='rgba(150,125,90,'+(.1+rnd()*.15)+')';x.fillRect(rnd()*512,rnd()*512,60+rnd()*160,1+rnd()*2)}},rx,ry);
const tileA=tex(256,256,x=>{x.fillStyle='#d8d6d2';x.fillRect(0,0,256,256);for(let i=0;i<1800;i++){x.fillStyle='rgba(0,0,0,'+rnd()*.03+')';x.fillRect(rnd()*256,rnd()*256,2,2)}x.fillStyle='#bdbab4';x.fillRect(0,0,256,2);x.fillRect(0,0,2,256)},6,6);
const terr=tex(256,256,x=>{x.fillStyle='#cfc4b2';x.fillRect(0,0,256,256);for(let i=0;i<260;i++){x.fillStyle='rgba('+(rnd()<.5?'140,120,95':'245,238,225')+','+(.3+rnd()*.4)+')';x.beginPath();x.arc(rnd()*256,rnd()*256,1+rnd()*3,0,7);x.fill()}},7,7);
const WALL={rect:marble(2.4,1.2),oval:trav(2,1)},FLOOR={rect:tileA,oval:terr};
const wallM=mat(0xe8e6e2,.05,.45,.5,{map:WALL.rect}),floorM=mat(0xffffff,.3,.25,1,{map:FLOOR.rect});
const metals=[],metal=()=>{const m=mat(0xd4af37,1,.22,1.5);metals.push(m);return m};
const MT=metal(),dk=mat(0x0c0c0e,.6,.35,1),cer=mat(0xf6f4f0,0,.1,1.1,{side:THREE.DoubleSide});
const RB=(w,h,d,r)=>new RoundedBoxGeometry(w,h,d,3,r),B=(w,h,d)=>new THREE.BoxGeometry(w,h,d),Cy=(a,b,h,s=32,o=false)=>new THREE.CylinderGeometry(a,b,h,s,1,o);
const add=(geo,m,x=0,y=0,z=0,p=S)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o};
const tube=(p,r,s=48)=>new THREE.TubeGeometry(new THREE.CatmullRomCurve3(p.map(v=>new THREE.Vector3(...v))),s,r,16);
// room
add(new THREE.PlaneGeometry(16,8),wallM,0,4,-1.75);
const fl=add(new THREE.PlaneGeometry(16,16),floorM,0,0,3);fl.rotation.x=-Math.PI/2;
const warmGlow=new THREE.Color(1,.78,.45);
const strip=(g,w,y,z)=>add(B(w,.012,.03),new THREE.MeshBasicMaterial({color:warmGlow.clone().multiplyScalar(1.4)}),0,y,z,g);
// ---- Set A: double floating marble vanity + rectangular LED mirror
const A=new THREE.Group();S.add(A);
const mA=mat(0xffffff,.05,.2,.8,{map:marble(1.3,.3)});
add(RB(2.8,.5,.95,.02),mA,0,1,-1.25,A);add(RB(2.9,.06,1,.012),mat(0xffffff,.05,.15,.9,{map:marble(1.5,.4)}),0,1.28,-1.25,A);
const gap=new THREE.MeshBasicMaterial({color:0x6b6860});
[-.466,.466].forEach(x=>add(B(.008,.5,.01),gap,x,1,-.77,A));add(B(2.8,.012,.012),MT,0,1.235,-.77,A);
[-.7,.7].forEach(x=>{add(RB(.72,.2,.46,.06),cer,x,1.41,-1.25,A);add(B(.56,.004,.32),mat(0xd9d5cf,0,.3),x,1.512,-1.25,A);
 add(Cy(.04,.04,.015),MT,x,1.8,-1.74,A).rotation.x=Math.PI/2;add(tube([[x,1.8,-1.73],[x,1.8,-1.52],[x,1.72,-1.4]],.017,24),MT,0,0,0,A)});
[[0,.2,0x1c1c1e],[.1,.16,0xd4af37]].forEach(([x,h,c])=>add(Cy(.03,.03,h,24),mat(c,.3,.35,.8),x,1.31+h/2,-1.5,A));
strip(A,2.6,.745,-.95);
const sheen=(()=>{const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d'),g=x.createLinearGradient(0,0,256,256);g.addColorStop(0,'#eef2f4');g.addColorStop(1,'#a9b5bd');x.fillStyle=g;x.fillRect(0,0,256,256);x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.moveTo(40,0);x.lineTo(110,0);x.lineTo(0,110);x.lineTo(0,40);x.fill();x.beginPath();x.moveTo(190,0);x.lineTo(215,0);x.lineTo(0,215);x.lineTo(0,190);x.fill();const t=new THREE.CanvasTexture(x.canvas);t.encoding=THREE.sRGBEncoding;return t})();
const glass=new THREE.MeshBasicMaterial({map:sheen,color:0xd8dde0});
const mirA=new THREE.Mesh(new THREE.PlaneGeometry(1.9,1.1),glass);mirA.position.set(0,2.5,-1.69);A.add(mirA);
const haloA=add(B(2.02,1.22,.01),new THREE.MeshBasicMaterial({color:0xffffff}),0,2.5,-1.745,A);
add(RB(1.96,1.16,.04,.012),dk,0,2.5,-1.72,A);
// ---- Set B: floating stone vanity + elliptical LED mirror
const Bg=new THREE.Group();S.add(Bg);
add(RB(2.4,.62,.9,.02),mat(0xffffff,0,.45,.5,{map:trav(1,.3)}),0,1.05,-1.3,Bg);
add(RB(.5,.5,.02,.01),mat(0xcaa87a,0,.5,.4,{map:tex(256,256,x=>{x.fillStyle='#c3a070';x.fillRect(0,0,256,256);for(let i=0;i<160;i++){x.fillStyle='rgba('+(rnd()<.5?'90,60,30':'255,235,200')+','+rnd()*.12+')';x.fillRect(rnd()*256,0,rnd()*2+.5,256)}},1,1)}),-1.0,1.05,-.84,Bg);
const bowl=add(new THREE.SphereGeometry(1,48,24,0,Math.PI*2,Math.PI/2,Math.PI/2),cer,0,1.36,-1.3,Bg);bowl.scale.set(.55,.12,.33);
add(Cy(.04,.04,.015),MT,0,1.75,-1.74,Bg).rotation.x=Math.PI/2;add(tube([[0,1.75,-1.73],[0,1.75,-1.5],[0,1.67,-1.3]],.017,24),MT,0,0,0,Bg);
strip(Bg,2.1,.73,-.95);
const mirB=new THREE.Mesh(new THREE.CircleGeometry(1,64),glass);mirB.scale.set(.72,.56,1);mirB.position.set(0,2.5,-1.69);Bg.add(mirB);
const haloB=add(new THREE.CircleGeometry(1,64),new THREE.MeshBasicMaterial({color:0xffffff}),0,2.5,-1.745,Bg);haloB.scale.set(.78,.62,1);
Bg.visible=false;
// contact shadows
const BT=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)})();
const blob=(w,h,x,y,z,rx,o)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:BT,transparent:true,opacity:o,depthWrite:false}));m.position.set(x,y,z);m.rotation.x=rx;S.add(m)};
blob(16,.9,0,.3,-1.74,0,.25);blob(3.4,1.6,0,.004,-1.25,-Math.PI/2,.35);
const led=new THREE.PointLight(0xffdca8,1.2,5);led.position.set(0,2.5,-1.2);S.add(led);
const dl=new THREE.PointLight(0xffd8a0,.7,7);dl.position.set(0,3.6,-.6);S.add(dl);
const key=new THREE.DirectionalLight(0xfff1de,.8);key.position.set(1.5,4.5,3.5);key.target.position.set(0,1.3,-1.4);S.add(key,key.target);
key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-3,right:3,top:3,bottom:-1,near:.5,far:14});key.shadow.bias=-.0005;key.shadow.radius=5;
S.add(new THREE.HemisphereLight(0x8a93a8,0x2a2018,.5));const fill=new THREE.DirectionalLight(0xaab4c8,.4);fill.position.set(-3,2.5,5);S.add(fill);
// ui state
let ledOn=true,bright=.8,kel=.2,set='rect';
const warm=new THREE.Color(1,.74,.42),cool=new THREE.Color(.82,.92,1),lc=new THREE.Color();
function paintLed(){lc.copy(warm).lerp(cool,kel);const k=ledOn?.5+bright*1.2:.04;haloA.material.color.copy(lc).multiplyScalar(k);haloB.material.color.copy(lc).multiplyScalar(k);led.color.copy(lc)}
function setFin(k){const f=FINISHES[k];if(!f)return;metals.forEach(m=>{m.color.setHex(f[0]);m.roughness=f[1]})}
function setSet(k){set=k;A.visible=k==='rect';Bg.visible=k==='oval';wallM.map=WALL[k];floorM.map=FLOOR[k];wallM.needsUpdate=floorM.needsUpdate=true}
setFin('Brushed gold');paintLed();
// camera
const smooth=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
function kf(arr,p){for(let i=1;i<arr.length;i++)if(p<=arr[i][0]||i===arr.length-1){const a=arr[i-1],b=arr[i],t=smooth(a[0],b[0],p);return a[1].map((v,k)=>v+(b[1][k]-v)*t)}}
const CP=[[0,[1.8,2.3,9]],[.265,[.6,2.2,3]],[.5,[-1.5,2,.7]],[.735,[1.1,2.1,.9]],[1,[0,2.1,5.6]]];
const CT=[[0,[0,1.8,-1.5]],[.265,[0,1.9,-1.4]],[.5,[0,1.9,-1.4]],[.735,[0,1.9,-1.4]],[1,[0,1.85,-1.4]]];
function size(){const w=innerWidth,h=innerHeight;R.setSize(w,h,false);C.aspect=w/h;C.fov=w/h<1?46:34;C.updateProjectionMatrix()}
on(window,'resize',size);size();
let ox=0,oy=0,down=false,lx=0,ly=0;
on(cv,'pointerdown',e=>{down=true;lx=e.clientX;ly=e.clientY;cv.setPointerCapture(e.pointerId)});
on(window,'pointerup',()=>down=false);
on(cv,'pointermove',e=>{if(down){ox=Math.max(-.8,Math.min(.8,ox-(e.clientX-lx)*.006));oy=Math.max(-.25,Math.min(.35,oy+(e.clientY-ly)*.003));lx=e.clientX;ly=e.clientY}});
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const {story,chs,d3,d4,lbs,load}=ui;
let spP=0,t0=null;const v=new THREE.Vector3(),tg=new THREE.Vector3();
function frame(t){raf=requestAnimationFrame(frame);t*=.001;if(t0===null)t0=t;const el=t-t0;
 if(el>.8&&load)load.classList.add('off');
 const max=story.offsetHeight-innerHeight,p=max>0?Math.min(1,scrollY/max):0;if(scrollY>max+innerHeight*1.1)return;
 spP+=(p-spP)*(calm?1:.075);const q=spP;
 const lo=calm?1:1-Math.pow(1-Math.min(1,el/2.8),3);R.toneMappingExposure=.25+.95*lo;led.intensity=1.2*lo*(ledOn?.4+bright:.05);dl.intensity=.7*lo;
 const cp=kf(CP,q),ct=kf(CT,q),f=C.aspect<1?1.5:1;
 tg.set(...ct);v.set(...cp).sub(tg).multiplyScalar(f);
 if(!down){ox*=.96;oy*=.96}
 const ca=Math.cos(ox),sa=Math.sin(ox),sway=calm?0:Math.sin(t*.35)*.05;
 C.position.set(tg.x+v.x*ca+v.z*sa+sway,tg.y+v.y+oy*v.length(),tg.z-v.x*sa+v.z*ca);C.lookAt(tg);
 const bh=(1-smooth(0,.1,q))*9;lbs.forEach(b=>b.style.height=bh+'svh');
 const a3=smooth(.38,.44,q)*(1-smooth(.58,.64,q)),a4=smooth(.64,.7,q)*(1-smooth(max,max+innerHeight*.4,scrollY));
 d3.style.opacity=a3;d3.style.pointerEvents=a3>.2?'auto':'none';d4.style.opacity=a4;d4.style.pointerEvents=a4>.2?'auto':'none';
 chs.forEach(c=>{const r=c.getBoundingClientRect(),d=(r.top+r.height*.5-innerHeight*.5)/innerHeight;c.style.opacity=Math.max(0,Math.min(1,1.3-Math.abs(d)*1.8))});
 R.render(S,C)}
raf=requestAnimationFrame(frame);
return{setFin,setSet,setLed:v=>{ledOn=v;paintLed()},setBright:v=>{bright=v;paintLed()},setKelvin:v=>{kel=v;paintLed()},dispose(){cancelAnimationFrame(raf);offs.forEach(f=>f());R.dispose()}};
}
