export type CookieConsentAction =
  | 'approveAll'
  | 'approveRequired'
  | 'changeCookieGroupConsents'
  | 'approveOptional'
  | 'unapproveOptional'
  | 'approveSelectedAndRequired';
export type CookieConsentActionListener = (action: CookieConsentAction, consents?: string[], value?: boolean) => void;
