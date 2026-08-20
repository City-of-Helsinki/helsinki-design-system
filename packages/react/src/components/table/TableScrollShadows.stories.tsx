/* eslint-disable react/forbid-component-props */
/**
 * Verification cases for the horizontal scroll shadows, collected into a single story.
 *
 * The story contains no styles of its own: everything comes from the shipped implementation, i.e.
 * the pseudo elements of the table container in hds-core, toggled by `useScrollShadows` in
 * TableContainer. The cases are the ones where the implementation can break, and each of them is
 * covered by `e2e/tests/react/components/react-table-scroll-shadows-spec.ts`. The `data-testid`
 * attributes are the hooks those tests use, so keep them in sync.
 *
 * The Core version drives the same shadows with a scroll timeline instead of JavaScript, and can
 * only be checked in the Core Storybook, in a browser that supports scroll-driven animations.
 */
import React from 'react';

import { Table } from './Table';

export default {
  component: Table,
  title: 'Components/Table',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

const wideCols = [
  { key: 'id', headerName: 'Id' },
  { key: 'firstName', headerName: 'First name' },
  { key: 'surname', headerName: 'Surname' },
  { key: 'profession', headerName: 'Profession' },
  { key: 'city', headerName: 'City of residence' },
  { key: 'email', headerName: 'Email address' },
  { key: 'phone', headerName: 'Phone number' },
  { key: 'started', headerName: 'Employment started' },
  { key: 'department', headerName: 'Department' },
];

const wideRows: Array<object> = [
  {
    id: 1000,
    firstName: 'Lauri',
    surname: 'Kekkonen',
    profession: 'Engineer',
    city: 'Helsinki',
    email: 'lauri.kekkonen@example.com',
    phone: '+358 40 123 4567',
    started: '1.3.2019',
    department: 'Urban environment',
  },
  {
    id: 1001,
    firstName: 'Maria',
    surname: 'Sarasoja',
    profession: 'Designer',
    city: 'Espoo',
    email: 'maria.sarasoja@example.com',
    phone: '+358 40 234 5678',
    started: '15.8.2012',
    department: 'Culture and leisure',
  },
  {
    id: 1002,
    firstName: 'Anneli',
    surname: 'Routa',
    profession: 'Meteorologist',
    city: 'Vantaa',
    email: 'anneli.routa@example.com',
    phone: '+358 40 345 6789',
    started: '2.1.2021',
    department: 'Education',
  },
];

const narrowCols = wideCols.slice(0, 3);

// Enough rows to also scroll vertically, with unique index keys.
const manyRows: Array<object> = Array.from({ length: 15 }, (unused, index) => ({
  ...wideRows[index % wideRows.length],
  id: 2000 + index,
}));

const textCols = [
  { key: 'id', headerName: 'Id' },
  { key: 'service', headerName: 'Service' },
  { key: 'description', headerName: 'Description' },
];

const textRows: Array<object> = [
  {
    id: 1,
    service: 'Early childhood education',
    description:
      'Applications for early childhood education are handled in the order they arrive, and the guardian is informed of the decision at least two weeks before the care starts.',
  },
  {
    id: 2,
    service: 'Building permits',
    description:
      'A building permit is required for construction, for extensions and for changes that affect the use of the building or the health of its users.',
  },
];

const Check = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section data-testid={id} style={{ marginBottom: 'var(--spacing-xl)', maxWidth: '640px' }}>
    <h2 style={{ fontSize: 'var(--fontsize-heading-xs)', margin: '0 0 var(--spacing-2-xs)' }}>{title}</h2>
    {children}
  </section>
);

const note = {
  color: 'var(--color-black-60)',
  fontSize: 'var(--fontsize-body-s)',
  margin: '0 0 var(--spacing-xs)',
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const ScrollShadowChecks = () => (
  <div>
    <Check id="check-shadows-at-edges" title="Shadows stay at the edges">
      <p style={note}>
        Scroll the table. The shadows have to stay at the edges of the container for the whole scroll range, and each
        one has to disappear when that end is reached. A shadow drifting with the content means the sticky elements are
        not spanning the scrolled content.
      </p>
      <Table cols={wideCols} rows={wideRows} indexKey="id" />
    </Check>

    <Check id="check-text-wraps" title="Long text still wraps">
      <p style={note}>
        The most important regression check. The table has to fit the container with the text wrapping, exactly as
        before the shadows were added. Text that stopped wrapping means the grid column is sizing itself to the content
        instead of the container.
      </p>
      <Table cols={textCols} rows={textRows} indexKey="id" renderIndexCol={false} />
    </Check>

    <Check id="check-narrow-table" title="A narrow table is stretched">
      <p style={note}>
        A table narrower than its container has to stretch to the full width and show no shadows at all.
      </p>
      <Table cols={narrowCols} rows={wideRows} indexKey="id" renderIndexCol={false} />
    </Check>

    <Check id="check-resizable" title="Shadows follow the container size">
      <p style={note}>
        Drag the bottom right corner. The shadows have to appear and disappear as the overflow changes, without
        scrolling. This is what the ResizeObserver in the hook is for.
      </p>
      <div style={{ overflow: 'hidden', resize: 'horizontal' }}>
        <Table cols={wideCols} rows={wideRows} indexKey="id" />
      </div>
    </Check>

    <Check id="check-vertical-scrolling" title="Scrolling in both directions">
      <p style={note}>
        The shadows have to cover the full height of the visible area while scrolling vertically, and stay at the edges
        while scrolling horizontally.
      </p>
      <div style={{ height: '200px' }}>
        <Table cols={wideCols} rows={manyRows} indexKey="id" zebra />
      </div>
    </Check>

    <Check id="check-variants" title="Variants and the focus outline">
      <p style={note}>
        Zebra, vertical lines, dense and the light variant: the shadow has to read well against every background. Tab to
        the table and check that the shadows do not cover the focus outline of the container.
      </p>
      <Table cols={wideCols} rows={wideRows} indexKey="id" zebra verticalLines dense variant="light" />
    </Check>
  </div>
);
