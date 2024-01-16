"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[5757,5506],{83428:function(e,t,n){n.d(t,{S:function(){return o}});var a=n(80136),l=n(67294),i=n(7444),s=n(34300),r={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,i.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const c=e=>{let{icon:t}=e;return l.createElement("span",{className:r.statusLabelIcon,"aria-hidden":"true"},t)},o=e=>{var{children:t,className:n,dataTestId:i,type:o="neutral",iconLeft:d}=e,u=(0,a._)(e,["children","className","dataTestId","type","iconLeft"]);return l.createElement("span",Object.assign({className:(0,s.c)(r.statusLabel,r[o],d&&r.statusLabelWithIcon,n),"data-testid":i},u),d&&l.createElement(c,{icon:d}),t)}},82731:function(e,t,n){n.r(t);var a=n(11151),l=n(67294),i=n(76362),s=n(25514),r=n(15595);const c=e=>{let{children:t,pageContext:n}=e;return l.createElement(r.default,{pageContext:n},t)};function o(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",h4:"h4",pre:"pre",code:"code",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",strong:"strong",p:"p"},(0,a.ah)(),e.components),{Playground:n,IconCheckCircleFill:r,Link:c,ExternalLink:o,IconCrossCircle:u}=t;return o||d("ExternalLink",!0),r||d("IconCheckCircleFill",!0),u||d("IconCrossCircle",!0),c||d("Link",!0),n||d("Playground",!0),l.createElement(l.Fragment,null,l.createElement(t.h2,{id:"code",style:{position:"relative"}},"Code",l.createElement(t.a,{href:"#code","aria-label":"code permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.h3,{id:"code-examples",style:{position:"relative"}},"Code examples",l.createElement(t.a,{href:"#code-examples","aria-label":"code examples permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.h4,{id:"default",style:{position:"relative"}},"Default",l.createElement(t.a,{href:"#default","aria-label":"default permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(n,{scope:{SideNavigation:i.S,useState:l.useState}},l.createElement(t.pre,null,l.createElement(t.code,{className:"language-jsx"},'import { SideNavigation } from \'hds-react\';\n\n() => {\n  const [active, setActive] = useState(\'/archive\');\n  const setActivePage = (e) => {\n    e.preventDefault();\n    setActive(e.target.getAttribute(\'href\'));\n  }\n  return (<div\n    style={{\n      backgroundColor: \'#f5f5f5\',\n      display: \'grid\',\n    }}\n  >\n    <div\n      style={{\n        height: \'100%\',\n        maxWidth: \'400px\'\n      }}\n    >\n      <SideNavigation\n        defaultOpenMainLevels={[]}\n        id="side-navigation"\n        toggleButtonLabel="Navigate to page"\n      >\n        <SideNavigation.MainLevel\n          id="#main-level-1"\n          label="Events"\n        >\n          <SideNavigation.SubLevel\n            href="/events"\n            active={active === \'/events\'}\n            id="sub-level-1"\n            label="All events"\n            onClick={setActivePage}\n          />\n          <SideNavigation.SubLevel\n            href="/archive"\n            active={active === \'/archive\'}\n            id="sub-level-2"\n            label="Archive"\n            onClick={setActivePage}\n          />\n          <SideNavigation.SubLevel\n            href="/new-event"\n            active={active === \'/new-event\'}\n            id="sub-level-3"\n            label="Create a new event"\n            onClick={setActivePage}\n          />\n        </SideNavigation.MainLevel>\n        <SideNavigation.MainLevel\n          id="main-level-2"\n          label="Events on map"\n        >\n          <SideNavigation.SubLevel\n            href="/map"\n            active={active === \'/map\'}\n            id="sub-level-4"\n            label="Map"\n            onClick={setActivePage}\n          />\n          <SideNavigation.SubLevel\n            href="/edit-event-locations"\n            active={active === \'/edit-event-locations\'}\n            id="sub-level-5"\n            label="Edit event locations"\n            onClick={setActivePage}\n          />\n          <SideNavigation.SubLevel\n            href="/new-location"\n            active={active === \'/new-location\'}\n            id="sub-level-6"\n            label="Create a new location"\n            onClick={setActivePage}\n          />\n        </SideNavigation.MainLevel>\n        <SideNavigation.MainLevel\n          href="/settings"\n          active={active === \'/settings\'}\n          id="main-level-3"\n          label="Settings"\n          onClick={setActivePage}\n        />\n        <SideNavigation.MainLevel\n          external\n          href="https://tapahtumat.hel.fi/"\n          openInNewTab\n          openInNewTabAriaLabel="Opens in a new tab."\n          openInExternalDomainAriaLabel="Opens a different website."\n          id="main-level-4"\n          label="Tapahtumat.hel.fi"\n          openInExternalDomainAriaLabel="Opens a different website"\n          withDivider\n        />\n      </SideNavigation>\n    </div>\n  </div>)\n}\n'))),"\n",l.createElement(t.h4,{id:"with-icons",style:{position:"relative"}},"With icons",l.createElement(t.a,{href:"#with-icons","aria-label":"with icons permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(n,{scope:{SideNavigation:i.S,useState:l.useState,IconHome:s.a3,IconMap:s.ag,IconCogwheel:s.B}},l.createElement(t.pre,null,l.createElement(t.code,{className:"language-jsx"},'import { SideNavigation } from \'hds-react\';\n\n() => {\n  const [active, setActive] = useState(\'/archive\');\n  const setActivePage = (e) => {\n    e.preventDefault();\n    setActive(e.target.getAttribute(\'href\'));\n  }\n  return (<div\n    style={{\n      backgroundColor: \'#f5f5f5\',\n      display: \'grid\',\n    }}\n  >\n    <div\n      style={{\n        height: \'100%\',\n        maxWidth: \'400px\'\n      }}\n    >\n      <SideNavigation\n        defaultOpenMainLevels={[]}\n        id="side-navigation-icons"\n        toggleButtonLabel="Navigate to page"\n      >\n        <SideNavigation.MainLevel\n          icon={<IconHome aria-hidden />}\n          id="main-level-icons-1"\n          label="Events"\n        >\n          <SideNavigation.SubLevel\n            href="/events"\n            id="sub-level-icons-1"\n            active={active === \'/all-events\'}\n            label="All events"\n            onClick={setActivePage}\n          />\n          <SideNavigation.SubLevel\n            href="/archive"\n            id="sub-level-icons-2"\n            active={active === \'/archive\'}\n            label="Archive"\n            onClick={setActivePage}\n          />\n          <SideNavigation.SubLevel\n            href="/new-event"\n            id="sub-level-icons-3"\n            active={active === \'/new-event\'}\n            label="Create a new event"\n            onClick={setActivePage}\n          />\n        </SideNavigation.MainLevel>\n        <SideNavigation.MainLevel\n          icon={<IconMap aria-hidden />}\n          id="main-level-icons-2"\n          label="Events on map"\n        >\n          <SideNavigation.SubLevel\n            href="/map"\n            id="sub-level-icons-4"\n            active={active === \'/map\'}\n            label="Map"\n            onClick={setActivePage}\n          />\n          <SideNavigation.SubLevel\n            href="/edit-event-locations"\n            id="sub-level-icons-5"\n            active={active === \'/edit-event-locations\'}\n            label="Edit event locations"\n            onClick={setActivePage}\n          />\n          <SideNavigation.SubLevel\n            href="/new-location"\n            id="sub-level-6"\n            active={active === \'/new-location\'}\n            label="Create a new location"\n            onClick={setActivePage}\n          />\n        </SideNavigation.MainLevel>\n        <SideNavigation.MainLevel\n          href="/settings"\n          icon={<IconCogwheel aria-hidden />}\n          id="main-level-icons-3"\n          active={active === \'/settings\'}\n          label="Settings"\n          onClick={setActivePage}\n        />\n        <SideNavigation.MainLevel\n          external\n          href="https://tapahtumat.hel.fi/"\n          openInNewTab\n          openInNewTabAriaLabel="Opens in a new tab."\n          openInExternalDomainAriaLabel="Opens a different website."\n          id="main-level-icons-4"\n          label="Tapahtumat.hel.fi"\n          openInExternalDomainAriaLabel="Opens a different website"\n          withDivider\n        />\n      </SideNavigation>\n    </div>\n  </div>)\n}\n'))),"\n",l.createElement(t.h3,{id:"packages",style:{position:"relative"}},"Packages",l.createElement(t.a,{href:"#packages","aria-label":"packages permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.table,null,l.createElement(t.thead,null,l.createElement(t.tr,null,l.createElement(t.th,null,"Package"),l.createElement(t.th,null,"Included"),l.createElement(t.th,null,"Storybook link"),l.createElement(t.th,null,"Source link"))),l.createElement(t.tbody,null,l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.strong,null,"HDS React")),l.createElement(t.td,null,l.createElement("div",{style:{display:"flex",gap:"var(--spacing-3-xs)"}},l.createElement(r)," Yes ")),l.createElement(t.td,null,l.createElement(c,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-sidenavigation--default"},"View in Storybook")),l.createElement(t.td,null,l.createElement(o,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"https://github.com/City-of-Helsinki/helsinki-design-system/tree/master/packages/react/src/components/sideNavigation"},"View source"))),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.strong,null,"HDS Core")),l.createElement(t.td,null,l.createElement("div",{style:{display:"flex",gap:"var(--spacing-3-xs)"}},l.createElement(u)," No ")),l.createElement(t.td,null,"-"),l.createElement(t.td,null,"-")))),"\n",l.createElement(t.h3,{id:"properties",style:{position:"relative"}},"Properties",l.createElement(t.a,{href:"#properties","aria-label":"properties permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t.p,null,"Note! You can find the full list of properties in the ",l.createElement(c,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/docs/components-sidenavigation--default"},"React Storybook.")),"\n",l.createElement(t.table,null,l.createElement(t.thead,null,l.createElement(t.tr,null,l.createElement(t.th,null,"Property"),l.createElement(t.th,null,"Description"),l.createElement(t.th,null,"Values"),l.createElement(t.th,null,"Default value"))),l.createElement(t.tbody,null,l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"defaultOpenMainLevels")),l.createElement(t.td,null,"Default value for open main levels."),l.createElement(t.td,null,l.createElement(t.code,null,"number[]")),l.createElement(t.td,null,"[]")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"toggleButtonLabel")),l.createElement(t.td,null,"The label for the mobile menu toggle button"),l.createElement(t.td,null,l.createElement(t.code,null,"string")),l.createElement(t.td,null,"-")),l.createElement(t.tr,null,l.createElement(t.td,null,l.createElement(t.code,null,"ariaLabel")),l.createElement(t.td,null,"The aria-label for helping screen reader users to distinguish navigation row from other navigational components"),l.createElement(t.td,null,l.createElement(t.code,null,"string")),l.createElement(t.td,null,"-")),l.createElement(t.tr,null,l.createElement(t.td,null,"[Table 1:SideNavigation properties]"),l.createElement(t.td),l.createElement(t.td),l.createElement(t.td)))))}function d(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){return void 0===e&&(e={}),l.createElement(c,e,l.createElement(o,e))}},15595:function(e,t,n){n.r(t);var a=n(11151),l=n(67294),i=n(57674),s=n(89482),r=(n(18607),n(26127)),c=n(55725),o=n(77884);function d(e){const t=Object.assign({h1:"h1",a:"a",span:"span",p:"p"},(0,a.ah)(),e.components);return r.Z||u("PageTabs",!1),r.Z.Tab||u("PageTabs.Tab",!0),r.Z.TabList||u("PageTabs.TabList",!0),r.Z.TabPanel||u("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(t.h1,{id:"sidenavigation",style:{position:"relative"}},"SideNavigation",l.createElement(t.a,{href:"#sidenavigation","aria-label":"sidenavigation permalink",className:"header-anchor after"},l.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{class:"status-label-description"},l.createElement(c.Z,{type:"alert"},"Beta"),l.createElement(c.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(i.Z)),"\n",l.createElement(s.Z,null,"A side navigation is an additional navigation element that is located at the left-hand side of the viewport. It provides an extra level of navigation and also can be helpful in situations where the traditional top navigation feels too clumsy. "),"\n",l.createElement(o.Z,{label:"A visual rework is coming soon!",className:"siteNotification"},l.createElement(t.p,null,"The HDS team will be unifying the SideNavigation component with the Hel.fi project side navigation in the near future.")),"\n",l.createElement(r.Z,{pageContext:e.pageContext},l.createElement(r.Z.TabList,null,l.createElement(r.Z.Tab,{href:"/"},"Usage"),l.createElement(r.Z.Tab,{href:"/code"},"Code"),l.createElement(r.Z.Tab,{href:"/accessibility"},"Accessibility"),l.createElement(r.Z.Tab,{href:"/customisation"},"Customisation")),l.createElement(r.Z.TabPanel,null,e.children)))}function u(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,a.ah)(),e.components);return t?l.createElement(t,e,l.createElement(d,e)):d(e)}},89482:function(e,t,n){var a=n(67294),l=n(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:n="var(--fontsize-body-xl)",style:i={},children:s}=e;return a.createElement("p",{style:{fontSize:n,color:t,maxWidth:600,...i}},(0,l.g)(s))}},77884:function(e,t,n){var a=n(67294),l=n(12818),i=n(42972);t.Z=e=>{let{children:t,...n}=e;return a.createElement(l.N,n,(0,i.g)(t))}},26127:function(e,t,n){var a=n(67294),l=n(14160),i=n(18261),s=n(42972);const r="PageTabList",c="PageTabPanel",o="PageTab",d=e=>{var t;let{pageContext:n,children:d}=e;const u=n.frontmatter.slug,m=Array.isArray(d)?d:[d],h=m.find((e=>(0,a.isValidElement)(e)&&e.type.componentName===r)),v=m.find((e=>(0,a.isValidElement)(e)&&e.type.componentName===c)),b=null===(t=h.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===o)),p=b.findIndex((e=>u.endsWith(e.props.href))),g=-1===p?0:p,f=0===g?u:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(u);return a.createElement(i.a,{initiallyActiveTab:g},a.createElement(i.a.TabList,{className:"page-tabs-list"},b.map((e=>a.createElement(i.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(`${"/"===e.props.href?f:f+e.props.href}`)},(0,s.g)(e.props.children))))),b.map(((e,t)=>a.createElement(i.a.TabPanel,{key:e.props.href},g===t?v.props.children:a.createElement("div",null)))))},u=e=>{let{children:t}=e;return a.createElement(i.a.TabList,null,t)};u.componentName=r;const m=e=>{let{href:t,slug:n,children:l}=e;return a.createElement(i.a.Tab,null," ",l)};m.componentName=o;const h=e=>{let{children:t}=e;return a.createElement(i.a.TabPanel,null,t)};h.componentName=c,d.TabList=u,d.Tab=m,d.TabPanel=h,t.Z=d},55725:function(e,t,n){var a=n(67294),l=n(83428),i=n(42972);t.Z=e=>{let{children:t,...n}=e;return a.createElement(l.S,n,(0,i.g)(t))}},57674:function(e,t,n){var a=n(67294),l=n(45422);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return a.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},a.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>a.createElement("li",{key:t},a.createElement("span",{className:"status-name"},t),a.createElement("span",null,e[t]))))))}}}]);