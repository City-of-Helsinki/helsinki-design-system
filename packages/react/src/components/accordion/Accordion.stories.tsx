import React from 'react';

import { IconAngleDown, IconAngleUp } from '../../icons';
import { Button } from '../button';
import { Card } from '../card';
import { Select } from '../../index';
import { Accordion, AccordionSize, AccordionProps } from './Accordion';
import { useAccordion } from './useAccordion';
import { hideStoryFromStorybook } from '../../utils/playWrightHelpers';
import { PlayWrightComponentHandler } from '../../utils/PlayWrightComponentHandler';

export default {
  component: Accordion,
  title: 'Components/Accordion',
  decorators: [(storyFn) => <div style={{ maxWidth: '480px' }}>{storyFn()}</div>],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    heading: 'How to publish data?',
    language: 'en',
    children: 'To publish your data, open your profile settings and click button "Publish".',
    style: { maxWidth: '360px' },
    'data-testid': 'hds-accordion',
  },
};

export const Default = (args: AccordionProps) => <Accordion {...args} />;

export const Small = (args: AccordionProps) => <Accordion {...args} size={AccordionSize.Small} />;

export const Medium = (args: AccordionProps) => <Accordion {...args} size={AccordionSize.Medium} />;

export const Large = (args: AccordionProps) => <Accordion {...args} size={AccordionSize.Large} />;

export const WithoutCloseButton = (args: AccordionProps) => <Accordion {...args} closeButton={false} />;
WithoutCloseButton.storyName = 'Without close button';

export const StackedAccordionCards = (args: AccordionProps) => (
  <>
    <h1>Stacked Accordions in Cards</h1>
    <Accordion {...args} card border style={{ maxWidth: '360px' }} />
    <Accordion {...args} card border style={{ maxWidth: '360px', borderTop: 0 }} data-testId="hds-accordion-2" />
    <Accordion {...args} card border style={{ maxWidth: '360px', borderTop: 0 }} data-testId="hds-accordion-3" />
  </>
);

StackedAccordionCards.storyName = 'Stacked cards';

export const InitiallyOpen = (args: AccordionProps) => <Accordion {...args} initiallyOpen />;
InitiallyOpen.storyName = 'Initially open';

export const CardAccordion = (args: AccordionProps) => (
  <>
    <h2>Card</h2>
    <Accordion {...args} card />
    <h2>Small card with border</h2>
    <Accordion {...args} card border size={AccordionSize.Small} data-testId="hds-accordion-2" />
    <h2>Medium card with border</h2>
    <Accordion {...args} card border size={AccordionSize.Medium} data-testId="hds-accordion-3" />
    <h2>Large card with border</h2>
    <Accordion {...args} card border size={AccordionSize.Large} data-testId="hds-accordion-4" />
  </>
);
CardAccordion.storyName = 'Card';
CardAccordion.args = {
  style: { marginBottom: 'var(--spacing-m)', maxWidth: '360px' },
};

export const CustomTheme = (args: AccordionProps) => (
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
        '--header-color': 'var(--color-black-90)',
        '--header-font-size': 'var(--fontsize-heading-l)',
        '--header-font-weight': '400',
        '--header-line-height': 'var(--lineheight-s)',
        '--header-letter-spacing': '-0.4px',
        '--content-color': 'var(--color-black-90)',
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
        '--header-outline-color-focus': 'var(--color-gold)',
        '--header-color': 'var(--color-white)',
        '--header-font-size': 'var(--fontsize-heading-s)',
        '--header-font-weight': '500',
        '--header-letter-spacing': '0.2px',
        '--header-line-height': '1.4',
        '--content-color': 'var(--color-white)',
        '--content-font-size': 'var(--fontsize-body-m)',
        '--content-line-height': 'var(--lineheight-l)',
        '--close-button-color-focus': 'var(--color-black)',
        '--close-button-background-color': 'orange',
        '--close-button-background-color-focus': 'var(--color-white)',
        '--close-button-outline-color-focus': 'var(--color-brick)',
      }}
      data-testId="hds-accordion-2"
    />
  </>
);
CustomTheme.storyName = 'Custom theme';
CustomTheme.args = {
  style: { marginBottom: 'var(--spacing-m)', maxWidth: '480px' },
};

export const CustomAccordion = () => {
  const { isOpen, buttonProps, contentProps } = useAccordion({ initiallyOpen: false });
  const icon = isOpen ? <IconAngleUp /> : <IconAngleDown />;
  return (
    <>
      <Button iconStart={icon} {...buttonProps}>
        Advanced filters
      </Button>
      <Card border aria-label="Advanced filters" style={{ marginTop: 'var(--spacing-m)' }} {...contentProps}>
        <Select
          multiSelect
          noTags
          texts={{
            language: 'en',
            label: 'Filter by event category',
            placeholder: 'No selected categories',
          }}
          onChange={() => undefined}
          options={[{ label: 'Culture & arts' }, { label: 'Sports' }, { label: 'Museums' }, { label: 'Music' }]}
          clearable={false}
        />
        <Select
          multiSelect
          noTags
          texts={{
            language: 'en',
            label: 'Filter by event location',
            placeholder: 'No selected locations',
          }}
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
          onChange={() => undefined}
          style={{ marginTop: 'var(--spacing-s)' }}
          clearable={false}
        />
      </Card>
    </>
  );
};
CustomAccordion.storyName = 'Custom accordion';
CustomAccordion.args = {};

export const PlayWrightOnly = (args: AccordionProps) => {
  return (
    <PlayWrightComponentHandler>
      <Accordion {...args} card />
    </PlayWrightComponentHandler>
  );
};

// does not work with current Storybook v6
hideStoryFromStorybook(PlayWrightOnly);
