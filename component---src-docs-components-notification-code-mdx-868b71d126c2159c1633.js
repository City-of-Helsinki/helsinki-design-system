"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[7922,965],{71659:function(e,t,n){n.d(t,{S:function(){return r}});var a=n(80136),l=n(67294),i=n(7444),s=n(44458),o={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4",rounded:"StatusLabel-module_rounded__2znRD status-label_hds-status-label--rounded-corners__2Uam1"};(0,i.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}.status-label_hds-status-label--rounded-corners__2Uam1{border-radius:20px}");const c=e=>{let{icon:t}=e;return l.createElement("span",{className:o.statusLabelIcon,"aria-hidden":"true"},t)},r=e=>{var{children:t,className:n,dataTestId:i,type:r="neutral",iconLeft:d,variant:u}=e,m=(0,a._)(e,["children","className","dataTestId","type","iconLeft","variant"]);return l.createElement("span",Object.assign({className:(0,s.c)(o.statusLabel,o[r],d&&o.statusLabelWithIcon,u&&o[u],n),"data-testid":i},m),d&&l.createElement(c,{icon:d}),t)}},3037:function(e,t,n){n.r(t);var a=n(11151),l=n(67294),i=n(1343),s=n(93638),o=n(93204);const c=e=>{let{children:t,pageContext:n}=e;return l.createElement(o.default,{pageContext:n},t)};function r(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",h4:"h4",pre:"pre",code:"code",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",strong:"strong",p:"p"},(0,a.ah)(),e.components),{Playground:n,IconCheckCircleFill:o,Link:c,ExternalLink:r}=t;return r||d("ExternalLink",!0),o||d("IconCheckCircleFill",!0),c||d("Link",!0),n||d("Playground",!0),l.createElement(l.Fragment,null,l.createElement(t.h2,{id:"code",style:{position:"relative"}},"Code",l.createElement(t.a,{href:"#code","aria-label":"code permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.h3,{id:"code-examples",style:{position:"relative"}},"Code examples",l.createElement(t.a,{href:"#code-examples","aria-label":"code examples permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.h4,{id:"inline",style:{position:"relative"}},"Inline",l.createElement(t.a,{href:"#inline","aria-label":"inline permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(n,{scope:{Notification:i.N}},l.createElement(t.pre,null,l.createElement(t.code,{className:"language-jsx"},'import { Notification } from \'hds-react\';\n\n() => (<>\n  <Notification label="New messages">You have received new messages.</Notification>\n  <Notification label="Form done" type="success" style={{marginTop: \'var(--spacing-s)\'}}>Form submit was successful!</Notification>\n  <Notification label="Slow loading" type="alert" style={{marginTop: \'var(--spacing-s)\'}}>Loading is taking longer than expected.</Notification>\n  <Notification label="Missing information" type="error" style={{marginTop: \'var(--spacing-s)\'}}>Form is missing critical information.</Notification>\n</>)\n')),l.createElement(t.pre,null,l.createElement(t.code,{className:"language-html"},'<div>\n<section aria-label="Notification" class="hds-notification">\n  <div class="hds-notification__content">\n    <div class="hds-notification__label" role="heading" aria-level="2">\n      <span class="hds-icon hds-icon--info-circle-fill" aria-hidden="true"></span>\n      <span>New messages</span>\n    </div>\n    <div class="hds-notification__body">You have received new messages.</div>\n  </div>\n</section>\n<br />\n<section aria-label="Notification" class="hds-notification hds-notification--success">\n  <div class="hds-notification__content">\n    <div class="hds-notification__label" role="heading" aria-level="2">\n      <span class="hds-icon hds-icon--check-circle-fill" aria-hidden="true"></span>\n      <span>Form done</span>\n    </div>\n    <div class="hds-notification__body">Form submit was successful!</div>\n  </div>\n</section>\n<br />\n<section aria-label="Notification" class="hds-notification hds-notification--alert">\n  <div class="hds-notification__content">\n    <div class="hds-notification__label" role="heading" aria-level="2">\n      <span class="hds-icon hds-icon--alert-circle-fill" aria-hidden="true"></span>\n      <span>Slow loading</span>\n    </div>\n    <div class="hds-notification__body">Loading is taking longer than expected.</div>\n  </div>\n</section>\n<br />\n<section aria-label="Notification" class="hds-notification hds-notification--error">\n  <div class="hds-notification__content">\n    <div class="hds-notification__label" role="heading" aria-level="2">\n      <span class="hds-icon hds-icon--error-fill" aria-hidden="true"></span>\n      <span>Missing information</span>\n    </div>\n    <div class="hds-notification__body">Form is missing critical information.</div>\n  </div>\n</section>\n</div>\n'))),"\n",l.createElement(t.h4,{id:"toast",style:{position:"relative"}},"Toast",l.createElement(t.a,{href:"#toast","aria-label":"toast permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(n,{scope:{Notification:i.N,Button:s.B,useState:l.useState}},l.createElement(t.pre,null,l.createElement(t.code,{className:"language-jsx"},'import { Notification, Button } from \'hds-react\';\n\n() => {\n  const [open, setOpen] = useState(false)\n  const [autoCloseOpen, setAutoCloseOpen] = useState(false)\n  const showButtonRef = React.useRef(null)\n  const showAutoCloseButtonRef = React.useRef(null)\n  const onClose = () => {\n    setOpen(false);\n    if(showButtonRef.current) {\n      showButtonRef.current.focus();\n    }\n  }\n  const onAutoClose = () => {\n    setAutoCloseOpen(false);\n    if(showAutoCloseButtonRef.current) {\n      showAutoCloseButtonRef.current.focus();\n    }\n  }\n  return (\n    <>\n      <Button ref={showButtonRef} onClick={() => setOpen(true)}>Show toast</Button>\n      <Button ref={showAutoCloseButtonRef} onClick={() => setAutoCloseOpen(true)} style={{ display: "flex", marginTop: "var(--spacing-s)" }}>Show automatically disappearing toast</Button>\n      {open && (\n        <Notification label="New messages" position="top-right" dismissible closeButtonLabelText="Close toast" onClose={() => onClose()} style={{ zIndex: 100 }}>\n          You have received new messages.\n        </Notification>\n      )}\n      {autoCloseOpen && (\n        <Notification label="New messages" position="top-right" autoClose onClose={() => onAutoClose()} style={{ zIndex: 100 }}>\n          You have received new messages.\n        </Notification>\n      )}\n    </>\n  )\n}\n')),l.createElement(t.pre,null,l.createElement(t.code,{className:"language-html"},'<section aria-label="Notification" class="hds-notification hds-notification--top-right">\n  <div role="alert" class="hds-notification__content">\n    <div class="hds-notification__label">\n      <span class="hds-icon hds-icon--info-circle-fill" aria-hidden="true"></span>\n      <span>New messages</span>\n    </div>\n    <div class="hds-notification__body">You have received new messages.</div>\n  </div>\n  <button class="hds-notification__close-button" aria-label="Close toast" type="button" onclick="">\n    <span class="hds-icon hds-icon--cross" aria-hidden="true"></span>\n  </button>\n</section>\n'))),"\n",l.createElement(t.h4,{id:"notification-sizes",style:{position:"relative"}},"Notification sizes",l.createElement(t.a,{href:"#notification-sizes","aria-label":"notification sizes permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(n,{scope:{Notification:i.N}},l.createElement(t.pre,null,l.createElement(t.code,{className:"language-jsx"},'import { Notification } from \'hds-react\';\n\n() => (<>\n  <Notification size="large" label="New messages">You have received new messages.</Notification>\n  <Notification size="default" label="New messages" style={{marginTop: \'var(--spacing-s)\'}}>You have received new messages.</Notification>\n  <Notification size="small" label="New messages" style={{marginTop: \'var(--spacing-s)\'}}>You have received new messages.</Notification>\n</>)\n')),l.createElement(t.pre,null,l.createElement(t.code,{className:"language-html"},'<div>\n<section aria-label="Notification" class="hds-notification hds-notification--large">\n  <div class="hds-notification__content">\n    <div class="hds-notification__label" role="heading" aria-level="2">\n      <span class="hds-icon hds-icon--info-circle-fill" aria-hidden="true"></span>\n      <span>New messages</span>\n    </div>\n    <div class="hds-notification__body">You have received new messages.</div>\n  </div>\n</section>\n<br />\n<section aria-label="Notification" class="hds-notification">\n  <div class="hds-notification__content">\n    <div class="hds-notification__label" role="heading" aria-level="2">\n      <span class="hds-icon hds-icon--info-circle-fill" aria-hidden="true"></span>\n      <span>New messages</span>\n    </div>\n    <div class="hds-notification__body">You have received new messages.</div>\n  </div>\n</section>\n<br />\n<section aria-label="Notification" class="hds-notification hds-notification--small">\n  <div class="hds-notification__content">\n    <div class="hds-notification__label" role="heading" aria-level="2">\n      <span class="hds-icon hds-icon--info-circle-fill" aria-hidden="true"></span>\n    </div>\n    <div class="hds-notification__body">You have received new messages.</div>\n  </div>\n</section>\n</div>\n'))),"\n",l.createElement(t.h4,{id:"invisible",style:{position:"relative"}},"Invisible",l.createElement(t.a,{href:"#invisible","aria-label":"invisible permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(n,{scope:{Notification:i.N}},l.createElement(t.pre,null,l.createElement(t.code,{className:"language-jsx"},"import { Notification } from 'hds-react';\n\n() => (\n  <Notification label=\"New messages\" invisible>\n    You have received new messages. This notification is invisible.\n  </Notification>\n)\n")),l.createElement(t.pre,null,l.createElement(t.code,{className:"language-html"},'<div class="hiddenFromScreen" role="alert">\n  <section aria-label="Notification" class="hds-notification">\n    <div class="hds-notification__content">\n      <div class="hds-notification__label">\n        <span class="hds-icon hds-icon--info-circle-fill" aria-hidden="true"></span>\n        <span>New messages</span>\n      </div>\n      <div class="hds-notification__body">You have received new messages. This notification is invisible.</div>\n    </div>\n  </section>\n</div>\n'))),"\n",l.createElement(t.h3,{id:"packages",style:{position:"relative"}},"Packages",l.createElement(t.a,{href:"#packages","aria-label":"packages permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.table,null,l.createElement(t.thead,null,l.createElement(t.tr,null,l.createElement(t.th,null,"Package"),l.createElement(t.th,null,"Included"),l.createElement(t.th,null,"Storybook link"),l.createElement(t.th,null,"Source link"))),l.createElement(t.tbody,null,l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.strong,null,"HDS React")),l.createElement(t.td,null,l.createElement("div",{style:{display:"flex",gap:"var(--spacing-3-xs)"}},l.createElement(o)," Yes ")),l.createElement(t.td,null,l.createElement(c,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-notification--default"},"View in Storybook")),l.createElement(t.td,null,l.createElement(r,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"https://github.com/City-of-Helsinki/helsinki-design-system/tree/master/packages/react/src/components/notification"},"View source"))),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.strong,null,"HDS Core")),l.createElement(t.td,null,l.createElement("div",{style:{display:"flex",gap:"var(--spacing-3-xs)"}},l.createElement(o)," Yes ")),l.createElement(t.td,null,l.createElement(c,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/core/?path=/story/components-notification--default"},"View in Storybook")),l.createElement(t.td,null,l.createElement(r,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"https://github.com/City-of-Helsinki/helsinki-design-system/tree/master/packages/core/src/components/notification"},"View source"))))),"\n",l.createElement(t.h3,{id:"properties",style:{position:"relative"}},"Properties",l.createElement(t.a,{href:"#properties","aria-label":"properties permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.p,null,"Note! You can find the full list of properties in the ",l.createElement(c,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-notification--default"},"React Storybook.")),"\n",l.createElement(t.table,null,l.createElement(t.thead,null,l.createElement(t.tr,null,l.createElement(t.th,null,"Property"),l.createElement(t.th,null,"Description"),l.createElement(t.th,null,"Values"),l.createElement(t.th,null,"Default value"))),l.createElement(t.tbody,null,l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"autoClose")),l.createElement(t.td,null,"If set to true, the Toast notification will be closed automatically after a certain time."),l.createElement(t.td,null,l.createElement(t.code,null,"boolean")),l.createElement(t.td,null,"false")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"boxShadow")),l.createElement(t.td,null,"If set to true, the notification will have a box shadow."),l.createElement(t.td,null,l.createElement(t.code,null,"boolean")),l.createElement(t.td,null,"false")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"displayAutoCloseProgress")),l.createElement(t.td,null,"If set to true, a progress is displayed on top of the Toast notification."),l.createElement(t.td,null,l.createElement(t.code,null,"boolean")),l.createElement(t.td,null,"true")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"invisible")),l.createElement(t.td,null,'If set to true, the notification will be visually hidden. Useful when notification should only be "seen" by screen readers.'),l.createElement(t.td,null,l.createElement(t.code,null,"boolean")),l.createElement(t.td,null,"false")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"label")),l.createElement(t.td,null,"The label of the notification."),l.createElement(t.td,null,l.createElement(t.code,null,"ReactNode")),l.createElement(t.td,null,"-")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"notificationAriaLabel")),l.createElement(t.td,null,"The aria-label of the notification section element."),l.createElement(t.td,null,l.createElement(t.code,null,"string")),l.createElement(t.td,null,l.createElement(t.code,null,'"Notification"'))),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"onClose")),l.createElement(t.td,null,"Callback fired when the notification is closed"),l.createElement(t.td,null,l.createElement(t.code,null,"function")),l.createElement(t.td,null,"-")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"type")),l.createElement(t.td,null,"The type of the notification. Affects the colour and icon of the notification."),l.createElement(t.td,null,l.createElement(t.code,null,'"info"'),", ",l.createElement(t.code,null,'"success"'),", ",l.createElement(t.code,null,'"alert"'),", ",l.createElement(t.code,null,'"error"')),l.createElement(t.td,null,l.createElement(t.code,null,'"info"'))),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"position")),l.createElement(t.td,null,"The position of the notification."),l.createElement(t.td,null,l.createElement(t.code,null,'"inline"'),", ",l.createElement(t.code,null,'"top-left"'),", ",l.createElement(t.code,null,'"top-center"'),", ",l.createElement(t.code,null,'"top-right"'),", ",l.createElement(t.code,null,'"bottom-left"'),", ",l.createElement(t.code,null,'"bottom-center"'),", ",l.createElement(t.code,null,'"bottom-right"')),l.createElement(t.td,null,l.createElement(t.code,null,'"inline"'))),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"size")),l.createElement(t.td,null,"The size of the notification."),l.createElement(t.td,null,l.createElement(t.code,null,'"small"'),", ",l.createElement(t.code,null,'"default"'),", ",l.createElement(t.code,null,'"large"')),l.createElement(t.td,null,l.createElement(t.code,null,'"default"'))),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"dismissible")),l.createElement(t.td,null,"If set to true, the notification can be closed."),l.createElement(t.td,null,l.createElement(t.code,null,"boolean")),l.createElement(t.td,null,"false")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"closeButtonLabelText")),l.createElement(t.td,null,"The aria-label and title for the close button."),l.createElement(t.td,null,l.createElement(t.code,null,"string")),l.createElement(t.td,null,"-")),l.createElement(t.tr,null,l.createElement(t.td,null,"[Table 1:Notification properties]"),l.createElement(t.td),l.createElement(t.td),l.createElement(t.td)))))}function d(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){return void 0===e&&(e={}),l.createElement(c,e,l.createElement(r,e))}},93204:function(e,t,n){n.r(t);var a=n(11151),l=n(67294),i=n(71659),s=n(57674),o=n(89482),c=(n(18607),n(26127));function r(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,a.ah)(),e.components);return c.Z||d("PageTabs",!1),c.Z.Tab||d("PageTabs.Tab",!0),c.Z.TabList||d("PageTabs.TabList",!0),c.Z.TabPanel||d("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(t.h1,{id:"notification",style:{position:"relative"}},"Notification",l.createElement(t.a,{href:"#notification","aria-label":"notification permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{className:"status-label-description"},l.createElement(i.S,{variant:"rounded",type:"info"},"Stable"),l.createElement(i.S,{variant:"rounded",type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(s.Z)),"\n",l.createElement(o.Z,null,"Notifications are used to present timely information to the user. HDS offers two types of notifications for different use cases."),"\n",l.createElement(c.Z,{pageContext:e.pageContext},l.createElement(c.Z.TabList,null,l.createElement(c.Z.Tab,{href:"/"},"Usage"),l.createElement(c.Z.Tab,{href:"/code"},"Code"),l.createElement(c.Z.Tab,{href:"/accessibility"},"Accessibility")),l.createElement(c.Z.TabPanel,null,e.children)))}function d(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?l.createElement(t,e,l.createElement(r,e)):r(e)}},89482:function(e,t,n){var a=n(67294);t.Z=e=>{let{color:t="var(--color-black-90)",size:n="var(--fontsize-body-xl)",style:l={},children:i}=e;return a.createElement("p",{style:{fontSize:n,color:t,maxWidth:600,...l}},i)}},26127:function(e,t,n){var a=n(67294),l=n(14160),i=n(29683);const s="PageTabList",o="PageTabPanel",c="PageTab",r=e=>{var t;let{pageContext:n,children:r}=e;const d=n.frontmatter.slug,u=Array.isArray(r)?r:[r],m=u.find((e=>(0,a.isValidElement)(e)&&e.type.componentName===s)),h=u.find((e=>(0,a.isValidElement)(e)&&e.type.componentName===o)),p=null===(t=m.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===c)),f=p.findIndex((e=>d.endsWith(e.props.href))),b=-1===f?0:f,E=0===b?d:(e=>"/"+e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/"))(d);return a.createElement(i.a,{initiallyActiveTab:b},a.createElement(i.a.TabList,{className:"page-tabs-list"},p.map((e=>a.createElement(i.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(""+("/"===e.props.href?E:E+e.props.href))},e.props.children)))),p.map(((e,t)=>a.createElement(i.a.TabPanel,{key:e.props.href},b===t?h.props.children:a.createElement("div",null)))))},d=e=>{let{children:t}=e;return a.createElement(i.a.TabList,null,t)};d.componentName=s;const u=e=>{let{href:t,slug:n,children:l}=e;return a.createElement(i.a.Tab,null,l)};u.componentName=c;const m=e=>{let{children:t}=e;return a.createElement(i.a.TabPanel,null,t)};m.componentName=o,r.TabList=d,r.Tab=u,r.TabPanel=m,t.Z=r},57674:function(e,t,n){var a=n(67294),l=n(32557);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return a.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},a.createElement("ul",{class:"status-label-definitions"},Object.keys(e).map((t=>a.createElement("li",{key:t},a.createElement("span",{class:"status-name"},t),a.createElement("span",null,e[t]))))))}}}]);