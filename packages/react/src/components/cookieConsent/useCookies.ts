import { useMemo } from 'react';

import { ConsentObject, COOKIE_NAME, getCookieDomainFromUrl } from './cookieConsentController';
import { createCookieController, parseConsents } from './cookieController';

export type UseCookiesHookReturnType = {
  getAllConsents: () => ConsentObject;
  getCookie: () => string;
};

export function useCookies(props?: { cookieDomain?: string; cookieName?: string }): UseCookiesHookReturnType {
  const { cookieDomain, cookieName } = props || {};
  const getters = useMemo(() => {
    const cookieController = createCookieController(
      {
        domain: cookieDomain || getCookieDomainFromUrl(),
      },
      cookieName || COOKIE_NAME,
    );
    const getCookie = () => cookieController.get();
    const getAllConsents = () => parseConsents(getCookie());
    return {
      getCookie,
      getAllConsents,
    };
  }, [cookieDomain, cookieName]);
  return getters;
}
