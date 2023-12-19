"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[7102],{11083:function(e,l,n){n.r(l);var t=n(11151),a=n(67294),o=n(49349),i=n(72700),r=n(13573);const s=e=>{let{children:l,pageContext:n}=e;return a.createElement(r.default,{pageContext:n},l)};function c(e){const l=Object.assign({h2:"h2",a:"a",span:"span",h3:"h3",ul:"ul",li:"li",strong:"strong",em:"em",h4:"h4",p:"p"},(0,t.ah)(),e.components),{PlaygroundPreview:n,InternalLink:r}=l;return r||m("InternalLink",!0),n||m("PlaygroundPreview",!0),a.createElement(a.Fragment,null,a.createElement(l.h2,{id:"usage",style:{position:"relative"}},"Usage",a.createElement(l.a,{href:"#usage","aria-label":"usage permalink",className:"header-anchor after"},a.createElement(l.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(l.h3,{id:"example",style:{position:"relative"}},"Example",a.createElement(l.a,{href:"#example","aria-label":"example permalink",className:"header-anchor after"},a.createElement(l.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(n,null,a.createElement("div",{style:{maxWidth:"400px"}},a.createElement(o.b,{required:!0,label:"Select",helper:"Assistive text",placeholder:"Placeholder",options:[{label:"Americium"},{label:"Berkelium"},{label:"Californium"},{label:"Copernicium"}]}),a.createElement(i.C,{multiselect:!0,required:!0,label:"Combobox",helper:"Assistive text",placeholder:"Placeholder",options:[{label:"Americium"},{label:"Berkelium"},{label:"Californium"},{label:"Copernicium"},{label:"Einsteinium"},{label:"Fermium"},{label:"Mendelevium"},{label:"Plutonium"}],clearButtonAriaLabel:"Clear all selections",selectedItemRemoveButtonAriaLabel:"Remove ${value}",toggleButtonAriaLabel:"Toggle menu",style:{marginTop:"var(--spacing-s)"}}))),"\n",a.createElement(l.h3,{id:"principles",style:{position:"relative"}},"Principles",a.createElement(l.a,{href:"#principles","aria-label":"principles permalink",className:"header-anchor after"},a.createElement(l.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,a.createElement(l.strong,null,"A label should always be provided with dropdowns.")," Aim for labels that are short, concise and easy to understand."),"\n",a.createElement(l.li,null,"Dropdowns usually have four (4) or more options. When having only 2-3 options, it is usually better to use ",a.createElement(r,{href:"/components/radio-button"},"radio buttons")," or ",a.createElement(r,{href:"/components/checkbox"},"checkboxes"),". Also, if options need to be easily comparable (for example, product pricing), prefer radio buttons over dropdown."),"\n",a.createElement(l.li,null,'It is recommended to set a default option for a single selection dropdown. If the default option is also the recommended option, you can mark the option with a text "',a.createElement(l.em,null,"(recommended)"),'".'),"\n",a.createElement(l.li,null,"If your dropdown has 8 or more options, consider using the ",a.createElement(l.a,{href:"#combobox-single-selection"},"Combobox")," variant which offers filtering options by typing."),"\n",a.createElement(l.li,null,"Try to avoid dropdown options that span over one line. Aim for short texts for all options."),"\n",a.createElement(l.li,null,"If possible, do input validation client-side in real-time and provide the user with immediate feedback after selection."),"\n"),"\n",a.createElement(l.h4,{id:"should-i-use-select-or-combobox",style:{position:"relative"}},"Should I use Select or Combobox?",a.createElement(l.a,{href:"#should-i-use-select-or-combobox","aria-label":"should i use select or combobox permalink",className:"header-anchor after"},a.createElement(l.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,a.createElement(l.strong,null,"Use Select variant when"),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"there are less than 8 options"),"\n",a.createElement(l.li,null,"the user does not need to be able to filter options by typing"),"\n"),"\n"),"\n",a.createElement(l.li,null,a.createElement(l.strong,null,"Use Combobox variant when"),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"there are 8 or more options"),"\n",a.createElement(l.li,null,"the user needs to be able to filter options by typing"),"\n"),"\n"),"\n"),"\n",a.createElement(l.h4,{id:"icon-or-no-icon",style:{position:"relative"}},"Icon or no icon?",a.createElement(l.a,{href:"#icon-or-no-icon","aria-label":"icon or no icon permalink",className:"header-anchor after"},a.createElement(l.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,a.createElement(l.strong,null,"Use an icon when"),"\n",a.createElement(l.ul,null,"\n",a.createElement(l.li,null,"there is a clear added value to using an icon"),"\n",a.createElement(l.li,null,"when the icon is not just for illustrative purposes"),"\n",a.createElement(l.li,null,"when you can add an icon to all select and combobox elements in the formgroup to maintain consistency"),"\n"),"\n"),"\n"),"\n",a.createElement(l.h3,{id:"variations",style:{position:"relative"}},"Variations",a.createElement(l.a,{href:"#variations","aria-label":"variations permalink",className:"header-anchor after"},a.createElement(l.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(l.h4,{id:"select-single-selection",style:{position:"relative"}},"Select (single selection)",a.createElement(l.a,{href:"#select-single-selection","aria-label":"select single selection permalink",className:"header-anchor after"},a.createElement(l.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(l.p,null,"Select dropdown serves in most use cases when the user needs to select one of 4 to 7 options. If there are 8 or more options available, consider using ",a.createElement(l.a,{href:"#combobox-single-selection"},"Combobox")," to allow filtering."),"\n",a.createElement(n,null,a.createElement(o.b,{required:!0,label:"Label",helper:"Assistive text",placeholder:"Placeholder",options:[{label:"Americium"},{label:"Berkelium"},{label:"Californium"},{label:"Copernicium"}],style:{maxWidth:"400px"}})),"\n",a.createElement(l.h4,{id:"select-multi-selection",style:{position:"relative"}},"Select (multi-selection)",a.createElement(l.a,{href:"#select-multi-selection","aria-label":"select multi selection permalink",className:"header-anchor after"},a.createElement(l.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(l.p,null,"Select multi-selection variant allows the user to select one or more options simultaneously. Note! Select dropdown does not feature filtering options by typing. When this feature is needed or there are a large number of options available, consider using consider using ",a.createElement(l.a,{href:"#combobox-multi-selection"},"Combobox"),"."),"\n",a.createElement(l.p,null,"Multi-select also supports icon if needed."),"\n",a.createElement(n,null,a.createElement(o.b,{multiselect:!0,required:!0,label:"Label",placeholder:"Placeholder",helper:"Assistive text",options:[{label:"Plutonium"},{label:"Americium"},{label:"Copernicium"},{label:"Berkelium"}],clearButtonAriaLabel:"Clear all selections",selectedItemRemoveButtonAriaLabel:"Remove ${value}",style:{maxWidth:"400px"}})),"\n",a.createElement(l.h4,{id:"combobox-single-selection",style:{position:"relative"}},"Combobox (single selection)",a.createElement(l.a,{href:"#combobox-single-selection","aria-label":"combobox single selection permalink",className:"header-anchor after"},a.createElement(l.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(l.p,null,"Combobox dropdown serves in most use cases when the user needs to select one from 8 or more options (up to hundreds of options). Combobox variant features filtering options by typing."),"\n",a.createElement(n,null,a.createElement(i.C,{required:!0,label:"Label",helper:"Assistive text",placeholder:"Placeholder",toggleButtonAriaLabel:"Toggle menu",options:[{label:"Americium"},{label:"Berkelium"},{label:"Californium"},{label:"Copernicium"},{label:"Einsteinium"},{label:"Fermium"},{label:"Mendelevium"},{label:"Plutonium"}],style:{maxWidth:"400px"}})),"\n",a.createElement(l.h4,{id:"combobox-multi-selection",style:{position:"relative"}},"Combobox (multi-selection)",a.createElement(l.a,{href:"#combobox-multi-selection","aria-label":"combobox multi selection permalink",className:"header-anchor after"},a.createElement(l.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(l.p,null,"Combobox multi-select variant allows the user to select one or more options simultaneously. Combobox variant features filtering options by typing."),"\n",a.createElement(l.p,null,"Multi-select also supports icon if needed."),"\n",a.createElement(n,null,a.createElement(i.C,{multiselect:!0,required:!0,label:"Label",helper:"Assistive text",placeholder:"Placeholder",options:[{label:"Americium"},{label:"Berkelium"},{label:"Californium"},{label:"Copernicium"},{label:"Einsteinium"},{label:"Fermium"},{label:"Mendelevium"},{label:"Plutonium"}],clearButtonAriaLabel:"Clear all selections",selectedItemRemoveButtonAriaLabel:"Remove ${value}",toggleButtonAriaLabel:"Toggle menu",style:{maxWidth:"400px"}})))}function m(e,l){throw new Error("Expected "+(l?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}l.default=function(e){return void 0===e&&(e={}),a.createElement(s,e,a.createElement(c,e))}},13573:function(e,l,n){n.r(l);var t=n(11151),a=n(67294),o=n(83428),i=n(57674),r=n(89482),s=(n(18607),n(26127));function c(e){const l=Object.assign({h1:"h1",a:"a",span:"span"},(0,t.ah)(),e.components);return s.Z||m("PageTabs",!1),s.Z.Tab||m("PageTabs.Tab",!0),s.Z.TabList||m("PageTabs.TabList",!0),s.Z.TabPanel||m("PageTabs.TabPanel",!0),a.createElement(a.Fragment,null,a.createElement(l.h1,{id:"dropdown",style:{position:"relative"}},"Dropdown",a.createElement(l.a,{href:"#dropdown","aria-label":"dropdown permalink",className:"header-anchor after"},a.createElement(l.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement("div",{class:"status-label-description"},a.createElement(o.S,{type:"info"},"Stable"),a.createElement(o.S,{type:"success",style:{marginLeft:"var(--spacing-xs)"}},"Accessible"),a.createElement(i.Z)),"\n",a.createElement(r.Z,null,"A dropdown offers a user a list of options, of which one or multiple can be selected. Dropdowns are often used as part of forms and filters. HDS offers two types of dropdowns, a Select and a Combobox component."),"\n",a.createElement(s.Z,{pageContext:e.pageContext},a.createElement(s.Z.TabList,null,a.createElement(s.Z.Tab,{href:"/"},"Usage"),a.createElement(s.Z.Tab,{href:"/code"},"Code"),a.createElement(s.Z.Tab,{href:"/accessibility"},"Accessibility"),a.createElement(s.Z.Tab,{href:"/customisation"},"Customisation")),a.createElement(s.Z.TabPanel,null,e.children)))}function m(e,l){throw new Error("Expected "+(l?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}l.default=function(e){void 0===e&&(e={});const{wrapper:l}=Object.assign({},(0,t.ah)(),e.components);return l?a.createElement(l,e,a.createElement(c,e)):c(e)}},57674:function(e,l,n){var t=n(67294),a=n(45422);l.Z=()=>{const e={Draft:"The component is work in progress",Beta:"The component is being tested",Stable:"The component has been tested and defects have been fixed",Accessible:"The component has been reviewed for accessibility",Deprecated:"The component will be removed"};return t.createElement(a.T,{placement:"right-end",className:"status-label-tooltip",boxShadow:!0},t.createElement("ul",{className:"status-label-definitions"},Object.keys(e).map((l=>t.createElement("li",{key:l},t.createElement("span",{className:"status-name"},l),t.createElement("span",null,e[l]))))))}}}]);