import React from 'react';
import { ArgsTable, Title } from '@storybook/addon-docs/blocks';

import { Section } from './Section';
import imageFile from '../../assets/img/placeholder_1920x1080.jpg';

const placeholderTitle = 'Lorem ipsum';
const placeholderText =
  'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.';
const placeholderImg = <img src={imageFile} alt="" style={{ display: 'block', width: '100%' }} />;

export default {
  component: Section,
  title: 'Components/Section',
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <ArgsTable />
        </>
      ),
    },
  },
};

export const Plain = () => (
  <Section>
    <h1 className="heading-xl">{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);

export const Primary = () => (
  <Section color="primary">
    <h1 className="heading-xl">{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);

export const Secondary = () => (
  <Section color="secondary">
    <h1 className="heading-xl">{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);

export const Tertiary = () => (
  <Section color="tertiary">
    <h1 className="heading-xl">{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);

export const WithKoros = () => (
  <Section color="primary" korosType="basic">
    <h1 className="heading-xl">{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);
WithKoros.storyName = 'With koros';

export const Multiple = () => (
  <>
    <Section color="secondary" korosType="basic">
      <h1 className="heading-xl">{placeholderTitle}</h1>
      {placeholderText}
    </Section>
    {placeholderImg}
    <Section color="primary">
      <h2 className="heading-l">No Koros</h2>
      This section does not have any koros.
    </Section>
    <Section korosType="pulse">
      <h2 className="heading-l">Pulse</h2>
      {placeholderText}
    </Section>
    <Section color="secondary">Secondary non-koros section</Section>
    <Section color="tertiary" korosType="beat">
      <h2 className="heading-l">secondary Beat</h2>
      {placeholderText}
    </Section>
    <Section />
    <Section color="secondary" korosType="vibration">
      <h2 className="heading-l">Vibration</h2>
      {placeholderText}
    </Section>
    <Section />
    <Section color="primary" korosType="beat">
      <h2 className="heading-l">primary Beat</h2>
      {placeholderText}
    </Section>
    <Section color="tertiary" />
    <Section color="secondary" korosType="wave">
      <h2 className="heading-l">Wave</h2>
      {placeholderText}
    </Section>
    <Section>This section has neither a heading or a koros.</Section>
  </>
);
Multiple.storyName = 'Multiple sections';

export const Playground = (args) => (
  <Section color={args.color} korosType={args.korosType}>
    <h1 className="heading-xl">{args.sectionTitle}</h1>
    {args.sectionText}
  </Section>
);

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

Playground.args = {
  sectionTitle: placeholderTitle,
  sectionText: placeholderText,
  korosType: null,
  color: 'plain',
};

Playground.argTypes = {
  korosType: {
    options: [null, 'basic', 'beat', 'pulse', 'vibration', 'wave'],
    control: { type: 'radio' },
  },
  color: {
    options: ['plain', 'primary', 'secondary', 'tertiary'],
  },
};
