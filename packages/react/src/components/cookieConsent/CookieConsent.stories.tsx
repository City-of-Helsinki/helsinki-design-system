import React, { useContext } from 'react';

import { commonConsents } from './cookieConsentController';
import { CookieConsentContext, Provider as CookieContextProvider } from './CookieConsentContext';
import { CookieConsent } from './CookieConsent';
import classNames from '../../utils/classNames';
import styles from './__storybook__/styles.module.scss';

export default {
  component: CookieConsent,
  title: 'Components/CookieConsent',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = () => {
  const Application = () => {
    const { willRenderCookieConsentDialog } = useContext(CookieConsentContext);
    return (
      <div
        className={classNames(styles.application, willRenderCookieConsentDialog ? styles['no-scroll'] : '')}
        aria-hidden={willRenderCookieConsentDialog ? 'true' : 'false'}
      >
        <h1>This is a dummy application</h1>
        {willRenderCookieConsentDialog && (
          <>
            <p>
              Cookie consent dialog is visible. &nbsp;
              <a href="/" title="This is a dummy link">
                Can&apos;t touch this!
              </a>
            </p>
          </>
        )}
        {!willRenderCookieConsentDialog && (
          <>
            <p>Cookie consents have been given. Remove the cookie to see the dialog again.</p>
          </>
        )}
      </div>
    );
  };

  return (
    <CookieContextProvider
      requiredConsents={[commonConsents.tunnistamo, commonConsents.language]}
      optionalConsents={[
        commonConsents.matomo,
        commonConsents.preferences,
        commonConsents.marketing,
        'someOtherConsent',
      ]}
      onAllConsentsGiven={(consents) => {
        if (consents.matomo) {
          //  start tracking
        }
      }}
      onConsentsParsed={(consents) => {
        if (consents.matomo) {
          //  start tracking
        }
      }}
    >
      <CookieConsent />
      <Application />
    </CookieContextProvider>
  );
};
