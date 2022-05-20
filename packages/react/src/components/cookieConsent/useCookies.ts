import { useMemo } from 'react';

import { ConsentObject, COOKIE_NAME, getCookieDomainFromUrl, parseConsents } from './cookieConsentController';
import { createCookieController } from './cookieController';

type ReturnType = {
  getAllConsents: () => ConsentObject;
  getCookie: () => string;
};

export function useCookies(props?: { cookieDomain?: string; cookieName?: string }): ReturnType {
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
