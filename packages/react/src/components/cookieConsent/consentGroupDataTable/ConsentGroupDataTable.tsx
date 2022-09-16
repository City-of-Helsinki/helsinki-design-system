import React, { useMemo } from 'react';

import { Table } from '../../table/Table';
import { CookieGroup, useTableData } from '../contexts/ContentContext';
import styles from '../CookieConsent.module.scss';
import classNames from '../../../utils/classNames';

export function ConsentGroupDataTable(props: { consents: CookieGroup['cookies']; id: string }): React.ReactElement {
  const tableHeadings = useTableData();
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
    '--header-background-color': 'var(--color-black-90)',
  };

  return (
    <div className={classNames(styles.dataTableContainer)}>
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
