import React, { useContext } from 'react';

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
  const { title, text, groupList, groupId } = consentGroups;
  const checkboxProps = {
    onChange: isRequired ? () => undefined : () => onClick('approveOptional'),
    disabled: isRequired,
    checked: isRequired || allApproved,
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
      <p id={getConsentGroupIdenfier('description')}>{text}</p>
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
