"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[30984],{29494:function(e,n,a){var t=a(96540),i=a(64810);n.A=e=>{let{src:n,alt:a="Image",style:s={},viewable:r,...l}=e;const o=t.createElement("img",Object.assign({className:"image-container-image",alt:a,src:(0,i.withPrefix)(n),style:s},l));return t.createElement("div",{className:"image-container"},r?t.createElement("a",{className:"image-container-link",href:(0,i.withPrefix)(n),title:a,style:s},o):o)}},72891:function(e,n,a){var t=a(96540),i=a(94935);n.A=e=>{let{color:n="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:s={},children:r}=e;return t.createElement("p",{style:{fontSize:a,color:n,maxWidth:600,...s}},(0,i.l)(r))}},94935:function(e,n,a){function t(e){return e&&"p"===e.type&&e.props&&e.props.children?e.props.children:e}a.d(n,{l:function(){return t}})},77358:function(e,n,a){a.r(n),a.d(n,{default:function(){return h}});var t=a(28453),i=a(96540),s=a(72891),r=a(29494);function l(e){const n=Object.assign({h1:"h1",a:"a",span:"span",p:"p",h2:"h2",strong:"strong",ul:"ul",li:"li"},(0,t.RP)(),e.components);return i.createElement(i.Fragment,null,i.createElement(n.h1,{id:"contributing-to-the-icon-kit",style:{position:"relative"}},"Contributing to the icon kit",i.createElement(n.a,{href:"#contributing-to-the-icon-kit","aria-label":"contributing to the icon kit permalink",className:"header-anchor after"},i.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(s.A,null,"  HDS iconography uses images and symbols to represent an object visually. Icons communicate a message and should be distinct and informative. Icons should be used sparingly in services to provide clarity and reduce cognitive load on users."),"\n",i.createElement(r.A,{src:"/images/getting-started/contributing-icons/icontypes.jpg",alt:"A selection of icons for different uses in HDS",style:{maxWidth:600},viewable:!0}),"\n",i.createElement(n.p,null,"Icons are an important part of the city of Helsinki's visual aesthetics. Together with the rest of the brand assets, they make up an entity that is part of a functioning city."),"\n",i.createElement(n.h2,{id:"anatomy",style:{position:"relative"}},"Anatomy",i.createElement(n.a,{href:"#anatomy","aria-label":"anatomy permalink",className:"header-anchor after"},i.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(n.p,null,i.createElement(n.strong,null,"Example: The basic building blocks to successful icons.")),"\n",i.createElement(r.A,{src:"/images/getting-started/contributing-icons/basicshapes.jpg",alt:"Basic shapes are the best starting point for icon creation",style:{maxwidth:600},viewable:!0}),"\n",i.createElement(n.p,null,"The basic geometric shapes of the circle, square, and triangle provide a visually strong foundation for icon creation. Icons should always be simple and easy to understand."),"\n",i.createElement(n.p,null,"The necessary parts of an icon grid are determined by context—where the icons will be displayed, how they will be masked, and what shapes will be useful as templates. The ingredients may include a pixel grid, key shapes, orthogonal, mask, and a safe area (and a trim area), each providing reference points to draw against."),"\n",i.createElement(n.p,null,"As with any recipe, you as the HDS creator will choose what to use and what to omit."),"\n",i.createElement(n.h2,{id:"dimensions",style:{position:"relative"}},"Dimensions",i.createElement(n.a,{href:"#dimensions","aria-label":"dimensions permalink",className:"header-anchor after"},i.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(r.A,{src:"/images/getting-started/contributing-icons/dimensions.jpg",alt:"The icon size variants used by HDS",style:{maxwidth:600},viewable:!0}),"\n",i.createElement(n.p,null,"HDS icons are drawn on a pixel grid of 24px × 24px and scaled up or down linearly to different sizes. Use the grid as your basic guideline to snap the vector in place. HDS recommends fine-tuning each size set separately and making size-specific adjustments for each set of dimensions."),"\n",i.createElement(n.h2,{id:"keyshapes-and-orthogonal",style:{position:"relative"}},"Keyshapes and orthogonal",i.createElement(n.a,{href:"#keyshapes-and-orthogonal","aria-label":"keyshapes and orthogonal permalink",className:"header-anchor after"},i.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(n.p,null,i.createElement(n.strong,null,"Example: Keyshapes visualised on the left. Orthogonal on the right.")),"\n",i.createElement(r.A,{src:"/images/getting-started/contributing-icons/keyshapes_orthogonals.jpg",alt:"Left: Keyshapes. Right: Orthogonal. The building blocks of an effective icon grid.",style:{maxwidth:600},viewable:!0}),"\n",i.createElement(n.p,null,"Orthogonal refers to keylines that intersect the center point of the icon and create additional vertices to use. These lines commonly slice the canvas at 90° and 45°. When additional angles are needed, increments of 15° and 5° are the next steps."),"\n",i.createElement(n.h2,{id:"masks",style:{position:"relative"}},"Masks",i.createElement(n.a,{href:"#masks","aria-label":"masks permalink",className:"header-anchor after"},i.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(n.p,null,i.createElement(n.strong,null,"Example: Basic steps to masking in most programs.")),"\n",i.createElement(r.A,{src:"/images/getting-started/contributing-icons/masking.jpg",alt:"Basic steps to masking",style:{maxwidth:600},viewable:!0}),"\n",i.createElement(n.p,null,"A mask customizes the container of an icon from the default square canvas. They also work great for testing different design ideas without having to commit to certain dimensions or layouts. Masks may be embedded in the asset itself or applied afterwards."),"\n",i.createElement(n.p,null,"Note that some programs cut away the masked area, and some leave the masked area in place. Similarly, some programs need the mask layer to be on top and some on the bottom."),"\n",i.createElement(n.p,null,"Masks should always be flattened before exporting the icon asset."),"\n",i.createElement(n.h2,{id:"about-grids",style:{position:"relative"}},"About grids",i.createElement(n.a,{href:"#about-grids","aria-label":"about grids permalink",className:"header-anchor after"},i.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(n.p,null,"Grids are meant to be used as guides, not hard rules. Drop them when they stop working for you. Always check for the optical balance. If something does not feel quite right, trust your eyes more than the grid."),"\n",i.createElement(n.p,null,"E.g. The human eye (or the brain) is more tuned to see the contrast in horizontal lines than vertical, so one should sometimes consider beefing up vertical lines."),"\n",i.createElement(n.h2,{id:"pixel-grid",style:{position:"relative"}},"Pixel grid",i.createElement(n.a,{href:"#pixel-grid","aria-label":"pixel grid permalink",className:"header-anchor after"},i.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(n.p,null,i.createElement(n.strong,null,"Example: Pixel grid used for making HDS icons.")),"\n",i.createElement(r.A,{src:"/images/getting-started/contributing-icons/pixelgrid.jpg",alt:"A simple pixel grid for making icons.",style:{maxwidth:600},viewable:!0}),"\n",i.createElement(n.p,null,"A pixel grid helps you draw in specific increments when snapping to a grid. A 1px increment has long held the standard in digital and an increment of 2px–8px has been adopted more recently. Icons sit snugly on their 24 x 24px system icon grid, using 1px–2px strokes. Pixel-snapping helps you render sharper icons on lower resolution screens but has become much less of a requirement as hardware rendering has improved."),"\n",i.createElement(n.h2,{id:"icon-grid",style:{position:"relative"}},"Icon grid",i.createElement(n.a,{href:"#icon-grid","aria-label":"icon grid permalink",className:"header-anchor after"},i.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(n.p,null,i.createElement(n.strong,null,"Example: Variations of common icon grids.")),"\n",i.createElement(r.A,{src:"/images/getting-started/contributing-icons/icongrid.jpg",alt:"A simple icon grid for making icons.",style:{maxwidth:600},viewable:!0}),"\n",i.createElement(n.p,null,"An icon grid is a tool for speed and consistency. When drawing HDS icons, know the rules intimately and know when and how to bend them. The icon grid provides the same starting point for multiple contributors."),"\n",i.createElement(n.h2,{id:"safe-area--trim-area",style:{position:"relative"}},"Safe area & trim area",i.createElement(n.a,{href:"#safe-area--trim-area","aria-label":"safe area  trim area permalink",className:"header-anchor after"},i.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(n.p,null,i.createElement(n.strong,null,"Example: The difference between safe area and trim area explained.")),"\n",i.createElement(r.A,{src:"/images/getting-started/contributing-icons/safearea_trimarea.jpg",alt:"The difference between safe area and trim area explained.",style:{maxwidth:600},viewable:!0}),"\n",i.createElement(n.p,null,"The safe area (or live area) shows where the important content of the icon should live, while the inverse – the trim area – shows the area to avoid. In some cases, the safe area is soft guidance, but the safe area becomes more crucial when the content is cropped."),"\n",i.createElement(n.h2,{id:"pixel-perfect-design",style:{position:"relative"}},"Pixel-Perfect design",i.createElement(n.a,{href:"#pixel-perfect-design","aria-label":"pixel perfect design permalink",className:"header-anchor after"},i.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(n.p,null,"Pixel-perfect alignment is important when designing for small sizes. Anti-aliasing on the edges of an icon at small sizes can make the icon appear choppy or fuzzy. Space between lines that do not align to the pixel grid will be anti-aliased and appear blurry."),"\n",i.createElement(n.p,null,"Aligning the icon to the pixel grid will make the edges crisp on straight lines and crisper on precise angles and curves.\nAs mentioned, 45-degree angles are best (after straight lines) because the pixels used to define the angle are stacked or stepped diagonally."),"\n",i.createElement(n.p,null,"This is similarly true for corners and curves: The more mathematically precise they are, the crisper the anti-aliasing will be.\nNote that pixel-perfection is less relevant on higher-resolution screens, such as “Retina” displays."),"\n",i.createElement(n.h2,{id:"line-weight",style:{position:"relative"}},"Line Weight",i.createElement(n.a,{href:"#line-weight","aria-label":"line weight permalink",className:"header-anchor after"},i.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(n.p,null,"A line weight of two pixels is ideal, but three is sometimes necessary. The goal is to provide visual hierarchy and optical accuracy, without introducing too much variety and thus destroying consistency. In most cases, avoid very thin lines, especially in glyph icons."),"\n",i.createElement(n.h2,{id:"step-by-step-instructions",style:{position:"relative"}},"Step-by-step instructions",i.createElement(n.a,{href:"#step-by-step-instructions","aria-label":"step by step instructions permalink",className:"header-anchor after"},i.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",i.createElement(n.p,null,i.createElement(n.strong,null,"Animation: How to make the Alert Circle icon using basic shapes.")),"\n",i.createElement(r.A,{src:"/images/getting-started/contributing-icons/AlertCircle_Fill_cropped.gif",alt:"How to make the Alert Circle icon using basic shapes.",style:{maxwidth:600},viewable:!0}),"\n",i.createElement(n.ul,null,"\n",i.createElement(n.li,null,"Turn on snapping to pixel in your preferred graphics program."),"\n",i.createElement(n.li,null,"Establish a 24px × 24px pixel rectangle."),"\n",i.createElement(n.li,null,"Draw each of the horizontal and vertical lines 1 or 2px apart to form a mesh."),"\n",i.createElement(n.li,null,"Carefully draw the 45° orthogonal lines and key shapes so they correspond to the lines in step 3."),"\n",i.createElement(n.li,null,"Plot the basic shape of the desired icon."),"\n",i.createElement(n.li,null,"Thinking in terms of basic shapes, begin to add or eliminate parts of the shape using new shapes and/or masks."),"\n",i.createElement(n.li,null,"When you are satisfied with the result, flatten the icon to a vector shape."),"\n",i.createElement(n.li,null,"Apply a layer that acts as a colour mask (Sketch and Figma)"),"\n"),"\n",i.createElement(n.p,null,"Note that the key canvas size for the HDS icon grid is 24 × 24px, which means that icons are created at this size. Put into use, however, HDS icons may be scaled to a range of sizes: 16 × 16px, 48 × 48px, 64 × 64px etc."))}var o=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.RP)(),e.components);return n?i.createElement(n,e,i.createElement(l,e)):l(e)};function c(e){let{children:n}=e;return i.createElement(i.Fragment,null,n)}function h(e){return i.createElement(c,e,i.createElement(o,e))}}}]);