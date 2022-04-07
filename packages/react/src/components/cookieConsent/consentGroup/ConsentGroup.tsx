import React from 'react';

import { ConsentGroup as ConsentGroupType } from '../CookieConsentContext';
import styles from '../CookieConsent.module.scss';
import { Checkbox } from '../../checkbox/Checkbox';
import { useAccordion } from '../../accordion';
import { IconAngleDown, IconAngleUp } from '../../../icons';
import { Card } from '../../card/Card';
import ConsentGroupDataTable from '../consentGroupDataTable/ConsentGroupDataTable';
import classNames from '../../../utils/classNames';

function ConsentGroup(props: { group: ConsentGroupType; isRequired: boolean; id: string }): React.ReactElement {
  const { isOpen, buttonProps, contentProps } = useAccordion({
    initiallyOpen: false,
  });
  const { group, isRequired, id } = props;
  const { title, text, checkboxAriaLabel, expandAriaLabel } = group;
  const Icon = isOpen ? IconAngleUp : IconAngleDown;
  const checkboxProps = {
    onChange: isRequired ? () => undefined : () => undefined,
    disabled: isRequired,
    checked: isRequired,
  };
  const checkboxStyle = {
    '--label-font-size': 'var(--fontsize-heading-s)',
  } as React.CSSProperties;

  const currentStyles = isOpen
    ? styles['consent-group']
    : classNames(styles['consent-group'], styles['consent-group-closed']);

  const getGroupIdenfier = (suffix: string) => `group-item-${id}-${suffix}`;

  return (
    <div className={currentStyles}>
      <div className={styles['group-title-row']}>
        <div className={styles['title-with-checkbox']}>
          <Checkbox
            id={getGroupIdenfier('checkbox')}
            name={getGroupIdenfier('checkbox')}
            label={title}
            aria-label={checkboxAriaLabel}
            aria-describedby={getGroupIdenfier('description')}
            style={checkboxStyle}
            {...checkboxProps}
          />
        </div>
        <button
          type="button"
          className={styles['accordion-button']}
          data-testid={getGroupIdenfier('toggler')}
          aria-label={expandAriaLabel}
          {...buttonProps}
        >
          <Icon aria-hidden />
        </button>
      </div>
      <div className={styles['consent-group-content']}>
        <p id={getGroupIdenfier('description')}>{text}</p>
        <Card
          {...contentProps}
          theme={{
            '--padding-horizontal': '0',
            '--padding-vertical': '0',
          }}
        >
          <ConsentGroupDataTable consents={group.consents} />
        </Card>
      </div>
    </div>
  );
}

export default ConsentGroup;
