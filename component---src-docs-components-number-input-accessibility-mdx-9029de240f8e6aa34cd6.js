"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[4428,198],{83428:function(e,t,a){a.d(t,{S:function(){return o}});var l=a(80136),n=a(67294),s=a(7444),r=a(34300),i={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,s.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const c=e=>{let{icon:t}=e;return n.createElement("span",{className:i.statusLabelIcon,"aria-hidden":"true"},t)},o=e=>{var{children:t,className:a,dataTestId:s,type:o="neutral",iconLeft:u}=e,d=(0,l._)(e,["children","className","dataTestId","type","iconLeft"]);return n.createElement("span",Object.assign({className:(0,r.c)(i.statusLabel,i[o],u&&i.statusLabelWithIcon,a),"data-testid":s},d),u&&n.createElement(c,{icon:u}),t)}},4965:function(e,t,a){a.r(t);var l=a(11151),n=a(67294),s=a(11757);const r=e=>{let{children:t,pageContext:a}=e;return n.createElement(s.default,{pageContext:a},t)};function i(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",ul:"ul",li:"li",code:"code"},(0,l.ah)(),e.components);return n.createElement(n.Fragment,null,n.createElement(t.h2,{id:"accessibility",style:{position:"relative"}},"Accessibility",n.createElement(t.a,{href:"#accessibility","aria-label":"accessibility permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.h3,{id:"pay-attention-to",style:{position:"relative"}},"Pay attention to",n.createElement(t.a,{href:"#pay-attention-to","aria-label":"pay attention to permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.ul,null,"\n",n.createElement(t.li,null,"HDS number input allows the user to input the date manually without using stepper actions. Whenever you require the user to input numbers, you should also allow manual input."),"\n",n.createElement(t.li,null,"If steppers are used, provide descriptive aria labels for both increase and decrease actions by using ",n.createElement(t.code,null,"minusStepButtonAriaLabel")," and ",n.createElement(t.code,null,"plusStepButtonAriaLabel")," props."),"\n",n.createElement(t.li,null,"If the number needs to follow a specific format, remember to specify it in the assistive text."),"\n",n.createElement(t.li,null,"Placeholders in number inputs should be avoided. Different screen readers announce placeholders in different ways. It can be very difficult for a screen reader user to differentiate the placeholder from the actual value."),"\n"))}t.default=function(e){return void 0===e&&(e={}),n.createElement(r,e,n.createElement(i,e))}},11757:function(e,t,a){a.r(t);var l=a(11151),n=a(67294),s=a(57674),r=a(89482),i=(a(18607),a(26127)),c=a(55725);function o(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,l.ah)(),e.components);return i.Z||u("PageTabs",!1),i.Z.Tab||u("PageTabs.Tab",!0),i.Z.TabList||u("PageTabs.TabList",!0),i.Z.TabPanel||u("PageTabs.TabPanel",!0),n.createElement(n.Fragment,null,n.createElement(t.h1,{id:"numberinput",style:{position:"relative"}},"NumberInput",n.createElement(t.a,{href:"#numberinput","aria-label":"numberinput permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement("div",{class:"status-label-description"},n.createElement(c.Z,{type:"info"},"Stable"),n.createElement(c.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),n.createElement(s.Z)),"\n",n.createElement(r.Z,null,"  A number input allows the user to enter numeric values. It also features optional steppers for increasing or decreasing the value by a set amount."),"\n",n.createElement(i.Z,{pageContext:e.pageContext},n.createElement(i.Z.TabList,null,n.createElement(i.Z.Tab,{href:"/"},"Usage"),n.createElement(i.Z.Tab,{href:"/code"},"Code"),n.createElement(i.Z.Tab,{href:"/accessibility"},"Accessibility")),n.createElement(i.Z.TabPanel,null,e.children)))}function u(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?n.createElement(t,e,n.createElement(o,e)):o(e)}},89482:function(e,t,a){var l=a(67294),n=a(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:s={},children:r}=e;return l.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...s}},(0,n.g)(r))}},26127:function(e,t,a){var l=a(67294),n=a(14160),s=a(18261),r=a(42972);const i="PageTabList",c="PageTabPanel",o="PageTab",u=e=>{var t;let{pageContext:a,children:u}=e;const d=a.frontmatter.slug,b=Array.isArray(u)?u:[u],m=b.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===i)),h=b.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===c)),p=null===(t=m.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===o)),f=p.findIndex((e=>d.endsWith(e.props.href))),_=-1===f?0:f,g=0===_?d:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(d);return l.createElement(s.a,{initiallyActiveTab:_},l.createElement(s.a.TabList,{className:"page-tabs-list"},p.map((e=>l.createElement(s.a.Tab,{key:e.props.href,onClick:()=>(0,n.navigate)(`${"/"===e.props.href?g:g+e.props.href}`)},(0,r.g)(e.props.children))))),p.map(((e,t)=>l.createElement(s.a.TabPanel,{key:e.props.href},_===t?h.props.children:l.createElement("div",null)))))},d=e=>{let{children:t}=e;return l.createElement(s.a.TabList,null,t)};d.componentName=i;const b=e=>{let{href:t,slug:a,children:n}=e;return l.createElement(s.a.Tab,null," ",n)};b.componentName=o;const m=e=>{let{children:t}=e;return l.createElement(s.a.TabPanel,null,t)};m.componentName=c,u.TabList=d,u.Tab=b,u.TabPanel=m,t.Z=u},55725:function(e,t,a){var l=a(67294),n=a(83428),s=a(42972);t.Z=e=>{let{children:t,...a}=e;return l.createElement(n.S,a,(0,s.g)(t))}},57674:function(e,t,a){var l=a(67294),n=a(45422);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return l.createElement(n.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},l.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>l.createElement("li",{key:t},l.createElement("span",{className:"status-name"},t),l.createElement("span",null,e[t]))))))}}}]);