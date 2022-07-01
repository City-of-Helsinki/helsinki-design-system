import React, { useContext } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import { CookieConsentContext, Category as CategoryType, useCookieConsentActions } from '../CookieConsentContext';
import styles from '../CookieConsent.module.scss';
import ConsentGroup from '../consentGroup/ConsentGroup';
import { Checkbox } from '../../checkbox/Checkbox';

function Category(props: { category?: CategoryType; isRequired?: boolean }): React.ReactElement {
  const { category, isRequired } = props;
  const cookieConsentContext = useContext(CookieConsentContext);
  const triggerAction = useCookieConsentActions();
  if (!category) {
    return null;
  }
  const selectPercentage = cookieConsentContext.countApprovedOptional();
  const allApproved = isRequired || selectPercentage === 1;
  const { title, text, groups, checkboxAriaDescription } = category;
  const checked = isRequired || allApproved;
  const checkboxStyle = {
    '--label-font-size': 'var(--fontsize-heading-m)',
  } as React.CSSProperties;
  const groupId = isRequired ? 'required' : 'optional';
  const getConsentGroupIdentifier = (suffix: string) => `${groupId}-consents-${suffix}`;
  const checkboxId = getConsentGroupIdentifier('checkbox');
  const checkboxProps = {
    onChange: isRequired ? () => undefined : () => triggerAction(checked ? 'unapproveOptional' : 'approveOptional'),
    disabled: isRequired,
    checked,
    indeterminate: isRequired ? false : !Number.isInteger(selectPercentage),
    id: checkboxId,
    'data-testid': checkboxId,
    name: checkboxId,
    label: title,
    'aria-describedby': getConsentGroupIdentifier('description'),
    style: checkboxStyle,
  };

  return (
    <div className={styles['consent-group-parent']}>
      <div className={styles['title-with-checkbox']}>
        <Checkbox {...checkboxProps} />
      </div>
      <p aria-hidden>{text}</p>
      <VisuallyHidden id={getConsentGroupIdentifier('description')} aria-hidden>
        {checkboxAriaDescription || text}
      </VisuallyHidden>
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

export default Category;
