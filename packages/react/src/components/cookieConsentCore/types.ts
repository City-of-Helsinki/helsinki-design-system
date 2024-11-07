import { CookieConsentCore } from './cookieConsentCore';

export type CookieCore = CookieConsentCore;
export type CreateParams = Parameters<typeof CookieConsentCore.create>;
export type CreateProps = {
  siteSettings: CreateParams[0];
  options?: Options;
};

export type Options = {
  language?: string | undefined;
  theme?: string | undefined;
  targetSelector?: string | undefined;
  spacerParentSelector?: string | undefined;
  pageContentSelector?: string | undefined;
  submitEvent?: string | undefined;
  settingsPageSelector?: string | undefined;
  disableAutoRender?: boolean | undefined;
};

declare global {
  interface Window {
    hds: {
      cookieConsent: CookieCore;
    };
  }
}
