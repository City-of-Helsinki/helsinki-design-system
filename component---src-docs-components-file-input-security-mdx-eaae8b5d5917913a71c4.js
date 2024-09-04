"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[6958,2965],{15815:function(e,t,a){a.d(t,{S:function(){return c}});var l=a(80136),n=a(67294),s=(a(7568),a(7444)),r=a(9741),i={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,s.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const o=e=>{let{icon:t}=e;return n.createElement("span",{className:i.statusLabelIcon,"aria-hidden":"true"},t)},c=e=>{var{children:t,className:a,dataTestId:s,type:c="neutral",iconLeft:u}=e,d=(0,l._)(e,["children","className","dataTestId","type","iconLeft"]);return n.createElement("span",Object.assign({className:(0,r.c)(i.statusLabel,i[c],u&&i.statusLabelWithIcon,a),"data-testid":s},d),u&&n.createElement(o,{icon:u}),t)}},90078:function(e,t,a){a.r(t);var l=a(11151),n=a(67294),s=a(91388),r=a(80699);const i=e=>{let{children:t,pageContext:a}=e;return n.createElement(s.default,{pageContext:a},t)};function o(e){const t=Object.assign({h2:"h2",a:"a",span:"span",p:"p",ul:"ul",li:"li"},(0,l.ah)(),e.components);return n.createElement(n.Fragment,null,n.createElement(t.h2,{id:"security",style:{position:"relative"}},"Security",n.createElement(t.a,{href:"#security","aria-label":"security permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement(t.p,null,"As HDS FileInput provides only the front-end solution, remember that you need to take care of the security in your project.\nBelow are some good practices you need to consider. For more detailed checklist, please refer to ",n.createElement(r.Z,{href:"https://github.com/City-of-Helsinki/ASVS/blob/helsinki-4.0.1/4.0/en/0x20-V12-Files-Resources.md"},"Helsinki OWASP Application Security Verification Standard"),"."),"\n",n.createElement(t.ul,null,"\n",n.createElement(t.li,null,"Do not trust the front-end solution to validate the files for you. Validate files on the backend.","\n",n.createElement(t.ul,null,"\n",n.createElement(t.li,null,"Verify file type, file size, and name length."),"\n",n.createElement(t.li,null,"HDS FileInput verifies the file size and the file type based on the DOM File object properties. It does not examine the file contents. This validation is not sufficient in the backend since it can be bypassed for example by renaming the file."),"\n"),"\n"),"\n",n.createElement(t.li,null,"Always restrict and only allow file types related to the use case."),"\n",n.createElement(t.li,null,"Pay attention to error messages returned from the backend. Do not include information the user does not need, e.g. file paths."),"\n",n.createElement(t.li,null,"If files are uploaded from untrusted sources, make sure files are stored outside of the web root, with limited permissions, preferably with strong validation.","\n",n.createElement(t.ul,null,"\n",n.createElement(t.li,null,"Files from untrusted sources should also be scanned by antivirus scanners to prevent the upload of known malicious content."),"\n"),"\n"),"\n"))}t.default=function(e){return void 0===e&&(e={}),n.createElement(i,e,n.createElement(o,e))}},91388:function(e,t,a){a.r(t);var l=a(11151),n=a(67294),s=a(57674),r=a(89482),i=(a(18607),a(26127)),o=a(55725);function c(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,l.ah)(),e.components);return i.Z||u("PageTabs",!1),i.Z.Tab||u("PageTabs.Tab",!0),i.Z.TabList||u("PageTabs.TabList",!0),i.Z.TabPanel||u("PageTabs.TabPanel",!0),n.createElement(n.Fragment,null,n.createElement(t.h1,{id:"fileinput",style:{position:"relative"}},"FileInput",n.createElement(t.a,{href:"#fileinput","aria-label":"fileinput permalink",className:"header-anchor after"},n.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",n.createElement("div",{class:"status-label-description"},n.createElement(o.Z,{type:"info"},"Stable"),n.createElement(o.Z,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),n.createElement(s.Z)),"\n",n.createElement(r.Z,null,"A file input helps the user to browse and select one or multiple files to be uploaded to the service."),"\n",n.createElement(i.Z,{pageContext:e.pageContext},n.createElement(i.Z.TabList,null,n.createElement(i.Z.Tab,{href:"/"},"Usage"),n.createElement(i.Z.Tab,{href:"/code"},"Code"),n.createElement(i.Z.Tab,{href:"/accessibility"},"Accessibility"),n.createElement(i.Z.Tab,{href:"/security"},"Security")),n.createElement(i.Z.TabPanel,null,e.children)))}function u(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?n.createElement(t,e,n.createElement(c,e)):c(e)}},89482:function(e,t,a){var l=a(67294),n=a(42972);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:s={},children:r}=e;return l.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...s}},(0,n.g)(r))}},26127:function(e,t,a){var l=a(67294),n=a(14160),s=a(58405),r=a(42972);const i="PageTabList",o="PageTabPanel",c="PageTab",u=e=>{var t;let{pageContext:a,children:u}=e;const d=a.frontmatter.slug,b=Array.isArray(u)?u:[u],m=b.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===i)),h=b.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===o)),p=null===(t=m.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===c)),f=p.findIndex((e=>d.endsWith(e.props.href))),g=-1===f?0:f,_=0===g?d:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(d);return l.createElement(s.a,{initiallyActiveTab:g},l.createElement(s.a.TabList,{className:"page-tabs-list"},p.map((e=>l.createElement(s.a.Tab,{key:e.props.href,onClick:()=>(0,n.navigate)(`${"/"===e.props.href?_:_+e.props.href}`)},(0,r.g)(e.props.children))))),p.map(((e,t)=>l.createElement(s.a.TabPanel,{key:e.props.href},g===t?h.props.children:l.createElement("div",null)))))},d=e=>{let{children:t}=e;return l.createElement(s.a.TabList,null,t)};d.componentName=i;const b=e=>{let{href:t,slug:a,children:n}=e;return l.createElement(s.a.Tab,null," ",n)};b.componentName=c;const m=e=>{let{children:t}=e;return l.createElement(s.a.TabPanel,null,t)};m.componentName=o,u.TabList=d,u.Tab=b,u.TabPanel=m,t.Z=u},55725:function(e,t,a){var l=a(67294),n=a(15815),s=a(42972);t.Z=e=>{let{children:t,...a}=e;return l.createElement(n.S,a,(0,s.g)(t))}},57674:function(e,t,a){var l=a(67294),n=a(96619);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return l.createElement(n.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},l.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>l.createElement("li",{key:t},l.createElement("span",{className:"status-name"},t),l.createElement("span",null,e[t]))))))}}}]);