"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[7187],{83428:function(e,a,t){t.d(a,{S:function(){return o}});var s=t(80136),l=t(67294),n=t(7444),r=t(34300),c={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,n.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const i=e=>{let{icon:a}=e;return l.createElement("span",{className:c.statusLabelIcon,"aria-hidden":"true"},a)},o=e=>{var{children:a,className:t,dataTestId:n,type:o="neutral",iconLeft:u}=e,b=(0,s._)(e,["children","className","dataTestId","type","iconLeft"]);return l.createElement("span",Object.assign({className:(0,r.c)(c.statusLabel,c[o],u&&c.statusLabelWithIcon,t),"data-testid":n},b),u&&l.createElement(i,{icon:u}),a)}},54716:function(e,a,t){t.r(a);var s=t(11151),l=t(67294),n=t(83428),r=t(57674),c=t(89482),i=(t(18607),t(26127));function o(e){const a=Object.assign({h1:"h1",a:"a",span:"span"},(0,s.ah)(),e.components);return i.Z||u("PageTabs",!1),i.Z.Tab||u("PageTabs.Tab",!0),i.Z.TabList||u("PageTabs.TabList",!0),i.Z.TabPanel||u("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(a.h1,{id:"passwordinput",style:{position:"relative"}},"PasswordInput",l.createElement(a.a,{href:"#passwordinput","aria-label":"passwordinput permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{class:"status-label-description"},l.createElement(n.S,{type:"info"},"Stable"),l.createElement(n.S,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(r.Z)),"\n",l.createElement(c.Z,null,"A password field is a foundational input field component that the user can interact with and specifically input password data."),"\n",l.createElement(i.Z,{pageContext:e.pageContext},l.createElement(i.Z.TabList,null,l.createElement(i.Z.Tab,{href:"/"},"Usage"),l.createElement(i.Z.Tab,{href:"/code"},"Code"),l.createElement(i.Z.Tab,{href:"/accessibility"},"Accessibility"),l.createElement(i.Z.Tab,{href:"/security"},"Security")),l.createElement(i.Z.TabPanel,null,e.children)))}function u(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}a.default=function(e){void 0===e&&(e={});const{wrapper:a}=Object.assign({},(0,s.ah)(),e.components);return a?l.createElement(a,e,l.createElement(o,e)):o(e)}},89482:function(e,a,t){var s=t(67294);a.Z=e=>{let{color:a="var(--color-black-90)",size:t="var(--fontsize-body-xl)",style:l={},children:n}=e;return s.createElement("p",{style:{fontSize:t,color:a,maxWidth:600,...l}},n)}},26127:function(e,a,t){var s=t(67294),l=t(14160),n=t(94671);const r="PageTabList",c="PageTabPanel",i="PageTab",o=e=>{var a;let{pageContext:t,children:o}=e;const u=t.frontmatter.slug,b=Array.isArray(o)?o:[o],d=b.find((e=>(0,s.isValidElement)(e)&&e.type.componentName===r)),p=b.find((e=>(0,s.isValidElement)(e)&&e.type.componentName===c)),m=null===(a=d.props)||void 0===a?void 0:a.children.filter((e=>e.type.componentName===i)),h=m.findIndex((e=>u.endsWith(e.props.href))),_=-1===h?0:h,f=0===_?u:(e=>"/"+e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/"))(u);return s.createElement(n.a,{initiallyActiveTab:_},s.createElement(n.a.TabList,{className:"page-tabs-list"},m.map((e=>s.createElement(n.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(""+("/"===e.props.href?f:f+e.props.href))},e.props.children)))),m.map(((e,a)=>s.createElement(n.a.TabPanel,{key:e.props.href},_===a?p.props.children:s.createElement("div",null)))))},u=e=>{let{children:a}=e;return s.createElement(n.a.TabList,null,a)};u.componentName=r;const b=e=>{let{href:a,slug:t,children:l}=e;return s.createElement(n.a.Tab,null,l)};b.componentName=i;const d=e=>{let{children:a}=e;return s.createElement(n.a.TabPanel,null,a)};d.componentName=c,o.TabList=u,o.Tab=b,o.TabPanel=d,a.Z=o},57674:function(e,a,t){var s=t(67294),l=t(45422);a.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return s.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},s.createElement("ul",{class:"status-label-definitions"},Object.keys(e).map((a=>s.createElement("li",{key:a},s.createElement("span",{class:"status-name"},a),s.createElement("span",null,e[a]))))))}}}]);