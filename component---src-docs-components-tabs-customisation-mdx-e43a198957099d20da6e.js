"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[9358,3872],{99123:function(e,a,t){t.d(a,{S:function(){return c}});var n=t(80136),l=t(67294),s=(t(7568),t(7444)),r=t(34300),o={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,s.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const i=e=>{let{icon:a}=e;return l.createElement("span",{className:o.statusLabelIcon,"aria-hidden":"true"},a)},c=e=>{var{children:a,className:t,dataTestId:s,type:c="neutral",iconLeft:b}=e,u=(0,n._)(e,["children","className","dataTestId","type","iconLeft"]);return l.createElement("span",Object.assign({className:(0,r.c)(o.statusLabel,o[c],b&&o.statusLabelWithIcon,t),"data-testid":s},u),b&&l.createElement(i,{icon:b}),a)}},84067:function(e,a,t){t.r(a);var n=t(11151),l=t(67294),s=t(21335),r=t(64540);const o=e=>{let{children:a,pageContext:t}=e;return l.createElement(r.default,{pageContext:t},a)};function i(e){const a=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",p:"p",code:"code",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",pre:"pre"},(0,n.ah)(),e.components),{Playground:t}=a;return t||function(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Playground",!0),l.createElement(l.Fragment,null,l.createElement(a.h2,{id:"customisation",style:{position:"relative"}},"Customisation",l.createElement(a.a,{href:"#customisation","aria-label":"customisation permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.h3,{id:"customisation-properties",style:{position:"relative"}},"Customisation properties",l.createElement(a.a,{href:"#customisation-properties","aria-label":"customisation properties permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.p,null,"You can use the ",l.createElement(a.code,null,"theme")," property to customise the component. See all available theme variables in the table below."),"\n",l.createElement(a.table,null,l.createElement(a.thead,null,l.createElement(a.tr,null,l.createElement(a.th,null,"Theme variable"),l.createElement(a.th,null,"Description"))),l.createElement(a.tbody,null,l.createElement(a.tr,null,l.createElement(a.td,null,l.createElement(a.code,null,"--tab-color")),l.createElement(a.td,null,"Colour of the tab text label.")),l.createElement(a.tr,null,l.createElement(a.td,null,l.createElement(a.code,null,"--tab-active-border-color")),l.createElement(a.td,null,"Colour of the active tab indicator.")))),"\n",l.createElement(a.h3,{id:"customisation-example",style:{position:"relative"}},"Customisation example",l.createElement(a.a,{href:"#customisation-example","aria-label":"customisation example permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t,{scope:{Tabs:s.a}},l.createElement(a.pre,null,l.createElement(a.code,{className:"language-jsx"},"import { Tabs } from 'hds-react';\n\n() => {\n  const theme = {\n    '--tab-color': 'var(--color-black-90)',\n    '--tab-active-border-color': 'var(--color-metro)',\n  };\n  return (\n    <Tabs theme={theme}>\n      <Tabs.TabList style={{ marginBottom: 'var(--spacing-m)' }}>\n        <Tabs.Tab>Daycare</Tabs.Tab>\n        <Tabs.Tab>Pre-school</Tabs.Tab>\n        <Tabs.Tab>Basic education</Tabs.Tab>\n        <Tabs.Tab>Upper secondary</Tabs.Tab>\n        <Tabs.Tab>University</Tabs.Tab>\n      </Tabs.TabList>\n      <Tabs.TabPanel>\n        Daytime care for people who cannot be fully independent, such as children or elderly people.\n      </Tabs.TabPanel>\n      <Tabs.TabPanel>\n        A pre-school is an educational establishment offering early childhood education to children before they begin\n        compulsory education at primary school.\n      </Tabs.TabPanel>\n      <Tabs.TabPanel>\n        The objective of basic education in Finland is to support pupils&#39; growth towards humanity and ethically\n        responsible membership of society.\n      </Tabs.TabPanel>\n      <Tabs.TabPanel>\n        Upper secondary school studies last three to four years, preparing the students for the matriculation\n        examination.\n      </Tabs.TabPanel>\n      <Tabs.TabPanel>\n        A high-level educational institution in which students study for degrees and academic research is done.\n      </Tabs.TabPanel>\n    </Tabs>\n  );\n}\n"))))}a.default=function(e){return void 0===e&&(e={}),l.createElement(o,e,l.createElement(i,e))}},64540:function(e,a,t){t.r(a);var n=t(11151),l=t(67294),s=t(57674),r=t(89482),o=(t(18607),t(26127)),i=t(55725);function c(e){const a=Object.assign({h1:"h1",a:"a",span:"span"},(0,n.ah)(),e.components);return o.Z||b("PageTabs",!1),o.Z.Tab||b("PageTabs.Tab",!0),o.Z.TabList||b("PageTabs.TabList",!0),o.Z.TabPanel||b("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(a.h1,{id:"tabs",style:{position:"relative"}},"Tabs",l.createElement(a.a,{href:"#tabs","aria-label":"tabs permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{className:"status-label-description"},l.createElement(i.Z,{type:"info"},"Stable"),l.createElement(i.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(s.Z)),"\n",l.createElement(r.Z,null,"Tabs are used to help the user browse and navigate between information contents that have a relation."),"\n",l.createElement(o.Z,{pageContext:e.pageContext},l.createElement(o.Z.TabList,null,l.createElement(o.Z.Tab,{href:"/"},"Usage"),l.createElement(o.Z.Tab,{href:"/code"},"Code"),l.createElement(o.Z.Tab,{href:"/accessibility"},"Accessibility"),l.createElement(o.Z.Tab,{href:"/customisation"},"Customisation")),l.createElement(o.Z.TabPanel,null,e.children)))}function b(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}a.default=function(e){void 0===e&&(e={});const{wrapper:a}=Object.assign({},(0,n.ah)(),e.components);return a?l.createElement(a,e,l.createElement(c,e)):c(e)}},89482:function(e,a,t){var n=t(67294),l=t(42972);a.Z=e=>{let{color:a="var(--color-black-90)",size:t="var(--fontsize-body-xl)",style:s={},children:r}=e;return n.createElement("p",{style:{fontSize:t,color:a,maxWidth:600,...s}},(0,l.g)(r))}},26127:function(e,a,t){var n=t(67294),l=t(14160),s=t(21335),r=t(42972);const o="PageTabList",i="PageTabPanel",c="PageTab",b=e=>{var a;let{pageContext:t,children:b}=e;const u=t.frontmatter.slug,d=Array.isArray(b)?b:[b],m=d.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===o)),h=d.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===i)),p=null===(a=m.props)||void 0===a?void 0:a.children.filter((e=>e.type.componentName===c)),T=p.findIndex((e=>u.endsWith(e.props.href))),f=-1===T?0:T,g=0===f?u:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(u);return n.createElement(s.a,{initiallyActiveTab:f},n.createElement(s.a.TabList,{className:"page-tabs-list"},p.map((e=>n.createElement(s.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(`${"/"===e.props.href?g:g+e.props.href}`)},(0,r.g)(e.props.children))))),p.map(((e,a)=>n.createElement(s.a.TabPanel,{key:e.props.href},f===a?h.props.children:n.createElement("div",null)))))},u=e=>{let{children:a}=e;return n.createElement(s.a.TabList,null,a)};u.componentName=o;const d=e=>{let{href:a,slug:t,children:l}=e;return n.createElement(s.a.Tab,null," ",l)};d.componentName=c;const m=e=>{let{children:a}=e;return n.createElement(s.a.TabPanel,null,a)};m.componentName=i,b.TabList=u,b.Tab=d,b.TabPanel=m,a.Z=b},55725:function(e,a,t){var n=t(67294),l=t(99123),s=t(42972);a.Z=e=>{let{children:a,...t}=e;return n.createElement(l.S,t,(0,s.g)(a))}},57674:function(e,a,t){var n=t(67294),l=t(37106);a.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return n.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},n.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((a=>n.createElement("li",{key:a},n.createElement("span",{className:"status-name"},a),n.createElement("span",null,e[a]))))))}}}]);