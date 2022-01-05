export type CookieConsentAction = 'approveAll' | 'approveRequired' | 'changeConsent';
export type CookieConsentActionListener = (
  action: CookieConsentAction,
  consent?: { key: string; value: boolean },
) => void;
export type ViewProps = {
  onClick: CookieConsentActionListener;
};
