import React from 'react';

import { Banner as ReactBanner } from './Banner';
import { Notification } from '../notification/Notification';
import { Button } from '../button/Button';
import { SettingsPage as ReactSettingsPage } from './SettingsPage';
import { Options } from './types';
import { Link } from '../link';

export default {
  component: ReactSettingsPage,
  title: 'Components/CookieConsentCore',
  parameters: {
    controls: { expanded: true },
    docs: { disable: true },
  },
  args: {},
};

const siteSettingsJsonUrl = './static-cookie-consent/helfi_sitesettings.json';

const Actions = () => {
  const addChatCookie = async () => {
    // eslint-disable-next-line no-console,
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
  const openBanner = async () => {
    // eslint-disable-next-line no-console
    console.log('Spawning banner', await window.hds.cookieConsent.openBanner(['statistics', 'chat']));
  };
  return (
    <>
      <h2>Controls</h2>
      <div style={{ display: 'flex', gap: 'var(--spacing-s)' }}>
        <Button onClick={addChatCookie}>Add chat group</Button>
        <Button onClick={addUnallowedCookie}>Add unallowed group</Button>
        <Button onClick={removeConsentCookie}>Remove consent cookie</Button>
        <Button onClick={openBanner}>Open banner</Button>
      </div>
    </>
  );
};

const Info = () => (
  <Notification type="info">
    <p>These examples are for testing hds-js version of the cookie consents.</p>
    <Link href="/?path=/story/components-cookieconsent--example">See React examples</Link>
  </Notification>
);

const DummyContent = () => (
  <p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus numquam, iste aspernatur excepturi quaerat a a
    ab explicabo aliquam totam, fuga reiciendis aliquid id nulla dicta soluta ullam voluptate! Dignissimos reiciendis
    deserunt voluptatibus cum aliquid magnam? Eum atque ducimus alias molestias, magni aspernatur numquam doloremque
    quis nihil aperiam ullam asperiores harum saepe similique ipsum earum neque quisquam! Neque doloribus, mollitia, ut
    at corporis quo iste deleniti molestias quisquam explicabo fuga amet exercitationem nulla. Deleniti est maiores
    explicabo minus? Odio amet id perferendis nulla alias vitae, voluptate dignissimos deleniti voluptas officia nam
    facere iste, maiores porro rem dolorem modi molestiae provident illo.
  </p>
);

export const Banner = (options: Options = {}) => {
  return (
    <main>
      <Info />
      <h1>Cookie consent banner</h1>
      <p>The banner is shown only if necessary.</p>
      <Actions />
      <DummyContent />
      <ReactBanner siteSettings={siteSettingsJsonUrl} options={options} />
    </main>
  );
};

export const SettingsPage = (options: Options = {}) => {
  return (
    <main>
      <Info />
      <h1>Cookie consent page</h1>
      <Actions />
      <DummyContent />
      <ReactSettingsPage siteSettings={siteSettingsJsonUrl} options={options} />
      <DummyContent />
    </main>
  );
};
