import React, { useCallback, useState } from 'react';

import { useCookieContentContext } from '../contexts/ContentContext';
import { Details } from '../details/Details';
import styles from '../CookieConsent.module.scss';
import { MemoizedButtons } from '../buttons/Buttons';
import { Notification, NotificationSize } from '../../notification/index';
import { useConsentActions } from '../contexts/ConsentContext';

export function Page(): React.ReactElement | null {
  const content = useCookieContentContext();
  const triggerAction = useConsentActions();
  const { title, text } = content.texts.sections.main;
  const { settingsSaved } = content.texts.ui;
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const onButtonClick = useCallback(() => {
    setShowSaveNotification(true);
  }, [setShowSaveNotification]);
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
            size={NotificationSize.Small}
            type="success"
            label="Saved"
            data-testid="cookie-consent-save-notification"
            className={styles.saveNotification}
          >
            {settingsSaved}
          </Notification>
        )}
        <MemoizedButtons detailsAreShown onClick={onButtonClick} triggerAction={triggerAction} />
      </div>
    </div>
  );
}
