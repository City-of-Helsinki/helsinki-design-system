import React, { useState } from 'react';

import { useCookieConsentContent } from '../CookieConsentContext';
import { Details } from '../details/Details';
import styles from '../CookieConsent.module.scss';
import { Buttons } from '../buttons/Buttons';
import { Notification } from '../../notification/index';

export function Page(): React.ReactElement | null {
  const content = useCookieConsentContent();
  const { title, text } = content.texts.sections.main;
  const { settingsSaved } = content.texts.ui;
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const onButtonClick = () => {
    setShowSaveNotification(true);
  };
  return (
    <div className={styles.page} data-testid="cookie-consent">
      <div className={styles.content} id="cookie-consent-content">
        <div className={styles.mainContent} data-testid="cookie-consent-information">
          <h1 className="heading-xl">{title}</h1>
          <p>{text}</p>
        </div>
        <Details />
        {showSaveNotification && (
          <Notification
            size="small"
            type="success"
            label="Saved"
            dataTestId="cookie-consent-save-notification"
            className={styles.saveNotification}
          >
            {settingsSaved}
          </Notification>
        )}
        <Buttons detailsAreShown onClick={onButtonClick} />
      </div>
    </div>
  );
}
