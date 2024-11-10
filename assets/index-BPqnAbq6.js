var C=Object.defineProperty;var L=(n,r,s)=>r in n?C(n,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):n[r]=s;var x=(n,r,s)=>L(n,typeof r!="symbol"?r+"":r,s);import{j as e,r as g}from"./react-BWtM72Fx.js";import{c as S}from"./react-dom-ENHEuykK.js";import{T as k,a as u,u as D,b as H,A as M,c as P,M as h,C as R,d as v,G as d,B as A,D as F,e as z,f as O,g as B,h as K}from"./@mantine-CyNLv7ja.js";import{c as G,R as $}from"./react-router-dom-Cd3Qdnhq.js";import{I as W,a as q,b as V,c as J}from"./@tabler-YPf0RnI9.js";import{b as N,N as Q}from"./react-router-CqKF-udQ.js";import{c as U}from"./clsx-B-dksMZM.js";import"./scheduler-CzFDRTuY.js";import"./react-remove-scroll-C9novxLy.js";import"./tslib-CDuPK5Eb.js";import"./react-remove-scroll-bar-Czpue0a7.js";import"./react-style-singleton-BIVBt-Vp.js";import"./get-nonce-C-Z93AgS.js";import"./use-sidecar-DzVV1Gvo.js";import"./use-callback-ref-Cdr6255r.js";import"./@floating-ui-Jo3C7ps3.js";import"./@remix-run-CGYEatoU.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const I={NAME:"Karan Trehan"},w={FAV_ICON_PATH:"/src/assets/dp/KT.jpg"},y={LINKS:[{link:"/about",label:"About Me"},{link:"/projects",label:"Projects",links:[{link:"https://karantrehan3.github.io/dm-sender-public/",label:"Slack DM Sender"},{link:"https://karantrehan3.github.io/Hand-Gesture-Recognition-Based-Interactive-Gaming/",label:"Hand Gesture Recognition Based Interactive Gaming"}]}]},X={TITLE:I,LINK:w,HEADER:y},Y=Object.freeze(Object.defineProperty({__proto__:null,HEADER:y,LINK:w,TITLE:I,default:X},Symbol.toStringTag,{value:"Module"}));class Z{constructor(){x(this,"config");this.config=Y}get(r){return r.split(".").reduce((s,a)=>s?s[a]:void 0,this.config)}}const T=new Z,ee="_title_1kge9_1",te={title:ee};function re(){return e.jsx(e.Fragment,{children:e.jsxs(k,{className:te.title,ta:"center",mt:100,children:["Howdy! I am"," ",e.jsx(u,{inherit:!0,variant:"gradient",component:"span",gradient:{from:"yellow",to:"red"},children:T.get("TITLE.NAME")})]})})}function j(){const n=D(),{colorScheme:r,toggleColorScheme:s,setColorScheme:a}=H();return g.useEffect(()=>{const t=localStorage.getItem("mantine-color-scheme-value");if(t&&["light","dark"].includes(t))a(t);else{const o=window.matchMedia("(prefers-color-scheme: dark)").matches;a(o?"dark":"light")}},[a]),e.jsx(M,{variant:"outline",color:r==="dark"?n.colors.yellow[5]:n.colors.blue[5],onClick:()=>s(),title:"Toggle color scheme",size:"lg",children:r==="dark"?e.jsx(W,{size:23}):e.jsx(q,{size:23})})}const se="_header_1p2b9_1",ne="_inner_1p2b9_8",oe="_wrapper_1p2b9_15",ie="_center_1p2b9_23",ae="_right_1p2b9_32",ce="_link_1p2b9_39",le="_linkLabel_1p2b9_59",c={header:se,inner:ne,wrapper:oe,center:ie,right:ae,link:ce,linkLabel:le},_=[{link:"/home",label:"Home"},...T.get("HEADER.LINKS")||[]];function me(){const[n,{toggle:r,close:s}]=P(!1),[a,t]=g.useState(_[0].link),o=N(),m=_.map(i=>{var f;return(f=i.links)!=null&&f.length?e.jsxs(h,{trigger:"hover",transitionProps:{exitDuration:0},withinPortal:!0,children:[e.jsx(h.Target,{children:e.jsx("a",{href:i.link,className:c.link,onClick:l=>{l.preventDefault(),o(i.link),s()},children:e.jsxs(R,{children:[e.jsx("span",{className:c.linkLabel,children:i.label}),e.jsx(V,{size:"0.9rem",stroke:1.5})]})})}),e.jsx(h.Dropdown,{children:i.links.map(l=>e.jsx(h.Item,{onClick:E=>{E.preventDefault(),window.open(l.link,"_blank"),s()},children:l.label},l.link))})]},i.label):e.jsx("a",{href:i.link,className:c.link,"data-active":a===i.link||void 0,onClick:l=>{l.preventDefault(),t(i.link),o(i.link),s()},children:i.label},i.label)});return e.jsx("header",{className:c.header,children:e.jsxs(v,{size:"xxl",className:c.inner,children:[e.jsxs(d,{visibleFrom:"xs",className:c.wrapper,children:[e.jsx(d,{gap:5,visibleFrom:"xs",className:c.center,children:m}),e.jsx(d,{visibleFrom:"xs",className:c.right,children:e.jsx(j,{})})]}),e.jsx(A,{opened:n,onClick:r,hiddenFrom:"xs",size:"sm"}),e.jsx(F,{opened:n,onClose:s,hiddenFrom:"xs",padding:"md",children:e.jsxs(d,{children:[m,e.jsx(j,{})]})})]})})}const de="_dot_1a73c_9",he="_stretch_1a73c_1",ue={dot:de,stretch:he,"stretch-mobile":"_stretch-mobile_1a73c_1"},pe=g.forwardRef(({className:n,...r},s)=>e.jsx(z,{component:"section",className:U(ue.dot,n),...r,ref:s})),ge="_loader_16m5i_1",fe={loader:ge};function xe(){return e.jsxs(e.Fragment,{children:[e.jsx(u,{c:"dimmed",ta:"center",size:"lg",maw:580,mx:"auto",mt:"xl",children:"This portfolio is a build in progress."}),e.jsx(pe,{className:fe.loader})]})}function p(){return e.jsxs(e.Fragment,{children:[e.jsx(me,{}),e.jsx(re,{}),e.jsx(xe,{})]})}const je="_root_1aft4_1",_e="_title_1aft4_6",b={root:je,title:_e};function be(){const n=N();return e.jsx(e.Fragment,{children:e.jsxs(v,{className:b.root,children:[e.jsxs(k,{className:b.title,ta:"center",mt:100,children:["Whoops"," ",e.jsx(u,{inherit:!0,variant:"gradient",component:"span",gradient:{from:"yellow",to:"red"},children:"404!"})," ","This page does not exist."]}),e.jsx(u,{c:"dimmed",ta:"center",size:"lg",maw:580,mx:"auto",mt:"xl",children:"If this was a mistake, head back to the home page."}),e.jsx("br",{}),e.jsx(d,{justify:"center",children:e.jsxs(O,{variant:"gradient",title:"Home",onClick:()=>n("/"),size:"lg",children:[e.jsx(J,{style:{marginRight:5}}),"Home"]})})]})})}function ke(){return e.jsx(e.Fragment,{children:e.jsx(be,{})})}const ve=G([{path:"/",element:e.jsx(Q,{to:"/home"})},{path:"/home",element:e.jsx(p,{})},{path:"/about",element:e.jsx(p,{})},{path:"/projects",element:e.jsx(p,{})},{path:"*",element:e.jsx(ke,{})}]);function Ne(){return e.jsx($,{router:ve})}const Ie=B({fontFamily:"Montserrat, sans-serif",defaultRadius:"md"});function we(){return e.jsx(K,{theme:Ie,children:e.jsx(Ne,{})})}S.createRoot(document.getElementById("root")).render(e.jsx(we,{}));