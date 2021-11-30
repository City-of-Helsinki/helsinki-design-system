import React, { createContext, useMemo, useState } from 'react';

import create, { ConsentController, ConsentList, ConsentObject } from './cookieConsentController';

export type CookieConsentContextType = {
  getRequired: () => ConsentObject;
  getOptional: () => ConsentObject;
  update: ConsentController['update'];
  approveRequired: ConsentController['approveRequired'];
  approveAll: ConsentController['approveAll'];
  save: ConsentController['save'];
  willRenderCookieConsentDialog: boolean;
  hasUserHandledAllConsents: () => boolean;
};

type CookieConsentContextProps = {
  optionalConsents?: ConsentList;
  requiredConsents?: ConsentList;
  cookieDomain?: string;
  children: React.ReactNode | React.ReactNode[] | null;
  onAllConsentsGiven?: (consents: ConsentObject) => void;
  onConsentsParsed?: (consents: ConsentObject, hasUserHandledAllConsents: boolean) => void;
};

export const CookieConsentContext = createContext<CookieConsentContextType>({
  getRequired: () => ({}),
  getOptional: () => ({}),
  update: () => undefined,
  approveRequired: () => undefined,
  approveAll: () => undefined,
  save: () => ({}),
  hasUserHandledAllConsents: () => false,
  willRenderCookieConsentDialog: false,
});

export const Provider = ({
  optionalConsents,
  requiredConsents,
  cookieDomain,
  onAllConsentsGiven = () => undefined,
  onConsentsParsed = () => undefined,
  children,
}: CookieConsentContextProps): React.ReactElement => {
  const consentController = useMemo(() => create({ requiredConsents, optionalConsents, cookieDomain }), [
    requiredConsents,
    optionalConsents,
    cookieDomain,
  ]);

  const hasUserHandledAllConsents = () =>
    consentController.getRequiredWithoutConsent().length === 0 && consentController.getUnhandledConsents().length === 0;

  const [willRenderCookieConsentDialog, setWillRenderCookieConsentDialog] = useState<boolean>(
    !hasUserHandledAllConsents(),
  );

  const mergeConsents = () => ({
    ...consentController.getRequired(),
    ...consentController.getOptional(),
  });

  const contextData: CookieConsentContextType = {
    getRequired: () => consentController.getRequired(),
    getOptional: () => consentController.getOptional(),
    update: (key, value) => consentController.update(key, value),
    approveRequired: () => consentController.approveRequired(),
    approveAll: () => consentController.approveAll(),
    save: () => {
      const savedData = consentController.save();
      if (hasUserHandledAllConsents()) {
        setWillRenderCookieConsentDialog(false);
        onAllConsentsGiven(mergeConsents());
      }
      return savedData;
    },
    willRenderCookieConsentDialog,
    hasUserHandledAllConsents,
  };
  onConsentsParsed(mergeConsents(), hasUserHandledAllConsents());
  return <CookieConsentContext.Provider value={contextData}>{children}</CookieConsentContext.Provider>;
};
