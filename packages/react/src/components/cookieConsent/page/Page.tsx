import React, { useState } from 'react';

import { Content, Provider as CookieContextProvider } from '../CookieConsentContext';
import Details from '../details/Details';
import styles from '../CookieConsent.module.scss';
import Buttons from '../buttons/Buttons';
import { Notification } from '../../notification/index';

export function Page(props: { content: Content; cookieDomain?: string }): React.ReactElement | null {
  const { cookieDomain, content } = props;
  const { title, text } = content.texts.sections.main;
  const { settingsSaved } = content.texts.ui;
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const onButtonClick = () => {
    setShowSaveNotification(true);
  };
  return (
    <CookieContextProvider content={content} cookieDomain={cookieDomain}>
      <div className={styles.page} data-testid="cookie-consent">
        <div className={styles.content} id="cookie-consent-content">
          <div className={styles['main-content']} data-testid="cookie-consent-information">
            <h1>{title}</h1>
            <p>{text}</p>
          </div>
          <Details />
          {showSaveNotification && (
            <Notification size="small" type="success" label="Saved" dataTestId="cookie-consent-save-notification">
              {settingsSaved}
            </Notification>
          )}
          <Buttons detailsAreShown onClick={onButtonClick} />
        </div>
      </div>
    </CookieContextProvider>
  );
}
