"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[328,3776],{99123:function(e,t,a){a.d(t,{S:function(){return c}});var n=a(80136),s=a(67294),l=(a(7568),a(7444)),r=a(34300),i={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,l.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const o=e=>{let{icon:t}=e;return s.createElement("span",{className:i.statusLabelIcon,"aria-hidden":"true"},t)},c=e=>{var{children:t,className:a,dataTestId:l,type:c="neutral",iconLeft:u}=e,d=(0,n._)(e,["children","className","dataTestId","type","iconLeft"]);return s.createElement("span",Object.assign({className:(0,r.c)(i.statusLabel,i[c],u&&i.statusLabelWithIcon,a),"data-testid":l},d),u&&s.createElement(o,{icon:u}),t)}},68820:function(e,t,a){a.r(t);var n=a(11151),s=a(67294),l=a(80699),r=a(24055),i=a(1076);const o=e=>{let{children:t,pageContext:a}=e;return s.createElement(r.default,{pageContext:a},t)};function c(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",ul:"ul",li:"li",strong:"strong",code:"code",em:"em"},(0,n.ah)(),e.components);return s.createElement(s.Fragment,null,s.createElement(t.h2,{id:"accessibility",style:{position:"relative"}},"Accessibility",s.createElement(t.a,{href:"#accessibility","aria-label":"accessibility permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.h3,{id:"pay-attention-to",style:{position:"relative"}},"Pay attention to",s.createElement(t.a,{href:"#pay-attention-to","aria-label":"pay attention to permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"The colour contrast between the loading spinner and its background must comply with ",s.createElement(l.Z,{href:"https://www.w3.org/TR/WCAG21/#contrast-minimum"},"AA Level contrast ratios"),". You can find more information about accessible colour combinations in ",s.createElement(i.Z,{href:"/foundation/design-tokens/colour"},"Colour design token documentation"),"."),"\n",s.createElement(t.li,null,"Multiple simultaneous loading spinners can be very confusing for assistive technologies. ",s.createElement(t.strong,null,"HDS Loading spinner React component is built in a way that only reads one alert for screen readers")," - even if there were multiple on the screen. If you are unable to use this feature or it fits your needs poorly (e.g. your project does not use JavaScript), please consider using only one spinner at a time and giving that one spinner the most accurate possible description."),"\n",s.createElement(t.li,null,"HDS Loading spinner must be given labels to describe the loading event. Use ",s.createElement(t.code,null,"loadingText")," prop for description for loading and ",s.createElement(t.code,null,"loadingFinishedText")," prop for description for loading finishing.","\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,'Descriptions should not be too detailed. You should use generic descriptions such as "',s.createElement(t.em,null,"The page content is loading"),'" and "',s.createElement(t.em,null,"The page content loading was finished"),'".'),"\n",s.createElement(t.li,null,"If there are multiple spinners on the screen, they all must have identical descriptions. Remember that the description is read to screen readers only once."),"\n",s.createElement(t.li,null,"If the spinner also has a visual label, it can be hidden from assistive technologies to avoid description to be read twice."),"\n"),"\n"),"\n"))}t.default=function(e){return void 0===e&&(e={}),s.createElement(o,e,s.createElement(c,e))}},24055:function(e,t,a){a.r(t);var n=a(11151),s=a(67294),l=a(57674),r=a(89482),i=(a(18607),a(26127)),o=a(55725);function c(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,n.ah)(),e.components);return i.Z||u("PageTabs",!1),i.Z.Tab||u("PageTabs.Tab",!0),i.Z.TabList||u("PageTabs.TabList",!0),i.Z.TabPanel||u("PageTabs.TabPanel",!0),s.createElement(s.Fragment,null,s.createElement(t.h1,{id:"loadingspinner",style:{position:"relative"}},"LoadingSpinner",s.createElement(t.a,{href:"#loadingspinner","aria-label":"loadingspinner permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement("div",{class:"status-label-description"},s.createElement(o.Z,{type:"info"},"Stable"),s.createElement(o.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),s.createElement(l.Z)),"\n",s.createElement(r.Z,null,"Loading spinner is used for notifying users that their action is being processed or data retrieved from server."),"\n",s.createElement(i.Z,{pageContext:e.pageContext},s.createElement(i.Z.TabList,null,s.createElement(i.Z.Tab,{href:"/"},"Usage"),s.createElement(i.Z.Tab,{href:"/code"},"Code"),s.createElement(i.Z.Tab,{href:"/accessibility"},"Accessibility"),s.createElement(i.Z.Tab,{href:"/customisation"},"Customisation")),s.createElement(i.Z.TabPanel,null,e.children)))}function u(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?s.createElement(t,e,s.createElement(c,e)):c(e)}},89482:function(e,t,a){var n=a(67294),s=a(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:l={},children:r}=e;return n.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...l}},(0,s.g)(r))}},26127:function(e,t,a){var n=a(67294),s=a(14160),l=a(21335),r=a(42972);const i="PageTabList",o="PageTabPanel",c="PageTab",u=e=>{var t;let{pageContext:a,children:u}=e;const d=a.frontmatter.slug,m=Array.isArray(u)?u:[u],b=m.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===i)),h=m.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===o)),p=null===(t=b.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===c)),g=p.findIndex((e=>d.endsWith(e.props.href))),f=-1===g?0:g,_=0===f?d:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(d);return n.createElement(l.a,{initiallyActiveTab:f},n.createElement(l.a.TabList,{className:"page-tabs-list"},p.map((e=>n.createElement(l.a.Tab,{key:e.props.href,onClick:()=>(0,s.navigate)(`${"/"===e.props.href?_:_+e.props.href}`)},(0,r.g)(e.props.children))))),p.map(((e,t)=>n.createElement(l.a.TabPanel,{key:e.props.href},f===t?h.props.children:n.createElement("div",null)))))},d=e=>{let{children:t}=e;return n.createElement(l.a.TabList,null,t)};d.componentName=i;const m=e=>{let{href:t,slug:a,children:s}=e;return n.createElement(l.a.Tab,null," ",s)};m.componentName=c;const b=e=>{let{children:t}=e;return n.createElement(l.a.TabPanel,null,t)};b.componentName=o,u.TabList=d,u.Tab=m,u.TabPanel=b,t.Z=u},55725:function(e,t,a){var n=a(67294),s=a(99123),l=a(42972);t.Z=e=>{let{children:t,...a}=e;return n.createElement(s.S,a,(0,l.g)(t))}},57674:function(e,t,a){var n=a(67294),s=a(37106);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return n.createElement(s.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},n.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>n.createElement("li",{key:t},n.createElement("span",{className:"status-name"},t),n.createElement("span",null,e[t]))))))}}}]);