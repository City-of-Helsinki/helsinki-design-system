import React, { useState } from 'react';

import { Header, LanguageOption } from '../header';
import { Logo, logoFi } from '../logo';
import { Tabs } from '../tabs/Tabs';
import { Provider, useCookieConsents } from './contexts/CookieConsentContext';
import { CookieBanner } from './components/CookieBanner';
import { CookieSettingsPage } from './components/CookieSettingsPage';
import { CookieConsentReactProps } from './hooks/useCookieConsent';
import { StoryComponent } from './components/StoryComponent';

export default {
  component: StoryComponent,
  title: 'Components/CookieConsent',
  parameters: {
    controls: { expanded: true },
    docs: { disable: true },
  },
  args: {},
};

const ConsentOutput = () => {
  const consents = useCookieConsents();
  if (!consents.length) {
    return <p>No consents</p>;
  }
  return (
    <p>
      Current consents:{' '}
      <ul>
        {consents.map((obj) => {
          return (
            <li>
              {obj.group}:{String(obj.consented)}
            </li>
          );
        })}
      </ul>
    </p>
  );
};

const Actions = () => {
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
  const openBanner = async () => {
    // eslint-disable-next-line no-console
    console.log('Spawning banner', await window.hds.cookieConsent.openBanner(['statistics', 'chat']));
  };
  return (
    <p>
      <button type="button" onClick={addChatCookie}>
        Add chat group
      </button>
      <button type="button" onClick={addUnallowedCookie}>
        Add unallowed group
      </button>
      <button type="button" onClick={removeConsentCookie}>
        Remove consent cookie
      </button>
      <button type="button" onClick={openBanner}>
        Open banner
      </button>
    </p>
  );
};

export const Example = ({ currentTabIndex }: { currentTabIndex?: number } = {}) => {
  const languages: LanguageOption[] = [
    { label: 'Suomi', value: 'fi', isPrimary: true },
    { label: 'Svenska', value: 'sv', isPrimary: true },
    { label: 'English', value: 'en', isPrimary: true },
  ];
  const [language, updateLang] = useState<string>(languages[0].value);
  const onLangChange = (newLanguage: string) => {
    updateLang(newLanguage);
  };
  const onChange: CookieConsentReactProps['onChange'] = (event) => {
    console.log('consent event', event);
  };
  const siteSettingsJsonUrl = '../static-cookie-consent/helfi_sitesettings.json';

  return (
    <Provider onChange={onChange} options={{ language }} siteSettings={siteSettingsJsonUrl}>
      <Header languages={languages} onDidChangeLanguage={onLangChange} defaultLanguage={language}>
        <Header.ActionBar
          frontPageLabel="Frontpage"
          title="City of Helsinki"
          titleAriaLabel="City of Helsinki"
          titleHref="https://hel.fi"
          logo={<Logo src={logoFi} alt="City of Helsinki" />}
          logoAriaLabel="Service logo"
        >
          <Header.LanguageSelector aria-label="aria" languageHeading="other" />
        </Header.ActionBar>
      </Header>

      <Tabs initiallyActiveTab={currentTabIndex || 0}>
        <Tabs.TabList className="example-tablist">
          <Tabs.Tab>Page</Tabs.Tab>
          <Tabs.Tab>Modal</Tabs.Tab>
          <Tabs.Tab>Consent list</Tabs.Tab>
          <Tabs.Tab>Actions</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanel>
          <h1>Page ( {language} )</h1>
          <p>Only the settings are shown below on this tab. Modal is kept open if shown previously.</p>
          <CookieSettingsPage />
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <h1>Modal ( {language} )</h1>
          <p>Modal is shown if required consents are not consented.</p>
          <CookieBanner />
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <h1>Consents ( {language} )</h1>
          <p>Modal is also shown here when needed.</p>
          <ConsentOutput />
          <CookieBanner />
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <h1>Actions ( {language} )</h1>
          <p>Modal is not shown here</p>
          <Actions />
        </Tabs.TabPanel>
      </Tabs>
    </Provider>
  );
};
