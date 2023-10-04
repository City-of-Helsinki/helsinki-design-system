"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[7383,5165],{83428:function(e,t,a){a.d(t,{S:function(){return c}});var l=a(80136),s=a(67294),n=a(7444),r=a(34300),o={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,n.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const i=e=>{let{icon:t}=e;return s.createElement("span",{className:o.statusLabelIcon,"aria-hidden":"true"},t)},c=e=>{var{children:t,className:a,dataTestId:n,type:c="neutral",iconLeft:u}=e,d=(0,l._)(e,["children","className","dataTestId","type","iconLeft"]);return s.createElement("span",Object.assign({className:(0,r.c)(o.statusLabel,o[c],u&&o.statusLabelWithIcon,a),"data-testid":n},d),u&&s.createElement(i,{icon:u}),t)}},99807:function(e,t,a){a.r(t);var l=a(11151),s=a(67294),n=a(38516);const r=e=>{let{children:t,pageContext:a}=e;return s.createElement(n.default,{pageContext:a},t)};function o(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",ul:"ul",li:"li",code:"code"},(0,l.ah)(),e.components);return s.createElement(s.Fragment,null,s.createElement(t.h2,{id:"accessibility",style:{position:"relative"}},"Accessibility",s.createElement(t.a,{href:"#accessibility","aria-label":"accessibility permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.h3,{id:"pay-attention-to",style:{position:"relative"}},"Pay attention to",s.createElement(t.a,{href:"#pay-attention-to","aria-label":"pay attention to permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"Even though HDS Tooltip does not include a visual title, one must be included for screen readers via using ",s.createElement(t.code,null,"aria-label"),'. The label can be as simple as "Info" but it can also feature more detailed description such as "More information about filling your personal details".'),"\n",s.createElement(t.li,null,"If a Tooltip contains a link, always open them to a new window, so that the process of filling the form is not interrupted."),"\n",s.createElement(t.li,null,"Do not make the tooltip open on hover. The user should be able to select the text inside the tooltip element."),"\n"))}t.default=function(e){return void 0===e&&(e={}),s.createElement(r,e,s.createElement(o,e))}},38516:function(e,t,a){a.r(t);var l=a(11151),s=a(67294),n=a(83428),r=a(57674),o=a(89482),i=(a(18607),a(26127));function c(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,l.ah)(),e.components);return i.Z||u("PageTabs",!1),i.Z.Tab||u("PageTabs.Tab",!0),i.Z.TabList||u("PageTabs.TabList",!0),i.Z.TabPanel||u("PageTabs.TabPanel",!0),s.createElement(s.Fragment,null,s.createElement(t.h1,{id:"tooltip",style:{position:"relative"}},"Tooltip",s.createElement(t.a,{href:"#tooltip","aria-label":"tooltip permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement("div",{class:"status-label-description"},s.createElement(n.S,{type:"info"},"Stable"),s.createElement(n.S,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),s.createElement(r.Z)),"\n",s.createElement(o.Z,null,"Tooltips are used to present context or background information to the user."),"\n",s.createElement(i.Z,{pageContext:e.pageContext},s.createElement(i.Z.TabList,null,s.createElement(i.Z.Tab,{href:"/"},"Usage"),s.createElement(i.Z.Tab,{href:"/code"},"Code"),s.createElement(i.Z.Tab,{href:"/accessibility"},"Accessibility")),s.createElement(i.Z.TabPanel,null,e.children)))}function u(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?s.createElement(t,e,s.createElement(c,e)):c(e)}},89482:function(e,t,a){var l=a(67294);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:s={},children:n}=e;return l.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...s}},n)}},26127:function(e,t,a){var l=a(67294),s=a(14160),n=a(94671);const r="PageTabList",o="PageTabPanel",i="PageTab",c=e=>{var t;let{pageContext:a,children:c}=e;const u=a.frontmatter.slug,d=Array.isArray(c)?c:[c],b=d.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===r)),h=d.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===o)),m=null===(t=b.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===i)),p=m.findIndex((e=>u.endsWith(e.props.href))),f=-1===p?0:p,_=0===f?u:(e=>"/"+e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/"))(u);return l.createElement(n.a,{initiallyActiveTab:f},l.createElement(n.a.TabList,{className:"page-tabs-list"},m.map((e=>l.createElement(n.a.Tab,{key:e.props.href,onClick:()=>(0,s.navigate)(""+("/"===e.props.href?_:_+e.props.href))},e.props.children)))),m.map(((e,t)=>l.createElement(n.a.TabPanel,{key:e.props.href},f===t?h.props.children:l.createElement("div",null)))))},u=e=>{let{children:t}=e;return l.createElement(n.a.TabList,null,t)};u.componentName=r;const d=e=>{let{href:t,slug:a,children:s}=e;return l.createElement(n.a.Tab,null,s)};d.componentName=i;const b=e=>{let{children:t}=e;return l.createElement(n.a.TabPanel,null,t)};b.componentName=o,c.TabList=u,c.Tab=d,c.TabPanel=b,t.Z=c},57674:function(e,t,a){var l=a(67294),s=a(45422);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return l.createElement(s.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},l.createElement("ul",{class:"status-label-definitions"},Object.keys(e).map((t=>l.createElement("li",{key:t},l.createElement("span",{class:"status-name"},t),l.createElement("span",null,e[t]))))))}}}]);