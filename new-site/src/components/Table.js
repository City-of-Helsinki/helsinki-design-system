import React from 'react';

const Table = (props) => (
  <div className="hds-table-container docTable">
    <table className="hds-table hds-table--dark" aria-label="Service users (dark variant)">
      {props.children}
    </table>
  </div>
);

const Thead = (props) => {
  const rowWithClassName = {
    ...props.children,
    props: { ...props.children.props, className: 'hds-table__header-row' },
  };

  return <thead>{rowWithClassName}</thead>;
};

const Tbody = (props) => <tbody className="hds-table__content">{props.children}</tbody>;

const Th = (props) => <th scope="col">{props.children}</th>;

Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Th = Th;

export default Table;
