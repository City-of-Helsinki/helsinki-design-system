"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[3092,3906],{99123:function(e,a,t){t.d(a,{S:function(){return c}});var n=t(80136),l=t(67294),s=(t(7568),t(7444)),i=t(34300),r={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,s.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const o=e=>{let{icon:a}=e;return l.createElement("span",{className:r.statusLabelIcon,"aria-hidden":"true"},a)},c=e=>{var{children:a,className:t,dataTestId:s,type:c="neutral",iconLeft:u}=e,d=(0,n._)(e,["children","className","dataTestId","type","iconLeft"]);return l.createElement("span",Object.assign({className:(0,i.c)(r.statusLabel,r[c],u&&r.statusLabelWithIcon,t),"data-testid":s},d),u&&l.createElement(o,{icon:u}),a)}},11119:function(e,a,t){t.r(a);var n=t(11151),l=t(67294),s=t(76215),i=t(406);const r=e=>{let{children:a,pageContext:t}=e;return l.createElement(i.default,{pageContext:t},a)};function o(e){const a=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",p:"p",code:"code",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",pre:"pre"},(0,n.ah)(),e.components),{Playground:t}=a;return t||function(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Playground",!0),l.createElement(l.Fragment,null,l.createElement(a.h2,{id:"customisation",style:{position:"relative"}},"Customisation",l.createElement(a.a,{href:"#customisation","aria-label":"customisation permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.h3,{id:"customisation-properties",style:{position:"relative"}},"Customisation properties",l.createElement(a.a,{href:"#customisation-properties","aria-label":"customisation properties permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(a.p,null,"In Core version, you can either use the ",l.createElement(a.code,null,"style")," or ",l.createElement(a.code,null,"class")," attributes in the HTML to customise the component."),"\n",l.createElement(a.p,null,"In React version, you can use the ",l.createElement(a.code,null,"theme")," property to customise the component."),"\n",l.createElement(a.p,null,"See all available theme variables in the table below."),"\n",l.createElement(a.table,null,l.createElement(a.thead,null,l.createElement(a.tr,null,l.createElement(a.th,null,"Theme variable"),l.createElement(a.th,null,"Description"))),l.createElement(a.tbody,null,l.createElement(a.tr,null,l.createElement(a.td,null,l.createElement(a.code,null,"--active-page-background-color")),l.createElement(a.td,null,"Colour of the active page background. Use black, white or any of the brand colours.")),l.createElement(a.tr,null,l.createElement(a.td,null,"[Table 1:Pagination theme variables]"),l.createElement(a.td)))),"\n",l.createElement(a.h3,{id:"customisation-example",style:{position:"relative"}},"Customisation example",l.createElement(a.a,{href:"#customisation-example","aria-label":"customisation example permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement(t,{scope:{Pagination:s.P,useState:l.useState}},l.createElement(a.pre,null,l.createElement(a.code,{className:"language-jsx"},"import { Pagination } from 'hds-react';\n\n() => {\n  const [pageIndex, setPageIndex] = useState(0);\n  const theme = {\n    '--active-page-background-color': 'var(--color-bus)',\n  };\n  return (\n    <Pagination\n      language=\"en\"\n      onChange={(event, index) => {\n        event.preventDefault();\n        setPageIndex(index);\n      }}\n      pageCount={9}\n      pageHref={() => '#'}\n      pageIndex={pageIndex}\n      paginationAriaLabel=\"Pagination 1\"\n      siblingCount={9}\n      theme={theme}\n    />\n  )\n}\n")),l.createElement(a.pre,null,l.createElement(a.code,{className:"language-html"},'<style scoped>\n  .custom-active-page-background-color {\n    --active-page-background-color: var(--color-bus);\n  }\n</style>\n\n<div class="hds-pagination-container">\n  <nav\n    class="hds-pagination custom-active-page-background-color"\n    role="navigation"\n    aria-label="Pagination"\n    data-next="Next"\n    style="--active-page-background-color: var(--color-bus);"\n  >\n    <button\n      type="button"\n      disabled\n      class="hds-button hds-button--supplementary hds-button--theme-black hds-pagination__button-prev"\n    >\n      <span aria-hidden="true" class="hds-icon hds-icon--angle-left"></span>\n      <span class="hds-button__label">Previous</span>\n    </button>\n    <ul class="hds-pagination__pages">\n      <li>\n        <a\n          class="hds-pagination__item-link hds-pagination__item-link--active"\n          href="#"\n          title="Current page"\n          aria-label="Page 1"\n          aria-current="page"\n        >\n          1\n        </a>\n      </li>\n      <li>\n        <a class="hds-pagination__item-link" href="#" aria-label="Page 2" title="Go to page 2"> 2 </a>\n      </li>\n      <li>\n        <a class="hds-pagination__item-link" href="#" aria-label="Page 3" title="Go to page 3"> 3 </a>\n      </li>\n      <li>\n        <a class="hds-pagination__item-link" href="#" aria-label="Page 4" title="Go to page 4"> 4 </a>\n      </li>\n      <li>\n        <a class="hds-pagination__item-link" href="#" aria-label="Page 5" title="Go to page 5"> 5 </a>\n      </li>\n      <li>\n        <a class="hds-pagination__item-link" href="#" aria-label="Page 6" title="Go to page 6"> 6 </a>\n      </li>\n      <li>\n        <a class="hds-pagination__item-link" href="#" aria-label="Page 7" title="Go to page 7"> 7 </a>\n      </li>\n      <li>\n        <a class="hds-pagination__item-link" href="#" aria-label="Page 8" title="Go to page 8"> 8 </a>\n      </li>\n      <li>\n        <a class="hds-pagination__item-link" href="#" aria-label="Page 9" title="Go to page 9"> 9 </a>\n      </li>\n    </ul>\n    <div class="hds-pagination__item hds-pagination__next-button">\n      <button\n        type="button"\n        class="hds-button hds-button--supplementary hds-button--theme-black hds-pagination__button-next"\n      >\n        <span class="hds-button__label">Next</span>\n        <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>\n      </button>\n    </div>\n  </nav>\n</div>\n'))))}a.default=function(e){return void 0===e&&(e={}),l.createElement(r,e,l.createElement(o,e))}},406:function(e,a,t){t.r(a);var n=t(11151),l=t(67294),s=t(57674),i=t(89482),r=(t(18607),t(26127)),o=t(55725);function c(e){const a=Object.assign({h1:"h1",a:"a",span:"span"},(0,n.ah)(),e.components);return r.Z||u("PageTabs",!1),r.Z.Tab||u("PageTabs.Tab",!0),r.Z.TabList||u("PageTabs.TabList",!0),r.Z.TabPanel||u("PageTabs.TabPanel",!0),l.createElement(l.Fragment,null,l.createElement(a.h1,{id:"pagination",style:{position:"relative"}},"Pagination",l.createElement(a.a,{href:"#pagination","aria-label":"pagination permalink",className:"header-anchor after"},l.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",l.createElement("div",{class:"status-label-description"},l.createElement(o.Z,{type:"info"},"Stable"),l.createElement(o.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),l.createElement(s.Z)),"\n",l.createElement(i.Z,null,"The pagination component allows the user to navigate between pages when content is split into several pages."),"\n",l.createElement(r.Z,{pageContext:e.pageContext},l.createElement(r.Z.TabList,null,l.createElement(r.Z.Tab,{href:"/"},"Usage"),l.createElement(r.Z.Tab,{href:"/code"},"Code"),l.createElement(r.Z.Tab,{href:"/accessibility"},"Accessibility"),l.createElement(r.Z.Tab,{href:"/customisation"},"Customisation")),l.createElement(r.Z.TabPanel,null,e.children)))}function u(e,a){throw new Error("Expected "+(a?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}a.default=function(e){void 0===e&&(e={});const{wrapper:a}=Object.assign({},(0,n.ah)(),e.components);return a?l.createElement(a,e,l.createElement(c,e)):c(e)}},89482:function(e,a,t){var n=t(67294),l=t(42972);a.Z=e=>{let{color:a="var(--color-black-90)",size:t="var(--fontsize-body-xl)",style:s={},children:i}=e;return n.createElement("p",{style:{fontSize:t,color:a,maxWidth:600,...s}},(0,l.g)(i))}},26127:function(e,a,t){var n=t(67294),l=t(14160),s=t(21335),i=t(42972);const r="PageTabList",o="PageTabPanel",c="PageTab",u=e=>{var a;let{pageContext:t,children:u}=e;const d=t.frontmatter.slug,h=Array.isArray(u)?u:[u],p=h.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===r)),m=h.find((e=>(0,n.isValidElement)(e)&&e.type.componentName===o)),b=null===(a=p.props)||void 0===a?void 0:a.children.filter((e=>e.type.componentName===c)),g=b.findIndex((e=>d.endsWith(e.props.href))),_=-1===g?0:g,f=0===_?d:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(d);return n.createElement(s.a,{initiallyActiveTab:_},n.createElement(s.a.TabList,{className:"page-tabs-list"},b.map((e=>n.createElement(s.a.Tab,{key:e.props.href,onClick:()=>(0,l.navigate)(`${"/"===e.props.href?f:f+e.props.href}`)},(0,i.g)(e.props.children))))),b.map(((e,a)=>n.createElement(s.a.TabPanel,{key:e.props.href},_===a?m.props.children:n.createElement("div",null)))))},d=e=>{let{children:a}=e;return n.createElement(s.a.TabList,null,a)};d.componentName=r;const h=e=>{let{href:a,slug:t,children:l}=e;return n.createElement(s.a.Tab,null," ",l)};h.componentName=c;const p=e=>{let{children:a}=e;return n.createElement(s.a.TabPanel,null,a)};p.componentName=o,u.TabList=d,u.Tab=h,u.TabPanel=p,a.Z=u},55725:function(e,a,t){var n=t(67294),l=t(99123),s=t(42972);a.Z=e=>{let{children:a,...t}=e;return n.createElement(l.S,t,(0,s.g)(a))}},57674:function(e,a,t){var n=t(67294),l=t(37106);a.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return n.createElement(l.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},n.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((a=>n.createElement("li",{key:a},n.createElement("span",{className:"status-name"},a),n.createElement("span",null,e[a]))))))}}}]);