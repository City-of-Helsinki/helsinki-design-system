(self.webpackChunksite=self.webpackChunksite||[]).push([[4929,198],{91309:function(e,t,n){var a="[object Null]",r="[object Undefined]",l="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g,i="object"==typeof self&&self&&self.Object===Object&&self,o=l||i||Function("return this")(),s=Object.prototype,u=s.hasOwnProperty,c=s.toString,p=o.Symbol,d=p?p.toStringTag:void 0;function h(e){return null==e?void 0===e?r:a:d&&d in Object(e)?function(e){var t=u.call(e,d),n=e[d];try{e[d]=void 0;var a=!0}catch(l){}var r=c.call(e);a&&(t?e[d]=n:delete e[d]);return r}(e):function(e){return c.call(e)}(e)}e.exports=function(e){if(!function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}(e))return!1;var t=h(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}},48389:function(e,t,n){var a="Expected a function",r=NaN,l="[object Symbol]",i=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,u=/^0o[0-7]+$/i,c=parseInt,p="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g,d="object"==typeof self&&self&&self.Object===Object&&self,h=p||d||Function("return this")(),m=Object.prototype.toString,_=Math.max,b=Math.min,v=function(){return h.Date.now()};function x(e,t,n){var r,l,i,o,s,u,c=0,p=!1,d=!1,h=!0;if("function"!=typeof e)throw new TypeError(a);function m(t){var n=r,a=l;return r=l=void 0,c=t,o=e.apply(a,n)}function x(e){var n=e-u;return void 0===u||n>=t||n<0||d&&e-c>=i}function y(){var e=v();if(x(e))return E(e);s=setTimeout(y,function(e){var n=t-(e-u);return d?b(n,i-(e-c)):n}(e))}function E(e){return s=void 0,h&&r?m(e):(r=l=void 0,o)}function w(){var e=v(),n=x(e);if(r=arguments,l=this,u=e,n){if(void 0===s)return function(e){return c=e,s=setTimeout(y,t),p?m(e):o}(u);if(d)return s=setTimeout(y,t),m(u)}return void 0===s&&(s=setTimeout(y,t)),o}return t=g(t)||0,f(n)&&(p=!!n.leading,i=(d="maxWait"in n)?_(g(n.maxWait)||0,t):i,h="trailing"in n?!!n.trailing:h),w.cancel=function(){void 0!==s&&clearTimeout(s),c=0,r=u=l=s=void 0},w.flush=function(){return void 0===s?o:E(v())},w}function f(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function g(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&m.call(e)==l}(e))return r;if(f(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=f(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(i,"");var n=s.test(e);return n||u.test(e)?c(e.slice(2),n?2:8):o.test(e)?r:+e}e.exports=function(e,t,n){var r=!0,l=!0;if("function"!=typeof e)throw new TypeError(a);return f(n)&&(r="leading"in n?!!n.leading:r,l="trailing"in n?!!n.trailing:l),x(e,t,{leading:r,maxWait:t,trailing:l})}},30695:function(e,t,n){"use strict";n.d(t,{I:function(){return l}});var a=n(67294),r=n(32719);const l=e=>{let{ariaLabel:t="minus",ariaLabelledby:n,ariaHidden:l=!0,className:i="",color:o,size:s="s",style:u={}}=e;return a.createElement("svg",{className:[r.s.icon,r.s[s],i].filter((e=>e)).join(" "),role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","aria-label":t,"aria-labelledby":n,"aria-hidden":l,color:o,style:u},a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6 11H18V13H6V11Z",fill:"currentColor"}))}},63483:function(e,t,n){"use strict";n.d(t,{I:function(){return l}});var a=n(67294),r=n(32719);const l=e=>{let{ariaLabel:t="plus",ariaLabelledby:n,ariaHidden:l=!0,className:i="",color:o,size:s="s",style:u={}}=e;return a.createElement("svg",{className:[r.s.icon,r.s[s],i].filter((e=>e)).join(" "),role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","aria-label":t,"aria-labelledby":n,"aria-hidden":l,color:o,style:u},a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13 6V11H18V13H13V18H11V13H6V11H11V6H13Z",fill:"currentColor"}))}},88966:function(e,t,n){"use strict";n.d(t,{I:function(){return u},t:function(){return s}});var a=n(80136),r=n(67294),l=n(7444),i=n(34300),o=n(69079),s={root:"TextInput-module_root__2CMNr text-input_hds-text-input__2LODq",inputWrapper:"TextInput-module_inputWrapper__3Rvel text-input_hds-text-input__input-wrapper__1OqYG",input:"TextInput-module_input__1BlHi text-input_hds-text-input__input__GJm5C",hasButton:"TextInput-module_hasButton__2KCM1",hasClearButton:"TextInput-module_hasClearButton__3-tBe text-input_hds-text-input__input-clear__17qr1",clearButton:"TextInput-module_clearButton__bfCLI text-input_hds-text-input__button-clear__2ED7z",errorText:"TextInput-module_errorText__3pizm text-input_hds-text-input__error-text__1GLYk",helperText:"TextInput-module_helperText__2dLR6 text-input_hds-text-input__helper-text__3V2KM",invalidText:"TextInput-module_invalidText__1w4sm text-input_hds-text-input__helper-text__3V2KM",successText:"TextInput-module_successText__2NMCP text-input_hds-text-input__success-text__3EOiy",infoText:"TextInput-module_infoText__zHOGs text-input_hds-text-input__info-text__3bqzy",invalid:"TextInput-module_invalid__2iYo2 text-input_hds-text-input--invalid__1UfKC",success:"TextInput-module_success__1kDOm text-input_hds-text-input--success__3dm2J",readOnly:"TextInput-module_readOnly__j615N undefined",buttonWrapper:"TextInput-module_buttonWrapper___filA text-input_hds-text-input__buttons__1RMzT",button:"TextInput-module_button__1ySMX text-input_hds-text-input__button__1Fh0I"};(0,l.s)("@keyframes text-input_fadeIn__2IDZ8{0%{opacity:0}to{opacity:1}}.text-input_hds-text-input__2LODq{--border-width:2px;--outline-width:3px;--input-height:56px;--textarea-height:149px;--icon-size:var(--spacing-m);--helper-background-color-invalid:var(--color-error-light);--helper-background-color-success:var(--color-success-light);--helper-background-color-info:var(--color-info-light);--helper-color-default:var(--color-black-60);--helper-color-invalid:var(--color-black);--helper-color-success:var(--color-black);--helper-color-info:var(--color-black);--helper-color-info-icon:var(--color-coat-of-arms);--icon-color-invalid:var(--color-error);--icon-color-info:var(--color-info);--icon-color-success:var(--color-success);--input-background-default:var(--color-white);--input-background-disabled:var(--color-black-10);--input-border-color-default:var(--color-black-50);--input-border-color-hover:var(--color-black-90);--input-border-color-focus:var(--color-black-90);--input-border-color-invalid:var(--color-error);--input-border-color-disabled:var(--color-black-10);--input-border-color-success:var(--color-success);--input-color-default:var(--color-black-90);--input-color-disabled:var(--color-black-40);--label-color-default:var(--color-black-90);--label-color-invalid:var(--color-black-90);--placeholder-color:var(--color-black-60)}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C{-webkit-appearance:none;background-color:var(--input-background-default);border:var(--border-width) solid var(--input-border-color-default);border-radius:0;box-sizing:border-box;color:var(--input-color-default);font-family:inherit;font-size:1.125em;height:var(--input-height);line-height:normal;margin:0;padding:0 var(--spacing-s);width:100%;will-change:transform,box-shadow}.text-input_hds-text-input__2LODq:not([data-hds-textinput-filled]) .text-input_hds-text-input__button-clear__2ED7z,.text-input_hds-text-input__input-clear__17qr1::-webkit-search-cancel-button{display:none}.text-input_hds-text-input__2LODq .text-input_hds-text-input__button-clear__2ED7z>*{pointer-events:none}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C:hover{border-color:var(--input-border-color-hover);transition:border-color 85ms ease-out}.text-input_hds-text-input__input-wrapper__1OqYG:focus-within .text-input_hds-text-input__input__GJm5C{border-color:var(--input-border-color-focus);outline:none}.text-input_hds-text-input__2LODq.text-input_hds-text-input--invalid__1UfKC .text-input_hds-text-input__input__GJm5C{border-color:var(--input-border-color-invalid)}.text-input_hds-text-input__2LODq.text-input_hds-text-input--success__3dm2J .text-input_hds-text-input__input__GJm5C{border-color:var(--input-border-color-success)}.text-input_hds-text-input__input-wrapper__1OqYG:focus-within .text-input_hds-text-input__input__GJm5C:not([readonly]){box-shadow:0 0 0 var(--outline-width) var(--color-focus-outline);transform:translateZ(0);transition:85ms ease-out;transition-property:box-shadow,transform}.text-input_hds-text-input__label__15F2V{color:var(--label-color-default);display:block;font-size:var(--fontsize-body-m);font-weight:500;margin-bottom:var(--spacing-3-xs)}.text-input_hds-text-input--invalid__1UfKC .text-input_hds-text-input__label__15F2V{color:var(--label-color-invalid);transition:color 85ms linear}.text-input_hds-text-input__required__z3Hm0{color:var(--color-black-90);display:inline-block;font-size:var(--fontsize-body-xl);line-height:1;margin-left:var(--spacing-2-xs);transform:translateY(var(--spacing-3-xs))}.text-input_hds-text-input__input-wrapper__1OqYG{display:flex;position:relative}.text-input_hds-text-input__2LODq textarea.text-input_hds-text-input__input__GJm5C{font-family:inherit;height:var(--textarea-height);margin:0;min-height:var(--input-height);overflow:auto;padding:var(--spacing-s);resize:vertical}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C::-ms-reveal{display:none}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C::-moz-placeholder{color:var(--placeholder-color);opacity:1}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C::placeholder{color:var(--placeholder-color);opacity:1}.text-input_hds-text-input__helper-text__3V2KM{color:var(--helper-color-default);display:block;font-size:var(--fontsize-body-m);line-height:var(--lineheight-l);margin-top:var(--spacing-3-xs);white-space:pre-line}.text-input_hds-text-input__error-text__1GLYk{background-color:var(--helper-background-color-invalid);border-left:8px solid var(--color-error);color:var(--helper-color-invalid);display:flex;font-size:var(--fontsize-body-m);line-height:var(--lineheight-l);margin-top:var(--spacing-2-xs);padding:var(--spacing-2-xs);white-space:pre-line}.text-input_hds-text-input__error-text__1GLYk:not(:last-child){margin-bottom:var(--spacing-2-xs)}.text-input_hds-text-input__error-text__1GLYk:before{animation:text-input_fadeIn__2IDZ8 85ms ease-out;background:var(--color-error);content:\"\";display:inline-block;height:var(--icon-size);margin-right:var(--spacing-2-xs);-webkit-mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.175 3.456c.349-.586 1.223-.607 1.61-.063l.04.063 9.052 15.21c.343.577-.072 1.285-.753 1.332l-.072.002H2.948c-.7 0-1.15-.689-.858-1.273l.033-.06 9.052-15.21zM13 16v2h-2v-2h2zm0-7.5v6h-2v-6h2z' fill='currentColor'/%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.175 3.456c.349-.586 1.223-.607 1.61-.063l.04.063 9.052 15.21c.343.577-.072 1.285-.753 1.332l-.072.002H2.948c-.7 0-1.15-.689-.858-1.273l.033-.06 9.052-15.21zM13 16v2h-2v-2h2zm0-7.5v6h-2v-6h2z' fill='currentColor'/%3E%3C/svg%3E\");pointer-events:none;width:var(--icon-size)}.text-input_hds-text-input__success-text__3EOiy{background-color:var(--helper-background-color-success);border-left:8px solid var(--color-success);color:var(--helper-color-success);display:flex;font-size:var(--fontsize-body-m);line-height:var(--lineheight-l);margin-top:var(--spacing-2-xs);padding:var(--spacing-2-xs);position:relative;white-space:pre-wrap}.text-input_hds-text-input__success-text__3EOiy:not(:last-child){margin-bottom:var(--spacing-2-xs)}.text-input_hds-text-input__success-text__3EOiy:before{animation:text-input_fadeIn__2IDZ8 85ms ease-out;background:var(--color-success);content:\"\";display:inline-block;height:var(--icon-size);margin-right:var(--spacing-2-xs);-webkit-mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath fill='currentColor' d='M12 3a9 9 0 100 18 9 9 0 000-18zm4.5 5L18 9.5 10.5 17 6 12.5 7.5 11l3 3 6-6z'/%3E%3C/g%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath fill='currentColor' d='M12 3a9 9 0 100 18 9 9 0 000-18zm4.5 5L18 9.5 10.5 17 6 12.5 7.5 11l3 3 6-6z'/%3E%3C/g%3E%3C/svg%3E\");pointer-events:none;width:var(--icon-size)}.text-input_hds-text-input__info-text__3bqzy{background-color:var(--helper-background-color-info);border-left:8px solid var(--color-info);color:var(--helper-color-info);display:flex;font-size:var(--fontsize-body-m);line-height:var(--lineheight-l);margin-top:var(--spacing-2-xs);padding:var(--spacing-2-xs);position:relative}.text-input_hds-text-input__info-text__3bqzy:not(:last-child){margin-bottom:var(--spacing-2-xs)}.text-input_hds-text-input__info-text__3bqzy:before{animation:text-input_fadeIn__2IDZ8 85ms ease-out;background:var(--color-info);content:\"\";display:inline-block;height:var(--icon-size);margin-right:var(--spacing-2-xs);-webkit-mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath fill='currentColor' d='M12 3a9 9 0 110 18 9 9 0 010-18zm1 13v2h-2v-2h2zm0-10v8h-2V6h2z'/%3E%3C/g%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath fill='currentColor' d='M12 3a9 9 0 110 18 9 9 0 010-18zm1 13v2h-2v-2h2zm0-10v8h-2V6h2z'/%3E%3C/g%3E%3C/svg%3E\");pointer-events:none;width:var(--icon-size)}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C[disabled]{background-color:var(--input-background-disabled);border-color:var(--input-border-color-disabled);color:var(--input-color-disabled);cursor:not-allowed}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C[readonly]{background-color:transparent;border:0;color:var(--input-color-default);padding:0;-webkit-text-fill-color:var(--input-color-default)}.text-input_hds-text-input__buttons__1RMzT{align-items:center;bottom:0;display:flex;font-size:1rem;justify-content:center;margin-right:calc(var(--spacing-s) - var(--spacing-xs) / 2);position:absolute;right:0;top:0}.text-input_hds-text-input__button__1Fh0I{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:none;border:none;cursor:pointer;display:flex;font:inherit;outline:none;padding:var(--spacing-xs) calc(var(--spacing-xs) / 2)}.text-input_hds-text-input__button__1Fh0I:focus{outline:var(--outline-width) solid var(--color-focus-outline)}.TextInput-module_root__2CMNr{position:relative}.TextInput-module_input__1BlHi.TextInput-module_hasButton__2KCM1,.TextInput-module_input__1BlHi.TextInput-module_hasClearButton__3-tBe{padding-right:calc(2 * var(--spacing-s) + 1.5rem)}.TextInput-module_input__1BlHi.TextInput-module_hasButton__2KCM1.TextInput-module_hasClearButton__3-tBe{padding-right:calc(4 * var(--spacing-s) + 1.5rem)}.TextInput-module_button__1ySMX:disabled{cursor:not-allowed}.TextInput-module_button__1ySMX:focus{outline:var(--outline-width) solid var(--color-focus-outline)}");const u=r.forwardRef(((e,t)=>{var{children:n,className:l="",errorText:u,helperText:c,hideLabel:p=!1,id:d,invalid:h=!1,isAriaLabelledBy:m=!1,label:_,labelId:b,onBlur:v,required:x=!1,style:f,successText:g,infoText:y,tooltipLabel:E,tooltipText:w,tooltipButtonLabel:T}=e,k=(0,a._)(e,["children","className","errorText","helperText","hideLabel","id","invalid","isAriaLabelledBy","label","labelId","onBlur","required","style","successText","infoText","tooltipLabel","tooltipText","tooltipButtonLabel"]);const I={className:(0,i.c)(s.root,h&&s.invalid,g&&s.success,l),onBlur:v,style:f};return r.createElement("div",Object.assign({},I,k,{ref:t}),_&&r.createElement(o.F,{id:b,inputId:d,isAriaLabelledBy:m,hidden:p,label:_,required:x,tooltipLabel:E,tooltipButtonLabel:T,tooltipText:w}),r.createElement("div",{className:(0,i.c)(s.inputWrapper)},n),u&&r.createElement("div",{className:s.errorText,id:`${d}-error`},u),g&&r.createElement("div",{className:s.successText,id:`${d}-success`},g),y&&r.createElement("div",{className:s.infoText,id:`${d}-info`},y),c&&r.createElement("div",{className:s.helperText,id:`${d}-helper`},c))}))},13384:function(e,t,n){"use strict";n.d(t,{N:function(){return b}});var a=n(80136),r=n(67294),l=n(39440),i=n(48389),o=n.n(i),s=(n(7568),n(7444)),u=n(88966),c=n(34300),p=n(37776),d=n(94330),h=n(30695),m=n(63483),_="NumberInput-module_button__2Shu7";(0,s.s)(".NumberInput-module_numberInputContainer__hKNPp{width:100%}.NumberInput-module_numberInputContainer__hKNPp input::-webkit-inner-spin-button,.NumberInput-module_numberInputContainer__hKNPp input::-webkit-outer-spin-button{appearance:none!important;height:auto;margin:0!important}.NumberInput-module_numberInputContainer__hKNPp input[type=number]{appearance:textfield!important}.NumberInput-module_numberInputWithSteps__3q7N7{padding-left:68px!important;padding-right:68px!important;text-align:center}.NumberInput-module_minusButtonWrapper__3PHN9{border-right:1px solid #ccc}.NumberInput-module_minusButtonWrapper__3PHN9,.NumberInput-module_minusButtonWrapperWithoutBorder__2g42V{align-items:center;bottom:0;display:flex;font-size:1rem;justify-content:center;margin:2px;position:absolute;top:0;width:52px;z-index:1;left:0}.NumberInput-module_plusButtonWrapper__Wwq5t{border-left:1px solid #ccc}.NumberInput-module_plusButtonWrapper__Wwq5t,.NumberInput-module_plusButtonWrapperWithoutBorder__2xb6t{align-items:center;bottom:0;display:flex;font-size:1rem;justify-content:center;margin:2px;position:absolute;top:0;width:52px;z-index:1;right:0}.NumberInput-module_button__2Shu7{align-items:center;appearance:none;background:transparent;border:0;cursor:pointer;display:flex;font-size:1rem;height:100%;justify-content:center;overflow:hidden;padding:0;width:100%}.NumberInput-module_button__2Shu7:disabled{cursor:not-allowed}.NumberInput-module_button__2Shu7:focus{outline:3px solid var(--color-focus-outline);outline-offset:-5px}");const b=r.forwardRef(((e,t)=>{var{className:n="",disabled:i=!1,defaultValue:s,errorText:b,helperText:v,hideLabel:x,invalid:f,id:g,label:y,max:E,min:w,minusStepButtonAriaLabel:T,onChange:k=(()=>null),plusStepButtonAriaLabel:I,required:L,step:N,style:C,successText:z,infoText:B,tooltipLabel:S,tooltipText:O,tooltipButtonLabel:j,type:H="number",unit:D}=e,M=(0,a._)(e,["className","disabled","defaultValue","errorText","helperText","hideLabel","invalid","id","label","max","min","minusStepButtonAriaLabel","onChange","plusStepButtonAriaLabel","required","step","style","successText","infoText","tooltipLabel","tooltipText","tooltipButtonLabel","type","unit"]);const q={className:n,errorText:b,helperText:v,hideLabel:x,id:g,invalid:f,label:(Z=y,G=D,!Z&&G?`(${G})`:Z&&G?`${Z} (${G})`:Z),required:L,style:C,successText:z,infoText:B,tooltipLabel:S,tooltipText:O,tooltipButtonLabel:j,labelId:N?`${g}-label`:void 0},W=(0,r.useRef)(null),[P,V]=(0,r.useState)(null),A=()=>{V(String(W.current.value))};var Z,G;!function(e){let t=!1;const n=o()((()=>{t=!1}),arguments.length>1&&void 0!==arguments[1]?arguments[1]:200);(0,r.useEffect)((()=>{const a=e=>{t&&e.preventDefault(),t=!0,n()};return e.current&&e.current.addEventListener("wheel",a,{passive:!1}),()=>{e.current&&e.current.removeEventListener("wheel",a)}}),[e])}(W),(0,r.useEffect)((()=>{t&&(0,d.m)(t,W)}),[W,t]);const J=()=>{Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(W.current,W.current.value);const e=new Event("input",{bubbles:!0});W.current.dispatchEvent(e)},$=N?e=>{null!==P&&V(null),k(e)}:k,K=(0,p.c)(g,v,b,z,B);return r.createElement(u.I,Object.assign({},q),r.createElement("div",Object.assign({className:"NumberInput-module_numberInputContainer__hKNPp"},N&&{role:"group","aria-labelledby":q.labelId}),r.createElement("input",Object.assign({className:(0,c.c)(u.t.input,N?"NumberInput-module_numberInputWithSteps__3q7N7":""),defaultValue:s,disabled:i,id:g,max:E,min:w,step:N,onChange:$,ref:W,required:L,type:H,"aria-describedby":K.length>0?K:null},M)),N&&r.createElement(r.Fragment,null,r.createElement("div",{className:i?"NumberInput-module_minusButtonWrapperWithoutBorder__2g42V":"NumberInput-module_minusButtonWrapper__3PHN9"},r.createElement("button",{className:_,disabled:i,type:"button",onClick:e=>{e.preventDefault(),W.current.stepDown(),J(),A()},"aria-label":T||"Decrease by one"},r.createElement(h.I,{"aria-hidden":"true"}))),r.createElement("div",{className:i?"NumberInput-module_plusButtonWrapperWithoutBorder__2xb6t":"NumberInput-module_plusButtonWrapper__Wwq5t"},r.createElement("button",{className:_,disabled:i,type:"button",onClick:e=>{e.preventDefault(),W.current.stepUp(),J(),A()},"aria-label":I||"Increase by one"},r.createElement(m.I,{"aria-hidden":"true"}))),null!==P&&r.createElement(l.T,null,r.createElement("span",{"aria-live":"assertive"},P)))))}))},99123:function(e,t,n){"use strict";n.d(t,{S:function(){return u}});var a=n(80136),r=n(67294),l=(n(7568),n(7444)),i=n(34300),o={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,l.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const s=e=>{let{icon:t}=e;return r.createElement("span",{className:o.statusLabelIcon,"aria-hidden":"true"},t)},u=e=>{var{children:t,className:n,dataTestId:l,type:u="neutral",iconLeft:c}=e,p=(0,a._)(e,["children","className","dataTestId","type","iconLeft"]);return r.createElement("span",Object.assign({className:(0,i.c)(o.statusLabel,o[u],c&&o.statusLabelWithIcon,n),"data-testid":l},p),c&&r.createElement(s,{icon:c}),t)}},37776:function(e,t,n){"use strict";n.d(t,{c:function(){return a}});var a=(e,t,n,a,r)=>[t&&`${e}-helper`,n&&`${e}-error`,a&&`${e}-success`,r&&`${e}-info`].filter((e=>e)).join(" ")},94330:function(e,t,n){"use strict";n.d(t,{m:function(){return l}});var a=n(91309),r=n.n(a),l=(e,t)=>{r()(e)?e(t.current):e.current=t.current}},55297:function(e,t,n){"use strict";n.r(t);var a=n(11151),r=n(67294),l=n(13384),i=n(11757);const o=e=>{let{children:t,pageContext:n}=e;return r.createElement(i.default,{pageContext:n},t)};function s(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",ul:"ul",li:"li",strong:"strong",h4:"h4",p:"p",code:"code"},(0,a.ah)(),e.components),{PlaygroundPreview:n,ExternalLink:i}=t;return i||u("ExternalLink",!0),n||u("PlaygroundPreview",!0),r.createElement(r.Fragment,null,r.createElement(t.h2,{id:"usage",style:{position:"relative"}},"Usage",r.createElement(t.a,{href:"#usage","aria-label":"usage permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.h3,{id:"example",style:{position:"relative"}},"Example",r.createElement(t.a,{href:"#example","aria-label":"example permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(n,null,r.createElement(l.N,{id:"example",helperText:"Assistive text",label:"Total compensation",unit:"€",defaultValue:1e3,style:{maxWidth:"320px"}})),"\n",r.createElement(t.h3,{id:"principles",style:{position:"relative"}},"Principles",r.createElement(t.a,{href:"#principles","aria-label":"principles permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,r.createElement(t.strong,null,"A label should always be provided with a number input."),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"Make sure that the label is clear and concise. The user should immediately understand what number they are supposed to input."),"\n"),"\n"),"\n",r.createElement(t.li,null,"HDS Number input also supports displaying an unit for the number. Displaying the unit is not mandatory. Only use it when you think it will help the user.","\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"Display the unit for ",r.createElement(i,{href:"https://en.wikipedia.org/wiki/International_System_of_Units"},"SI units")," (such as meters) and currencies."),"\n",r.createElement(t.li,null,'The unit does not need to be displayed when it is self-evident for the user, such as in "Number of people"'),"\n"),"\n"),"\n",r.createElement(t.li,null,"It is recommended to give the number input a default value. Placeholders should be avoided in number inputs."),"\n",r.createElement(t.li,null,"HDS Number input supports visual steppers that can be set to increase and decrease the number value by a set amount.","\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"Steppers can be used when changes to the value are small or when they are intuitive to the user (e.g. from 0 to 100 with steps of 10)."),"\n",r.createElement(t.li,null,"You should not use steppers when large value changes are expected."),"\n"),"\n"),"\n"),"\n",r.createElement(t.h3,{id:"variations",style:{position:"relative"}},"Variations",r.createElement(t.a,{href:"#variations","aria-label":"variations permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.h4,{id:"default",style:{position:"relative"}},"Default",r.createElement(t.a,{href:"#default","aria-label":"default permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"Default HDS Number input comes without stepper. The number is always inputted manually. Using this over a text input is still helpful since it has a ",r.createElement(t.code,null,"type=number")," to aid screen readers and mobile keyboards."),"\n",r.createElement(t.p,null,"When applicable, a unit can be set for the input by using the ",r.createElement(t.code,null,"unit")," prop."),"\n",r.createElement(n,null,r.createElement(l.N,{id:"default",helperText:"Assistive text",label:"Total compensation",unit:"€",defaultValue:1e3,style:{maxWidth:"320px"}})),"\n",r.createElement(t.h4,{id:"with-steppers",style:{position:"relative"}},"With steppers",r.createElement(t.a,{href:"#with-steppers","aria-label":"with steppers permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"Steppers can be enabled via providing a ",r.createElement(t.code,null,"step")," property. Use this variant when value changes are small and you can determine logical amounts for an increase and a decrease step."),"\n",r.createElement(n,null,r.createElement(l.N,{id:"stepper",helperText:"Assistive text",label:"Number of attendees",minusStepButtonAriaLabel:"Decrease by one",plusStepButtonAriaLabel:"Increase by one",step:1,defaultValue:5,style:{maxWidth:"320px"}})),"\n",r.createElement(t.h4,{id:"with-min-and-max-values",style:{position:"relative"}},"With min and max values",r.createElement(t.a,{href:"#with-min-and-max-values","aria-label":"with min and max values permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"Steppers can be enabled by providing a ",r.createElement(t.code,null,"step")," property. Use this variant when value changes are small and you can determine logical amounts for an increase and a decrease step."),"\n",r.createElement(t.p,null,"If your input has special requirements, it is a good practice to describe them in the assistive text."),"\n",r.createElement(n,null,r.createElement(l.N,{id:"stepper-minmax",helperText:"At least 3 attendees are required",label:"Number of attendees",min:3,max:99,minusStepButtonAriaLabel:"Decrease by one",plusStepButtonAriaLabel:"Increase by one",step:1,defaultValue:3,style:{maxWidth:"320px"}})))}function u(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){return void 0===e&&(e={}),r.createElement(o,e,r.createElement(s,e))}},11757:function(e,t,n){"use strict";n.r(t);var a=n(11151),r=n(67294),l=n(57674),i=n(89482),o=(n(18607),n(26127)),s=n(55725);function u(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,a.ah)(),e.components);return o.Z||c("PageTabs",!1),o.Z.Tab||c("PageTabs.Tab",!0),o.Z.TabList||c("PageTabs.TabList",!0),o.Z.TabPanel||c("PageTabs.TabPanel",!0),r.createElement(r.Fragment,null,r.createElement(t.h1,{id:"numberinput",style:{position:"relative"}},"NumberInput",r.createElement(t.a,{href:"#numberinput","aria-label":"numberinput permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement("div",{class:"status-label-description"},r.createElement(s.Z,{type:"info"},"Stable"),r.createElement(s.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),r.createElement(l.Z)),"\n",r.createElement(i.Z,null,"  A number input allows the user to enter numeric values. It also features optional steppers for increasing or decreasing the value by a set amount."),"\n",r.createElement(o.Z,{pageContext:e.pageContext},r.createElement(o.Z.TabList,null,r.createElement(o.Z.Tab,{href:"/"},"Usage"),r.createElement(o.Z.Tab,{href:"/code"},"Code"),r.createElement(o.Z.Tab,{href:"/accessibility"},"Accessibility")),r.createElement(o.Z.TabPanel,null,e.children)))}function c(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?r.createElement(t,e,r.createElement(u,e)):u(e)}},89482:function(e,t,n){"use strict";var a=n(67294),r=n(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:n="var(--fontsize-body-xl)",style:l={},children:i}=e;return a.createElement("p",{style:{fontSize:n,color:t,maxWidth:600,...l}},(0,r.g)(i))}},26127:function(e,t,n){"use strict";var a=n(67294),r=n(14160),l=n(21335),i=n(42972);const o="PageTabList",s="PageTabPanel",u="PageTab",c=e=>{var t;let{pageContext:n,children:c}=e;const p=n.frontmatter.slug,d=Array.isArray(c)?c:[c],h=d.find((e=>(0,a.isValidElement)(e)&&e.type.componentName===o)),m=d.find((e=>(0,a.isValidElement)(e)&&e.type.componentName===s)),_=null===(t=h.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===u)),b=_.findIndex((e=>p.endsWith(e.props.href))),v=-1===b?0:b,x=0===v?p:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(p);return a.createElement(l.a,{initiallyActiveTab:v},a.createElement(l.a.TabList,{className:"page-tabs-list"},_.map((e=>a.createElement(l.a.Tab,{key:e.props.href,onClick:()=>(0,r.navigate)(`${"/"===e.props.href?x:x+e.props.href}`)},(0,i.g)(e.props.children))))),_.map(((e,t)=>a.createElement(l.a.TabPanel,{key:e.props.href},v===t?m.props.children:a.createElement("div",null)))))},p=e=>{let{children:t}=e;return a.createElement(l.a.TabList,null,t)};p.componentName=o;const d=e=>{let{href:t,slug:n,children:r}=e;return a.createElement(l.a.Tab,null," ",r)};d.componentName=u;const h=e=>{let{children:t}=e;return a.createElement(l.a.TabPanel,null,t)};h.componentName=s,c.TabList=p,c.Tab=d,c.TabPanel=h,t.Z=c},55725:function(e,t,n){"use strict";var a=n(67294),r=n(99123),l=n(42972);t.Z=e=>{let{children:t,...n}=e;return a.createElement(r.S,n,(0,l.g)(t))}},57674:function(e,t,n){"use strict";var a=n(67294),r=n(37106);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return a.createElement(r.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},a.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>a.createElement("li",{key:t},a.createElement("span",{className:"status-name"},t),a.createElement("span",null,e[t]))))))}}}]);