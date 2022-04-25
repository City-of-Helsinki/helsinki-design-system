import React from 'react';

import { Button } from '../../button/Button';
import styles from '../CookieConsent.module.scss';
import { useCookieConsentActions, useCookieConsentUiTexts } from '../CookieConsentContext';

export type Props = {
  detailsAreShown: boolean;
  onClick?: () => void;
};

function Buttons({ detailsAreShown, onClick = () => undefined }: Props): React.ReactElement {
  const triggerAction = useCookieConsentActions();
  const {
    approveRequiredAndSelectedConsents,
    approveOnlyRequiredConsents,
    approveAllConsents,
  } = useCookieConsentUiTexts();
  const primaryButtonText = detailsAreShown ? approveRequiredAndSelectedConsents : approveAllConsents;
  const primaryButtonAction = detailsAreShown ? 'approveSelectedAndRequired' : 'approveAll';
  return (
    <div className={styles.buttons}>
      <Button
        variant="primary"
        onClick={() => {
          triggerAction(primaryButtonAction);
          onClick();
        }}
        data-testid="cookie-consent-approve-button"
      >
        {primaryButtonText}
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          triggerAction('approveRequired');
          onClick();
        }}
        data-testid="cookie-consent-approve-required-button"
      >
        {approveOnlyRequiredConsents}
      </Button>
    </div>
  );
}

export default Buttons;
