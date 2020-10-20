import React from 'react';
import { Placement } from '@popperjs/core';
import { boolean, radios, text, withKnobs } from '@storybook/addon-knobs';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { Tooltip } from './Tooltip';

export default {
  component: Tooltip,
  title: 'Components/Tooltip',
  decorators: [withKnobs],
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <ArgsTable />
          <Stories title="Examples" includePrimary />
        </>
      ),
    },
  },
};

const placements: Placement[] = [
  'auto',
  'auto-start',
  'auto-end',
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
];

export const Regular = () => (
  <>
    <div>Scroll down and right to see examples.</div>
    <div
      style={{
        paddingBottom: '90vh',
        paddingTop: '90vh',
        paddingRight: '90vw',
        paddingLeft: '90vw',
      }}
    >
      {placements.map((placement) => (
        <Tooltip key={placement} placement={placement}>
          Placement: {placement}. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore.
        </Tooltip>
      ))}
    </div>
  </>
);

export const Small = () => (
  <>
    <div>Scroll down and right to see examples.</div>
    <div
      style={{
        paddingBottom: '90vh',
        paddingTop: '90vh',
        paddingRight: '90vw',
        paddingLeft: '90vw',
      }}
    >
      {placements.map((placement) => (
        <Tooltip key={placement} placement={placement} small>
          Placement: {placement}.
        </Tooltip>
      ))}
    </div>
  </>
);

export const Playground = () => {
  const placement = radios(
    'Placement',
    {
      auto: 'auto',
      'auto-start': 'auto-start',
      'auto-end': 'auto-end',
      top: 'top',
      bottom: 'bottom',
      right: 'right',
      left: 'left',
      'top-start': 'top-start',
      'top-end': 'top-end',
      'bottom-start': 'bottom-start',
      'bottom-end': 'bottom-end',
      'right-start': 'right-start',
      'right-end': 'right-end',
      'left-start': 'left-start',
      'left-end': 'left-end',
    },
    'auto',
  );

  const small = boolean('Small', false);
  const buttonLabel = text('Button aria-label', 'Tooltip');
  const tooltipLabel = text('Tooltip aria-label', 'Tooltip');
  const tooltipContent = text(
    'Tooltip content',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
  );

  return (
    <>
      <div>Scroll down and right to see the tooltip.</div>
      <div
        style={{
          paddingBottom: '90vh',
          paddingTop: '90vh',
          paddingRight: '90vw',
          paddingLeft: '90vw',
        }}
      >
        <Tooltip placement={placement} small={small} buttonLabel={buttonLabel} tooltipLabel={tooltipLabel}>
          {tooltipContent}
        </Tooltip>
      </div>
    </>
  );
};
Playground.parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    disable: true,
  },
};
