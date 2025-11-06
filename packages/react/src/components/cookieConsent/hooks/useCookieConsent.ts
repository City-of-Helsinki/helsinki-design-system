import { useCallback, useEffect, useRef } from 'react';

import { CookieConsentCore } from '../../cookieConsentCore/cookieConsentCore';
import useForceRender from '../../../hooks/useForceRender';
import { CookieConsentChangeEvent, useCookieConsentEvents } from './useCookieConsentEvents';
import { Options } from '../../cookieConsentCore/types';
import { isSsrEnvironment } from '../../../utils/isSsrEnvironment';

type CookieCore = CookieConsentCore;
type CreateParams = Parameters<typeof CookieConsentCore.create>;
type CreateProps = {
  siteSettings?: CreateParams[0];
  options?: Options;
};

declare global {
  interface Window {
    hds: {
      cookieConsent: CookieCore;
    };
  }
}

export type CookieConsentReactProps = Omit<CreateProps, 'settingsPageSelector'> & {
  onChange?: (changeProps: CookieConsentChangeEvent) => void;
  settingsPageId?: string;
};
type GroupConsentData = { group: string; consented: boolean };

export type CookieConsentReactType = {
  isReady: boolean;
  consents: Array<GroupConsentData>;
  instance: CookieConsentCore | null;
  openBanner: () => Promise<boolean>;
  removeBanner: () => void;
  openBannerIfNeeded: () => Promise<boolean>;
  renderPage: (selector?: string) => Promise<boolean>;
  removePage: () => void;
  settingsPageId: string;
  language: string;
  theme: string;
};

export const defaultSettingsPageId = 'hds-cookie-consent-full-page';

export function useCookieConsent(props: CookieConsentReactProps): CookieConsentReactType {
  const { onChange, options, siteSettings, settingsPageId } = props;
  const language = (options && options.language) || 'en';
  const theme = (options && options.theme) || 'bus';
  const elementId = settingsPageId || defaultSettingsPageId;
  const passedOptions: Partial<CreateProps['options']> = options || {};
  // settingsPageSelector must be picked out or banner is never shown
  passedOptions.settingsPageSelector = undefined;
  const windowObjectGetter = () => {
    if (isSsrEnvironment()) {
      return null;
    }
    return window && window.hds && window.hds.cookieConsent;
  };
  const instanceRef = useRef<CookieCore | null>(windowObjectGetter());
  const readyRef = useRef<boolean>(false);
  // in dev mode, React CRA renders all components twice. This will result calling core.create() twice,
  // because first instance is not ready before second render.
  const createHasBeenCalled = useRef<boolean>(!!instanceRef.current);
  const forceRender = useForceRender();
  //
  const mergedOptions: CreateProps['options'] = {
    language,
    ...passedOptions,
    // these must always be true
    disableAutoRender: true,
    submitEvent: true,
  };

  const onChangeListener = useCallback(
    (e: CookieConsentChangeEvent) => {
      onChange?.(e);
      forceRender();
    },
    [onChange, forceRender],
  );

  const onMonitorEvent = useCallback(
    (e: CookieConsentChangeEvent) => {
      onChange?.(e);
    },
    [onChange],
  );

  const onReady = useCallback(() => {
    readyRef.current = true;
    if (!instanceRef.current) {
      instanceRef.current = windowObjectGetter();
    }
    forceRender();
  }, [forceRender]);

  useCookieConsentEvents({
    onChange: onChangeListener,
    onMonitorEvent,
    onReady,
  });

  const getAllConsentStatuses = useCallback(() => {
    if (!instanceRef.current || !instanceRef.current.getAllConsentStatuses) {
      return [];
    }
    return instanceRef.current.getAllConsentStatuses();
  }, []);

  const current = windowObjectGetter();
  if (current) {
    instanceRef.current = current;
    readyRef.current = true;
    if (options && options.language) {
      instanceRef.current.setLanguage(options.language);
    }
    if (options && options.theme) {
      instanceRef.current.setTheme(options.theme);
    }
  }

  useEffect(() => {
    if (!instanceRef.current) {
      const asyncCreation = async () => {
        if (createHasBeenCalled.current) {
          return Promise.resolve(false);
        }
        createHasBeenCalled.current = true;
        await CookieConsentCore.create(siteSettings, mergedOptions);
        return Promise.resolve(true);
      };
      // useEffect cannot be async, so have to use this work-around
      asyncCreation();
    }
  }, []);

  const openBanner = useCallback(async (highlightedGroups?: string[]) => {
    if (!instanceRef.current) {
      return Promise.resolve(false);
    }
    return instanceRef.current.openBanner(highlightedGroups);
  }, []);

  const openBannerIfNeeded = useCallback(async () => {
    if (!instanceRef.current) {
      return Promise.resolve(false);
    }
    return instanceRef.current.openBannerIfNeeded();
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
      return instanceRef.current.renderPage(selector);
    },
    [elementId],
  );

  const removePage = useCallback(() => {
    if (!instanceRef.current) {
      return;
    }
    instanceRef.current.removePage();
  }, []);

  const removeBanner = useCallback(() => {
    if (!instanceRef.current) {
      return;
    }
    instanceRef.current.removeBanner();
  }, []);

  return {
    isReady: readyRef.current && !!instanceRef.current,
    instance: instanceRef.current,
    consents: getAllConsentStatuses(),
    openBanner,
    removeBanner,
    openBannerIfNeeded,
    renderPage,
    removePage,
    settingsPageId: elementId,
    language,
    theme,
  };
}
