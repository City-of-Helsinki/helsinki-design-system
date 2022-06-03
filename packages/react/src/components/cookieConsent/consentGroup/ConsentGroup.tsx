import React, { useContext } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import { CookieGroup, CookieConsentContext, useCookieConsentActions } from '../CookieConsentContext';
import styles from '../CookieConsent.module.scss';
import { Checkbox } from '../../checkbox/Checkbox';
import { useAccordion } from '../../accordion';
import { IconAngleDown, IconAngleUp } from '../../../icons';
import { Card } from '../../card/Card';
import { ConsentGroupDataTable } from '../consentGroupDataTable/ConsentGroupDataTable';

export function ConsentGroup(props: { group: CookieGroup; isRequired: boolean; id: string }): React.ReactElement {
  const { group, isRequired, id } = props;
  const { isOpen, buttonProps, contentProps } = useAccordion({
    initiallyOpen: false,
  });
  const groupConsents = group.cookies;
  const cookieConsentContext = useContext(CookieConsentContext);
  const triggerAction = useCookieConsentActions();
  const areAllApproved = isRequired || cookieConsentContext.areGroupConsentsApproved(groupConsents);
  const { title, text, checkboxAriaDescription, expandAriaLabel } = group;
  const Icon = isOpen ? IconAngleUp : IconAngleDown;
  const checkboxStyle = {
    '--label-font-size': 'var(--fontsize-heading-s)',
  } as React.CSSProperties;
  const getGroupIdentifier = (suffix: string) => `${id}-${suffix}`;
  const checkboxId = getGroupIdentifier('checkbox');
  const checkboxProps = {
    onChange: isRequired
      ? () => undefined
      : () =>
          triggerAction(
            'changeCookieGroupConsents',
            groupConsents.map((consent) => consent.id),
            !areAllApproved,
          ),
    disabled: isRequired,
    checked: areAllApproved,
    id: checkboxId,
    'data-testid': checkboxId,
    name: checkboxId,
    label: title,
    'aria-describedby': getGroupIdentifier('description'),
    style: checkboxStyle,
  };

  return (
    <div className={styles.consentGroup}>
      <div className={styles.titleWithCheckbox}>
        <Checkbox {...checkboxProps} />
      </div>
      <div className={styles.consentGroupContent}>
        <p aria-hidden>{text}</p>
        <VisuallyHidden id={getGroupIdentifier('description')}>{checkboxAriaDescription || text}</VisuallyHidden>
        <button
          type="button"
          className={styles.accordionButton}
          data-testid={getGroupIdentifier('details-toggler')}
          aria-label={expandAriaLabel}
          {...buttonProps}
        >
          <Icon aria-hidden />
        </button>
        <Card
          {...contentProps}
          aria-label={title}
          theme={{
            '--padding-horizontal': '0',
            '--padding-vertical': '0',
          }}
        >
          <ConsentGroupDataTable consents={groupConsents} id={getGroupIdentifier('table')} />
        </Card>
      </div>
    </div>
  );
}
