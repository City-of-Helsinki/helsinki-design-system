import { useEffect } from 'react';

import { CookieConsentCore } from '../cookieConsentCore';
import { CreateProps } from '../types';

export const Banner = (props: CreateProps) => {
  useEffect(() => {
    // @ts-ignore
    CookieConsentCore.create(props.siteSettings, props.options);
  }, []);

  return null;
};
