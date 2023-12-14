var V=Object.defineProperty;var F=(e,t,n)=>t in e?V(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var w=(e,t,n)=>(F(e,typeof t!="symbol"?t+"":t,n),n);import{r as g,n as O,p as L,q as G,w as B,x as J,y as P,l as R,z as U,A as W,B as Q,C as X,D as Y}from"./scheduler.6f4350a0.js";let b=!1;function Z(){b=!0}function ee(){b=!1}function te(e,t,n,i){for(;e<t;){const s=e+(t-e>>1);n(s)<=i?e=s+1:t=s}return e}function ne(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const c=[];for(let l=0;l<t.length;l++){const u=t[l];u.claim_order!==void 0&&c.push(u)}t=c}const n=new Int32Array(t.length+1),i=new Int32Array(t.length);n[0]=-1;let s=0;for(let c=0;c<t.length;c++){const l=t[c].claim_order,u=(s>0&&t[n[s]].claim_order<=l?s+1:te(1,s,d=>t[n[d]].claim_order,l))-1;i[c]=n[u]+1;const _=u+1;n[_]=c,s=Math.max(_,s)}const a=[],r=[];let o=t.length-1;for(let c=n[s]+1;c!=0;c=i[c-1]){for(a.push(t[c-1]);o>=c;o--)r.push(t[o]);o--}for(;o>=0;o--)r.push(t[o]);a.reverse(),r.sort((c,l)=>c.claim_order-l.claim_order);for(let c=0,l=0;c<r.length;c++){for(;l<a.length&&r[c].claim_order>=a[l].claim_order;)l++;const u=l<a.length?a[l]:null;e.insertBefore(r[c],u)}}function T(e,t){if(b){for(ne(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function ie(e,t,n){b&&!n?T(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function H(e){e.parentNode&&e.parentNode.removeChild(e)}function ge(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function se(e){return document.createElement(e)}function re(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function C(e){return document.createTextNode(e)}function xe(){return C(" ")}function Se(){return C("")}function ce(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function Ee(e){return function(t){return t.preventDefault(),e.call(this,t)}}function le(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function be(e){return e.dataset.svelteH}function ae(e){return Array.from(e.childNodes)}function oe(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function q(e,t,n,i,s=!1){oe(e);const a=(()=>{for(let r=e.claim_info.last_index;r<e.length;r++){const o=e[r];if(t(o)){const c=n(o);return c===void 0?e.splice(r,1):e[r]=c,s||(e.claim_info.last_index=r),o}}for(let r=e.claim_info.last_index-1;r>=0;r--){const o=e[r];if(t(o)){const c=n(o);return c===void 0?e.splice(r,1):e[r]=c,s?c===void 0&&e.claim_info.last_index--:e.claim_info.last_index=r,o}}return i()})();return a.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,a}function z(e,t,n,i){return q(e,s=>s.nodeName===t,s=>{const a=[];for(let r=0;r<s.attributes.length;r++){const o=s.attributes[r];n[o.name]||a.push(o.name)}a.forEach(r=>s.removeAttribute(r))},()=>i(t))}function De(e,t,n){return z(e,t,n,se)}function Ae(e,t,n){return z(e,t,n,re)}function fe(e,t){return q(e,n=>n.nodeType===3,n=>{const i=""+t;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>C(t),!0)}function Me(e){return fe(e," ")}function Ne(e,t,n,i){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,i?"important":"")}function Oe(e,t,n){e.classList.toggle(t,!!n)}function ue(e,t,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(e,{detail:t,bubbles:n,cancelable:i})}function Ce(e,t){const n=[];let i=0;for(const s of t.childNodes)if(s.nodeType===8){const a=s.textContent.trim();a===`HEAD_${e}_END`?(i-=1,n.push(s)):a===`HEAD_${e}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}const E=new Set;let v;function je(){v={r:0,c:[],p:v}}function Ie(){v.r||g(v.c),v=v.p}function K(e,t){e&&e.i&&(E.delete(e),e.i(t))}function ke(e,t,n,i){if(e&&e.o){if(E.has(e))return;E.add(e),v.c.push(()=>{E.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function de(e){return(e==null?void 0:e.length)!==void 0?e:Array.from(e)}function Le(e,t){e.d(1),t.delete(e.key)}function Be(e,t,n,i,s,a,r,o,c,l,u,_){let d=e.length,m=a.length,h=d;const D={};for(;h--;)D[e[h].key]=h;const x=[],A=new Map,M=new Map,j=[];for(h=m;h--;){const f=_(s,a,h),p=n(f);let $=r.get(p);$?i&&j.push(()=>$.p(f,t)):($=l(p,f),$.c()),A.set(p,x[h]=$),p in D&&M.set(p,Math.abs(h-D[p]))}const I=new Set,k=new Set;function N(f){K(f,1),f.m(o,u),r.set(f.key,f),u=f.first,m--}for(;d&&m;){const f=x[m-1],p=e[d-1],$=f.key,S=p.key;f===p?(u=f.first,d--,m--):A.has(S)?!r.has($)||I.has($)?N(f):k.has(S)?d--:M.get($)>M.get(S)?(k.add($),N(f)):(I.add(S),d--):(c(p,r),d--)}for(;d--;){const f=e[d];A.has(f.key)||c(f,r)}for(;m;)N(x[m-1]);return g(j),x}function Pe(e,t,n,i){const s=new Map;for(let a=0;a<t.length;a++){const r=i(n(e,t,a));if(s.has(r)){let o="";try{o=`with value '${String(r)}' `}catch{}throw new Error(`Cannot have duplicate keys in a keyed each: Keys at index ${s.get(r)} and ${a} ${o}are duplicates`)}s.set(r,a)}}function Re(e){e&&e.c()}function Te(e,t){e&&e.l(t)}function _e(e,t,n){const{fragment:i,after_update:s}=e.$$;i&&i.m(t,n),B(()=>{const a=e.$$.on_mount.map(W).filter(R);e.$$.on_destroy?e.$$.on_destroy.push(...a):g(a),e.$$.on_mount=[]}),s.forEach(B)}function he(e,t){const n=e.$$;n.fragment!==null&&(Q(n.after_update),g(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function me(e,t){e.$$.dirty[0]===-1&&(X.push(e),Y(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function He(e,t,n,i,s,a,r=null,o=[-1]){const c=J;P(e);const l=e.$$={fragment:null,ctx:[],props:a,update:O,not_equal:s,bound:L(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(c?c.$$.context:[])),callbacks:L(),dirty:o,skip_bound:!1,root:t.target||c.$$.root};r&&r(l.root);let u=!1;if(l.ctx=n?n(e,t.props||{},(_,d,...m)=>{const h=m.length?m[0]:d;return l.ctx&&s(l.ctx[_],l.ctx[_]=h)&&(!l.skip_bound&&l.bound[_]&&l.bound[_](h),u&&me(e,_)),d}):[],l.update(),u=!0,g(l.before_update),l.fragment=i?i(l.ctx):!1,t.target){if(t.hydrate){Z();const _=ae(t.target);l.fragment&&l.fragment.l(_),_.forEach(H)}else l.fragment&&l.fragment.c();t.intro&&K(e.$$.fragment),_e(e,t.target,t.anchor),ee(),G()}P(c)}class pe{constructor(){w(this,"$$");w(this,"$$set")}$destroy(){he(this,1),this.$destroy=O}$on(t,n){if(!R(n))return O;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(t){this.$$set&&!U(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const $e="4.2.8",ye="4";function y(e,t){document.dispatchEvent(ue(e,{version:$e,...t},{bubbles:!0}))}function qe(e,t){y("SvelteDOMInsert",{target:e,node:t}),T(e,t)}function ze(e,t,n){y("SvelteDOMInsert",{target:e,node:t,anchor:n}),ie(e,t,n)}function Ke(e){y("SvelteDOMRemove",{node:e}),H(e)}function Ve(e,t,n,i,s,a,r){const o=i===!0?["capture"]:i?Array.from(Object.keys(i)):[];s&&o.push("preventDefault"),a&&o.push("stopPropagation"),r&&o.push("stopImmediatePropagation"),y("SvelteDOMAddEventListener",{node:e,event:t,handler:n,modifiers:o});const c=ce(e,t,n,i);return()=>{y("SvelteDOMRemoveEventListener",{node:e,event:t,handler:n,modifiers:o}),c()}}function Fe(e,t,n){le(e,t,n),n==null?y("SvelteDOMRemoveAttribute",{node:e,attribute:t}):y("SvelteDOMSetAttribute",{node:e,attribute:t,value:n})}function Ge(e,t,n){e[t]=n,y("SvelteDOMSetProperty",{node:e,property:t,value:n})}function Je(e,t){t=""+t,e.data!==t&&(y("SvelteDOMSetData",{node:e,data:t}),e.data=t)}function Ue(e){if(typeof e!="string"&&!(e&&typeof e=="object"&&"length"in e)&&!(typeof Symbol=="function"&&e&&Symbol.iterator in e))throw new Error("{#each} only works with iterable values.");return de(e)}function We(e,t,n){for(const i of Object.keys(t))~n.indexOf(i)||console.warn(`<${e}> received an unexpected slot "${i}".`)}function Qe(e,t){const n="this={...} of <svelte:component> should specify a Svelte component.";try{const i=new e(t);if(!i.$$||!i.$set||!i.$on||!i.$destroy)throw new Error(n);return i}catch(i){const{message:s}=i;throw typeof s=="string"&&s.indexOf("is not a constructor")!==-1?new Error(n):i}}class Xe extends pe{constructor(n){if(!n||!n.target&&!n.$$inline)throw new Error("'target' is a required option");super();w(this,"$$prop_def");w(this,"$$events_def");w(this,"$$slot_def")}$destroy(){super.$destroy(),this.$destroy=()=>{console.warn("Component was already destroyed")}}$capture_state(){}$inject_state(){}}typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ye);export{Ae as A,be as B,qe as C,Ve as D,Ce as E,Ue as F,Pe as G,Oe as H,Be as I,Le as J,Ge as K,Ee as L,ge as M,Xe as S,ze as a,Ie as b,Me as c,y as d,Se as e,K as f,Ke as g,Qe as h,He as i,se as j,De as k,ae as l,Fe as m,Ne as n,C as o,fe as p,Je as q,je as r,xe as s,ke as t,Re as u,We as v,Te as w,_e as x,he as y,re as z};
