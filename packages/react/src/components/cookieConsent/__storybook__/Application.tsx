import React, { useContext } from 'react';

import { CookieConsentContext } from '../CookieConsentContext';
import classNames from '../../../utils/classNames';
import styles from './styles.module.scss';

function Application(): React.ReactElement {
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
}

export default Application;
