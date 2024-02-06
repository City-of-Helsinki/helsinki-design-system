"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[4442,4201],{99123:function(e,t,a){a.d(t,{S:function(){return c}});var s=a(80136),n=a(67294),l=(a(7568),a(7444)),r=a(34300),i={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,l.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const o=e=>{let{icon:t}=e;return n.createElement("span",{className:i.statusLabelIcon,"aria-hidden":"true"},t)},c=e=>{var{children:t,className:a,dataTestId:l,type:c="neutral",iconLeft:d}=e,p=(0,s._)(e,["children","className","dataTestId","type","iconLeft"]);return n.createElement("span",Object.assign({className:(0,r.c)(i.statusLabel,i[c],d&&i.statusLabelWithIcon,a),"data-testid":l},p),d&&n.createElement(o,{icon:d}),t)}},5184:function(e,t,a){a.r(t);var s=a(11151),n=a(67294),l=a(60024),r=a(12224);const i=e=>{let{children:t,pageContext:a}=e;return n.createElement(r.default,{pageContext:a},t)};function o(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",ul:"ul",li:"li",strong:"strong",code:"code",h4:"h4",p:"p"},(0,s.ah)(),e.components),{PlaygroundPreview:a}=t;return a||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("PlaygroundPreview",!0),n.createElement(n.Fragment,null,n.createElement(t.h2,{id:"usage",style:{position:"relative"}},"Usage",n.createElement(t.a,{href:"#usage","aria-label":"usage permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.h3,{id:"example",style:{position:"relative"}},"Example",n.createElement(t.a,{href:"#example","aria-label":"example permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(a,null,n.createElement(l.bE,{numberedList:!0,title:"Numbered step by step component",helpText:"Numbered list is suitable for case where the order of the steps is important.",steps:[{title:"Step 1 title",description:"Here you can describe the step in detail. Keep the text compact so the user gets the big picture of the whole process and its steps easily.",buttons:[{children:"Example button",href:"https://hel.fi",key:"button"}]},{title:"Step 2 title",description:"Step description.",links:[{children:"Example link",href:"https://hel.fi",key:"link"}]},{title:"Step 3 title",description:"Step description."}]})),"\n",n.createElement(t.h3,{id:"principles",style:{position:"relative"}},"Principles",n.createElement(t.a,{href:"#principles","aria-label":"principles permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.ul,null,"\n",n.createElement(t.li,null,"The purpose of the StepByStep component is to provide an easy overall picture of a process."),"\n",n.createElement(t.li,null,n.createElement(t.strong,null,"Every step should have a title.")),"\n",n.createElement(t.li,null,"Step description is optional. The description should be compact, preferably one sentence long and two at the maximum. This is because the steps should provide a quick way to understand the whole process and too long texts can hinder that experience."),"\n",n.createElement(t.li,null,"A step can have a button as a call to action, e.g. making a phone call. But a button should not direct to another site."),"\n",n.createElement(t.li,null,"A step can have a link to provide additional information."),"\n",n.createElement(t.li,null,"The button and the link should relate to the step's contents. We recommend having only one button or a link per step, but sometimes it could be reasonable to have two. Before adding a second button or a link, consider whether the step should be divided into two steps. If you add two buttons, make the second one ",n.createElement(t.code,null,'variant="secondary"'),"."),"\n"),"\n",n.createElement(t.h3,{id:"variations",style:{position:"relative"}},"Variations",n.createElement(t.a,{href:"#variations","aria-label":"variations permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.h4,{id:"default",style:{position:"relative"}},"Default",n.createElement(t.a,{href:"#default","aria-label":"default permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.p,null,"The unnumbered list is useful when the order of the steps is less important and they form more of a guideline."),"\n",n.createElement(a,null,n.createElement(l.bE,{title:"Unnumbered step by step component",helpText:"The unnumbered list is useful when the order of the steps is less important and they form more of a guideline.",steps:[{title:"Step 1 title",description:"Here you can describe the step in detail. Keep the text compact so the user gets the big picture of the whole process and its steps easily.",buttons:[{children:"Example button",href:"https://hel.fi",key:"button"}]},{title:"Step 2 title",description:"Step description.",links:[{children:"Example link",href:"https://hel.fi",key:"link"}]},{title:"Step 3 title",description:"Step description."}]})),"\n",n.createElement(t.h4,{id:"numbered-list",style:{position:"relative"}},"Numbered list",n.createElement(t.a,{href:"#numbered-list","aria-label":"numbered list permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.p,null,"Numbered list is suitable for cases where the order of the steps is important."),"\n",n.createElement(a,null,n.createElement(l.bE,{numberedList:!0,title:"Numbered step by step component",helpText:"Numbered list is suitable for cases where the order of the steps is important.",steps:[{title:"Step 1 title",description:"Here you can describe the step in detail. Keep the text compact so the user gets the big picture of the whole process and its steps easily.",buttons:[{children:"Example button",href:"https://hel.fi",key:"button"}]},{title:"Step 2 title",description:"Step description.",links:[{children:"Example link",href:"https://hel.fi",key:"link"}]},{title:"Step 3 title",description:"Step description."}]})))}t.default=function(e){return void 0===e&&(e={}),n.createElement(i,e,n.createElement(o,e))}},12224:function(e,t,a){a.r(t);var s=a(11151),n=a(67294),l=a(57674),r=a(89482),i=a(26127),o=a(55725);function c(e){const t=Object.assign({h1:"h1",a:"a",span:"span",p:"p"},(0,s.ah)(),e.components);return i.Z||d("PageTabs",!1),i.Z.Tab||d("PageTabs.Tab",!0),i.Z.TabList||d("PageTabs.TabList",!0),i.Z.TabPanel||d("PageTabs.TabPanel",!0),n.createElement(n.Fragment,null,n.createElement(t.h1,{id:"stepbystep",style:{position:"relative"}},"StepByStep",n.createElement(t.a,{href:"#stepbystep","aria-label":"stepbystep permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement("div",{className:"status-label-description"},n.createElement(o.Z,{type:"alert"},"Beta"),n.createElement(o.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),n.createElement(l.Z)),"\n",n.createElement(r.Z,null,"StepByStep component is useful for visualising a process in steps. The component supports numbered list for cases where the steps must be completed in a specific order, and unnumbered list for cases where the steps are more of a guideline."),"\n",n.createElement(i.Z,{pageContext:e.pageContext},n.createElement(i.Z.TabList,null,n.createElement(i.Z.Tab,{href:"/"},n.createElement(t.p,null,"Usage")),n.createElement(i.Z.Tab,{href:"/code"},n.createElement(t.p,null,"Code")),n.createElement(i.Z.Tab,{href:"/accessibility"},n.createElement(t.p,null,"Accessibility"))),n.createElement(i.Z.TabPanel,null,e.children)))}function d(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?n.createElement(t,e,n.createElement(c,e)):c(e)}},89482:function(e,t,a){var s=a(67294),n=a(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:l={},children:r}=e;return s.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...l}},(0,n.g)(r))}},26127:function(e,t,a){var s=a(67294),n=a(14160),l=a(21335),r=a(42972);const i="PageTabList",o="PageTabPanel",c="PageTab",d=e=>{var t;let{pageContext:a,children:d}=e;const p=a.frontmatter.slug,h=Array.isArray(d)?d:[d],u=h.find((e=>(0,s.isValidElement)(e)&&e.type.componentName===i)),m=h.find((e=>(0,s.isValidElement)(e)&&e.type.componentName===o)),b=null===(t=u.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===c)),f=b.findIndex((e=>p.endsWith(e.props.href))),g=-1===f?0:f,E=0===g?p:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(p);return s.createElement(l.a,{initiallyActiveTab:g},s.createElement(l.a.TabList,{className:"page-tabs-list"},b.map((e=>s.createElement(l.a.Tab,{key:e.props.href,onClick:()=>(0,n.navigate)(`${"/"===e.props.href?E:E+e.props.href}`)},(0,r.g)(e.props.children))))),b.map(((e,t)=>s.createElement(l.a.TabPanel,{key:e.props.href},g===t?m.props.children:s.createElement("div",null)))))},p=e=>{let{children:t}=e;return s.createElement(l.a.TabList,null,t)};p.componentName=i;const h=e=>{let{href:t,slug:a,children:n}=e;return s.createElement(l.a.Tab,null," ",n)};h.componentName=c;const u=e=>{let{children:t}=e;return s.createElement(l.a.TabPanel,null,t)};u.componentName=o,d.TabList=p,d.Tab=h,d.TabPanel=u,t.Z=d},55725:function(e,t,a){var s=a(67294),n=a(99123),l=a(42972);t.Z=e=>{let{children:t,...a}=e;return s.createElement(n.S,a,(0,l.g)(t))}},57674:function(e,t,a){var s=a(67294),n=a(37106);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return s.createElement(n.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},s.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>s.createElement("li",{key:t},s.createElement("span",{className:"status-name"},t),s.createElement("span",null,e[t]))))))}}}]);