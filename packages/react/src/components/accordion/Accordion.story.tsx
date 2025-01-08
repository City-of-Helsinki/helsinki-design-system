import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Accordion, AccordionSize } from './Accordion';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    // variants: {
    //   enable: true,
    //   include: ['size', 'variant', 'disabled'],
    // },
  },
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      control: 'text',
    },
    size: {
      options: Object.values(AccordionSize),
      control: { type: 'radio' },
    },
    border: {
      control: 'boolean',
    },
    card: {
      control: 'boolean',
    },
    closeButton: {
      control: 'boolean',
    },
    heading: {
      control: 'text',
    },
    initiallyOpen: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Accordion content',
    heading: 'Accordion heading',
    border: false,
    card: false,
    closeButton: true,
    size: AccordionSize.Medium,
    initiallyOpen: false,
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Small: Story = {
  render: (args) => {
    return <Accordion {...args} />;
  },
};

export const Medium: Story = {
  args: {
    children: 'Accordion content',
    heading: 'Accordion heading',
    size: AccordionSize.Medium,
  },
  render: (args) => {
    return <Accordion {...args} />;
  },
};

export const Large: Story = {
  args: {
    children: 'Accordion content',
    heading: 'Accordion heading',
    size: AccordionSize.Large,
  },
  render: (args) => {
    return <Accordion {...args} />;
  },
};

export const WithoutCloseButton: Story = {
  args: {
    children: 'Accordion content',
    heading: 'Accordion heading',
    closeButton: false,
  },
  render: (args) => {
    return <Accordion {...args} />;
  },
};

export const StackedAccordionCards: Story = {
  args: {
    children: 'Accordion content',
    heading: 'Accordion heading',
    card: true,
    border: true,
  },
  render: (args) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Stacked Accordions in Cards</h1>
        <Accordion {...args} style={{ maxWidth: '360px' }} />
        <Accordion {...args} style={{ maxWidth: '360px', borderTop: 0 }} />
        <Accordion {...args} style={{ maxWidth: '360px', borderTop: 0 }} />
      </div>
    );
  },
};

export const InitiallyOpen: Story = {
  args: {
    children: 'Accordion content',
    heading: 'Accordion heading',
    initiallyOpen: true,
  },
  render: (args) => {
    return <Accordion {...args} />;
  },
};

export const CardAccordion: Story = {
  args: {
    children: 'Accordion content',
    heading: 'Accordion heading',
    card: true,
  },
  render: (args) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Card</h2>
        <Accordion {...args} />
        <h2>Medium card with border</h2>
        <Accordion {...args} card border size={AccordionSize.Medium} />
      </div>
    );
  },
};
