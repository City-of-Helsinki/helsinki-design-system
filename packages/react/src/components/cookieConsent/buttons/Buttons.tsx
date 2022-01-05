import React from 'react';

import { CookieConsentActionListener } from '../types';
import { Button } from '../../button/Button';
import styles from '../CookieConsent.module.scss';

export type Props = {
  onClick: CookieConsentActionListener;
};

function Buttons({ onClick }: Props): React.ReactElement {
  return (
    <div className={styles.buttons}>
      <Button
        variant="primary"
        onClick={() => {
          onClick('approveAll');
        }}
        data-testid="cookie-consent-approve-all-button"
      >
        Hyväksy kaikki evästeet
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          onClick('approveRequired');
        }}
        data-testid="cookie-consent-approve-required-button"
        aria-label="Hyväksy pakolliset evästeet"
      >
        Pakolliset evästeet
      </Button>
    </div>
  );
}

export default Buttons;
