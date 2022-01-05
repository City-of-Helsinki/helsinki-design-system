export type CookieConsentAction = 'approveAll' | 'approveRequired' | 'changeConsent' | 'approveSelectedAndRequired';
export type CookieConsentActionListener = (
  action: CookieConsentAction,
  consent?: { key: string; value: boolean },
) => void;
export type ViewProps = {
  onClick: CookieConsentActionListener;
};
