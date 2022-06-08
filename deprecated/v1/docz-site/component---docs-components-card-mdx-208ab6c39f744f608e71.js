(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{j146:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return p})),a.d(t,"default",(function(){return y}));var n=a("cxan"),o=a("+wNj"),r=(a("ERkP"),a("ZVZ0")),d=a("9Rvw"),i=a("qbsg"),s=a("7UOt"),c=a("+/3S"),l=a("si08"),b=a("vD+s"),u=a("fSvc"),m=(a("l1C2"),["components"]),p={};void 0!==p&&p&&p===Object(p)&&Object.isExtensible(p)&&!Object.prototype.hasOwnProperty.call(p,"__filemeta")&&Object.defineProperty(p,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"docs/components/card.mdx"}});var h={_frontmatter:p},g=d.a;function y(e){var t,a,y,j=e.components,O=Object(o.a)(e,m);return Object(r.b)(g,Object(n.a)({},h,O,{components:j,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"card"},"Card"),Object(r.b)(s.a,{type:"info",mdxType:"StatusLabel"},"Stable"),Object(r.b)(s.a,{type:"success",style:{marginLeft:"var(--spacing-xs)"},mdxType:"StatusLabel"},"Accessible"),Object(r.b)(b.a,{mdxType:"LargeParagraph"},"Cards can be used to divide and organise interface content for better understandability and readability. When used correctly, Cards can help your users to scan through vast amounts of information quicker."),Object(r.b)("h2",{id:"principles"},"Principles"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Use Cards sparingly.")," While they can drastically improve service's understandability and readability, overusing them may result in confusing and complex user interfaces."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Cards work very well for listing heterogenous content")," such as news items, blog posts, or upcoming events."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Cards can also be used to emphasize important content")," such as site CTA (Call To Action)."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Cards must not be used as interactive elements themselves.")," This means that the whole Card should not be clickable. Elements inside the Card can still be interactable.",Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"If you need the whole element to be interactable, use ",Object(r.b)("a",{parentName:"li",href:"/v1/components/linkbox"},"HDS Linkbox")," instead."))),Object(r.b)("li",{parentName:"ul"},"Currently, HDS offers base Cards that you can use to build custom Cards for your project's needs. For inspiration and guidelines, you can find custom card examples in ",Object(r.b)(u.a,{href:"https://share.goabstract.com/e6aa2ebd-1a49-4cb1-90ef-a44a6486c28b",external:!0,mdxType:"Link"},"HDS Example Custom Components - Abstract collection"),".")),Object(r.b)("h3",{id:"should-i-use-a-card-or-a-linkbox"},"Should I use a Card or a Linkbox?"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Use the ",Object(r.b)("a",{parentName:"strong",href:"/v1/components/card"},"Card component")," when"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"the whole Card does not need to be interactable"),Object(r.b)("li",{parentName:"ul"},"the Card contains multiple interactable elements (e.g. buttons or links)"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"Use the Linkbox component when"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"the whole element needs to be interactable"),Object(r.b)("li",{parentName:"ul"},"the element does not include multiple interactable elements")))),Object(r.b)("h2",{id:"accessibility"},"Accessibility"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Card must have either a visual heading or ",Object(r.b)("inlineCode",{parentName:"li"},"aria-label")," as a title. This describes the Card's content for assistive technologies."),Object(r.b)("li",{parentName:"ul"},"If you use buttons in your cards, pay attention to the button role. If you use the button as a link instead of an action (i.e. the button press causes a page load), you must specify a ",Object(r.b)("inlineCode",{parentName:"li"},'role="link"')," attribute to the button."),Object(r.b)("li",{parentName:"ul"},"The colour contrast between the Card and its background must comply with ",Object(r.b)(u.a,{href:"https://www.w3.org/TR/WCAG21/#contrast-minimum",external:!0,mdxType:"Link"},"WCAG AA Level contrast ratios"),". If needed, you may use a Card border to increase the contrast to its background.")),Object(r.b)("h2",{id:"usage--variations"},"Usage & variations"),Object(r.b)("h3",{id:"empty"},"Empty"),Object(r.b)("p",null,"Currently, HDS offers empty base Cards. These and other HDS components can be used to create custom Cards for your project. By default, HDS recommends Cards without border style."),Object(r.b)(i.c,{__position:2,__code:"<Card />\n<Card border />",__scope:(t={props:O,DefaultLayout:d.a,Playground:i.c,StatusLabel:s.a,Card:c.a,Button:l.a,LargeParagraph:b.a,Link:u.a},t.DefaultLayout=d.a,t._frontmatter=p,t),mdxType:"Playground"},Object(r.b)(c.a,{mdxType:"Card"}),Object(r.b)(c.a,{border:!0,mdxType:"Card"})),Object(r.b)("h4",{id:"core-code-example"},"Core code example:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-html"},'<div class="hds-card"></div>\n\n<div class="hds-card hds-card--border"></div>\n')),Object(r.b)("h4",{id:"react-code-example"},"React code example:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-tsx"},"<Card />\n\n<Card border />\n")),Object(r.b)("h3",{id:"with-heading-and-body-text"},"With heading and body text"),Object(r.b)("p",null,"Additionally, HDS offers styling for basic heading and body text inside the Card component. These can be used instead of custom elements."),Object(r.b)(i.c,{__position:3,__code:'<Card\n  heading="Card"\n  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."\n/>\n<Card\n  border\n  heading="Card"\n  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."\n/>',__scope:(a={props:O,DefaultLayout:d.a,Playground:i.c,StatusLabel:s.a,Card:c.a,Button:l.a,LargeParagraph:b.a,Link:u.a},a.DefaultLayout=d.a,a._frontmatter=p,a),mdxType:"Playground"},Object(r.b)(c.a,{heading:"Card",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",mdxType:"Card"}),Object(r.b)(c.a,{border:!0,heading:"Card",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",mdxType:"Card"})),Object(r.b)("h4",{id:"core-code-example-1"},"Core code example:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-html"},'<div class="hds-card">\n  <div class="hds-card__body">\n    <div class="hds-card__heading" role="heading" aria-level="2">Card</div>\n    <div class="hds-card__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>\n  </div>\n</div>\n\n<div class="hds-card hds-card--border">\n  <div class="hds-card__body">\n    <div class="hds-card__heading" role="heading" aria-level="2">Card</div>\n    <div class="hds-card__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>\n  </div>\n</div>\n')),Object(r.b)("h4",{id:"react-code-example-1"},"React code example:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-tsx"},'<Card\n  heading="Card"\n  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."\n/>\n\n<Card\n  border\n  heading="Card"\n  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."\n/>\n')),Object(r.b)("h3",{id:"using-with-other-hds-components"},"Using with other HDS components"),Object(r.b)("p",null,"Custom Cards can be easily built by using other HDS components and typography inside the Card."),Object(r.b)(i.c,{__position:4,__code:'<Card\n  heading="Card"\n  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."\n>\n  <Button variant="secondary" theme="black" role="link">\n    Button\n  </Button>\n</Card>\n<Card\n  border\n  heading="Card"\n  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."\n>\n  <Button variant="secondary" theme="black" role="link">\n    Button\n  </Button>\n</Card>',__scope:(y={props:O,DefaultLayout:d.a,Playground:i.c,StatusLabel:s.a,Card:c.a,Button:l.a,LargeParagraph:b.a,Link:u.a},y.DefaultLayout=d.a,y._frontmatter=p,y),mdxType:"Playground"},Object(r.b)(c.a,{heading:"Card",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",mdxType:"Card"},Object(r.b)(l.a,{variant:"secondary",theme:"black",role:"link",mdxType:"Button"},"Button")),Object(r.b)(c.a,{border:!0,heading:"Card",text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",mdxType:"Card"},Object(r.b)(l.a,{variant:"secondary",theme:"black",role:"link",mdxType:"Button"},"Button"))),Object(r.b)("h4",{id:"core-code-example-2"},"Core code example:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-html"},'<div class="hds-card">\n  <div class="hds-card__body">\n    <div class="hds-card__heading" role="heading" aria-level="2">Card</div>\n    <div class="hds-card__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>\n  </div>\n  <button type="button" class="hds-button hds-button--secondary hds-button--theme-black" role="link">\n    <span class="hds-button__label">Button</span>\n  </button>\n</div>\n\n<div class="hds-card hds-card--border">\n  <div class="hds-card__body">\n    <div class="hds-card__heading" role="heading" aria-level="2">Card</div>\n    <div class="hds-card__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>\n  </div>\n  <button type="button" class="hds-button hds-button--secondary hds-button--theme-black" role="link">\n    <span class="hds-button__label">Button</span>\n  </button>\n</div>\n')),Object(r.b)("h4",{id:"react-code-example-2"},"React code example:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-tsx"},'<Card\n  heading="Card"\n  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."\n>\n  <Button variant="secondary" theme="black" role="link">Button</Button>\n</Card>\n\n<Card\n  border\n  heading="Card"\n  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."\n>\n  <Button variant="secondary" theme="black" role="link">Button</Button>\n</Card>\n')),Object(r.b)("h2",{id:"demos--api"},"Demos & API"),Object(r.b)("h3",{id:"core"},"Core"),Object(r.b)("p",null,Object(r.b)("a",{parentName:"p",href:"/v1/storybook/core/?path=/story/components-card--empty"},"Cards in hds-core")),Object(r.b)("h3",{id:"react"},"React"),Object(r.b)("p",null,Object(r.b)("a",{parentName:"p",href:"/v1/storybook/react/?path=/story/components-card--empty"},"Cards in hds-react")),Object(r.b)("p",null,Object(r.b)("a",{parentName:"p",href:"/v1/storybook/react/?path=/docs/components-card--empty"},"Cards API")))}void 0!==y&&y&&y===Object(y)&&Object.isExtensible(y)&&!Object.prototype.hasOwnProperty.call(y,"__filemeta")&&Object.defineProperty(y,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"docs/components/card.mdx"}}),y.isMDXComponent=!0}}]);
//# sourceMappingURL=component---docs-components-card-mdx-208ab6c39f744f608e71.js.map