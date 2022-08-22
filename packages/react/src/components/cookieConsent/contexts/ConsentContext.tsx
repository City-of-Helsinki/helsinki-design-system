import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import createConsentController, { ConsentController, ConsentList } from '../cookieConsentController';
import { CookieData, CookieGroup, useContentContext } from './ContentContext';

export type Consents = {
  requiredCookies?: string[];
  optionalCookies?: string[];
};

export type ConsentContextType = {
  hasUserHandledAllConsents: () => boolean;
  onAction: CookieConsentActionListener;
  getApprovalPercentageForOptional: () => number;
  areGroupConsentsApproved: (consents: CookieData[]) => boolean;
};

type ConsentContextProps = {
  cookieDomain?: string;
  children: React.ReactNode | React.ReactNode[] | null;
};

type CookieConsentAction =
  | 'approveAll'
  | 'approveRequired'
  | 'changeCookieGroupConsents'
  | 'approveOptional'
  | 'unapproveOptional'
  | 'approveSelectedAndRequired';

type CookieConsentActionListener = (action: CookieConsentAction, consents?: string[], value?: boolean) => void;

export const ConsentContext = createContext<ConsentContextType>({
  hasUserHandledAllConsents: () => false,
  onAction: () => undefined,
  getApprovalPercentageForOptional: () => 0,
  areGroupConsentsApproved: () => false,
});

export const getConsentsFromCookieGroup = (groups: CookieGroup[]): ConsentList => {
  return groups.reduce((ids, currentGroup) => {
    currentGroup.cookies.forEach((consentData) => {
      ids.push(consentData.id);
    });
    return ids;
  }, [] as string[]);
};

export const forceFocusToElement = (elementSelector: string): void => {
  const focusTarget = document.querySelector(elementSelector) as HTMLElement;
  if (focusTarget && focusTarget.focus) {
    focusTarget.focus();
    if (document.activeElement !== focusTarget) {
      focusTarget.setAttribute('tabindex', '-1');
      focusTarget.focus();
    }
  }
};

export const Provider = ({ cookieDomain, children }: ConsentContextProps): React.ReactElement => {
  const content = useContentContext();
  const cookies = useMemo(() => {
    return {
      requiredCookies: content.requiredCookies,
      optionalCookies: content.optionalCookies,
    };
  }, []);
  const requiredConsents = cookies.requiredCookies
    ? getConsentsFromCookieGroup(cookies.requiredCookies.groups)
    : undefined;
  const optionalConsents = cookies.optionalCookies
    ? getConsentsFromCookieGroup(cookies.optionalCookies.groups)
    : undefined;
  const consentController = useMemo(
    () => createConsentController({ requiredConsents, optionalConsents, cookieDomain }),
    [],
  );
  const [, forceUpdate] = useState<number>(0);
  const reRender = useCallback(() => {
    forceUpdate((p) => p + 1);
  }, [forceUpdate]);

  const consentControllerFunctions = useMemo(() => {
    const hasUserHandledAllConsents = () =>
      consentController.getRequiredWithoutConsent().length === 0 &&
      consentController.getUnhandledConsents().length === 0;

    const mergeConsents = () => ({
      ...consentController.getRequired(),
      ...consentController.getOptional(),
    });

    const notifyOnAllConsentsGiven = () => {
      if (content.callbacks.onAllConsentsGiven && hasUserHandledAllConsents()) {
        content.callbacks.onAllConsentsGiven(mergeConsents());
      }
      if (content.focusTargetSelector) {
        forceFocusToElement(content.focusTargetSelector);
      }
    };

    const setOptional = (approved: boolean) => {
      Object.keys(consentController.getOptional()).forEach((optionalConsent) => {
        consentController.update(optionalConsent, approved);
      });
    };
    const deselectOptional = () => {
      setOptional(false);
    };
    const selectOptional = () => {
      setOptional(true);
    };
    const approveRequiredAndSaveAllGivenConsents = () => {
      consentController.approveRequired();
      consentController.save();
      notifyOnAllConsentsGiven();
    };
    const approveAllAndSave: ConsentController['approveAll'] = () => {
      consentController.approveAll();
      consentController.save();
      notifyOnAllConsentsGiven();
    };
    const approveOnlyRequiredAndSave: ConsentController['approveRequired'] = () => {
      deselectOptional();
      consentController.approveRequired();
      consentController.save();
      notifyOnAllConsentsGiven();
    };

    const onAction: ConsentContextType['onAction'] = (action, consents, value) => {
      if (action === 'approveAll') {
        approveAllAndSave();
      } else if (action === 'approveRequired') {
        approveOnlyRequiredAndSave();
      } else if (action === 'approveSelectedAndRequired') {
        approveRequiredAndSaveAllGivenConsents();
      } else if (action === 'changeCookieGroupConsents' && consents) {
        consents.forEach((consent) => {
          consentController.update(consent, !!value);
        });
      } else if (action === 'approveOptional') {
        selectOptional();
      } else if (action === 'unapproveOptional') {
        deselectOptional();
      }
      reRender();
    };

    const getApprovalPercentageForOptional: ConsentContextType['getApprovalPercentageForOptional'] = () => {
      let counter = 0;
      let approved = 0;
      Object.values(consentController.getOptional()).forEach((isApproved) => {
        counter += 1;
        if (isApproved) {
          approved += 1;
        }
      });
      return approved / counter;
    };

    const areGroupConsentsApproved: ConsentContextType['areGroupConsentsApproved'] = (consentData) => {
      const optionalConsentList = consentController.getOptional();
      return !consentData.reduce((hasUnApprovedConsent, consent) => {
        return hasUnApprovedConsent || optionalConsentList[consent.id] !== true;
      }, false);
    };

    return {
      setOptional,
      areGroupConsentsApproved,
      getApprovalPercentageForOptional,
      onAction,
      hasUserHandledAllConsents,
      mergeConsents,
    };
  }, [consentController, reRender]);

  const contextData: ConsentContextType = {
    hasUserHandledAllConsents: consentControllerFunctions.hasUserHandledAllConsents,
    onAction: consentControllerFunctions.onAction,
    getApprovalPercentageForOptional: consentControllerFunctions.getApprovalPercentageForOptional,
    areGroupConsentsApproved: consentControllerFunctions.areGroupConsentsApproved,
  };
  if (content.callbacks.onConsentsParsed) {
    content.callbacks.onConsentsParsed(
      consentControllerFunctions.mergeConsents(),
      consentControllerFunctions.hasUserHandledAllConsents(),
    );
  }
  return <ConsentContext.Provider value={contextData}>{children}</ConsentContext.Provider>;
};

export const useConsentContext = (): ConsentContextType => {
  return useContext(ConsentContext);
};

export const useConsentActions = (): ConsentContextType['onAction'] => {
  const cookieConsentContext = useContext(ConsentContext);
  return cookieConsentContext.onAction;
};

export const useFocusShift = (): (() => void) => {
  const { focusTargetSelector } = useContentContext();
  if (!focusTargetSelector) {
    throw new Error('Cookie consent modal requires a content.focusTargetSelector to be set');
  }
  return useCallback(() => {
    forceFocusToElement(focusTargetSelector);
  }, [focusTargetSelector]);
};
