var R=Object.defineProperty;var P=(n,t,a)=>t in n?R(n,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[t]=a;var k=(n,t,a)=>P(n,typeof t!="symbol"?t+"":t,a);import{j as e,r as p}from"./react-BWtM72Fx.js";import{c as G}from"./react-dom-ENHEuykK.js";import{T as A,a as C,u as K,b as F,A as U,c as q,M as x,C as Z,d as w,G as _,B as J,D as W,e as Q,I as V,L as T,f as X,S as Y,g as b,h as ee,i as te}from"./@mantine-CKxrkifC.js";import{c as ne,R as se}from"./react-router-dom-Cd3Qdnhq.js";import{I as ae,a as oe,b as re,c as ie,d as ce,e as le,f as de}from"./@tabler-DjQ02amJ.js";import{b as z,N as me}from"./react-router-CqKF-udQ.js";import{c as he}from"./clsx-B-dksMZM.js";import"./scheduler-CzFDRTuY.js";import"./react-remove-scroll-C9novxLy.js";import"./tslib-CDuPK5Eb.js";import"./react-remove-scroll-bar-Czpue0a7.js";import"./react-style-singleton-BIVBt-Vp.js";import"./get-nonce-C-Z93AgS.js";import"./use-sidecar-DzVV1Gvo.js";import"./use-callback-ref-Cdr6255r.js";import"./@floating-ui-Jo3C7ps3.js";import"./@remix-run-CGYEatoU.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const E={NAME:"Karan Trehan"},D={FAV_ICON_PATH:"./assets/dp/profile.jpg"},$={LINKS:[{link:"/about",label:"About Me"},{link:"/projects",label:"Projects",links:[{link:"https://karantrehan3.github.io/dm-sender-public/",label:"Slack DM Sender"},{link:"https://karantrehan3.github.io/Hand-Gesture-Recognition-Based-Interactive-Gaming/",label:"Hand Gesture Recognition Based Interactive Gaming"}]},{link:"/contact",label:"Contact"}]},B={CALENDAR:{LINK:"https://calendar.google.com/calendar/appointments/schedules/AcZssZ3nBgl1MCdRSIhS0l8BpAAbKNbEFtK4lq-GABDCbFGxBieZeCoLzxTpZX34OiHnDyoJkO-ufkWv?gv=true"}},O={EMAIL:{ID:"karantrehan3@gmail.com",SUBJECT:"Let's Connect! 🚀"},LINKEDIN:"https://www.linkedin.com/in/karantrehan3/",GITHUB:"https://github.com/karantrehan3"},ue={TITLE:E,LINK:D,HEADER:$,CONTACT:B,SOCIALS:O},_e=Object.freeze(Object.defineProperty({__proto__:null,CONTACT:B,HEADER:$,LINK:D,SOCIALS:O,TITLE:E,default:ue},Symbol.toStringTag,{value:"Module"}));class pe{constructor(){k(this,"config");this.config=_e}get(t){return t.split(".").reduce((a,i)=>a?a[i]:void 0,this.config)}}const d=new pe,xe="_title_a4ohh_1",ge={title:xe};function fe(){return e.jsx("div",{children:e.jsxs(A,{className:ge.title,children:["Howdy! I am"," ",e.jsx(C,{inherit:!0,variant:"gradient",component:"span",gradient:{from:"yellow",to:"red"},children:d.get("TITLE.NAME")})]})})}function I(){const n=K(),{colorScheme:t,toggleColorScheme:a,setColorScheme:i}=F();return p.useEffect(()=>{const s=localStorage.getItem("mantine-color-scheme-value");if(s&&["light","dark"].includes(s))i(s);else{const o=window.matchMedia("(prefers-color-scheme: dark)").matches;i(o?"dark":"light")}},[i]),e.jsx(U,{variant:"outline",color:t==="dark"?n.colors.yellow[5]:n.colors.blue[5],onClick:()=>a(),title:"Toggle color scheme",size:"lg",children:t==="dark"?e.jsx(ae,{size:23}):e.jsx(oe,{size:23})})}const je="_header_10tx8_1",be="_inner_10tx8_7",Ce="_wrapper_10tx8_14",Ne="_center_10tx8_22",ve="_right_10tx8_31",ke="_link_10tx8_38",Ie="_linkLabel_10tx8_58",c={header:je,inner:be,wrapper:Ce,center:Ne,right:ve,link:ke,linkLabel:Ie},L=[{link:"/home",label:"Home"},...d.get("HEADER.LINKS")||[]];function H(){const[n,{toggle:t,close:a}]=q(!1),[i,s]=p.useState(L[0].link),o=z(),m=L.map(r=>{var v;return(v=r.links)!=null&&v.length?e.jsxs(x,{trigger:"hover",transitionProps:{exitDuration:0},withinPortal:!0,children:[e.jsx(x.Target,{children:e.jsx("a",{href:r.link,className:c.link,onClick:l=>{l.preventDefault(),o(r.link),a()},children:e.jsxs(Z,{children:[e.jsx("span",{className:c.linkLabel,children:r.label}),e.jsx(re,{size:"0.9rem",stroke:1.5})]})})}),e.jsx(x.Dropdown,{children:r.links.map(l=>e.jsx(x.Item,{onClick:M=>{M.preventDefault(),window.open(l.link,"_self"),a()},children:l.label},l.link))})]},r.label):e.jsx("a",{href:r.link,className:c.link,"data-active":i===r.link||void 0,onClick:l=>{l.preventDefault(),s(r.link),o(r.link),a()},children:r.label},r.label)});return e.jsx("header",{className:c.header,children:e.jsxs(w,{size:"xxl",className:c.inner,children:[e.jsxs(_,{visibleFrom:"xs",className:c.wrapper,children:[e.jsx(_,{gap:5,visibleFrom:"xs",className:c.center,children:m}),e.jsx(_,{visibleFrom:"xs",className:c.right,children:e.jsx(I,{})})]}),e.jsx(J,{opened:n,onClick:t,hiddenFrom:"xs",size:"sm"}),e.jsx(W,{opened:n,onClose:a,hiddenFrom:"xs",padding:"md",children:e.jsxs(_,{children:[m,e.jsx(I,{})]})})]})})}const Le="_dot_12uby_9",Se="_stretch_12uby_1",ye={dot:Le,stretch:Se,"stretch-mobile":"_stretch-mobile_12uby_1"},Ae=p.forwardRef(({className:n,...t},a)=>e.jsx(Q,{component:"section",className:he(ye.dot,n),...t,ref:a})),we="_loader_ynx8n_1",Te="_text_ynx8n_9",S={loader:we,text:Te};function ze(){return e.jsxs("div",{children:[e.jsx(C,{className:S.text,children:"This portfolio is a build in progress."}),e.jsx(Ae,{className:S.loader})]})}const Ee="_label_x5ytp_15",De="_transparent_x5ytp_20",$e="_loader_x5ytp_24",Be="_hidden_x5ytp_28",Oe="_avatar_x5ytp_32",u={label:Ee,"rotate-animation":"_rotate-animation_x5ytp_1",transparent:De,loader:$e,hidden:Be,avatar:Oe},He="/assets/profile-C4Qzn4bF.jpg";function Me(){const[n,t]=p.useState(!0);return e.jsx("div",{children:e.jsxs(V,{inline:!0,label:e.jsx("span",{className:u.label,children:"👋"}),size:100,offset:60,position:"bottom-end",withBorder:!1,className:u.transparent,children:[n&&e.jsx(T,{className:u.loader,type:"dots",size:"xl"}),e.jsx(X,{src:He,className:n?u.hidden:u.avatar,onLoad:()=>t(!1)})]})})}const Re="_pageContainer_ycsxb_1",Pe="_content_ycsxb_7",Ge="_left_ycsxb_12",Ke="_right_ycsxb_21",g={pageContainer:Re,content:Pe,left:Ge,right:Ke};function N(){return e.jsxs("div",{className:g.pageContainer,children:[e.jsx(H,{}),e.jsxs("div",{className:g.content,children:[e.jsx("div",{className:g.left,children:e.jsx(Me,{})}),e.jsxs("div",{className:g.right,children:[e.jsx(fe,{}),e.jsx(ze,{})]})]})]})}const Fe="_center_u0zdu_1",Ue="_loader_u0zdu_8",qe="_hidden_u0zdu_12",Ze="_iframe_u0zdu_16",f={center:Fe,loader:Ue,hidden:qe,iframe:Ze};function Je(){const[n,t]=p.useState(!0);return e.jsxs("div",{children:[n&&e.jsx("div",{className:f.center,children:e.jsx(T,{className:f.loader,type:"dots",size:"xl"})}),e.jsx("iframe",{title:"Connect on Calendar",src:d.get("CONTACT.CALENDAR.LINK"),className:n?f.hidden:f.iframe,onLoad:()=>t(!1)})]})}const We="_email_button_pnzas_1",Qe="_email_icon_pnzas_9",Ve="_linkedin_button_pnzas_13",Xe="_linkedin_icon_pnzas_21",Ye="_github_button_pnzas_25",et="_github_icon_pnzas_33",h={email_button:We,email_icon:Qe,linkedin_button:Ve,linkedin_icon:Xe,github_button:Ye,github_icon:et};function tt(){const n=()=>{window.location.href=`mailto:${d.get("SOCIALS.EMAIL.ID")}?subject=${d.get("SOCIALS.EMAIL.SUBJECT")}`},t=()=>{window.open(d.get("SOCIALS.LINKEDIN"),"_blank")},a=()=>{window.open(d.get("SOCIALS.GITHUB"),"_blank")};return e.jsx("div",{children:e.jsxs(Y,{gap:"xl",children:[e.jsx(b,{variant:"default",size:"md",leftSection:e.jsx(ie,{size:25,className:h.email_icon}),className:h.email_button,onClick:n,children:"Email"}),e.jsx(b,{variant:"default",size:"md",leftSection:e.jsx(ce,{size:25,className:h.linkedin_icon}),className:h.linkedin_button,onClick:t,children:"LinkedIn"}),e.jsx(b,{variant:"default",size:"md",leftSection:e.jsx(le,{size:25,className:h.github_icon}),className:h.github_button,onClick:a,children:"GitHub"})]})})}const nt="_pageContainer_1omrl_1",st="_container_1omrl_7",at="_left_1omrl_15",ot="_right_1omrl_21",j={pageContainer:nt,container:st,left:at,right:ot};function rt(){return e.jsxs("div",{className:j.pageContainer,children:[e.jsx(H,{}),e.jsxs("div",{className:j.container,children:[e.jsx("div",{className:j.left,children:e.jsx(tt,{})}),e.jsx("div",{className:j.right,children:e.jsx(Je,{})})]})]})}const it="_title_1ur3c_1",ct={title:it};function lt(){const n=z();return e.jsx("div",{children:e.jsxs(w,{children:[e.jsxs(A,{className:ct.title,ta:"center",children:["Whoops"," ",e.jsx(C,{inherit:!0,variant:"gradient",component:"span",gradient:{from:"yellow",to:"red"},children:"404!"})," ","This page does not exist."]}),e.jsx(C,{c:"dimmed",ta:"center",size:"lg",maw:580,mx:"auto",mt:"xl",children:"If this was a mistake, head back to the home page."}),e.jsx("br",{}),e.jsx(_,{justify:"center",children:e.jsxs(b,{variant:"gradient",title:"Home",onClick:()=>n("/"),size:"lg",children:[e.jsx(de,{style:{marginRight:5}}),"Home"]})})]})})}const dt="_pageContainer_urq6r_1",mt="_center_urq6r_7",y={pageContainer:dt,center:mt};function ht(){return e.jsx("div",{className:y.pageContainer,children:e.jsx("div",{className:y.center,children:e.jsx(lt,{})})})}const ut=ne([{path:"/",element:e.jsx(me,{to:"/home"})},{path:"/home",element:e.jsx(N,{})},{path:"/about",element:e.jsx(N,{})},{path:"/projects",element:e.jsx(N,{})},{path:"/contact",element:e.jsx(rt,{})},{path:"*",element:e.jsx(ht,{})}]);function _t(){return e.jsx(se,{router:ut})}const pt=ee({fontFamily:"Montserrat, sans-serif",defaultRadius:"md"});function xt(){return e.jsx(te,{theme:pt,children:e.jsx(_t,{})})}G.createRoot(document.getElementById("root")).render(e.jsx(xt,{}));
