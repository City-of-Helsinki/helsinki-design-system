"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[6047,4404,1529],{99123:function(e,t,a){a.d(t,{S:function(){return c}});var n=a(80136),s=a(67294),l=(a(7568),a(7444)),r=a(34300),o={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,l.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const i=e=>{let{icon:t}=e;return s.createElement("span",{className:o.statusLabelIcon,"aria-hidden":"true"},t)},c=e=>{var{children:t,className:a,dataTestId:l,type:c="neutral",iconLeft:u}=e,b=(0,n._)(e,["children","className","dataTestId","type","iconLeft"]);return s.createElement("span",Object.assign({className:(0,r.c)(o.statusLabel,o[c],u&&o.statusLabelWithIcon,a),"data-testid":l},b),u&&s.createElement(i,{icon:u}),t)}},83404:function(e,t,a){a.r(t);var n=a(11151),s=a(67294),l=a(35972);const r=e=>{let{children:t,pageContext:a}=e;return s.createElement(l.default,{pageContext:a},t)};function o(e){const t=Object.assign({h2:"h2",a:"a",span:"span",p:"p"},(0,n.ah)(),e.components),{InternalLink:a}=t;return a||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("InternalLink",!0),s.createElement(s.Fragment,null,s.createElement(t.h2,{id:"accessibility",style:{position:"relative"}},"Accessibility",s.createElement(t.a,{href:"#accessibility","aria-label":"accessibility permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"Currently, the OIDC provider, Tunnistamo, does not inform users that they are being redirected and will be redirected back."),"\n",s.createElement(t.p,null,"The ",s.createElement(a,{href:"/components/login/usage/#loginbutton"},"LoginButton")," component shows only errors and does not inform about the redirection because Tunnistamo should do it."))}t.default=function(e){return void 0===e&&(e={}),s.createElement(r,e,s.createElement(o,e))}},35972:function(e,t,a){a.r(t);var n=a(11151),s=a(67294),l=a(57674),r=a(89482),o=a(26127),i=a(77884),c=a(55725);function u(e){const t=Object.assign({h1:"h1",a:"a",span:"span",p:"p"},(0,n.ah)(),e.components);return o.Z||b("PageTabs",!1),o.Z.Tab||b("PageTabs.Tab",!0),o.Z.TabList||b("PageTabs.TabList",!0),o.Z.TabPanel||b("PageTabs.TabPanel",!0),s.createElement(s.Fragment,null,s.createElement(t.h1,{id:"login",style:{position:"relative"}},"Login",s.createElement(t.a,{href:"#login","aria-label":"login permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement("div",{className:"status-label-description"},s.createElement(c.Z,{type:"error"},"Draft"),s.createElement(c.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),s.createElement(l.Z)),"\n",s.createElement(r.Z,null,"Login components include React components, context and hooks for handling user authorisation, api tokens and session polling."),"\n",s.createElement(i.Z,{label:"A work in progress!",className:"siteNotification"},s.createElement(t.p,null,"The HDS Login system is a set of components the HDS team is currently making. This means\nthat this component is subject to change, and we don't recommend using it in production.")),"\n",s.createElement(o.Z,{pageContext:e.pageContext},s.createElement(o.Z.TabList,null,s.createElement(o.Z.Tab,{href:"/"},"Intro"),s.createElement(o.Z.Tab,{href:"/usage"},"Usage"),s.createElement(o.Z.Tab,{href:"/api"},"API"),s.createElement(o.Z.Tab,{href:"/accessibility"},"Accessibility"),s.createElement(o.Z.Tab,{href:"/customisation"},"Customisation")),s.createElement(o.Z.TabPanel,null,e.children)))}function b(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?s.createElement(t,e,s.createElement(u,e)):u(e)}},89482:function(e,t,a){var n=a(67294),s=a(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:l={},children:r}=e;return n.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...l}},(0,s.g)(r))}},77884:function(e,t,a){var n=a(67294),s=a(60577),l=a(42972);t.Z=e=>{let{children:t,...a}=e;return n.createElement(s.N,a,(0,l.g)(t))}},26127:function(e,t,a){var n=a(67294),s=a(14160),l=a(21335),r=a(42972);const o="PageTabList",i="PageTabPanel",c="PageTab",u=e=>{var t;let{pageContext:a,children:u}=e;const b=a.frontmatter.slug,d=Array.isArray(u)?u:[u],m=d.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===o)),h=d.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===i)),p=null===(t=m.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===c)),g=p.findIndex((e=>b.endsWith(e.props.href))),f=-1===g?0:g,_=0===f?b:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(b);return n.createElement(l.a,{initiallyActiveTab:f},n.createElement(l.a.TabList,{className:"page-tabs-list"},p.map((e=>n.createElement(l.a.Tab,{key:e.props.href,onClick:()=>(0,s.navigate)(`${"/"===e.props.href?_:_+e.props.href}`)},(0,r.g)(e.props.children))))),p.map(((e,t)=>n.createElement(l.a.TabPanel,{key:e.props.href},f===t?h.props.children:n.createElement("div",null)))))},b=e=>{let{children:t}=e;return n.createElement(l.a.TabList,null,t)};b.componentName=o;const d=e=>{let{href:t,slug:a,children:s}=e;return n.createElement(l.a.Tab,null," ",s)};d.componentName=c;const m=e=>{let{children:t}=e;return n.createElement(l.a.TabPanel,null,t)};m.componentName=i,u.TabList=b,u.Tab=d,u.TabPanel=m,t.Z=u},55725:function(e,t,a){var n=a(67294),s=a(99123),l=a(42972);t.Z=e=>{let{children:t,...a}=e;return n.createElement(s.S,a,(0,l.g)(t))}},57674:function(e,t,a){var n=a(67294),s=a(37106);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return n.createElement(s.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},n.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>n.createElement("li",{key:t},n.createElement("span",{className:"status-name"},t),n.createElement("span",null,e[t]))))))}}}]);