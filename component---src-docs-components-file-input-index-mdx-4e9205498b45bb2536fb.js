"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[5189,2965],{93999:function(e,t,a){a.d(t,{F:function(){return N},f:function(){return g}});var l=a(42982),n=a(67294),i=a(5871),r=a.n(i),o=a(37776),s=a(34300),c=a(57703),d=a(7444),u=a(52708),p=a(63483),m=a(35828),h=a(83926);(0,d.s)(".FileInput-module_fileInput__hClRc{border:0;clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.FileInput-module_dragAndDropHelperText__31Ljw{color:var(--label-color-default,var(--color-black-90));display:block;font-size:var(--fontsize-body-m);font-weight:500;margin-bottom:var(--spacing-3-xs)}.FileInput-module_dragAndDrop__3d3xe{align-items:center;border:2px dotted var(--color-coat-of-arms);box-sizing:border-box;color:var(--color-coat-of-arms);cursor:pointer;display:flex;justify-content:center;margin-top:var(--spacing-xs);max-width:500px;padding:var(--spacing-s);width:100%}.FileInput-module_dragAndDropActive__3hREg{background-color:var(--color-silver-light);border-color:var(--color-coat-of-arms-dark);color:var(--color-coat-of-arms-dark)}.FileInput-module_dragAndDropDisabled__Ek-uE{border-color:var(--color-black-50);color:var(--color-black-50);cursor:not-allowed}.FileInput-module_dragAndDropLabel__1pDQN{align-items:center;display:flex}.FileInput-module_dragAndDropLabelText__3AJ4P{margin-left:var(--spacing-s)}.FileInput-module_dragAndDropHelperText__31Ljw{margin:var(--spacing-s) 0 var(--spacing-2-xs)}.FileInput-module_fileInputContainer__9N5TG{flex:1}.FileInput-module_fileInputWrapper__1E8Jf{display:inline-block;margin:var(--spacing-2-xs) 0;position:relative}.FileInput-module_fileInputWrapper__1E8Jf:focus-within>button:after{--size:calc(100% + calc(var(--outline-width) * 2 + var(--border-width) * 2 + var(--outline-gutter) * 2));border-color:var(--color-focus-outline)}.FileInput-module_fileList__drFD1{list-style:none;margin:var(--spacing-s) 0 0;padding:0}.FileInput-module_fileListItem__2fomf{align-items:flex-start;background-color:var(--color-info-light);border-bottom:2px dotted var(--color-coat-of-arms);box-sizing:border-box;display:flex;max-width:100%;padding:var(--spacing-s) var(--spacing-2-xs);width:500px}.FileInput-module_fileListItem__2fomf+.FileInput-module_fileListItem__2fomf{margin-top:var(--spacing-s)}.FileInput-module_fileListItemTitle__15-8y{align-items:flex-start;display:flex;flex:1;flex-wrap:nowrap;font-size:var(--fontsize-body-s);margin:2px var(--spacing-xs) 0 var(--spacing-2-xs)}.FileInput-module_fileListItemName__1BqM7{hyphens:auto;word-break:break-word}.FileInput-module_fileListItemSize__1ZMYb{margin-left:var(--spacing-2-xs);text-align:right;white-space:nowrap}.FileInput-module_fileListItemButton__3HfCX{--file-list-item-button-y-offset:calc(-1 * var(--spacing-2-xs) - 2px);display:flex;margin:var(--file-list-item-button-y-offset) auto var(--file-list-item-button-y-offset) 0}.FileInput-module_fileListItemButtonLabel__2FIPm{margin-left:var(--spacing-3-xs)}");const f=e=>({file:e,uiId:r()(e.name)}),_=e=>e.file,g=e=>{if(0===e)return"0 B";const t=Math.floor(Math.log(e)/Math.log(1024)),a=e/Math.pow(1024,t);return`${t<2||a%1==0?Math.round(a):a.toFixed(1)} ${["B","KB","MB","GB","TB"][t]}`},b=e=>({en:"No file has been selected.",fi:"Yhtään tiedostoa ei ole valittu.",sv:"Ingen fil har valts."}[e]),v=(e,t)=>({en:`Remove ${t} from the added files.`,fi:`Poista tiedosto ${t} lisätyistä tiedostoista.`,sv:`Ta bort ${t} från filerna som lagts till.`}[e]),x=(e,t)=>({en:(0===t?"1 file":`${t} files`)+" added.",fi:(0===t?"1 tiedosto":`${t} tiedostoa`)+" added.",sv:(0===t?"1 fil":`${t} filer`)+" har lagts till."}[e]),E=(e,t,a)=>{const l=t===a?t:`${t}/${a}`;return{en:`${l} file(s) added.`,fi:`${l} tiedosto(a) lisätty.`,sv:`${l} fil(er) har lagts till.`}[e]},y=(e,t)=>{const a=g(t);return{en:`The maximum file size is ${a}.`,fi:`Suurin sallittu tiedostokoko on ${a}.`,sv:`Den maximala filstorleken är ${a}.`}[e]},w=(e,t)=>{const a=e.split(",");if(1===a.length)return a.toString();const l=a.pop();return`${a.join(", ")} ${t} ${l}`},I=(e,t)=>({en:`Only ${w(t,"and")} files.`,fi:`Vain ${w(t,"ja")} tiedostoja.`,sv:`Endast ${w(t,"och")} filer.`}[e]),k=(e,t,a)=>{const l=I(e,a);return{en:`The file type, ${t.name}, is not supported. ${l}`,fi:`Tiedoston, ${t.name}, tyyppi ei vastaa hyväksyttyjä tiedostotyppejä. ${l}`,sv:`Filformatet, ${t.name}, stöds inte. ${l}`}[e]},T=(e,t,a)=>{const l=g(t.size);return{en:`File, ${t.name}, is too large (${l}). ${y(e,a)}`,fi:`Tiedosto, ${t.name} on liian suuri (${l}). ${y(e,a)}`,sv:`Filen, ${t.name}, är för stor (${l}). ${y(e,a)}`}[e]};var L,C;(C=L||(L={})).accept="accept",C.maxSize="maxSize";const z=(e,t)=>a=>{const l=(e=>{if(!e||"string"!=typeof e||""===e)return console.warn(`FileInput: Path must be a non-empty string. Path is now ${JSON.stringify(e)}`),"";const t=e.lastIndexOf(".");if(-1===t)return console.warn("FileInput: File is missing extension"),"";const a=e.substring(t);return a.length<=1?(console.warn("FileInput: File is missing extension"),""):a})(a.name),n=a.type,i=t.split(",").map((e=>e.trim())),r=!!i.find((e=>e.includes(n)||e.includes(`${n.split("/")[0]}/*`))),o=!!i.find((e=>e===l));return r||o||{type:L.accept,text:k(e,a,t)}},F=(e,t)=>a=>a.size<=t||{type:L.maxSize,text:T(e,a,t)},N=e=>{let{id:t,label:a,buttonLabel:i,language:r="fi",defaultValue:d,disabled:w,dragAndDrop:k,dragAndDropLabel:T,dragAndDropInputLabel:L,maxSize:C,className:N="",successText:D,errorText:M,helperText:H,infoText:$,onChange:S,required:V,style:j,accept:A,multiple:Z,tooltipLabel:O,tooltipButtonLabel:B,tooltipText:P}=e;const q=(0,n.useRef)(null),R=(0,n.useRef)(!1),[G,J]=(0,n.useState)([]),[Y,W]=(0,n.useState)(),[K,X]=(0,n.useState)(),[U,Q]=(0,n.useState)(),ee=G&&G.length>0,te=`${t}-list`,ae=(0,n.useRef)(null),le=(0,n.useRef)(),ne=(0,n.useRef)(null),[ie,re]=(0,n.useState)(!1),oe=[A&&I(r,A),C&&y(r,C)].filter((e=>!!e)).join(" "),se=H||oe,ce=M||K,de=$||Y,ue={className:N,helperText:se,successText:D||U,errorText:ce,infoText:w?void 0:de,id:t,label:a,required:V,style:j,tooltipLabel:O,tooltipButtonLabel:B,tooltipText:P},pe=()=>{q.current&&q.current.click()},me=()=>{q.current&&q.current.focus()},he=()=>{Q(void 0),W(void 0),X(void 0),le.current=null},fe=[A?z(r,A):void 0,C?F(r,C):void 0].filter((e=>!!e)),_e=e=>0===fe.length?{validFiles:e,validationErrors:[]}:e.reduce(((e,t)=>{const a=fe.map((e=>e(t))).filter((e=>!0!==e));return a.length>0?Object.assign(Object.assign({},e),{validationErrors:[].concat((0,l.Z)(e.validationErrors),[a])}):Object.assign(Object.assign({},e),{validFiles:[].concat((0,l.Z)(e.validFiles),[t])})}),{validFiles:[],validationErrors:[]}),ge=(e,t)=>`${((e,t,a)=>{const l=`${t}/${a}`;return{en:`File processing failed for ${l} files:\n`,fi:`Tiedostonlisäys epäonnistui ${l} tiedoston kohdalla:\n`,sv:`Filprocesseringen av filerna ${l} misslyckades:\n`}[e]})(r,e.length,t)}${e.map((e=>`- ${e[0].text}`)).join("\n")}`,be=e=>{if(S){const t=e.map(_);S(t)}q.current&&(q.current.value="")},ve=e=>{he(),Z?(e=>{if(e.length>0){const{validFiles:t,validationErrors:a}=_e(e);if(a.length>0&&X(ge(a,e.length)),t.length>0){const a=t.map(f),n=[].concat((0,l.Z)(G),(0,l.Z)(a));J(n),Q(E(r,t.length,e.length)),be(n)}}})(e):(e=>{if(e.length>0){const{validFiles:t,validationErrors:a}=_e(e);if(a.length>0)X(ge(a,1));else{const e=[f(t[0])];J(e),Q(E(r,1,1)),be(e)}}})(e)},xe=e=>{e.preventDefault(),e.stopPropagation(),re(!0)},Ee=e=>{e.preventDefault(),e.stopPropagation(),re(!1)};(0,n.useEffect)((()=>{R.current||(W(b(r)),R.current=!0)}),[W,r]),(0,n.useEffect)((()=>{if(!ee&&d&&q.current){const e=new DataTransfer;d.forEach((t=>{const a=new File([t],t.name,{type:t.type,lastModified:t.lastModified});e.items.add(a)})),q.current.files=e.files;const t=new Event("change",{bubbles:!0});q.current.dispatchEvent(t)}}),[d]);const ye=[(0,o.c)(t,se,ce,D,de),ee&&te].filter((e=>!!e)).join(" ");return n.createElement(n.Fragment,null,n.createElement(c.I,Object.assign({},ue),n.createElement("div",{className:"FileInput-module_fileInputContainer__9N5TG"},k&&n.createElement(n.Fragment,null,n.createElement("div",Object.assign({"aria-hidden":!0,className:(0,s.c)("FileInput-module_dragAndDrop__3d3xe",ie&&"FileInput-module_dragAndDropActive__3hREg",w&&"FileInput-module_dragAndDropDisabled__Ek-uE"),ref:ne},w?{}:{onClick:()=>pe(),onDragEnter:xe,onDragOver:xe,onDragLeave:Ee,onDrop:e=>{const{dataTransfer:t}=e;Ee(e),ve(Array.from(t.files))}}),n.createElement("div",{className:"FileInput-module_dragAndDropLabel__1pDQN"},n.createElement(u.I,{"aria-hidden":!0}),n.createElement("span",{className:"FileInput-module_dragAndDropLabelText__3AJ4P"},T||(e=>({en:"Drag files here",fi:"Raahaa tiedostot tähän",sv:"Dra filerna hit"}[e]))(r)))),n.createElement("div",{className:"FileInput-module_dragAndDropHelperText__31Ljw"},L||(e=>({en:"or browse from your device",fi:"tai valitse tiedostot laitteeltasi",sv:"eller välj filerna från din enhet"}[e]))(r))),n.createElement("div",{className:"FileInput-module_fileInputWrapper__1E8Jf"},n.createElement(h.B,{"aria-hidden":!0,tabIndex:-1,variant:"secondary",iconLeft:n.createElement(p.I,{"aria-hidden":!0}),onClick:e=>{e.preventDefault(),e.stopPropagation(),me(),pe()},disabled:w},i||((e,t)=>({en:"Add "+(t?"files":"a file"),fi:"Lisää "+(t?"tiedostoja":"tiedosto"),sv:"Välj "+(t?"filer":"en fil")}[e]))(r,Z)),n.createElement("input",Object.assign({type:"file",ref:q,id:t,disabled:w,required:V,"aria-describedby":ye,className:"FileInput-module_fileInput__hClRc",onChange:e=>{ve(Array.from(e.target.files))}},A?{accept:A}:{},Z?{multiple:Z}:{}))))),n.createElement("ul",{id:te,ref:ae,tabIndex:-1,className:"FileInput-module_fileList__drFD1","aria-label":ee?x(r,G.length):b(r)},G.map(((e,t)=>n.createElement("li",{key:e.uiId,className:"FileInput-module_fileListItem__2fomf",tabIndex:-1,ref:e=>{e&&ae.current&&le.current===t&&e.focus()}},e.file.type.startsWith("image")?n.createElement(u.a,{"aria-hidden":!0}):n.createElement(u.b,{"aria-hidden":!0}),n.createElement("div",{className:"FileInput-module_fileListItemTitle__15-8y"},n.createElement("span",{className:"FileInput-module_fileListItemName__1BqM7"},e.file.name),n.createElement("span",{className:"FileInput-module_fileListItemSize__1ZMYb"},"(",g(e.file.size),")")),n.createElement(h.B,{onClick:a=>{a.preventDefault(),a.stopPropagation(),((e,t)=>{he();const a=G.filter((t=>t.uiId!==e.uiId));J(a),a.length>0?(le.current=t>0?t-1:0,W((e=>({en:"The file has been deleted.",fi:"Tiedosto poistettu.",sv:"Filen har tagits bort."}[e]))(r))):(me(),W(b(r))),be(a)})(e,t)},variant:"supplementary",size:"small",theme:"black",iconLeft:n.createElement(m.I,null),"aria-label":v(r,e.file.name),className:"FileInput-module_fileListItemButton__3HfCX",disabled:w},(e=>({en:"Remove",fi:"Poista",sv:"Ta bort"}[e]))(r)))))))}},63483:function(e,t,a){a.d(t,{I:function(){return i}});var l=a(67294),n=a(32719);const i=e=>{let{ariaLabel:t="plus",ariaLabelledby:a,ariaHidden:i=!0,className:r="",color:o,size:s="s",style:c={}}=e;return l.createElement("svg",{className:[n.s.icon,n.s[s],r].filter((e=>e)).join(" "),role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","aria-label":t,"aria-labelledby":a,"aria-hidden":i,color:o,style:c},l.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13 6V11H18V13H13V18H11V13H6V11H11V6H13Z",fill:"currentColor"}))}},52708:function(e,t,a){a.d(t,{I:function(){return o},a:function(){return r},b:function(){return i}});var l=a(67294),n=a(32719);const i=e=>{let{ariaLabel:t="document",ariaLabelledby:a,ariaHidden:i=!0,className:r="",color:o,size:s="s",style:c={}}=e;return l.createElement("svg",{className:[n.s.icon,n.s[s],r].filter((e=>e)).join(" "),role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","aria-label":t,"aria-labelledby":a,"aria-hidden":i,color:o,style:c},l.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M15 2L20 7V22H4V2H15ZM14 4V8H18L14 4ZM14.0083 4L18 8V20H6V4H14.0083ZM17 16H7V18H17V16ZM17 12H7V14H17V12ZM13 8H7V10H13V8Z",fill:"currentColor"}))},r=e=>{let{ariaLabel:t="photo",ariaLabelledby:a,ariaHidden:i=!0,className:r="",color:o,size:s="s",style:c={}}=e;return l.createElement("svg",{className:[n.s.icon,n.s[s],r].filter((e=>e)).join(" "),role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","aria-label":t,"aria-labelledby":a,"aria-hidden":i,color:o,style:c},l.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M20 2V22H4V2H20ZM16 15C15.1401 15 14.7159 15.2223 13.88 16.0363L13.7071 16.2071C12.4113 17.5029 11.5828 18 10 18C8.50049 18 7.67799 17.5539 6.49379 16.4051L6 15.92V20H18V15.922L17.958 15.8813C17.2256 15.1936 16.8025 15 16 15ZM18 4H6L6.00114 13.4397C6.50287 13.6831 6.92886 14.0298 7.51078 14.5986L7.70711 14.7929C8.6613 15.7471 9.08282 16 10 16C10.8599 16 11.2841 15.7777 12.12 14.9637L12.2929 14.7929C13.5887 13.4971 14.4172 13 16 13C16.8098 13 17.4222 13.1301 18.0007 13.4308L18 4ZM10 6C11.6569 6 13 7.34315 13 9C13 10.6569 11.6569 12 10 12C8.34315 12 7 10.6569 7 9C7 7.34315 8.34315 6 10 6ZM10 8C9.44772 8 9 8.44772 9 9C9 9.55228 9.44772 10 10 10C10.5523 10 11 9.55228 11 9C11 8.44772 10.5523 8 10 8Z",fill:"currentColor"}))},o=e=>{let{ariaLabel:t="upload",ariaLabelledby:a,ariaHidden:i=!0,className:r="",color:o,size:s="s",style:c={}}=e;return l.createElement("svg",{className:[n.s.icon,n.s[s],r].filter((e=>e)).join(" "),role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","aria-label":t,"aria-labelledby":a,"aria-hidden":i,color:o,style:c},l.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 1.63605L17.6569 7.2929L16.2426 8.70712L13 5.46505V18H11V5.46505L7.75736 8.70712L6.34315 7.2929L12 1.63605ZM5 15V20H19V15H21V22H3V15H5Z",fill:"currentColor"}))}},57703:function(e,t,a){a.d(t,{I:function(){return s},t:function(){return o}});var l=a(67294),n=a(7444),i=a(34300),r=a(84048),o={root:"TextInput-module_root__2CMNr text-input_hds-text-input__2LODq",inputWrapper:"TextInput-module_inputWrapper__3Rvel text-input_hds-text-input__input-wrapper__1OqYG",input:"TextInput-module_input__1BlHi text-input_hds-text-input__input__GJm5C",hasButton:"TextInput-module_hasButton__2KCM1",errorText:"TextInput-module_errorText__3pizm text-input_hds-text-input__error-text__1GLYk",helperText:"TextInput-module_helperText__2dLR6 text-input_hds-text-input__helper-text__3V2KM",invalidText:"TextInput-module_invalidText__1w4sm text-input_hds-text-input__helper-text__3V2KM",successText:"TextInput-module_successText__2NMCP text-input_hds-text-input__success-text__3EOiy",infoText:"TextInput-module_infoText__zHOGs text-input_hds-text-input__info-text__3bqzy",invalid:"TextInput-module_invalid__2iYo2 text-input_hds-text-input--invalid__1UfKC",success:"TextInput-module_success__1kDOm text-input_hds-text-input--success__3dm2J",readOnly:"TextInput-module_readOnly__j615N undefined",buttonWrapper:"TextInput-module_buttonWrapper___filA text-input_hds-text-input__buttons__1RMzT",button:"TextInput-module_button__1ySMX text-input_hds-text-input__button__1Fh0I"};(0,n.s)("@keyframes text-input_fadeIn__2IDZ8{0%{opacity:0}to{opacity:1}}.text-input_hds-text-input__2LODq{--border-width:2px;--outline-width:3px;--input-height:56px;--textarea-height:149px;--icon-size:var(--spacing-m);--helper-background-color-invalid:var(--color-error-light);--helper-background-color-success:var(--color-success-light);--helper-background-color-info:var(--color-info-light);--helper-color-default:var(--color-black-60);--helper-color-invalid:var(--color-black);--helper-color-success:var(--color-black);--helper-color-info:var(--color-black);--helper-color-info-icon:var(--color-coat-of-arms);--icon-color-invalid:var(--color-error);--icon-color-info:var(--color-info);--icon-color-success:var(--color-success);--input-background-default:var(--color-white);--input-background-disabled:var(--color-black-10);--input-border-color-default:var(--color-black-50);--input-border-color-hover:var(--color-black-90);--input-border-color-focus:var(--color-black-90);--input-border-color-invalid:var(--color-error);--input-border-color-disabled:var(--color-black-10);--input-border-color-success:var(--color-success);--input-color-default:var(--color-black-90);--input-color-disabled:var(--color-black-40);--label-color-default:var(--color-black-90);--label-color-invalid:var(--color-black-90);--placeholder-color:var(--color-black-60)}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C{-webkit-appearance:none;background-color:var(--input-background-default);border:var(--border-width) solid var(--input-border-color-default);border-radius:0;box-sizing:border-box;color:var(--input-color-default);font-family:inherit;font-size:1.125em;height:var(--input-height);line-height:normal;margin:0;padding:0 var(--spacing-s);width:100%;will-change:transform,box-shadow}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C:hover{border-color:var(--input-border-color-hover);transition:border-color 85ms ease-out}.text-input_hds-text-input__input-wrapper__1OqYG:focus-within .text-input_hds-text-input__input__GJm5C{border-color:var(--input-border-color-focus);outline:none}.text-input_hds-text-input__2LODq.text-input_hds-text-input--invalid__1UfKC .text-input_hds-text-input__input__GJm5C{border-color:var(--input-border-color-invalid)}.text-input_hds-text-input__2LODq.text-input_hds-text-input--success__3dm2J .text-input_hds-text-input__input__GJm5C{border-color:var(--input-border-color-success)}.text-input_hds-text-input__input-wrapper__1OqYG:focus-within .text-input_hds-text-input__input__GJm5C:not([readonly]){box-shadow:0 0 0 var(--outline-width) var(--color-focus-outline);transform:translateZ(0);transition:85ms ease-out;transition-property:box-shadow,transform}.text-input_hds-text-input__label__15F2V{color:var(--label-color-default);display:block;font-size:var(--fontsize-body-m);font-weight:500;margin-bottom:var(--spacing-3-xs)}.text-input_hds-text-input--invalid__1UfKC .text-input_hds-text-input__label__15F2V{color:var(--label-color-invalid);transition:color 85ms linear}.text-input_hds-text-input__required__z3Hm0{color:var(--color-black-90);display:inline-block;font-size:var(--fontsize-body-xl);line-height:1;margin-left:var(--spacing-2-xs);transform:translateY(var(--spacing-3-xs))}.text-input_hds-text-input__input-wrapper__1OqYG{display:flex;position:relative}.text-input_hds-text-input__2LODq textarea.text-input_hds-text-input__input__GJm5C{font-family:inherit;height:var(--textarea-height);margin:0;min-height:var(--input-height);overflow:auto;padding:var(--spacing-s);resize:vertical}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C::-moz-placeholder{color:var(--placeholder-color);opacity:1}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C::placeholder{color:var(--placeholder-color);opacity:1}.text-input_hds-text-input__helper-text__3V2KM{color:var(--helper-color-default);display:block;font-size:var(--fontsize-body-m);line-height:var(--lineheight-l);margin-top:var(--spacing-3-xs);white-space:pre-line}.text-input_hds-text-input__error-text__1GLYk{background-color:var(--helper-background-color-invalid);border-left:8px solid var(--color-error);color:var(--helper-color-invalid);display:flex;font-size:var(--fontsize-body-m);line-height:var(--lineheight-l);margin-top:var(--spacing-2-xs);padding:var(--spacing-2-xs);white-space:pre-line}.text-input_hds-text-input__error-text__1GLYk:not(:last-child){margin-bottom:var(--spacing-2-xs)}.text-input_hds-text-input__error-text__1GLYk:before{animation:text-input_fadeIn__2IDZ8 85ms ease-out;background:var(--color-error);content:\"\";display:inline-block;height:var(--icon-size);margin-right:var(--spacing-2-xs);-webkit-mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.175 3.456c.349-.586 1.223-.607 1.61-.063l.04.063 9.052 15.21c.343.577-.072 1.285-.753 1.332l-.072.002H2.948c-.7 0-1.15-.689-.858-1.273l.033-.06 9.052-15.21zM13 16v2h-2v-2h2zm0-7.5v6h-2v-6h2z' fill='currentColor'/%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.175 3.456c.349-.586 1.223-.607 1.61-.063l.04.063 9.052 15.21c.343.577-.072 1.285-.753 1.332l-.072.002H2.948c-.7 0-1.15-.689-.858-1.273l.033-.06 9.052-15.21zM13 16v2h-2v-2h2zm0-7.5v6h-2v-6h2z' fill='currentColor'/%3E%3C/svg%3E\");pointer-events:none;width:var(--icon-size)}.text-input_hds-text-input__success-text__3EOiy{background-color:var(--helper-background-color-success);border-left:8px solid var(--color-success);color:var(--helper-color-success);display:flex;font-size:var(--fontsize-body-m);line-height:var(--lineheight-l);margin-top:var(--spacing-2-xs);padding:var(--spacing-2-xs);position:relative;white-space:pre-wrap}.text-input_hds-text-input__success-text__3EOiy:not(:last-child){margin-bottom:var(--spacing-2-xs)}.text-input_hds-text-input__success-text__3EOiy:before{animation:text-input_fadeIn__2IDZ8 85ms ease-out;background:var(--color-success);content:\"\";display:inline-block;height:var(--icon-size);margin-right:var(--spacing-2-xs);-webkit-mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath fill='currentColor' d='M12 3a9 9 0 100 18 9 9 0 000-18zm4.5 5L18 9.5 10.5 17 6 12.5 7.5 11l3 3 6-6z'/%3E%3C/g%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath fill='currentColor' d='M12 3a9 9 0 100 18 9 9 0 000-18zm4.5 5L18 9.5 10.5 17 6 12.5 7.5 11l3 3 6-6z'/%3E%3C/g%3E%3C/svg%3E\");pointer-events:none;width:var(--icon-size)}.text-input_hds-text-input__info-text__3bqzy{background-color:var(--helper-background-color-info);border-left:8px solid var(--color-info);color:var(--helper-color-info);display:flex;font-size:var(--fontsize-body-m);line-height:var(--lineheight-l);margin-top:var(--spacing-2-xs);padding:var(--spacing-2-xs);position:relative}.text-input_hds-text-input__info-text__3bqzy:not(:last-child){margin-bottom:var(--spacing-2-xs)}.text-input_hds-text-input__info-text__3bqzy:before{animation:text-input_fadeIn__2IDZ8 85ms ease-out;background:var(--color-info);content:\"\";display:inline-block;height:var(--icon-size);margin-right:var(--spacing-2-xs);-webkit-mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath fill='currentColor' d='M12 3a9 9 0 110 18 9 9 0 010-18zm1 13v2h-2v-2h2zm0-10v8h-2V6h2z'/%3E%3C/g%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h24v24H0z'/%3E%3Cpath fill='currentColor' d='M12 3a9 9 0 110 18 9 9 0 010-18zm1 13v2h-2v-2h2zm0-10v8h-2V6h2z'/%3E%3C/g%3E%3C/svg%3E\");pointer-events:none;width:var(--icon-size)}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C[disabled]{background-color:var(--input-background-disabled);border-color:var(--input-border-color-disabled);color:var(--input-color-disabled);cursor:not-allowed}.text-input_hds-text-input__2LODq .text-input_hds-text-input__input__GJm5C[readonly]{background-color:transparent;border:0;color:var(--input-color-default);padding:0;-webkit-text-fill-color:var(--input-color-default)}.text-input_hds-text-input__buttons__1RMzT{align-items:center;bottom:0;display:flex;font-size:1rem;justify-content:center;margin-right:calc(var(--spacing-s) - var(--spacing-xs) / 2);position:absolute;right:0;top:0}.text-input_hds-text-input__button__1Fh0I{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:none;border:none;cursor:pointer;display:flex;font:inherit;outline:none;padding:var(--spacing-xs) calc(var(--spacing-xs) / 2)}.text-input_hds-text-input__button__1Fh0I:focus{outline:var(--outline-width) solid var(--color-focus-outline)}.TextInput-module_root__2CMNr{position:relative}.TextInput-module_input__1BlHi.TextInput-module_hasButton__2KCM1{padding-right:calc(2 * var(--spacing-s) + 1.5rem)}.TextInput-module_button__1ySMX:disabled{cursor:not-allowed}.TextInput-module_button__1ySMX:focus{outline:var(--outline-width) solid var(--color-focus-outline)}");const s=e=>{let{children:t,className:a="",errorText:n,helperText:s,hideLabel:c=!1,id:d,invalid:u=!1,isAriaLabelledBy:p=!1,label:m,labelId:h,onBlur:f,required:_=!1,style:g,successText:b,infoText:v,tooltipLabel:x,tooltipText:E,tooltipButtonLabel:y}=e;return l.createElement("div",{onBlur:f,className:(0,i.c)(o.root,u&&o.invalid,b&&o.success,a),style:g},m&&l.createElement(r.F,{id:h,inputId:d,isAriaLabelledBy:p,hidden:c,label:m,required:_,tooltipLabel:x,tooltipButtonLabel:y,tooltipText:E}),l.createElement("div",{className:(0,i.c)(o.inputWrapper)},t),n&&l.createElement("div",{className:o.errorText,id:`${d}-error`},n),b&&l.createElement("div",{className:o.successText,id:`${d}-success`},b),v&&l.createElement("div",{className:o.infoText,id:`${d}-info`},v),s&&l.createElement("div",{className:o.helperText,id:`${d}-helper`},s))}},83428:function(e,t,a){a.d(t,{S:function(){return c}});var l=a(80136),n=a(67294),i=a(7444),r=a(34300),o={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,i.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const s=e=>{let{icon:t}=e;return n.createElement("span",{className:o.statusLabelIcon,"aria-hidden":"true"},t)},c=e=>{var{children:t,className:a,dataTestId:i,type:c="neutral",iconLeft:d}=e,u=(0,l._)(e,["children","className","dataTestId","type","iconLeft"]);return n.createElement("span",Object.assign({className:(0,r.c)(o.statusLabel,o[c],d&&o.statusLabelWithIcon,a),"data-testid":i},u),d&&n.createElement(s,{icon:d}),t)}},37776:function(e,t,a){a.d(t,{c:function(){return l}});var l=(e,t,a,l,n)=>[t&&`${e}-helper`,a&&`${e}-error`,l&&`${e}-success`,n&&`${e}-info`].filter((e=>e)).join(" ")},71366:function(e,t,a){a.r(t),a.d(t,{FileInputDefault:function(){return c},FileInputDefaultValue:function(){return u},FileInputDragAndDrop:function(){return d},FileInputExample:function(){return s}});var l=a(11151),n=a(67294),i=a(93999),r=a(91388);const o=e=>{let{children:t,pageContext:a}=e;return n.createElement(r.default,{pageContext:a},t)},s=()=>{const[e,t]=n.useState([]);return console.log("selected file",e),n.createElement(i.F,{id:"file-input",label:"Choose a file",language:"en",maxSize:1572864,accept:".png,.jpg",onChange:t})},c=()=>{const[e,t]=n.useState([]);return console.log("selected file",e),n.createElement(i.F,{id:"file-input-default",label:"Choose a file",language:"en",maxSize:1572864,accept:".png,.jpg",onChange:t})},d=()=>{const[e,t]=n.useState([]);return console.log("selected files",e),n.createElement(i.F,{multiple:!0,dragAndDrop:!0,id:"file-input-drag-and-drop",label:"Drag and drop files here",language:"en",accept:".png,.jpg",onChange:t})},u=()=>{try{const[e,t]=n.useState([void 0!==typeof window?new window.File(["string content"],"dummy.txt",{type:"text/plain"}):null,void 0!==typeof window?new window.File(["string content with more text"],"anotherDummy.txt",{type:"text/plain"}):null]);return console.log("Selected files: ",e),n.createElement(i.F,{multiple:!0,id:"file-input-default-value",language:"en",onChange:t,defaultValue:e})}catch(e){console.error(e)}return null};function p(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",ul:"ul",li:"li",code:"code",h4:"h4",p:"p"},(0,l.ah)(),e.components),{PlaygroundPreview:a,InternalLink:i}=t;return i||m("InternalLink",!0),a||m("PlaygroundPreview",!0),n.createElement(n.Fragment,null,n.createElement(t.h2,{id:"usage",style:{position:"relative"}},"Usage",n.createElement(t.a,{href:"#usage","aria-label":"usage permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.h3,{id:"example",style:{position:"relative"}},"Example",n.createElement(t.a,{href:"#example","aria-label":"example permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n","\n",n.createElement(a,null,n.createElement(s)),"\n",n.createElement(t.h3,{id:"principles",style:{position:"relative"}},"Principles",n.createElement(t.a,{href:"#principles","aria-label":"principles permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.ul,null,"\n",n.createElement(t.li,null,"A label should always be provided with a FileInput. It should clearly describe what the user is expected to select."),"\n",n.createElement(t.li,null,"The helper text below the FileInput describes the file requirements to the user. It lists accepted file formats as well as the maximum size of a single file.","\n",n.createElement(t.ul,null,"\n",n.createElement(t.li,null,"Note that the helper text is generated automatically from the ",n.createElement(t.code,null,"accept")," and ",n.createElement(t.code,null,"maxSize")," properties."),"\n"),"\n"),"\n",n.createElement(t.li,null,"The FileInput does not automatically upload files to any server. The user is required to submit the form before the actual upload happens."),"\n",n.createElement(t.li,null,"One FileInput can be configured to accept one or multiple files.","\n",n.createElement(t.ul,null,"\n",n.createElement(t.li,null,"Make sure labels of the input indicate the number of expected files to the user."),"\n",n.createElement(t.li,null,"A FileInput allowing multiple files fits well for situations where all the files are related to each other (e.g. multiple photos from the same event)."),"\n",n.createElement(t.li,null,"If the user has to upload multiple files that are not related to each other, prefer using multiple file uploads - one for each file."),"\n"),"\n"),"\n",n.createElement(t.li,null,"Dragging and dropping files can be allowed by using the ",n.createElement(t.code,null,"dragAndDrop")," property."),"\n",n.createElement(t.li,null,"The FileInput uses an info text element to inform the user about the status of the component. You can read more about the usage of the info text element in the ",n.createElement(i,{href:"/patterns/forms/form-validation#3-info-message"},"HDS Form validation pattern documentation page"),"."),"\n",n.createElement(t.li,null,"The FileInput component resolves human-readable file size abbreviations based on a binary system. The file size texts are shown after the selected file name and in maxSize messages if maxSize validation is used."),"\n",n.createElement(t.li,null,"The accept parameter only checks and allows correct file types according to the file extension(s) or file types, instead of doing any in-depth analysis."),"\n"),"\n",n.createElement(t.h3,{id:"variations",style:{position:"relative"}},"Variations",n.createElement(t.a,{href:"#variations","aria-label":"variations permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.h4,{id:"default",style:{position:"relative"}},"Default",n.createElement(t.a,{href:"#default","aria-label":"default permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.p,null,"In its default form, the HDS FileInput offers a button-like element that opens a file browser native to the user's current device. Selected files are presented in a list below the input and files can be removed from the listing separately."),"\n","\n",n.createElement(a,null,n.createElement(c)),"\n",n.createElement(t.h4,{id:"with-drag-and-drop",style:{position:"relative"}},"With drag and drop",n.createElement(t.a,{href:"#with-drag-and-drop","aria-label":"with drag and drop permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.p,null,"If in some cases having the ability to drag and drop files onto the page could help the user, this can be enabled with the ",n.createElement(t.code,null,"dragAndDrop")," property. Note that the traditional file input is still included below the drag and drop area. Therefore this property does not weaken the accessibility of the component."),"\n","\n",n.createElement(a,null,n.createElement(d)),"\n",n.createElement(t.h4,{id:"with-default-value",style:{position:"relative"}},"With default value",n.createElement(t.a,{href:"#with-default-value","aria-label":"with default value permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.p,null,"If needed, the file input can be prefilled with pre-existing file(s). Useful, for example, if adding files in a multi-page form and coming back to the file-adding step again."),"\n","\n",n.createElement(a,null,n.createElement(u)))}function m(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){return void 0===e&&(e={}),n.createElement(o,e,n.createElement(p,e))}},91388:function(e,t,a){a.r(t);var l=a(11151),n=a(67294),i=a(83428),r=a(57674),o=a(89482),s=(a(18607),a(26127));function c(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,l.ah)(),e.components);return s.Z||d("PageTabs",!1),s.Z.Tab||d("PageTabs.Tab",!0),s.Z.TabList||d("PageTabs.TabList",!0),s.Z.TabPanel||d("PageTabs.TabPanel",!0),n.createElement(n.Fragment,null,n.createElement(t.h1,{id:"fileinput",style:{position:"relative"}},"FileInput",n.createElement(t.a,{href:"#fileinput","aria-label":"fileinput permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement("div",{class:"status-label-description"},n.createElement(i.S,{type:"info"},"Stable"),n.createElement(i.S,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),n.createElement(r.Z)),"\n",n.createElement(o.Z,null,"A file input helps the user to browse and select one or multiple files to be uploaded to the service."),"\n",n.createElement(s.Z,{pageContext:e.pageContext},n.createElement(s.Z.TabList,null,n.createElement(s.Z.Tab,{href:"/"},"Usage"),n.createElement(s.Z.Tab,{href:"/code"},"Code"),n.createElement(s.Z.Tab,{href:"/accessibility"},"Accessibility"),n.createElement(s.Z.Tab,{href:"/security"},"Security")),n.createElement(s.Z.TabPanel,null,e.children)))}function d(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?n.createElement(t,e,n.createElement(c,e)):c(e)}},89482:function(e,t,a){var l=a(67294);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:n={},children:i}=e;return l.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...n}},i)}},26127:function(e,t,a){var l=a(67294),n=a(14160),i=a(67461);const r="PageTabList",o="PageTabPanel",s="PageTab",c=e=>{var t;let{pageContext:a,children:c}=e;const d=a.frontmatter.slug,u=Array.isArray(c)?c:[c],p=u.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===r)),m=u.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===o)),h=null===(t=p.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===s)),f=h.findIndex((e=>d.endsWith(e.props.href))),_=-1===f?0:f,g=0===_?d:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(d);return l.createElement(i.a,{initiallyActiveTab:_},l.createElement(i.a.TabList,{className:"page-tabs-list"},h.map((e=>l.createElement(i.a.Tab,{key:e.props.href,onClick:()=>(0,n.navigate)(`${"/"===e.props.href?g:g+e.props.href}`)},e.props.children)))),h.map(((e,t)=>l.createElement(i.a.TabPanel,{key:e.props.href},_===t?m.props.children:l.createElement("div",null)))))},d=e=>{let{children:t}=e;return l.createElement(i.a.TabList,null,t)};d.componentName=r;const u=e=>{let{href:t,slug:a,children:n}=e;return l.createElement(i.a.Tab,null,n)};u.componentName=s;const p=e=>{let{children:t}=e;return l.createElement(i.a.TabPanel,null,t)};p.componentName=o,c.TabList=d,c.Tab=u,c.TabPanel=p,t.Z=c},57674:function(e,t,a){var l=a(67294),n=a(45422);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return l.createElement(n.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},l.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>l.createElement("li",{key:t},l.createElement("span",{className:"status-name"},t),l.createElement("span",null,e[t]))))))}}}]);