import { useCallback, useEffect, useRef } from 'react';

import { CookieConsentCore } from '../cookieConsentCore';
import useForceRender from '../../../hooks/useForceRender';
import { ChangeEvent, defaultSubmitEvent, useCookieConsentEvents } from './useCookieConsentEvents';

type CookieCore = CookieConsentCore;
type CreateParams = Parameters<typeof CookieConsentCore.create>;
type CreateProps = {
  siteSettings?: CreateParams[0];
  options?: CreateParams[1];
};

declare global {
  interface Window {
    hds: {
      cookieConsent: CookieCore;
    };
  }
}

export type ChangeProps = { type: string; acceptedGroups: string[]; storageType?: string; storageKeys?: string[] };
export type CookieConsentReactProps = Omit<CreateProps, 'settingsPageSelector'> & {
  onChange: (changeProps: ChangeProps) => void;
  settingsPageId?: string;
};
type GroupConsentData = { group: string; consented: boolean };

export type CookieConsentReactType = {
  isReady: boolean;
  consents: Array<GroupConsentData>;
  instance: CookieConsentCore | null;
  openBanner: () => Promise<boolean>;
  openBannerIfNeeded: () => Promise<boolean>;
  renderPage: (selector?: string) => Promise<boolean>;
  removePage: () => void;
  settingsPageId: string;
  language: string;
};

export const defaultSettingsPageId = 'hds-cookie-consent-full-page';

export function useCookieConsent(props: CookieConsentReactProps): CookieConsentReactType {
  const { onChange, options, siteSettings, settingsPageId } = props;
  const language = (options && options.language) || 'en';
  const elementId = settingsPageId || defaultSettingsPageId;
  const passedOptions: Partial<CreateProps['options']> = options || {};
  // settingsPageSelector must be picked out or banner is never shown
  passedOptions.settingsPageSelector = undefined;
  const windowObjectGetter = () => {
    return window && window.hds && window.hds.cookieConsent;
  };
  const submitEventName = passedOptions.submitEvent || defaultSubmitEvent;
  const instanceRef = useRef<CookieCore | null>(null);
  const readyRef = useRef<boolean>(false);
  const forceRender = useForceRender();
  //
  const mergedOptions: CreateProps['options'] = {
    language,
    submitEvent: submitEventName,
    ...passedOptions,
    // this must always be true
    disableAutoRender: true,
  };

  const onChangeListener = useCallback(
    (e: ChangeEvent) => {
      onChange(e);
      forceRender();
    },
    [onChange, forceRender],
  );

  const onMonitorEvent = useCallback(
    (e: ChangeEvent) => {
      onChange(e);
    },
    [useCallback],
  );

  const onReady = useCallback(() => {
    readyRef.current = true;
    forceRender();
  }, [forceRender]);

  useCookieConsentEvents({
    onChange: onChangeListener,
    onMonitorEvent,
    onReady,
    submitEvent: mergedOptions.submitEvent,
  });

  const getAllConsentStatuses = () => {
    if (!instanceRef.current || !instanceRef.current.getAllConsentStatuses) {
      return [];
    }
    return instanceRef.current.getAllConsentStatuses();
  };

  const current = windowObjectGetter();
  if (current) {
    instanceRef.current = current;
    readyRef.current = true;
    if (options && options.language) {
      instanceRef.current.setLanguage(options.language);
    }
  }

  useEffect(() => {
    if (!instanceRef.current) {
      const asyncCreation = async () => {
        instanceRef.current = await CookieConsentCore.create(siteSettings, mergedOptions);
        forceRender();
      };
      // useEffect cannot be async, so have to use this work-around
      asyncCreation();
    }
  }, []);

  const openBanner = useCallback(async (highlightedGroups?: string[]) => {
    if (!instanceRef.current) {
      return Promise.resolve(false);
    }
    return instanceRef.current.openBanner(highlightedGroups).then(() => true);
  }, []);

  const openBannerIfNeeded = useCallback(async () => {
    if (!instanceRef.current) {
      return Promise.resolve(false);
    }
    return instanceRef.current.openBannerIfNeeded().then(() => true);
  }, []);

  const renderPage = useCallback(
    async (id?: string) => {
      if (!instanceRef.current) {
        return Promise.resolve(false);
      }
      const selector = `#${id || elementId}`;
      const currentElement = document.querySelector(selector);
      if (currentElement && currentElement.childElementCount > 0) {
        currentElement.innerHTML = '';
      }
      return instanceRef.current.renderPage(selector).then(() => true);
    },
    [elementId],
  );

  const removePage = () => {
    if (!instanceRef.current) {
      return;
    }
    instanceRef.current.removePage();
  };

  return {
    isReady: readyRef.current && !!instanceRef.current,
    instance: instanceRef.current,
    consents: getAllConsentStatuses(),
    openBanner,
    openBannerIfNeeded,
    renderPage,
    removePage,
    settingsPageId: elementId,
    language,
  };
}
