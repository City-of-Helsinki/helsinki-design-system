(self.webpackChunksite=self.webpackChunksite||[]).push([[4910,198],{74833:function(e,t,n){var a=n(56127),l=/^\s+/;e.exports=function(e){return e?e.slice(0,a(e)+1).replace(l,""):e}},56127:function(e){var t=/\s/;e.exports=function(e){for(var n=e.length;n--&&t.test(e.charAt(n)););return n}},66726:function(e,t,n){var a=n(11611),l=n(57708),r=n(91936),i=Math.max,o=Math.min;e.exports=function(e,t,n){var s,u,c,p,d,m,h=0,_=!1,b=!1,x=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function v(t){var n=s,a=u;return s=u=void 0,h=t,p=e.apply(a,n)}function f(e){var n=e-m;return void 0===m||n>=t||n<0||b&&e-h>=c}function g(){var e=l();if(f(e))return E(e);d=setTimeout(g,function(e){var n=t-(e-m);return b?o(n,c-(e-h)):n}(e))}function E(e){return d=void 0,x&&s?v(e):(s=u=void 0,p)}function y(){var e=l(),n=f(e);if(s=arguments,u=this,m=e,n){if(void 0===d)return function(e){return h=e,d=setTimeout(g,t),_?v(e):p}(m);if(b)return clearTimeout(d),d=setTimeout(g,t),v(m)}return void 0===d&&(d=setTimeout(g,t)),p}return t=r(t)||0,a(n)&&(_=!!n.leading,c=(b="maxWait"in n)?i(r(n.maxWait)||0,t):c,x="trailing"in n?!!n.trailing:x),y.cancel=function(){void 0!==d&&clearTimeout(d),h=0,s=m=u=d=void 0},y.flush=function(){return void 0===d?p:E(l())},y}},57708:function(e,t,n){var a=n(77400);e.exports=function(){return a.Date.now()}},19783:function(e,t,n){var a=n(66726),l=n(11611);e.exports=function(e,t,n){var r=!0,i=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return l(n)&&(r="leading"in n?!!n.leading:r,i="trailing"in n?!!n.trailing:i),a(e,t,{leading:r,maxWait:t,trailing:i})}},91936:function(e,t,n){var a=n(74833),l=n(11611),r=n(55193),i=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,s=/^0o[0-7]+$/i,u=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(r(e))return NaN;if(l(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=l(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=a(e);var n=o.test(e);return n||s.test(e)?u(e.slice(2),n?2:8):i.test(e)?NaN:+e}},30695:function(e,t,n){"use strict";n.d(t,{I:function(){return r}});var a=n(67294),l=n(32719);const r=e=>{let{ariaLabel:t="minus",ariaLabelledby:n,ariaHidden:r=!0,className:i="",color:o,size:s="s",style:u={}}=e;return a.createElement("svg",{className:[l.s.icon,l.s[s],i].filter((e=>e)).join(" "),role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","aria-label":t,"aria-labelledby":n,"aria-hidden":r,color:o,style:u},a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6 11H18V13H6V11Z",fill:"currentColor"}))}},63483:function(e,t,n){"use strict";n.d(t,{I:function(){return r}});var a=n(67294),l=n(32719);const r=e=>{let{ariaLabel:t="plus",ariaLabelledby:n,ariaHidden:r=!0,className:i="",color:o,size:s="s",style:u={}}=e;return a.createElement("svg",{className:[l.s.icon,l.s[s],i].filter((e=>e)).join(" "),role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","aria-label":t,"aria-labelledby":n,"aria-hidden":r,color:o,style:u},a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13 6V11H18V13H13V18H11V13H6V11H11V6H13Z",fill:"currentColor"}))}},88966:function(e,t,n){"use strict";n.d(t,{I:function(){return u},t:function(){return s}});var a=n(80136),l=n(67294),r=n(7444),i=n(34300),o=n(69079),s={root:"TextInput-module_root__2CMNr text-input_hds-text-input__2LODq",inputWrapper:"TextInput-module_inputWrapper__3Rvel text-input_hds-text-input__input-wrapper__1OqYG",input:"TextInput-module_input__1BlHi text-input_hds-text-input__input__GJm5C",hasButton:"TextInput-module_hasButton__2KCM1",hasClearButton:"TextInput-module_hasClearButton__3-tBe text-input_hds-text-input__input-clear__17qr1",clearButton:"TextInput-module_clearButton__bfCLI text-input_hds-text-input__button-clear__2ED7z",errorText:"TextInput-module_errorText__3pizm text-input_hds-text-input__error-text__1GLYk",helperText:"TextInput-module_helperText__2dLR6 text-input_hds-text-input__helper-text__3V2KM",invalidText:"TextInput-module_invalidText__1w4sm text-input_hds-text-input__helper-text__3V2KM",successText:"TextInput-module_successText__2NMCP text-input_hds-text-input__success-text__3EOiy",infoText:"TextInput-module_infoText__zHOGs text-input_hds-text-input__info-text__3bqzy",invalid:"TextInput-module_invalid__2iYo2 text-input_hds-text-input--invalid__1UfKC",success:"TextInput-module_success__1kDOm text-input_hds-text-input--success__3dm2J",readOnly:"TextInput-module_readOnly__j615N undefined",buttonWrapper:"TextInput-module_buttonWrapper___filA text-input_hds-text-input__buttons__1RMzT",button:"TextInput-module_button__1ySMX text-input_hds-text-input__button__1Fh0I"};(0,r.s)("@keyframes text-input_fadeIn__2IDZ8{0%{opacity:0}to{opacity:1}}.text-input_hds-text-input__2LODq{--border-width:2px;--outline-width:3px;--input-height:56px;--textarea-height:149px;--icon-size:var(--spacing-m);--helper-background-color-invalid:var(--color-error-light);--helper-background-color-success:var(--color-success-light);--helper-background-color-info:var(--color-info-light);--helper-color-default:var(--color-black-60);--helper-color-invalid:var(--color-black);--helper-color-success:var(--color-black);--helper-color-info:var(--color-black);--helper-color-info-icon:var(--color-coat-of-arms);--icon-color-invalid:var(--color-error);--icon-color-info:var(--color-info);--icon-color-success:var(--color-success);--input-background-default:var(--color-white);--input-background-disabled:var(--color-black-10);--input-border-color-default:var(--color-black-50);--input-border-color-hover:var(--color-black-90);--input-border-color-focus:var(--color-black-90);--input-border-color-invalid:var(--color-error);--input-border-color-disabled:var(--color-black-10);--input-border-color-success:var(--color-success);--input-color-default:var(--color-black-90);--input-color-disabled:var(--color-black-40);--label-color-default:var(--color-black-90);--label-color-invalid:var(--color-black-90);--placeholder-color:var(--color-black-60)}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C{-webkit-appearance:none;background-color:var(--input-background-default);border:var(--border-width) solid var(--input-border-color-default);border-radius:0;box-sizing:border-box;color:var(--input-color-default);font-family:inherit;font-size:1.125em;height:var(--input-height);line-height:normal;margin:0;padding:0 var(--spacing-s);width:100%;will-change:transform,box-shadow}.text-input_hds-text-input__2LODq:not([data-hds-textinput-filled]) .text-input_hds-text-input__button-clear__2ED7z,.text-input_hds-text-input__input-clear__17qr1::-webkit-search-cancel-button{display:none}.text-input_hds-text-input__2LODq .text-input_hds-text-input__button-clear__2ED7z>*{pointer-events:none}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C:hover{border-color:var(--input-border-color-hover);transition:border-color 85ms ease-out}.text-input_hds-text-input__input-wrapper__1OqYG:focus-within .text-input_hds-text-input__input__GJm5C{border-color:var(--input-border-color-focus);outline:none}.text-input_hds-text-input__2LODq.text-input_hds-text-input--invalid__1UfKC .text-input_hds-text-input__input__GJm5C{border-color:var(--input-border-color-invalid)}.text-input_hds-text-input__2LODq.text-input_hds-text-input--success__3dm2J .text-input_hds-text-input__input__GJm5C{border-color:var(--input-border-color-success)}.text-input_hds-text-input__input-wrapper__1OqYG:focus-within .text-input_hds-text-input__input__GJm5C:not([readonly]){box-shadow:0 0 0 var(--outline-width) var(--color-focus-outline);transform:translateZ(0);transition:85ms ease-out;transition-property:box-shadow,transform}.text-input_hds-text-input__label__15F2V{color:var(--label-color-default);display:block;font-size:var(--fontsize-body-m);font-weight:500;margin-bottom:var(--spacing-3-xs)}.text-input_hds-text-input--invalid__1UfKC .text-input_hds-text-input__label__15F2V{color:var(--label-color-invalid);transition:color 85ms linear}.text-input_hds-text-input__required__z3Hm0{color:var(--color-black-90);display:inline-block;font-size:var(--fontsize-body-xl);line-height:1;margin-left:var(--spacing-2-xs);transform:translateY(var(--spacing-3-xs))}.text-input_hds-text-input__input-wrapper__1OqYG{display:flex;position:relative}.text-input_hds-text-input__2LODq textarea.text-input_hds-text-input__input__GJm5C{font-family:inherit;height:var(--textarea-height);margin:0;min-height:var(--input-height);overflow:auto;padding:var(--spacing-s);resize:vertical}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C::-ms-reveal{display:none}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C::-moz-placeholder{color:var(--placeholder-color);opacity:1}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C::placeholder{color:var(--placeholder-color);opacity:1}.text-input_hds-text-input__helper-text__3V2KM{color:var(--helper-color-default);display:block;font-size:var(--fontsize-body-m);line-height:var(--lineheight-l);margin-top:var(--spacing-3-xs);white-space:pre-line}.text-input_hds-text-input__error-text__1GLYk{background-color:var(--helper-background-color-invalid);border-left:8px solid var(--color-error);color:var(--helper-color-invalid);display:flex;font-size:var(--fontsize-body-m);line-height:var(--lineheight-l);margin-top:var(--spacing-2-xs);padding:var(--spacing-2-xs);white-space:pre-line}.text-input_hds-text-input__error-text__1GLYk:not(:last-child){margin-bottom:var(--spacing-2-xs)}.text-input_hds-text-input__error-text__1GLYk:before{animation:text-input_fadeIn__2IDZ8 85ms ease-out;background:var(--color-error);content:\"\";display:inline-block;height:var(--icon-size);margin-right:var(--spacing-2-xs);-webkit-mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.175 3.456c.349-.586 1.223-.607 1.61-.063l.04.063 9.052 15.21c.343.577-.072 1.285-.753 1.332l-.072.002H2.948c-.7 0-1.15-.689-.858-1.273l.033-.06 9.052-15.21zM13 16v2h-2v-2h2zm0-7.5v6h-2v-6h2z' fill='currentColor'/%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.175 3.456c.349-.586 1.223-.607 1.61-.063l.04.063 9.052 15.21c.343.577-.072 1.285-.753 1.332l-.072.002H2.948c-.7 0-1.15-.689-.858-1.273l.033-.06 9.052-15.21zM13 16v2h-2v-2h2zm0-7.5v6h-2v-6h2z' fill='currentColor'/%3E%3C/svg%3E\");pointer-events:none;width:var(--icon-size)}.text-input_hds-text-input__success-text__3EOiy{background-color:var(--helper-background-color-success);border-left:8px solid var(--color-success);color:var(--helper-color-success);display:flex;font-size:var(--fontsize-body-m);line-height:var(--lineheight-l);margin-top:var(--spacing-2-xs);padding:var(--spacing-2-xs);position:relative;white-space:pre-wrap}.text-input_hds-text-input__success-text__3EOiy:not(:last-child){margin-bottom:var(--spacing-2-xs)}.text-input_hds-text-input__success-text__3EOiy:before{animation:text-input_fadeIn__2IDZ8 85ms ease-out;background:var(--color-success);content:\"\";display:inline-block;height:var(--icon-size);margin-right:var(--spacing-2-xs);-webkit-mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath fill='currentColor' d='M12 3a9 9 0 100 18 9 9 0 000-18zm4.5 5L18 9.5 10.5 17 6 12.5 7.5 11l3 3 6-6z'/%3E%3C/g%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath fill='currentColor' d='M12 3a9 9 0 100 18 9 9 0 000-18zm4.5 5L18 9.5 10.5 17 6 12.5 7.5 11l3 3 6-6z'/%3E%3C/g%3E%3C/svg%3E\");pointer-events:none;width:var(--icon-size)}.text-input_hds-text-input__info-text__3bqzy{background-color:var(--helper-background-color-info);border-left:8px solid var(--color-info);color:var(--helper-color-info);display:flex;font-size:var(--fontsize-body-m);line-height:var(--lineheight-l);margin-top:var(--spacing-2-xs);padding:var(--spacing-2-xs);position:relative}.text-input_hds-text-input__info-text__3bqzy:not(:last-child){margin-bottom:var(--spacing-2-xs)}.text-input_hds-text-input__info-text__3bqzy:before{animation:text-input_fadeIn__2IDZ8 85ms ease-out;background:var(--color-info);content:\"\";display:inline-block;height:var(--icon-size);margin-right:var(--spacing-2-xs);-webkit-mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath fill='currentColor' d='M12 3a9 9 0 110 18 9 9 0 010-18zm1 13v2h-2v-2h2zm0-10v8h-2V6h2z'/%3E%3C/g%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath fill='currentColor' d='M12 3a9 9 0 110 18 9 9 0 010-18zm1 13v2h-2v-2h2zm0-10v8h-2V6h2z'/%3E%3C/g%3E%3C/svg%3E\");pointer-events:none;width:var(--icon-size)}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C[disabled]{background-color:var(--input-background-disabled);border-color:var(--input-border-color-disabled);color:var(--input-color-disabled);cursor:not-allowed}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C[readonly]{background-color:transparent;border:0;color:var(--input-color-default);padding:0;-webkit-text-fill-color:var(--input-color-default)}.text-input_hds-text-input__buttons__1RMzT{align-items:center;bottom:0;display:flex;font-size:1rem;justify-content:center;margin-right:calc(var(--spacing-s) - var(--spacing-xs) / 2);position:absolute;right:0;top:0}.text-input_hds-text-input__button__1Fh0I{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:none;border:none;cursor:pointer;display:flex;font:inherit;outline:none;padding:var(--spacing-xs) calc(var(--spacing-xs) / 2)}.text-input_hds-text-input__button__1Fh0I:focus{outline:var(--outline-width) solid var(--color-focus-outline)}.TextInput-module_root__2CMNr{position:relative}.TextInput-module_input__1BlHi.TextInput-module_hasButton__2KCM1,.TextInput-module_input__1BlHi.TextInput-module_hasClearButton__3-tBe{padding-right:calc(2 * var(--spacing-s) + 1.5rem)}.TextInput-module_input__1BlHi.TextInput-module_hasButton__2KCM1.TextInput-module_hasClearButton__3-tBe{padding-right:calc(4 * var(--spacing-s) + 1.5rem)}.TextInput-module_button__1ySMX:disabled{cursor:not-allowed}.TextInput-module_button__1ySMX:focus{outline:var(--outline-width) solid var(--color-focus-outline)}");const u=l.forwardRef(((e,t)=>{var{children:n,className:r="",errorText:u,helperText:c,hideLabel:p=!1,id:d,invalid:m=!1,isAriaLabelledBy:h=!1,label:_,labelId:b,onBlur:x,required:v=!1,style:f,successText:g,infoText:E,tooltipLabel:y,tooltipText:w,tooltipButtonLabel:T}=e,k=(0,a._)(e,["children","className","errorText","helperText","hideLabel","id","invalid","isAriaLabelledBy","label","labelId","onBlur","required","style","successText","infoText","tooltipLabel","tooltipText","tooltipButtonLabel"]);const I={className:(0,i.c)(s.root,m&&s.invalid,g&&s.success,r),onBlur:x,style:f};return l.createElement("div",Object.assign({},I,k,{ref:t}),_&&l.createElement(o.F,{id:b,inputId:d,isAriaLabelledBy:h,hidden:p,label:_,required:v,tooltipLabel:y,tooltipButtonLabel:T,tooltipText:w}),l.createElement("div",{className:(0,i.c)(s.inputWrapper)},n),u&&l.createElement("div",{className:s.errorText,id:`${d}-error`},u),g&&l.createElement("div",{className:s.successText,id:`${d}-success`},g),E&&l.createElement("div",{className:s.infoText,id:`${d}-info`},E),c&&l.createElement("div",{className:s.helperText,id:`${d}-helper`},c))}))},71279:function(e,t,n){"use strict";n.d(t,{N:function(){return b}});var a=n(19783),l=n.n(a),r=n(80136),i=n(67294),o=n(39440),s=(n(7568),n(7444)),u=n(88966),c=n(34300),p=n(37776),d=n(38800),m=n(30695),h=n(63483),_="NumberInput-module_button__2Shu7";(0,s.s)(".NumberInput-module_numberInputContainer__hKNPp{width:100%}.NumberInput-module_numberInputContainer__hKNPp input::-webkit-inner-spin-button,.NumberInput-module_numberInputContainer__hKNPp input::-webkit-outer-spin-button{appearance:none!important;height:auto;margin:0!important}.NumberInput-module_numberInputContainer__hKNPp input[type=number]{appearance:textfield!important}.NumberInput-module_numberInputWithSteps__3q7N7{padding-left:68px!important;padding-right:68px!important;text-align:center}.NumberInput-module_minusButtonWrapper__3PHN9{border-right:1px solid #ccc}.NumberInput-module_minusButtonWrapper__3PHN9,.NumberInput-module_minusButtonWrapperWithoutBorder__2g42V{align-items:center;bottom:0;display:flex;font-size:1rem;justify-content:center;margin:2px;position:absolute;top:0;width:52px;z-index:1;left:0}.NumberInput-module_plusButtonWrapper__Wwq5t{border-left:1px solid #ccc}.NumberInput-module_plusButtonWrapper__Wwq5t,.NumberInput-module_plusButtonWrapperWithoutBorder__2xb6t{align-items:center;bottom:0;display:flex;font-size:1rem;justify-content:center;margin:2px;position:absolute;top:0;width:52px;z-index:1;right:0}.NumberInput-module_button__2Shu7{align-items:center;appearance:none;background:transparent;border:0;cursor:pointer;display:flex;font-size:1rem;height:100%;justify-content:center;overflow:hidden;padding:0;width:100%}.NumberInput-module_button__2Shu7:disabled{cursor:not-allowed}.NumberInput-module_button__2Shu7:focus{outline:3px solid var(--color-focus-outline);outline-offset:-5px}");const b=i.forwardRef(((e,t)=>{var{className:n="",disabled:a=!1,defaultValue:s,errorText:b,helperText:x,hideLabel:v,invalid:f,id:g,label:E,max:y,min:w,minusStepButtonAriaLabel:T,onChange:k=(()=>null),plusStepButtonAriaLabel:I,required:N,step:L,style:C,successText:z,infoText:B,tooltipLabel:S,tooltipText:O,tooltipButtonLabel:H,type:q="number",unit:A}=e,D=(0,r._)(e,["className","disabled","defaultValue","errorText","helperText","hideLabel","invalid","id","label","max","min","minusStepButtonAriaLabel","onChange","plusStepButtonAriaLabel","required","step","style","successText","infoText","tooltipLabel","tooltipText","tooltipButtonLabel","type","unit"]);const M={className:n,errorText:b,helperText:x,hideLabel:v,id:g,invalid:f,label:(Z=E,G=A,!Z&&G?`(${G})`:Z&&G?`${Z} (${G})`:Z),required:N,style:C,successText:z,infoText:B,tooltipLabel:S,tooltipText:O,tooltipButtonLabel:H,labelId:L?`${g}-label`:void 0},W=(0,i.useRef)(null),[P,V]=(0,i.useState)(null),j=()=>{V(String(W.current.value))};var Z,G;!function(e){let t=!1;const n=l()((()=>{t=!1}),arguments.length>1&&void 0!==arguments[1]?arguments[1]:200);(0,i.useEffect)((()=>{const a=e=>{t&&e.preventDefault(),t=!0,n()};return e.current&&e.current.addEventListener("wheel",a,{passive:!1}),()=>{e.current&&e.current.removeEventListener("wheel",a)}}),[e])}(W),(0,i.useEffect)((()=>{t&&(0,d.m)(t,W)}),[W,t]);const J=()=>{Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(W.current,W.current.value);const e=new Event("input",{bubbles:!0});W.current.dispatchEvent(e)},Y=L?e=>{null!==P&&V(null),k(e)}:k,K=(0,p.c)(g,x,b,z,B);return i.createElement(u.I,Object.assign({},M),i.createElement("div",Object.assign({className:"NumberInput-module_numberInputContainer__hKNPp"},L&&{role:"group","aria-labelledby":M.labelId}),i.createElement("input",Object.assign({className:(0,c.c)(u.t.input,L?"NumberInput-module_numberInputWithSteps__3q7N7":""),defaultValue:s,disabled:a,id:g,max:y,min:w,step:L,onChange:Y,ref:W,required:N,type:q,"aria-describedby":K.length>0?K:null},D)),L&&i.createElement(i.Fragment,null,i.createElement("div",{className:a?"NumberInput-module_minusButtonWrapperWithoutBorder__2g42V":"NumberInput-module_minusButtonWrapper__3PHN9"},i.createElement("button",{className:_,disabled:a,type:"button",onClick:e=>{e.preventDefault(),W.current.stepDown(),J(),j()},"aria-label":T||"Decrease by one"},i.createElement(m.I,{"aria-hidden":"true"}))),i.createElement("div",{className:a?"NumberInput-module_plusButtonWrapperWithoutBorder__2xb6t":"NumberInput-module_plusButtonWrapper__Wwq5t"},i.createElement("button",{className:_,disabled:a,type:"button",onClick:e=>{e.preventDefault(),W.current.stepUp(),J(),j()},"aria-label":I||"Increase by one"},i.createElement(h.I,{"aria-hidden":"true"}))),null!==P&&i.createElement(o.T,null,i.createElement("span",{"aria-live":"assertive"},P)))))}))},99123:function(e,t,n){"use strict";n.d(t,{S:function(){return u}});var a=n(80136),l=n(67294),r=(n(7568),n(7444)),i=n(34300),o={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,r.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const s=e=>{let{icon:t}=e;return l.createElement("span",{className:o.statusLabelIcon,"aria-hidden":"true"},t)},u=e=>{var{children:t,className:n,dataTestId:r,type:u="neutral",iconLeft:c}=e,p=(0,a._)(e,["children","className","dataTestId","type","iconLeft"]);return l.createElement("span",Object.assign({className:(0,i.c)(o.statusLabel,o[u],c&&o.statusLabelWithIcon,n),"data-testid":r},p),c&&l.createElement(s,{icon:c}),t)}},37776:function(e,t,n){"use strict";n.d(t,{c:function(){return a}});var a=(e,t,n,a,l)=>[t&&`${e}-helper`,n&&`${e}-error`,a&&`${e}-success`,l&&`${e}-info`].filter((e=>e)).join(" ")},38800:function(e,t,n){"use strict";n.d(t,{m:function(){return r}});var a=n(28338),l=n.n(a),r=(e,t)=>{l()(e)?e(t.current):e.current=t.current}},48564:function(e,t,n){"use strict";n.r(t);var a=n(11151),l=n(67294),r=n(71279),i=n(11757);const o=e=>{let{children:t,pageContext:n}=e;return l.createElement(i.default,{pageContext:n},t)};function s(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",h4:"h4",pre:"pre",code:"code",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",strong:"strong",p:"p"},(0,a.ah)(),e.components),{Playground:n,IconCheckCircleFill:i,Link:o,ExternalLink:s,InternalLink:c}=t;return s||u("ExternalLink",!0),i||u("IconCheckCircleFill",!0),c||u("InternalLink",!0),o||u("Link",!0),n||u("Playground",!0),l.createElement(l.Fragment,null,l.createElement(t.h2,{id:"code",style:{position:"relative"}},"Code",l.createElement(t.a,{href:"#code","aria-label":"code permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.h3,{id:"code-examples",style:{position:"relative"}},"Code examples",l.createElement(t.a,{href:"#code-examples","aria-label":"code examples permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.h4,{id:"default",style:{position:"relative"}},"Default",l.createElement(t.a,{href:"#default","aria-label":"default permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(n,{scope:{NumberInput:r.N}},l.createElement(t.pre,null,l.createElement(t.code,{className:"language-jsx"},'import { NumberInput } from \'hds-react\';\n\n() => (<>\n  <NumberInput\n    id="default"\n    helperText="Assistive text"\n    label="Total compensation"\n    unit="€"\n    defaultValue={1000}\n    style={{ maxWidth: \'320px\' }}\n  />\n\n  <NumberInput\n    disabled\n    id="disabled"\n    helperText="Assistive text"\n    label="Total compensation"\n    unit="€"\n    defaultValue={1000}\n    style={{ maxWidth: \'320px\', marginTop: \'var(--spacing-s)\' }}\n  />\n</>)\n')),l.createElement(t.pre,null,l.createElement(t.code,{className:"language-html"},'<div style="max-width:320px;">\n  <div class="hds-text-input">\n    <label for="core-default" class="hds-text-input__label"> Total compensation (€) </label>\n    <div class="hds-text-input__input-wrapper">\n      <input id="core-default" value="1000" class="hds-text-input__input" type="number" placeholder="Placeholder" />\n    </div>\n    <span class="hds-text-input__helper-text">Assistive text</span>\n  </div>\n\n  <div class="hds-text-input" style="margin-top:var(--spacing-s);">\n    <label for="core-disabled" class="hds-text-input__label"> Total compensation (€) </label>\n    <div class="hds-text-input__input-wrapper">\n      <input\n        id="core-disabled"\n        value="1000"\n        class="hds-text-input__input"\n        type="number"\n        placeholder="Placeholder"\n        disabled\n      />\n    </div>\n    <span class="hds-text-input__helper-text">Assistive text</span>\n  </div>\n</div>\n'))),"\n",l.createElement(t.h4,{id:"with-steppers",style:{position:"relative"}},"With steppers",l.createElement(t.a,{href:"#with-steppers","aria-label":"with steppers permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(n,{scope:{NumberInput:r.N}},l.createElement(t.pre,null,l.createElement(t.code,{className:"language-jsx"},'import { NumberInput } from \'hds-react\';\n\n() => (<NumberInput\n  id="stepper"\n  helperText="Assistive text"\n  label="Number of attendees"\n  minusStepButtonAriaLabel="Decrease by one"\n  plusStepButtonAriaLabel="Increase by one"\n  step={1}\n  defaultValue={5}\n  style={{ maxWidth: \'320px\' }}\n/>)\n')),l.createElement(t.pre,null,l.createElement(t.code,{className:"language-html"},'<div class="hds-text-input" style="max-width:320px;">\n  <label for="core-stepper" class="hds-text-input__label"> Number of attendees </label>\n  <div class="hds-text-input__input-wrapper">\n    <input id="core-stepper" value="5" class="hds-text-input__input" type="number" step="1" placeholder="Placeholder" />\n  </div>\n  <span class="hds-text-input__helper-text">Assistive text</span>\n</div>\n'))),"\n",l.createElement(t.h4,{id:"with-min-and-max-values",style:{position:"relative"}},"With min and max values",l.createElement(t.a,{href:"#with-min-and-max-values","aria-label":"with min and max values permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(n,{scope:{NumberInput:r.N}},l.createElement(t.pre,null,l.createElement(t.code,{className:"language-jsx"},'import { NumberInput } from \'hds-react\';\n\n() => (<NumberInput\n  id="stepper-minmax"\n  helperText="At least 3 attendees are required"\n  label="Number of attendees"\n  min={3}\n  max={99}\n  minusStepButtonAriaLabel="Decrease by one"\n  plusStepButtonAriaLabel="Increase by one"\n  step={1}\n  defaultValue={3}\n  style={{ maxWidth: \'320px\' }}\n/>)\n')),l.createElement(t.pre,null,l.createElement(t.code,{className:"language-html"},'<div class="hds-text-input" style="max-width:320px;">\n  <label for="core-stepper-minmax" class="hds-text-input__label"> Number of attendees </label>\n  <div class="hds-text-input__input-wrapper">\n    <input\n      id="core-stepper-minmax"\n      value="3"\n      class="hds-text-input__input"\n      type="number"\n      step="1"\n      min="3"\n      max="99"\n      placeholder="Placeholder"\n      required\n    />\n  </div>\n  <span class="hds-text-input__helper-text">At least 3 attendees are required</span>\n</div>\n'))),"\n",l.createElement(t.h3,{id:"packages",style:{position:"relative"}},"Packages",l.createElement(t.a,{href:"#packages","aria-label":"packages permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.table,null,l.createElement(t.thead,null,l.createElement(t.tr,null,l.createElement(t.th,null,"Package"),l.createElement(t.th,null,"Included"),l.createElement(t.th,null,"Storybook link"),l.createElement(t.th,null,"Source link"))),l.createElement(t.tbody,null,l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.strong,null,"HDS React")),l.createElement(t.td,null,l.createElement("div",{style:{display:"flex",gap:"var(--spacing-3-xs)"}},l.createElement(i)," Yes ")),l.createElement(t.td,null,l.createElement(o,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-numberinput--default"},"View in Storybook")),l.createElement(t.td,null,l.createElement(s,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"https://github.com/City-of-Helsinki/helsinki-design-system/tree/master/packages/react/src/components/numberInput"},"View source"))),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.strong,null,"HDS Core")),l.createElement(t.td,null,l.createElement("div",{style:{display:"flex",gap:"var(--spacing-3-xs)"}},l.createElement(i)," Yes ")),l.createElement(t.td,null,l.createElement(o,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-numberinput--default"},"View in Storybook")),l.createElement(t.td,null,l.createElement(s,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"https://github.com/City-of-Helsinki/helsinki-design-system/tree/master/packages/core/src/components/number-input"},"View source"))))),"\n",l.createElement(t.h3,{id:"properties",style:{position:"relative"}},"Properties",l.createElement(t.a,{href:"#properties","aria-label":"properties permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.p,null,"Note! You can find the full list of properties in the ",l.createElement(o,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-numberinput--default"},"React Storybook.")),"\n",l.createElement(t.p,null,"Also, note that this component is an input. All features supported by the HDS TextInput are also supported by this component. See ",l.createElement(c,{href:"/components/text-input"},"TextInput documentation page")," for more information."),"\n",l.createElement(t.table,null,l.createElement(t.thead,null,l.createElement(t.tr,null,l.createElement(t.th,null,"Property"),l.createElement(t.th,null,"Description"),l.createElement(t.th,null,"Values"),l.createElement(t.th,null,"Default value"))),l.createElement(t.tbody,null,l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"id")),l.createElement(t.td,null,"The id for the input."),l.createElement(t.td,null,l.createElement(t.code,null,"string")),l.createElement(t.td,null,"-")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"label")),l.createElement(t.td,null,"The label for the input."),l.createElement(t.td,null,l.createElement(t.code,null,"string")),l.createElement(t.td,null,"-")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"value")),l.createElement(t.td,null,"The value of the input element, required for a controlled component."),l.createElement(t.td,null,l.createElement(t.code,null,"number")),l.createElement(t.td,null,"-")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"defaultValue")),l.createElement(t.td,null,"The default input element value. Use when the component is not controlled."),l.createElement(t.td,null,l.createElement(t.code,null,"number")),l.createElement(t.td,null,"-")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"minusStepButtonAriaLabel")),l.createElement(t.td,null,"The aria label for minus step button."),l.createElement(t.td,null,l.createElement(t.code,null,"string")),l.createElement(t.td,null,"-")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"plusStepButtonAriaLabel")),l.createElement(t.td,null,"The aria label for plus step button."),l.createElement(t.td,null,l.createElement(t.code,null,"string")),l.createElement(t.td,null,"-")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"unit")),l.createElement(t.td,null,"Unit characters of the input. Example: €"),l.createElement(t.td,null,l.createElement(t.code,null,"string")),l.createElement(t.td,null,"-")),l.createElement(t.tr,null,l.createElement(t.td,null,"[Table 1:NumberInput properties]"),l.createElement(t.td),l.createElement(t.td),l.createElement(t.td)))))}function u(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){return void 0===e&&(e={}),l.createElement(o,e,l.createElement(s,e))}},11757:function(e,t,n){"use strict";n.r(t);var a=n(11151),l=n(67294),r=n(57674),i=n(89482),o=(n(18607),n(26127)),s=n(55725);function u(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,a.ah)(),e.components);return o.Z||c("PageTabs",!1),o.Z.Tab||c("PageTabs.Tab",!0),o.Z.TabList||c("PageTabs.TabList",!0),o.Z.TabPanel||c("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(t.h1,{id:"numberinput",style:{position:"relative"}},"NumberInput",l.createElement(t.a,{href:"#numberinput","aria-label":"numberinput permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{class:"status-label-description"},l.createElement(s.Z,{type:"info"},"Stable"),l.createElement(s.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(r.Z)),"\n",l.createElement(i.Z,null,"  A number input allows the user to enter numeric values. It also features optional steppers for increasing or decreasing the value by a set amount."),"\n",l.createElement(o.Z,{pageContext:e.pageContext},l.createElement(o.Z.TabList,null,l.createElement(o.Z.Tab,{href:"/"},"Usage"),l.createElement(o.Z.Tab,{href:"/code"},"Code"),l.createElement(o.Z.Tab,{href:"/accessibility"},"Accessibility")),l.createElement(o.Z.TabPanel,null,e.children)))}function c(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?l.createElement(t,e,l.createElement(u,e)):u(e)}},89482:function(e,t,n){"use strict";var a=n(67294),l=n(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:n="var(--fontsize-body-xl)",style:r={},children:i}=e;return a.createElement("p",{style:{fontSize:n,color:t,maxWidth:600,...r}},(0,l.g)(i))}},26127:function(e,t,n){"use strict";var a=n(67294),l=n(14160),r=n(48102),i=n(42972);const o="PageTabList",s="PageTabPanel",u="PageTab",c=e=>{var t;let{pageContext:n,children:c}=e;const p=n.frontmatter.slug,d=Array.isArray(c)?c:[c],m=d.find((e=>(0,a.isValidElement)(e)&&e.type.componentName===o)),h=d.find((e=>(0,a.isValidElement)(e)&&e.type.componentName===s)),_=null===(t=m.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===u)),b=_.findIndex((e=>p.endsWith(e.props.href))),x=-1===b?0:b,v=0===x?p:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(p);return a.createElement(r.a,{initiallyActiveTab:x},a.createElement(r.a.TabList,{className:"page-tabs-list"},_.map((e=>a.createElement(r.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(`${"/"===e.props.href?v:v+e.props.href}`)},(0,i.g)(e.props.children))))),_.map(((e,t)=>a.createElement(r.a.TabPanel,{key:e.props.href},x===t?h.props.children:a.createElement("div",null)))))},p=e=>{let{children:t}=e;return a.createElement(r.a.TabList,null,t)};p.componentName=o;const d=e=>{let{href:t,slug:n,children:l}=e;return a.createElement(r.a.Tab,null," ",l)};d.componentName=u;const m=e=>{let{children:t}=e;return a.createElement(r.a.TabPanel,null,t)};m.componentName=s,c.TabList=p,c.Tab=d,c.TabPanel=m,t.Z=c},55725:function(e,t,n){"use strict";var a=n(67294),l=n(99123),r=n(42972);t.Z=e=>{let{children:t,...n}=e;return a.createElement(l.S,n,(0,r.g)(t))}},57674:function(e,t,n){"use strict";var a=n(67294),l=n(37106);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return a.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},a.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>a.createElement("li",{key:t},a.createElement("span",{className:"status-name"},t),a.createElement("span",null,e[t]))))))}}}]);