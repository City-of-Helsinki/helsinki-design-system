import React, { useState } from 'react';

import { Header, LanguageOption } from '../header';
import { Logo, logoFi } from '../logo';
import { Tabs } from '../tabs/Tabs';
import { Button } from '../button';
import {
  CookieConsentContextProvider,
  useCookieConsents,
  CookieConsentReactProps,
  CookieBanner,
  CookieSettingsPage,
} from './index';
import { StoryComponent } from './components/StoryComponent';
// importing the json because load won't work in e2e
import siteSettings from '../cookieConsentCore/example/helfi_sitesettings.json';
import { ToggleButton } from '../toggleButton/ToggleButton';
import { cookieEventType } from '../cookieConsentCore/cookieConsentCore';

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
    <div>
      Current consents:{' '}
      <ul data-testid="consents-list">
        {consents.map((obj) => {
          return (
            <li data-consent-group={obj.group} data-consent-group-value={obj.consented} key={obj.group}>
              {obj.group}:{String(obj.consented)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Actions = () => {
  const addChatCookie = async () => {
    // eslint-disable-next-line no-console
    console.log('Adding chat cookie:', await window.hds.cookieConsent.setGroupsStatusToAccepted(['chat']));
  };
  const removeConsentCookie = async () => {
    const cookieName = `helfi-cookie-consents`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    // eslint-disable-next-line no-console
    console.log('Cookie removed:', cookieName);
    window.dispatchEvent(new CustomEvent(cookieEventType.CHANGE, { detail: { acceptedGroups: [] } }));
  };
  const openBanner = async () => {
    // eslint-disable-next-line no-console
    console.log('Spawning banner', await window.hds.cookieConsent.openBanner(['statistics', 'chat'], '#banner-opener'));
  };
  return (
    <div>
      <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
        <Button data-testid="add-chat-group-button" onClick={addChatCookie}>
          Set &quot;chat&quot; consent group as accepted
        </Button>
        <Button data-testid="remove-cookie-button" onClick={removeConsentCookie}>
          Remove all consents
        </Button>
        <Button id="banner-opener" data-testid="open-banner-button" onClick={openBanner}>
          Open banner with highlighted groups &quot;chat&quot; and &quot;statistics&quot;
        </Button>
      </div>
    </div>
  );
};

const ThemeButton = (props: { current: 'bus' | 'black'; onChange: (selected: 'bus' | 'black') => void }) => {
  const { current, onChange } = props;
  const changedTheme = current === 'bus' ? 'black' : 'bus';
  return (
    <div>
      <div>Current theme</div>
      <div style={{ display: 'flex', gap: 'var(--spacing-s)', alignItems: 'center' }}>
        <span>Black</span>
        <ToggleButton
          id="bus-theme"
          aria-label={`change cookie consent label to ${changedTheme}`}
          label=""
          checked={current === 'bus'}
          onChange={() => onChange(changedTheme)}
        />
        <span>Bus</span>
      </div>
      <div>Theme is only applied to the cookie consent banner and page</div>
    </div>
  );
};

export const Example = ({ currentTabIndex }: { currentTabIndex?: number } = {}) => {
  const languages: LanguageOption[] = [
    { label: 'Suomi', value: 'fi', isPrimary: true },
    { label: 'Svenska', value: 'sv', isPrimary: true },
    { label: 'English', value: 'en', isPrimary: true },
  ];
  const [language, updateLang] = useState<string>(languages[0].value);
  const [theme, updateTheme] = useState<'bus' | 'black'>('bus');
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
      // focusing the logo link, because the tab component loses focus on re-render.
      options={{ language, focusTargetSelector: '#actionbar > a', theme }}
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
          id="actionbar"
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
          <h1 tabIndex={-1}>Banner ( {language} )</h1>
          <p>Banner is shown if required consents are not consented.</p>
          <CookieBanner />
          <span data-testid="banner-tab" />
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <h1 tabIndex={-1}>Consents ( {language} )</h1>
          <p>Banner is also shown here when needed.</p>
          <ConsentOutput />
          <CookieBanner />
          <span data-testid="consents-tab" />
        </Tabs.TabPanel>
        <Tabs.TabPanel>
          <h1>Actions ( {language} )</h1>
          <p>Banner is never shown on this page unless shown previously.</p>
          <p>Current consents can also be changed my calling the window.hds.cookieConsent instance.</p>
          <Actions />
          <p>Theme can also be changed like language.</p>
          <ThemeButton current={theme} onChange={updateTheme} />
          <span data-testid="actions-tab" />
        </Tabs.TabPanel>
      </Tabs>
      <span data-testid="current-language" lang={language} />
    </CookieConsentContextProvider>
  );
};

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

export const Banner = () => {
  const onChange: CookieConsentReactProps['onChange'] = (event) => {
    // eslint-disable-next-line no-console
    console.log('consent event', event);
  };
  return (
    <CookieConsentContextProvider
      onChange={onChange}
      siteSettings={{ ...siteSettings, remove: false, monitorInterval: 0 }}
      options={{ focusTargetSelector: 'main h1' }}
    >
      <main>
        <h1 tabIndex={-1}>Cookie consent banner</h1>
        <p>The banner is shown only if necessary.</p>
        <CookieBanner />
      </main>
    </CookieConsentContextProvider>
  );
};

export const SettingsPage = () => {
  const onChange: CookieConsentReactProps['onChange'] = (event) => {
    // eslint-disable-next-line no-console
    console.log('consent event', event);
  };
  const siteSettingsPageId = 'custom-id';
  return (
    <CookieConsentContextProvider
      onChange={onChange}
      siteSettings={{ ...siteSettings, remove: false, monitorInterval: 0 }}
      settingsPageId={siteSettingsPageId}
    >
      <main>
        <h1>Cookie consent page</h1>
        <p>The banner is not shown here.</p>
        <p>The settings content is rendered to an element with given id.</p>
        <CookieSettingsPage />
        <DummyContent />
      </main>
    </CookieConsentContextProvider>
  );
};
