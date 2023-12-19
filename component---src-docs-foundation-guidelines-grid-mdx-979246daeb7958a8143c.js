"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[2453],{64273:function(e,n,t){t.r(n);var l=t(11151),a=t(67294),i=t(12818),r=t(89482),s=t(38753),o=t(1076);function c(e){const n=Object.assign({h1:"h1",a:"a",span:"span",p:"p",h2:"h2",ul:"ul",li:"li",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",code:"code",h3:"h3"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.h1,{id:"grid",style:{position:"relative"}},"Grid",a.createElement(n.a,{href:"#grid","aria-label":"grid permalink",className:"header-anchor after"},a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(r.Z,null,"Helsinki Design System follows a 12 column grid system that scales across five defined breakpoints. Using a\npre-defined grid system helps to keep visual consistency and rhythm across your designs and implementations."),"\n",a.createElement(i.N,{label:"Note about HDS Grid values!",className:"siteNotification"},a.createElement(n.p,null,"HDS does not currently include an implementation of the grid. Grid is provided as specified breakpoints and other\nvalues which can be easily applied to most commonly used grid systems.")),"\n",a.createElement(n.h2,{id:"principles",style:{position:"relative"}},"Principles",a.createElement(n.a,{href:"#principles","aria-label":"principles permalink",className:"header-anchor after"},a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"HDS uses a standard 12 column grid whose maximum width is 1200 pixels. Container width and the number of columns change each breakpoint.","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"The ",a.createElement(o.Z,{href:"/components/header"},"Header component")," is an exception with maximum width of 1440 pixels so it should not be placed inside the grid container."),"\n"),"\n"),"\n",a.createElement(n.li,null,"Larger screen sizes use 24-pixel gutters while on mobile screen widths they shrink to 16 pixels and eventually to 12 pixels in the smallest breakpoint."),"\n",a.createElement(n.li,null,"Even though HDS does not include grid implementation, it recommends and suggests methods how to handle changing amount of columns and column stacking. See ",a.createElement(n.a,{href:"#layout-columns"},"Layout columns")," for more information.","\n",a.createElement(n.ul,null,"\n",a.createElement(n.li,null,"HDS also offers a Container component that helps to follow breakpoints and container widths. For more info refer to ",a.createElement(o.Z,{href:"/foundation/design-tokens/breakpoints"},"Breakpoints documentation.")),"\n"),"\n"),"\n"),"\n",a.createElement(n.h2,{id:"grid-behaviour",style:{position:"relative"}},"Grid behaviour",a.createElement(n.a,{href:"#grid-behaviour","aria-label":"grid behaviour permalink",className:"header-anchor after"},a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(n.p,null,"The following table presents how the HDS grid behaves and changes in different breakpoints. Maximum container width, the number of columns, and gutter size alter between breakpoints. Read more about ",a.createElement(o.Z,{href:"/foundation/design-tokens/breakpoints/tokens"},"breakpoint and container width tokens.")),"\n",a.createElement(n.table,null,a.createElement(n.thead,null,a.createElement(n.tr,null,a.createElement(n.th,null,"Breakpoint token"),a.createElement(n.th,null,"Container-width token"),a.createElement(n.th,{align:"right"},"Number of columns"),a.createElement(n.th,{align:"right"},"Margin (gutter) in px"))),a.createElement(n.tbody,null,a.createElement(n.tr,null,a.createElement(n.td,null,a.createElement(n.code,null,"--breakpoint-xs")),a.createElement(n.td,null,a.createElement(n.code,null,"--container-width-xs")),a.createElement(n.td,{align:"right"},"4"),a.createElement(n.td,{align:"right"},"12px")),a.createElement(n.tr,null,a.createElement(n.td,null,a.createElement(n.code,null,"--breakpoint-s")),a.createElement(n.td,null,a.createElement(n.code,null,"--container-width-s")),a.createElement(n.td,{align:"right"},"4"),a.createElement(n.td,{align:"right"},"16px")),a.createElement(n.tr,null,a.createElement(n.td,null,a.createElement(n.code,null,"--breakpoint-m")),a.createElement(n.td,null,a.createElement(n.code,null,"--container-width-m")),a.createElement(n.td,{align:"right"},"8"),a.createElement(n.td,{align:"right"},"24px")),a.createElement(n.tr,null,a.createElement(n.td,null,a.createElement(n.code,null,"--breakpoint-l")),a.createElement(n.td,null,a.createElement(n.code,null,"--container-width-l")),a.createElement(n.td,{align:"right"},"12"),a.createElement(n.td,{align:"right"},"24px")),a.createElement(n.tr,null,a.createElement(n.td,null,a.createElement(n.code,null,"--breakpoint-xl")),a.createElement(n.td,null,a.createElement(n.code,null,"--container-width-xl")),a.createElement(n.td,{align:"right"},"12"),a.createElement(n.td,{align:"right"},"24px")),a.createElement(n.tr,null,a.createElement(n.td,null,"[Table 1:Breakpoint and container-width tokens form a grid]"),a.createElement(n.td),a.createElement(n.td,{align:"right"}),a.createElement(n.td,{align:"right"})))),"\n",a.createElement(s.Z,{src:"/images/foundation/guidelines/grid/breakpoint-demonstration.png",alt:"Breakpoint demonstration",style:{display:"block",width:"100%",minWidth:600,maxWidth:915,margin:"0 auto"},viewable:!0}),"\n",a.createElement(n.h2,{id:"layout-columns",style:{position:"relative"}},"Layout columns",a.createElement(n.a,{href:"#layout-columns","aria-label":"layout columns permalink",className:"header-anchor after"},a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(n.h3,{id:"dividing-columns",style:{position:"relative"}},"Dividing columns",a.createElement(n.a,{href:"#dividing-columns","aria-label":"dividing columns permalink",className:"header-anchor after"},a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(n.p,null,"12 column grid can be divided into multiple smaller columns. Prefer simple and even column combinations to maintain visual consistency across all screen sizes."),"\n",a.createElement(s.Z,{src:"/images/foundation/guidelines/grid/layout-columns.png",alt:"Dividing columns to smaller columns",style:{display:"block",width:"100%",minWidth:600,maxWidth:915,margin:"0 auto"},viewable:!0}),"\n",a.createElement(n.h3,{id:"column-stacking",style:{position:"relative"}},"Column stacking",a.createElement(n.a,{href:"#column-stacking","aria-label":"column stacking permalink",className:"header-anchor after"},a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",a.createElement(n.p,null,"When the breakpoint is reached, columns will stack starting from the left. The developer or designer can also choose to alter column sizes if it helps to maintain a clearer and more consistent view."),"\n",a.createElement(s.Z,{src:"/images/foundation/guidelines/grid/column-stacking.png",alt:"When breakpoint changes, columns will stack to the next row starting from left",style:{display:"block",width:"100%",minWidth:600,maxWidth:915,margin:"0 auto"},viewable:!0}))}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?a.createElement(n,e,a.createElement(c,e)):c(e)}},38753:function(e,n,t){var l=t(67294),a=t(14160);n.Z=e=>{let{src:n,alt:t="Image",style:i={},viewable:r,...s}=e;const o=l.createElement("img",Object.assign({className:"image-container-image",alt:t,src:(0,a.withPrefix)(n),style:i},s));return l.createElement("div",{className:"image-container"},r?l.createElement("a",{className:"image-container-link",href:(0,a.withPrefix)(n),title:t,style:i},o):o)}},89482:function(e,n,t){var l=t(67294);n.Z=e=>{let{color:n="var(--color-black-90)",size:t="var(--fontsize-body-xl)",style:a={},children:i}=e;return l.createElement("p",{style:{fontSize:t,color:n,maxWidth:600,...a}},i)}}}]);