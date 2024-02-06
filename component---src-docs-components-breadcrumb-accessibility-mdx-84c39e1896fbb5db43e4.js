"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[6064,2291],{99123:function(e,t,a){a.d(t,{S:function(){return o}});var l=a(80136),s=a(67294),n=(a(7568),a(7444)),r=a(34300),i={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,n.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const c=e=>{let{icon:t}=e;return s.createElement("span",{className:i.statusLabelIcon,"aria-hidden":"true"},t)},o=e=>{var{children:t,className:a,dataTestId:n,type:o="neutral",iconLeft:u}=e,b=(0,l._)(e,["children","className","dataTestId","type","iconLeft"]);return s.createElement("span",Object.assign({className:(0,r.c)(i.statusLabel,i[o],u&&i.statusLabelWithIcon,a),"data-testid":n},b),u&&s.createElement(c,{icon:u}),t)}},42333:function(e,t,a){a.r(t);var l=a(11151),s=a(67294),n=a(50275);const r=e=>{let{children:t,pageContext:a}=e;return s.createElement(n.default,{pageContext:a},t)};function i(e){const t=Object.assign({h2:"h2",a:"a",span:"span",p:"p",h3:"h3",ul:"ul",li:"li",code:"code"},(0,l.ah)(),e.components);return s.createElement(s.Fragment,null,s.createElement(t.h2,{id:"accessibility",style:{position:"relative"}},"Accessibility",s.createElement(t.a,{href:"#accessibility","aria-label":"accessibility permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"The HDS breadcrumb component is a native HTML list with native HTML links."),"\n",s.createElement(t.h3,{id:"pay-attention-to",style:{position:"relative"}},"Pay attention to",s.createElement(t.a,{href:"#pay-attention-to","aria-label":"pay attention to permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"The last element should have the attribute ",s.createElement(t.code,null,'aria-current="true"')," if it is the current page. Automatically added in React."),"\n",s.createElement(t.li,null,"Nav-element must have an ",s.createElement(t.code,null,"aria-label"),"."),"\n"))}t.default=function(e){return void 0===e&&(e={}),s.createElement(r,e,s.createElement(i,e))}},50275:function(e,t,a){a.r(t);var l=a(11151),s=a(67294),n=a(57674),r=a(89482),i=(a(18607),a(26127)),c=a(55725);function o(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,l.ah)(),e.components);return i.Z||u("PageTabs",!1),i.Z.Tab||u("PageTabs.Tab",!0),i.Z.TabList||u("PageTabs.TabList",!0),i.Z.TabPanel||u("PageTabs.TabPanel",!0),s.createElement(s.Fragment,null,s.createElement(t.h1,{id:"breadcrumb",style:{position:"relative"}},"Breadcrumb",s.createElement(t.a,{href:"#breadcrumb","aria-label":"breadcrumb permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement("div",{class:"status-label-description"},s.createElement(c.Z,{type:"alert"},"Beta"),s.createElement(c.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),s.createElement(n.Z)),"\n",s.createElement(r.Z,null,"Breadcrumb is a navigational element that provides links back to each previous page the user navigated through and\nshows the user's current location on a website."),"\n",s.createElement(i.Z,{pageContext:e.pageContext},s.createElement(i.Z.TabList,null,s.createElement(i.Z.Tab,{href:"/"},"Usage"),s.createElement(i.Z.Tab,{href:"/code"},"Code"),s.createElement(i.Z.Tab,{href:"/accessibility"},"Accessibility"),s.createElement(i.Z.Tab,{href:"/customisation"},"Customisation")),s.createElement(i.Z.TabPanel,null,e.children)))}function u(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?s.createElement(t,e,s.createElement(o,e)):o(e)}},89482:function(e,t,a){var l=a(67294),s=a(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:n={},children:r}=e;return l.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...n}},(0,s.g)(r))}},26127:function(e,t,a){var l=a(67294),s=a(14160),n=a(21335),r=a(42972);const i="PageTabList",c="PageTabPanel",o="PageTab",u=e=>{var t;let{pageContext:a,children:u}=e;const b=a.frontmatter.slug,d=Array.isArray(u)?u:[u],m=d.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===i)),h=d.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===c)),p=null===(t=m.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===o)),_=p.findIndex((e=>b.endsWith(e.props.href))),g=-1===_?0:_,f=0===g?b:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(b);return l.createElement(n.a,{initiallyActiveTab:g},l.createElement(n.a.TabList,{className:"page-tabs-list"},p.map((e=>l.createElement(n.a.Tab,{key:e.props.href,onClick:()=>(0,s.navigate)(`${"/"===e.props.href?f:f+e.props.href}`)},(0,r.g)(e.props.children))))),p.map(((e,t)=>l.createElement(n.a.TabPanel,{key:e.props.href},g===t?h.props.children:l.createElement("div",null)))))},b=e=>{let{children:t}=e;return l.createElement(n.a.TabList,null,t)};b.componentName=i;const d=e=>{let{href:t,slug:a,children:s}=e;return l.createElement(n.a.Tab,null," ",s)};d.componentName=o;const m=e=>{let{children:t}=e;return l.createElement(n.a.TabPanel,null,t)};m.componentName=c,u.TabList=b,u.Tab=d,u.TabPanel=m,t.Z=u},55725:function(e,t,a){var l=a(67294),s=a(99123),n=a(42972);t.Z=e=>{let{children:t,...a}=e;return l.createElement(s.S,a,(0,n.g)(t))}},57674:function(e,t,a){var l=a(67294),s=a(37106);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return l.createElement(s.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},l.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>l.createElement("li",{key:t},l.createElement("span",{className:"status-name"},t),l.createElement("span",null,e[t]))))))}}}]);