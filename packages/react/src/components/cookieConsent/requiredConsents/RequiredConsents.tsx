import React from 'react';

import { RequiredOrOptionalConsents } from '../CookieConsentContext';
import styles from '../CookieConsent.module.scss';
import ConsentGroup from '../consentGroup/ConsentGroup';
import { Checkbox } from '../../checkbox/Checkbox';

function RequiredConsents(props: {
  consentGroupParent?: RequiredOrOptionalConsents;
  isRequired?: boolean;
}): React.ReactElement {
  const { consentGroupParent, isRequired } = props;
  if (!consentGroupParent) {
    return null;
  }
  const { title, text, groups } = consentGroupParent;
  const checkboxProps = {
    onChange: isRequired ? () => undefined : () => undefined,
    disabled: isRequired,
    checked: isRequired,
  };
  const checkboxStyle = {
    '--label-font-size': 'var(--fontsize-heading-m)',
  } as React.CSSProperties;

  return (
    <div className={styles['consent-group-parent']}>
      <div className={styles['title-with-checkbox']}>
        <Checkbox
          id={'group'}
          name={'data.id'}
          data-testid={'data.id'}
          label={title}
          aria-describedby={'data.descriptionId'}
          style={checkboxStyle}
          {...checkboxProps}
        />
      </div>
      <p>{text}</p>
      <ul className={styles.list}>
        {groups.map((group) => (
          <li key={group.title}>
            <ConsentGroup group={group} isRequired={isRequired} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RequiredConsents;
