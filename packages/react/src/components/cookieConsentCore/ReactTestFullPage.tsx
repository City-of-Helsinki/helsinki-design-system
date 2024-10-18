import React, { useEffect } from 'react';

import { CookieConsentCore } from './cookieConsentCore';

declare global {
  interface Window {
    hds: {
      cookieConsent: {
        setGroupsStatusToAccepted: (groups: string[]) => Promise<boolean>;
        openBanner: (highlightedGroups?: string[]) => Promise<void>;
      };
    };
  }
}

// This is used to test "/classes" in React and Storybook
// See also https://github.com/Wildhoney/ReactShadow
export const ReactTestFullPage = () => {
  const siteSettingsJsonUrl = './static-cookie-consent/helfi_sitesettings.json';
  const options = {
    language: 'fi', // Lang code defaults to 'en'
    theme: 'coat', // Defaults to 'bus'
    // targetSelector: 'body', // Defaults to 'body'
    // spacerParentSelector: 'body', // Defaults to 'body'
    // pageContentSelector: 'body', // Defaults to 'body'
    submitEvent: 'cookie-consent-changed', // If this string is set, triggers a window level event with that string and detail.acceptedGroups before closing banner. If not set, reloads page instead
    settingsPageSelector: '#hds-cookie-consent-full-page', // If this string is set and matching element is found on page, instead of banner, show a full page cookie settings replacing the matched element.
  };
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const instanceRef = useEffect(() => {
  //   // eslint-disable-next-line no-new, @typescript-eslint/no-unused-vars
  //   const instance = new CookieConsentCore(siteSettingsObj, options);
  // }, []);

  useEffect(() => {
    // @ts-ignore
    CookieConsentCore.create(siteSettingsJsonUrl, options);
    // CookieConsentCore.create(siteSettingsObj, options);
  }, []);

  const addChatCookie = async () => {
    // eslint-disable-next-line no-console
    console.log('Adding chat cookie:', await window.hds.cookieConsent.setGroupsStatusToAccepted(['chat']));
  };
  const addUnallowedCookie = async () => {
    // eslint-disable-next-line no-console
    console.log('Adding chat cookie:', await window.hds.cookieConsent.setGroupsStatusToAccepted(['unallowed']));
  };
  const removeConsentCookie = async () => {
    const cookieName = `helfi-cookie-consents`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    // eslint-disable-next-line no-console
    console.log('Cookie removed:', cookieName);
  };
  const setIcareusDevice = async () => {
    const cookieName = `icareus-device`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 2970 00:00:01 GMT;`;
    // eslint-disable-next-line no-console
    console.log('Cookie added:', cookieName);
  };
  const openBanner = async () => {
    // eslint-disable-next-line no-console
    console.log('Spawning banner', await window.hds.cookieConsent.openBanner());
  };
  return (
    <main>
      <button type="button" onClick={addChatCookie}>
        Add chat group
      </button>
      <button type="button" onClick={addUnallowedCookie}>
        Add unallowed group
      </button>
      <button type="button" onClick={removeConsentCookie}>
        Remove consent cookie
      </button>
      <button type="button" onClick={setIcareusDevice}>
        Set icareus-device
      </button>
      <button type="button" onClick={openBanner}>
        Open banner
      </button>

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus numquam, iste aspernatur excepturi quaerat a
        a ab explicabo aliquam totam, fuga reiciendis aliquid id nulla dicta soluta ullam voluptate! Dignissimos
        reiciendis deserunt voluptatibus cum aliquid magnam? Eum atque ducimus alias molestias, magni aspernatur numquam
        doloremque quis nihil aperiam ullam asperiores harum saepe similique ipsum earum neque quisquam! Neque
        doloribus, mollitia, ut at corporis quo iste deleniti molestias quisquam explicabo fuga amet exercitationem
        nulla. Deleniti est maiores explicabo minus? Odio amet id perferendis nulla alias vitae, voluptate dignissimos
        deleniti voluptas officia nam facere iste, maiores porro rem dolorem modi molestiae provident illo.
      </p>
      <div id="hds-cookie-consent-full-page" />
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
