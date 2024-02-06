"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[2761],{99123:function(e,t,a){a.d(t,{S:function(){return o}});var s=a(80136),l=a(67294),n=(a(7568),a(7444)),r=a(34300),c={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,n.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const i=e=>{let{icon:t}=e;return l.createElement("span",{className:c.statusLabelIcon,"aria-hidden":"true"},t)},o=e=>{var{children:t,className:a,dataTestId:n,type:o="neutral",iconLeft:u}=e,b=(0,s._)(e,["children","className","dataTestId","type","iconLeft"]);return l.createElement("span",Object.assign({className:(0,r.c)(c.statusLabel,c[o],u&&c.statusLabelWithIcon,a),"data-testid":n},b),u&&l.createElement(i,{icon:u}),t)}},94474:function(e,t,a){a.r(t);var s=a(11151),l=a(67294),n=a(57674),r=a(89482),c=(a(18607),a(26127)),i=a(55725);function o(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,s.ah)(),e.components);return c.Z||u("PageTabs",!1),c.Z.Tab||u("PageTabs.Tab",!0),c.Z.TabList||u("PageTabs.TabList",!0),c.Z.TabPanel||u("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(t.h1,{id:"dateinput",style:{position:"relative"}},"DateInput",l.createElement(t.a,{href:"#dateinput","aria-label":"dateinput permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{class:"status-label-description"},l.createElement(i.Z,{type:"info"},"Stable"),l.createElement(i.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(n.Z)),"\n",l.createElement(r.Z,null,"Date input allows the user to easily input a specific date or a date range. By default, HDS date input is supplied with a date picker functionality."),"\n",l.createElement(c.Z,{pageContext:e.pageContext},l.createElement(c.Z.TabList,null,l.createElement(c.Z.Tab,{href:"/"},"Usage"),l.createElement(c.Z.Tab,{href:"/code"},"Code"),l.createElement(c.Z.Tab,{href:"/accessibility"},"Accessibility"),l.createElement(c.Z.Tab,{href:"/customisation"},"Customisation")),l.createElement(c.Z.TabPanel,null,e.children)))}function u(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?l.createElement(t,e,l.createElement(o,e)):o(e)}},89482:function(e,t,a){var s=a(67294),l=a(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:n={},children:r}=e;return s.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...n}},(0,l.g)(r))}},26127:function(e,t,a){var s=a(67294),l=a(14160),n=a(21335),r=a(42972);const c="PageTabList",i="PageTabPanel",o="PageTab",u=e=>{var t;let{pageContext:a,children:u}=e;const b=a.frontmatter.slug,d=Array.isArray(u)?u:[u],m=d.find((e=>(0,s.isValidElement)(e)&&e.type.componentName===c)),p=d.find((e=>(0,s.isValidElement)(e)&&e.type.componentName===i)),h=null===(t=m.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===o)),_=h.findIndex((e=>b.endsWith(e.props.href))),f=-1===_?0:_,g=0===f?b:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(b);return s.createElement(n.a,{initiallyActiveTab:f},s.createElement(n.a.TabList,{className:"page-tabs-list"},h.map((e=>s.createElement(n.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(`${"/"===e.props.href?g:g+e.props.href}`)},(0,r.g)(e.props.children))))),h.map(((e,t)=>s.createElement(n.a.TabPanel,{key:e.props.href},f===t?p.props.children:s.createElement("div",null)))))},b=e=>{let{children:t}=e;return s.createElement(n.a.TabList,null,t)};b.componentName=c;const d=e=>{let{href:t,slug:a,children:l}=e;return s.createElement(n.a.Tab,null," ",l)};d.componentName=o;const m=e=>{let{children:t}=e;return s.createElement(n.a.TabPanel,null,t)};m.componentName=i,u.TabList=b,u.Tab=d,u.TabPanel=m,t.Z=u},55725:function(e,t,a){var s=a(67294),l=a(99123),n=a(42972);t.Z=e=>{let{children:t,...a}=e;return s.createElement(l.S,a,(0,n.g)(t))}},57674:function(e,t,a){var s=a(67294),l=a(37106);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return s.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},s.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>s.createElement("li",{key:t},s.createElement("span",{className:"status-name"},t),s.createElement("span",null,e[t]))))))}}}]);