"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[1722],{88611:function(e,t,n){n.d(t,{A:function(){return v}});var r=n(67294),o=n(5871),i=n.n(o),a=n(26917),c=n(7444),l=n(44458),s=n(41380),d=n(41981),u=n(93638),h=n(59063),f=n(39354),p=(0,a.c)((function(e,t){var n="__lodash_hash_undefined__",r=1,o=2,i=1/0,c=9007199254740991,l="[object Arguments]",s="[object Array]",d="[object Boolean]",u="[object Date]",h="[object Error]",f="[object Function]",p="[object GeneratorFunction]",m="[object Map]",g="[object Number]",v="[object Object]",_="[object Promise]",y="[object RegExp]",b="[object Set]",w="[object String]",S="[object Symbol]",E="[object WeakMap]",j="[object ArrayBuffer]",A="[object DataView]",x=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,z=/^\w*$/,k=/^\./,C=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,T=/\\(\\)?/g,H=/^\[object .+?Constructor\]$/,O=/^(?:0|[1-9]\d*)$/,I={};I["[object Float32Array]"]=I["[object Float64Array]"]=I["[object Int8Array]"]=I["[object Int16Array]"]=I["[object Int32Array]"]=I["[object Uint8Array]"]=I["[object Uint8ClampedArray]"]=I["[object Uint16Array]"]=I["[object Uint32Array]"]=!0,I[l]=I[s]=I[j]=I[d]=I[A]=I[u]=I[h]=I[f]=I[m]=I[g]=I[v]=I[y]=I[b]=I[w]=I[E]=!1;var L="object"==typeof a.a&&a.a&&a.a.Object===Object&&a.a,M="object"==typeof self&&self&&self.Object===Object&&self,N=L||M||Function("return this")(),B=t&&!t.nodeType&&t,D=B&&e&&!e.nodeType&&e,P=D&&D.exports===B&&L.process,R=function(){try{return P&&P.binding("util")}catch(e){}}(),U=R&&R.isTypedArray;function Q(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}function F(e,t){for(var n=-1,r=e?e.length:0;++n<r;)if(t(e[n],n,e))return!0;return!1}function W(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(e){}return t}function $(e){var t=-1,n=Array(e.size);return e.forEach((function(e,r){n[++t]=[r,e]})),n}function K(e,t){return function(n){return e(t(n))}}function Y(e){var t=-1,n=Array(e.size);return e.forEach((function(e){n[++t]=e})),n}var J,q=Array.prototype,G=Function.prototype,X=Object.prototype,V=N["__core-js_shared__"],Z=(J=/[^.]+$/.exec(V&&V.keys&&V.keys.IE_PROTO||""))?"Symbol(src)_1."+J:"",ee=G.toString,te=X.hasOwnProperty,ne=X.toString,re=RegExp("^"+ee.call(te).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),oe=N.Symbol,ie=N.Uint8Array,ae=K(Object.getPrototypeOf,Object),ce=X.propertyIsEnumerable,le=q.splice,se=Object.getOwnPropertySymbols,de=K(Object.keys,Object),ue=De(N,"DataView"),he=De(N,"Map"),fe=De(N,"Promise"),pe=De(N,"Set"),me=De(N,"WeakMap"),ge=De(Object,"create"),ve=qe(ue),_e=qe(he),ye=qe(fe),be=qe(pe),we=qe(me),Se=oe?oe.prototype:void 0,Ee=Se?Se.valueOf:void 0,je=Se?Se.toString:void 0;function Ae(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function xe(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function ze(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function ke(e){var t=-1,n=e?e.length:0;for(this.__data__=new ze;++t<n;)this.add(e[t])}function Ce(e){this.__data__=new xe(e)}function Te(e,t){var n=Ze(e)||Ve(e)?function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}(e.length,String):[],r=n.length,o=!!r;for(var i in e)!t&&!te.call(e,i)||o&&("length"==i||Qe(i,r))||n.push(i);return n}function He(e,t){for(var n=e.length;n--;)if(Xe(e[n][0],t))return n;return-1}function Oe(e,t){for(var n=0,r=(t=Fe(t,e)?[t]:Me(t)).length;null!=e&&n<r;)e=e[Je(t[n++])];return n&&n==r?e:void 0}function Ie(e,t){return null!=e&&t in Object(e)}function Le(e,t,n,i,a){return e===t||(null==e||null==t||!rt(e)&&!ot(t)?e!=e&&t!=t:function(e,t,n,i,a,c){var f=Ze(e),p=Ze(t),_=s,E=s;f||(_=(_=Ue(e))==l?v:_),p||(E=(E=Ue(t))==l?v:E);var x=_==v&&!W(e),z=E==v&&!W(t),k=_==E;if(k&&!x)return c||(c=new Ce),f||ct(e)?Ne(e,t,n,i,a,c):function(e,t,n,i,a,c,l){switch(n){case A:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case j:return!(e.byteLength!=t.byteLength||!i(new ie(e),new ie(t)));case d:case u:case g:return Xe(+e,+t);case h:return e.name==t.name&&e.message==t.message;case y:case w:return e==t+"";case m:var s=$;case b:var f=c&o;if(s||(s=Y),e.size!=t.size&&!f)return!1;var p=l.get(e);if(p)return p==t;c|=r,l.set(e,t);var v=Ne(s(e),s(t),i,a,c,l);return l.delete(e),v;case S:if(Ee)return Ee.call(e)==Ee.call(t)}return!1}(e,t,_,n,i,a,c);if(!(a&o)){var C=x&&te.call(e,"__wrapped__"),T=z&&te.call(t,"__wrapped__");if(C||T){var H=C?e.value():e,O=T?t.value():t;return c||(c=new Ce),n(H,O,i,a,c)}}return!!k&&(c||(c=new Ce),function(e,t,n,r,i,a){var c=i&o,l=lt(e),s=l.length;if(s!=lt(t).length&&!c)return!1;for(var d=s;d--;){var u=l[d];if(!(c?u in t:te.call(t,u)))return!1}var h=a.get(e);if(h&&a.get(t))return h==t;var f=!0;a.set(e,t),a.set(t,e);for(var p=c;++d<s;){var m=e[u=l[d]],g=t[u];if(r)var v=c?r(g,m,u,t,e,a):r(m,g,u,e,t,a);if(!(void 0===v?m===g||n(m,g,r,i,a):v)){f=!1;break}p||(p="constructor"==u)}if(f&&!p){var _=e.constructor,y=t.constructor;_==y||!("constructor"in e)||!("constructor"in t)||"function"==typeof _&&_ instanceof _&&"function"==typeof y&&y instanceof y||(f=!1)}return a.delete(e),a.delete(t),f}(e,t,n,i,a,c))}(e,t,Le,n,i,a))}function Me(e){return Ze(e)?e:Ye(e)}function Ne(e,t,n,i,a,c){var l=a&o,s=e.length,d=t.length;if(s!=d&&!(l&&d>s))return!1;var u=c.get(e);if(u&&c.get(t))return u==t;var h=-1,f=!0,p=a&r?new ke:void 0;for(c.set(e,t),c.set(t,e);++h<s;){var m=e[h],g=t[h];if(i)var v=l?i(g,m,h,t,e,c):i(m,g,h,e,t,c);if(void 0!==v){if(v)continue;f=!1;break}if(p){if(!F(t,(function(e,t){if(!p.has(t)&&(m===e||n(m,e,i,a,c)))return p.add(t)}))){f=!1;break}}else if(m!==g&&!n(m,g,i,a,c)){f=!1;break}}return c.delete(e),c.delete(t),f}function Be(e,t){var n,r,o=e.__data__;return("string"==(r=typeof(n=t))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?o["string"==typeof t?"string":"hash"]:o.map}function De(e,t){var n=function(e,t){return null==e?void 0:e[t]}(e,t);return function(e){return!(!rt(e)||(t=e,Z&&Z in t))&&(tt(e)||W(e)?re:H).test(qe(e));var t}(n)?n:void 0}Ae.prototype.clear=function(){this.__data__=ge?ge(null):{}},Ae.prototype.delete=function(e){return this.has(e)&&delete this.__data__[e]},Ae.prototype.get=function(e){var t=this.__data__;if(ge){var r=t[e];return r===n?void 0:r}return te.call(t,e)?t[e]:void 0},Ae.prototype.has=function(e){var t=this.__data__;return ge?void 0!==t[e]:te.call(t,e)},Ae.prototype.set=function(e,t){return this.__data__[e]=ge&&void 0===t?n:t,this},xe.prototype.clear=function(){this.__data__=[]},xe.prototype.delete=function(e){var t=this.__data__,n=He(t,e);return!(n<0||(n==t.length-1?t.pop():le.call(t,n,1),0))},xe.prototype.get=function(e){var t=this.__data__,n=He(t,e);return n<0?void 0:t[n][1]},xe.prototype.has=function(e){return He(this.__data__,e)>-1},xe.prototype.set=function(e,t){var n=this.__data__,r=He(n,e);return r<0?n.push([e,t]):n[r][1]=t,this},ze.prototype.clear=function(){this.__data__={hash:new Ae,map:new(he||xe),string:new Ae}},ze.prototype.delete=function(e){return Be(this,e).delete(e)},ze.prototype.get=function(e){return Be(this,e).get(e)},ze.prototype.has=function(e){return Be(this,e).has(e)},ze.prototype.set=function(e,t){return Be(this,e).set(e,t),this},ke.prototype.add=ke.prototype.push=function(e){return this.__data__.set(e,n),this},ke.prototype.has=function(e){return this.__data__.has(e)},Ce.prototype.clear=function(){this.__data__=new xe},Ce.prototype.delete=function(e){return this.__data__.delete(e)},Ce.prototype.get=function(e){return this.__data__.get(e)},Ce.prototype.has=function(e){return this.__data__.has(e)},Ce.prototype.set=function(e,t){var n=this.__data__;if(n instanceof xe){var r=n.__data__;if(!he||r.length<199)return r.push([e,t]),this;n=this.__data__=new ze(r)}return n.set(e,t),this};var Pe=se?K(se,Object):ut,Re=se?function(e){for(var t=[];e;)Q(t,Pe(e)),e=ae(e);return t}:ut,Ue=function(e){return ne.call(e)};function Qe(e,t){return!!(t=null==t?c:t)&&("number"==typeof e||O.test(e))&&e>-1&&e%1==0&&e<t}function Fe(e,t){if(Ze(e))return!1;var n=typeof e;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=e&&!it(e))||z.test(e)||!x.test(e)||null!=t&&e in Object(t)}function We(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||X)}function $e(e){return e==e&&!rt(e)}function Ke(e,t){return function(n){return null!=n&&n[e]===t&&(void 0!==t||e in Object(n))}}(ue&&Ue(new ue(new ArrayBuffer(1)))!=A||he&&Ue(new he)!=m||fe&&Ue(fe.resolve())!=_||pe&&Ue(new pe)!=b||me&&Ue(new me)!=E)&&(Ue=function(e){var t=ne.call(e),n=t==v?e.constructor:void 0,r=n?qe(n):void 0;if(r)switch(r){case ve:return A;case _e:return m;case ye:return _;case be:return b;case we:return E}return t});var Ye=Ge((function(e){var t;e=null==(t=e)?"":function(e){if("string"==typeof e)return e;if(it(e))return je?je.call(e):"";var t=e+"";return"0"==t&&1/e==-i?"-0":t}(t);var n=[];return k.test(e)&&n.push(""),e.replace(C,(function(e,t,r,o){n.push(r?o.replace(T,"$1"):t||e)})),n}));function Je(e){if("string"==typeof e||it(e))return e;var t=e+"";return"0"==t&&1/e==-i?"-0":t}function qe(e){if(null!=e){try{return ee.call(e)}catch(e){}try{return e+""}catch(e){}}return""}function Ge(e,t){if("function"!=typeof e||t&&"function"!=typeof t)throw new TypeError("Expected a function");var n=function(){var r=arguments,o=t?t.apply(this,r):r[0],i=n.cache;if(i.has(o))return i.get(o);var a=e.apply(this,r);return n.cache=i.set(o,a),a};return n.cache=new(Ge.Cache||ze),n}function Xe(e,t){return e===t||e!=e&&t!=t}function Ve(e){return function(e){return ot(e)&&et(e)}(e)&&te.call(e,"callee")&&(!ce.call(e,"callee")||ne.call(e)==l)}Ge.Cache=ze;var Ze=Array.isArray;function et(e){return null!=e&&nt(e.length)&&!tt(e)}function tt(e){var t=rt(e)?ne.call(e):"";return t==f||t==p}function nt(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=c}function rt(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function ot(e){return!!e&&"object"==typeof e}function it(e){return"symbol"==typeof e||ot(e)&&ne.call(e)==S}var at,ct=U?(at=U,function(e){return at(e)}):function(e){return ot(e)&&nt(e.length)&&!!I[ne.call(e)]};function lt(e){return et(e)?Te(e):function(e){if(!We(e))return de(e);var t=[];for(var n in Object(e))te.call(e,n)&&"constructor"!=n&&t.push(n);return t}(e)}function st(e){return et(e)?Te(e,!0):function(e){if(!rt(e))return function(e){var t=[];if(null!=e)for(var n in Object(e))t.push(n);return t}(e);var t=We(e),n=[];for(var r in e)("constructor"!=r||!t&&te.call(e,r))&&n.push(r);return n}(e)}function dt(e){return e}function ut(){return[]}e.exports=function(e,t){return null==e?{}:function(e,t,n){for(var r=-1,o=t.length,i={};++r<o;){var a=t[r],c=e[a];n(c,a)&&(i[a]=c)}return i}(e,function(e){return function(e,t,n){var r=t(e);return Ze(e)?r:Q(r,n(e))}(e,st,Re)}(e),function(e){return"function"==typeof e?e:null==e?dt:"object"==typeof e?Ze(e)?function(e,t){return Fe(e)&&$e(t)?Ke(Je(e),t):function(n){var i=function(e,t,n){var r=null==e?void 0:Oe(e,t);return void 0===r?void 0:r}(n,e);return void 0===i&&i===t?function(e,t){return null!=e&&function(e,t,n){for(var r,o=-1,i=(t=Fe(t,e)?[t]:Me(t)).length;++o<i;){var a=Je(t[o]);if(!(r=null!=e&&n(e,a)))break;e=e[a]}return r||!!(i=e?e.length:0)&&nt(i)&&Qe(a,i)&&(Ze(e)||Ve(e))}(e,t,Ie)}(n,e):Le(t,i,void 0,r|o)}}(e[0],e[1]):function(e){var t=function(e){for(var t=lt(e),n=t.length;n--;){var r=t[n],o=e[r];t[n]=[r,o,$e(o)]}return t}(e);return 1==t.length&&t[0][2]?Ke(t[0][0],t[0][1]):function(n){return n===e||function(e,t,n,i){var a=n.length,c=a;if(null==e)return!c;for(e=Object(e);a--;){var l=n[a];if(l[2]?l[1]!==e[l[0]]:!(l[0]in e))return!1}for(;++a<c;){var s=(l=n[a])[0],d=e[s],u=l[1];if(l[2]){if(void 0===d&&!(s in e))return!1}else{var h,f=new Ce;if(!(void 0===h?Le(u,d,i,r|o,f):h))return!1}}return!0}(n,0,t)}}(e):Fe(t=e)?(n=Je(t),function(e){return null==e?void 0:e[n]}):function(e){return function(t){return Oe(t,e)}}(t);var t,n}(t))}})),m={accordion:"Accordion-module_accordion__2fPUT",card:"Accordion-module_card__1iRKx",border:"Accordion-module_border__2AgQd",accordionHeader:"Accordion-module_accordionHeader__3_uK7",s:"Accordion-module_s__8gw4g",closeButton:"Accordion-module_closeButton__1Qt8U",m:"Accordion-module_m__2k6QY",l:"Accordion-module_l__gPzdT",accordionContent:"Accordion-module_accordionContent__1umso",contentWithCloseButton:"Accordion-module_contentWithCloseButton__-einM",headingContainer:"Accordion-module_headingContainer__1DzX3",accordionButtonIcon:"Accordion-module_accordionButtonIcon__MQu2J"};(0,c.s)(".Accordion-module_accordion__2fPUT{--background-color:var(--color-white);--border-color:var(--color-black-60);--header-font-color:var(--color-black-90);--header-focus-outline-color:var(--color-coat-of-arms);--content-font-color:var(--color-black-90);--content-font-size:var(--fontsize-body-m);--content-line-height:var(--lineheight-l)}.Accordion-module_accordion__2fPUT:not(.Accordion-module_card__1iRKx){border-bottom:1px solid var(--border-color)}.Accordion-module_accordion__2fPUT.Accordion-module_card__1iRKx{background-color:var(--background-color);padding-left:var(--padding-horizontal);padding-right:var(--padding-horizontal)}.Accordion-module_accordion__2fPUT.Accordion-module_border__2AgQd{border:2px solid var(--border-color)}.Accordion-module_accordionHeader__3_uK7{align-items:center;color:var(--header-font-color);display:flex;font-size:var(--header-font-size);font-weight:var(--header-font-weight);justify-content:space-between;letter-spacing:var(--header-letter-spacing);line-height:var(--header-line-height);padding-bottom:var(--padding-vertical);padding-top:var(--padding-vertical);position:relative}.Accordion-module_accordionHeader__3_uK7>div{flex:1 1 auto}.Accordion-module_s__8gw4g{--header-font-size:var(--fontsize-heading-s);--padding-vertical:var(--spacing-s);--header-font-weight:700;--header-letter-spacing:0.2px;--header-line-height:1.4;--button-size:28px;--padding-horizontal:var(--spacing-2-xs)}.Accordion-module_s__8gw4g .Accordion-module_closeButton__1Qt8U div{margin-right:var(--spacing-4-xs)}.Accordion-module_m__2k6QY{--header-font-size:var(--fontsize-heading-m);--padding-vertical:var(--spacing-m);--header-font-weight:500;--header-letter-spacing:-0.2px;--header-line-height:32px;--button-size:36px;--padding-horizontal:var(--spacing-m)}.Accordion-module_m__2k6QY .Accordion-module_closeButton__1Qt8U div{margin-right:6px}.Accordion-module_l__gPzdT{--header-font-size:var(--fontsize-heading-l);--padding-vertical:var(--spacing-l);--header-font-weight:400;--header-letter-spacing:-0.4px;--header-line-height:var(--lineheight-s);--button-size:52px;--padding-horizontal:var(--spacing-l)}.Accordion-module_l__gPzdT .Accordion-module_closeButton__1Qt8U div{margin-right:var(--spacing-xs)}.Accordion-module_accordionContent__1umso{color:var(--content-font-color);font-size:var(--content-font-size);line-height:var(--content-line-height);padding-bottom:var(--spacing-m);position:relative}.Accordion-module_accordionContent__1umso .Accordion-module_closeButton__1Qt8U{bottom:0;color:var(--content-font-color);position:absolute;right:0}.Accordion-module_contentWithCloseButton__-einM{padding-bottom:44px}.Accordion-module_headingContainer__1DzX3{align-items:center;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:auto calc(var(--button-size));width:100%}.Accordion-module_headingContainer__1DzX3:focus{outline:2px solid var(--header-focus-outline-color,transparent)}.Accordion-module_accordionButtonIcon__MQu2J{border:2px solid transparent;box-sizing:border-box;height:var(--button-size)!important;margin:auto;width:var(--button-size)!important}");const g=e=>({en:"Close",fi:"Sulje",sv:"Stäng"}[e]),v=e=>{let{border:t=!1,card:n=!1,children:o,className:a,closeButtonClassName:c,closeButton:v=!0,heading:_,headingLevel:y=2,id:b,initiallyOpen:w=!1,language:S="fi",size:E="m",style:j,theme:A}=e;const x=(0,r.useRef)(null),[z,k]=(0,r.useState)(!1),[C]=(0,r.useState)(b||i()("accordion-")),T=A&&{"--background-color":A["--background-color"],"--border-color":A["--border-color"],"--header-font-color":A["--header-font-color"],"--header-focus-outline-color":A["--header-focus-outline-color"],"--content-font-color":A["--content-font-color"],"--content-font-size":A["--content-font-size"],"--content-line-height":A["--content-line-height"]},H=p(T),O=(0,d.u)(m.accordion,Object.keys(H).length>0?H:void 0),I=A&&{"--header-font-size":A["--header-font-size"],"--padding-vertical":A["--padding-vertical"],"--padding-horizontal":A["--padding-horizontal"],"--header-font-weight":A["--header-font-weight"],"--header-letter-spacing":A["--header-letter-spacing"],"--header-line-height":A["--header-line-height"],"--button-size":A["--button-size"]},L=p(I),M=(0,d.u)(m[E],Object.keys(L).length>0?L:void 0),{isOpen:N,buttonProps:B,contentProps:D}=(0,s.u)({initiallyOpen:w}),P=N?r.createElement(h.I,{"aria-hidden":!0,className:m.accordionButtonIcon}):r.createElement(f.I,{"aria-hidden":!0,className:m.accordionButtonIcon}),R=function(){const[e,t]=r.useState(!1);return r.useEffect((()=>{t(!0)}),[]),e}();(0,r.useEffect)((()=>{if(!R)return;const e=setTimeout((()=>{x.current.focus(),!0===z&&(k(!1),B.onClick())}),50);return()=>clearTimeout(e)}),[z]);const U=()=>{k(!0)};return r.createElement("div",{className:(0,l.c)(m.accordion,n&&m.card,n&&t&&m.border,N&&m.isOpen,m[E],O,M,a),style:j,id:C},r.createElement("div",{className:(0,l.c)(m.accordionHeader)},r.createElement("div",{role:"heading","aria-level":y,id:C+"-heading"},r.createElement("div",Object.assign({ref:x,role:"button",tabIndex:0,onKeyPress:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),B.onClick())},className:m.headingContainer,"aria-labelledby":C+"-heading"},B,z?{"aria-expanded":!1}:{}),r.createElement("span",{className:"label"},_),P))),r.createElement("div",Object.assign({},D,{id:C+"-content",role:"region",className:(0,l.c)(m.accordionContent,n&&m.card,v&&m.contentWithCloseButton),"aria-labelledby":C+"-heading"}),o,v&&r.createElement(u.B,{"data-testid":C+"-closeButton","aria-label":g(S)+" "+_,className:(0,l.c)(m.closeButton,c),theme:"black",size:"small",onKeyPress:e=>{" "===e.key&&U()},onClick:()=>{U()},variant:"supplementary",iconRight:r.createElement(h.I,{"aria-hidden":!0,size:"xs",className:m.accordionButtonIcon})},g(S))))}},26917:function(e,t,n){n.d(t,{a:function(){return r},c:function(){return o}});var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==n.g?n.g:"undefined"!=typeof self?self:{};function o(e,t,n){return e(n={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&n.path)}},n.exports),n.exports}},41380:function(e,t,n){n.d(t,{u:function(){return o}});var r=n(67294);const o=e=>{let{initiallyOpen:t=!1}=e;const[n,o]=(0,r.useState)(t),i=()=>{o(!0)},a=()=>{o(!1)},c=()=>{n?a():i()},l={onClick:c,"aria-expanded":n},s={};return!1===n&&(s.style={display:"none"}),{isOpen:n,openAccordion:i,closeAccordion:a,toggleAccordion:c,buttonProps:l,contentProps:s}}},68563:function(e,t,n){n.r(t);var r=n(11151),o=n(67294),i=n(1343),a=n(88611),c=n(89482);function l(e){const t=Object.assign({h1:"h1",a:"a",span:"span",h2:"h2",p:"p",h3:"h3",ul:"ul",li:"li",pre:"pre",code:"code",ol:"ol"},(0,r.ah)(),e.components);return o.createElement(o.Fragment,null,o.createElement(t.h1,{id:"server-side-rendering",style:{position:"relative"}},"Server-side rendering",o.createElement(t.a,{href:"#server-side-rendering","aria-label":"server side rendering permalink",className:"header-anchor after"},o.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",o.createElement(c.Z,null,"The server-side rendering support of the Helsinki Design System makes the user's landing experience to pages smooth without\nflashes of unstyled content."),"\n",o.createElement(t.h2,{id:"what-is-server-side-rendering",style:{position:"relative"}},"What is server-side rendering?",o.createElement(t.a,{href:"#what-is-server-side-rendering","aria-label":"what is server side rendering permalink",className:"header-anchor after"},o.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",o.createElement(t.p,null,"Server-side rendering (SSR) is the process where the rendering of HTML pages is done on the server-side. The fully rendered HTML\ndocument is then sent to the browser. The rendering of the HTML can happen at build time (Static site generation\nor pre-rendering), or during an HTTP request. The alternative to SSR is client-side rendering (CSR), where most of the HTML\ncontent is composed and rendered in the browser using JavaScript."),"\n",o.createElement(t.h2,{id:"how-does-hds-support-server-side-rendering",style:{position:"relative"}},"How does HDS support server-side rendering?",o.createElement(t.a,{href:"#how-does-hds-support-server-side-rendering","aria-label":"how does hds support server side rendering permalink",className:"header-anchor after"},o.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",o.createElement(t.p,null,"For HDS components to work with server-side rendering, you need to inject the critical CSS styles of the HDS components\nthat are being used into the initially rendered HTML on the server's side. For hds-core, you must include the styles from\nthe provided CSS files yourself. For hds-react HDS provides multiple options, which we will cover next."),"\n",o.createElement(i.N,{label:"Critical CSS",className:"siteNotification"},o.createElement(t.p,null,"Critical CSS is applied to above-the-fold elements. It provides the styles for the immediately visible content in the browser\nviewport when the user opens your website. Critical CSS does not usually have the styles of the elements that are in the\nscrollable content outside of the browser viewport. There is one exception though, and that is if you have anchor links on the page.\nWhen user opens website from an URL that includes an anchor link, the browser automatically scrolls the page so that the link\nwill be visible.")),"\n",o.createElement(t.h3,{id:"option-1-getcriticalhdsrules-tool-to-get-critical-styles-recommended",style:{position:"relative"}},"Option 1: getCriticalHdsRules tool to get critical styles (recommended)",o.createElement(t.a,{href:"#option-1-getcriticalhdsrules-tool-to-get-critical-styles-recommended","aria-label":"option 1 getcriticalhdsrules tool to get critical styles recommended permalink",className:"header-anchor after"},o.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",o.createElement(t.p,null,"HDS React components use CSS-in-JS in a way where the styles are by default injected into the head tag in the browser.\nIf you use server-side rendering and do not include the critical styles on the server, this leads to flashes of unstyled\ncontent when the user lands on the page."),"\n",o.createElement(t.p,null,"To include critical styles on the server, HDS exposes a tool for extracting the used critical styles of HDS components.\nThis should come in handy in multiple ways:"),"\n",o.createElement(t.ul,null,"\n",o.createElement(t.li,null,"Automatically extracts styles based on used HTML."),"\n",o.createElement(t.li,null,"If you add more HDS components later, you do not need to remember to add their styles separately."),"\n",o.createElement(t.li,null,"If you happen to remove HDS components, you do not need to remember to remove their respective styles."),"\n"),"\n",o.createElement(t.p,null,"Let's go through a simple example of the usage of the tool:"),"\n",o.createElement(t.pre,null,o.createElement(t.code,{className:"language-js"},'import { getCriticalHdsRules, hdsStyles } from "hds-react";\n\nconst criticalHdsRules = await getCriticalHdsRules(bodyHTML, hdsStyles);\n\nconst finalHTML =\n<html>\n  <head>\n    ...\n    <style data-used-styles dangerouslySetInnerHTML={{ __html: criticalHdsRules }} />\n  </head>\n  <body>\n    ...\n  </body>\n<html>\n')),"\n",o.createElement(t.p,null,"First, we import the tool that is named ",o.createElement(t.code,null,"getCriticalHdsRules"),". To be able to call it, we need two things:"),"\n",o.createElement(t.ol,null,"\n",o.createElement(t.li,null,"The initially to-be-rendered HTML body code as a string."),"\n",o.createElement(t.li,null,"hdsStyles - a variable holding all the styles of the HDS react components as a string."),"\n"),"\n",o.createElement(t.p,null,"Calling it returns a string containing the critical CSS styles. The rest is easy, we set those styles into\na style tag, that we will then inject into the finally rendered HTML document. It can be wise to cache the result of\n",o.createElement(t.code,null,"getCriticalHdsRules")," based on the function parameters in order to improve performance."),"\n",o.createElement(t.p,null,"See below for more complete examples:"),"\n",o.createElement(a.A,{heading:"Next.js",headingLevel:"4",language:"en",size:"s",theme:{"--padding-vertical":"var(--spacing-s)"}},o.createElement(t.p,null,"In the Next.js framework, create a file called _document.js in folder pages, and add this code to it:")),"\n",o.createElement(a.A,{heading:"Gatsby",headingLevel:"4",language:"en",size:"s",theme:{"--padding-vertical":"var(--spacing-s)"}},o.createElement(t.p,null,"In the Gatsby framework, create a file called gatsby-ssr.js at the root of the project, and add this code to it:")),"\n",o.createElement(t.h3,{id:"option-2-use-indexcss-or-hdsstyles-not-recommended",style:{position:"relative"}},"Option 2: Use index.css or hdsStyles (not recommended)",o.createElement(t.a,{href:"#option-2-use-indexcss-or-hdsstyles-not-recommended","aria-label":"option 2 use indexcss or hdsstyles not recommended permalink",className:"header-anchor after"},o.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",o.createElement(t.p,null,"HDS react provides all the styles of HDS components in a file called ",o.createElement(t.code,null,"index.css"),", located at the root of the library.\nYou can import that file and collect the critical CSS styles from there. Another alternative is to use exported variable\ncalled ",o.createElement(t.code,null,"hdsStyles"),":"),"\n",o.createElement(t.pre,null,o.createElement(t.code,{className:"language-js"},"import { hdsStyles } from 'hds-react';\n")),"\n",o.createElement(t.p,null,"This variable holds all the styles of HDS React components compiled into a single string. It might be tempting to include\nall the styles in ",o.createElement(t.code,null,"hdsStyles")," or ",o.createElement(t.code,null,"index.css")," to your HTML, and call it a day. This is not optimal because the size of the\nHDS styles is large and probably growing as new components are added to it. Adding all the styles might have an impact on the\nperformance of the app. Instead, you should collect only the necessary styles for the initial render. We recommend using\nthe tool described in option 1. But if you are unable to use that, extracting the critical CSS styles from either\n",o.createElement(t.code,null,"hdsStyles")," or ",o.createElement(t.code,null,"index.css")," might work out for you."),"\n",o.createElement(t.h3,{id:"customising-hds-components-and-server-side-rendering",style:{position:"relative"}},"Customising HDS components and server-side rendering",o.createElement(t.a,{href:"#customising-hds-components-and-server-side-rendering","aria-label":"customising hds components and server side rendering permalink",className:"header-anchor after"},o.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",o.createElement(t.p,null,"If you customise hds-react components with the ",o.createElement("code",null,"theme")," prop, the style changes will not be visible on the\nfirst render. The preferred way to customise hds-react components with server-side rendering is using the ",o.createElement("code",null,"className"),"\nprop. However, notice that sometimes CSS selector specificity of 0-1-0 may not be enough to overwrite default CSS variables.\nThis depends on the CSS declaration order on the page or component's default styles selector specificity.\nYou may have to use a more specific CSS selector for the custom styles class, for example, ",o.createElement(t.code,null,"#myComponent.custom-class"),", ",o.createElement(t.code,null,".custom-class.custom-class"),", etc."))}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,r.ah)(),e.components);return t?o.createElement(t,e,o.createElement(l,e)):l(e)}},89482:function(e,t,n){var r=n(67294);t.Z=e=>{let{color:t="var(--color-black-90)",size:n="var(--fontsize-body-xl)",style:o={},children:i}=e;return r.createElement("p",{style:{fontSize:n,color:t,maxWidth:600,...o}},i)}}}]);