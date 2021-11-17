export type CookieConsentAction = 'showDetails' | 'approveAll' | 'approveRequired' | 'changeConsent' | 'hideDetails';
export type CookieConsentActionListener = (
  action: CookieConsentAction,
  consent?: { key: string; value: boolean },
) => void;
export type ViewProps = {
  onClick: CookieConsentActionListener;
};
