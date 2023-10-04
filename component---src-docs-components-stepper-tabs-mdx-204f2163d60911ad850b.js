"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[6725],{83428:function(e,t,a){a.d(t,{S:function(){return c}});var s=a(80136),l=a(67294),n=a(7444),r=a(34300),o={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,n.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const i=e=>{let{icon:t}=e;return l.createElement("span",{className:o.statusLabelIcon,"aria-hidden":"true"},t)},c=e=>{var{children:t,className:a,dataTestId:n,type:c="neutral",iconLeft:u}=e,b=(0,s._)(e,["children","className","dataTestId","type","iconLeft"]);return l.createElement("span",Object.assign({className:(0,r.c)(o.statusLabel,o[c],u&&o.statusLabelWithIcon,a),"data-testid":n},b),u&&l.createElement(i,{icon:u}),t)}},61056:function(e,t,a){a.r(t);var s=a(11151),l=a(67294),n=a(83428),r=a(12818),o=a(57674),i=a(89482),c=(a(18607),a(26127));function u(e){const t=Object.assign({h1:"h1",a:"a",span:"span",p:"p"},(0,s.ah)(),e.components),{InternalLink:a}=t;return a||b("InternalLink",!0),c.Z||b("PageTabs",!1),c.Z.Tab||b("PageTabs.Tab",!0),c.Z.TabList||b("PageTabs.TabList",!0),c.Z.TabPanel||b("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(t.h1,{id:"stepper",style:{position:"relative"}},"Stepper",l.createElement(t.a,{href:"#stepper","aria-label":"stepper permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{class:"status-label-description"},l.createElement(n.S,{type:"alert"},"Beta"),l.createElement(n.S,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(o.Z)),"\n",l.createElement(i.Z,null,"If a form is divided into multiple pages or steps, the Form progress component helps the user to understand the progression and to navigate between form steps."),"\n",l.createElement(r.N,{label:"Note about multi-page forms!",className:"siteNotification"},l.createElement(t.p,null,"This documentation page is about HDS multi-page stepper component. If you are looking for documentation about building multi-page forms, please refer to ",l.createElement(a,{href:"/patterns/forms/form-multi-page"},"HDS multi-page form pattern documentation page"),".")),"\n",l.createElement(c.Z,{pageContext:e.pageContext},l.createElement(c.Z.TabList,null,l.createElement(c.Z.Tab,{href:"/"},"Usage"),l.createElement(c.Z.Tab,{href:"/code"},"Code"),l.createElement(c.Z.Tab,{href:"/accessibility"},"Accessibility"),l.createElement(c.Z.Tab,{href:"/customisation"},"Customisation")),l.createElement(c.Z.TabPanel,null,e.children)))}function b(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?l.createElement(t,e,l.createElement(u,e)):u(e)}},89482:function(e,t,a){var s=a(67294);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:l={},children:n}=e;return s.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...l}},n)}},26127:function(e,t,a){var s=a(67294),l=a(14160),n=a(94671);const r="PageTabList",o="PageTabPanel",i="PageTab",c=e=>{var t;let{pageContext:a,children:c}=e;const u=a.frontmatter.slug,b=Array.isArray(c)?c:[c],m=b.find((e=>(0,s.isValidElement)(e)&&e.type.componentName===r)),d=b.find((e=>(0,s.isValidElement)(e)&&e.type.componentName===o)),p=null===(t=m.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===i)),h=p.findIndex((e=>u.endsWith(e.props.href))),f=-1===h?0:h,_=0===f?u:(e=>"/"+e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/"))(u);return s.createElement(n.a,{initiallyActiveTab:f},s.createElement(n.a.TabList,{className:"page-tabs-list"},p.map((e=>s.createElement(n.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(""+("/"===e.props.href?_:_+e.props.href))},e.props.children)))),p.map(((e,t)=>s.createElement(n.a.TabPanel,{key:e.props.href},f===t?d.props.children:s.createElement("div",null)))))},u=e=>{let{children:t}=e;return s.createElement(n.a.TabList,null,t)};u.componentName=r;const b=e=>{let{href:t,slug:a,children:l}=e;return s.createElement(n.a.Tab,null,l)};b.componentName=i;const m=e=>{let{children:t}=e;return s.createElement(n.a.TabPanel,null,t)};m.componentName=o,c.TabList=u,c.Tab=b,c.TabPanel=m,t.Z=c},57674:function(e,t,a){var s=a(67294),l=a(45422);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return s.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},s.createElement("ul",{class:"status-label-definitions"},Object.keys(e).map((t=>s.createElement("li",{key:t},s.createElement("span",{class:"status-name"},t),s.createElement("span",null,e[t]))))))}}}]);