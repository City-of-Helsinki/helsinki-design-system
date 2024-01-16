"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[9805,2166],{83428:function(e,a,t){t.d(a,{S:function(){return c}});var n=t(80136),l=t(67294),s=t(7444),r=t(34300),o={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,s.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const i=e=>{let{icon:a}=e;return l.createElement("span",{className:o.statusLabelIcon,"aria-hidden":"true"},a)},c=e=>{var{children:a,className:t,dataTestId:s,type:c="neutral",iconLeft:h}=e,d=(0,n._)(e,["children","className","dataTestId","type","iconLeft"]);return l.createElement("span",Object.assign({className:(0,r.c)(o.statusLabel,o[c],h&&o.statusLabelWithIcon,t),"data-testid":s},d),h&&l.createElement(i,{icon:h}),a)}},44108:function(e,a,t){t.r(a);var n=t(11151),l=t(67294),s=t(21662),r=t(43161);const o=e=>{let{children:a,pageContext:t}=e;return l.createElement(r.default,{pageContext:t},a)};function i(e){const a=Object.assign({h2:"h2",a:"a",span:"span",p:"p",h3:"h3",ul:"ul",li:"li"},(0,n.ah)(),e.components),{InternalLink:t}=a;return t||function(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("InternalLink",!0),l.createElement(l.Fragment,null,l.createElement(a.h2,{id:"usage",style:{position:"relative"}},"Usage",l.createElement(a.a,{href:"#usage","aria-label":"usage permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.p,null,"This documentation page is about HDS CookieCompliance component. If you are looking for documentation about cookies in general, please refer to the ",l.createElement(t,{href:"/patterns/cookies/basics"},"HDS cookie pattern documentation page"),"."),"\n",l.createElement(a.h3,{id:"example",style:{position:"relative"}},"Example",l.createElement(a.a,{href:"#example","aria-label":"example permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(s.L,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-cookieconsent--english-modal-version"},l.createElement(a.p,null,"View modal example in Storybook")),"\n",l.createElement(a.h3,{id:"principles",style:{position:"relative"}},"Principles",l.createElement(a.a,{href:"#principles","aria-label":"principles permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.ul,null,"\n",l.createElement(a.li,null,"Include the cookie consent component on every page of the service. The user may arrive on any page of the service (e.g. via a search engine). The component checks, if it should be rendered or not."),"\n",l.createElement(a.li,null,"The cookie consent can be rendered either as a modal or as a page. This allows using the same cookie data for both presentation variations.","\n",l.createElement(a.ul,null,"\n",l.createElement(a.li,null,"Use the modal variant as a banner when the user enters the site."),"\n",l.createElement(a.li,null,"Use the page variant as a full page that the user can access from the page ",l.createElement(t,{href:"/components/footer"},"Footer")," element."),"\n"),"\n"),"\n",l.createElement(a.li,null,"You must offer the cookie consent modal and page in all languages that your service supports.","\n",l.createElement(a.ul,null,"\n",l.createElement(a.li,null,"By default, the cookie consent banner should use the same language as the service is using."),"\n",l.createElement(a.li,null,"The component has its language switcher so the user can easily switch the language of the dialog even if they opened the service with a language they do not understand."),"\n",l.createElement(a.li,null,"The component supports Finnish, Swedish and English."),"\n"),"\n"),"\n"),"\n",l.createElement(a.h3,{id:"variations",style:{position:"relative"}},"Variations",l.createElement(a.a,{href:"#variations","aria-label":"variations permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.h3,{id:"modal",style:{position:"relative"}},"Modal",l.createElement(a.a,{href:"#modal","aria-label":"modal permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.p,null,"The default banner variant opens at the bottom of the viewport. It is opened if the consent for cookies has not been given or if the cookies have changed. The banner can be expanded to view and change cookie settings."),"\n",l.createElement(s.L,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-cookieconsent--english-modal-version"},l.createElement(a.p,null,"View modal example in Storybook")),"\n",l.createElement(a.h3,{id:"rendered-on-a-page",style:{position:"relative"}},"Rendered on a page",l.createElement(a.a,{href:"#rendered-on-a-page","aria-label":"rendered on a page permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.p,null,"The cookie consent expanded settings page can be rendered as a separate page. This is used to create a cookie page that the user can access via a link in the ",l.createElement(t,{href:"/components/footer"},"Footer")," element. This allows the user to view or edit cookie settings after the initial consent has been given."),"\n",l.createElement(s.L,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-cookieconsent--page-version"},l.createElement(a.p,null,"View page example in Storybook")))}a.default=function(e){return void 0===e&&(e={}),l.createElement(o,e,l.createElement(i,e))}},43161:function(e,a,t){t.r(a);var n=t(11151),l=t(67294),s=t(57674),r=t(89482),o=(t(18607),t(26127)),i=t(55725);function c(e){const a=Object.assign({h1:"h1",a:"a",span:"span",p:"p"},(0,n.ah)(),e.components);return o.Z||h("PageTabs",!1),o.Z.Tab||h("PageTabs.Tab",!0),o.Z.TabList||h("PageTabs.TabList",!0),o.Z.TabPanel||h("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(a.h1,{id:"cookieconsent",style:{position:"relative"}},"CookieConsent",l.createElement(a.a,{href:"#cookieconsent","aria-label":"cookieconsent permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{class:"status-label-description"},l.createElement(i.Z,{type:"error"},"Draft"),l.createElement(i.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(s.Z)),"\n",l.createElement(r.Z,null,l.createElement(a.p,null,"The cookie compliance component informs users about cookie usage. This banner is shown when they visit a website or an\napplication for the first time.")),"\n",l.createElement(o.Z,{pageContext:e.pageContext},l.createElement(o.Z.TabList,null,l.createElement(o.Z.Tab,{href:"/"},"Usage"),l.createElement(o.Z.Tab,{href:"/code"},"Code"),l.createElement(o.Z.Tab,{href:"/api"},"API"),l.createElement(o.Z.Tab,{href:"/accessibility"},"Accessibility")),l.createElement(o.Z.TabPanel,null,e.children)))}function h(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}a.default=function(e){void 0===e&&(e={});const{wrapper:a}=Object.assign({},(0,n.ah)(),e.components);return a?l.createElement(a,e,l.createElement(c,e)):c(e)}},89482:function(e,a,t){var n=t(67294),l=t(42972);a.Z=e=>{let{color:a="var(--color-black-90)",size:t="var(--fontsize-body-xl)",style:s={},children:r}=e;return n.createElement("p",{style:{fontSize:t,color:a,maxWidth:600,...s}},(0,l.g)(r))}},26127:function(e,a,t){var n=t(67294),l=t(14160),s=t(18261),r=t(42972);const o="PageTabList",i="PageTabPanel",c="PageTab",h=e=>{var a;let{pageContext:t,children:h}=e;const d=t.frontmatter.slug,u=Array.isArray(h)?h:[h],m=u.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===o)),p=u.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===i)),b=null===(a=m.props)||void 0===a?void 0:a.children.filter((e=>e.type.componentName===c)),g=b.findIndex((e=>d.endsWith(e.props.href))),f=-1===g?0:g,E=0===f?d:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(d);return n.createElement(s.a,{initiallyActiveTab:f},n.createElement(s.a.TabList,{className:"page-tabs-list"},b.map((e=>n.createElement(s.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(`${"/"===e.props.href?E:E+e.props.href}`)},(0,r.g)(e.props.children))))),b.map(((e,a)=>n.createElement(s.a.TabPanel,{key:e.props.href},f===a?p.props.children:n.createElement("div",null)))))},d=e=>{let{children:a}=e;return n.createElement(s.a.TabList,null,a)};d.componentName=o;const u=e=>{let{href:a,slug:t,children:l}=e;return n.createElement(s.a.Tab,null," ",l)};u.componentName=c;const m=e=>{let{children:a}=e;return n.createElement(s.a.TabPanel,null,a)};m.componentName=i,h.TabList=d,h.Tab=u,h.TabPanel=m,a.Z=h},55725:function(e,a,t){var n=t(67294),l=t(83428),s=t(42972);a.Z=e=>{let{children:a,...t}=e;return n.createElement(l.S,t,(0,s.g)(a))}},57674:function(e,a,t){var n=t(67294),l=t(45422);a.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return n.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},n.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((a=>n.createElement("li",{key:a},n.createElement("span",{className:"status-name"},a),n.createElement("span",null,e[a]))))))}}}]);