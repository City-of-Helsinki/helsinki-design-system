import React from 'react';

import { CookieConsentActionListener } from '../types';
import { Button } from '../../button/Button';
import styles from '../CookieConsent.module.scss';
import { useCookieConsentContent } from '../CookieConsentContext';

export type Props = {
  onClick: CookieConsentActionListener;
  hasOptionalConsents: boolean;
};

function Buttons({ onClick, hasOptionalConsents }: Props): React.ReactElement {
  const {
    approveRequiredAndSelectedConsents,
    approveOnlyRequiredConsents,
    approveAllConsents,
  } = useCookieConsentContent();
  const primaryButtonText = hasOptionalConsents ? approveRequiredAndSelectedConsents : approveAllConsents;
  const primaryButtonAction = hasOptionalConsents ? 'approveSelectedAndRequired' : 'approveAll';
  return (
    <div className={styles.buttons}>
      <Button
        variant="primary"
        onClick={() => {
          onClick(primaryButtonAction);
        }}
        data-testid="cookie-consent-approve-button"
      >
        {primaryButtonText}
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          onClick('approveRequired');
        }}
        data-testid="cookie-consent-approve-required-button"
      >
        {approveOnlyRequiredConsents}
      </Button>
    </div>
  );
}

export default Buttons;
