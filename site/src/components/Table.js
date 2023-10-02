import React from 'react';

const Table = (props) => <div className="hds-table-container" tabIndex="0">
<table className="hds-table hds-table--dark" aria-label="Service users (dark variant)">{props.children}</table></div>

const TableHead = (props) => {
    const rowWithClassName = {
        ...props.children,
        props: { ...props.children.props, className: 'hds-table__header-row dark' },
    };
    return <thead>{rowWithClassName}</thead>;
};

const TableBody = (props) => <tbody className="hds-table__content">{props.children}</tbody>

const Th = (props) => <th scope="col">{props.children}</th>

Table.Head = TableHead;
Table.Body = TableBody;
Table.Th = Th;

export default Table;
