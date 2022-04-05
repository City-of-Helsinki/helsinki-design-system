import React from 'react';

import { ConsentGroup as ConsentGroupType } from '../CookieConsentContext';
import styles from '../CookieConsent.module.scss';
import { Checkbox } from '../../checkbox/Checkbox';
import { useAccordion } from '../../accordion';
import { IconAngleDown, IconAngleUp } from '../../../icons';
import { Card } from '../../card/Card';
import ConsentGroupDataTable from '../consentGroupDataTable/ConsentGroupDataTable';
import classNames from '../../../utils/classNames';

function ConsentGroup(props: { group: ConsentGroupType; isRequired: boolean }): React.ReactElement {
  const { isOpen, buttonProps, contentProps } = useAccordion({
    initiallyOpen: false,
  });
  const { group, isRequired } = props;
  const { title, text } = group;
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

  return (
    <div className={currentStyles}>
      <div className={styles['group-title-row']}>
        <div className={styles['title-with-checkbox']}>
          <Checkbox
            id={'group.xxx'}
            name={'group.xxx'}
            data-testid={'data.id'}
            label={title}
            aria-describedby={'data.descriptionId'}
            style={checkboxStyle}
            {...checkboxProps}
          />
        </div>
        <button
          type="button"
          className={styles['accordion-button']}
          data-testid="cookie-consent-settings-toggler"
          {...buttonProps}
        >
          <Icon aria-hidden />
        </button>
      </div>
      <div className={styles['consent-group-content']}>
        <p>{text}</p>
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
