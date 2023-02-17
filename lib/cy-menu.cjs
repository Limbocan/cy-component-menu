"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const I={};function Be(e){I.context=e}const He=(e,t)=>e===t,Ke=Symbol("solid-track"),z={equals:He};let ge=$e;const K=1,D=2,ye={owned:null,cleanups:null,context:null,owner:null};var b=null;let U=null,w=null,S=null,O=null,ue=0;function Z(e,t){const n=w,s=b,l=e.length===0,i=l?ye:{owned:null,cleanups:null,context:null,owner:t||s},u=l?e:()=>e(()=>W(()=>ae(i)));b=i,w=null;try{return J(u,!0)}finally{w=n,b=s}}function m(e,t){t=t?Object.assign({},z,t):z;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=l=>(typeof l=="function"&&(l=l(n.value)),_e(n,l));return[me.bind(n),s]}function j(e,t,n){const s=ce(e,t,!1,K);X(s)}function Re(e,t,n){ge=Qe;const s=ce(e,t,!1,K);s.user=!0,O?O.push(s):X(s)}function q(e,t,n){n=n?Object.assign({},z,n):z;const s=ce(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,X(s),me.bind(s)}function W(e){const t=w;w=null;try{return e()}finally{w=t}}function Ue(e){return b===null||(b.cleanups===null?b.cleanups=[e]:b.cleanups.push(e)),e}function qe(e,t){const n=Symbol("context");return{id:n,Provider:Je(n),defaultValue:e}}function Fe(e){let t;return(t=xe(b,e.id))!==void 0?t:e.defaultValue}function Ge(e){const t=q(e),n=q(()=>oe(t()));return n.toArray=()=>{const s=n();return Array.isArray(s)?s:s!=null?[s]:[]},n}function me(){const e=U;if(this.sources&&(this.state||e))if(this.state===K||e)X(this);else{const t=S;S=null,J(()=>te(this),!1),S=t}if(w){const t=this.observers?this.observers.length:0;w.sources?(w.sources.push(this),w.sourceSlots.push(t)):(w.sources=[this],w.sourceSlots=[t]),this.observers?(this.observers.push(w),this.observerSlots.push(w.sources.length-1)):(this.observers=[w],this.observerSlots=[w.sources.length-1])}return this.value}function _e(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&J(()=>{for(let l=0;l<e.observers.length;l+=1){const i=e.observers[l],u=U&&U.running;u&&U.disposed.has(i),(u&&!i.tState||!u&&!i.state)&&(i.pure?S.push(i):O.push(i),i.observers&&we(i)),u||(i.state=K)}if(S.length>1e6)throw S=[],new Error},!1)),t}function X(e){if(!e.fn)return;ae(e);const t=b,n=w,s=ue;w=b=e,Ve(e,e.value,s),w=n,b=t}function Ve(e,t,n){let s;try{s=e.fn(t)}catch(l){e.pure&&(e.state=K),be(l)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?_e(e,s):e.value=s,e.updatedAt=n)}function ce(e,t,n,s=K,l){const i={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:b,context:null,pure:n};return b===null||b!==ye&&(b.owned?b.owned.push(i):b.owned=[i]),i}function ee(e){const t=U;if(e.state===0||t)return;if(e.state===D||t)return te(e);if(e.suspense&&W(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ue);)(e.state||t)&&n.push(e);for(let s=n.length-1;s>=0;s--)if(e=n[s],e.state===K||t)X(e);else if(e.state===D||t){const l=S;S=null,J(()=>te(e,n[0]),!1),S=l}}function J(e,t){if(S)return e();let n=!1;t||(S=[]),O?n=!0:O=[],ue++;try{const s=e();return We(n),s}catch(s){S||(O=null),be(s)}}function We(e){if(S&&($e(S),S=null),e)return;const t=O;O=null,t.length&&J(()=>ge(t),!1)}function $e(e){for(let t=0;t<e.length;t++)ee(e[t])}function Qe(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:ee(s)}for(I.context&&Be(),t=0;t<n;t++)ee(e[t])}function te(e,t){const n=U;e.state=0;for(let s=0;s<e.sources.length;s+=1){const l=e.sources[s];l.sources&&(l.state===K||n?l!==t&&ee(l):(l.state===D||n)&&te(l,t))}}function we(e){const t=U;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(!s.state||t)&&(s.state=D,s.pure?S.push(s):O.push(s),s.observers&&we(s))}}function ae(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),l=n.observers;if(l&&l.length){const i=l.pop(),u=n.observerSlots.pop();s<l.length&&(i.sourceSlots[u]=s,l[s]=i,n.observerSlots[s]=u)}}if(e.owned){for(t=0;t<e.owned.length;t++)ae(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Xe(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function be(e){throw e=Xe(e),e}function xe(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:xe(e.owner,t):void 0}function oe(e){if(typeof e=="function"&&!e.length)return oe(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const s=oe(e[n]);Array.isArray(s)?t.push.apply(t,s):t.push(s)}return t}return e}function Je(e,t){return function(s){let l;return j(()=>l=W(()=>(b.context={[e]:s.value},Ge(()=>s.children))),void 0),l}}const Ye=Symbol("fallback");function he(e){for(let t=0;t<e.length;t++)e[t]()}function Ze(e,t,n={}){let s=[],l=[],i=[],u=0,o=t.length>1?[]:null;return Ue(()=>he(i)),()=>{let c=e()||[],f,r;return c[Ke],W(()=>{let a=c.length,v,g,p,L,A,x,P,N,d;if(a===0)u!==0&&(he(i),i=[],s=[],l=[],u=0,o&&(o=[])),n.fallback&&(s=[Ye],l[0]=Z(_=>(i[0]=_,n.fallback())),u=1);else if(u===0){for(l=new Array(a),r=0;r<a;r++)s[r]=c[r],l[r]=Z(y);u=a}else{for(p=new Array(a),L=new Array(a),o&&(A=new Array(a)),x=0,P=Math.min(u,a);x<P&&s[x]===c[x];x++);for(P=u-1,N=a-1;P>=x&&N>=x&&s[P]===c[N];P--,N--)p[N]=l[P],L[N]=i[P],o&&(A[N]=o[P]);for(v=new Map,g=new Array(N+1),r=N;r>=x;r--)d=c[r],f=v.get(d),g[r]=f===void 0?-1:f,v.set(d,r);for(f=x;f<=P;f++)d=s[f],r=v.get(d),r!==void 0&&r!==-1?(p[r]=l[f],L[r]=i[f],o&&(A[r]=o[f]),r=g[r],v.set(d,r)):i[f]();for(r=x;r<a;r++)r in p?(l[r]=p[r],i[r]=L[r],o&&(o[r]=A[r],o[r](r))):l[r]=Z(y);l=l.slice(0,u=a),s=c.slice(0)}return l});function y(a){if(i[r]=a,o){const[v,g]=m(r);return o[r]=g,t(c[r],v)}return t(c[r])}}}function B(e,t){return W(()=>e(t||{}))}function ze(e){const t="fallback"in e&&{fallback:()=>e.fallback};return q(Ze(()=>e.each,e.children,t||void 0))}function De(e,t,n){let s=n.length,l=t.length,i=s,u=0,o=0,c=t[l-1].nextSibling,f=null;for(;u<l||o<i;){if(t[u]===n[o]){u++,o++;continue}for(;t[l-1]===n[i-1];)l--,i--;if(l===u){const r=i<s?o?n[o-1].nextSibling:n[i-o]:c;for(;o<i;)e.insertBefore(n[o++],r)}else if(i===o)for(;u<l;)(!f||!f.has(t[u]))&&t[u].remove(),u++;else if(t[u]===n[i-1]&&n[o]===t[l-1]){const r=t[--l].nextSibling;e.insertBefore(n[o++],t[u++].nextSibling),e.insertBefore(n[--i],r),t[l]=n[i]}else{if(!f){f=new Map;let y=o;for(;y<i;)f.set(n[y],y++)}const r=f.get(t[u]);if(r!=null)if(o<r&&r<i){let y=u,a=1,v;for(;++y<l&&y<i&&!((v=f.get(t[y]))==null||v!==r+a);)a++;if(a>r-o){const g=t[u];for(;o<r;)e.insertBefore(n[o++],g)}else e.replaceChild(n[o++],t[u++])}else u++;else t[u++].remove()}}}const ve="_$DX_DELEGATE";function et(e,t,n,s={}){let l;return Z(i=>{l=i,t===document?e():M(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{l(),t.textContent=""}}function k(e,t,n){const s=document.createElement("template");s.innerHTML=e;let l=s.content.firstChild;return n&&(l=l.firstChild),l}function tt(e,t=window.document){const n=t[ve]||(t[ve]=new Set);for(let s=0,l=e.length;s<l;s++){const i=e[s];n.has(i)||(n.add(i),t.addEventListener(i,nt))}}function Se(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function Q(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ae(e,t,n){return W(()=>e(t,n))}function M(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return ne(e,t,s,n);j(l=>ne(e,t(),l,n),s)}function nt(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),I.registry&&!I.done&&(I.done=!0,document.querySelectorAll("[id^=pl-]").forEach(s=>s.remove()));n!==null;){const s=n[t];if(s&&!n.disabled){const l=n[`${t}Data`];if(l!==void 0?s.call(n,l,e):s.call(n,e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function ne(e,t,n,s,l){for(I.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const i=typeof t,u=s!==void 0;if(e=u&&n[0]&&n[0].parentNode||e,i==="string"||i==="number"){if(I.context)return n;if(i==="number"&&(t=t.toString()),u){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=V(e,n,s,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||i==="boolean"){if(I.context)return n;n=V(e,n,s)}else{if(i==="function")return j(()=>{let o=t();for(;typeof o=="function";)o=o();n=ne(e,o,n,s)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(ie(o,t,n,l))return j(()=>n=ne(e,o,n,s,!0)),()=>n;if(I.context){if(!o.length)return n;for(let f=0;f<o.length;f++)if(o[f].parentNode)return n=o}if(o.length===0){if(n=V(e,n,s),u)return n}else c?n.length===0?pe(e,o,s):De(e,n,o):(n&&V(e),pe(e,o));n=o}else if(t instanceof Node){if(I.context&&t.parentNode)return n=u?[t]:t;if(Array.isArray(n)){if(u)return n=V(e,n,s,t);V(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function ie(e,t,n,s){let l=!1;for(let i=0,u=t.length;i<u;i++){let o=t[i],c=n&&n[i];if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))l=ie(e,o,c)||l;else if(typeof o=="function")if(s){for(;typeof o=="function";)o=o();l=ie(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||l}else e.push(o),l=!0;else{const f=String(o);c&&c.nodeType===3&&c.data===f?e.push(c):e.push(document.createTextNode(f))}}return l}function pe(e,t,n=null){for(let s=0,l=t.length;s<l;s++)e.insertBefore(t[s],n)}function V(e,t,n,s){if(n===void 0)return e.textContent="";const l=s||document.createTextNode("");if(t.length){let i=!1;for(let u=t.length-1;u>=0;u--){const o=t[u];if(l!==o){const c=o.parentNode===e;!i&&!u?c?e.replaceChild(l,o):e.insertBefore(l,n):c&&o.remove()}else i=!0}}else e.insertBefore(l,n);return[l]}const st=e=>!!(e&&e.nodeName&&e.nodeType===1),lt=e=>st(e)?e:typeof e=="string"?document.querySelector(e):document.createElement("div"),se=e=>{if(e instanceof Function)return e;{const t=document.createElement("div");return()=>t}},re=(e=[],t=0,n="children",s="key",l=[])=>{const i=[];return!e||e.length<1?[]:(e.forEach(u=>{const o=[...l,u[s]],c=Object.assign(u,{level:t,parentKeyList:o});u[n]&&(c[n]=re(u[n],t+1,n,s,o)),i.push(c)}),i)},Pe=(e=[],t=[],n,s,l=[])=>(e.forEach(i=>{t.includes(i[n])&&l.push(i),i[s]&&i[s].length&&Pe(i[s],t,n,s,l)}),l),Ce=qe();function ot(e){const[t,n]=m(e.slots.headerSlot||null),[s,l]=m(e.slots.footerSlot||null),[i,u]=m(e.slots.menuSlot||null),[o,c]=m(e.slots.menuIconSlot||null),[f,r]=m(e.props.activeMenu||null),[y,a]=m([]),[v,g]=m(e.props.footerHeight||"0"),[p,L]=m({}),[A,x]=m(e.props.expand||!0),[P,N]=m(e.props.unique||!0),[d,_]=m(e.props.data||[]),[h,$]=m(e.props.labelProp||"label"),[C,H]=m(e.props.keyProp||"key"),[R,T]=m(e.props.childProp||"children"),[Y,Me]=m(e.props.openKeys||[]),[Ne,de]=m([]),[Le,ke]=m(e.props.height||"100%"),[Ie,Te]=m(e.props.width||"240px"),[Oe,je]=m(e.props.alwaysPopover||!1);_(()=>[...re(d(),0,R(),C())]);const F={headerSlot:{value:t,change:n},footerSlot:{value:s,change:l},menuSlot:{value:i,change:u},menuIconSlot:{value:o,change:c},activeMenu:{value:f,change:r},activeList:{value:y,change:a},footerHeight:{value:v,change:g},scrollInstance:{value:p,change:L},expand:{value:A,change:E=>x(E===!0||E===!1?E:!A)},unique:{value:P,change:N},data:{value:d,change:E=>{const G=re(E,0,R(),C());_(()=>[...G])}},labelProp:{value:h,change:$},keyProp:{value:C,change:H},childProp:{value:R,change:T},openKeys:{value:Y,change:Me},openMenus:{value:Ne,change:de},height:{value:Le,change:ke},width:{value:Ie,change:Te},alwaysPopover:{value:Oe,change:je},onMenuClick:e.props.onMenuClick};return Object.keys(F).forEach(E=>{if(F[E]instanceof Object){const G=E.slice(0,1).toLocaleUpperCase()+E.slice(1);e.methods[`update${G}`]=F[E].change,e.methods[`get${G}`]=F[E].value}}),Re(()=>{const E=Y(),G=Pe(F.data.value(),E,C(),R());de(()=>G)}),B(Ce.Provider,{value:F,get children(){return e.children}})}function Ee(){return Fe(Ce)}const it=k('<div class="cy-menu-item-popover"></div>'),rt=k('<div class="cy-menu-popover-arrow"></div>'),ut=k('<div class="cy-menu-popover-content"></div>'),ct=k('<div class="cy-menu-popover-name"></div>'),at=e=>{let t=null;const[n,s]=m(!1),l=6,[i,u]=m({stopClose:!1,x:0,y:0,gap:l}),o=(r,y)=>{if(e.disabled)return;if(y==="leave"){u(()=>({...i(),stopClose:!1})),c(!1);return}const{right:a,top:v}=r.target.getBoundingClientRect(),g={x:a,y:v,stopClose:!0,gap:i().gap};if(u(()=>({...g})),!t)return;const p=t.offsetHeight+v-window.screen.height;if(p>0){const A=v-p<0;u(()=>({...i(),y:A?0:v-p,gap:A?l+v:l+p}))}else u(()=>({...i(),gap:l}))},c=r=>{if(!e.disabled){if(!r){setTimeout(()=>{i().stopClose||s(()=>r)},200);return}s(()=>r)}},f=r=>{e.disabled||(u(()=>({...i(),stopClose:r})),r||c(!1))};return e.ref({changePopover:c,setMouseEvent:o}),(()=>{const r=it.cloneNode(!0);r.addEventListener("mouseleave",()=>f(!1)),r.addEventListener("mouseenter",()=>f(!0));const y=t;return typeof y=="function"?Ae(y,r):t=r,M(r,(()=>{const a=q(()=>!!(n()&&!e.disabled));return()=>a()?[rt.cloneNode(!0),(()=>{const v=ut.cloneNode(!0);return M(v,(()=>{const g=q(()=>!!e.childList);return()=>g()?B(fe,{isPopover:!0,get list(){return e.childList}}):(()=>{const p=ct.cloneNode(!0);return M(p,()=>e.name),p})()})()),v})()]:[]})()),j(a=>{const v=le(i().x),g=le(i().y),p=le(i().gap);return v!==a._v$&&r.style.setProperty("--cy-menu-x",a._v$=v),g!==a._v$2&&r.style.setProperty("--cy-menu-y",a._v$2=g),p!==a._v$3&&r.style.setProperty("--cy-menu-popover-gap",a._v$3=p),a},{_v$:void 0,_v$2:void 0,_v$3:void 0}),r})()},le=e=>typeof e!="number"?e:`${e}px`,ft=k("<li><div></div></li>"),dt=k('<div class="cy-menu-item-icon"></div>'),ht=k('<div class="cy-menu-item-label"></div>'),vt=k('<div class="cy-menu-item-arrow"><svg width="100%" height="100%" viewBox="0 0 48 48" fill="none"><path d="M19 12L31 24L19 36" stroke="#787878" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></div>'),pt=k("<div></div>"),gt=e=>{const{expand:t,unique:n,openKeys:s,openMenus:l,activeList:i,activeMenu:u,keyProp:o,labelProp:c,childProp:f,menuSlot:r,menuIconSlot:y,alwaysPopover:a,onMenuClick:v}=Ee(),g=e.data.children&&e.data.children.length>0?e.data.children:null;let p=null;const L=d=>{if(v(d),g||(u.change(()=>u.value()instanceof Object?d:d[o.value()]),i.change(()=>d.parentKeyList)),!g||e.isPopover)return;const _={...d,level:e.level},h=d[o.value()];if(n.value()){const H=l.value().find(T=>T[o.value()]===h),R=l.value().findIndex(T=>T.level===e.level);if(H){s.change(()=>[...s.value()].filter(T=>T!==d[o.value()]));return}if(R>-1){const T=l.value()[R];s.change(()=>[_[o.value()]].concat(s.value().filter(Y=>Y!==T[o.value()])));return}s.change(()=>[...s.value(),h]);return}const $=s.value(),C=$.findIndex(H=>H===h);C>-1?$.splice(C,1):$.push(h),s.change(()=>[...$])},A=d=>{const _=d[o.value()];return s.value().findIndex(C=>C===_)>-1},x=(d,_)=>{!N(d)||(p.changePopover(d),p.setMouseEvent(_,d?"enter":"leave"))},P=d=>{const _=d[o.value()],h=u.value()instanceof Object?u.value()[o.value()]:u.value();return _===h||i.value().includes(d[o.value()])},N=d=>{if(d===!1)return!0;if(!p)return!1;const _=e.isPopover,h=a.value();if(d===!0){if(h)return!0;if(A(e.data)||t.value()||!g&&_)return!1}return!0};return(()=>{const d=ft.cloneNode(!0),_=d.firstChild;return _.addEventListener("mouseleave",h=>x(!1,h)),_.addEventListener("mouseenter",h=>x(!0,h)),_.$$click=()=>L(e.data),M(_,(()=>{const h=q(()=>!!r.value());return()=>h()?se(r.value())(e.data):[(()=>{const $=dt.cloneNode(!0);return M($,(()=>{const C=q(()=>!!y.value());return()=>C()?se(r.value())(e.data):""})()),$})(),(()=>{const $=ht.cloneNode(!0);return M($,()=>e.data[c.value()]),$})(),g?vt.cloneNode(!0):[]]})()),M(d,g?(()=>{const h=pt.cloneNode(!0);return M(h,B(fe,{get list(){return e.data[f.value()]},get level(){return e.level+1}})),j(()=>Q(h,`cy-menu-item-child-list ${s.value().includes(e.data[o.value()])?"cy-menu-item-child-list-open":""}`)),h})():null,null),M(d,B(at,{ref(h){const $=p;typeof $=="function"?$(h):p=h},get name(){return e.data[c.value()]},childList:g,get disabled(){return e.level>0}}),null),j(h=>{const $=`cy-menu-item ${A(e.data)?"cy-menu-item-expand":""} ${P(e.data)?"cy-menu-item-active":""}`,C=e.level,H=`cy-menu-item-box  ${A(e.data)?"cy-menu-item-box-expand":""}`;return $!==h._v$&&Q(d,h._v$=$),C!==h._v$2&&Se(d,"data-level",h._v$2=C),H!==h._v$3&&Q(_,h._v$3=H),h},{_v$:void 0,_v$2:void 0,_v$3:void 0}),d})()};tt(["click"]);const yt=k("<ul></ul>"),fe=e=>(()=>{const t=yt.cloneNode(!0);return M(t,B(ze,{get each(){return e.list},children:n=>B(gt,{data:n,get level(){return e.level},get isPopover(){return e.isPopover}})})),j(n=>{const s=`cy-menu-list ${e.isContent?"cy-menu-content-list":""} ${e.isPopover?"cy-menu-popover-list":""}`,l=e.isPopover?null:e.level;return s!==n._v$&&Q(t,n._v$=s),l!==n._v$2&&Se(t,"data-level",n._v$2=l),n},{_v$:void 0,_v$2:void 0}),t})(),mt=k('<div><div class="cy-menu-header"></div><div class="cy-menu-footer"></div></div>'),_t=()=>{const{headerSlot:e,footerSlot:t,expand:n,data:s,height:l,width:i,footerHeight:u}=Ee();let o={};return(()=>{const c=mt.cloneNode(!0),f=c.firstChild,r=f.nextSibling,y=o;return typeof y=="function"?Ae(y,c):o=c,M(f,()=>se(e.value())("header")),M(c,B(fe,{isContent:!0,get list(){return s.value()},level:0}),r),M(r,()=>se(t.value())("footer")),j(a=>{const v=`cy-menu cy-menu-container ${n.value()?"cy-menu-expand":"cy-menu-shrink"} cy-menu-theme-blue`,g=l.value(),p=i.value(),L=u.value();return v!==a._v$&&Q(c,a._v$=v),g!==a._v$2&&c.style.setProperty("--cy-menu-height",a._v$2=g),p!==a._v$3&&c.style.setProperty("--cy-menu-width",a._v$3=p),L!==a._v$4&&c.style.setProperty("--cy-menu-footer-height",a._v$4=L),a},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),c})()};const $t=(e={data:[],expand:!1},t={},n={})=>B(ot,{props:e,slots:t,methods:n,get children(){return B(_t,{})}}),wt=(e,t,n)=>{const s={},l=et(()=>$t(t,n,s),lt(e));return s.disposer=l,s};exports.renderApp=wt;
