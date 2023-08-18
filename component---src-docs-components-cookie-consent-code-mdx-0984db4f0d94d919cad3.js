"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[9379,2166],{71659:function(e,t,n){n.d(t,{S:function(){return i}});var a=n(80136),l=n(67294),s=n(7444),o=n(44458),r={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4",rounded:"StatusLabel-module_rounded__2znRD status-label_hds-status-label--rounded-corners__2Uam1"};(0,s.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}.status-label_hds-status-label--rounded-corners__2Uam1{border-radius:20px}");const c=e=>{let{icon:t}=e;return l.createElement("span",{className:r.statusLabelIcon,"aria-hidden":"true"},t)},i=e=>{var{children:t,className:n,dataTestId:s,type:i="neutral",iconLeft:d,variant:m}=e,u=(0,a._)(e,["children","className","dataTestId","type","iconLeft","variant"]);return l.createElement("span",Object.assign({className:(0,o.c)(r.statusLabel,r[i],d&&r.statusLabelWithIcon,m&&r[m],n),"data-testid":s},u),d&&l.createElement(c,{icon:d}),t)}},65587:function(e,t,n){n.r(t);var a=n(11151),l=n(67294),s=n(43161);const o=e=>{let{children:t,pageContext:n}=e;return l.createElement(s.default,{pageContext:n},t)};function r(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",pre:"pre",code:"code",p:"p",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",strong:"strong"},(0,a.ah)(),e.components),{Link:n,IconCheckCircleFill:s,ExternalLink:o,IconCrossCircle:r,InternalLink:i}=t;return o||c("ExternalLink",!0),s||c("IconCheckCircleFill",!0),r||c("IconCrossCircle",!0),i||c("InternalLink",!0),n||c("Link",!0),l.createElement(l.Fragment,null,l.createElement(t.h2,{id:"code",style:{position:"relative"}},"Code",l.createElement(t.a,{href:"#code","aria-label":"code permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.h3,{id:"code-examples",style:{position:"relative"}},"Code examples",l.createElement(t.a,{href:"#code-examples","aria-label":"code examples permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.h3,{id:"modal",style:{position:"relative"}},"Modal",l.createElement(t.a,{href:"#modal","aria-label":"modal permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-jsx"},"import { CookieModal } from 'hds-react';\n\nexport const SimpleModalVersion = () => {\n  const [language, setLanguage] = React.useState('en');\n  const onLanguageChange = (newLang) => setLanguage(newLang);\n  const contentSource = {\n    siteName: 'Test site',\n    currentLanguage: language,\n    optionalCookies: {\n      cookies: [\n        {\n          commonGroup: 'statistics',\n          commonCookie: 'matomo',\n        },\n      ],\n    },\n    language: {\n      onLanguageChange,\n    },\n    focusTargetSelector: '#focused-element-after-cookie-consent-closed',\n    onAllConsentsGiven: (consents) => {\n      // called when consents are saved\n      // handle changes like:\n      if (!consents.matomo) {\n        // stop matomo tracking\n      }\n    },\n  };\n\n  const Application = () => {\n    return (\n      <div>\n        <h1 id=\"focused-element-after-cookie-consent-closed\" tabIndex={0}>\n          Simple cookie consent example\n        </h1>\n      </div>\n    );\n  };\n\n  return (\n    <>\n      <CookieModal contentSource={contentSource} />\n      <Application />\n    </>\n  );\n};\n")),"\n",l.createElement(n,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-cookieconsent--english-modal-version"},l.createElement(t.p,null,"View working modal demo in Storybook")),"\n",l.createElement(t.h3,{id:"rendered-on-a-page",style:{position:"relative"}},"Rendered on a page",l.createElement(t.a,{href:"#rendered-on-a-page","aria-label":"rendered on a page permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.pre,null,l.createElement(t.code,{className:"language-jsx"},"import { CookiePage } from 'hds-react';\n\nexport const PageVersion = () => {\n  const contentSource = {\n    siteName: 'Test site',\n    currentLanguage: 'en',\n    optionalCookies: {\n      cookies: [\n        {\n          commonGroup: 'statistics',\n          commonCookie: 'matomo',\n        },\n      ],\n    },\n    onAllConsentsGiven: (consents) => {\n      // called when consents are saved\n      // handle changes like:\n      if (!consents.matomo) {\n        // stop matomo tracking\n      }\n    },\n  };\n\n  return (\n    <main>\n      <CookiePage contentSource={contentSource} />\n    </main>\n  );\n};\n")),"\n",l.createElement(n,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-cookieconsent--page-version"},l.createElement(t.p,null,"View working page example in Storybook")),"\n",l.createElement(t.h3,{id:"packages",style:{position:"relative"}},"Packages",l.createElement(t.a,{href:"#packages","aria-label":"packages permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.table,null,l.createElement(t.thead,null,l.createElement(t.tr,null,l.createElement(t.th,null,"Package"),l.createElement(t.th,null,"Included"),l.createElement(t.th,null,"Storybook link"),l.createElement(t.th,null,"Source link"))),l.createElement(t.tbody,null,l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.strong,null,"HDS React")),l.createElement(t.td,null,l.createElement("div",{style:{display:"flex",gap:"var(--spacing-3-xs)"}},l.createElement(s)," Yes ")),l.createElement(t.td,null,l.createElement(n,{size:"M",openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-cookieconsent--english-modal-version"},"View in Storybook")),l.createElement(t.td,null,l.createElement(o,{size:"M",openInExternalDomainAriaLabel:"Opens in a new domain",openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"https://github.com/City-of-Helsinki/helsinki-design-system/blob/master/packages/react/src/components/cookieConsent"},"View source"))),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.strong,null,"HDS Core")),l.createElement(t.td,null,l.createElement("div",{style:{display:"flex",gap:"var(--spacing-3-xs)"}},l.createElement(r)," No ")),l.createElement(t.td,null,"-"),l.createElement(t.td,null,"-")))),"\n",l.createElement(t.h3,{id:"properties",style:{position:"relative"}},"Properties",l.createElement(t.a,{href:"#properties","aria-label":"properties permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.p,null,"Note! You can find the full list of properties in the ",l.createElement(n,{size:"M",openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-cookieconsent--english-modal-version"},"React Storybook."),"\nAlso, you can find a detailed description of the ",l.createElement(t.code,null,"contentSource")," property in the ",l.createElement(i,{href:"/components/cookie-consent/api"},"API tab"),"."),"\n",l.createElement(t.table,null,l.createElement(t.thead,null,l.createElement(t.tr,null,l.createElement(t.th,null,"Property"),l.createElement(t.th,null,"Description"),l.createElement(t.th,null,"Values"),l.createElement(t.th,null,"Default value"))),l.createElement(t.tbody,null,l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"contentSource")),l.createElement(t.td,null,"Main configurations of the Cookie Consent."),l.createElement(t.td,null,l.createElement(t.code,null,"object")),l.createElement(t.td,null,"-")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"cookieDomain")),l.createElement(t.td,null,"A string representing the domain of the cookie."),l.createElement(t.td,null,l.createElement(t.code,null,"string")),l.createElement(t.td,null,"Default value is the current domain")))))}function c(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){return void 0===e&&(e={}),l.createElement(o,e,l.createElement(r,e))}},43161:function(e,t,n){n.r(t);var a=n(11151),l=n(67294),s=n(71659),o=n(57674),r=n(89482),c=(n(18607),n(26127));function i(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,a.ah)(),e.components);return c.Z||d("PageTabs",!1),c.Z.Tab||d("PageTabs.Tab",!0),c.Z.TabList||d("PageTabs.TabList",!0),c.Z.TabPanel||d("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(t.h1,{id:"cookieconsent",style:{position:"relative"}},"CookieConsent",l.createElement(t.a,{href:"#cookieconsent","aria-label":"cookieconsent permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{className:"status-label-description"},l.createElement(s.S,{variant:"rounded",type:"error"},"Draft"),l.createElement(s.S,{variant:"rounded",type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(o.Z)),"\n",l.createElement(r.Z,null,"The cookie compliance component informs users about cookie usage. This banner is shown when they visit a website or an\napplication for the first time."),"\n",l.createElement(c.Z,{pageContext:e.pageContext},l.createElement(c.Z.TabList,null,l.createElement(c.Z.Tab,{href:"/"},"Usage"),l.createElement(c.Z.Tab,{href:"/code"},"Code"),l.createElement(c.Z.Tab,{href:"/api"},"API"),l.createElement(c.Z.Tab,{href:"/accessibility"},"Accessibility")),l.createElement(c.Z.TabPanel,null,e.children)))}function d(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?l.createElement(t,e,l.createElement(i,e)):i(e)}},89482:function(e,t,n){var a=n(67294);t.Z=e=>{let{color:t="var(--color-black-90)",size:n="var(--fontsize-body-xl)",style:l={},children:s}=e;return a.createElement("p",{style:{fontSize:n,color:t,maxWidth:600,...l}},s)}},26127:function(e,t,n){var a=n(67294),l=n(14160),s=n(29683);const o="PageTabList",r="PageTabPanel",c="PageTab",i=e=>{var t;let{pageContext:n,children:i}=e;const d=n.frontmatter.slug,m=Array.isArray(i)?i:[i],u=m.find((e=>(0,a.isValidElement)(e)&&e.type.componentName===o)),h=m.find((e=>(0,a.isValidElement)(e)&&e.type.componentName===r)),p=null===(t=u.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===c)),b=p.findIndex((e=>d.endsWith(e.props.href))),g=-1===b?0:b,E=0===g?d:(e=>"/"+e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/"))(d);return a.createElement(s.a,{initiallyActiveTab:g},a.createElement(s.a.TabList,{className:"page-tabs-list"},p.map((e=>a.createElement(s.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(""+("/"===e.props.href?E:E+e.props.href))},e.props.children)))),p.map(((e,t)=>a.createElement(s.a.TabPanel,{key:e.props.href},g===t?h.props.children:a.createElement("div",null)))))},d=e=>{let{children:t}=e;return a.createElement(s.a.TabList,null,t)};d.componentName=o;const m=e=>{let{href:t,slug:n,children:l}=e;return a.createElement(s.a.Tab,null,l)};m.componentName=c;const u=e=>{let{children:t}=e;return a.createElement(s.a.TabPanel,null,t)};u.componentName=r,i.TabList=d,i.Tab=m,i.TabPanel=u,t.Z=i},57674:function(e,t,n){var a=n(67294),l=n(32557);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return a.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},a.createElement("ul",{class:"status-label-definitions"},Object.keys(e).map((t=>a.createElement("li",{key:t},a.createElement("span",{class:"status-name"},t),a.createElement("span",null,e[t]))))))}}}]);