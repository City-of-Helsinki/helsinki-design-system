import React, { useContext } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import {
  ConsentGroup as ConsentGroupType,
  CookieConsentContext,
  useCookieConsentActions,
} from '../CookieConsentContext';
import styles from '../CookieConsent.module.scss';
import { Checkbox } from '../../checkbox/Checkbox';
import { useAccordion } from '../../accordion';
import { IconAngleDown, IconAngleUp } from '../../../icons';
import { Card } from '../../card/Card';
import ConsentGroupDataTable from '../consentGroupDataTable/ConsentGroupDataTable';
import classNames from '../../../utils/classNames';

function ConsentGroup(props: { group: ConsentGroupType; isRequired: boolean; id: string }): React.ReactElement {
  const { group, isRequired, id } = props;
  const { isOpen, buttonProps, contentProps } = useAccordion({
    initiallyOpen: false,
  });
  const groupConsents = group.consents;
  const cookieConsentContext = useContext(CookieConsentContext);
  const triggerAction = useCookieConsentActions();
  const areAllApproved = isRequired || cookieConsentContext.areGroupConsentsApproved(groupConsents);
  const { title, text, checkboxAriaDescription, expandAriaLabel } = group;
  const Icon = isOpen ? IconAngleUp : IconAngleDown;
  const checkboxProps = {
    onChange: isRequired
      ? () => undefined
      : () =>
          triggerAction(
            'changeConsentGroup',
            groupConsents.map((consent) => consent.id),
            !areAllApproved,
          ),
    disabled: isRequired,
    checked: areAllApproved,
  };
  const checkboxStyle = {
    '--label-font-size': 'var(--fontsize-heading-s)',
  } as React.CSSProperties;

  const currentStyles = isOpen
    ? styles['consent-group']
    : classNames(styles['consent-group'], styles['consent-group-closed']);

  const getGroupIdenfier = (suffix: string) => `${id}-${suffix}`;
  const checkboxId = getGroupIdenfier('checkbox');
  return (
    <div className={currentStyles}>
      <div className={styles['title-with-checkbox']}>
        <Checkbox
          id={checkboxId}
          name={checkboxId}
          data-testid={checkboxId}
          label={title}
          aria-describedby={getGroupIdenfier('description')}
          style={checkboxStyle}
          {...checkboxProps}
        />
      </div>
      <div className={styles['consent-group-content']}>
        <p aria-hidden>{text}</p>
        <VisuallyHidden id={getGroupIdenfier('description')} aria-hidden>
          {checkboxAriaDescription || text}
        </VisuallyHidden>
        <button
          type="button"
          className={styles['accordion-button']}
          data-testid={getGroupIdenfier('details-toggler')}
          aria-label={expandAriaLabel}
          {...buttonProps}
        >
          <Icon aria-hidden />
        </button>
        <Card
          {...contentProps}
          theme={{
            '--padding-horizontal': '0',
            '--padding-vertical': '0',
          }}
        >
          <ConsentGroupDataTable consents={groupConsents} id={getGroupIdenfier('table')} />
        </Card>
      </div>
    </div>
  );
}

export default ConsentGroup;
