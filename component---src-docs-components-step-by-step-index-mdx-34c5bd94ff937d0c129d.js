(self.webpackChunksite=self.webpackChunksite||[]).push([[4442,4201],{71928:function(e,t,a){var n=a(88799),s=a(85638),l=Object.prototype.hasOwnProperty;e.exports=function(e,t,a){var r=e[t];l.call(e,t)&&s(r,a)&&(void 0!==a||t in e)||n(e,t,a)}},88799:function(e,t,a){var n=a(42630);e.exports=function(e,t,a){"__proto__"==t&&n?n(e,t,{configurable:!0,enumerable:!0,value:a,writable:!0}):e[t]=a}},59464:function(e,t,a){var n=a(11611),s=a(56016),l=a(21586),r=Object.prototype.hasOwnProperty;e.exports=function(e){if(!n(e))return l(e);var t=s(e),a=[];for(var i in e)("constructor"!=i||!t&&r.call(e,i))&&a.push(i);return a}},42630:function(e,t,a){var n=a(81822),s=function(){try{var e=n(Object,"defineProperty");return e({},"",{}),e}catch(t){}}();e.exports=s},2173:function(e,t,a){var n=a(58023)(Object.getPrototypeOf,Object);e.exports=n},21586:function(e){e.exports=function(e){var t=[];if(null!=e)for(var a in Object(e))t.push(a);return t}},31137:function(e){e.exports=function(e){return e}},53893:function(e,t,a){var n=a(98213),s=a(59464),l=a(80068);e.exports=function(e){return l(e)?n(e,!0):s(e)}},15815:function(e,t,a){"use strict";a.d(t,{S:function(){return c}});var n=a(80136),s=a(67294),l=(a(7568),a(7444)),r=a(9741),i={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,l.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const o=e=>{let{icon:t}=e;return s.createElement("span",{className:i.statusLabelIcon,"aria-hidden":"true"},t)},c=e=>{var{children:t,className:a,dataTestId:l,type:c="neutral",iconLeft:p}=e,u=(0,n._)(e,["children","className","dataTestId","type","iconLeft"]);return s.createElement("span",Object.assign({className:(0,r.c)(i.statusLabel,i[c],p&&i.statusLabelWithIcon,a),"data-testid":l},u),p&&s.createElement(o,{icon:p}),t)}},5184:function(e,t,a){"use strict";a.r(t);var n=a(11151),s=a(67294),l=a(48880),r=a(12224);const i=e=>{let{children:t,pageContext:a}=e;return s.createElement(r.default,{pageContext:a},t)};function o(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",ul:"ul",li:"li",strong:"strong",code:"code",h4:"h4",p:"p"},(0,n.ah)(),e.components),{PlaygroundPreview:a}=t;return a||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("PlaygroundPreview",!0),s.createElement(s.Fragment,null,s.createElement(t.h2,{id:"usage",style:{position:"relative"}},"Usage",s.createElement(t.a,{href:"#usage","aria-label":"usage permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.h3,{id:"example",style:{position:"relative"}},"Example",s.createElement(t.a,{href:"#example","aria-label":"example permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(a,null,s.createElement(l.aR,{numberedList:!0,title:"Numbered step by step component",helpText:"Numbered list is suitable for case where the order of the steps is important.",steps:[{title:"Step 1 title",description:"Here you can describe the step in detail. Keep the text compact so the user gets the big picture of the whole process and its steps easily.",buttons:[{children:"Example button",href:"https://hel.fi",key:"button"}]},{title:"Step 2 title",description:"Step description.",links:[{children:"Example link",href:"https://hel.fi",key:"link"}]},{title:"Step 3 title",description:"Step description."}]})),"\n",s.createElement(t.h3,{id:"principles",style:{position:"relative"}},"Principles",s.createElement(t.a,{href:"#principles","aria-label":"principles permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"The purpose of the StepByStep component is to provide an easy overall picture of a process."),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"Every step should have a title.")),"\n",s.createElement(t.li,null,"Step description is optional. The description should be compact, preferably one sentence long and two at the maximum. This is because the steps should provide a quick way to understand the whole process and too long texts can hinder that experience."),"\n",s.createElement(t.li,null,"A step can have a button as a call to action, e.g. making a phone call. But a button should not direct to another site."),"\n",s.createElement(t.li,null,"A step can have a link to provide additional information."),"\n",s.createElement(t.li,null,"The button and the link should relate to the step's contents. We recommend having only one button or a link per step, but sometimes it could be reasonable to have two. Before adding a second button or a link, consider whether the step should be divided into two steps. If you add two buttons, make the second one ",s.createElement(t.code,null,'variant="secondary"'),"."),"\n"),"\n",s.createElement(t.h3,{id:"variations",style:{position:"relative"}},"Variations",s.createElement(t.a,{href:"#variations","aria-label":"variations permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.h4,{id:"default",style:{position:"relative"}},"Default",s.createElement(t.a,{href:"#default","aria-label":"default permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"The unnumbered list is useful when the order of the steps is less important and they form more of a guideline."),"\n",s.createElement(a,null,s.createElement(l.aR,{title:"Unnumbered step by step component",helpText:"The unnumbered list is useful when the order of the steps is less important and they form more of a guideline.",steps:[{title:"Step 1 title",description:"Here you can describe the step in detail. Keep the text compact so the user gets the big picture of the whole process and its steps easily.",buttons:[{children:"Example button",href:"https://hel.fi",key:"button"}]},{title:"Step 2 title",description:"Step description.",links:[{children:"Example link",href:"https://hel.fi",key:"link"}]},{title:"Step 3 title",description:"Step description."}]})),"\n",s.createElement(t.h4,{id:"numbered-list",style:{position:"relative"}},"Numbered list",s.createElement(t.a,{href:"#numbered-list","aria-label":"numbered list permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"Numbered list is suitable for cases where the order of the steps is important."),"\n",s.createElement(a,null,s.createElement(l.aR,{numberedList:!0,title:"Numbered step by step component",helpText:"Numbered list is suitable for cases where the order of the steps is important.",steps:[{title:"Step 1 title",description:"Here you can describe the step in detail. Keep the text compact so the user gets the big picture of the whole process and its steps easily.",buttons:[{children:"Example button",href:"https://hel.fi",key:"button"}]},{title:"Step 2 title",description:"Step description.",links:[{children:"Example link",href:"https://hel.fi",key:"link"}]},{title:"Step 3 title",description:"Step description."}]})))}t.default=function(e){return void 0===e&&(e={}),s.createElement(i,e,s.createElement(o,e))}},12224:function(e,t,a){"use strict";a.r(t);var n=a(11151),s=a(67294),l=a(57674),r=a(89482),i=a(26127),o=a(55725);function c(e){const t=Object.assign({h1:"h1",a:"a",span:"span",p:"p"},(0,n.ah)(),e.components);return i.Z||p("PageTabs",!1),i.Z.Tab||p("PageTabs.Tab",!0),i.Z.TabList||p("PageTabs.TabList",!0),i.Z.TabPanel||p("PageTabs.TabPanel",!0),s.createElement(s.Fragment,null,s.createElement(t.h1,{id:"stepbystep",style:{position:"relative"}},"StepByStep",s.createElement(t.a,{href:"#stepbystep","aria-label":"stepbystep permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement("div",{className:"status-label-description"},s.createElement(o.Z,{type:"alert"},"Beta"),s.createElement(o.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),s.createElement(l.Z)),"\n",s.createElement(r.Z,null,"StepByStep component is useful for visualising a process in steps. The component supports numbered list for cases where the steps must be completed in a specific order, and unnumbered list for cases where the steps are more of a guideline."),"\n",s.createElement(i.Z,{pageContext:e.pageContext},s.createElement(i.Z.TabList,null,s.createElement(i.Z.Tab,{href:"/"},s.createElement(t.p,null,"Usage")),s.createElement(i.Z.Tab,{href:"/code"},s.createElement(t.p,null,"Code")),s.createElement(i.Z.Tab,{href:"/accessibility"},s.createElement(t.p,null,"Accessibility"))),s.createElement(i.Z.TabPanel,null,e.children)))}function p(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?s.createElement(t,e,s.createElement(c,e)):c(e)}},89482:function(e,t,a){"use strict";var n=a(67294),s=a(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:l={},children:r}=e;return n.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...l}},(0,s.g)(r))}},26127:function(e,t,a){"use strict";var n=a(67294),s=a(14160),l=a(58405),r=a(42972);const i="PageTabList",o="PageTabPanel",c="PageTab",p=e=>{var t;let{pageContext:a,children:p}=e;const u=a.frontmatter.slug,d=Array.isArray(p)?p:[p],h=d.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===i)),m=d.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===o)),b=null===(t=h.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===c)),f=b.findIndex((e=>u.endsWith(e.props.href))),g=-1===f?0:f,E=0===g?u:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(u);return n.createElement(l.a,{initiallyActiveTab:g},n.createElement(l.a.TabList,{className:"page-tabs-list"},b.map((e=>n.createElement(l.a.Tab,{key:e.props.href,onClick:()=>(0,s.navigate)(`${"/"===e.props.href?E:E+e.props.href}`)},(0,r.g)(e.props.children))))),b.map(((e,t)=>n.createElement(l.a.TabPanel,{key:e.props.href},g===t?m.props.children:n.createElement("div",null)))))},u=e=>{let{children:t}=e;return n.createElement(l.a.TabList,null,t)};u.componentName=i;const d=e=>{let{href:t,slug:a,children:s}=e;return n.createElement(l.a.Tab,null," ",s)};d.componentName=c;const h=e=>{let{children:t}=e;return n.createElement(l.a.TabPanel,null,t)};h.componentName=o,p.TabList=u,p.Tab=d,p.TabPanel=h,t.Z=p},55725:function(e,t,a){"use strict";var n=a(67294),s=a(15815),l=a(42972);t.Z=e=>{let{children:t,...a}=e;return n.createElement(s.S,a,(0,l.g)(t))}},57674:function(e,t,a){"use strict";var n=a(67294),s=a(96619);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return n.createElement(s.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},n.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>n.createElement("li",{key:t},n.createElement("span",{className:"status-name"},t),n.createElement("span",null,e[t]))))))}}}]);