import React from 'react';

import classNames from '../../../utils/classNames';
import { Button, ButtonVariant } from '../../button/Button';
import styles from '../CookieConsent.module.scss';
import { ConsentContextType } from '../contexts/ConsentContext';
import { useUiTexts } from '../contexts/ContentContext';

export type Props = {
  detailsAreShown: boolean;
  onClick?: () => void;
  triggerAction: ConsentContextType['onAction'];
};

function Buttons({ detailsAreShown, onClick = () => undefined, triggerAction }: Props): React.ReactElement {
  const { approveRequiredAndSelectedConsents, approveOnlyRequiredConsents, approveAllConsents } = useUiTexts();
  const primaryButtonText = detailsAreShown ? approveRequiredAndSelectedConsents : approveAllConsents;
  const primaryButtonAction = detailsAreShown ? 'approveSelectedAndRequired' : 'approveAll';
  return (
    <div className={classNames(styles.buttons, detailsAreShown ? '' : styles.visuallyHiddenWithoutFocus)}>
      <Button
        variant={ButtonVariant.Secondary}
        onClick={() => {
          triggerAction(primaryButtonAction);
          onClick();
        }}
        data-testid="cookie-consent-approve-button"
      >
        {primaryButtonText}
      </Button>
      <Button
        variant={ButtonVariant.Secondary}
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

export const MemoizedButtons = React.memo(Buttons);
