"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[626,4605],{88611:function(e,t,n){n.d(t,{A:function(){return v}});var r=n(67294),o=n(5871),a=n.n(o),i=n(26917),c=n(7444),l=n(44458),u=n(41380),s=n(41981),d=n(93638),f=n(59063),h=n(39354),p=(0,i.c)((function(e,t){var n="__lodash_hash_undefined__",r=1,o=2,a=1/0,c=9007199254740991,l="[object Arguments]",u="[object Array]",s="[object Boolean]",d="[object Date]",f="[object Error]",h="[object Function]",p="[object GeneratorFunction]",_="[object Map]",g="[object Number]",v="[object Object]",m="[object Promise]",b="[object RegExp]",y="[object Set]",j="[object String]",A="[object Symbol]",w="[object WeakMap]",E="[object ArrayBuffer]",k="[object DataView]",z=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,x=/^\w*$/,T=/^\./,O=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,P=/\\(\\)?/g,C=/^\[object .+?Constructor\]$/,S=/^(?:0|[1-9]\d*)$/,B={};B["[object Float32Array]"]=B["[object Float64Array]"]=B["[object Int8Array]"]=B["[object Int16Array]"]=B["[object Int32Array]"]=B["[object Uint8Array]"]=B["[object Uint8ClampedArray]"]=B["[object Uint16Array]"]=B["[object Uint32Array]"]=!0,B[l]=B[u]=B[E]=B[s]=B[k]=B[d]=B[f]=B[h]=B[_]=B[g]=B[v]=B[b]=B[y]=B[j]=B[w]=!1;var I="object"==typeof i.a&&i.a&&i.a.Object===Object&&i.a,D="object"==typeof self&&self&&self.Object===Object&&self,N=I||D||Function("return this")(),H=t&&!t.nodeType&&t,L=H&&e&&!e.nodeType&&e,U=L&&L.exports===H&&I.process,Z=function(){try{return U&&U.binding("util")}catch(e){}}(),q=Z&&Z.isTypedArray;function W(e,t){for(var n=-1,r=t.length,o=e.length;++n<r;)e[o+n]=t[n];return e}function Q(e,t){for(var n=-1,r=e?e.length:0;++n<r;)if(t(e[n],n,e))return!0;return!1}function M(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(e){}return t}function $(e){var t=-1,n=Array(e.size);return e.forEach((function(e,r){n[++t]=[r,e]})),n}function F(e,t){return function(n){return e(t(n))}}function K(e){var t=-1,n=Array(e.size);return e.forEach((function(e){n[++t]=e})),n}var R,G=Array.prototype,V=Function.prototype,X=Object.prototype,Y=N["__core-js_shared__"],J=(R=/[^.]+$/.exec(Y&&Y.keys&&Y.keys.IE_PROTO||""))?"Symbol(src)_1."+R:"",ee=V.toString,te=X.hasOwnProperty,ne=X.toString,re=RegExp("^"+ee.call(te).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),oe=N.Symbol,ae=N.Uint8Array,ie=F(Object.getPrototypeOf,Object),ce=X.propertyIsEnumerable,le=G.splice,ue=Object.getOwnPropertySymbols,se=F(Object.keys,Object),de=Le(N,"DataView"),fe=Le(N,"Map"),he=Le(N,"Promise"),pe=Le(N,"Set"),_e=Le(N,"WeakMap"),ge=Le(Object,"create"),ve=Ge(de),me=Ge(fe),be=Ge(he),ye=Ge(pe),je=Ge(_e),Ae=oe?oe.prototype:void 0,we=Ae?Ae.valueOf:void 0,Ee=Ae?Ae.toString:void 0;function ke(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function ze(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function xe(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function Te(e){var t=-1,n=e?e.length:0;for(this.__data__=new xe;++t<n;)this.add(e[t])}function Oe(e){this.__data__=new ze(e)}function Pe(e,t){var n=Je(e)||Ye(e)?function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}(e.length,String):[],r=n.length,o=!!r;for(var a in e)!t&&!te.call(e,a)||o&&("length"==a||We(a,r))||n.push(a);return n}function Ce(e,t){for(var n=e.length;n--;)if(Xe(e[n][0],t))return n;return-1}function Se(e,t){for(var n=0,r=(t=Qe(t,e)?[t]:De(t)).length;null!=e&&n<r;)e=e[Re(t[n++])];return n&&n==r?e:void 0}function Be(e,t){return null!=e&&t in Object(e)}function Ie(e,t,n,a,i){return e===t||(null==e||null==t||!rt(e)&&!ot(t)?e!=e&&t!=t:function(e,t,n,a,i,c){var h=Je(e),p=Je(t),m=u,w=u;h||(m=(m=qe(e))==l?v:m),p||(w=(w=qe(t))==l?v:w);var z=m==v&&!M(e),x=w==v&&!M(t),T=m==w;if(T&&!z)return c||(c=new Oe),h||ct(e)?Ne(e,t,n,a,i,c):function(e,t,n,a,i,c,l){switch(n){case k:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case E:return!(e.byteLength!=t.byteLength||!a(new ae(e),new ae(t)));case s:case d:case g:return Xe(+e,+t);case f:return e.name==t.name&&e.message==t.message;case b:case j:return e==t+"";case _:var u=$;case y:var h=c&o;if(u||(u=K),e.size!=t.size&&!h)return!1;var p=l.get(e);if(p)return p==t;c|=r,l.set(e,t);var v=Ne(u(e),u(t),a,i,c,l);return l.delete(e),v;case A:if(we)return we.call(e)==we.call(t)}return!1}(e,t,m,n,a,i,c);if(!(i&o)){var O=z&&te.call(e,"__wrapped__"),P=x&&te.call(t,"__wrapped__");if(O||P){var C=O?e.value():e,S=P?t.value():t;return c||(c=new Oe),n(C,S,a,i,c)}}return!!T&&(c||(c=new Oe),function(e,t,n,r,a,i){var c=a&o,l=lt(e),u=l.length;if(u!=lt(t).length&&!c)return!1;for(var s=u;s--;){var d=l[s];if(!(c?d in t:te.call(t,d)))return!1}var f=i.get(e);if(f&&i.get(t))return f==t;var h=!0;i.set(e,t),i.set(t,e);for(var p=c;++s<u;){var _=e[d=l[s]],g=t[d];if(r)var v=c?r(g,_,d,t,e,i):r(_,g,d,e,t,i);if(!(void 0===v?_===g||n(_,g,r,a,i):v)){h=!1;break}p||(p="constructor"==d)}if(h&&!p){var m=e.constructor,b=t.constructor;m==b||!("constructor"in e)||!("constructor"in t)||"function"==typeof m&&m instanceof m&&"function"==typeof b&&b instanceof b||(h=!1)}return i.delete(e),i.delete(t),h}(e,t,n,a,i,c))}(e,t,Ie,n,a,i))}function De(e){return Je(e)?e:Ke(e)}function Ne(e,t,n,a,i,c){var l=i&o,u=e.length,s=t.length;if(u!=s&&!(l&&s>u))return!1;var d=c.get(e);if(d&&c.get(t))return d==t;var f=-1,h=!0,p=i&r?new Te:void 0;for(c.set(e,t),c.set(t,e);++f<u;){var _=e[f],g=t[f];if(a)var v=l?a(g,_,f,t,e,c):a(_,g,f,e,t,c);if(void 0!==v){if(v)continue;h=!1;break}if(p){if(!Q(t,(function(e,t){if(!p.has(t)&&(_===e||n(_,e,a,i,c)))return p.add(t)}))){h=!1;break}}else if(_!==g&&!n(_,g,a,i,c)){h=!1;break}}return c.delete(e),c.delete(t),h}function He(e,t){var n,r,o=e.__data__;return("string"==(r=typeof(n=t))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?o["string"==typeof t?"string":"hash"]:o.map}function Le(e,t){var n=function(e,t){return null==e?void 0:e[t]}(e,t);return function(e){return!(!rt(e)||(t=e,J&&J in t))&&(tt(e)||M(e)?re:C).test(Ge(e));var t}(n)?n:void 0}ke.prototype.clear=function(){this.__data__=ge?ge(null):{}},ke.prototype.delete=function(e){return this.has(e)&&delete this.__data__[e]},ke.prototype.get=function(e){var t=this.__data__;if(ge){var r=t[e];return r===n?void 0:r}return te.call(t,e)?t[e]:void 0},ke.prototype.has=function(e){var t=this.__data__;return ge?void 0!==t[e]:te.call(t,e)},ke.prototype.set=function(e,t){return this.__data__[e]=ge&&void 0===t?n:t,this},ze.prototype.clear=function(){this.__data__=[]},ze.prototype.delete=function(e){var t=this.__data__,n=Ce(t,e);return!(n<0||(n==t.length-1?t.pop():le.call(t,n,1),0))},ze.prototype.get=function(e){var t=this.__data__,n=Ce(t,e);return n<0?void 0:t[n][1]},ze.prototype.has=function(e){return Ce(this.__data__,e)>-1},ze.prototype.set=function(e,t){var n=this.__data__,r=Ce(n,e);return r<0?n.push([e,t]):n[r][1]=t,this},xe.prototype.clear=function(){this.__data__={hash:new ke,map:new(fe||ze),string:new ke}},xe.prototype.delete=function(e){return He(this,e).delete(e)},xe.prototype.get=function(e){return He(this,e).get(e)},xe.prototype.has=function(e){return He(this,e).has(e)},xe.prototype.set=function(e,t){return He(this,e).set(e,t),this},Te.prototype.add=Te.prototype.push=function(e){return this.__data__.set(e,n),this},Te.prototype.has=function(e){return this.__data__.has(e)},Oe.prototype.clear=function(){this.__data__=new ze},Oe.prototype.delete=function(e){return this.__data__.delete(e)},Oe.prototype.get=function(e){return this.__data__.get(e)},Oe.prototype.has=function(e){return this.__data__.has(e)},Oe.prototype.set=function(e,t){var n=this.__data__;if(n instanceof ze){var r=n.__data__;if(!fe||r.length<199)return r.push([e,t]),this;n=this.__data__=new xe(r)}return n.set(e,t),this};var Ue=ue?F(ue,Object):dt,Ze=ue?function(e){for(var t=[];e;)W(t,Ue(e)),e=ie(e);return t}:dt,qe=function(e){return ne.call(e)};function We(e,t){return!!(t=null==t?c:t)&&("number"==typeof e||S.test(e))&&e>-1&&e%1==0&&e<t}function Qe(e,t){if(Je(e))return!1;var n=typeof e;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=e&&!at(e))||x.test(e)||!z.test(e)||null!=t&&e in Object(t)}function Me(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||X)}function $e(e){return e==e&&!rt(e)}function Fe(e,t){return function(n){return null!=n&&n[e]===t&&(void 0!==t||e in Object(n))}}(de&&qe(new de(new ArrayBuffer(1)))!=k||fe&&qe(new fe)!=_||he&&qe(he.resolve())!=m||pe&&qe(new pe)!=y||_e&&qe(new _e)!=w)&&(qe=function(e){var t=ne.call(e),n=t==v?e.constructor:void 0,r=n?Ge(n):void 0;if(r)switch(r){case ve:return k;case me:return _;case be:return m;case ye:return y;case je:return w}return t});var Ke=Ve((function(e){var t;e=null==(t=e)?"":function(e){if("string"==typeof e)return e;if(at(e))return Ee?Ee.call(e):"";var t=e+"";return"0"==t&&1/e==-a?"-0":t}(t);var n=[];return T.test(e)&&n.push(""),e.replace(O,(function(e,t,r,o){n.push(r?o.replace(P,"$1"):t||e)})),n}));function Re(e){if("string"==typeof e||at(e))return e;var t=e+"";return"0"==t&&1/e==-a?"-0":t}function Ge(e){if(null!=e){try{return ee.call(e)}catch(e){}try{return e+""}catch(e){}}return""}function Ve(e,t){if("function"!=typeof e||t&&"function"!=typeof t)throw new TypeError("Expected a function");var n=function(){var r=arguments,o=t?t.apply(this,r):r[0],a=n.cache;if(a.has(o))return a.get(o);var i=e.apply(this,r);return n.cache=a.set(o,i),i};return n.cache=new(Ve.Cache||xe),n}function Xe(e,t){return e===t||e!=e&&t!=t}function Ye(e){return function(e){return ot(e)&&et(e)}(e)&&te.call(e,"callee")&&(!ce.call(e,"callee")||ne.call(e)==l)}Ve.Cache=xe;var Je=Array.isArray;function et(e){return null!=e&&nt(e.length)&&!tt(e)}function tt(e){var t=rt(e)?ne.call(e):"";return t==h||t==p}function nt(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=c}function rt(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function ot(e){return!!e&&"object"==typeof e}function at(e){return"symbol"==typeof e||ot(e)&&ne.call(e)==A}var it,ct=q?(it=q,function(e){return it(e)}):function(e){return ot(e)&&nt(e.length)&&!!B[ne.call(e)]};function lt(e){return et(e)?Pe(e):function(e){if(!Me(e))return se(e);var t=[];for(var n in Object(e))te.call(e,n)&&"constructor"!=n&&t.push(n);return t}(e)}function ut(e){return et(e)?Pe(e,!0):function(e){if(!rt(e))return function(e){var t=[];if(null!=e)for(var n in Object(e))t.push(n);return t}(e);var t=Me(e),n=[];for(var r in e)("constructor"!=r||!t&&te.call(e,r))&&n.push(r);return n}(e)}function st(e){return e}function dt(){return[]}e.exports=function(e,t){return null==e?{}:function(e,t,n){for(var r=-1,o=t.length,a={};++r<o;){var i=t[r],c=e[i];n(c,i)&&(a[i]=c)}return a}(e,function(e){return function(e,t,n){var r=t(e);return Je(e)?r:W(r,n(e))}(e,ut,Ze)}(e),function(e){return"function"==typeof e?e:null==e?st:"object"==typeof e?Je(e)?function(e,t){return Qe(e)&&$e(t)?Fe(Re(e),t):function(n){var a=function(e,t,n){var r=null==e?void 0:Se(e,t);return void 0===r?void 0:r}(n,e);return void 0===a&&a===t?function(e,t){return null!=e&&function(e,t,n){for(var r,o=-1,a=(t=Qe(t,e)?[t]:De(t)).length;++o<a;){var i=Re(t[o]);if(!(r=null!=e&&n(e,i)))break;e=e[i]}return r||!!(a=e?e.length:0)&&nt(a)&&We(i,a)&&(Je(e)||Ye(e))}(e,t,Be)}(n,e):Ie(t,a,void 0,r|o)}}(e[0],e[1]):function(e){var t=function(e){for(var t=lt(e),n=t.length;n--;){var r=t[n],o=e[r];t[n]=[r,o,$e(o)]}return t}(e);return 1==t.length&&t[0][2]?Fe(t[0][0],t[0][1]):function(n){return n===e||function(e,t,n,a){var i=n.length,c=i;if(null==e)return!c;for(e=Object(e);i--;){var l=n[i];if(l[2]?l[1]!==e[l[0]]:!(l[0]in e))return!1}for(;++i<c;){var u=(l=n[i])[0],s=e[u],d=l[1];if(l[2]){if(void 0===s&&!(u in e))return!1}else{var f,h=new Oe;if(!(void 0===f?Ie(d,s,a,r|o,h):f))return!1}}return!0}(n,0,t)}}(e):Qe(t=e)?(n=Re(t),function(e){return null==e?void 0:e[n]}):function(e){return function(t){return Se(t,e)}}(t);var t,n}(t))}})),_={accordion:"Accordion-module_accordion__2fPUT",card:"Accordion-module_card__1iRKx",border:"Accordion-module_border__2AgQd",accordionHeader:"Accordion-module_accordionHeader__3_uK7",s:"Accordion-module_s__8gw4g",closeButton:"Accordion-module_closeButton__1Qt8U",m:"Accordion-module_m__2k6QY",l:"Accordion-module_l__gPzdT",accordionContent:"Accordion-module_accordionContent__1umso",contentWithCloseButton:"Accordion-module_contentWithCloseButton__-einM",headingContainer:"Accordion-module_headingContainer__1DzX3",accordionButtonIcon:"Accordion-module_accordionButtonIcon__MQu2J"};(0,c.s)(".Accordion-module_accordion__2fPUT{--background-color:var(--color-white);--border-color:var(--color-black-60);--header-font-color:var(--color-black-90);--header-focus-outline-color:var(--color-coat-of-arms);--content-font-color:var(--color-black-90);--content-font-size:var(--fontsize-body-m);--content-line-height:var(--lineheight-l)}.Accordion-module_accordion__2fPUT:not(.Accordion-module_card__1iRKx){border-bottom:1px solid var(--border-color)}.Accordion-module_accordion__2fPUT.Accordion-module_card__1iRKx{background-color:var(--background-color);padding-left:var(--padding-horizontal);padding-right:var(--padding-horizontal)}.Accordion-module_accordion__2fPUT.Accordion-module_border__2AgQd{border:2px solid var(--border-color)}.Accordion-module_accordionHeader__3_uK7{align-items:center;color:var(--header-font-color);display:flex;font-size:var(--header-font-size);font-weight:var(--header-font-weight);justify-content:space-between;letter-spacing:var(--header-letter-spacing);line-height:var(--header-line-height);padding-bottom:var(--padding-vertical);padding-top:var(--padding-vertical);position:relative}.Accordion-module_accordionHeader__3_uK7>div{flex:1 1 auto}.Accordion-module_s__8gw4g{--header-font-size:var(--fontsize-heading-s);--padding-vertical:var(--spacing-s);--header-font-weight:700;--header-letter-spacing:0.2px;--header-line-height:1.4;--button-size:28px;--padding-horizontal:var(--spacing-2-xs)}.Accordion-module_s__8gw4g .Accordion-module_closeButton__1Qt8U div{margin-right:var(--spacing-4-xs)}.Accordion-module_m__2k6QY{--header-font-size:var(--fontsize-heading-m);--padding-vertical:var(--spacing-m);--header-font-weight:500;--header-letter-spacing:-0.2px;--header-line-height:32px;--button-size:36px;--padding-horizontal:var(--spacing-m)}.Accordion-module_m__2k6QY .Accordion-module_closeButton__1Qt8U div{margin-right:6px}.Accordion-module_l__gPzdT{--header-font-size:var(--fontsize-heading-l);--padding-vertical:var(--spacing-l);--header-font-weight:400;--header-letter-spacing:-0.4px;--header-line-height:var(--lineheight-s);--button-size:52px;--padding-horizontal:var(--spacing-l)}.Accordion-module_l__gPzdT .Accordion-module_closeButton__1Qt8U div{margin-right:var(--spacing-xs)}.Accordion-module_accordionContent__1umso{color:var(--content-font-color);font-size:var(--content-font-size);line-height:var(--content-line-height);padding-bottom:var(--spacing-m);position:relative}.Accordion-module_accordionContent__1umso .Accordion-module_closeButton__1Qt8U{bottom:0;color:var(--content-font-color);position:absolute;right:0}.Accordion-module_contentWithCloseButton__-einM{padding-bottom:44px}.Accordion-module_headingContainer__1DzX3{align-items:center;box-sizing:border-box;cursor:pointer;display:grid;grid-template-columns:auto calc(var(--button-size));width:100%}.Accordion-module_headingContainer__1DzX3:focus{outline:2px solid var(--header-focus-outline-color,transparent)}.Accordion-module_accordionButtonIcon__MQu2J{border:2px solid transparent;box-sizing:border-box;height:var(--button-size)!important;margin:auto;width:var(--button-size)!important}");const g=e=>({en:"Close",fi:"Sulje",sv:"Stäng"}[e]),v=e=>{let{border:t=!1,card:n=!1,children:o,className:i,closeButtonClassName:c,closeButton:v=!0,heading:m,headingLevel:b=2,id:y,initiallyOpen:j=!1,language:A="fi",size:w="m",style:E,theme:k}=e;const z=(0,r.useRef)(null),[x,T]=(0,r.useState)(!1),[O]=(0,r.useState)(y||a()("accordion-")),P=k&&{"--background-color":k["--background-color"],"--border-color":k["--border-color"],"--header-font-color":k["--header-font-color"],"--header-focus-outline-color":k["--header-focus-outline-color"],"--content-font-color":k["--content-font-color"],"--content-font-size":k["--content-font-size"],"--content-line-height":k["--content-line-height"]},C=p(P),S=(0,s.u)(_.accordion,Object.keys(C).length>0?C:void 0),B=k&&{"--header-font-size":k["--header-font-size"],"--padding-vertical":k["--padding-vertical"],"--padding-horizontal":k["--padding-horizontal"],"--header-font-weight":k["--header-font-weight"],"--header-letter-spacing":k["--header-letter-spacing"],"--header-line-height":k["--header-line-height"],"--button-size":k["--button-size"]},I=p(B),D=(0,s.u)(_[w],Object.keys(I).length>0?I:void 0),{isOpen:N,buttonProps:H,contentProps:L}=(0,u.u)({initiallyOpen:j}),U=N?r.createElement(f.I,{"aria-hidden":!0,className:_.accordionButtonIcon}):r.createElement(h.I,{"aria-hidden":!0,className:_.accordionButtonIcon}),Z=function(){const[e,t]=r.useState(!1);return r.useEffect((()=>{t(!0)}),[]),e}();(0,r.useEffect)((()=>{if(!Z)return;const e=setTimeout((()=>{z.current.focus(),!0===x&&(T(!1),H.onClick())}),50);return()=>clearTimeout(e)}),[x]);const q=()=>{T(!0)};return r.createElement("div",{className:(0,l.c)(_.accordion,n&&_.card,n&&t&&_.border,N&&_.isOpen,_[w],S,D,i),style:E,id:O},r.createElement("div",{className:(0,l.c)(_.accordionHeader)},r.createElement("div",{role:"heading","aria-level":b,id:O+"-heading"},r.createElement("div",Object.assign({ref:z,role:"button",tabIndex:0,onKeyPress:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),H.onClick())},className:_.headingContainer,"aria-labelledby":O+"-heading"},H,x?{"aria-expanded":!1}:{}),r.createElement("span",{className:"label"},m),U))),r.createElement("div",Object.assign({},L,{id:O+"-content",role:"region",className:(0,l.c)(_.accordionContent,n&&_.card,v&&_.contentWithCloseButton),"aria-labelledby":O+"-heading"}),o,v&&r.createElement(d.B,{"data-testid":O+"-closeButton","aria-label":g(A)+" "+m,className:(0,l.c)(_.closeButton,c),theme:"black",size:"small",onKeyPress:e=>{" "===e.key&&q()},onClick:()=>{q()},variant:"supplementary",iconRight:r.createElement(f.I,{"aria-hidden":!0,size:"xs",className:_.accordionButtonIcon})},g(A))))}},26917:function(e,t,n){n.d(t,{a:function(){return r},c:function(){return o}});var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==n.g?n.g:"undefined"!=typeof self?self:{};function o(e,t,n){return e(n={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&n.path)}},n.exports),n.exports}},41380:function(e,t,n){n.d(t,{u:function(){return o}});var r=n(67294);const o=e=>{let{initiallyOpen:t=!1}=e;const[n,o]=(0,r.useState)(t),a=()=>{o(!0)},i=()=>{o(!1)},c=()=>{n?i():a()},l={onClick:c,"aria-expanded":n},u={};return!1===n&&(u.style={display:"none"}),{isOpen:n,openAccordion:a,closeAccordion:i,toggleAccordion:c,buttonProps:l,contentProps:u}}},78740:function(e,t,n){n.r(t);var r=n(11151),o=n(67294),a=n(88611),i=n(80699),c=n(69636);const l=e=>{let{children:t,pageContext:n}=e;return o.createElement(c.default,{pageContext:n},t)};function u(e){const t=Object.assign({h2:"h2",a:"a",span:"span",p:"p"},(0,r.ah)(),e.components);return o.createElement(o.Fragment,null,o.createElement(t.h2,{id:"code",style:{position:"relative"}},"Code",o.createElement(t.a,{href:"#code","aria-label":"code permalink",className:"header-anchor after"},o.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",o.createElement(a.A,{heading:"How can I get the Helsinki Grotesk font in .hel.fi domain services?",headingLevel:"3",theme:{"--header-font-size":"var(--fontsize-heading-xs)","--padding-vertical":"var(--spacing-s)"}},o.createElement(t.p,null,"Please refer to ",o.createElement(i.Z,{href:"https://helsinkisolutionoffice.atlassian.net/wiki/spaces/DD/pages/296058881/Using+Helsinki+Grotesk+fonts"},"the internal font documentation in Confluence"),". If you do not have access to Confluence, ask your project’s city employee contact.")),"\n",o.createElement(a.A,{heading:"Where to get help with Drupal and WordPress?",headingLevel:"3",theme:{"--header-font-size":"var(--fontsize-heading-xs)","--padding-vertical":"var(--spacing-s)"}},o.createElement(t.p,null,"While HDS does not currently offer WordPress or Drupal implementations, HDS cooperates with multiple WordPress and Drupal projects in the City of Helsinki. Many of these projects have already implemented HDS components which can be reused in other projects."),o.createElement(t.p,null,"If your project is using either WordPress or Drupal, please contact ",o.createElement(t.a,{href:"mailto:ketu@hel.fi"},"ketu@hel.fi")," to learn about available implementations that follow HDS.")))}t.default=function(e){return void 0===e&&(e={}),o.createElement(l,e,o.createElement(u,e))}},69636:function(e,t,n){n.r(t);var r=n(11151),o=n(67294),a=n(89482),i=(n(18607),n(26127));function c(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,r.ah)(),e.components);return i.Z||l("PageTabs",!1),i.Z.Tab||l("PageTabs.Tab",!0),i.Z.TabList||l("PageTabs.TabList",!0),i.Z.TabPanel||l("PageTabs.TabPanel",!0),o.createElement(o.Fragment,null,o.createElement(t.h1,{id:"frequently-asked-questions",style:{position:"relative"}},"Frequently asked questions",o.createElement(t.a,{href:"#frequently-asked-questions","aria-label":"frequently asked questions permalink",className:"header-anchor after"},o.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",o.createElement(a.Z,null,"Here you will find frequently asked questions about HDS and answers to those questions. If you do not find an answer to your question on this page, you can always contact the HDS team for more information."),"\n",o.createElement(i.Z,{pageContext:e.pageContext},o.createElement(i.Z.TabList,null,o.createElement(i.Z.Tab,{href:"/"},"General"),o.createElement(i.Z.Tab,{href:"/design"},"Design"),o.createElement(i.Z.Tab,{href:"/code"},"Code"),o.createElement(i.Z.Tab,{href:"/accessibility"},"Accessibility")),o.createElement(i.Z.TabPanel,null,e.children)))}function l(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,r.ah)(),e.components);return t?o.createElement(t,e,o.createElement(c,e)):c(e)}},89482:function(e,t,n){var r=n(67294);t.Z=e=>{let{color:t="var(--color-black-90)",size:n="var(--fontsize-body-xl)",style:o={},children:a}=e;return r.createElement("p",{style:{fontSize:n,color:t,maxWidth:600,...o}},a)}},26127:function(e,t,n){var r=n(67294),o=n(14160),a=n(29683);const i="PageTabList",c="PageTabPanel",l="PageTab",u=e=>{var t;let{pageContext:n,children:u}=e;const s=n.frontmatter.slug,d=Array.isArray(u)?u:[u],f=d.find((e=>(0,r.isValidElement)(e)&&e.type.componentName===i)),h=d.find((e=>(0,r.isValidElement)(e)&&e.type.componentName===c)),p=null===(t=f.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===l)),_=p.findIndex((e=>s.endsWith(e.props.href))),g=-1===_?0:_,v=0===g?s:(e=>"/"+e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/"))(s);return r.createElement(a.a,{initiallyActiveTab:g},r.createElement(a.a.TabList,{className:"page-tabs-list"},p.map((e=>r.createElement(a.a.Tab,{key:e.props.href,onClick:()=>(0,o.navigate)(""+("/"===e.props.href?v:v+e.props.href))},e.props.children)))),p.map(((e,t)=>r.createElement(a.a.TabPanel,{key:e.props.href},g===t?h.props.children:r.createElement("div",null)))))},s=e=>{let{children:t}=e;return r.createElement(a.a.TabList,null,t)};s.componentName=i;const d=e=>{let{href:t,slug:n,children:o}=e;return r.createElement(a.a.Tab,null,o)};d.componentName=l;const f=e=>{let{children:t}=e;return r.createElement(a.a.TabPanel,null,t)};f.componentName=c,u.TabList=s,u.Tab=d,u.TabPanel=f,t.Z=u}}]);