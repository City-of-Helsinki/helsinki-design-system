"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[7557,965],{71659:function(e,t,a){a.d(t,{S:function(){return c}});var n=a(80136),s=a(67294),l=a(7444),i=a(44458),r={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4",rounded:"StatusLabel-module_rounded__2znRD status-label_hds-status-label--rounded-corners__2Uam1"};(0,l.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}.status-label_hds-status-label--rounded-corners__2Uam1{border-radius:20px}");const o=e=>{let{icon:t}=e;return s.createElement("span",{className:r.statusLabelIcon,"aria-hidden":"true"},t)},c=e=>{var{children:t,className:a,dataTestId:l,type:c="neutral",iconLeft:u,variant:d}=e,m=(0,n._)(e,["children","className","dataTestId","type","iconLeft","variant"]);return s.createElement("span",Object.assign({className:(0,i.c)(r.statusLabel,r[c],u&&r.statusLabelWithIcon,d&&r[d],a),"data-testid":l},m),u&&s.createElement(o,{icon:u}),t)}},41542:function(e,t,a){a.r(t),a.d(t,{ToastExample:function(){return c}});var n=a(11151),s=a(67294),l=a(93638),i=a(1343),r=a(93204);const o=e=>{let{children:t,pageContext:a}=e;return s.createElement(r.default,{pageContext:a},t)},c=()=>{const[e,t]=s.useState(!1),[a,n]=s.useState(!1),r=s.useRef(null),o=s.useRef(null);return s.createElement(s.Fragment,null,s.createElement(l.B,{ref:r,onClick:()=>t(!0)},"Show toast"),s.createElement(l.B,{ref:o,onClick:()=>n(!0),style:{display:"flex",marginTop:"var(--spacing-s)"}},"Show automatically disappearing toast"),e&&s.createElement(i.N,{label:"New messages",position:"top-right",dismissible:!0,closeButtonLabelText:"Close toast",onClose:()=>(t(!1),void(r.current&&r.current.focus())),style:{zIndex:100}},"You have received new messages."),a&&s.createElement(i.N,{label:"New messages",position:"top-right",autoClose:!0,onClose:()=>(n(!1),void(o.current&&o.current.focus())),style:{zIndex:100}},"You have received new messages."))};function u(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",ul:"ul",li:"li",strong:"strong",h4:"h4",p:"p"},(0,n.ah)(),e.components),{PlaygroundPreview:a,InternalLink:l}=t;return l||d("InternalLink",!0),a||d("PlaygroundPreview",!0),s.createElement(s.Fragment,null,s.createElement(t.h2,{id:"usage",style:{position:"relative"}},"Usage",s.createElement(t.a,{href:"#usage","aria-label":"usage permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.h3,{id:"example",style:{position:"relative"}},"Example",s.createElement(t.a,{href:"#example","aria-label":"example permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(a,null,s.createElement(i.N,{label:"New messages"},"You have received new messages.")),"\n",s.createElement(t.h3,{id:"principles",style:{position:"relative"}},"Principles",s.createElement(t.a,{href:"#principles","aria-label":"principles permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"Notifications are designed to capture users' attention. ",s.createElement(t.strong,null,"Therefore, they should be used sparingly only for important information or updates.")),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"Notification title should include the most important information about the notification.")," Aim for a title that is short, concise and easy to understand. Avoid titles that span over multiple lines."),"\n",s.createElement(t.li,null,"HDS offers multiple options for notification screen locations. Choose locations that fit best for your service and stay consistent."),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"If you use automatically disappearing notifications, make sure the information is accessible elsewhere in case the user misses the notification.")),"\n"),"\n",s.createElement(t.h4,{id:"when-to-use-each-notification-type",style:{position:"relative"}},"When to use each notification type?",s.createElement(t.a,{href:"#when-to-use-each-notification-type","aria-label":"when to use each notification type permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"Use inline notifications when information is related to the content or if you want to keep information visible at all times.")," Inline notifications are part of the content and should therefore be placed as close as possible to the related part of the content. Inline notifications should not be added to the page dynamically."),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"Use toast notifications to inform the user about a specific event or change in the system status.")," Toast notifications do not relate to any specific object on the page and are therefore placed on top of the content (usually top right or bottom center)."),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"Use invisible notifications to make system state changes more apparent for screen reader users.")," Some features (such as moving a product to the shopping cart) are apparent for regular users, but screen readers may need extra assist."),"\n"),"\n",s.createElement(t.h4,{id:"when-to-use-each-status-colour-info-success-alert-error",style:{position:"relative"}},"When to use each status colour (info, success, alert, error)?",s.createElement(t.a,{href:"#when-to-use-each-status-colour-info-success-alert-error","aria-label":"when to use each status colour info success alert error permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"You can find guidelines on when to use each status colour in the ",s.createElement(l,{href:"/foundation/design-tokens/colour#ui-colours"},"colour guidelines"),". Aim to use notification levels and colours consistently across your service."),"\n"),"\n",s.createElement(t.h3,{id:"variations",style:{position:"relative"}},"Variations",s.createElement(t.a,{href:"#variations","aria-label":"variations permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.h4,{id:"inline",style:{position:"relative"}},"Inline",s.createElement(t.a,{href:"#inline","aria-label":"inline permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"Inline notifications are used as part of the content. They closely relate to the part of the content and work best when placed as close to the related content as possible. Inline notifications are often used to provide or emphasise key information related to the content of the page. It is recommended not to make them closable - unless their information is not important or can be accessed somewhere else. Inline notifications greatly emphasise the information so they should be used sparingly in order not to dilute their effect. A good rule of thumb is to limit the number of simultaneous inline notifications to one."),"\n",s.createElement(t.p,null,"Note! Inline notifications should not be added to the page dynamically. For this use case, use ",s.createElement(t.a,{href:"#toast"},"Toast notifications"),"."),"\n",s.createElement(a,null,s.createElement(i.N,{label:"New messages"},"You have received new messages."),s.createElement(i.N,{label:"Form done",type:"success",style:{marginTop:"var(--spacing-s)"}},s.createElement(t.p,null,"Form submit was successful!")),s.createElement(i.N,{label:"Slow loading",type:"alert",style:{marginTop:"var(--spacing-s)"}},s.createElement(t.p,null,"Loading is taking longer than expected.")),s.createElement(i.N,{label:"Missing information",type:"error",style:{marginTop:"var(--spacing-s)"}},s.createElement(t.p,null,"Form is missing critical information."))),"\n",s.createElement(t.h4,{id:"toast",style:{position:"relative"}},"Toast",s.createElement(t.a,{href:"#toast","aria-label":"toast permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"Toasts notifications provide lightweight feedback for changes in system status such as successful saving or Internet disconnection. Toasts appear on top of the content (usually top right or bottom center). Be wary using automatically disappearing toasts for critical information such as errors. It is also a good practise to make notifications accessible elsewhere in case the user misses them before they disappear."),"\n","\n",s.createElement(a,null,s.createElement(c)),"\n",s.createElement(t.h4,{id:"notification-sizes",style:{position:"relative"}},"Notification sizes",s.createElement(t.a,{href:"#notification-sizes","aria-label":"notification sizes permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"HDS Navigation component supports many commonly used features out of the box. The main navigation bar can be configured to include search, language selection and user profile actions. You may also easily customize the action row with your own actions."),"\n",s.createElement(a,null,s.createElement(i.N,{size:"large",label:"New messages"},s.createElement(t.p,null,"You have received new messages.")),s.createElement(i.N,{size:"default",label:"New messages",style:{marginTop:"var(--spacing-s)"}},s.createElement(t.p,null,"You have received new messages.")),s.createElement(i.N,{size:"small",label:"New messages",style:{marginTop:"var(--spacing-s)"}},s.createElement(t.p,null,"You have received new messages."))),"\n",s.createElement(t.h4,{id:"invisible",style:{position:"relative"}},"Invisible",s.createElement(t.a,{href:"#invisible","aria-label":"invisible permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"Invisible notifications do not show up on screen and they are meant to aid screen reader users. Some updates to system status may be apparent to regular users through animations etc. However, screen readers can easily ignore this type of feedback. Invisible notifications are not visible to regular users but screen readers detect them. Use them to improve user experience for screen reader users."),"\n",s.createElement(a,null,s.createElement(i.N,{label:"New messages",invisible:!0},s.createElement(t.p,null,"You have received new messages. This notification is invisible."))))}function d(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){return void 0===e&&(e={}),s.createElement(o,e,s.createElement(u,e))}},93204:function(e,t,a){a.r(t);var n=a(11151),s=a(67294),l=a(71659),i=a(57674),r=a(89482),o=(a(18607),a(26127));function c(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,n.ah)(),e.components);return o.Z||u("PageTabs",!1),o.Z.Tab||u("PageTabs.Tab",!0),o.Z.TabList||u("PageTabs.TabList",!0),o.Z.TabPanel||u("PageTabs.TabPanel",!0),s.createElement(s.Fragment,null,s.createElement(t.h1,{id:"notification",style:{position:"relative"}},"Notification",s.createElement(t.a,{href:"#notification","aria-label":"notification permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement("div",{className:"status-label-description"},s.createElement(l.S,{variant:"rounded",type:"info"},"Stable"),s.createElement(l.S,{variant:"rounded",type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),s.createElement(i.Z)),"\n",s.createElement(r.Z,null,"Notifications are used to present timely information to the user. HDS offers two types of notifications for different use cases."),"\n",s.createElement(o.Z,{pageContext:e.pageContext},s.createElement(o.Z.TabList,null,s.createElement(o.Z.Tab,{href:"/"},"Usage"),s.createElement(o.Z.Tab,{href:"/code"},"Code"),s.createElement(o.Z.Tab,{href:"/accessibility"},"Accessibility")),s.createElement(o.Z.TabPanel,null,e.children)))}function u(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?s.createElement(t,e,s.createElement(c,e)):c(e)}},89482:function(e,t,a){var n=a(67294);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:s={},children:l}=e;return n.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...s}},l)}},26127:function(e,t,a){var n=a(67294),s=a(14160),l=a(29683);const i="PageTabList",r="PageTabPanel",o="PageTab",c=e=>{var t;let{pageContext:a,children:c}=e;const u=a.frontmatter.slug,d=Array.isArray(c)?c:[c],m=d.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===i)),h=d.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===r)),p=null===(t=m.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===o)),b=p.findIndex((e=>u.endsWith(e.props.href))),f=-1===b?0:b,g=0===f?u:(e=>"/"+e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/"))(u);return n.createElement(l.a,{initiallyActiveTab:f},n.createElement(l.a.TabList,{className:"page-tabs-list"},p.map((e=>n.createElement(l.a.Tab,{key:e.props.href,onClick:()=>(0,s.navigate)(""+("/"===e.props.href?g:g+e.props.href))},e.props.children)))),p.map(((e,t)=>n.createElement(l.a.TabPanel,{key:e.props.href},f===t?h.props.children:n.createElement("div",null)))))},u=e=>{let{children:t}=e;return n.createElement(l.a.TabList,null,t)};u.componentName=i;const d=e=>{let{href:t,slug:a,children:s}=e;return n.createElement(l.a.Tab,null,s)};d.componentName=o;const m=e=>{let{children:t}=e;return n.createElement(l.a.TabPanel,null,t)};m.componentName=r,c.TabList=u,c.Tab=d,c.TabPanel=m,t.Z=c},57674:function(e,t,a){var n=a(67294),s=a(32557);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return n.createElement(s.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},n.createElement("ul",{class:"status-label-definitions"},Object.keys(e).map((t=>n.createElement("li",{key:t},n.createElement("span",{class:"status-name"},t),n.createElement("span",null,e[t]))))))}}}]);