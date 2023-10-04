"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[5490,3676],{83428:function(e,t,a){a.d(t,{S:function(){return o}});var l=a(80136),s=a(67294),n=a(7444),r=a(34300),i={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,n.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const c=e=>{let{icon:t}=e;return s.createElement("span",{className:i.statusLabelIcon,"aria-hidden":"true"},t)},o=e=>{var{children:t,className:a,dataTestId:n,type:o="neutral",iconLeft:u}=e,b=(0,l._)(e,["children","className","dataTestId","type","iconLeft"]);return s.createElement("span",Object.assign({className:(0,r.c)(i.statusLabel,i[o],u&&i.statusLabelWithIcon,a),"data-testid":n},b),u&&s.createElement(c,{icon:u}),t)}},64206:function(e,t,a){a.r(t);var l=a(11151),s=a(67294),n=a(80699),r=a(88144);const i=e=>{let{children:t,pageContext:a}=e;return s.createElement(r.default,{pageContext:a},t)};function c(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",ul:"ul",li:"li"},(0,l.ah)(),e.components);return s.createElement(s.Fragment,null,s.createElement(t.h2,{id:"accessibility",style:{position:"relative"}},"Accessibility",s.createElement(t.a,{href:"#accessibility","aria-label":"accessibility permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.h3,{id:"pay-attention-to",style:{position:"relative"}},"Pay attention to",s.createElement(t.a,{href:"#pay-attention-to","aria-label":"pay attention to permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"Linkbox must have the link as its last element (in the DOM tree). This way assistive technologies will eventually find the Linkbox link."),"\n",s.createElement(t.li,null,"The colour contrast between the Linkbox and its background must comply with ",s.createElement(n.Z,{href:"https://www.w3.org/TR/WCAG21/#contrast-minimum"},"WCAG AA Level contrast ratios"),". If needed, you may use a Linkbox border to increase the contrast to its background."),"\n"))}t.default=function(e){return void 0===e&&(e={}),s.createElement(i,e,s.createElement(c,e))}},88144:function(e,t,a){a.r(t);var l=a(11151),s=a(67294),n=a(83428),r=a(57674),i=a(89482),c=(a(18607),a(26127));function o(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,l.ah)(),e.components);return c.Z||u("PageTabs",!1),c.Z.Tab||u("PageTabs.Tab",!0),c.Z.TabList||u("PageTabs.TabList",!0),c.Z.TabPanel||u("PageTabs.TabPanel",!0),s.createElement(s.Fragment,null,s.createElement(t.h1,{id:"linkbox",style:{position:"relative"}},"Linkbox",s.createElement(t.a,{href:"#linkbox","aria-label":"linkbox permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement("div",{class:"status-label-description"},s.createElement(n.S,{type:"alert"},"Beta"),s.createElement(n.S,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),s.createElement(r.Z)),"\n",s.createElement(i.Z,null,"Linkboxes are used to combine multiple elements into a single interactable element. While they are visually similar to HDS Cards, Linkboxes are always a single clickable link and they cannot contain other interactable elements."),"\n",s.createElement(c.Z,{pageContext:e.pageContext},s.createElement(c.Z.TabList,null,s.createElement(c.Z.Tab,{href:"/"},"Usage"),s.createElement(c.Z.Tab,{href:"/code"},"Code"),s.createElement(c.Z.Tab,{href:"/accessibility"},"Accessibility")),s.createElement(c.Z.TabPanel,null,e.children)))}function u(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?s.createElement(t,e,s.createElement(o,e)):o(e)}},89482:function(e,t,a){var l=a(67294);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:s={},children:n}=e;return l.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...s}},n)}},26127:function(e,t,a){var l=a(67294),s=a(14160),n=a(94671);const r="PageTabList",i="PageTabPanel",c="PageTab",o=e=>{var t;let{pageContext:a,children:o}=e;const u=a.frontmatter.slug,b=Array.isArray(o)?o:[o],d=b.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===r)),h=b.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===i)),m=null===(t=d.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===c)),p=m.findIndex((e=>u.endsWith(e.props.href))),_=-1===p?0:p,g=0===_?u:(e=>"/"+e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/"))(u);return l.createElement(n.a,{initiallyActiveTab:_},l.createElement(n.a.TabList,{className:"page-tabs-list"},m.map((e=>l.createElement(n.a.Tab,{key:e.props.href,onClick:()=>(0,s.navigate)(""+("/"===e.props.href?g:g+e.props.href))},e.props.children)))),m.map(((e,t)=>l.createElement(n.a.TabPanel,{key:e.props.href},_===t?h.props.children:l.createElement("div",null)))))},u=e=>{let{children:t}=e;return l.createElement(n.a.TabList,null,t)};u.componentName=r;const b=e=>{let{href:t,slug:a,children:s}=e;return l.createElement(n.a.Tab,null,s)};b.componentName=c;const d=e=>{let{children:t}=e;return l.createElement(n.a.TabPanel,null,t)};d.componentName=i,o.TabList=u,o.Tab=b,o.TabPanel=d,t.Z=o},57674:function(e,t,a){var l=a(67294),s=a(45422);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return l.createElement(s.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},l.createElement("ul",{class:"status-label-definitions"},Object.keys(e).map((t=>l.createElement("li",{key:t},l.createElement("span",{class:"status-name"},t),l.createElement("span",null,e[t]))))))}}}]);