"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[7056,6043],{71408:function(e,t,a){a.d(t,{D:function(){return y}});var n=a(80136),i=a(67294),l=a(73935),o=(a(7568),a(7444)),r=a(9741),s=a(43837),c=a(71019),d={"medium-up":"only screen and (min-width:768px)",dialogVisibleBodyWithHiddenScrollbars:"Dialog-module_dialogVisibleBodyWithHiddenScrollbars__3M__P",dialogBackdrop:"Dialog-module_dialogBackdrop__2Pg2X",dialog:"Dialog-module_dialog__2t3d4",dialogContainer:"Dialog-module_dialogContainer__10Y03",danger:"Dialog-module_danger__yTstu",dialogVisible:"Dialog-module_dialogVisible__6zvp4",dialogScrollable:"Dialog-module_dialogScrollable__3W-hK",boxShadow:"Dialog-module_boxShadow__3qt5w"};(0,o.s)(".Dialog-module_dialogVisibleBodyWithHiddenScrollbars__3M__P{overflow:hidden!important}.Dialog-module_dialogBackdrop__2Pg2X{inset:0;position:fixed}.Dialog-module_dialog__2t3d4{background:#fff;box-sizing:border-box;display:flex;flex-direction:column;margin:auto var(--spacing-s);max-width:100%;position:relative;visibility:hidden;z-index:900}.Dialog-module_dialogContainer__10Y03{--accent-line-color:var(--color-bus);--overlay-color:rgba(0,0,0,0.3);align-items:center;display:flex;inset:0;justify-content:center;overflow:auto;-webkit-overflow-scrolling:unset;overscroll-behavior:none;position:fixed;z-index:800}.Dialog-module_dialogContainer__10Y03 .Dialog-module_dialogBackdrop__2Pg2X{background:var(--overlay-color)}.Dialog-module_dialogContainer__10Y03 .Dialog-module_dialog__2t3d4{border-top:10px solid var(--accent-line-color);width:558px}.Dialog-module_dialogContainer__10Y03 .Dialog-module_dialog__2t3d4.Dialog-module_danger__yTstu{border-top-color:var(--color-error)}.Dialog-module_dialogVisible__6zvp4{visibility:visible!important}.Dialog-module_dialogScrollable__3W-hK{max-height:calc(100% - 4rem);overflow:hidden}@media only screen and (min-width:768px){.Dialog-module_dialog__2t3d4{margin:auto}}.Dialog-module_boxShadow__3qt5w{box-shadow:var(--box-shadow-l)}");(0,o.s)(".DialogActionButtons-module_dialogActionButtons__5m7AC{display:block;padding:var(--spacing-s) var(--spacing-m) var(--spacing-m)}@media only screen and (min-width:768px){.DialogActionButtons-module_dialogActionButtons__5m7AC{padding-left:var(--spacing-l);padding-right:var(--spacing-l)}}.DialogActionButtons-module_dialogActionButtons__5m7AC>*{width:100%}.DialogActionButtons-module_dialogActionButtons__5m7AC>*+*{margin-top:var(--spacing-s)}@media only screen and (min-width:768px){.DialogActionButtons-module_dialogActionButtons__5m7AC{display:flex;flex-wrap:wrap;gap:var(--spacing-s)}.DialogActionButtons-module_dialogActionButtons__5m7AC>*{width:auto}.DialogActionButtons-module_dialogActionButtons__5m7AC>*+*{margin-top:0}}");const u=e=>{var{children:t,className:a}=e,l=(0,n._)(e,["children","className"]);return i.createElement("div",Object.assign({className:(0,r.c)("DialogActionButtons-module_dialogActionButtons__5m7AC",a)},l),t)};u.componentName="DialogActionButtons";(0,o.s)('.DialogHeader-module_dialogHeaderClose__36wOz{background:none;border:none;color:inherit;cursor:pointer;font:inherit}.DialogHeader-module_dialogHeader__32Rho{padding-left:var(--spacing-m);padding-right:var(--spacing-m);display:block;padding-bottom:0;padding-top:var(--spacing-m)}@media only screen and (min-width:768px){.DialogHeader-module_dialogHeader__32Rho{padding-left:var(--spacing-l);padding-right:var(--spacing-l)}}.DialogHeader-module_dialogHeaderContent__3K4i2{align-items:flex-start;display:flex;justify-content:space-between;min-height:36px}.DialogHeader-module_dialogTitle__1GeH_{--outline-x-gutter:4px;--outline-y-gutter:2px;--outline-width:3px;align-items:flex-start;box-sizing:border-box;display:flex;font-size:var(--fontsize-heading-xs);font-weight:700;letter-spacing:.4px;line-height:24px;margin:0;order:0;outline:none;padding-right:var(--spacing-3-xs);position:relative}.DialogHeader-module_dialogTitle__1GeH_:after{border:var(--outline-width) solid transparent;box-sizing:border-box;content:"";display:block;height:100%;left:calc((var(--outline-width) + var(--outline-x-gutter)) * -1);position:absolute;top:calc((var(--outline-width) + var(--outline-y-gutter)) * -1);width:100%}.DialogHeader-module_dialogTitle__1GeH_:focus:after{border-color:var(--color-coat-of-arms);height:calc(100% + (var(--outline-width) + var(--outline-y-gutter)) * 2);width:calc(100% + (var(--outline-width) + var(--outline-x-gutter)) * 2)}.DialogHeader-module_dialogTitle__1GeH_ .DialogHeader-module_dialogTitleLeftIcon__1xWhC{display:inline-flex;margin-right:var(--spacing-2-xs)}.DialogHeader-module_dialogHeaderClose__36wOz{color:var(--dialog-close-button-color);display:block;font-size:0;height:44px;line-height:1;margin-left:var(--spacing-2-xs);margin-top:calc(-1 * var(--spacing-2-xs));min-width:44px;order:1;padding:0;vertical-align:middle}.DialogHeader-module_dialogHeaderClose__36wOz:focus{box-shadow:0 0 0 3px var(--color-coat-of-arms);outline:none;text-decoration:none}@media only screen and (min-width:768px){.DialogHeader-module_dialogHeader__32Rho{padding-bottom:var(--spacing-3-xs)}}');const m=i.createContext({}),g=e=>{var{title:t,iconLeft:a,className:l}=e,o=(0,n._)(e,["title","iconLeft","className"]);const{close:s,closeButtonLabelText:d,isReadyToShowDialog:u}=(0,i.useContext)(m),g=i.useRef();return(0,i.useEffect)((()=>{g&&u&&g.current.focus()}),[g,u]),i.createElement("div",{className:"DialogHeader-module_dialogHeader__32Rho"},i.createElement("div",{className:"DialogHeader-module_dialogHeaderContent__3K4i2"},s&&i.createElement("button",{className:"DialogHeader-module_dialogHeaderClose__36wOz",type:"button","aria-label":d||"Close",onClick:()=>s()},i.createElement(c.I,{"aria-hidden":"true"})),i.createElement("h2",Object.assign({tabIndex:-1,className:(0,r.c)("DialogHeader-module_dialogTitle__1GeH_",l),ref:g},o),a&&i.createElement("span",{className:"DialogHeader-module_dialogTitleLeftIcon__1xWhC","aria-hidden":"true"},a),t)))};g.componentName="DialogHeader";(0,o.s)(".DialogContent-module_dialogContent__rNnIp{padding-left:var(--spacing-m);padding-right:var(--spacing-m);padding-bottom:var(--spacing-2-xs)}@media only screen and (min-width:768px){.DialogContent-module_dialogContent__rNnIp{padding-left:var(--spacing-l);padding-right:var(--spacing-l)}}.DialogContent-module_dialogContentScrollable__1oi2o{border-bottom:1px solid;border-top:1px solid;overflow-y:auto}");const h=e=>{var{children:t,className:a}=e,l=(0,n._)(e,["children","className"]);const{scrollable:o}=(0,i.useContext)(m);return i.createElement("div",Object.assign({className:(0,r.c)("DialogContent-module_dialogContent__rNnIp",o&&"DialogContent-module_dialogContentScrollable__1oi2o",a)},l),t)};var p,b;h.componentName="DialogContent",(b=p||(p={})).top="top",b.bottom="bottom";const f={tabIndex:0,"aria-hidden":!0},v=(e,t)=>{if(t){const a=(e=>e.querySelectorAll('a, button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'))(t);a.length&&a[e===p.top?0:a.length-1].focus()}},_=e=>{let{onFocus:t}=e;return i.createElement("div",Object.assign({},f,{onFocus:t}))},E=(e,t)=>{const a=document.createElement("div");return a.className="hds-dialog-tab-barrier",a.tabIndex=f.tabIndex,a["aria-hidden"]=f.tabIndex["aria-hidden"],a.addEventListener("focus",(()=>v(e,t))),e===p.top?document.body.insertBefore(a,document.body.firstChild):document.body.appendChild(a),a},y=e=>{var{boxShadow:t=!1,isOpen:a,children:o,close:c,closeButtonLabelText:u,focusAfterCloseElement:g,focusAfterCloseRef:h,scrollable:b,variant:f="primary",theme:y,className:x,targetElement:q}=e,w=(0,n._)(e,["boxShadow","isOpen","children","close","closeButtonLabelText","focusAfterCloseElement","focusAfterCloseRef","scrollable","variant","theme","className","targetElement"]);const[D,C]=(0,i.useState)(!1),k={isReadyToShowDialog:D,scrollable:b,close:c,closeButtonLabelText:u},T=(0,s.u)(d.dialogContainer,y),S=(0,i.createRef)(),N=(0,i.useRef)(null);(0,i.useEffect)((()=>{if(a&&void 0!==S)return E(p.top,S.current),E(p.bottom,S.current),()=>{document.querySelectorAll(".hds-dialog-tab-barrier").forEach((e=>{e.remove()}))}}),[S,a]);const H=(0,i.useCallback)((e=>{c&&"Escape"===e.key&&c()}),[c]),L=(0,i.useCallback)((()=>g||h&&h.current),[g,h]);return(0,i.useEffect)((()=>{if(a){const e=window.innerWidth-document.body.offsetWidth;if(e>0){N.current=document.body.style.paddingRight;const t=parseInt(window.getComputedStyle(document.body).paddingRight,10);document.body.style.paddingRight=`${t+e}px`}document.body.classList.add(d.dialogVisibleBodyWithHiddenScrollbars),document.documentElement.classList.add(d.dialogVisibleBodyWithHiddenScrollbars),document.addEventListener("keydown",H,!1),C(!0)}return()=>{if(a){C(!1),document.body.classList.remove(d.dialogVisibleBodyWithHiddenScrollbars),document.documentElement.classList.remove(d.dialogVisibleBodyWithHiddenScrollbars),document.removeEventListener("keydown",H,!1),document.body.style.paddingRight=N.current||"";const e=L();e&&e.focus()}}}),[a,L]),a?l.createPortal(i.createElement(m.Provider,{value:k},i.createElement("div",{className:(0,r.c)(d.dialogContainer,T)},i.createElement(_,{onFocus:()=>v(p.bottom,S.current)}),i.createElement("div",{tabIndex:-1,className:d.dialogBackdrop}),i.createElement("div",Object.assign({},w,{ref:S,role:"dialog","aria-modal":"true",className:(0,r.c)(d.dialog,D&&d.dialogVisible,b&&d.dialogScrollable,d[f],t&&d.boxShadow,x)}),o),i.createElement(_,{onFocus:()=>v(p.top,S.current)}))),q||document.body):null};y.Header=g,y.Content=h,y.ActionButtons=u},15815:function(e,t,a){a.d(t,{S:function(){return c}});var n=a(80136),i=a(67294),l=(a(7568),a(7444)),o=a(9741),r={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,l.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const s=e=>{let{icon:t}=e;return i.createElement("span",{className:r.statusLabelIcon,"aria-hidden":"true"},t)},c=e=>{var{children:t,className:a,dataTestId:l,type:c="neutral",iconLeft:d}=e,u=(0,n._)(e,["children","className","dataTestId","type","iconLeft"]);return i.createElement("span",Object.assign({className:(0,o.c)(r.statusLabel,r[c],d&&r.statusLabelWithIcon,a),"data-testid":l},u),d&&i.createElement(s,{icon:d}),t)}},1542:function(e,t,a){a.r(t),a.d(t,{ConfirmDialogExample:function(){return g},DangerDialogExample:function(){return h},DialogExample:function(){return u},InfoDialogExample:function(){return m},ScrollableDialogExample:function(){return p}});var n=a(11151),i=a(67294),l=a(92396),o=a(71408),r=a(92413),s=a(88884),c=a(65958);const d=e=>{let{children:t,pageContext:a}=e;return i.createElement(c.default,{pageContext:a},t)},u=()=>{const e=Object.assign({div:"div",p:"p"},(0,n.ah)()),t=i.useRef(null),a=i.useRef(null),[s,c]=i.useState(!1),d=()=>c(!1),u="info-dialog-title",m="info-dialog-content";return i.createElement(i.Fragment,null,i.createElement(e.div,{ref:t}),i.createElement(l.B,{ref:a,onClick:()=>c(!0)},"Open Info dialog"),i.createElement(o.D,{id:"info-dialog","aria-labelledby":u,"aria-describedby":m,isOpen:s,close:d,closeButtonLabelText:"Close info dialog",focusAfterCloseRef:a,targetElement:t.current},i.createElement(o.D.Header,{id:u,title:"Terms of service have changed",iconLeft:i.createElement(r.aa,{"aria-hidden":"true"})}),i.createElement(o.D.Content,null,i.createElement(e.p,{id:m,className:"text-body"},"Please note that the terms of this service have changed. You can review the changes in the user settings.")),i.createElement(o.D.ActionButtons,null,i.createElement(l.B,{onClick:d},"Close"))))},m=()=>{const e=Object.assign({p:"p"},(0,n.ah)()),t=i.useRef(null),[a,s]=i.useState(!1),c=()=>s(!1),d="info-dialog-title",u="info-dialog-content";return i.createElement(i.Fragment,null,i.createElement(l.B,{ref:t,onClick:()=>s(!0)},"Open Info dialog"),i.createElement(o.D,{id:"info-dialog","aria-labelledby":d,"aria-describedby":u,isOpen:a,close:c,closeButtonLabelText:"Close info dialog",focusAfterCloseRef:t},i.createElement(o.D.Header,{id:d,title:"Terms of service have changed",iconLeft:i.createElement(r.aa,{"aria-hidden":"true"})}),i.createElement(o.D.Content,null,i.createElement(e.p,{id:u,className:"text-body"},"Please note that the terms of this service have changed. You can review the changes in the user settings.")),i.createElement(o.D.ActionButtons,null,i.createElement(l.B,{onClick:c},"Close"))))},g=()=>{const e=Object.assign({p:"p"},(0,n.ah)()),t=i.useRef(null),[a,r]=i.useState(!1),c=()=>r(!1),d="confirmation-dialog-title",u="confirmation-dialog-info";return i.createElement(i.Fragment,null,i.createElement(l.B,{ref:t,onClick:()=>r(!0)},"Open Confirmation dialog"),i.createElement(o.D,{id:"confirmation-dialog","aria-labelledby":d,"aria-describedby":u,isOpen:a,focusAfterCloseRef:t},i.createElement(o.D.Header,{id:d,title:"Are you sure you want to continue?",iconLeft:i.createElement(s.I,{"aria-hidden":"true"})}),i.createElement(o.D.Content,null,i.createElement(e.p,{id:u,className:"text-body"},"You have not filled all form fields. Do you still want to continue? You can later return to edit this form. Saved forms can be accessed in your personal profile.")),i.createElement(o.D.ActionButtons,null,i.createElement(l.B,{onClick:c},"Continue"),i.createElement(l.B,{onClick:c,variant:"secondary"},"Cancel"))))},h=()=>{const e=Object.assign({p:"p"},(0,n.ah)()),t=i.useRef(null),[a,s]=i.useState(!1),c=()=>s(!1),d="delete-dialog-title",u="delete-dialog-info";return i.createElement(i.Fragment,null,i.createElement(l.B,{ref:t,onClick:()=>s(!0)},"Open Delete dialog"),i.createElement(o.D,{variant:"danger",id:"delete-dialog","aria-labelledby":d,"aria-describedby":u,isOpen:a,focusAfterCloseRef:t},i.createElement(o.D.Header,{id:d,title:"Are you sure you want to delete this blog post?",iconLeft:i.createElement(r.I,{"aria-hidden":"true"})}),i.createElement(o.D.Content,null,i.createElement(e.p,{id:u,className:"text-body"},"The blog post will be deleted immediately. Deletion is permanent and it cannot be reverted.")),i.createElement(o.D.ActionButtons,null,i.createElement(l.B,{onClick:c,theme:"black",variant:"secondary"},"Cancel"),i.createElement(l.B,{variant:"danger",iconLeft:i.createElement(r.bj,{"aria-hidden":"true"}),onClick:()=>{c()}},"Delete the blog post"))))},p=()=>{const e=Object.assign({div:"div",h3:"h3",p:"p"},(0,n.ah)()),t=i.useRef(null),a=i.useRef(null),[s,c]=i.useState(!1),d=()=>c(!1),u="terms-dialog-title",m="terms-dialog-info";return i.createElement(i.Fragment,null,i.createElement(e.div,{ref:t}),i.createElement(l.B,{ref:a,onClick:()=>c(!0)},"Open Terms dialog"),i.createElement(o.D,{id:"terms-dialog","aria-labelledby":u,"aria-describedby":m,isOpen:s,focusAfterCloseRef:a,targetElement:t.current,scrollable:!0},i.createElement(o.D.Header,{id:u,title:"Do you accept the terms of service?",iconLeft:i.createElement(r.I,{"aria-hidden":"true"})}),i.createElement(o.D.Content,null,i.createElement(e.h3,{id:m},"Terms of service"),i.createElement(e.p,{className:"text-body"},"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"),i.createElement(e.p,{className:"text-body"},"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"),i.createElement(e.p,{className:"text-body"},"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"),i.createElement(e.p,{className:"text-body"},"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"),i.createElement(e.p,{className:"text-body"},"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?")),i.createElement(o.D.ActionButtons,null,i.createElement(l.B,{onClick:d},"Accept terms"),i.createElement(l.B,{onClick:d,variant:"secondary"},"Cancel"))))};function b(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",ul:"ul",li:"li",strong:"strong",h4:"h4",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",p:"p"},(0,n.ah)(),e.components),{PlaygroundPreview:a,InternalLink:l}=t;return l||f("InternalLink",!0),a||f("PlaygroundPreview",!0),i.createElement(i.Fragment,null,i.createElement(t.h2,{id:"usage",style:{position:"relative"}},"Usage",i.createElement(t.a,{href:"#usage","aria-label":"usage permalink",className:"header-anchor after"},i.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(t.h3,{id:"example",style:{position:"relative"}},"Example",i.createElement(t.a,{href:"#example","aria-label":"example permalink",className:"header-anchor after"},i.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n","\n",i.createElement(a,null,i.createElement(u)),"\n",i.createElement(t.h3,{id:"principles",style:{position:"relative"}},"Principles",i.createElement(t.a,{href:"#principles","aria-label":"principles permalink",className:"header-anchor after"},i.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(t.ul,null,"\n",i.createElement(t.li,null,"Dialogs capture the browser focus and the user is forced to react to the dialog.","\n",i.createElement(t.ul,null,"\n",i.createElement(t.li,null,"To emphasize this, a dark screen overlay must be used to cover the view content behind the dialog element."),"\n"),"\n"),"\n",i.createElement(t.li,null,i.createElement(t.strong,null,"Dialogs are a very intrusive pattern and they should only be used when the immediate actions or focus from the user are needed.")),"\n",i.createElement(t.li,null,'Be careful when including a separate close ("x") icon in the dialog. If there are more than one action available in the dialog, it can be ambiguous for the user which action is triggered when the close icon is pressed.',"\n",i.createElement(t.ul,null,"\n",i.createElement(t.li,null,"Generally, it is a good practise to omit the close icon if the dialog has more than one action available."),"\n"),"\n"),"\n",i.createElement(t.li,null,"If your dialog contains form elements, follow ",i.createElement(l,{href:"/patterns/forms/form-building"},"HDS form")," and ",i.createElement(l,{href:"/patterns/forms/form-validation"},"form validation patterns")," similarly as you would in a regular forms."),"\n",i.createElement(t.li,null,"As dialogs always contain buttons, pay close attention that the button labels describe the action it is going to trigger. You can read more information about this in the ",i.createElement(l,{href:"/components/buttons"},"HDS Button documentation page."),"\n",i.createElement(t.ul,null,"\n",i.createElement(t.li,null,"Following the same guidelines as the HDS Form pattern, dialog action buttons are placed at the left side of the dialog and the primary action will be the first one from the left."),"\n",i.createElement(t.li,null,"If some of the actions are destructive or irreversible, the button order should be reversed so so that the destructive actions are last in the button list. See ",i.createElement(t.a,{href:"#danger-dialog"},"Danger dialog example")," for more information."),"\n"),"\n"),"\n",i.createElement(t.li,null,"Opening a dialog should be always triggered by the user. Do not open dialogs without user action.","\n",i.createElement(t.ul,null,"\n",i.createElement(t.li,null,"Also make sure that the dialog is related to the current context."),"\n",i.createElement(t.li,null,"It is not recommended to open dialogs on top of other dialogs. However, this is supported by HDS Dialogs if it is needed."),"\n"),"\n"),"\n"),"\n",i.createElement(t.h4,{id:"when-to-use-each-dialog-type",style:{position:"relative"}},"When to use each dialog type?",i.createElement(t.a,{href:"#when-to-use-each-dialog-type","aria-label":"when to use each dialog type permalink",className:"header-anchor after"},i.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(t.table,null,i.createElement(t.thead,null,i.createElement(t.tr,null,i.createElement(t.th,null,"Type"),i.createElement(t.th,null,"When to use it?"),i.createElement(t.th,null,"Example"))),i.createElement(t.tbody,null,i.createElement(t.tr,null,i.createElement(t.td,null,i.createElement(t.a,{href:"#info-dialog"},"Info")),i.createElement(t.td,null,"Important information needs to be conveyed to the user. Only requires acknowledgment and no choices from the user."),i.createElement(t.td,null,"Informing the user about changed terms of use.")),i.createElement(t.tr,null,i.createElement(t.td,null,i.createElement(t.a,{href:"#confirm-dialog"},"Confirm")),i.createElement(t.td,null,"An action is required from the user."),i.createElement(t.td,null,"Confirming that the user wants to continue even though all form fields are not filled.")),i.createElement(t.tr,null,i.createElement(t.td,null,i.createElement(t.a,{href:"#danger-dialog"},"Danger")),i.createElement(t.td,null,"An action is required from the user while ",i.createElement(t.strong,null,"the action results are destructive"),"."),i.createElement(t.td,null,"Confirming that the user wants to delete a blog post.")))),"\n",i.createElement(t.h3,{id:"variations",style:{position:"relative"}},"Variations",i.createElement(t.a,{href:"#variations","aria-label":"variations permalink",className:"header-anchor after"},i.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(t.h4,{id:"info-dialog",style:{position:"relative"}},"Info dialog",i.createElement(t.a,{href:"#info-dialog","aria-label":"info dialog permalink",className:"header-anchor after"},i.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(t.p,null,"Info dialogs are used to convey important information to the user. Info dialogs only include one button which the user can use to acknowledge the information."),"\n","\n",i.createElement(a,null,i.createElement(m)),"\n",i.createElement(t.h4,{id:"confirm-dialog",style:{position:"relative"}},"Confirm dialog",i.createElement(t.a,{href:"#confirm-dialog","aria-label":"confirm dialog permalink",className:"header-anchor after"},i.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(t.p,null,"Confirm dialogs are used when an action is required from the user. Confirm dialogs always include at least two actions; one primary action (e.g. Confirm) and one secondary action (e.g. Cancel). However, more than two actions are allowed if it is needed."),"\n","\n",i.createElement(a,null,i.createElement(g)),"\n",i.createElement(t.h4,{id:"danger-dialog",style:{position:"relative"}},"Danger dialog",i.createElement(t.a,{href:"#danger-dialog","aria-label":"danger dialog permalink",className:"header-anchor after"},i.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(t.p,null,"Danger dialog is a variant of a confirm dialog. They are used in similar use cases but Danger dialogs are meant for situations where the action user is going to choose may be destructive or otherwise irreversible or very critical. Danger dialog emphasizes this by using HDS error status colours. Also, it reverses the action button order so that the destructive action is last in the button list."),"\n","\n",i.createElement(a,null,i.createElement(h)),"\n",i.createElement(t.h4,{id:"scrollable-dialog",style:{position:"relative"}},"Scrollable dialog",i.createElement(t.a,{href:"#scrollable-dialog","aria-label":"scrollable dialog permalink",className:"header-anchor after"},i.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(t.p,null,"While not recommended, HDS supports scrollable dialogs if there is a large amount of content (e.g. terms of use). ",i.createElement(t.strong,null,"It is recommended to consider other options than a dialog to present the same data since it can be difficult for the user to form a clear understanding of the presented content.")),"\n","\n",i.createElement(a,null,i.createElement(p)))}function f(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){return void 0===e&&(e={}),i.createElement(d,e,i.createElement(b,e))}},65958:function(e,t,a){a.r(t);var n=a(11151),i=a(67294),l=a(57674),o=a(89482),r=(a(18607),a(26127)),s=a(55725);function c(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,n.ah)(),e.components);return r.Z||d("PageTabs",!1),r.Z.Tab||d("PageTabs.Tab",!0),r.Z.TabList||d("PageTabs.TabList",!0),r.Z.TabPanel||d("PageTabs.TabPanel",!0),i.createElement(i.Fragment,null,i.createElement(t.h1,{id:"dialog",style:{position:"relative"}},"Dialog",i.createElement(t.a,{href:"#dialog","aria-label":"dialog permalink",className:"header-anchor after"},i.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement("div",{class:"status-label-description"},i.createElement(s.Z,{type:"info"},"Stable"),i.createElement(s.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),i.createElement(l.Z)),"\n",i.createElement(o.Z,null,"Dialogs initiate a conversation between the service and the user. They are used when an input or a confirmation is needed from the user or when important information needs to be conveyed."),"\n",i.createElement(r.Z,{pageContext:e.pageContext},i.createElement(r.Z.TabList,null,i.createElement(r.Z.Tab,{href:"/"},"Usage"),i.createElement(r.Z.Tab,{href:"/code"},"Code"),i.createElement(r.Z.Tab,{href:"/accessibility"},"Accessibility"),i.createElement(r.Z.Tab,{href:"/customisation"},"Customisation")),i.createElement(r.Z.TabPanel,null,e.children)))}function d(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?i.createElement(t,e,i.createElement(c,e)):c(e)}},89482:function(e,t,a){var n=a(67294),i=a(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:l={},children:o}=e;return n.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...l}},(0,i.g)(o))}},26127:function(e,t,a){var n=a(67294),i=a(14160),l=a(58405),o=a(42972);const r="PageTabList",s="PageTabPanel",c="PageTab",d=e=>{var t;let{pageContext:a,children:d}=e;const u=a.frontmatter.slug,m=Array.isArray(d)?d:[d],g=m.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===r)),h=m.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===s)),p=null===(t=g.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===c)),b=p.findIndex((e=>u.endsWith(e.props.href))),f=-1===b?0:b,v=0===f?u:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(u);return n.createElement(l.a,{initiallyActiveTab:f},n.createElement(l.a.TabList,{className:"page-tabs-list"},p.map((e=>n.createElement(l.a.Tab,{key:e.props.href,onClick:()=>(0,i.navigate)(`${"/"===e.props.href?v:v+e.props.href}`)},(0,o.g)(e.props.children))))),p.map(((e,t)=>n.createElement(l.a.TabPanel,{key:e.props.href},f===t?h.props.children:n.createElement("div",null)))))},u=e=>{let{children:t}=e;return n.createElement(l.a.TabList,null,t)};u.componentName=r;const m=e=>{let{href:t,slug:a,children:i}=e;return n.createElement(l.a.Tab,null," ",i)};m.componentName=c;const g=e=>{let{children:t}=e;return n.createElement(l.a.TabPanel,null,t)};g.componentName=s,d.TabList=u,d.Tab=m,d.TabPanel=g,t.Z=d},55725:function(e,t,a){var n=a(67294),i=a(15815),l=a(42972);t.Z=e=>{let{children:t,...a}=e;return n.createElement(i.S,a,(0,l.g)(t))}},57674:function(e,t,a){var n=a(67294),i=a(96619);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return n.createElement(i.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},n.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>n.createElement("li",{key:t},n.createElement("span",{className:"status-name"},t),n.createElement("span",null,e[t]))))))}}}]);