"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[6448,2291],{58808:function(e,a,t){t.d(a,{B:function(){return g}});var r=t(67294),l=t(7444),n=t(34300),s=t(97640),c=t(21662),i=t(12670),o=t(29928),d="Breadcrumb-module_breadcrumb__1m52F breadcrumb_hds-breadcrumb__3JFPo",m="Breadcrumb-module_list__3hw46 breadcrumb_hds-breadcrumb__list__3qyFn";(0,l.s)(".breadcrumb_hds-breadcrumb__3JFPo{--horizontal-margin-small:var(--spacing-layout-2-xs);--horizontal-margin-medium:var(--spacing-layout-xs);--horizontal-margin-large:var(--spacing-layout-xs);--horizontal-margin-x-large:var(--spacing-layout-s);--horizontal-margin:var(--horizontal-margin-small);display:flex;margin:0 var(--horizontal-margin);padding:var(--spacing-s) 0}.breadcrumb_hds-breadcrumb__list__3qyFn{align-items:center;flex-direction:row;word-wrap:break-word}.breadcrumb_hds-breadcrumb__list--mobile__3k5FD{display:flex}.breadcrumb_hds-breadcrumb__list--desktop__2mWwT{display:none}.breadcrumb_hds-breadcrumb__list-item__2IJfr{align-items:center;display:flex;line-height:var(--lineheight-l)}.breadcrumb_hds-breadcrumb__list-item--active__cHQPc{font-weight:700;padding:3px}.breadcrumb_hds-breadcrumb__link__mhqc3.breadcrumb_hds-breadcrumb__link__mhqc3{--link-visited-color:none;--link-color:var(--color-black-90)}.breadcrumb_hds-breadcrumb__link__mhqc3:focus,.breadcrumb_hds-breadcrumb__link__mhqc3:hover{-webkit-text-decoration-color:var(--color-black-90);text-decoration-color:var(--color-black-90)}.breadcrumb_hds-breadcrumb__list--mobile__3k5FD .breadcrumb_hds-breadcrumb__link__mhqc3{font-size:var(--fontsize-body-l)}.breadcrumb_hds-breadcrumb__back-arrow__S8SMr.breadcrumb_hds-breadcrumb__back-arrow__S8SMr{display:inline-flex;margin-left:-5px;margin-right:-3px;--icon-size:var(--spacing-m)}.breadcrumb_hds-breadcrumb__separator__2oJ4Y.breadcrumb_hds-breadcrumb__separator__2oJ4Y{display:inline-flex;padding-left:var(--spacing-3-xs);--icon-size:var(--spacing-s)}@media (min-width:768px){.breadcrumb_hds-breadcrumb__3JFPo{--horizontal-margin:var(--horizontal-margin-medium)}.breadcrumb_hds-breadcrumb__list--mobile__3k5FD{display:none}.breadcrumb_hds-breadcrumb__list--desktop__2mWwT{display:flex;flex-wrap:wrap;list-style:none;margin:0;padding:0}}@media (min-width:992px){.breadcrumb_hds-breadcrumb__3JFPo{--horizontal-margin:var(--horizontal-margin-large)}}@media (min-width:1248px){.breadcrumb_hds-breadcrumb__3JFPo{--horizontal-margin:var(--horizontal-margin-x-large)}}.Breadcrumb-module_separator__3Xxu5.Breadcrumb-module_separator__3Xxu5{padding-left:2px;padding-right:2px}");const b=e=>{let{item:a}=e;return r.createElement(c.L,{href:a.path,className:"Breadcrumb-module_link__BSP1k breadcrumb_hds-breadcrumb__link__mhqc3"},a.title)},u=e=>{let{direction:a="right"}=e;const t="right"===a,l=t?i.I:o.I,n=t?"Breadcrumb-module_separator__3Xxu5 breadcrumb_hds-breadcrumb__separator__2oJ4Y":"Breadcrumb-module_backArrow__2eSmu breadcrumb_hds-breadcrumb__back-arrow__S8SMr",s=t?"xs":"s";return r.createElement("span",{className:n,"aria-hidden":!0},r.createElement(l,{size:s}))},h=e=>{let{item:a,showSeparator:t}=e;const l=null!==a.path;return r.createElement("li",{className:"Breadcrumb-module_listItem__2_AEc breadcrumb_hds-breadcrumb__list-item__2IJfr"},l?r.createElement(b,{item:a}):r.createElement("span",{"aria-current":!0,className:"Breadcrumb-module_activeListItem__2Gz5p breadcrumb_hds-breadcrumb__list-item--active__cHQPc"},a.title),t&&r.createElement(u,{key:`separator-${a.title}`}))},_=e=>{let{item:a}=e;return r.createElement("div",{className:(0,n.c)(m,"Breadcrumb-module_mobileList__1rj5r breadcrumb_hds-breadcrumb__list--mobile__3k5FD")},r.createElement(u,{direction:"left"}),r.createElement(b,{item:a}))},p=e=>{let{list:a}=e;return r.createElement("ol",{className:(0,n.c)(m,"Breadcrumb-module_desktopList__3WHv- breadcrumb_hds-breadcrumb__list--desktop__2mWwT")},a.map(((e,t)=>r.createElement(r.Fragment,{key:e.title},r.createElement(h,{key:e.title,item:e,showSeparator:t<a.length-1})))))},g=e=>{let{list:a,ariaLabel:t,theme:l}=e;const c=(0,s.u)(d,l),i=a.reduceRight(((e,a)=>e||(a.path?a:void 0)),void 0);return i?r.createElement("nav",{"aria-label":t,className:(0,n.c)(d,c)},r.createElement(p,{list:a}),r.createElement(_,{item:i})):null}},83428:function(e,a,t){t.d(a,{S:function(){return o}});var r=t(80136),l=t(67294),n=t(7444),s=t(34300),c={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,n.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const i=e=>{let{icon:a}=e;return l.createElement("span",{className:c.statusLabelIcon,"aria-hidden":"true"},a)},o=e=>{var{children:a,className:t,dataTestId:n,type:o="neutral",iconLeft:d}=e,m=(0,r._)(e,["children","className","dataTestId","type","iconLeft"]);return l.createElement("span",Object.assign({className:(0,s.c)(c.statusLabel,c[o],d&&c.statusLabelWithIcon,t),"data-testid":n},m),d&&l.createElement(i,{icon:d}),a)}},16664:function(e,a,t){t.r(a);var r=t(11151),l=t(67294),n=t(58808),s=t(50275);const c=e=>{let{children:a,pageContext:t}=e;return l.createElement(s.default,{pageContext:t},a)};function i(e){const a=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",pre:"pre",code:"code",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",strong:"strong",p:"p"},(0,r.ah)(),e.components),{Playground:t,IconCheckCircleFill:s,Link:c,ExternalLink:i}=a;return i||o("ExternalLink",!0),s||o("IconCheckCircleFill",!0),c||o("Link",!0),t||o("Playground",!0),l.createElement(l.Fragment,null,l.createElement(a.h2,{id:"code",style:{position:"relative"}},"Code",l.createElement(a.a,{href:"#code","aria-label":"code permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.h3,{id:"code-examples",style:{position:"relative"}},"Code examples",l.createElement(a.a,{href:"#code-examples","aria-label":"code examples permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t,{scope:{Breadcrumb:n.B}},l.createElement(a.pre,null,l.createElement(a.code,{className:"language-jsx"},"import { Breadcrumb } from 'hds-react';\n\n() => (\n  <Breadcrumb\n    ariaLabel=\"Breadcrumb\"\n    list={[\n      { title: 'Front page', path: '/' },\n      { title: 'Health and social services', path: '/path' },\n      { title: 'Senior services', path: '/path/2ndLevelPath' },\n      { title: 'Informal care', path: '/path/2ndLevelPath/3rdLevelPath' },\n      { title: 'Care options', path: null },\n    ]}\n  />\n)\n")),l.createElement(a.pre,null,l.createElement(a.code,{className:"language-html"},'<nav aria-label="Breadcrumb" class="hds-breadcrumb">\n  <ol class="hds-breadcrumb__list hds-breadcrumb__list--desktop">\n    <li class="hds-breadcrumb__list-item">\n      <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/">Front page</a>\n      <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>\n    </li>\n    <li class="hds-breadcrumb__list-item">\n      <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/path">Health and social services</a>\n      <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>\n    </li>\n    <li class="hds-breadcrumb__list-item">\n      <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/path/2ndLevelPath">Senior services</a>\n      <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>\n    </li>\n    <li class="hds-breadcrumb__list-item">\n      <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/path/2ndLevelPath/3rdLevelPath">Informal care</a>\n      <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>\n    </li>\n    <li class="hds-breadcrumb__list-item hds-breadcrumb__list-item--active">\n      <span aria-current="true" class="Breadcrumb_active__02+NO">Care options</span>\n    </li>\n  </ol>\n  <div class="hds-breadcrumb__list hds-breadcrumb__list--mobile">\n    <span class="hds-icon hds-icon--angle-left hds-breadcrumb__back-arrow" aria-hidden="true"> </span>\n    <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/path/2ndLevelPath/3rdLevelPath">Informal care</a>\n  </div>\n</nav>\n'))),"\n",l.createElement(a.h3,{id:"packages",style:{position:"relative"}},"Packages",l.createElement(a.a,{href:"#packages","aria-label":"packages permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.table,null,l.createElement(a.thead,null,l.createElement(a.tr,null,l.createElement(a.th,null,"Package"),l.createElement(a.th,null,"Included"),l.createElement(a.th,null,"Storybook link"),l.createElement(a.th,null,"Source link"))),l.createElement(a.tbody,null,l.createElement(a.tr,null,l.createElement(a.td,null,l.createElement(a.strong,null,"HDS React")),l.createElement(a.td,null,l.createElement("div",{style:{display:"flex",gap:"var(--spacing-3-xs)"}},l.createElement(s)," Yes ")),l.createElement(a.td,null,l.createElement(c,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-breadcrumb--example"},"View in Storybook")),l.createElement(a.td,null,l.createElement(i,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"https://github.com/City-of-Helsinki/helsinki-design-system/tree/master/packages/react/src/components/breadcrumb"},"View source"))),l.createElement(a.tr,null,l.createElement(a.td,null,l.createElement(a.strong,null,"HDS Core")),l.createElement(a.td,null,l.createElement("div",{style:{display:"flex",gap:"var(--spacing-3-xs)"}},l.createElement(s)," Yes ")),l.createElement(a.td,null,l.createElement(c,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/core/?path=/story/components-breadcrumb--breadcrumb"},"View in Storybook")),l.createElement(a.td,null,l.createElement(i,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"https://github.com/City-of-Helsinki/helsinki-design-system/tree/master/packages/core/src/components/breadcrumb"},"View source"))))),"\n",l.createElement(a.h3,{id:"properties",style:{position:"relative"}},"Properties",l.createElement(a.a,{href:"#properties","aria-label":"properties permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.p,null,"Note! You can find the full list of properties in the ",l.createElement(c,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-breadcrumb--example"},"React Storybook.")),"\n",l.createElement(a.table,null,l.createElement(a.thead,null,l.createElement(a.tr,null,l.createElement(a.th,null,"Property"),l.createElement(a.th,null,"Description"),l.createElement(a.th,null,"Values"),l.createElement(a.th,null,"Default value"))),l.createElement(a.tbody,null,l.createElement(a.tr,null,l.createElement(a.td,null,l.createElement(a.code,null,"ariaLabel")),l.createElement(a.td,null,l.createElement(a.code,null,"aria-label")," of the ",l.createElement(a.code,null,"<nav>")," element created by the component"),l.createElement(a.td,null,l.createElement(a.code,null,"string")),l.createElement(a.td,null,"-")),l.createElement(a.tr,null,l.createElement(a.td,null,l.createElement(a.code,null,"list")),l.createElement(a.td,null,"Array of breadcrumb items. Each item is an object with ",l.createElement(a.code,null,"title")," and ",l.createElement(a.code,null,"path")),l.createElement(a.td,null,l.createElement(a.code,null,"BreadcrumbListItem[]")),l.createElement(a.td,null,"-")))))}function o(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}a.default=function(e){return void 0===e&&(e={}),l.createElement(c,e,l.createElement(i,e))}},50275:function(e,a,t){t.r(a);var r=t(11151),l=t(67294),n=t(83428),s=t(89482),c=(t(18607),t(26127)),i=t(57674);function o(e){const a=Object.assign({h1:"h1",a:"a",span:"span"},(0,r.ah)(),e.components);return c.Z||d("PageTabs",!1),c.Z.Tab||d("PageTabs.Tab",!0),c.Z.TabList||d("PageTabs.TabList",!0),c.Z.TabPanel||d("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(a.h1,{id:"breadcrumb",style:{position:"relative"}},"Breadcrumb",l.createElement(a.a,{href:"#breadcrumb","aria-label":"breadcrumb permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{class:"status-label-description"},l.createElement(n.S,{type:"alert"},"Beta"),l.createElement(n.S,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(i.Z)),"\n",l.createElement(s.Z,null,"Breadcrumb is a navigational element that provides links back to each previous page the user navigated through and\nshows the user's current location on a website."),"\n",l.createElement(c.Z,{pageContext:e.pageContext},l.createElement(c.Z.TabList,null,l.createElement(c.Z.Tab,{href:"/"},"Usage"),l.createElement(c.Z.Tab,{href:"/code"},"Code"),l.createElement(c.Z.Tab,{href:"/accessibility"},"Accessibility"),l.createElement(c.Z.Tab,{href:"/customisation"},"Customisation")),l.createElement(c.Z.TabPanel,null,e.children)))}function d(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}a.default=function(e){void 0===e&&(e={});const{wrapper:a}=Object.assign({},(0,r.ah)(),e.components);return a?l.createElement(a,e,l.createElement(o,e)):o(e)}},89482:function(e,a,t){var r=t(67294);a.Z=e=>{let{color:a="var(--color-black-90)",size:t="var(--fontsize-body-xl)",style:l={},children:n}=e;return r.createElement("p",{style:{fontSize:t,color:a,maxWidth:600,...l}},n)}},26127:function(e,a,t){var r=t(67294),l=t(14160),n=t(67461);const s="PageTabList",c="PageTabPanel",i="PageTab",o=e=>{var a;let{pageContext:t,children:o}=e;const d=t.frontmatter.slug,m=Array.isArray(o)?o:[o],b=m.find((e=>(0,r.isValidElement)(e)&&e.type.componentName===s)),u=m.find((e=>(0,r.isValidElement)(e)&&e.type.componentName===c)),h=null===(a=b.props)||void 0===a?void 0:a.children.filter((e=>e.type.componentName===i)),_=h.findIndex((e=>d.endsWith(e.props.href))),p=-1===_?0:_,g=0===p?d:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(d);return r.createElement(n.a,{initiallyActiveTab:p},r.createElement(n.a.TabList,{className:"page-tabs-list"},h.map((e=>r.createElement(n.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(`${"/"===e.props.href?g:g+e.props.href}`)},e.props.children)))),h.map(((e,a)=>r.createElement(n.a.TabPanel,{key:e.props.href},p===a?u.props.children:r.createElement("div",null)))))},d=e=>{let{children:a}=e;return r.createElement(n.a.TabList,null,a)};d.componentName=s;const m=e=>{let{href:a,slug:t,children:l}=e;return r.createElement(n.a.Tab,null,l)};m.componentName=i;const b=e=>{let{children:a}=e;return r.createElement(n.a.TabPanel,null,a)};b.componentName=c,o.TabList=d,o.Tab=m,o.TabPanel=b,a.Z=o},57674:function(e,a,t){var r=t(67294),l=t(45422);a.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return r.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},r.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((a=>r.createElement("li",{key:a},r.createElement("span",{className:"status-name"},a),r.createElement("span",null,e[a]))))))}}}]);