import React, { useState } from 'react';

import { Header, LanguageOption } from '../header';
import { Logo, logoFi } from '../logo';
import { Tabs } from '../tabs/Tabs';
import { Button } from '../button';
import { CookieConsentContextProvider, useCookieConsents } from './contexts/CookieConsentContext';
import { CookieConsentReactProps } from './hooks/useCookieConsent';
import { StoryComponent } from './components/StoryComponent';
import { CookieBanner } from './components/CookieBanner';
import { CookieSettingsPage } from './components/CookieSettingsPage';
// importing the json because load won't work in e2e
import siteSettings from '../cookieConsentCore/example/helfi_sitesettings.json';

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
      <ul data-testid="consents-list">
        {consents.map((obj) => {
          return (
            <li data-consent-group={obj.group} data-consent-group-value={obj.consented}>
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
      <div style={{ display: 'flex', gap: 'var(--spacing-s)' }}>
        <Button data-testid="add-chat-group-button" onClick={addChatCookie}>
          Add chat group
        </Button>
        <Button data-testid="add-unallowed-group-button" onClick={addUnallowedCookie}>
          Add unallowed group
        </Button>
        <Button data-testid="remove-cookie-button" onClick={removeConsentCookie}>
          Remove consent cookie
        </Button>
        <Button data-testid="open-banner-button" onClick={openBanner}>
          Open banner
        </Button>
      </div>
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
    // eslint-disable-next-line no-console
    console.log('consent event', event);
  };

  return (
    <CookieConsentContextProvider
      onChange={onChange}
      options={{ language }}
      siteSettings={{ ...siteSettings, remove: false, monitorInterval: 0 }}
    >
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
          <Tabs.Tab>
            <div data-testid="page-tab-button">Page</div>
          </Tabs.Tab>
          <Tabs.Tab>
            <div data-testid="banner-tab-button">Banner</div>
          </Tabs.Tab>
          <Tabs.Tab>
            <div data-testid="consents-tab-button">Consent list</div>
          </Tabs.Tab>
          <Tabs.Tab>
            <div data-testid="actions-tab-button">Actions</div>
          </Tabs.Tab>
        </Tabs.TabList>
        <Tabs.TabPanel>
          <h1>Page ( {language} )</h1>
          <p>Only the settings are shown below on this tab. Banner is kept open if shown previously.</p>
          <CookieSettingsPage />
          <span data-testid="page-tab" />
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <h1>Banner ( {language} )</h1>
          <p>Banner is shown if required consents are not consented.</p>
          <CookieBanner />
          <span data-testid="banner-tab" />
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <h1>Consents ( {language} )</h1>
          <p>Banner is also shown here when needed.</p>
          <ConsentOutput />
          <CookieBanner />
          <span data-testid="consents-tab" />
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <h1>Actions ( {language} )</h1>
          <p>Banner is not shown here</p>
          <Actions />
          <span data-testid="actions-tab" />
        </Tabs.TabPanel>
      </Tabs>
      <span data-testid="current-language" lang={language} />
    </CookieConsentContextProvider>
  );
};
