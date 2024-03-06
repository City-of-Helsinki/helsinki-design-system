"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[8087,3223],{99123:function(e,t,a){a.d(t,{S:function(){return c}});var n=a(80136),s=a(67294),l=(a(7568),a(7444)),r=a(34300),i={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,l.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const o=e=>{let{icon:t}=e;return s.createElement("span",{className:i.statusLabelIcon,"aria-hidden":"true"},t)},c=e=>{var{children:t,className:a,dataTestId:l,type:c="neutral",iconLeft:d}=e,u=(0,n._)(e,["children","className","dataTestId","type","iconLeft"]);return s.createElement("span",Object.assign({className:(0,r.c)(i.statusLabel,i[c],d&&i.statusLabelWithIcon,a),"data-testid":l},u),d&&s.createElement(o,{icon:d}),t)}},30996:function(e,t,a){a.r(t),a.d(t,{LoadingButtonExample:function(){return u}});var n=a(11151),s=a(67294),l=a(36725),r=a(22333),i=a(69041),o=a(12670),c=a(1862);const d=e=>{let{children:t,pageContext:a}=e;return s.createElement(c.default,{pageContext:a},t)},u=()=>{const[e,t]=s.useState(!1),[a,n]=s.useState(!1);return s.useEffect((()=>{let a;return e&&(a=setTimeout((()=>{n(!0),t(!1)}),2e3)),()=>{clearTimeout(a)}}),[e]),s.createElement(s.Fragment,null,s.createElement(l.B,{isLoading:e,loadingText:"Saving form changes",onClick:()=>{n(!1),t(!0)}},"Save form"),a&&s.createElement(r.N,{key:(new Date).toString(),position:"top-right",displayAutoCloseProgress:!1,autoClose:!0,dismissible:!0,label:"Form saved!",type:"success",onClose:()=>{n(!1)}},"Saving your form was successful."))};function m(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",ul:"ul",li:"li",h4:"h4",p:"p",code:"code"},(0,n.ah)(),e.components),{PlaygroundPreview:a}=t;return a||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("PlaygroundPreview",!0),s.createElement(s.Fragment,null,s.createElement(t.h2,{id:"usage",style:{position:"relative"}},"Usage",s.createElement(t.a,{href:"#usage","aria-label":"usage permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.h3,{id:"example",style:{position:"relative"}},"Example",s.createElement(t.a,{href:"#example","aria-label":"example permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(a,null,s.createElement(l.B,null,"Button")),"\n",s.createElement(t.h3,{id:"principles",style:{position:"relative"}},"Principles",s.createElement(t.a,{href:"#principles","aria-label":"principles permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,s.createElement("b",null,"Buttons are used to trigger an action.")," Be cautious when using buttons for navigating. In most cases, you should prefer links for this purpose."),"\n",s.createElement(t.li,null,"Button label should always describe the action that the buttons is going to trigger. A good practice is to start the label with a verb and use two-word labels at maximum."),"\n",s.createElement(t.li,null,"Use provided button types to control the visual priority of the view. Priority of the button types is the following: Primary -> Secondary -> Supplementary."),"\n",s.createElement(t.li,null,"In mobile screen sizes, use full-width buttons. In other sizes use buttons that scale according to their content."),"\n",s.createElement(t.li,null,"Try to keep the amount of buttons in one view low. If there is a need for several actions in one view, consider using the smaller button variant."),"\n"),"\n",s.createElement(t.h3,{id:"variations",style:{position:"relative"}},"Variations",s.createElement(t.a,{href:"#variations","aria-label":"variations permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.h4,{id:"primary",style:{position:"relative"}},"Primary",s.createElement(t.a,{href:"#primary","aria-label":"primary permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"A Primary button is reserved for the most important action on the screen. Primary action is usually either mandatory\nor essential for the user. Primary buttons are designed to clearly highlight the most important action, and therefore\nyou should avoid having multiple primary buttons on one screen. For less important actions, consider using secondary\nor supplementary buttons instead."),"\n",s.createElement(a,null,s.createElement(l.B,null,"Primary")),"\n",s.createElement(t.h4,{id:"secondary",style:{position:"relative"}},"Secondary",s.createElement(t.a,{href:"#secondary","aria-label":"secondary permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"Secondary buttons are used for actions which are not mandatory or essential for the user. Often screens will include\nmultiple secondary buttons alongside one primary button."),"\n",s.createElement(a,null,s.createElement(l.B,{variant:"secondary"},"Secondary")),"\n",s.createElement(t.h4,{id:"supplementary",style:{position:"relative"}},"Supplementary",s.createElement(t.a,{href:"#supplementary","aria-label":"supplementary permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"Supplementary buttons can be used in similar cases as secondary buttons. However, supplementary buttons are meant for\nactions which are intentionally wanted to be less visible to the user. These kind of actions include i.e. cancel and\ndismiss functionalities. Note! Since supplementary buttons do not have borders, an accompanying icon is required to\nclearly distinguish them from links and passive text elements."),"\n",s.createElement(a,null,s.createElement(l.B,{variant:"supplementary",iconLeft:s.createElement(i.bl)},s.createElement(t.p,null,"Supplementary"))),"\n",s.createElement(t.h4,{id:"with-icons",style:{position:"relative"}},"With icons",s.createElement(t.a,{href:"#with-icons","aria-label":"with icons permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"Icons can be added to buttons to make the action easier to understand. Sometimes it can also be beneficial to add\nicons to make important actions more distinguishable. It is not recommended to use buttons with icons without text\nlabel because users interpret icons in different ways. More information on icon usage in the icon guidelines."),"\n",s.createElement(a,{style:{marginTop:"var(--spacing-m)"}},s.createElement(l.B,{iconLeft:s.createElement(i.a$)},"Button"),s.createElement(l.B,{iconRight:s.createElement(o.I),style:{marginLeft:"var(--spacing-s)"}},"Button"),s.createElement(l.B,{iconLeft:s.createElement(i.a$),iconRight:s.createElement(o.I),style:{marginLeft:"var(--spacing-s)"}},"Button")),"\n",s.createElement(t.h4,{id:"small",style:{position:"relative"}},"Small",s.createElement(t.a,{href:"#small","aria-label":"small permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"It is recommended to use the standard button size in most cases. If there is a big number of actions in the same view,\nsmall buttons can be used instead of the normal sized buttons. Small buttons can be especially useful in mobile screen\nsizes to ensure uncluttered view with multiple available actions."),"\n",s.createElement(a,{style:{marginTop:"var(--spacing-m)"}},s.createElement(l.B,{size:"small"},"Primary"),s.createElement(l.B,{variant:"secondary",size:"small",style:{marginLeft:"var(--spacing-s)"}},"Secondary"),s.createElement(l.B,{variant:"supplementary",size:"small",style:{marginLeft:"var(--spacing-s)"}},"Supplementary")),"\n",s.createElement(t.h4,{id:"utility",style:{position:"relative"}},"Utility",s.createElement(t.a,{href:"#utility","aria-label":"utility permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"If required, to achieve clearer user interface, you may also use additional utility colours. Different visual styles\nof these buttons can be used to better inform users of destructive or dangerous actions. To comply with WCAG\nrequirement 1.4.1 Use of Color, these colours are more accessible when paired with an icon."),"\n",s.createElement(a,{style:{marginTop:"var(--spacing-m)"}},s.createElement(l.B,{variant:"success",iconLeft:s.createElement(i.aV)},"Save"),s.createElement(l.B,{variant:"danger",iconLeft:s.createElement(i.bl),style:{marginLeft:"var(--spacing-s)"}},"Delete")),"\n",s.createElement(t.h4,{id:"loading",style:{position:"relative"}},"Loading",s.createElement(t.a,{href:"#loading","aria-label":"loading permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"If an action triggered by the button press is not immediate, a loading button state should be shown to the user to\nindicate the loading period. When the loading action is triggered at the button press, the button will change its\nstate to loading. After the loading is complete, either the next page loads or if the page stays the same, you should\nuse other methods (such as notifications) to indicate the loading result. Note! It is not recommended to use\nSupplementary buttons for loading actions since it can be difficult for the user to differentiate from the loading\nstate button."),"\n","\n",s.createElement(a,{style:{marginTop:"var(--spacing-m)"}},s.createElement(u)),"\n",s.createElement(t.h4,{id:"used-as-a-link",style:{position:"relative"}},"Used as a link",s.createElement(t.a,{href:"#used-as-a-link","aria-label":"used as a link permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"If the button is used as a link instead of an action, a ",s.createElement(t.code,null,'role="link"')," attribute should be added to the button."),"\n",s.createElement(a,null,s.createElement(l.B,{role:"link",onClick:()=>window.open("/")},"Button")))}t.default=function(e){return void 0===e&&(e={}),s.createElement(d,e,s.createElement(m,e))}},1862:function(e,t,a){a.r(t);var n=a(11151),s=a(67294),l=a(57674),r=a(89482),i=(a(18607),a(26127)),o=a(55725);function c(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,n.ah)(),e.components);return i.Z||d("PageTabs",!1),i.Z.Tab||d("PageTabs.Tab",!0),i.Z.TabList||d("PageTabs.TabList",!0),i.Z.TabPanel||d("PageTabs.TabPanel",!0),s.createElement(s.Fragment,null,s.createElement(t.h1,{id:"button",style:{position:"relative"}},"Button",s.createElement(t.a,{href:"#button","aria-label":"button permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement("div",{class:"status-label-description"},s.createElement(o.Z,{type:"info"},"Stable"),s.createElement(o.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),s.createElement(l.Z)),"\n",s.createElement(r.Z,null,"Buttons are meant to make actions easily visible and understandable to the user. HDS offers different kinds of button\nvariations which each suit for different needs."),"\n",s.createElement(i.Z,{pageContext:e.pageContext},s.createElement(i.Z.TabList,null,s.createElement(i.Z.Tab,{href:"/"},"Usage"),s.createElement(i.Z.Tab,{href:"/code"},"Code"),s.createElement(i.Z.Tab,{href:"/accessibility"},"Accessibility"),s.createElement(i.Z.Tab,{href:"/customisation"},"Customisation")),s.createElement(i.Z.TabPanel,null,e.children)))}function d(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?s.createElement(t,e,s.createElement(c,e)):c(e)}},89482:function(e,t,a){var n=a(67294),s=a(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:l={},children:r}=e;return n.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...l}},(0,s.g)(r))}},26127:function(e,t,a){var n=a(67294),s=a(14160),l=a(48102),r=a(42972);const i="PageTabList",o="PageTabPanel",c="PageTab",d=e=>{var t;let{pageContext:a,children:d}=e;const u=a.frontmatter.slug,m=Array.isArray(d)?d:[d],h=m.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===i)),p=m.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===o)),b=null===(t=h.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===c)),g=b.findIndex((e=>u.endsWith(e.props.href))),f=-1===g?0:g,y=0===f?u:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(u);return n.createElement(l.a,{initiallyActiveTab:f},n.createElement(l.a.TabList,{className:"page-tabs-list"},b.map((e=>n.createElement(l.a.Tab,{key:e.props.href,onClick:()=>(0,s.navigate)(`${"/"===e.props.href?y:y+e.props.href}`)},(0,r.g)(e.props.children))))),b.map(((e,t)=>n.createElement(l.a.TabPanel,{key:e.props.href},f===t?p.props.children:n.createElement("div",null)))))},u=e=>{let{children:t}=e;return n.createElement(l.a.TabList,null,t)};u.componentName=i;const m=e=>{let{href:t,slug:a,children:s}=e;return n.createElement(l.a.Tab,null," ",s)};m.componentName=c;const h=e=>{let{children:t}=e;return n.createElement(l.a.TabPanel,null,t)};h.componentName=o,d.TabList=u,d.Tab=m,d.TabPanel=h,t.Z=d},55725:function(e,t,a){var n=a(67294),s=a(99123),l=a(42972);t.Z=e=>{let{children:t,...a}=e;return n.createElement(s.S,a,(0,l.g)(t))}},57674:function(e,t,a){var n=a(67294),s=a(37106);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return n.createElement(s.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},n.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>n.createElement("li",{key:t},n.createElement("span",{className:"status-name"},t),n.createElement("span",null,e[t]))))))}}}]);