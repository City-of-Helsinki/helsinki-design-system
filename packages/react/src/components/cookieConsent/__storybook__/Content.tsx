import React, { useState } from 'react';

import { CookieConsentActionListener, ViewProps } from '../types';
import Buttons from './Buttons';
import Details from './Details';
import Main from './Main';
import styles from './styles.module.scss';

function Content({ onClick }: ViewProps): React.ReactElement {
  const [showMore, setShowMore] = useState<boolean>(false);
  const onAction: CookieConsentActionListener = (action, value) => {
    if (action === 'showDetails') {
      setShowMore(true);
    } else if (action === 'hideDetails') {
      setShowMore(false);
    } else {
      onClick(action, value);
    }
  };

  return (
    <div
      className={styles.content}
      role="dialog"
      aria-labelledby="cookie-consent-active-heading"
      aria-describedby="cookie-consent-description"
      id="cookie-consent-content"
      aria-live="assertive"
    >
      {!showMore && <Main onClick={onAction} />}
      {showMore && <Details onClick={onAction} />}
      <Buttons onClick={onAction} />
      <div className={styles['language-switcher']} data-testid="cookie-consent-language-switcher">
        <a href="/" title="This is a dummy language switcher" onClick={(e) => e.preventDefault()}>
          FI
        </a>
      </div>
    </div>
  );
}

export default Content;
