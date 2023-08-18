import React from 'react';

const Table = (props) => <div class="hds-table-container" tabindex="0">
<table class="hds-table hds-table--dark" aria-label="Service users (dark variant)">{props.children}</table></div>

const TableHead = (props) => {
    const rowWithClassName = {
        ...props.children,
        props: { ...props.children.props, className: 'hds-table__header-row dark' },
    };
    return <thead>{rowWithClassName}</thead>;
};

const TableBody = (props) => <tbody class="hds-table__content">{props.children}</tbody>

const Th = (props) => <th scope="col">{props.children}</th>

Table.Head = TableHead;
Table.Body = TableBody;
Table.Th = Th;

export default Table;
