import React, { useMemo } from 'react';

import { Table } from '../../table/Table';
import { ConsentGroup, useCookieConsentTableData } from '../CookieConsentContext';
import styles from '../CookieConsent.module.scss';
import classNames from '../../../utils/classNames';

function ConsentGroupDataTable(props: { consents: ConsentGroup['consents']; id: string }): React.ReactElement {
  const tableHeadings = useCookieConsentTableData();
  const { consents, id } = props;
  const cols = useMemo(() => {
    return Object.entries(tableHeadings).map((entry) => {
      const [key, value] = entry;
      return {
        key,
        headerName: value,
      };
    });
  }, [tableHeadings]);

  const rows = useMemo(() => {
    return consents.map((consent) => {
      return consent;
    });
  }, [consents]);

  const theme = {
    '--header-background-color': 'var(--color-black)',
  };

  return (
    <div className={classNames(styles['data-table-container'])}>
      <Table
        id={id}
        data-testid={id}
        cols={cols}
        rows={rows}
        indexKey="id"
        renderIndexCol={false}
        theme={theme}
        dense
      />
    </div>
  );
}

export default ConsentGroupDataTable;
