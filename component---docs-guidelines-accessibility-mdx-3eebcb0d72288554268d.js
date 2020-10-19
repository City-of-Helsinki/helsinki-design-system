(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{PRtX:function(e,t,i){"use strict";i.r(t),i.d(t,"_frontmatter",(function(){return b})),i.d(t,"default",(function(){return u}));var a=i("cxan"),n=i("+wNj"),s=i("ZVZ0"),o=i("9Rvw"),l=i("VYYj"),c=i("vD+s"),r=i("fSvc"),b=(i("l1C2"),{});void 0!==b&&b&&b===Object(b)&&Object.isExtensible(b)&&!b.hasOwnProperty("__filemeta")&&Object.defineProperty(b,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"docs/guidelines/accessibility.mdx"}});var d={_frontmatter:b},p=o.a;function u(e){var t=e.components,i=Object(n.a)(e,["components"]);return Object(s.b)(p,Object(a.a)({},d,i,{components:t,mdxType:"MDXLayout"}),Object(s.b)("h1",{id:"accessibility"},"Accessibility"),Object(s.b)(c.a,{mdxType:"LargeParagraph"},"The Helsinki Design System is designed and built to be accessible for all, regardless of ability or situation."),Object(s.b)("h2",{id:"accessibility-in-the-city-of-helsinki-digital-services"},"Accessibility in the City of Helsinki digital services"),Object(s.b)("p",null,"The basis of HDS accessibility is ",Object(s.b)(r.a,{href:"https://eur-lex.europa.eu/eli/dir/2016/2102/oj",external:!0,mdxType:"Link"},"an EU directive on web accessibility")," which mandates that all new public sector websites published by 23.09.2019 have to comply with ",Object(s.b)(r.a,{href:"https://www.w3.org/TR/WCAG20/",external:!0,mdxType:"Link"},"WCAG 2.0 Standard at AA Level"),". On 23.09.2020 all websites, new and old, have to meet this criteria. HDS aims to make the life of projects easier by providing components, patterns and guidelines that meet these requirements."),Object(s.b)("h2",{id:"standards-behind-hds-development"},"Standards behind HDS development"),Object(s.b)("p",null,"Following the EU directive, HDS aims to fulfill ",Object(s.b)(r.a,{href:"https://www.w3.org/TR/WCAG20/",external:!0,mdxType:"Link"},"WCAG 2.0 Standard at AA Level"),"."),Object(s.b)("p",null,"However, HDS follows the newer ",Object(s.b)(r.a,{href:"https://www.w3.org/TR/WCAG21/",external:!0,mdxType:"Link"},"WCAG 2.1 Standard"),". The publication of WCAG 2.1 does not deprecate or supersede WCAG 2.0 and W3C advices to use it. Even though the EU directive requires fullfilling the standard at AA level, HDS also implements many requirements from the AAA level."),Object(s.b)("p",null,"In addition to WCAG 2.1 and 2.0, HDS also refers to the following guidelines:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},Object(s.b)(r.a,{href:"https://www.w3.org/TR/WCAG22/",external:!0,mdxType:"Link"},"WCAG 2.2 Standard (draft) at AA level"),". This is done for future-proofing reasons even though the requirements are not part of the official WCAG requirements yet."),Object(s.b)("li",{parentName:"ul"},Object(s.b)(r.a,{href:"https://www.hel.fi/static/liitteet/kanslia/TPR/opas_saavutettavaan_sisaltoon_EN.pdf",external:!0,mdxType:"Link"},"The City of Helsinki content accessibility guidelines"),". They are heavily based on WCAG requirements but still include good extra practices."),Object(s.b)("li",{parentName:"ul"},Object(s.b)(r.a,{href:"https://dev.hel.fi/accessibility",external:!0,mdxType:"Link"},"Develop with Helsinki - accessibility guidelines for developers"),".")),Object(s.b)("h2",{id:"hds-accessibility-process"},"HDS accessibility process"),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},"After HDS beta release, new components and patterns are not released before their accessibility has been audited by a third party auditor.")," If components or patterns are released without an audit, it will be clearly indicated in the documentation. This may happen if the component is quickly needed by some project or if it takes considerably long time to make the component accessible."),Object(s.b)("p",null,"Component accessibility is ensured in all stages of HDS design and development. The process is following:"),Object(s.b)("ol",null,Object(s.b)("li",{parentName:"ol"},"During design phase, auditors will comment the designs from visual perspective. They will also give pointers on which parts of the design may cause challenges for accessibility during implementation."),Object(s.b)("li",{parentName:"ol"},"During implementation specification phase, auditors will comment on the specifications from the accessibility point of view. Specifications will include things like keyboard navigation, usage of aria features etc."),Object(s.b)("li",{parentName:"ol"},"During implementation, auditors will actively test the component and suggest changes if needed."),Object(s.b)("li",{parentName:"ol"},"During documentation phase, auditors will read through the documentation and suggest changes and clarifications if needed."),Object(s.b)("li",{parentName:"ol"},"After all phases have been accepted by the auditors, the component will be marked with the following status label in the HDS documentation: ",Object(s.b)(l.a,{type:"success",mdxType:"StatusLabel"},"Accessible")," ")),Object(s.b)("h2",{id:"accessibility-in-projects-using-hds"},"Accessibility in projects using HDS"),Object(s.b)("p",null,"HDS promises to ensure component and pattern level accessibility. This means that a project that uses HDS components and patterns and follows HDS guidelines can trust that these parts of the service are accessible. However, if the components are used in other ways or use cases than specified in the HDS documentation, HDS cannot promise accessibility. ",Object(s.b)("strong",{parentName:"p"},"It is good to keep in mind that using HDS does not alone make the service accessible!")),Object(s.b)("p",null,"Here are some things projects should take into account when designing accessible services using HDS:"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"Get at least a basic level familiarity of ",Object(s.b)(r.a,{href:"https://www.w3.org/TR/WCAG20/",external:!0,mdxType:"Link"},"WCAG 2.0 Standard at AA Level"),". Your service is required to follow WCAG guidelines at A and AA levels."),Object(s.b)("li",{parentName:"ul"},"HDS components allow a lot of customisation. When customising component colours, ensure accessibility. For more information, refer to ",Object(s.b)(r.a,{href:"/design-tokens/colour#accessible-colour-combinations",mdxType:"Link"},"HDS Colours - Accessible colour combination documentation"),"."),Object(s.b)("li",{parentName:"ul"},"When designing components that are not part of the HDS, you are required to ensure the accessibility by yourself. It may help to refer to HDS components for good accessibility design and implementation practices. You may also contact the HDS team if you need assistance.")))}void 0!==u&&u&&u===Object(u)&&Object.isExtensible(u)&&!u.hasOwnProperty("__filemeta")&&Object.defineProperty(u,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"docs/guidelines/accessibility.mdx"}}),u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---docs-guidelines-accessibility-mdx-3eebcb0d72288554268d.js.map