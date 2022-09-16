import React from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import styles from '../CookieConsent.module.scss';
import { ConsentContextType } from '../contexts/ConsentContext';
import { Category as CategoryType } from '../contexts/ContentContext';
import { ConsentGroup } from '../consentGroup/ConsentGroup';
import { Checkbox } from '../../checkbox/Checkbox';

export function Category(props: {
  category?: CategoryType;
  isRequired?: boolean;
  triggerAction?: ConsentContextType['onAction'];
  selectPercentage?: number;
}): React.ReactElement {
  const { category, isRequired, triggerAction, selectPercentage = -1 } = props;
  if (!category) {
    return null;
  }
  const allApproved = isRequired || selectPercentage === 1;
  const { title, text, groups, checkboxAriaDescription } = category;
  const checked = isRequired || allApproved;
  const checkboxStyle = {
    '--label-font-size': 'var(--fontsize-heading-m)',
  } as React.CSSProperties;
  const groupId = isRequired ? 'required' : 'optional';
  const getConsentGroupIdentifier = (suffix: string) => `${groupId}-consents-${suffix}`;
  const checkboxId = getConsentGroupIdentifier('checkbox');
  const descriptionElementId = getConsentGroupIdentifier('description');
  const checkboxProps = {
    onChange: triggerAction ? () => triggerAction(checked ? 'unapproveOptional' : 'approveOptional') : () => undefined,
    disabled: isRequired,
    checked,
    indeterminate: isRequired ? false : !Number.isInteger(selectPercentage),
    id: checkboxId,
    'data-testid': checkboxId,
    name: checkboxId,
    label: title,
    'aria-describedby': descriptionElementId,
    style: checkboxStyle,
  };

  return (
    <div className={styles.consentCategory}>
      <div className={styles.titleWithCheckbox}>
        <Checkbox {...checkboxProps} />
      </div>
      <p aria-hidden>{text}</p>
      <VisuallyHidden id={descriptionElementId}>{checkboxAriaDescription || text}</VisuallyHidden>
      <ul className={styles.list}>
        {groups.map((group, index) => (
          <li key={group.title}>
            <ConsentGroup group={group} isRequired={isRequired} id={getConsentGroupIdentifier(`group-${index}`)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export const MemoizedCategory = React.memo(Category);
