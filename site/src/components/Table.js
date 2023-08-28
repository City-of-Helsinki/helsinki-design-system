import React, { isValidElement } from 'react';

const captionPrefix = '[';
const captionSuffix = ']';

const isCaption = (cellContent) =>
  typeof cellContent === 'string' && cellContent.startsWith(captionPrefix) && cellContent.endsWith(captionSuffix);

const resolveCaptionStrings = (captionString) => {
  const withoutSuffixes = captionString.replace(captionPrefix, '').replace(captionSuffix, '');
  return withoutSuffixes.split(':');
};

const Table = (props) => {
  // TableHead and body can't be identified by type.name because it doesn't exist in prod build.
  const thead = props.children[0];
  const tbody = props.children[1];
  const tbodyRows = tbody.props?.children || [];
  const rowsArray = Array.isArray(tbodyRows) ? tbodyRows : [tbodyRows];

  const [rows, captionString] = rowsArray
    .filter((child) => isValidElement(child))
    .reduce(
      (acc, row, i, arr) => {
        if ( i === arr.length - 1 && isCaption(row.props.children?.[0].props.children))
         {
          return [acc[0], row.props.children[0].props.children];
        } else {
          return [[...acc[0], row], acc[1]];
        }
      },
      [[], ''],
    );

  const tableChildrenWithoutCaption = [thead, { ...tbody, props: { ...tbody.props, children: rows } }];
  const [tableName, caption] = captionString ? resolveCaptionStrings(captionString) : [undefined, undefined];

  return (
    <div class="hds-table-container" tabindex="0">
      <table class="hds-table hds-table--dark" aria-label="Service users (dark variant)">
        {tableName && caption && (
          <caption className="hds-table__caption">
            <b>{tableName}</b>: {caption}
          </caption>
        )}
        {tableChildrenWithoutCaption}
      </table>
    </div>
  )
}

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
