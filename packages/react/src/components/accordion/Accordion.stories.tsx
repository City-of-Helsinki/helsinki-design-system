import React from 'react';

import { IconAngleDown, IconAngleUp } from '../../icons';
import { Button } from '../button';
import { Card } from '../card';
import { Accordion } from './Accordion';
import { useAccordion } from './useAccordion';

export default {
  component: Accordion,
  title: 'Components/Accordion',
  decorators: [(storyFn) => <div style={{ maxWidth: '360px' }}>{storyFn()}</div>],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    heading: 'How to publish data?',
    children: 'To publish your data, open your profile settings and click buttton "Publish".',
  },
};

export const Default = (args) => <Accordion {...args} />;

export const CardAccordion = (args) => (
  <>
    <Accordion {...args} card />
    <Accordion {...args} card border />
    <Accordion
      {...args}
      card
      border
      theme={{
        '--background-color': 'var(--color-white)',
        '--border-color': 'var(--color-coat-of-arms)',
        '--padding-horizontal': 'var(--spacing-m)',
        '--padding-vertical': 'var(--spacing-m)',
        '--header-font-color': 'var(--color-black-90)',
        '--header-font-size': 'var(--fontsize-heading-m)',
        '--header-line-height': 'var(--lineheight-m)',
        '--button-size': '28px',
        '--button-border-color-hover': 'var(--color-coat-of-arms)',
        '--content-font-size': 'var(--fontsize-body-m)',
        '--content-line-height': 'var(--lineheight-l)',
      }}
    />
  </>
);
CardAccordion.storyName = 'Card';
CardAccordion.args = {
  style: { marginBottom: 'var(--spacing-m)' },
};

export const Custom = () => {
  const { isOpen, buttonProps, contentProps } = useAccordion({ initiallyOpen: false });

  const icon = isOpen ? <IconAngleUp aria-hidden /> : <IconAngleDown aria-hidden />;

  return (
    <>
      <Button iconLeft={icon} {...buttonProps}>
        Advanced filters
      </Button>
      <Card border aria-label="Advanced filters" style={{ marginTop: '20px' }} {...contentProps}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolorem dolore libero hic culpa nisi et ipsam in
        voluptatibus, iste numquam repellendus officia quam repudiandae animi aspernatur sint fugiat excepturi!
      </Card>
    </>
  );
};
Custom.args = {};
