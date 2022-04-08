import React, { useContext } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import {
  CookieConsentContext,
  RequiredOrOptionalConsentGroups,
  useCookieConsentActions,
} from '../CookieConsentContext';
import styles from '../CookieConsent.module.scss';
import ConsentGroup from '../consentGroup/ConsentGroup';
import { Checkbox } from '../../checkbox/Checkbox';

function ConsentGroups(props: {
  consentGroups?: RequiredOrOptionalConsentGroups;
  isRequired?: boolean;
}): React.ReactElement {
  const { consentGroups, isRequired } = props;
  const cookieConsentContext = useContext(CookieConsentContext);
  const onClick = useCookieConsentActions();
  if (!consentGroups) {
    return null;
  }
  const selectPercentage = cookieConsentContext.countApprovedOptional();
  const allApproved = isRequired || selectPercentage === 1;
  const { title, text, groupList, groupId, checkboxAriaDescription } = consentGroups;
  const checked = isRequired || allApproved;
  const checkboxProps = {
    onChange: isRequired ? () => undefined : () => onClick(checked ? 'unapproveOptional' : 'approveOptional'),
    disabled: isRequired,
    checked,
    indeterminate: isRequired ? false : !Number.isInteger(selectPercentage),
  };
  const checkboxStyle = {
    '--label-font-size': 'var(--fontsize-heading-m)',
  } as React.CSSProperties;

  const getConsentGroupIdenfier = (suffix: string) => `consent-group-${groupId}-${suffix}`;

  return (
    <div className={styles['consent-group-parent']}>
      <div className={styles['title-with-checkbox']}>
        <Checkbox
          id={getConsentGroupIdenfier('checkbox')}
          name={getConsentGroupIdenfier('checkbox')}
          label={title}
          aria-describedby={getConsentGroupIdenfier('description')}
          style={checkboxStyle}
          {...checkboxProps}
        />
      </div>
      <p aria-hidden>{text}</p>
      <VisuallyHidden id={getConsentGroupIdenfier('description')} aria-hidden>
        {checkboxAriaDescription || text}
      </VisuallyHidden>
      <ul className={styles.list}>
        {groupList.map((group, index) => (
          <li key={group.title}>
            <ConsentGroup group={group} isRequired={isRequired} id={`${groupId}-${index}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConsentGroups;
