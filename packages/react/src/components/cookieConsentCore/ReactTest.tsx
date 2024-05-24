import React, { useEffect } from 'react';

import { CookieConsentCore } from './cookieConsentCore';

// This is used to test "/classes" in React and Storybook
// See also https://github.com/Wildhoney/ReactShadow
export const ReactTest = () => {
  const options = {
    siteSettingsJsonUrl: 'http://localhost:6006/static-cookie-consent/helfi_sitesettings.json',
    // siteSettingsObj,
    language: 'fi', // Lang code defaults to 'en'
    // targetSelector: 'body', // Defaults to 'body'
    // spacerParentSelector: 'body', // Defaults to 'body'
    // pageContentSelector: 'body', // Defaults to 'body'
    submitEvent: 'cookie-consent-changed', // If this string is set, triggers a window level event with that string and detail.acceptedGroups before closing banner. If not set, reloads page instead
    settingsPageSelector: '#hds-cookie-consent-full-page', // If this string is set and matching element is found on page, instead of banner, show a full page cookie settings replacing the matched element.
    tempCssPath: 'http://localhost:6006/static-cookie-consent/cookieConsent.css', // TODO: Remove this when the real build process can include css files
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const instanceRef = useEffect(() => {
    // eslint-disable-next-line no-new, @typescript-eslint/no-unused-vars
    const instance = new CookieConsentCore(options);
  }, []);
  return (
    <main>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus numquam, iste aspernatur excepturi quaerat a
        a ab explicabo aliquam totam, fuga reiciendis aliquid id nulla dicta soluta ullam voluptate! Dignissimos
        reiciendis deserunt voluptatibus cum aliquid magnam? Eum atque ducimus alias molestias, magni aspernatur numquam
        doloremque quis nihil aperiam ullam asperiores harum saepe similique ipsum earum neque quisquam! Neque
        doloribus, mollitia, ut at corporis quo iste deleniti molestias quisquam explicabo fuga amet exercitationem
        nulla. Deleniti est maiores explicabo minus? Odio amet id perferendis nulla alias vitae, voluptate dignissimos
        deleniti voluptas officia nam facere iste, maiores porro rem dolorem modi molestiae provident illo.
      </p>
      <p>
        Ex consequatur perspiciatis pariatur, suscipit maiores officia vitae assumenda incidunt rem in, distinctio iure
        eos eius veniam temporibus expedita? Exercitationem qui animi sint adipisci voluptas autem facere similique
        dolore quisquam dolores blanditiis amet laboriosam incidunt, ducimus alias non. Laudantium blanditiis expedita
        quia eius autem eos quidem, odit, aliquid pariatur nostrum esse repudiandae dolor officia? Possimus sit odit
        molestias non sapiente ratione magnam obcaecati! A provident placeat vitae veritatis voluptatum modi suscipit
        vero at iusto natus ducimus, accusamus amet cum doloribus aperiam ipsum laudantium? Dolore quaerat qui l
        aboriosam aut vitae a quia ratione dolor fuga et sapiente reprehenderit, necessitatibus eum blanditiis!
      </p>
    </main>
  );
};
