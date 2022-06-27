import React from 'react';

const captionPrefix = '[';
const captionSuffix = ']';

const isCaption = (cellContent) =>
  typeof cellContent === 'string' && cellContent.startsWith(captionPrefix) && cellContent.endsWith(captionSuffix);

const resolveCaptionStrings = (captionString) => {
  const withoutSuffixes = captionString.replace(captionPrefix, '').replace(captionSuffix, '');
  return withoutSuffixes.split(':');
};

const Table = (props) => {
  const thead = (props.children || []).find(({ props }) => props.originalType === 'thead');
  const tbody = (props.children || []).find(({ props }) => props.originalType === 'tbody');
  const tbodyRows = tbody.props?.children || [];
  const [rows, captionString] = React.Children.toArray(tbodyRows).reduce(
    (acc, row, i, arr) => {
      if (
        i >= arr.length - 1 &&
        row.props.children &&
        row.props.children[0] &&
        isCaption(row.props.children[0].props.children)
      ) {
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
    <div className="hds-table-container doc-table">
      <table className="hds-table hds-table--dark" aria-label={caption} tabIndex="0">
        {tableName && caption && (
          <caption className="hds-table__caption">
            <b>{tableName}</b>: {caption}
          </caption>
        )}
        {tableChildrenWithoutCaption}
      </table>
    </div>
  );
};

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
