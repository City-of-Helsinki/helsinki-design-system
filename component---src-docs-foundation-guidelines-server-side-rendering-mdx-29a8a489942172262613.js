"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[1722],{68563:function(e,t,n){n.r(t);var s=n(11151),r=n(67294),l=n(12818),a=n(18500),i=n(89482);function o(e){const t=Object.assign({h1:"h1",a:"a",span:"span",h2:"h2",p:"p",h3:"h3",ul:"ul",li:"li",pre:"pre",code:"code",ol:"ol"},(0,s.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(t.h1,{id:"server-side-rendering",style:{position:"relative"}},"Server-side rendering",r.createElement(t.a,{href:"#server-side-rendering","aria-label":"server side rendering permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(i.Z,null,"The server-side rendering support of the Helsinki Design System makes the user's landing experience to pages smooth without\nflashes of unstyled content."),"\n",r.createElement(t.h2,{id:"what-is-server-side-rendering",style:{position:"relative"}},"What is server-side rendering?",r.createElement(t.a,{href:"#what-is-server-side-rendering","aria-label":"what is server side rendering permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"Server-side rendering (SSR) is the process where the rendering of HTML pages is done on the server-side. The fully rendered HTML\ndocument is then sent to the browser. The rendering of the HTML can happen at build time (Static site generation\nor pre-rendering), or during an HTTP request. The alternative to SSR is client-side rendering (CSR), where most of the HTML\ncontent is composed and rendered in the browser using JavaScript."),"\n",r.createElement(t.h2,{id:"how-does-hds-support-server-side-rendering",style:{position:"relative"}},"How does HDS support server-side rendering?",r.createElement(t.a,{href:"#how-does-hds-support-server-side-rendering","aria-label":"how does hds support server side rendering permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"For HDS components to work with server-side rendering, you need to inject the critical CSS styles of the HDS components\nthat are being used into the initially rendered HTML on the server's side. For hds-core, you must include the styles from\nthe provided CSS files yourself. For hds-react HDS provides multiple options, which we will cover next."),"\n",r.createElement(l.N,{label:"Critical CSS",className:"siteNotification"},r.createElement(t.p,null,"Critical CSS is applied to above-the-fold elements. It provides the styles for the immediately visible content in the browser\nviewport when the user opens your website. Critical CSS does not usually have the styles of the elements that are in the\nscrollable content outside of the browser viewport. There is one exception though, and that is if you have anchor links on the page.\nWhen user opens website from an URL that includes an anchor link, the browser automatically scrolls the page so that the link\nwill be visible.")),"\n",r.createElement(t.h3,{id:"option-1-getcriticalhdsrules-tool-to-get-critical-styles-recommended",style:{position:"relative"}},"Option 1: getCriticalHdsRules tool to get critical styles (recommended)",r.createElement(t.a,{href:"#option-1-getcriticalhdsrules-tool-to-get-critical-styles-recommended","aria-label":"option 1 getcriticalhdsrules tool to get critical styles recommended permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"HDS React components use CSS-in-JS in a way where the styles are by default injected into the head tag in the browser.\nIf you use server-side rendering and do not include the critical styles on the server, this leads to flashes of unstyled\ncontent when the user lands on the page."),"\n",r.createElement(t.p,null,"To include critical styles on the server, HDS exposes a tool for extracting the used critical styles of HDS components.\nThis should come in handy in multiple ways:"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"Automatically extracts styles based on used HTML."),"\n",r.createElement(t.li,null,"If you add more HDS components later, you do not need to remember to add their styles separately."),"\n",r.createElement(t.li,null,"If you happen to remove HDS components, you do not need to remember to remove their respective styles."),"\n"),"\n",r.createElement(t.p,null,"Let's go through a simple example of the usage of the tool:"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-js"},'import { getCriticalHdsRules, hdsStyles } from "hds-react";\n\nconst criticalHdsRules = await getCriticalHdsRules(bodyHTML, hdsStyles);\n\nconst finalHTML =\n<html>\n  <head>\n    ...\n    <style data-used-styles dangerouslySetInnerHTML={{ __html: criticalHdsRules }} />\n  </head>\n  <body>\n    ...\n  </body>\n<html>\n')),"\n",r.createElement(t.p,null,"First, we import the tool that is named ",r.createElement(t.code,null,"getCriticalHdsRules"),". To be able to call it, we need two things:"),"\n",r.createElement(t.ol,null,"\n",r.createElement(t.li,null,"The initially to-be-rendered HTML body code as a string."),"\n",r.createElement(t.li,null,"hdsStyles - a variable holding all the styles of the HDS react components as a string."),"\n"),"\n",r.createElement(t.p,null,"Calling it returns a string containing the critical CSS styles. The rest is easy, we set those styles into\na style tag, that we will then inject into the finally rendered HTML document. It can be wise to cache the result of\n",r.createElement(t.code,null,"getCriticalHdsRules")," based on the function parameters in order to improve performance."),"\n",r.createElement(t.p,null,"See below for more complete examples:"),"\n",r.createElement(a.A,{heading:"Next.js",headingLevel:"4",language:"en",size:"s",theme:{"--padding-vertical":"var(--spacing-s)"}},r.createElement(t.p,null,"In the Next.js framework, create a file called _document.js in folder pages, and add this code to it:")),"\n",r.createElement(a.A,{heading:"Gatsby",headingLevel:"4",language:"en",size:"s",theme:{"--padding-vertical":"var(--spacing-s)"}},r.createElement(t.p,null,"In the Gatsby framework, create a file called gatsby-ssr.js at the root of the project, and add this code to it:")),"\n",r.createElement(t.h3,{id:"option-2-use-indexcss-or-hdsstyles-not-recommended",style:{position:"relative"}},"Option 2: Use index.css or hdsStyles (not recommended)",r.createElement(t.a,{href:"#option-2-use-indexcss-or-hdsstyles-not-recommended","aria-label":"option 2 use indexcss or hdsstyles not recommended permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"HDS react provides all the styles of HDS components in a file called ",r.createElement(t.code,null,"index.css"),", located at the root of the library.\nYou can import that file and collect the critical CSS styles from there. Another alternative is to use exported variable\ncalled ",r.createElement(t.code,null,"hdsStyles"),":"),"\n",r.createElement(t.pre,null,r.createElement(t.code,{className:"language-js"},"import { hdsStyles } from 'hds-react';\n")),"\n",r.createElement(t.p,null,"This variable holds all the styles of HDS React components compiled into a single string. It might be tempting to include\nall the styles in ",r.createElement(t.code,null,"hdsStyles")," or ",r.createElement(t.code,null,"index.css")," to your HTML, and call it a day. This is not optimal because the size of the\nHDS styles is large and probably growing as new components are added to it. Adding all the styles might have an impact on the\nperformance of the app. Instead, you should collect only the necessary styles for the initial render. We recommend using\nthe tool described in option 1. But if you are unable to use that, extracting the critical CSS styles from either\n",r.createElement(t.code,null,"hdsStyles")," or ",r.createElement(t.code,null,"index.css")," might work out for you."),"\n",r.createElement(t.h3,{id:"customising-hds-components-and-server-side-rendering",style:{position:"relative"}},"Customising HDS components and server-side rendering",r.createElement(t.a,{href:"#customising-hds-components-and-server-side-rendering","aria-label":"customising hds components and server side rendering permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"If you customise hds-react components with the ",r.createElement("code",null,"theme")," prop, the style changes will not be visible on the\nfirst render. The preferred way to customise hds-react components with server-side rendering is using the ",r.createElement("code",null,"className"),"\nprop. However, notice that sometimes CSS selector specificity of 0-1-0 may not be enough to overwrite default CSS variables.\nThis depends on the CSS declaration order on the page or component's default styles selector specificity.\nYou may have to use a more specific CSS selector for the custom styles class, for example, ",r.createElement(t.code,null,"#myComponent.custom-class"),", ",r.createElement(t.code,null,".custom-class.custom-class"),", etc."))}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?r.createElement(t,e,r.createElement(o,e)):o(e)}},89482:function(e,t,n){var s=n(67294);t.Z=e=>{let{color:t="var(--color-black-90)",size:n="var(--fontsize-body-xl)",style:r={},children:l}=e;return s.createElement("p",{style:{fontSize:n,color:t,maxWidth:600,...r}},l)}}}]);