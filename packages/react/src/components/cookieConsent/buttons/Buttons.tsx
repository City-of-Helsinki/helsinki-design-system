import React from 'react';

import { CookieConsentActionListener } from '../types';
import { Button } from '../../button/Button';
import styles from '../CookieConsent.module.scss';

export type Props = {
  onClick: CookieConsentActionListener;
  hasOptionalConsents: boolean;
};

function Buttons({ onClick, hasOptionalConsents }: Props): React.ReactElement {
  const primaryButtonText = hasOptionalConsents ? ' Hyväksy valitut evästeet' : 'Hyväksy kaikki evästeet';
  const primaryButtonAction = hasOptionalConsents ? 'approveSelectedAndRequired' : 'approveAll';
  return (
    <div className={styles.buttons}>
      <Button
        variant="primary"
        onClick={() => {
          onClick(primaryButtonAction);
        }}
        data-testid="cookie-consent-approve-all-button"
      >
        {primaryButtonText}
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          onClick('approveRequired');
        }}
        data-testid="cookie-consent-approve-required-button"
        aria-label="Hyväksy pakolliset evästeet"
      >
        Hyväksy vain pakolliset evästeet
      </Button>
    </div>
  );
}

export default Buttons;
