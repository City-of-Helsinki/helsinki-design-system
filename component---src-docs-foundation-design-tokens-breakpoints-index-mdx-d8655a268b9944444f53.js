"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[7247,2190],{99123:function(e,t,a){a.d(t,{S:function(){return c}});var n=a(80136),s=a(67294),l=(a(7568),a(7444)),r=a(34300),i={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,l.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const o=e=>{let{icon:t}=e;return s.createElement("span",{className:i.statusLabelIcon,"aria-hidden":"true"},t)},c=e=>{var{children:t,className:a,dataTestId:l,type:c="neutral",iconLeft:d}=e,u=(0,n._)(e,["children","className","dataTestId","type","iconLeft"]);return s.createElement("span",Object.assign({className:(0,r.c)(i.statusLabel,i[c],d&&i.statusLabelWithIcon,a),"data-testid":l},u),d&&s.createElement(o,{icon:d}),t)}},25083:function(e,t,a){a.r(t);var n=a(11151),s=a(67294),l=a(17681),r=a(80699),i=a(1076),o=a(37964);const c=e=>{let{children:t,pageContext:a}=e;return s.createElement(o.default,{pageContext:a},t)};function d(e){const t=Object.assign({h2:"h2",a:"a",span:"span",p:"p",ul:"ul",li:"li",strong:"strong",code:"code",h3:"h3"},(0,n.ah)(),e.components);return s.createElement(s.Fragment,null,s.createElement(t.h2,{id:"usage",style:{position:"relative"}},"Usage",s.createElement(t.a,{href:"#usage","aria-label":"usage permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"HDS includes tokenized values for both breakpoints and a maximum container width. Breakpoint tokens can be also used alongside ",s.createElement(i.Z,{size:"M",href:"/foundation/guidelines/grid"},"HDS grid guidelines")," in order to create consistent designs and implementations."),"\n",s.createElement(t.p,null,"HDS offers helpful utilities for breakpoint handling:"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"Container component")," which follows breakpoint and container width tokens automatically. It is recommended to use it if possible. For more info and examples, see ",s.createElement(l.L,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-container--example"},"Container - React documentation")," and ",s.createElement(l.L,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/core/?path=/story/components-container--default"},"Container - Core documentation"),"."),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"Hooks for React components"),"; ",s.createElement(t.code,null,"useMediaQueryLessThan")," and ",s.createElement(t.code,null,"useMediaQueryGreaterThan")," hooks listen to browser window resize events and return a boolean value when the window size is over or under the given breakpoint parameter. For more information see ",s.createElement(r.Z,{openInNewTab:!0,href:"https://github.com/City-of-Helsinki/helsinki-design-system/blob/development/packages/react/src/hooks/useMediaQuery.ts"},"the hooks' code"),", and for examples, see ",s.createElement(r.Z,{openInNewTab:!0,href:"https://github.com/City-of-Helsinki/helsinki-design-system/blob/development/packages/react/src/components/header/Header.tsx"},"the Header component's source code"),"."),"\n"),"\n",s.createElement(t.h3,{id:"principles",style:{position:"relative"}},"Principles",s.createElement(t.a,{href:"#principles","aria-label":"principles permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"Always use token of the same level for both the breakpoint and container width. This ensures consistency across all services using HDS breakpoint tokens. Read more about this in ",s.createElement(t.a,{href:"#using-breakpoint-tokens"},"the breakpoint usage section.")),"\n",s.createElement(t.li,null,"Aim to provide all breakpoints listed in HDS tokens in your service. This way you ensure your service is usable with every common screen width."),"\n",s.createElement(t.li,null,"For best results, test your designs and implementations at the edge of each HDS breakpoint."),"\n",s.createElement(t.li,null,"HDS uses a simple method to scale content when the screen size changes. Below the ",s.createElement(t.code,null,"--container-width-xl")," the content container always takes all available space.","\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"It is recommended to use scaling methods HDS suggests for each breakpoint (",s.createElement(i.Z,{size:"M",href:"/foundation/design-tokens/breakpoints/tokens#tokens"},"see Breakpoints token table"),"). However, it is allowed to use different scaling methods if it works better for the service."),"\n"),"\n"),"\n"),"\n",s.createElement(t.h3,{id:"accessibility",style:{position:"relative"}},"Accessibility",s.createElement(t.a,{href:"#accessibility","aria-label":"accessibility permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"Carefully test your implementation at different breakpoints - especially at the edge values of a breakpoint."),"\n",s.createElement(t.li,null,"Pay extra attention how your service behaves if browser zoom functionality is used. Read more about the ",s.createElement(r.Z,{openInNewTab:!0,href:"https://www.w3.org/WAI/WCAG21/Understanding/reflow.html"},"WCAG requirements considering reflow"),"."),"\n"),"\n",s.createElement(t.h3,{id:"using-breakpoint-tokens",style:{position:"relative"}},"Using breakpoint tokens",s.createElement(t.a,{href:"#using-breakpoint-tokens","aria-label":"using breakpoint tokens permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(t.p,null,"The breakpoint tokens are divided into two sets;"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"Breakpoint tokens")," define exact widths (in pixels) where the next breakpoint comes into effect."),"\n",s.createElement(t.li,null,s.createElement(t.strong,null,"Container width token")," defines maximum container width."),"\n"),"\n",s.createElement(t.p,null,"When breakpoints change the left and right padding of the container changes. It is recommended to use the provided padding values because they match with ",s.createElement(i.Z,{href:"/components/footer"},"HDS Footer")," paddings. You can find these paddings on the ",s.createElement(i.Z,{href:"/foundation/design-tokens/breakpoints/tokens"},"HDS Breakpoints tokens tab.")),"\n",s.createElement(t.p,null,"The maximum content container width is always ",s.createElement(t.code,null,"--container-width-xl")," (1200px). When the viewport width is below this value, the content container always takes all available space. Note that the ",s.createElement(i.Z,{href:"/components/header"},"Header component")," is an exception with maximum width of 1440 pixels so it should not be placed inside the grid container."))}t.default=function(e){return void 0===e&&(e={}),s.createElement(c,e,s.createElement(d,e))}},37964:function(e,t,a){a.r(t);var n=a(11151),s=a(67294),l=a(89482),r=(a(18607),a(26127)),i=a(55725);function o(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,n.ah)(),e.components);return r.Z||c("PageTabs",!1),r.Z.Tab||c("PageTabs.Tab",!0),r.Z.TabList||c("PageTabs.TabList",!0),r.Z.TabPanel||c("PageTabs.TabPanel",!0),s.createElement(s.Fragment,null,s.createElement(t.h1,{id:"breakpoints",style:{position:"relative"}},"Breakpoints",s.createElement(t.a,{href:"#breakpoints","aria-label":"breakpoints permalink",className:"header-anchor after"},s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(i.Z,{type:"info"},"Stable"),"\n",s.createElement(l.Z,null,"Breakpoint tokens are used to keep services and products using HDS consistent across all screen sizes."),"\n",s.createElement(r.Z,{pageContext:e.pageContext},s.createElement(r.Z.TabList,null,s.createElement(r.Z.Tab,{href:"/"},"Usage"),s.createElement(r.Z.Tab,{href:"/tokens"},"Tokens")),s.createElement(r.Z.TabPanel,null,e.children)))}function c(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?s.createElement(t,e,s.createElement(o,e)):o(e)}},89482:function(e,t,a){var n=a(67294),s=a(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:l={},children:r}=e;return n.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...l}},(0,s.g)(r))}},26127:function(e,t,a){var n=a(67294),s=a(14160),l=a(21335),r=a(42972);const i="PageTabList",o="PageTabPanel",c="PageTab",d=e=>{var t;let{pageContext:a,children:d}=e;const u=a.frontmatter.slug,h=Array.isArray(d)?d:[d],m=h.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===i)),p=h.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===o)),b=null===(t=m.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===c)),g=b.findIndex((e=>u.endsWith(e.props.href))),f=-1===g?0:g,k=0===f?u:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(u);return n.createElement(l.a,{initiallyActiveTab:f},n.createElement(l.a.TabList,{className:"page-tabs-list"},b.map((e=>n.createElement(l.a.Tab,{key:e.props.href,onClick:()=>(0,s.navigate)(`${"/"===e.props.href?k:k+e.props.href}`)},(0,r.g)(e.props.children))))),b.map(((e,t)=>n.createElement(l.a.TabPanel,{key:e.props.href},f===t?p.props.children:n.createElement("div",null)))))},u=e=>{let{children:t}=e;return n.createElement(l.a.TabList,null,t)};u.componentName=i;const h=e=>{let{href:t,slug:a,children:s}=e;return n.createElement(l.a.Tab,null," ",s)};h.componentName=c;const m=e=>{let{children:t}=e;return n.createElement(l.a.TabPanel,null,t)};m.componentName=o,d.TabList=u,d.Tab=h,d.TabPanel=m,t.Z=d},55725:function(e,t,a){var n=a(67294),s=a(99123),l=a(42972);t.Z=e=>{let{children:t,...a}=e;return n.createElement(s.S,a,(0,l.g)(t))}}}]);