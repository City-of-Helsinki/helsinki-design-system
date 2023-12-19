"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[9195],{83428:function(e,a,t){t.d(a,{S:function(){return o}});var s=t(80136),l=t(67294),n=t(7444),r=t(34300),i={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,n.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const c=e=>{let{icon:a}=e;return l.createElement("span",{className:i.statusLabelIcon,"aria-hidden":"true"},a)},o=e=>{var{children:a,className:t,dataTestId:n,type:o="neutral",iconLeft:b}=e,u=(0,s._)(e,["children","className","dataTestId","type","iconLeft"]);return l.createElement("span",Object.assign({className:(0,r.c)(i.statusLabel,i[o],b&&i.statusLabelWithIcon,t),"data-testid":n},u),b&&l.createElement(c,{icon:b}),a)}},34517:function(e,a,t){t.r(a);var s=t(11151),l=t(67294),n=t(83428),r=t(57674),i=t(89482),c=(t(18607),t(26127));function o(e){const a=Object.assign({h1:"h1",a:"a",span:"span"},(0,s.ah)(),e.components);return c.Z||b("PageTabs",!1),c.Z.Tab||b("PageTabs.Tab",!0),c.Z.TabList||b("PageTabs.TabList",!0),c.Z.TabPanel||b("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(a.h1,{id:"link",style:{position:"relative"}},"Link",l.createElement(a.a,{href:"#link","aria-label":"link permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{class:"status-label-description"},l.createElement(n.S,{type:"info"},"Stable"),l.createElement(n.S,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(r.Z)),"\n",l.createElement(i.Z,null,"Links are used as navigational elements and can be used on their own or in inline with text. They provide a lightweight option for navigation."),"\n",l.createElement(c.Z,{pageContext:e.pageContext},l.createElement(c.Z.TabList,null,l.createElement(c.Z.Tab,{href:"/"},"Usage"),l.createElement(c.Z.Tab,{href:"/code"},"Code"),l.createElement(c.Z.Tab,{href:"/accessibility"},"Accessibility")),l.createElement(c.Z.TabPanel,null,e.children)))}function b(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}a.default=function(e){void 0===e&&(e={});const{wrapper:a}=Object.assign({},(0,s.ah)(),e.components);return a?l.createElement(a,e,l.createElement(o,e)):o(e)}},89482:function(e,a,t){var s=t(67294);a.Z=e=>{let{color:a="var(--color-black-90)",size:t="var(--fontsize-body-xl)",style:l={},children:n}=e;return s.createElement("p",{style:{fontSize:t,color:a,maxWidth:600,...l}},n)}},26127:function(e,a,t){var s=t(67294),l=t(14160),n=t(67461);const r="PageTabList",i="PageTabPanel",c="PageTab",o=e=>{var a;let{pageContext:t,children:o}=e;const b=t.frontmatter.slug,u=Array.isArray(o)?o:[o],d=u.find((e=>(0,s.isValidElement)(e)&&e.type.componentName===r)),m=u.find((e=>(0,s.isValidElement)(e)&&e.type.componentName===i)),h=null===(a=d.props)||void 0===a?void 0:a.children.filter((e=>e.type.componentName===c)),p=h.findIndex((e=>b.endsWith(e.props.href))),_=-1===p?0:p,g=0===_?b:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(b);return s.createElement(n.a,{initiallyActiveTab:_},s.createElement(n.a.TabList,{className:"page-tabs-list"},h.map((e=>s.createElement(n.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(`${"/"===e.props.href?g:g+e.props.href}`)},e.props.children)))),h.map(((e,a)=>s.createElement(n.a.TabPanel,{key:e.props.href},_===a?m.props.children:s.createElement("div",null)))))},b=e=>{let{children:a}=e;return s.createElement(n.a.TabList,null,a)};b.componentName=r;const u=e=>{let{href:a,slug:t,children:l}=e;return s.createElement(n.a.Tab,null,l)};u.componentName=c;const d=e=>{let{children:a}=e;return s.createElement(n.a.TabPanel,null,a)};d.componentName=i,o.TabList=b,o.Tab=u,o.TabPanel=d,a.Z=o},57674:function(e,a,t){var s=t(67294),l=t(45422);a.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return s.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},s.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((a=>s.createElement("li",{key:a},s.createElement("span",{className:"status-name"},a),s.createElement("span",null,e[a]))))))}}}]);