import React from 'react';

import { Button } from '../../button/Button';
import styles from '../CookieConsent.module.scss';
import { useCookieConsentActions, useCookieConsentContent } from '../CookieConsentContext';

export type Props = {
  detailsAreShown: boolean;
};

function Buttons({ detailsAreShown }: Props): React.ReactElement {
  const content = useCookieConsentContent();
  const onClick = useCookieConsentActions();
  const { approveRequiredAndSelectedConsents, approveOnlyRequiredConsents, approveAllConsents } = content.texts.ui;
  const primaryButtonText = detailsAreShown ? approveRequiredAndSelectedConsents : approveAllConsents;
  const primaryButtonAction = detailsAreShown ? 'approveSelectedAndRequired' : 'approveAll';
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
