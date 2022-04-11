import React, { useMemo } from 'react';

import { ConsentGroup, TableData, useCookieConsentContent } from '../CookieConsentContext';
import styles from '../CookieConsent.module.scss';
import classNames from '../../../utils/classNames';

function ConsentGroupDataMobile(props: { consents: ConsentGroup['consents'] }): React.ReactElement {
  const content = useCookieConsentContent();
  const { consents } = props;
  const dataKeys = useMemo(() => {
    return Object.keys(content.texts.tableHeadings);
  }, []);

  const data: TableData[] = useMemo(() => {
    return consents.map((consent) => {
      return dataKeys.reduce((currentData, key) => {
        // eslint-disable-next-line no-param-reassign
        currentData[key] = consent[key];
        return currentData;
      }, {} as TableData);
    });
  }, [content.language.current]);

  const rowOrder: (keyof TableData)[] = ['name', 'hostName', 'path', 'description', 'expiration'];

  return (
    <div className={classNames(styles['data-mobile-container'], styles['visually-hidden-in-desktop'])} aria-hidden>
      <ul>
        {data.map((item) => {
          return (
            <li>
              {rowOrder.map((key) => {
                return (
                  <div>
                    <span role="heading">{content.texts.tableHeadings[key]}</span>
                    <span>{item[key]}</span>
                  </div>
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ConsentGroupDataMobile;
