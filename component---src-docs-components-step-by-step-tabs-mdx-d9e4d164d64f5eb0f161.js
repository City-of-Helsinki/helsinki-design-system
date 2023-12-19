"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[4201],{83428:function(e,t,a){a.d(t,{S:function(){return i}});var s=a(80136),l=a(67294),n=a(7444),r=a(34300),c={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,n.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const o=e=>{let{icon:t}=e;return l.createElement("span",{className:c.statusLabelIcon,"aria-hidden":"true"},t)},i=e=>{var{children:t,className:a,dataTestId:n,type:i="neutral",iconLeft:u}=e,b=(0,s._)(e,["children","className","dataTestId","type","iconLeft"]);return l.createElement("span",Object.assign({className:(0,r.c)(c.statusLabel,c[i],u&&c.statusLabelWithIcon,a),"data-testid":n},b),u&&l.createElement(o,{icon:u}),t)}},12224:function(e,t,a){a.r(t);var s=a(11151),l=a(67294),n=a(83428),r=a(57674),c=a(89482),o=a(26127);function i(e){const t=Object.assign({h1:"h1",a:"a",span:"span",p:"p"},(0,s.ah)(),e.components);return o.Z||u("PageTabs",!1),o.Z.Tab||u("PageTabs.Tab",!0),o.Z.TabList||u("PageTabs.TabList",!0),o.Z.TabPanel||u("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(t.h1,{id:"stepbystep",style:{position:"relative"}},"StepByStep",l.createElement(t.a,{href:"#stepbystep","aria-label":"stepbystep permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{className:"status-label-description"},l.createElement(n.S,{type:"alert"},"Beta"),l.createElement(n.S,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(r.Z)),"\n",l.createElement(c.Z,null,"StepByStep component is useful for visualising a process in steps. The component supports numbered list for cases where the steps must be completed in a specific order, and unnumbered list for cases where the steps are more of a guideline."),"\n",l.createElement(o.Z,{pageContext:e.pageContext},l.createElement(o.Z.TabList,null,l.createElement(o.Z.Tab,{href:"/"},l.createElement(t.p,null,"Usage")),l.createElement(o.Z.Tab,{href:"/code"},l.createElement(t.p,null,"Code")),l.createElement(o.Z.Tab,{href:"/accessibility"},l.createElement(t.p,null,"Accessibility"))),l.createElement(o.Z.TabPanel,null,e.children)))}function u(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?l.createElement(t,e,l.createElement(i,e)):i(e)}},89482:function(e,t,a){var s=a(67294);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:l={},children:n}=e;return s.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...l}},n)}},26127:function(e,t,a){var s=a(67294),l=a(14160),n=a(67461);const r="PageTabList",c="PageTabPanel",o="PageTab",i=e=>{var t;let{pageContext:a,children:i}=e;const u=a.frontmatter.slug,b=Array.isArray(i)?i:[i],d=b.find((e=>(0,s.isValidElement)(e)&&e.type.componentName===r)),p=b.find((e=>(0,s.isValidElement)(e)&&e.type.componentName===c)),m=null===(t=d.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===o)),h=m.findIndex((e=>u.endsWith(e.props.href))),_=-1===h?0:h,f=0===_?u:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(u);return s.createElement(n.a,{initiallyActiveTab:_},s.createElement(n.a.TabList,{className:"page-tabs-list"},m.map((e=>s.createElement(n.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(`${"/"===e.props.href?f:f+e.props.href}`)},e.props.children)))),m.map(((e,t)=>s.createElement(n.a.TabPanel,{key:e.props.href},_===t?p.props.children:s.createElement("div",null)))))},u=e=>{let{children:t}=e;return s.createElement(n.a.TabList,null,t)};u.componentName=r;const b=e=>{let{href:t,slug:a,children:l}=e;return s.createElement(n.a.Tab,null,l)};b.componentName=o;const d=e=>{let{children:t}=e;return s.createElement(n.a.TabPanel,null,t)};d.componentName=c,i.TabList=u,i.Tab=b,i.TabPanel=d,t.Z=i},57674:function(e,t,a){var s=a(67294),l=a(45422);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return s.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},s.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>s.createElement("li",{key:t},s.createElement("span",{className:"status-name"},t),s.createElement("span",null,e[t]))))))}}}]);