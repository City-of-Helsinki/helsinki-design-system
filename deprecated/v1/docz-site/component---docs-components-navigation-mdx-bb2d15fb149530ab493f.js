(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{LSid:function(e,a,t){"use strict";t.r(a),t.d(a,"_frontmatter",(function(){return p})),t.d(a,"default",(function(){return N}));var n=t("cxan"),i=t("+wNj"),o=(t("ERkP"),t("ZVZ0")),l=t("9Rvw"),c=t("qbsg"),s=t("7UOt"),b=t("Y5o9"),r=t("sQ7B"),m=t("x0e6"),g=t("vD+s"),u=(t("l1C2"),["components"]),p={};void 0!==p&&p&&p===Object(p)&&Object.isExtensible(p)&&!Object.prototype.hasOwnProperty.call(p,"__filemeta")&&Object.defineProperty(p,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"docs/components/navigation.mdx"}});var v={_frontmatter:p},d=l.a;function N(e){var a,t,N,h,I,k=e.components,O=Object(i.a)(e,u);return Object(o.b)(d,Object(n.a)({},v,O,{components:k,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"navigation"},"Navigation"),Object(o.b)(s.a,{type:"alert",mdxType:"StatusLabel"},"Draft"),Object(o.b)(s.a,{type:"success",style:{marginLeft:"var(--spacing-xs)"},mdxType:"StatusLabel"},"Accessible"),Object(o.b)(g.a,{mdxType:"LargeParagraph"},"A navigation component is the main way for users to navigate and locate themselves when using a service. It includes some key features present in most services to keep user experience consistent between them."),Object(o.b)("h2",{id:"principles"},"Principles"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"It is strongly recommended to always include the navigation component in your service.")),Object(o.b)("li",{parentName:"ul"},"Always position navigation to the top of the page. Keep the navigation in place so the user can always easily locate it. It is recommended to include navigation on every page of the service."),Object(o.b)("li",{parentName:"ul"},"Navigation component is built to follow HDS ",Object(o.b)("a",{parentName:"li",href:"/v1/design-tokens/breakpoints"},"breakpoint tokens"),". While it is recommended to follow HDS breakpoint tokens, you may alter navigation width to fit your service's needs."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"Try to keep the order of actions (search, user, language select) consistent in navigation.")," Do not change the default order without a good reason.",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"If there are less than three available languages and the services navigation is simple, available languages can be listed as links in the action row instead of a language select dropdown for better usability. ",Object(o.b)("strong",{parentName:"li"},"Remember to provide a lang-attribute for each language option to help assistive technology to read the language correctly"),"."))),Object(o.b)("li",{parentName:"ul"},"Keep navigation menu link labels clear and concise. Prefer max 1-2 word long labels. Avoid starting multiple menu link labels with the same word.")),Object(o.b)("h2",{id:"accessibility"},"Accessibility"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"HDS Navigation is designed to support many different brand colours. When customising colours, refer to ",Object(o.b)("a",{parentName:"li",href:"/v1/design-tokens/colour",title:"Colour"},"colour guidelines")," to ensure accessibility."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"When designing a menu link hierarchy, always think about keyboard and screen reader users.")," First, make sure top-level menu labels are clear, and submenu items contextually fit under it. Next, make sure the menu option order is logical and reasonable. Remember that keyboard users need to manually navigate to each element and thus placing a commonly used menu option last is not optimal."),Object(o.b)("li",{parentName:"ul"},"If there are multiple navigational components on the page, they should have individual aria-labels. This helps screen reader users to distinguish them from each other. The NavigationRow component has an ariaLabel property for that purpose.")),Object(o.b)("h2",{id:"usage-and-variations"},"Usage and variations"),Object(o.b)("h3",{id:"default-2-lines"},"Default (2 lines)"),Object(o.b)("p",null,"The default navigation includes a separate line for navigation menu links. Therefore it is the ideal choice for most services where navigation structure is more complicated."),Object(o.b)(c.c,{__position:2,__code:'<Navigation\n  title="Helsinki Design System"\n  menuToggleAriaLabel="menu"\n  skipTo="#content"\n  skipToContentLabel="Skip to content"\n>\n  <Navigation.Row>\n    <Navigation.Item label="Item" active />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n  </Navigation.Row>\n</Navigation>',__scope:(a={props:O,DefaultLayout:l.a,Playground:c.c,Navigation:b.a,StatusLabel:s.a,ColorBox:r.a,Text:m.a,LargeParagraph:g.a},a.DefaultLayout=l.a,a._frontmatter=p,a),mdxType:"Playground"},Object(o.b)(b.a,{title:"Helsinki Design System",menuToggleAriaLabel:"menu",skipTo:"#content",skipToContentLabel:"Skip to content",mdxType:"Navigation"},Object(o.b)(b.a.Row,null,Object(o.b)(b.a.Item,{label:"Item",active:!0}),Object(o.b)(b.a.Item,{label:"Item"}),Object(o.b)(b.a.Item,{label:"Item"}),Object(o.b)(b.a.Item,{label:"Item"}),Object(o.b)(b.a.Item,{label:"Item"}),Object(o.b)(b.a.Item,{label:"Item"})))),Object(o.b)("h4",{id:"react-code-example"},"React code example:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-tsx"},'<Navigation\n  title="Helsinki Design System"\n  menuToggleAriaLabel="menu"\n  skipTo="#content"\n  skipToContentLabel="Skip to content"\n>\n  <Navigation.Row>\n    <Navigation.Item label="Item" active />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n  </Navigation.Row>\n</Navigation>\n')),Object(o.b)("h3",{id:"small-1-line"},"Small (1 line)"),Object(o.b)("p",null,"A service can opt to use smaller, 1 line navigation if 2 line navigation is too heavy for its purpose. Smaller navigation is optimal for services that do not have a complicated navigation structure (only 1-3 links in navigation) and do not need many navigation features such as search, profile, and language selection."),Object(o.b)(c.c,{__position:3,__code:'<Navigation\n  title="Helsinki Design System"\n  menuToggleAriaLabel="menu"\n  skipTo="#content"\n  skipToContentLabel="Skip to content"\n>\n  <Navigation.Row variant="inline">\n    <Navigation.Item label="Item" active />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n  </Navigation.Row>\n</Navigation>',__scope:(t={props:O,DefaultLayout:l.a,Playground:c.c,Navigation:b.a,StatusLabel:s.a,ColorBox:r.a,Text:m.a,LargeParagraph:g.a},t.DefaultLayout=l.a,t._frontmatter=p,t),mdxType:"Playground"},Object(o.b)(b.a,{title:"Helsinki Design System",menuToggleAriaLabel:"menu",skipTo:"#content",skipToContentLabel:"Skip to content",mdxType:"Navigation"},Object(o.b)(b.a.Row,{variant:"inline"},Object(o.b)(b.a.Item,{label:"Item",active:!0}),Object(o.b)(b.a.Item,{label:"Item"}),Object(o.b)(b.a.Item,{label:"Item"})))),Object(o.b)("h4",{id:"react-code-example-1"},"React code example:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-tsx"},'<Navigation\n  title="Helsinki Design System"\n  menuToggleAriaLabel="menu"\n  skipTo="#content"\n  skipToContentLabel="Skip to content"\n>\n  <Navigation.Row variant="inline">\n    <Navigation.Item label="Item" active />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n  </Navigation.Row>\n</Navigation>\n')),Object(o.b)("h3",{id:"colour-variations"},"colour variations"),Object(o.b)("p",null,"HDS Navigation offers two variations with different background colours - one with white and one with black text elements. Use variation that achieves better contrast with the brand background colour of your choice. When customising colours, refer to ",Object(o.b)("a",{parentName:"p",href:"/v1/design-tokens/colour",title:"Colour"},"colour guidelines")," to ensure accessibility."),Object(o.b)(c.c,{__position:4,__code:'<Navigation\n  title="Helsinki Design System"\n  menuToggleAriaLabel="menu"\n  skipTo="#content"\n  skipToContentLabel="Skip to content"\n>\n  <Navigation.Row variant="inline">\n    <Navigation.Item label="Item" active />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n  </Navigation.Row>\n</Navigation>\n<Navigation\n  theme="dark"\n  title="Helsinki Design System"\n  menuToggleAriaLabel="menu"\n  skipTo="#content"\n  skipToContentLabel="Skip to content"\n>\n  <Navigation.Row variant="inline">\n    <Navigation.Item label="Item" active />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n  </Navigation.Row>\n</Navigation>',__scope:(N={props:O,DefaultLayout:l.a,Playground:c.c,Navigation:b.a,StatusLabel:s.a,ColorBox:r.a,Text:m.a,LargeParagraph:g.a},N.DefaultLayout=l.a,N._frontmatter=p,N),mdxType:"Playground"},Object(o.b)(b.a,{title:"Helsinki Design System",menuToggleAriaLabel:"menu",skipTo:"#content",skipToContentLabel:"Skip to content",mdxType:"Navigation"},Object(o.b)(b.a.Row,{variant:"inline"},Object(o.b)(b.a.Item,{label:"Item",active:!0}),Object(o.b)(b.a.Item,{label:"Item"}),Object(o.b)(b.a.Item,{label:"Item"}))),Object(o.b)(b.a,{theme:"dark",title:"Helsinki Design System",menuToggleAriaLabel:"menu",skipTo:"#content",skipToContentLabel:"Skip to content",mdxType:"Navigation"},Object(o.b)(b.a.Row,{variant:"inline"},Object(o.b)(b.a.Item,{label:"Item",active:!0}),Object(o.b)(b.a.Item,{label:"Item"}),Object(o.b)(b.a.Item,{label:"Item"})))),Object(o.b)("h4",{id:"react-code-example-2"},"React code example:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-tsx"},'{/* Light (default) */}\n<Navigation\n  title="Helsinki Design System"\n  menuToggleAriaLabel="menu"\n  skipTo="#content"\n  skipToContentLabel="Skip to content"\n>\n  <Navigation.Row variant="inline">\n    <Navigation.Item label="Item" active />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n  </Navigation.Row>\n</Navigation>\n\n{/* Dark */}\n<Navigation\n  theme="dark"\n  title="Helsinki Design System"\n  menuToggleAriaLabel="menu"\n  skipTo="#content"\n  skipToContentLabel="Skip to content"\n>\n  <Navigation.Row variant="inline">\n    <Navigation.Item label="Item" active />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n  </Navigation.Row>\n</Navigation>\n')),Object(o.b)("h3",{id:"custom-theme"},"Custom theme"),Object(o.b)("p",null,"All the navigation colours can be customised, if the available colour variants don't suit your needs. When customising colours, refer to ",Object(o.b)("a",{parentName:"p",href:"/v1/design-tokens/colour",title:"Colour"},"colour guidelines")," to ensure accessibility."),Object(o.b)(c.c,{__position:5,__code:'<Navigation\n  theme={{\n    \'--header-background-color\': \'var(--color-engel)\',\n  }}\n  title="Helsinki Design System"\n  menuToggleAriaLabel="menu"\n  skipTo="#content"\n  skipToContentLabel="Skip to content"\n>\n  <Navigation.Row variant="inline">\n    <Navigation.Item label="Item" active />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n  </Navigation.Row>\n</Navigation>',__scope:(h={props:O,DefaultLayout:l.a,Playground:c.c,Navigation:b.a,StatusLabel:s.a,ColorBox:r.a,Text:m.a,LargeParagraph:g.a},h.DefaultLayout=l.a,h._frontmatter=p,h),mdxType:"Playground"},Object(o.b)(b.a,{theme:{"--header-background-color":"var(--color-engel)"},title:"Helsinki Design System",menuToggleAriaLabel:"menu",skipTo:"#content",skipToContentLabel:"Skip to content",mdxType:"Navigation"},Object(o.b)(b.a.Row,{variant:"inline"},Object(o.b)(b.a.Item,{label:"Item",active:!0}),Object(o.b)(b.a.Item,{label:"Item"}),Object(o.b)(b.a.Item,{label:"Item"})))),Object(o.b)("h4",{id:"react-code-example-3"},"React code example:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-tsx"},'<Navigation\n  theme={{\n    \'--header-background-color\': \'var(--color-engel)\',\n  }}\n  title="Helsinki Design System"\n  menuToggleAriaLabel="menu"\n  skipTo="#content"\n  skipToContentLabel="Skip to content"\n>\n  <Navigation.Row variant="inline">\n    <Navigation.Item label="Item" active />\n    <Navigation.Item label="Item" />\n    <Navigation.Item label="Item" />\n  </Navigation.Row>\n</Navigation>\n')),Object(o.b)("h3",{id:"navigation-actions"},"Navigation actions"),Object(o.b)("p",null,"HDS Navigation component supports many commonly used features out of the box. The main navigation bar can be configured to include search, language selection and user profile actions. You may also easily customize the action row with your own actions."),Object(o.b)(c.c,{__position:6,__code:'<Navigation\n  title="Helsinki Design System"\n  menuToggleAriaLabel="menu"\n  skipTo="#content"\n  skipToContentLabel="Skip to content"\n>\n  <Navigation.Actions>\n    <Navigation.Search searchLabel="Search" searchPlaceholder="Search page" />\n    <Navigation.User label="Sign in" />\n    <Navigation.LanguageSelector label="FI">\n      <Navigation.Item lang="fi" label="Suomeksi" />\n      <Navigation.Item lang="sv" label="På svenska" />\n      <Navigation.Item lang="en" label="In English" />\n    </Navigation.LanguageSelector>\n  </Navigation.Actions>\n</Navigation>',__scope:(I={props:O,DefaultLayout:l.a,Playground:c.c,Navigation:b.a,StatusLabel:s.a,ColorBox:r.a,Text:m.a,LargeParagraph:g.a},I.DefaultLayout=l.a,I._frontmatter=p,I),mdxType:"Playground"},Object(o.b)(b.a,{title:"Helsinki Design System",menuToggleAriaLabel:"menu",skipTo:"#content",skipToContentLabel:"Skip to content",mdxType:"Navigation"},Object(o.b)(b.a.Actions,null,Object(o.b)(b.a.Search,{searchLabel:"Search",searchPlaceholder:"Search page"}),Object(o.b)(b.a.User,{label:"Sign in"}),Object(o.b)(b.a.LanguageSelector,{label:"FI"},Object(o.b)(b.a.Item,{lang:"fi",label:"Suomeksi"}),Object(o.b)(b.a.Item,{lang:"sv",label:"På svenska"}),Object(o.b)(b.a.Item,{lang:"en",label:"In English"}))))),Object(o.b)("h4",{id:"react-code-example-4"},"React code example:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-tsx"},'<Navigation\n  title="Helsinki Design System"\n  menuToggleAriaLabel="menu"\n  skipTo="#content"\n  skipToContentLabel="Skip to content"\n>\n  <Navigation.Actions>\n    <Navigation.Search searchLabel="Search" searchPlaceholder="Search page" />\n    <Navigation.User label="Sign in" />\n    <Navigation.LanguageSelector label="FI">\n      <Navigation.Item lang="fi" label="Suomeksi" />\n      <Navigation.Item lang="sv" label="På svenska" />\n      <Navigation.Item lang="en" label="In English" />\n    </Navigation.LanguageSelector>\n  </Navigation.Actions>\n</Navigation>\n')),Object(o.b)("h2",{id:"demos--api"},"Demos & API"),Object(o.b)("h3",{id:"core"},"Core"),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Not included in hds-core!")),Object(o.b)("h3",{id:"react"},"React"),Object(o.b)("p",null,Object(o.b)("a",{parentName:"p",href:"/v1/storybook/react/?path=/story/components-navigation--example"},"Navigation in hds-react")),Object(o.b)("p",null,Object(o.b)("a",{parentName:"p",href:"/v1/storybook/react/?path=/docs/components-navigation--example"},"Navigation API")))}void 0!==N&&N&&N===Object(N)&&Object.isExtensible(N)&&!Object.prototype.hasOwnProperty.call(N,"__filemeta")&&Object.defineProperty(N,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"docs/components/navigation.mdx"}}),N.isMDXComponent=!0}}]);
//# sourceMappingURL=component---docs-components-navigation-mdx-bb2d15fb149530ab493f.js.map