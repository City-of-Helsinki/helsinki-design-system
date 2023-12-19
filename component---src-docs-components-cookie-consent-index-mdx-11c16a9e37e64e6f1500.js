"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[9805,2166],{83428:function(e,a,t){t.d(a,{S:function(){return c}});var n=t(80136),s=t(67294),l=t(7444),r=t(34300),o={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,l.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const i=e=>{let{icon:a}=e;return s.createElement("span",{className:o.statusLabelIcon,"aria-hidden":"true"},a)},c=e=>{var{children:a,className:t,dataTestId:l,type:c="neutral",iconLeft:h}=e,d=(0,n._)(e,["children","className","dataTestId","type","iconLeft"]);return s.createElement("span",Object.assign({className:(0,r.c)(o.statusLabel,o[c],h&&o.statusLabelWithIcon,t),"data-testid":l},d),h&&s.createElement(i,{icon:h}),a)}},44108:function(e,a,t){t.r(a);var n=t(11151),s=t(67294),l=t(21662),r=t(43161);const o=e=>{let{children:a,pageContext:t}=e;return s.createElement(r.default,{pageContext:t},a)};function i(e){const a=Object.assign({h2:"h2",a:"a",span:"span",p:"p",h3:"h3",ul:"ul",li:"li"},(0,n.ah)(),e.components),{InternalLink:t}=a;return t||function(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("InternalLink",!0),s.createElement(s.Fragment,null,s.createElement(a.h2,{id:"usage",style:{position:"relative"}},"Usage",s.createElement(a.a,{href:"#usage","aria-label":"usage permalink",className:"header-anchor after"},s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(a.p,null,"This documentation page is about HDS CookieCompliance component. If you are looking for documentation about cookies in general, please refer to the ",s.createElement(t,{href:"/patterns/cookies/basics"},"HDS cookie pattern documentation page"),"."),"\n",s.createElement(a.h3,{id:"example",style:{position:"relative"}},"Example",s.createElement(a.a,{href:"#example","aria-label":"example permalink",className:"header-anchor after"},s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(l.L,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-cookieconsent--english-modal-version"},s.createElement(a.p,null,"View modal example in Storybook")),"\n",s.createElement(a.h3,{id:"principles",style:{position:"relative"}},"Principles",s.createElement(a.a,{href:"#principles","aria-label":"principles permalink",className:"header-anchor after"},s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(a.ul,null,"\n",s.createElement(a.li,null,"Include the cookie consent component on every page of the service. The user may arrive on any page of the service (e.g. via a search engine). The component checks, if it should be rendered or not."),"\n",s.createElement(a.li,null,"The cookie consent can be rendered either as a modal or as a page. This allows using the same cookie data for both presentation variations.","\n",s.createElement(a.ul,null,"\n",s.createElement(a.li,null,"Use the modal variant as a banner when the user enters the site."),"\n",s.createElement(a.li,null,"Use the page variant as a full page that the user can access from the page ",s.createElement(t,{href:"/components/footer"},"Footer")," element."),"\n"),"\n"),"\n",s.createElement(a.li,null,"You must offer the cookie consent modal and page in all languages that your service supports.","\n",s.createElement(a.ul,null,"\n",s.createElement(a.li,null,"By default, the cookie consent banner should use the same language as the service is using."),"\n",s.createElement(a.li,null,"The component has its language switcher so the user can easily switch the language of the dialog even if they opened the service with a language they do not understand."),"\n",s.createElement(a.li,null,"The component supports Finnish, Swedish and English."),"\n"),"\n"),"\n"),"\n",s.createElement(a.h3,{id:"variations",style:{position:"relative"}},"Variations",s.createElement(a.a,{href:"#variations","aria-label":"variations permalink",className:"header-anchor after"},s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(a.h3,{id:"modal",style:{position:"relative"}},"Modal",s.createElement(a.a,{href:"#modal","aria-label":"modal permalink",className:"header-anchor after"},s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(a.p,null,"The default banner variant opens at the bottom of the viewport. It is opened if the consent for cookies has not been given or if the cookies have changed. The banner can be expanded to view and change cookie settings."),"\n",s.createElement(l.L,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-cookieconsent--english-modal-version"},s.createElement(a.p,null,"View modal example in Storybook")),"\n",s.createElement(a.h3,{id:"rendered-on-a-page",style:{position:"relative"}},"Rendered on a page",s.createElement(a.a,{href:"#rendered-on-a-page","aria-label":"rendered on a page permalink",className:"header-anchor after"},s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement(a.p,null,"The cookie consent expanded settings page can be rendered as a separate page. This is used to create a cookie page that the user can access via a link in the ",s.createElement(t,{href:"/components/footer"},"Footer")," element. This allows the user to view or edit cookie settings after the initial consent has been given."),"\n",s.createElement(l.L,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-cookieconsent--page-version"},s.createElement(a.p,null,"View page example in Storybook")))}a.default=function(e){return void 0===e&&(e={}),s.createElement(o,e,s.createElement(i,e))}},43161:function(e,a,t){t.r(a);var n=t(11151),s=t(67294),l=t(83428),r=t(57674),o=t(89482),i=(t(18607),t(26127));function c(e){const a=Object.assign({h1:"h1",a:"a",span:"span"},(0,n.ah)(),e.components);return i.Z||h("PageTabs",!1),i.Z.Tab||h("PageTabs.Tab",!0),i.Z.TabList||h("PageTabs.TabList",!0),i.Z.TabPanel||h("PageTabs.TabPanel",!0),s.createElement(s.Fragment,null,s.createElement(a.h1,{id:"cookieconsent",style:{position:"relative"}},"CookieConsent",s.createElement(a.a,{href:"#cookieconsent","aria-label":"cookieconsent permalink",className:"header-anchor after"},s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",s.createElement("div",{class:"status-label-description"},s.createElement(l.S,{type:"error"},"Draft"),s.createElement(l.S,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),s.createElement(r.Z)),"\n",s.createElement(o.Z,null,"The cookie compliance component informs users about cookie usage. This banner is shown when they visit a website or an\napplication for the first time."),"\n",s.createElement(i.Z,{pageContext:e.pageContext},s.createElement(i.Z.TabList,null,s.createElement(i.Z.Tab,{href:"/"},"Usage"),s.createElement(i.Z.Tab,{href:"/code"},"Code"),s.createElement(i.Z.Tab,{href:"/api"},"API"),s.createElement(i.Z.Tab,{href:"/accessibility"},"Accessibility")),s.createElement(i.Z.TabPanel,null,e.children)))}function h(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}a.default=function(e){void 0===e&&(e={});const{wrapper:a}=Object.assign({},(0,n.ah)(),e.components);return a?s.createElement(a,e,s.createElement(c,e)):c(e)}},89482:function(e,a,t){var n=t(67294);a.Z=e=>{let{color:a="var(--color-black-90)",size:t="var(--fontsize-body-xl)",style:s={},children:l}=e;return n.createElement("p",{style:{fontSize:t,color:a,maxWidth:600,...s}},l)}},26127:function(e,a,t){var n=t(67294),s=t(14160),l=t(67461);const r="PageTabList",o="PageTabPanel",i="PageTab",c=e=>{var a;let{pageContext:t,children:c}=e;const h=t.frontmatter.slug,d=Array.isArray(c)?c:[c],u=d.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===r)),m=d.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===o)),p=null===(a=u.props)||void 0===a?void 0:a.children.filter((e=>e.type.componentName===i)),b=p.findIndex((e=>h.endsWith(e.props.href))),g=-1===b?0:b,f=0===g?h:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(h);return n.createElement(l.a,{initiallyActiveTab:g},n.createElement(l.a.TabList,{className:"page-tabs-list"},p.map((e=>n.createElement(l.a.Tab,{key:e.props.href,onClick:()=>(0,s.navigate)(`${"/"===e.props.href?f:f+e.props.href}`)},e.props.children)))),p.map(((e,a)=>n.createElement(l.a.TabPanel,{key:e.props.href},g===a?m.props.children:n.createElement("div",null)))))},h=e=>{let{children:a}=e;return n.createElement(l.a.TabList,null,a)};h.componentName=r;const d=e=>{let{href:a,slug:t,children:s}=e;return n.createElement(l.a.Tab,null,s)};d.componentName=i;const u=e=>{let{children:a}=e;return n.createElement(l.a.TabPanel,null,a)};u.componentName=o,c.TabList=h,c.Tab=d,c.TabPanel=u,a.Z=c},57674:function(e,a,t){var n=t(67294),s=t(45422);a.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return n.createElement(s.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},n.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((a=>n.createElement("li",{key:a},n.createElement("span",{className:"status-name"},a),n.createElement("span",null,e[a]))))))}}}]);