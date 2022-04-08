export type CookieConsentAction =
  | 'approveAll'
  | 'approveRequired'
  | 'changeConsentGroup'
  | 'approveOptional'
  | 'unapproveOptional'
  | 'approveSelectedAndRequired';
export type CookieConsentActionListener = (action: CookieConsentAction, consents?: string[], value?: boolean) => void;
