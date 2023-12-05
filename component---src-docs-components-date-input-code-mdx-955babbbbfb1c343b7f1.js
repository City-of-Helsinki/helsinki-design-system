"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[1969,2761],{83428:function(e,t,n){n.d(t,{S:function(){return o}});var l=n(80136),a=n(67294),r=n(7444),c=n(34300),s={statusLabel:"StatusLabel-module_statusLabel__3R2J2 status-label_hds-status-label__1L8YI",statusLabelWithIcon:"StatusLabel-module_statusLabelWithIcon__5lKVk status-label_hds-status-label--with-icon__3bHf6",statusLabelIcon:"StatusLabel-module_statusLabelIcon__2SAou status-label_hds-status-label-icon__3K58a",info:"StatusLabel-module_info__3YrAe status-label_hds-status-label--info__J28-H",success:"StatusLabel-module_success__2BfdX status-label_hds-status-label--success__3jiST",alert:"StatusLabel-module_alert__2VR8r status-label_hds-status-label--alert__1ecsX",error:"StatusLabel-module_error__zNgn8 status-label_hds-status-label--error__2EYi4"};(0,r.s)(".status-label_hds-status-label__1L8YI{--status-label-background:var(--color-black-10);--status-label-color:var(--color-black-90);--status-label-height:32px;background-color:var(--status-label-background);border-radius:20px;color:var(--status-label-color);display:inline-block;font-size:var(--fontsize-body-s);line-height:var(--status-label-height);min-height:var(--status-label-height);padding:0 var(--spacing-2-xs);vertical-align:middle}.status-label_hds-status-label--with-icon__3bHf6{align-items:center;display:inline-flex;padding-left:var(--spacing-3-xs)}.status-label_hds-status-label-icon__3K58a{height:var(--spacing-m);margin-right:var(--spacing-3-xs);width:var(--spacing-m)}.status-label_hds-status-label--info__J28-H{--status-label-background:var(--color-info);--status-label-color:var(--color-white)}.status-label_hds-status-label--success__3jiST{--status-label-background:var(--color-success);--status-label-color:var(--color-white)}.status-label_hds-status-label--alert__1ecsX{--status-label-background:var(--color-alert)}.status-label_hds-status-label--error__2EYi4{--status-label-background:var(--color-error);--status-label-color:var(--color-white)}");const i=e=>{let{icon:t}=e;return a.createElement("span",{className:s.statusLabelIcon,"aria-hidden":"true"},t)},o=e=>{var{children:t,className:n,dataTestId:r,type:o="neutral",iconLeft:d}=e,u=(0,l._)(e,["children","className","dataTestId","type","iconLeft"]);return a.createElement("span",Object.assign({className:(0,c.c)(s.statusLabel,s[o],d&&s.statusLabelWithIcon,n),"data-testid":r},u),d&&a.createElement(i,{icon:d}),t)}},65873:function(e,t,n){n.r(t);var l=n(11151),a=n(67294),r=n(61600),c=n(94474);const s=e=>{let{children:t,pageContext:n}=e;return a.createElement(c.default,{pageContext:n},t)};function i(e){const t=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",h4:"h4",pre:"pre",code:"code",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",strong:"strong",p:"p"},(0,l.ah)(),e.components),{Playground:n,IconCheckCircleFill:c,Link:s,ExternalLink:i,IconCrossCircle:d,InternalLink:u}=t;return i||o("ExternalLink",!0),c||o("IconCheckCircleFill",!0),d||o("IconCrossCircle",!0),u||o("InternalLink",!0),s||o("Link",!0),n||o("Playground",!0),a.createElement(a.Fragment,null,a.createElement(t.h2,{id:"code",style:{position:"relative"}},"Code",a.createElement(t.a,{href:"#code","aria-label":"code permalink",className:"header-anchor after"},a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(t.h3,{id:"code-examples",style:{position:"relative"}},"Code examples",a.createElement(t.a,{href:"#code-examples","aria-label":"code examples permalink",className:"header-anchor after"},a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(t.h4,{id:"date-input-with-a-picker",style:{position:"relative"}},"Date input with a picker",a.createElement(t.a,{href:"#date-input-with-a-picker","aria-label":"date input with a picker permalink",className:"header-anchor after"},a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(n,{scope:{DateInput:r.D}},a.createElement(t.pre,null,a.createElement(t.code,{className:"language-jsx"},'import { DateInput } from \'hds-react\';\n\n() => (\n  <div style={{ maxWidth: \'400px\' }}>\n    <DateInput\n      helperText="Use format D.M.YYYY"\n      id="date-input-example-1"\n      initialMonth={new Date()}\n      label="Choose a date"\n      language="en"\n      onChange={function noRefCheck() {}}\n      required\n    />\n  </div>\n)\n'))),"\n",a.createElement(t.h3,{id:"date-input-without-a-confirmation",style:{position:"relative"}},"Date input without a confirmation",a.createElement(t.a,{href:"#date-input-without-a-confirmation","aria-label":"date input without a confirmation permalink",className:"header-anchor after"},a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(n,{scope:{DateInput:r.D}},a.createElement(t.pre,null,a.createElement(t.code,{className:"language-jsx"},'import { DateInput } from \'hds-react\';\n\n() => (\n  <div style={{ maxWidth: \'400px\' }}>\n    <DateInput\n      disableConfirmation\n      helperText="Use format D.M.YYYY"\n      id="date-input-example-2"\n      initialMonth={new Date()}\n      label="Choose a date"\n      language="en"\n      onChange={function noRefCheck() {}}\n      required\n    />\n  </div>\n)\n'))),"\n",a.createElement(t.h3,{id:"date-input-without-a-picker",style:{position:"relative"}},"Date input without a picker",a.createElement(t.a,{href:"#date-input-without-a-picker","aria-label":"date input without a picker permalink",className:"header-anchor after"},a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(n,{scope:{DateInput:r.D}},a.createElement(t.pre,null,a.createElement(t.code,{className:"language-jsx"},'import { DateInput } from \'hds-react\';\n\n() => (\n  <div style={{ maxWidth: \'400px\' }}>\n    <DateInput\n      disableDatePicker\n      helperText="Use format D.M.YYYY"\n      id="date-input-example-3"\n      initialMonth={new Date()}\n      label="Choose a date"\n      language="en"\n      onChange={function noRefCheck() {}}\n      required\n    />\n  </div>\n)\n'))),"\n",a.createElement(t.h3,{id:"localised-date-inputs",style:{position:"relative"}},"Localised date inputs",a.createElement(t.a,{href:"#localised-date-inputs","aria-label":"localised date inputs permalink",className:"header-anchor after"},a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(n,{scope:{DateInput:r.D}},a.createElement(t.pre,null,a.createElement(t.code,{className:"language-jsx"},'import { DateInput } from \'hds-react\';\n\n() => (\n  <div style={{ maxWidth: \'400px\' }}>\n    <DateInput\n      helperText="Use format D.M.YYYY"\n      id="date-input-example-4"\n      initialMonth={new Date()}\n      label="Choose a date"\n      language="en"\n      onChange={function noRefCheck() {}}\n      required\n      style={{ marginBottom: \'var(--spacing-s)\' }}\n    />\n\n    <DateInput\n      helperText="Käytä muotoa P.K.VVVV"\n      id="date-input-example-5"\n      initialMonth={new Date()}\n      label="Valitse päivämäärä"\n      language="fi"\n      onChange={function noRefCheck() {}}\n      required\n      style={{ marginBottom: \'var(--spacing-s)\' }}\n    />\n\n    <DateInput\n      helperText="Använd ett format D.M.ÅÅÅÅ"\n      id="date-input-example-6"\n      initialMonth={new Date()}\n      label="Välj ett datum"\n      language="sv"\n      onChange={function noRefCheck() {}}\n      required\n    />\n  </div>\n)\n'))),"\n",a.createElement(t.h3,{id:"packages",style:{position:"relative"}},"Packages",a.createElement(t.a,{href:"#packages","aria-label":"packages permalink",className:"header-anchor after"},a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(t.table,null,a.createElement(t.thead,null,a.createElement(t.tr,null,a.createElement(t.th,null,"Package"),a.createElement(t.th,null,"Included"),a.createElement(t.th,null,"Storybook link"),a.createElement(t.th,null,"Source link"))),a.createElement(t.tbody,null,a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.strong,null,"HDS React")),a.createElement(t.td,null,a.createElement("div",{style:{display:"flex",gap:"var(--spacing-3-xs)"}},a.createElement(c)," Yes ")),a.createElement(t.td,null,a.createElement(s,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-dateinput--default"},"View in Storybook")),a.createElement(t.td,null,a.createElement(i,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"https://github.com/City-of-Helsinki/helsinki-design-system/blob/master/packages/react/src/components/dateInput/DateInput.tsx"},"View source"))),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.strong,null,"HDS Core")),a.createElement(t.td,null,a.createElement("div",{style:{display:"flex",gap:"var(--spacing-3-xs)"}},a.createElement(d)," No ")),a.createElement(t.td,null,"-"),a.createElement(t.td,null,"-")))),"\n",a.createElement(t.h3,{id:"properties",style:{position:"relative"}},"Properties",a.createElement(t.a,{href:"#properties","aria-label":"properties permalink",className:"header-anchor after"},a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(t.p,null,"Note! You can find the full list of properties in the ",a.createElement(s,{openInNewTab:!0,openInNewTabAriaLabel:"Opens in a new tab",href:"/storybook/react/?path=/story/components-dateinput--default"},"React Storybook.")),"\n",a.createElement(t.p,null,"Also, note that this component is an input. All features supported by the HDS TextInput are also supported by this component. See ",a.createElement(u,{href:"/components/text-input"},"TextInput documentation page")," for more information."),"\n",a.createElement(t.table,null,a.createElement(t.thead,null,a.createElement(t.tr,null,a.createElement(t.th,null,"Property"),a.createElement(t.th,null,"Description"),a.createElement(t.th,null,"Values"),a.createElement(t.th,null,"Default value"))),a.createElement(t.tbody,null,a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"helperText")),a.createElement(t.td,null,"Helper text to be displayed below the input."),a.createElement(t.td,null,a.createElement(t.code,null,"string")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"errorText")),a.createElement(t.td,null,"Error text to be displayed below the input."),a.createElement(t.td,null,a.createElement(t.code,null,"string")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"successText")),a.createElement(t.td,null,"Success text to be displayed below the input."),a.createElement(t.td,null,a.createElement(t.code,null,"string")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"infoText")),a.createElement(t.td,null,"Info text to be displayed below the input."),a.createElement(t.td,null,a.createElement(t.code,null,"string")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"initialMonth")),a.createElement(t.td,null,"The initial month open in calendar."),a.createElement(t.td,null,a.createElement(t.code,null,"Date")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"label")),a.createElement(t.td,null,"A text label for the input."),a.createElement(t.td,null,a.createElement(t.code,null,"string")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"onChange")),a.createElement(t.td,null,"Callback fired when the state is changed."),a.createElement(t.td,null,a.createElement(t.code,null,"event")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"language")),a.createElement(t.td,null,"Language of the date input."),a.createElement(t.td,null,a.createElement(t.code,null,"string")," (fi, en, sv)"),a.createElement(t.td,null,"en")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"minDate")),a.createElement(t.td,null,"Minimum date to show in the datepicker calendar."),a.createElement(t.td,null,a.createElement(t.code,null,"Date")),a.createElement(t.td,null,"Start of the month ten years before current date")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"maxDate")),a.createElement(t.td,null,"Maximum date to show in the datepicker calendar."),a.createElement(t.td,null,a.createElement(t.code,null,"Date")),a.createElement(t.td,null,"End of the month ten years from current date.")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"isDateDisabledBy")),a.createElement(t.td,null,"Disables date(s) based on conditional function."),a.createElement(t.td,null,a.createElement(t.code,null,"function")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"initialMonth")),a.createElement(t.td,null,"The initial month open in calendar."),a.createElement(t.td,null,a.createElement(t.code,null,"Date")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"disableDatePicker")),a.createElement(t.td,null,"If set to true, the date picker button is hidden."),a.createElement(t.td,null,a.createElement(t.code,null,"boolean")),a.createElement(t.td,null,"false")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"disableConfirmation")),a.createElement(t.td,null,"If set to true, the date picker does not require confirmation."),a.createElement(t.td,null,a.createElement(t.code,null,"boolean")),a.createElement(t.td,null,"false")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"setDateClassName")),a.createElement(t.td,null,"Set className for specific dates to customise styles via CSS variables."),a.createElement(t.td,null,a.createElement(t.code,null,"function")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"legend")),a.createElement(t.td,null,"Legend items."),a.createElement(t.td,null,a.createElement(t.code,null,"LegendItem[]")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"setDateAriaDescribedBy")),a.createElement(t.td,null,"Set aria-describedby for specific dates."),a.createElement(t.td,null,a.createElement(t.code,null,"function")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,"[Table 1:DateInput properties]"),a.createElement(t.td),a.createElement(t.td),a.createElement(t.td)))),"\n",a.createElement(t.table,null,a.createElement(t.thead,null,a.createElement(t.tr,null,a.createElement(t.th,null,"Property"),a.createElement(t.th,null,"Description"),a.createElement(t.th,null,"Values"),a.createElement(t.th,null,"Default value"))),a.createElement(t.tbody,null,a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"elementId")),a.createElement(t.td,null,"Id for the legend item element. Used in ",a.createElement(t.code,null,"aria-describedby")," for the related dates."),a.createElement(t.td,null,a.createElement(t.code,null,"string")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"label")),a.createElement(t.td,null,"Label to describe the legend item."),a.createElement(t.td,null,a.createElement(t.code,null,"string")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"relatedClassName")),a.createElement(t.td,null,"Class name for the legend item element so it has the same styles as the related date."),a.createElement(t.td,null,a.createElement(t.code,null,"string")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,a.createElement(t.code,null,"selected")),a.createElement(t.td,null,"Set to ",a.createElement(t.code,null,"true")," and provide ",a.createElement(t.code,null,"label")," prop to explain selected date's background colour."),a.createElement(t.td,null,a.createElement(t.code,null,"boolean")),a.createElement(t.td,null,"-")),a.createElement(t.tr,null,a.createElement(t.td,null,"[Table 2:LegendItem properties]"),a.createElement(t.td),a.createElement(t.td),a.createElement(t.td)))))}function o(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){return void 0===e&&(e={}),a.createElement(s,e,a.createElement(i,e))}},94474:function(e,t,n){n.r(t);var l=n(11151),a=n(67294),r=n(83428),c=n(57674),s=n(89482),i=(n(18607),n(26127));function o(e){const t=Object.assign({h1:"h1",a:"a",span:"span"},(0,l.ah)(),e.components);return i.Z||d("PageTabs",!1),i.Z.Tab||d("PageTabs.Tab",!0),i.Z.TabList||d("PageTabs.TabList",!0),i.Z.TabPanel||d("PageTabs.TabPanel",!0),a.createElement(a.Fragment,null,a.createElement(t.h1,{id:"dateinput",style:{position:"relative"}},"DateInput",a.createElement(t.a,{href:"#dateinput","aria-label":"dateinput permalink",className:"header-anchor after"},a.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement("div",{class:"status-label-description"},a.createElement(r.S,{type:"info"},"Stable"),a.createElement(r.S,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),a.createElement(c.Z)),"\n",a.createElement(s.Z,null,"Date input allows the user to easily input a specific date or a date range. By default, HDS date input is supplied with a date picker functionality."),"\n",a.createElement(i.Z,{pageContext:e.pageContext},a.createElement(i.Z.TabList,null,a.createElement(i.Z.Tab,{href:"/"},"Usage"),a.createElement(i.Z.Tab,{href:"/code"},"Code"),a.createElement(i.Z.Tab,{href:"/accessibility"},"Accessibility"),a.createElement(i.Z.Tab,{href:"/customisation"},"Customisation")),a.createElement(i.Z.TabPanel,null,e.children)))}function d(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?a.createElement(t,e,a.createElement(o,e)):o(e)}},89482:function(e,t,n){var l=n(67294);t.Z=e=>{let{color:t="var(--color-black-90)",size:n="var(--fontsize-body-xl)",style:a={},children:r}=e;return l.createElement("p",{style:{fontSize:n,color:t,maxWidth:600,...a}},r)}},26127:function(e,t,n){var l=n(67294),a=n(14160),r=n(67461);const c="PageTabList",s="PageTabPanel",i="PageTab",o=e=>{var t;let{pageContext:n,children:o}=e;const d=n.frontmatter.slug,u=Array.isArray(o)?o:[o],m=u.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===c)),p=u.find((e=>(0,l.isValidElement)(e)&&e.type.componentName===s)),h=null===(t=m.props)||void 0===t?void 0:t.children.filter((e=>e.type.componentName===i)),E=h.findIndex((e=>d.endsWith(e.props.href))),b=-1===E?0:E,f=0===b?d:(e=>`/${e.trim().split("/").filter((e=>!!e)).slice(0,-1).join("/")}`)(d);return l.createElement(r.a,{initiallyActiveTab:b},l.createElement(r.a.TabList,{className:"page-tabs-list"},h.map((e=>l.createElement(r.a.Tab,{key:e.props.href,onClick:()=>(0,a.navigate)(`${"/"===e.props.href?f:f+e.props.href}`)},e.props.children)))),h.map(((e,t)=>l.createElement(r.a.TabPanel,{key:e.props.href},b===t?p.props.children:l.createElement("div",null)))))},d=e=>{let{children:t}=e;return l.createElement(r.a.TabList,null,t)};d.componentName=c;const u=e=>{let{href:t,slug:n,children:a}=e;return l.createElement(r.a.Tab,null,a)};u.componentName=i;const m=e=>{let{children:t}=e;return l.createElement(r.a.TabPanel,null,t)};m.componentName=s,o.TabList=d,o.Tab=u,o.TabPanel=m,t.Z=o},57674:function(e,t,n){var l=n(67294),a=n(45422);t.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return l.createElement(a.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},l.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((t=>l.createElement("li",{key:t},l.createElement("span",{className:"status-name"},t),l.createElement("span",null,e[t]))))))}}}]);