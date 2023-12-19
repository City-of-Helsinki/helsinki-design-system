"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[7720],{99665:function(e,t,a){a.d(t,{E:function(){return o}});var n=a(67294),r=a(7661),i=a(7444),l=a(34300),s=a(41011);(0,i.s)(".ErrorSummary-module_errorSummaryBody__3WOh8{font-size:var(--fontsize-body-s);line-height:24px}.ErrorSummary-module_errorSummaryBody__3WOh8 ul{margin:0;padding:0 0 0 var(--spacing-s)}.ErrorSummary-module_errorSummaryBody__3WOh8 li{margin-bottom:.125rem}.ErrorSummary-module_errorSummaryBody__3WOh8 a{color:var(--color-bus)}.ErrorSummary-module_label__1fMZ9:focus{outline:3px solid var(--color-coat-of-arms)}");const o=n.forwardRef(((e,t)=>{let{autofocus:a=!1,className:i,label:o,size:m="default",style:c,children:d}=e;const h=(0,n.useRef)(null);return(0,n.useEffect)((()=>{!0===a&&h.current.focus()}),[a]),n.createElement("div",{ref:t,className:(0,l.c)(r.n.notification,r.n[m],r.n.error,i),style:c,"aria-label":"Error summary","aria-atomic":"true"},n.createElement("div",{className:r.n.content},n.createElement("div",{className:(0,l.c)(r.n.label,"ErrorSummary-module_label__1fMZ9"),role:"heading","aria-level":2,tabIndex:-1,ref:h},n.createElement(s.I,{className:r.n.icon,"aria-hidden":!0}),o),n.createElement("div",{className:"ErrorSummary-module_errorSummaryBody__3WOh8"},d)))}))},7025:function(e,t,a){a.d(t,{I:function(){return i},a:function(){return l}});var n=a(67294),r=a(32719);const i=e=>{let{ariaLabel:t="error",ariaLabelledby:a,ariaHidden:i=!0,className:l="",color:s,size:o="s",style:m={}}=e;return n.createElement("svg",{className:[r.s.icon,r.s[o],l].filter((e=>e)).join(" "),role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","aria-label":t,"aria-labelledby":a,"aria-hidden":i,color:s,style:m},n.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11.1284 2.50974C11.4971 1.85436 12.4201 1.83095 12.8284 2.43952L12.8716 2.50974L22.4341 19.5097C22.7965 20.1541 22.3585 20.9453 21.638 20.9973L21.5625 21H2.43749C1.69816 21 1.22338 20.2303 1.53125 19.5769L1.56592 19.5097L11.1284 2.50974ZM12 5.04L4.14699 19H19.8525L12 5.04ZM13 16V18H11V16H13ZM13 9.5V14.5H11V9.5H13Z",fill:"currentColor"}))},l=e=>{let{ariaLabel:t="playback-pause",ariaLabelledby:a,ariaHidden:i=!0,className:l="",color:s,size:o="s",style:m={}}=e;return n.createElement("svg",{className:[r.s.icon,r.s[o],l].filter((e=>e)).join(" "),role:"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","aria-label":t,"aria-labelledby":a,"aria-hidden":i,color:s,style:m},n.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M17 5V19H14V5H17ZM10 5V19H7V5H10Z",fill:"currentColor"}))}},8416:function(e,t,a){a.r(t);var n=a(11151),r=a(67294),i=a(12818),l=a(32659),s=a(7025),o=a(83926),m=a(99665),c=a(86621),d=a(61600),h=a(89482),u=a(38753);function p(e){const t=Object.assign({h1:"h1",a:"a",span:"span",h2:"h2",ul:"ul",li:"li",p:"p",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",strong:"strong",h3:"h3",hr:"hr",h4:"h4",h5:"h5",ol:"ol",pre:"pre",code:"code"},(0,n.ah)(),e.components),{Link:a,Playground:p,InternalLink:v}=t;return v||f("InternalLink",!0),a||f("Link",!0),p||f("Playground",!0),r.createElement(r.Fragment,null,r.createElement(t.h1,{id:"form-validation",style:{position:"relative"}},"Form validation",r.createElement(t.a,{href:"#form-validation","aria-label":"form validation permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(h.Z,null,"Forms are very common in the City of Helsinki services. Users making errors in forms is just as common. HDS Form\nvalidation pattern aims to clearly indicate erroneous inputs to users and make it as effortless as possible to fix\nthem."),"\n",r.createElement(t.h2,{id:"principles",style:{position:"relative"}},"Principles",r.createElement(t.a,{href:"#principles","aria-label":"principles permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"HDS pattern is based on the following basic principles","\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"It must be easy for the user to locate the erroneous input field"),"\n",r.createElement(t.li,null,"The error message is clearly visible and is easy to understand"),"\n",r.createElement(t.li,null,"The error message stays on the screen as long as the error has been fixed"),"\n"),"\n"),"\n"),"\n",r.createElement(t.p,null,"All following methods follow these principles even though their implementation may differ from each other."),"\n",r.createElement(i.N,{label:"Frontend vs backend validation",className:"siteNotification"},r.createElement(t.p,null,"HDS form validation pattern only concerns validation that happens in the frontend. You must never trust the frontend\nvalidation alone. Make the validation process in the backend too.")),"\n",r.createElement(t.h2,{id:"types-of-validation",style:{position:"relative"}},"Types of validation",r.createElement(t.a,{href:"#types-of-validation","aria-label":"types of validation permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"This page will provide basic principles for all as well as links to Storybook examples on how to use each validation method in practice. HDS pattern proposes three (3) form validation methods:"),"\n",r.createElement(t.table,null,r.createElement(t.thead,null,r.createElement(t.tr,null,r.createElement(t.th,null,"Method"),r.createElement(t.th,null,"What does it mean?"),r.createElement(t.th,null,"When to use it?"))),r.createElement(t.tbody,null,r.createElement(t.tr,null,r.createElement(t.td,null,r.createElement(t.a,{href:"#dynamic-validation"},"Dynamic")),r.createElement(t.td,null,r.createElement(t.strong,null,"Recommended option.")," Validation performed individually for each form control, when the user has entered a value and/or moves the focus to the next interactive element"),r.createElement(t.td,null,"Preferred method when client-side scripting (e.g. JavaScript) is available")),r.createElement(t.tr,null,r.createElement(t.td,null,r.createElement(t.a,{href:"#static-validation"},"Static")),r.createElement(t.td,null,"Validation performed for the whole form at once, when the user submits the form or proceeds to the next step"),r.createElement(t.td,null,"Use when client-side scripting is not possible")),r.createElement(t.tr,null,r.createElement(t.td,null,r.createElement(t.a,{href:"#hybrid-validation"},"Hybrid")),r.createElement(t.td,null,"Dynamic and static methods utilised in parallel, benefitting from each other"),r.createElement(t.td,null,"Use when some of the validation has to be done when the form is submitted but client-side scripting is still possible")),r.createElement(t.tr,null,r.createElement(t.td,null,"[Table 1:Validation methods and when to use them]"),r.createElement(t.td),r.createElement(t.td)))),"\n",r.createElement(i.N,{label:"Why are different validation methods allowed?",className:"siteNotification"},r.createElement(t.p,null,"There is a wide range of services in the City of Helsinki. Some projects are restricted to static validation due to\ntechnical limitations (e.g. no JavaScript). For these reasons HDS offers multiple validation methods and has examples\navailable for all kinds of projects.")),"\n",r.createElement(t.h3,{id:"dynamic-validation",style:{position:"relative"}},"Dynamic validation",r.createElement(t.a,{href:"#dynamic-validation","aria-label":"dynamic validation permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,r.createElement(t.strong,null,"This is the recommended validation method in the City of Helsinki services.")),"\n",r.createElement(t.p,null,"In dynamic form validation the user input is ",r.createElement(t.strong,null,"validated immediately after the focus leaves the current form element")," and moves to the next one. If an error is found during the validation, the form control is set to an error state."),"\n",r.createElement(t.p,null,r.createElement(t.strong,null,"Dynamic form validation is recommended way to do input validation in the City of Helsinki services"),". The method allows the user to fix the error immediately rather than after the form has been submitted. This can greatly reduce cognitive load of the user since they neither do have to locate the erroneous input nor switch their context to the next input before fixing the error."),"\n",r.createElement(a,{href:"/storybook/react/iframe.html?id=patterns-form-validation--dynamic&viewMode=story",external:!0,openInNewTab:!0,openInNewTabAriaLabel:"Opens in new tab"},"See interactive dynamic form validation example in HDS Storybook"),"\n",r.createElement(a,{href:"/storybook/react/?path=/docs/patterns-form-validation--static#dynamic",external:!0,openInNewTab:!0,openInNewTabAriaLabel:"Opens in new tab"},"See dynamic form validation code example in HDS Storybook"),"\n",r.createElement(t.h3,{id:"static-validation",style:{position:"relative"}},"Static validation",r.createElement(t.a,{href:"#static-validation","aria-label":"static validation permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"In static form validation the validation is done when the form is submitted or the next page is loaded. In this case the validation can be done either in the browser and/or in the service backend. This method is common for services which cannot use JavaScript for dynamic approach."),"\n",r.createElement(t.p,null,"The general issue of static validation is that it is possible that there are multiple erroneous inputs after the validation. To make it easier for the user to go through the errors, ",r.createElement(t.strong,null,"HDS recommends using validation summary pattern")," in which all errors are gathered to one list on top of the form. The list contains all errors found the the form and an anchor link to each form control. You can read more about the ",r.createElement(t.a,{href:"#validation-summary-pattern"},"validation summary pattern in its own section"),"."),"\n",r.createElement(a,{href:"/storybook/react/iframe.html?id=patterns-form-validation--static&viewMode=story",external:!0,openInNewTab:!0,openInNewTabAriaLabel:"Opens in new tab"},"See interactive static form validation example in HDS Storybook"),"\n",r.createElement(a,{href:"/storybook/react/?path=/docs/patterns-form-validation--static#static",external:!0,openInNewTab:!0,openInNewTabAriaLabel:"Opens in new tab"},"See static form validation code example in HDS Storybook"),"\n",r.createElement(t.h3,{id:"hybrid-validation",style:{position:"relative"}},"Hybrid validation",r.createElement(t.a,{href:"#hybrid-validation","aria-label":"hybrid validation permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"Dynamic and static validation methods can be also used in parallel. This is particularly useful if part of the validation has to be done in the backend (e.g. checking if a user already exists). In this case, basic input validation can be done dynamically and other validations when the form is submitted. As in static validation, ",r.createElement(t.strong,null,"HDS recommends using validation summary pattern")," for errors that are found on form submit. You can read more about the ",r.createElement(t.a,{href:"#validation-summary-pattern"},"validation summary pattern in its own section"),"."),"\n",r.createElement(t.p,null,"The advantage of hybrid validation is that because form controls are validated dynamically, the user generally receives less errors after the form submit. ",r.createElement(t.strong,null,"It is always recommended to use dynamic validation approach first")," but if some static validation is required, the hybrid validation approach can be used."),"\n",r.createElement(a,{href:"/storybook/react/iframe.html?id=patterns-form-validation--hybrid&viewMode=story",external:!0,openInNewTab:!0,openInNewTabAriaLabel:"Opens in new tab"},"See interactive hybrid form validation example in HDS Storybook"),"\n",r.createElement(a,{href:"/storybook/react/?path=/docs/patterns-form-validation--static#hybrid",external:!0,openInNewTab:!0,openInNewTabAriaLabel:"Opens in new tab"},"See hybrid form validation code example in HDS Storybook"),"\n",r.createElement(t.hr),"\n",r.createElement(t.h2,{id:"presenting-validation-results",style:{position:"relative"}},"Presenting validation results",r.createElement(t.a,{href:"#presenting-validation-results","aria-label":"presenting validation results permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.h3,{id:"form-control-errorsuccess-messages",style:{position:"relative"}},"Form control error/success messages",r.createElement(t.a,{href:"#form-control-errorsuccess-messages","aria-label":"form control errorsuccess messages permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"When a form control has been gone through either dynamic or static validation, the state of the component should change indicating the inputted value has been validated."),"\n",r.createElement(t.p,null,"Depending on the result of the validation, message is displayed below the form field if the value is valid or invalid."),"\n",r.createElement(t.h4,{id:"1-error-message",style:{position:"relative"}},"1. Error message",r.createElement(t.a,{href:"#1-error-message","aria-label":"1 error message permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"Error message indicates that a required field is left empty or the inputted value is in wrong format. ",r.createElement(t.strong,null,"The error message must be displayed if the value did not pass validation"),". The error message is visible until the error is fixed."),"\n",r.createElement(t.p,null,"If the form control has an assistive text, it is displayed below the validation message. ",r.createElement(t.strong,null,"The assistive text should be never hidden when the error description is active.")," The user may need the information provided by the assistive text when correcting the error."),"\n",r.createElement(u.Z,{src:"/images/patterns/form/validation/form-states-error@2x.png",alt:"Form control error state",style:{maxWidth:376},viewable:!0}),"\n",r.createElement("div",{class:"guideline-do",style:{background:"var(--color-success-light)",padding:"var(--spacing-s)",marginBottom:"var(--spacing-layout-2-xs)",maxWidth:600}},r.createElement("div",{class:"guideline-do-label",style:{color:"var(--color-success)",marginBottom:"var(--spacing-s)"}},r.createElement(l.I,{style:{marginRight:"var(--spacing-3-xs)",verticalAlign:"middle"},size:"s"}),r.createElement("strong",null,"Do")),r.createElement("ul",{style:{marginBottom:0}},r.createElement("li",null,r.createElement("strong",null,"Keep it short"),r.createElement("ul",null,r.createElement("li",null,r.createElement(t.p,null,"Error text ",r.createElement("em",null,"should")," not run longer than the form control and more than two rows.")))),r.createElement("li",null,r.createElement("strong",null,"Be clear, specific and easy to understand"),r.createElement("ul",null,r.createElement("li",null,r.createElement("strong",null,"An error text must clearly state"),r.createElement("ul",null,r.createElement("li",null,"precise descriptions of exact problems"),r.createElement("li",null,"a specific solution or constructive advice on how to fix the problem."))),r.createElement("li",null,"For example “Please select a language” or “Email address needs to have an @ sign”"))),r.createElement("li",null,r.createElement("strong",null,"Be friendly"),r.createElement("ul",null,r.createElement("li",null,"Avoid negative expressions or blaming the user (for example “You did not enter your first name”)"),r.createElement("li",null,r.createElement(t.p,null,"Instead use positive words and a provide a correct solution (for example “Please enter your first name”)")))))),"\n",r.createElement("div",{class:"guideline-dont",style:{background:"var(--color-error-light)",padding:"var(--spacing-s)",marginBottom:"var(--spacing-layout-2-xs)",maxWidth:600}},r.createElement("div",{class:"guideline-dont-label",style:{color:"var(--color-error)",marginBottom:"var(--spacing-s)"}},r.createElement(s.I,{style:{marginRight:"var(--spacing-3-xs)",verticalAlign:"middle"},size:"s"}),r.createElement("strong",null,"Don't")),r.createElement("ul",{style:{marginBottom:0}},r.createElement("li",null,r.createElement(t.p,null,r.createElement("strong",null,"Use vague statements")," (for example “There has been an error”).")),r.createElement("li",null,r.createElement(t.p,null,r.createElement("strong",null,"Use technical terms or developer jargon")," (for example “Syntax error”). Use terms lay people can\nunderstand.")),r.createElement("li",null,r.createElement(t.p,null,r.createElement("strong",null,"Output raw system errors")," (for example “Error 123-xyz”).")))),"\n",r.createElement(t.h5,{id:"fixing-errors",style:{position:"relative"}},"Fixing errors",r.createElement(t.a,{href:"#fixing-errors","aria-label":"fixing errors permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"When the input is in the error state, the user will eventually try to correct the error. The way how the input reacts to this depends on the validation method in use."),"\n",r.createElement(t.p,null,r.createElement(t.strong,null,"In dynamic and hybrid validation"),", checking if the error has been fixed should be done after each character change. For example, if the user has forgotten to input @ sign for an email input, the error disappears immediately when the @ sign is added."),"\n",r.createElement(t.p,null,r.createElement(t.strong,null,"In static validation"),", checking if the error has been fixed dynamically is not possible. The only way to check if the errors have been fixed is to submit the form again."),"\n",r.createElement(t.h4,{id:"2-success-message",style:{position:"relative"}},"2. Success message",r.createElement(t.a,{href:"#2-success-message","aria-label":"2 success message permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"Success message indicates that an inputted value has passed form validation. Success messages are optional and ",r.createElement(t.strong,null,"they should only be used when the user must know if the input passed the validation"),". This is often the case for the following cases:"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"The input format is very complex such as requiring a specific amount of characters or certain special characters (e.g. a social security number)"),"\n",r.createElement(t.li,null,"When it is critical for the process that the user inputs the information correctly"),"\n",r.createElement(t.li,null,"When the user is not easily able to determine if the input is valid or not (e.g. new password inputs, inputs validated dynamically from the backend)"),"\n"),"\n",r.createElement(u.Z,{src:"/images/patterns/form/validation/form-validation-message-success@2x.png",alt:"Form control success state",style:{maxWidth:376},viewable:!0}),"\n",r.createElement(t.p,null,"It is better to avoid using success validation if there is not a clear need for it. Using redundant success messages creates unnecessary visual noise to the view."),"\n",r.createElement(t.h4,{id:"3-info-message",style:{position:"relative"}},"3. Info message",r.createElement(t.a,{href:"#3-info-message","aria-label":"3 info message permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"Info message can be used to convey information to the user which otherwise could be left unnoticed. The info message is optional and it should not be used to give instructions or display errors. It is meant to inform the user if something has caused changes to the input. Examples of situations requiring an info text could be:"),"\n",r.createElement(t.ul,null,"\n",r.createElement(t.li,null,"The value of the input has changed after the user edited it. For example, it was fixed automatically."),"\n",r.createElement(t.li,null,"Some other user or an official has made changes to the value."),"\n",r.createElement(t.li,null,"The value has been filled automatically for the user."),"\n",r.createElement(t.li,null,"The component status has changed. For example, a file was removed from the file input."),"\n"),"\n",r.createElement(u.Z,{src:"/images/patterns/form/validation/form-validation-message-info-1@2x.png",alt:"Info message example; the input value was edited",style:{maxWidth:376},viewable:!0}),"\n",r.createElement("br"),"\n",r.createElement(t.p,null,"In the above example, the info text is used to inform the user that the time input value has changed after the user\ninputted it."),"\n",r.createElement(u.Z,{src:"/images/patterns/form/validation/form-validation-message-info-2@2x.png",alt:"Info message example; the input was filled automatically",style:{maxWidth:376},viewable:!0}),"\n",r.createElement("br"),"\n",r.createElement(t.p,null,"In the above example, the info text is used to inform the user that the input was filled automatically. It is also\ndescribed to the user from where the information is coming from."),"\n",r.createElement(t.h3,{id:"validation-summary-pattern",style:{position:"relative"}},"Validation summary pattern",r.createElement(t.a,{href:"#validation-summary-pattern","aria-label":"validation summary pattern permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,r.createElement(t.strong,null,"When using static or hybrid validation methods, HDS recommends using a validation summary to clearly list errors found during the form submit"),". Validation summary pattern uses an error summary component which is provided by HDS. The error summary is notification-like element which lists all errors (and their descriptions) found in the form and provides anchor links to each erroneous input for easy access."),"\n",r.createElement(t.p,null,"You can learn more about the error summary component in ",r.createElement(a,{href:"/storybook/react/?path=/story/components-errorsummary--default",external:!0,openInNewTab:!0,openInNewTabAriaLabel:"Opens in new tab"},"HDS React Storybook."),"."),"\n",r.createElement(u.Z,{src:"/images/patterns/form/validation/error-summary@2x.png",alt:"Error summary component",style:{maxWidth:482},viewable:!0}),"\n",r.createElement(t.p,null,"The usage of the error summary component is triggered when the form is submitted:"),"\n",r.createElement(t.ol,null,"\n",r.createElement(t.li,null,"If errors are found in the form, the error summary component is created and placed at the beginning of the form, below the initial form heading."),"\n",r.createElement(t.li,null,"The focus is moved from the form submit button to the error summary heading."),"\n",r.createElement(t.li,null,"The error summary is populated with a list of errors found in the form. Errors are in the same order as they appear in the form. For each error, a running number and an error description are provided. The error description also acts as an anchor link."),"\n",r.createElement(t.li,null,"The user can use the error description anchor link to quickly jump and focus each of the erroneous inputs."),"\n",r.createElement(t.li,null,"The error validation check happens immediately after the input value changes."),"\n",r.createElement(t.li,null,"When the user submits the form again and errors are still found, the contents of the error summary are updated and the focus is moved back to the summary heading again."),"\n"),"\n",r.createElement(p,{scope:{Button:o.B,ErrorSummary:m.E,TextInput:c.T}},r.createElement(t.pre,null,r.createElement(t.code,{className:"language-jsx"},"import { Button, ErrorSummary, TextInput } from 'hds-react';\n\n() => {\n    const [formValues, setFormValues] = React.useState({});\n    const [formErrors, setFormErrors] = React.useState({});\n    const [isSubmitted, setIsSubmitted] = React.useState(false);\n    const errorList = Object.entries(formErrors);\n\n    const getFieldError = (fieldName, formData, errorData) => {\n      return errorData ? !formData[fieldName] && errorData[fieldName] : !formData[fieldName];\n    }\n\n    const validate = (values, currentErrors) => {\n      const hasFirstNameError = getFieldError('firstName', values, currentErrors);\n      const hasLastNameError = getFieldError('lastName', values, currentErrors);\n\n      const errors = {\n        ...(hasFirstNameError ? { firstName: 'Please enter your first name' } : {}),\n        ...(hasLastNameError ? { lastName: 'Please enter your last name' } : {}),\n      };\n      setFormErrors(errors);\n    }\n\n    const onSubmit = (e) => {\n      e.preventDefault();\n      validate(formValues);\n      setIsSubmitted(true);\n    };\n\n    React.useEffect(() => {\n      if (Object.keys(formErrors).length > 0) validate(formValues, true);\n    }, [formValues]);\n    \n    return (\n      <>\n        <h4>Live example</h4>\n        <p>Test how the hybrid validation works by pressing Submit which causes validation errors to show about missing inputs. The validation errors disappear immediately after input has changed.</p>\n        \n        <form onSubmit={onSubmit} style={{ maxWidth: '450px', margin: 'var(--spacing-xl) var(--spacing-m)' }}>\n          {isSubmitted && errorList.length > 0 && (\n            <ErrorSummary autofocus label=\"Form contains following errors\">\n              {errorList.map(([key, value], index) => (\n                <li key={key}>\n                  {`Error ${index + 1}: `}\n                  <a href={`#validationExample-${key}`}>{value}</a>\n                </li>\n              ))}\n            </ErrorSummary>\n          )}\n          <div style={{ display: 'flex', gap: 'var(--spacing-m)', marginTop: 'var(--spacing-m)' }}>\n            <TextInput\n              id=\"validationExample-firstName\"\n              name=\"firstName\"\n              label=\"First name\"\n              onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}\n              invalid={!!formErrors['firstName']}\n              errorText={formErrors['firstName']}\n              required\n            />\n            <TextInput\n              id=\"validationExample-lastName\"\n              name=\"lastName\"\n              label=\"Last name\"\n              onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}\n              invalid={!!formErrors['lastName']}\n              errorText={formErrors['lastName']}\n              required\n            />\n          </div>\n          <div style={{ marginTop: 'var(--spacing-m)' }}>\n            <Button onClick={onSubmit} type=\"button\">\n              Submit\n            </Button>\n          </div>\n        </form>\n      </>\n    );\n  }\n"))),"\n",r.createElement(t.p,null,"You can see the validation summary pattern in action in HDS Storybook ",r.createElement(a,{href:"/storybook/react/iframe.html?id=patterns-form-validation--static&viewMode=story",external:!0,openInNewTab:!0,openInNewTabAriaLabel:"Opens in new tab"},"static validation example")," and ",r.createElement(a,{href:"/storybook/react/iframe.html?id=patterns-form-validation--hybrid&viewMode=story",external:!0,openInNewTab:!0,openInNewTabAriaLabel:"Opens in new tab"},"hybrid validation example"),"."),"\n",r.createElement(t.h3,{id:"validation-of-multiple-input-fields",style:{position:"relative"}},"Validation of multiple input fields",r.createElement(t.a,{href:"#validation-of-multiple-input-fields","aria-label":"validation of multiple input fields permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"In some cases, multiple input fields can be related to each other in a way that a change in one of them may cause errors in the other inputs. In this situation, one specific error may relate to multiple inputs at the same time."),"\n",r.createElement(t.p,null,"An example of this could be having two date inputs for setting a start and an end time. If the end time is set to be earlier than the start time, both date inputs become erroneous. Since assistive technologies only see one input at a time, all related inputs should be set to an error state and given an appropriate error message. The error message can be the same for all inputs or more input specific if the situation allows so. All error messages are also added to the error summary list. This method has been illustrated in the image below."),"\n",r.createElement(p,{scope:{Button:o.B,ErrorSummary:m.E,DateInput:d.D}},r.createElement(t.pre,null,r.createElement(t.code,{className:"language-jsx"},"import { Button, ErrorSummary, DateInput } from 'hds-react';\n\n() => {\n  const [formValues, setFormValues] = React.useState({});\n  const [formErrors, setFormErrors] = React.useState({});\n  const [isSubmitted, setIsSubmitted] = React.useState(false);\n  const errorList = Object.entries(formErrors);\n\n  const isSameOrAfter = (dateA, dateB) => dateA && dateB && dateA >= dateB;\n\n  const validate = (values) => {\n    const startDate = values['startDate'];\n    const endDate = values['endDate'];\n    if (startDate == null & endDate == null) return null;\n\n    const errors = {\n      ...(!startDate || isSameOrAfter(startDate, endDate) ? { startDate: 'Start date must be before end date' } : {}),\n      ...(!endDate || isSameOrAfter(startDate, endDate) ? { endDate: 'End date must be after start date' } : {}),\n    };\n    setFormErrors(errors);\n  };\n\n  const onSubmit = (e) => {\n    e.preventDefault();\n    validate(formValues);\n    setIsSubmitted(true);\n  };\n\n  React.useEffect(() => {\n    if (Object.keys(formErrors).length > 0) validate(formValues);\n  }, [formValues]);\n\n  return ( \n    <>\n      <h4>Live example</h4>\n      <p>Check the how the validation behaves by selecting end date before the start date or vice versa.</p>   \n      <form onSubmit={onSubmit} style={{ maxWidth: '450px', margin: 'var(--spacing-xl) var(--spacing-m)' }}>\n        {isSubmitted && errorList.length > 0 && (\n          <ErrorSummary autofocus label=\"Form contains following errors\">\n            {errorList.map(([key, value], index) => (\n              <li key={key}>\n                {`Error ${index + 1}: `}\n                <a href={`#dateValidationExample-${key}`}>{value}</a>\n              </li>\n            ))}\n          </ErrorSummary>\n        )}\n        <div style={{ display: 'flex', gap: 'var(--spacing-m)', marginTop: 'var(--spacing-m)' }}>\n          <DateInput\n            id=\"dateValidationExample-startDate\"\n            name=\"startDate\"\n            label=\"Start date\"\n            onChange={(dateString, date) => setFormValues({ ...formValues, startDate: date })}\n            invalid={!!formErrors['startDate']}\n            errorText={formErrors['startDate']}\n            required\n            disableConfirmation\n          />\n          <DateInput\n            id=\"dateValidationExample-endDate\"\n            name=\"endDate\"\n            label=\"End date\"\n            onChange={(dateString, date) => setFormValues({ ...formValues, endDate: date })}\n            invalid={!!formErrors['endDate']}\n            errorText={formErrors['endDate']}\n            required\n            disableConfirmation\n          />\n        </div>\n        <div style={{ marginTop: 'var(--spacing-m)' }}>\n          <Button onClick={onSubmit} type=\"button\">\n            Submit\n          </Button>\n        </div>\n      </form>\n    </>\n  )\n}\n"))),"\n",r.createElement(t.p,null,"When there are multiple related fields, a later field in the form can make an earlier field erroneous. In this case, it is important to note that the state change of the earlier field can go unnoticed for assistive technologies. It is recommended to notify assistive technologies of other inputs' state change by using the ",r.createElement(v,{href:"/components/notification#invisible"},"HDS invisible notification.")),"\n",r.createElement(t.h3,{id:"validation-in-multi-page-forms",style:{position:"relative"}},"Validation in multi-page forms",r.createElement(t.a,{href:"#validation-in-multi-page-forms","aria-label":"validation in multi page forms permalink",className:"header-anchor after"},r.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>'}}))),"\n",r.createElement(t.p,null,"HDS Form pattern suggests dividing longer forms into separate steps. You can read more about this in the ",r.createElement(v,{href:"/patterns/forms/form-building#4-dividing-long-forms-into-separate-steps"},"HDS Form pattern documentation"),".\nSee guidelines for ",r.createElement(v,{href:"/patterns/forms/form-multi-page/"},"Multi-page forms"),"."),"\n",r.createElement(t.p,null,"To create multi-page forms, use ",r.createElement(v,{href:"h/components/stepper/"},"Stepper")," for navigating between the pages."),"\n",r.createElement(t.p,null,r.createElement(t.strong,null,"Validation is strongly recommended to be done separately for each page of the form.")," This means that the user should not be able to proceed to the next form step before all the input fields have been validated on the current step. If some selection can make a selection in a previous step invalid, this should be clearly indicated to the user."))}function f(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?r.createElement(t,e,r.createElement(p,e)):p(e)}},38753:function(e,t,a){var n=a(67294),r=a(14160);t.Z=e=>{let{src:t,alt:a="Image",style:i={},viewable:l,...s}=e;const o=n.createElement("img",Object.assign({className:"image-container-image",alt:a,src:(0,r.withPrefix)(t),style:i},s));return n.createElement("div",{className:"image-container"},l?n.createElement("a",{className:"image-container-link",href:(0,r.withPrefix)(t),title:a,style:i},o):o)}},89482:function(e,t,a){var n=a(67294);t.Z=e=>{let{color:t="var(--color-black-90)",size:a="var(--fontsize-body-xl)",style:r={},children:i}=e;return n.createElement("p",{style:{fontSize:a,color:t,maxWidth:600,...r}},i)}}}]);