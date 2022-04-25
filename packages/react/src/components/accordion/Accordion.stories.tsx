import React from 'react';

import { IconAngleDown, IconAngleUp } from '../../icons';
import { Button } from '../button';
import { Card } from '../card';
import { Select } from '../dropdown/select';
import { Accordion } from './Accordion';
import { useAccordion } from './useAccordion';

export default {
  component: Accordion,
  title: 'Components/Accordion',
  decorators: [(storyFn) => <div style={{ maxWidth: '480px' }}>{storyFn()}</div>],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    heading: 'How to publish data?',
    children: 'To publish your data, open your profile settings and click button "Publish".',
    style: { maxWidth: '360px' },
  },
};

export const Default = (args) => <Accordion {...args} />;

export const InitiallyOpen = (args) => <Accordion {...args} initiallyOpen />;
InitiallyOpen.storyName = 'Initially open';

export const CardAccordion = (args) => (
  <>
    <Accordion {...args} card />
    <Accordion {...args} card border />
  </>
);
CardAccordion.storyName = 'Card';
CardAccordion.args = {
  style: { marginBottom: 'var(--spacing-m)', maxWidth: '360px' },
};

export const CustomTheme = (args) => (
  <>
    <Accordion
      {...args}
      card
      border
      theme={{
        '--background-color': 'var(--color-white)',
        '--border-color': 'var(--color-brick)',
        '--padding-horizontal': 'var(--spacing-m)',
        '--padding-vertical': 'var(--spacing-m)',
        '--header-font-color': 'var(--color-black-90)',
        '--header-font-size': 'var(--fontsize-heading-l)',
        '--header-font-weight': '400',
        '--header-line-height': 'var(--lineheight-s)',
        '--header-letter-spacing': '-0.4px',
        '--button-size': '28px',
        '--button-border-color-hover': 'var(--color-coat-of-arms)',
        '--content-font-color': 'var(--color-black-90)',
        '--content-font-size': 'var(--fontsize-body-m)',
        '--content-line-height': 'var(--lineheight-l)',
      }}
    />
    <Accordion
      {...args}
      card
      style={{ maxWidth: '360px', marginTop: 'var(--spacing-s)' }}
      theme={{
        '--background-color': 'var(--color-bus)',
        '--padding-horizontal': 'var(--spacing-m)',
        '--padding-vertical': '20px',
        '--header-font-color': 'var(--color-white)',
        '--header-font-size': 'var(--fontsize-heading-s)',
        '--header-font-weight': '700',
        '--header-letter-spacing': '0.2px',
        '--header-line-height': '1.4',
        '--button-size': '28px',
        '--button-border-color-hover': 'var(--color-white)',
        '--content-font-color': 'var(--color-white)',
        '--content-font-size': 'var(--fontsize-body-m)',
        '--content-line-height': 'var(--lineheight-l)',
      }}
    />
  </>
);
CustomTheme.storyName = 'Custom theme';
CustomTheme.args = {
  style: { marginBottom: 'var(--spacing-m)', maxWidth: '480px' },
};

export const CustomAccordion = () => {
  const { isOpen, buttonProps, contentProps } = useAccordion({ initiallyOpen: false });
  const icon = isOpen ? <IconAngleUp aria-hidden /> : <IconAngleDown aria-hidden />;
  return (
    <>
      <Button iconLeft={icon} {...buttonProps}>
        Advanced filters
      </Button>
      <Card border aria-label="Advanced filters" style={{ marginTop: 'var(--spacing-m)' }} {...contentProps}>
        <Select
          multiselect
          label="Filter by event category"
          placeholder="No selected categories"
          options={[{ label: 'Culture & arts' }, { label: 'Sports' }, { label: 'Museums' }, { label: 'Music' }]}
          clearButtonAriaLabel="Clear all selections"
          selectedItemRemoveButtonAriaLabel="Remove"
        />
        <Select
          multiselect
          label="Filter by event location"
          placeholder="No selected locations"
          options={[
            { label: 'Haaga' },
            { label: 'Herttoniemi' },
            { label: 'Kallio' },
            { label: 'Kamppi' },
            { label: 'Laajasalo' },
            { label: 'Lauttasaari' },
            { label: 'Mellunkylä' },
            { label: 'Pasila' },
          ]}
          clearButtonAriaLabel="Clear all selections"
          selectedItemRemoveButtonAriaLabel="Remove"
          style={{ marginTop: 'var(--spacing-s)' }}
        />
      </Card>
    </>
  );
};
CustomAccordion.storyName = 'Custom accordion';
CustomAccordion.args = {};
