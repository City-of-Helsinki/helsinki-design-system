import React from "react"

import { Link, Table } from 'hds-react';
import { IconCheckCircleFill } from 'hds-react';

const cols = [
  { key: 'package', headerName: 'Package' },
  { key: 'included', headerName: 'Included' },
  { key: 'linkToStorybook', headerName: 'Storybook link' },
  { key: 'linkToSource', headerName: 'Source link' },
];

const rows = [
  { package: <b>HDS React</b>, included: <div><IconCheckCircleFill /> <span>Yes</span></div>, linkToStorybook: <Link size="M" external href="https://hds.hel.fi/storybook/react/?path=/story/components-button--primary">View in Storybook</Link>, linkToSource: <Link size="M" external href="https://github.com/City-of-Helsinki/helsinki-design-system/tree/master/packages/react/src/components/button">View source</Link> },
  { package: <b>HDS Core</b>, included: <div><IconCheckCircleFill /> <span>Yes</span></div>, linkToStorybook: <Link size="M" external href="https://hds.hel.fi/storybook/core/?path=/story/components-button--primary">View in Storybook</Link>, linkToSource: <Link size="M" external href="https://github.com/City-of-Helsinki/helsinki-design-system/tree/master/packages/core/src/components/button">View source</Link> },
];

export default function PackageTable() {
  return (
    <Table cols={cols} rows={rows} indexKey="id" renderIndexCol={false} />
  );
}