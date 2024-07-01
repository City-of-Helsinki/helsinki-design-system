import React from 'react';


import Seo from '../../../components/Seo';

const DemoPage = () => {
  return (
    <>
      <Seo
        title="Helsinki Design System (HDS) cookie banner demo"
        pageTitle="Stand-alone cookie banner demo"
        description="Stand-alone cookie banner is created as vanilla js file and it is possible to include it on any html page. This demo page shows how it works."
      ></Seo>
      
     
   <div id="cookie-demo">
     <h1>Stand-alone cookie demo page</h1>
     <p>This page aims to demonstrate how CookieConsent stand-alone version works and how it should be included in the page. Cookie settings can be set up per site.</p>
     <ul>
       <li>To see the description of the component visit <a href"https://hds.hel.fi/components/cookie-consent/">cookie consent component documentation</a></li>
       <li>To know more how to categorize cookies, what are commonly known cookies in City of Helsinki visit <a href="https://hds.hel.fi/patterns/cookies/basics/">cookie consent pattern documentation</a></li>
       
     </ul>
     
   </div>
    </>
  );
};

export default DemoPage;
