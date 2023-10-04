"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[8735,5387],{83428:function(e,a,t){t.d(a,{S:function(){return c}});var n=t(80136),l=t(67294),s=t(7444),r=t(34300),o={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,s.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const i=e=>{let{icon:a}=e;return l.createElement("span",{className:o.statusLabelIcon,"aria-hidden":"true"},a)},c=e=>{var{children:a,className:t,dataTestId:s,type:c="neutral",iconLeft:d}=e,u=(0,n._)(e,["children","className","dataTestId","type","iconLeft"]);return l.createElement("span",Object.assign({className:(0,r.c)(o.statusLabel,o[c],d&&o.statusLabelWithIcon,t),"data-testid":s},u),d&&l.createElement(i,{icon:d}),a)}},12307:function(e,a,t){t.r(a);var n=t(11151),l=t(67294),s=t(11690),r=t(1076);const o=e=>{let{children:a,pageContext:t}=e;return l.createElement(s.default,{pageContext:t},a)};function i(e){const a=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",ul:"ul",li:"li",strong:"strong",code:"code"},(0,n.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(a.h2,{id:"accessibility",style:{position:"relative"}},"Accessibility",l.createElement(a.a,{href:"#accessibility","aria-label":"accessibility permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.h3,{id:"pay-attention-to",style:{position:"relative"}},"Pay attention to",l.createElement(a.a,{href:"#pay-attention-to","aria-label":"pay attention to permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.ul,null,"\n",l.createElement(a.li,null,"HDS Navigation is designed to support many different brand colours. When customising colours, refer to ",l.createElement(r.Z,{href:"/foundation/design-tokens/colour"},"colour guidelines")," to ensure accessibility."),"\n",l.createElement(a.li,null,l.createElement(a.strong,null,"When designing a menu link hierarchy, always think about keyboard and screen reader users.")," First, make sure top-level menu labels are clear, and submenu items contextually fit under it. Next, make sure the menu option order is logical and reasonable. Remember that keyboard users need to manually navigate to each element and thus placing a commonly used menu option last is not optimal."),"\n",l.createElement(a.li,null,"Landmarks are provided by the wrapping ",l.createElement(a.code,null,"<header>")," element, ",l.createElement(a.code,null,"<nav>")," element in the Header.NavigationMenu component and with ",l.createElement(a.code,null,'role="search"')," attribute on the Header.HeaderSearch component. In case you want more landmarks, the Header.UniversalBar, Header.ActionBar and Header.HeaderSearch components support ",l.createElement(a.code,null,"role")," prop which should be used together with a descriptive ",l.createElement(a.code,null,"ariaLabel"),' prop. Just remember that landmarks should be used sparingly in order to avoid "noise" for screen readers and making the overall page layout difficult to understand.'),"\n",l.createElement(a.li,null,"Header.NavigationMenu's dropdowns open only by clicking them. They don't open from hovering with the mouse as it can be difficult to navigate for people with motor and seeing challenges."),"\n",l.createElement(a.li,null,"Only use the elements you need. Avoid clutter."),"\n"))}a.default=function(e){return void 0===e&&(e={}),l.createElement(o,e,l.createElement(i,e))}},11690:function(e,a,t){t.r(a);var n=t(11151),l=t(67294),s=t(83428),r=t(12818),o=t(57674),i=t(89482),c=(t(18607),t(26127));function d(e){const a=Object.assign({h1:"h1",a:"a",span:"span",p:"p"},(0,n.ah)(),e.components);return c.Z||u("PageTabs",!1),c.Z.Tab||u("PageTabs.Tab",!0),c.Z.TabList||u("PageTabs.TabList",!0),c.Z.TabPanel||u("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(a.h1,{id:"header",style:{position:"relative"}},"Header",l.createElement(a.a,{href:"#header","aria-label":"header permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{className:"status-label-description"},l.createElement(s.S,{type:"error"},"Draft"),l.createElement(s.S,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(o.Z)),"\n",l.createElement(i.Z,null,"The Header component is located at the top of the page above the main body content. It provides a place for levels of primary navigation and site-wide actions."),"\n",l.createElement(r.N,{label:"A work in progress!",className:"siteNotification"},l.createElement(a.p,null,"The Header components are a collection of new navigation components the HDS team is currently fine tuning. This means\nthat these components are subject to change. We are open to feedback regarding how they work.")),"\n",l.createElement(c.Z,{pageContext:e.pageContext},l.createElement(c.Z.TabList,null,l.createElement(c.Z.Tab,{href:"/"},"Usage"),l.createElement(c.Z.Tab,{href:"/code"},"Code"),l.createElement(c.Z.Tab,{href:"/accessibility"},"Accessibility")),l.createElement(c.Z.TabPanel,null,e.children)))}function u(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}a.default=function(e){void 0===e&&(e={});const{wrapper:a}=Object.assign({},(0,n.ah)(),e.components);return a?l.createElement(a,e,l.createElement(d,e)):d(e)}},89482:function(e,a,t){var n=t(67294);a.Z=e=>{let{color:a="var(--color-black-90)",size:t="var(--fontsize-body-xl)",style:l={},children:s}=e;return n.createElement("p",{style:{fontSize:t,color:a,maxWidth:600,...l}},s)}},26127:function(e,a,t){var n=t(67294),l=t(14160),s=t(94671);const r="PageTabList",o="PageTabPanel",i="PageTab",c=e=>{var a;let{pageContext:t,children:c}=e;const d=t.frontmatter.slug,u=Array.isArray(c)?c:[c],m=u.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===r)),h=u.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===o)),b=null===(a=m.props)||void 0===a?void 0:a.children.filter((e=>e.type.componentName===i)),p=b.findIndex((e=>d.endsWith(e.props.href))),g=-1===p?0:p,f=0===g?d:(e=>"/"+e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/"))(d);return n.createElement(s.a,{initiallyActiveTab:g},n.createElement(s.a.TabList,{className:"page-tabs-list"},b.map((e=>n.createElement(s.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(""+("/"===e.props.href?f:f+e.props.href))},e.props.children)))),b.map(((e,a)=>n.createElement(s.a.TabPanel,{key:e.props.href},g===a?h.props.children:n.createElement("div",null)))))},d=e=>{let{children:a}=e;return n.createElement(s.a.TabList,null,a)};d.componentName=r;const u=e=>{let{href:a,slug:t,children:l}=e;return n.createElement(s.a.Tab,null,l)};u.componentName=i;const m=e=>{let{children:a}=e;return n.createElement(s.a.TabPanel,null,a)};m.componentName=o,c.TabList=d,c.Tab=u,c.TabPanel=m,a.Z=c},57674:function(e,a,t){var n=t(67294),l=t(45422);a.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return n.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},n.createElement("ul",{class:"status-label-definitions"},Object.keys(e).map((a=>n.createElement("li",{key:a},n.createElement("span",{class:"status-name"},a),n.createElement("span",null,e[a]))))))}}}]);