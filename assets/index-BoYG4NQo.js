const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Header-C-BpTWdE.js","assets/react-BWtM72Fx.js","assets/@mantine-B7j5IzgQ.js","assets/react-dom-ENHEuykK.js","assets/scheduler-CzFDRTuY.js","assets/clsx-B-dksMZM.js","assets/react-remove-scroll-C9novxLy.js","assets/tslib-CDuPK5Eb.js","assets/react-remove-scroll-bar-Czpue0a7.js","assets/react-style-singleton-BIVBt-Vp.js","assets/get-nonce-C-Z93AgS.js","assets/use-sidecar-DzVV1Gvo.js","assets/use-callback-ref-Cdr6255r.js","assets/@floating-ui-Jo3C7ps3.js","assets/@mantine-CRvUfnKs.css","assets/@tabler-CrUswVqm.js","assets/Header-BuU2bPh2.css"])))=>i.map(i=>d[i]);
var W=Object.defineProperty;var J=(t,n,s)=>n in t?W(t,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[n]=s;var I=(t,n,s)=>J(t,typeof n!="symbol"?n+"":n,s);import{r as d,j as e}from"./react-BWtM72Fx.js";import{c as U}from"./react-dom-ENHEuykK.js";import{u as V,a as Z,A as q,b as Q,M as j,C as X,c as R,G as g,B as Y,D as ee,T as p,d as O,e as te,I as ne,L as v,f as se,g as L,h as ae,S as oe,i as b,j as re,k as ie}from"./@mantine-B7j5IzgQ.js";import{c as ce,R as le}from"./react-router-dom-DnyMb5wX.js";import{I as de,a as me,b as ue,c as he,d as _e,e as ge,f as pe,_ as xe}from"./@tabler-CrUswVqm.js";import{b as z,c as fe,N as je}from"./react-router-DTFYkBkC.js";import{c as ke}from"./clsx-B-dksMZM.js";import"./scheduler-CzFDRTuY.js";import"./react-remove-scroll-C9novxLy.js";import"./tslib-CDuPK5Eb.js";import"./react-remove-scroll-bar-Czpue0a7.js";import"./react-style-singleton-BIVBt-Vp.js";import"./get-nonce-C-Z93AgS.js";import"./use-sidecar-DzVV1Gvo.js";import"./use-callback-ref-Cdr6255r.js";import"./@floating-ui-Jo3C7ps3.js";import"./@remix-run-CGYEatoU.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();function w(){const t=V(),{colorScheme:n,toggleColorScheme:s,setColorScheme:i}=Z();return d.useEffect(()=>{const a=localStorage.getItem("mantine-color-scheme-value");if(a&&["light","dark"].includes(a))i(a);else{const o=window.matchMedia("(prefers-color-scheme: dark)").matches;i(o?"dark":"light")}},[i]),e.jsx(q,{variant:"outline",color:n==="dark"?t.colors.yellow[5]:t.colors.blue[5],onClick:()=>s(),title:"Toggle color scheme",size:"lg",children:n==="dark"?e.jsx(de,{size:23}):e.jsx(me,{size:23})})}const M={NAME:"Karan Trehan"},P={LINKS:[{link:"/about",label:"About Me"},{link:"/projects",label:"Projects",links:[{link:"https://karantrehan3.github.io/dm-sender-public/",label:"Slack DM Sender"},{link:"https://karantrehan3.github.io/docker-localstack/",label:"Run AWS Locally (Docker-Localstack)"},{link:"https://karantrehan3.github.io/Hand-Gesture-Recognition-Based-Interactive-Gaming/",label:"Gesture-Controlled Interactive Gaming"}]},{link:"/contact",label:"Contact"}]},B={CALENDAR:{LINK:"https://calendar.google.com/calendar/appointments/schedules/AcZssZ3nBgl1MCdRSIhS0l8BpAAbKNbEFtK4lq-GABDCbFGxBieZeCoLzxTpZX34OiHnDyoJkO-ufkWv?gv=true"}},G={EMAIL:{ID:"karantrehan3@gmail.com",SUBJECT:"Let's Connect! 🚀"},LINKEDIN:"https://www.linkedin.com/in/karantrehan3/",GITHUB:"https://github.com/karantrehan3"},H="/assets/dp/profile.jpg",F={CARDS:[{imageSource:"/assets/projects/1.png",title:"Slack DM Sender",link:"https://karantrehan3.github.io/dm-sender-public/",description:"A Slack bot that allows you to send direct messages to users in your workspace, appearing as if sent by you. Ideal for automated communication."},{imageSource:"/assets/projects/2.png",title:"Run AWS Locally (Docker-Localstack)",link:"https://karantrehan3.github.io/docker-localstack/",description:"Simplify your local development by emulating AWS cloud services using Localstack within Docker. This setup enables seamless testing and development of AWS-dependent applications locally, supporting S3 and SQS as of now, and ensuring faster feedback loops without incurring cloud costs."},{imageSource:"/assets/projects/3.png",title:"Gesture-Controlled Interactive Gaming",link:"https://karantrehan3.github.io/Hand-Gesture-Recognition-Based-Interactive-Gaming/",description:"An innovative computer vision project enabling hand gestures to control a game. Map gestures to W, A, S, D keys for a dynamic, hands-free gaming experience."}]},be={TITLE:M,HEADER:P,CONTACT:B,SOCIALS:G,AVATAR:H,PROJECTS:F},ve=Object.freeze(Object.defineProperty({__proto__:null,AVATAR:H,CONTACT:B,HEADER:P,PROJECTS:F,SOCIALS:G,TITLE:M,default:be},Symbol.toStringTag,{value:"Module"}));class Ne{constructor(){I(this,"config");this.config=ve}get(n){return n.split(".").reduce((s,i)=>s?s[i]:void 0,this.config)}}const l=new Ne,Ce="_header_15tkk_1",Se="_inner_15tkk_7",ye="_wrapper_15tkk_14",Ae="_center_15tkk_22",Ie="_right_15tkk_31",Le="_link_15tkk_38",we="_linkLabel_15tkk_58",Ee="_drawer_15tkk_63",c={header:Ce,inner:Se,wrapper:ye,center:Ae,right:Ie,link:Le,linkLabel:we,drawer:Ee},C=[{link:"/home",label:"Home"},...l.get("HEADER.LINKS")||[]];function Te(){const[t,{toggle:n,close:s}]=Q(!1),[i,a]=d.useState(C[0].link),o=z(),m=fe();d.useEffect(()=>{const r=m.pathname,f=C.find(u=>u.link===r);f&&a(f.link)},[m]);const A=C.map(r=>{var f;return(f=r.links)!=null&&f.length?e.jsxs(j,{trigger:"hover",transitionProps:{exitDuration:0},withinPortal:!0,children:[e.jsx(j.Target,{children:e.jsx("a",{href:r.link,className:c.link,"data-active":i===r.link||void 0,onClick:u=>{u.preventDefault(),o(r.link),s()},children:e.jsxs(X,{children:[e.jsx("span",{className:c.linkLabel,children:r.label}),e.jsx(ue,{size:"0.9rem",stroke:1.5})]})})}),e.jsx(j.Dropdown,{children:r.links.map(u=>e.jsx(j.Item,{onClick:K=>{K.preventDefault(),window.open(u.link,"_self"),s()},children:u.label},u.link))})]},r.label):e.jsx("a",{href:r.link,className:c.link,"data-active":i===r.link||void 0,onClick:u=>{u.preventDefault(),o(r.link),s()},children:r.label},r.label)});return e.jsx("header",{className:c.header,children:e.jsxs(R,{size:"xxl",className:c.inner,children:[e.jsxs(g,{visibleFrom:"xs",className:c.wrapper,children:[e.jsx(g,{gap:5,visibleFrom:"xs",className:c.center,children:A}),e.jsx(g,{visibleFrom:"xs",className:c.right,children:e.jsx(w,{})})]}),e.jsx(Y,{opened:t,onClick:n,hiddenFrom:"xs",size:"sm"}),e.jsx(ee,{opened:t,onClose:s,hiddenFrom:"xs",padding:"md",children:e.jsx(g,{className:c.drawer,children:A})}),e.jsx(g,{hiddenFrom:"xs",className:c.right,children:e.jsx(w,{})})]})})}const $e="_footer_ucmao_1",De="_copyright_ucmao_6",E={footer:$e,copyright:De};function Re(){return e.jsx("footer",{className:E.footer,children:e.jsxs(p,{className:E.copyright,children:["© ",l.get("TITLE.NAME"),", ",new Date().getFullYear()]})})}const Oe="_pageContainer_5ujr1_1",ze={pageContainer:Oe},N=({children:t,header:n=!0,footer:s=!0})=>e.jsxs("div",{className:ze.pageContainer,children:[n&&e.jsx(Te,{}),t,s&&e.jsx(Re,{})]}),Me="_title_a4ohh_1",Pe={title:Me};function Be(){return e.jsx("div",{children:e.jsxs(O,{className:Pe.title,children:["Howdy! I am"," ",e.jsx(p,{inherit:!0,variant:"gradient",component:"span",gradient:{from:"yellow",to:"red"},children:l.get("TITLE.NAME")})]})})}const Ge="_dot_12uby_9",He="_stretch_12uby_1",Fe={dot:Ge,stretch:He,"stretch-mobile":"_stretch-mobile_12uby_1"},Ke=d.forwardRef(({className:t,...n},s)=>e.jsx(te,{component:"section",className:ke(Fe.dot,t),...n,ref:s})),We="_loader_15k5e_1",Je="_text_15k5e_9",T={loader:We,text:Je};function Ue(){return e.jsxs("div",{children:[e.jsx(p,{className:T.text,children:"This portfolio is a build in progress."}),e.jsx(Ke,{className:T.loader})]})}const Ve="_label_18t6m_15",Ze="_indicator_18t6m_20",qe="_loader_18t6m_27",Qe="_hidden_18t6m_31",Xe="_avatar_18t6m_35",Ye="_avatarContainer_18t6m_45",et="_avatarOverlay_18t6m_50",_={label:Ve,"rotate-animation":"_rotate-animation_18t6m_1",indicator:Ze,loader:qe,hidden:Qe,avatar:Xe,avatarContainer:Ye,avatarOverlay:et};function tt(){const[t,n]=d.useState(!0);return e.jsx("div",{children:e.jsxs(ne,{inline:!0,label:e.jsx("span",{className:_.label,children:"👋"}),position:"bottom-end",withBorder:!1,className:_.indicator,children:[t&&e.jsx(v,{className:_.loader,type:"dots",size:"xl"}),e.jsxs("div",{className:_.avatarContainer,children:[e.jsx(se,{src:l.get("AVATAR"),className:t?_.hidden:_.avatar,onLoad:()=>n(!1),onContextMenu:s=>s.preventDefault()}),e.jsx("div",{className:_.avatarOverlay,onContextMenu:s=>s.preventDefault()})]})]})})}const nt="_content_1gm3x_1",st="_left_1gm3x_6",at="_right_1gm3x_15",S={content:nt,left:st,right:at};function $(){return e.jsx(N,{children:e.jsxs("div",{className:S.content,children:[e.jsx("div",{className:S.left,children:e.jsx(tt,{})}),e.jsxs("div",{className:S.right,children:[e.jsx(Be,{}),e.jsx(Ue,{})]})]})})}const ot="_card_1g872_1",rt="_img_1g872_15",it="_center_1g872_20",ct="_loader_1g872_27",lt="_hidden_1g872_31",dt="_group_1g872_35",mt="_title_1g872_42",ut="_description_1g872_47",h={card:ot,img:rt,center:it,loader:ct,hidden:lt,group:dt,title:mt,description:ut};function ht({imageSource:t,imageAlt:n="none",title:s,description:i,link:a}){const[o,m]=d.useState(!0);return e.jsxs(L,{className:h.card,onClick:()=>window.open(a,"_self"),children:[e.jsxs(L.Section,{children:[o&&e.jsx("div",{className:h.center,children:e.jsx(v,{className:h.loader,type:"dots",size:"xl"})}),e.jsx(ae,{src:t,alt:n,className:o?h.hidden:h.img,onLoad:()=>m(!1),onError:()=>m(!1)})]}),e.jsx(g,{className:h.group,children:e.jsx(p,{className:h.title,children:s})}),e.jsx(p,{className:h.description,children:i})]})}const _t="_cardsContainer_kts1y_1",gt={cardsContainer:_t};function pt(){const t=l.get("PROJECTS.CARDS");return e.jsx(N,{children:e.jsx("div",{className:gt.cardsContainer,children:t.map((n,s)=>d.createElement(ht,{...n,key:s}))})})}const xt="_center_u0zdu_1",ft="_loader_u0zdu_8",jt="_hidden_u0zdu_12",kt="_iframe_u0zdu_16",k={center:xt,loader:ft,hidden:jt,iframe:kt};function bt(){const[t,n]=d.useState(!0);return e.jsxs("div",{children:[t&&e.jsx("div",{className:k.center,children:e.jsx(v,{className:k.loader,type:"dots",size:"xl"})}),e.jsx("iframe",{title:"Connect on Calendar",src:l.get("CONTACT.CALENDAR.LINK"),className:t?k.hidden:k.iframe,onLoad:()=>n(!1)})]})}const vt="_email_button_1r33y_1",Nt="_email_icon_1r33y_14",Ct="_linkedin_button_1r33y_18",St="_linkedin_icon_1r33y_31",yt="_github_button_1r33y_35",At="_github_icon_1r33y_48",x={email_button:vt,email_icon:Nt,linkedin_button:Ct,linkedin_icon:St,github_button:yt,github_icon:At};function It(){const t=()=>{window.location.href=`mailto:${l.get("SOCIALS.EMAIL.ID")}?subject=${l.get("SOCIALS.EMAIL.SUBJECT")}`},n=()=>{window.open(l.get("SOCIALS.LINKEDIN"),"_blank")},s=()=>{window.open(l.get("SOCIALS.GITHUB"),"_blank")};return e.jsx("div",{children:e.jsxs(oe,{gap:"xl",children:[e.jsx(b,{variant:"default",size:"md",leftSection:e.jsx(he,{size:25,className:x.email_icon}),className:x.email_button,onClick:t,children:"Email"}),e.jsx(b,{variant:"default",size:"md",leftSection:e.jsx(_e,{size:25,className:x.linkedin_icon}),className:x.linkedin_button,onClick:n,children:"LinkedIn"}),e.jsx(b,{variant:"default",size:"md",leftSection:e.jsx(ge,{size:25,className:x.github_icon}),className:x.github_button,onClick:s,children:"GitHub"})]})})}const Lt="_container_wwctl_1",wt="_left_wwctl_9",Et="_right_wwctl_15",y={container:Lt,left:wt,right:Et};function Tt(){return e.jsx(N,{children:e.jsxs("div",{className:y.container,children:[e.jsx("div",{className:y.left,children:e.jsx(It,{})}),e.jsx("div",{className:y.right,children:e.jsx(bt,{})})]})})}const $t="_title_1ur3c_1",Dt={title:$t};function Rt(){const t=z();return e.jsx("div",{children:e.jsxs(R,{children:[e.jsxs(O,{className:Dt.title,ta:"center",children:["Whoops"," ",e.jsx(p,{inherit:!0,variant:"gradient",component:"span",gradient:{from:"yellow",to:"red"},children:"404!"})," ","This page does not exist."]}),e.jsx(p,{c:"dimmed",ta:"center",size:"lg",maw:580,mx:"auto",mt:"xl",children:"If this was a mistake, head back to the home page."}),e.jsx("br",{}),e.jsx(g,{justify:"center",children:e.jsxs(b,{variant:"gradient",title:"Home",onClick:()=>t("/"),size:"lg",gradient:{from:"yellow",to:"red"},children:[e.jsx(pe,{style:{marginRight:5}}),"Home"]})})]})})}const Ot="_center_m4usm_1",zt={center:Ot};function Mt(){return e.jsx(N,{header:!1,children:e.jsx("div",{className:zt.center,children:e.jsx(Rt,{})})})}const Pt="_center_1ey0l_1",Bt="_loader_1ey0l_8",D={center:Pt,loader:Bt},Gt=({children:t})=>e.jsx(d.Suspense,{fallback:e.jsx("div",{className:D.center,children:e.jsx(v,{className:D.loader,type:"dots",size:"xl"})}),children:t}),Ht=d.lazy(()=>xe(()=>import("./Header-C-BpTWdE.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]))),Ft=[{path:"/external",children:[{path:"/external/header",element:e.jsx(Gt,{children:e.jsx(Ht,{})})}]}],Kt=[{path:"/",element:e.jsx(je,{to:"/home"})},{path:"/home",element:e.jsx($,{})},{path:"/about",element:e.jsx($,{})},{path:"/projects",element:e.jsx(pt,{})},{path:"/contact",element:e.jsx(Tt,{})},{path:"*",element:e.jsx(Mt,{})},...Ft],Wt=ce(Kt);function Jt(){return e.jsx(le,{router:Wt})}const Ut=re({fontFamily:"Montserrat, sans-serif",defaultRadius:"md"});function Vt(){return e.jsx(ie,{theme:Ut,children:e.jsx(Jt,{})})}U.createRoot(document.getElementById("root")).render(e.jsx(Vt,{}));
