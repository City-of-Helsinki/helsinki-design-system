import React from 'react';
import { Props, Title } from '@storybook/addon-docs/dist/blocks';
import { radios, text } from '@storybook/addon-knobs';

import Section from './Section';
import imageFile from '../../assets/img/placeholder_1920x1080.jpg';

const placeholderTitle = 'Lorem ipsum';
const placeholderText =
  'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.';
const placeholderImg = <img src={imageFile} alt="" style={{ display: 'block', width: '100%' }} />;

export default {
  component: Section,
  title: 'Components/Section',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <Props />
        </>
      ),
    },
  },
};

export const Plain = () => (
  <Section>
    <h1>{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);

export const Primary = () => (
  <Section color="primary">
    <h1>{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);

export const Secondary = () => (
  <Section color="secondary">
    <h1>{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);

export const Tertiary = () => (
  <Section color="tertiary">
    <h1>{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);

export const WithKoros = () => (
  <Section color="primary" korosType="basic">
    <h1>{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);

WithKoros.story = {
  name: 'With koros',
};

export const Multiple = () => (
  <>
    <Section color="secondary" korosType="basic">
      <h1>{placeholderTitle}</h1>
      {placeholderText}
    </Section>
    {placeholderImg}
    <Section color="primary">
      <h2>No Koros</h2>
      This section does not have any koros.
    </Section>
    <Section korosType="pulse">
      <h2>Pulse</h2>
      {placeholderText}
    </Section>
    <Section color="secondary">Secondary non-koros section</Section>
    <Section color="tertiary" korosType="beat">
      <h2>secondary Beat</h2>
      {placeholderText}
    </Section>
    <Section />
    <Section color="secondary" korosType="wave">
      <h2>Wave</h2>
      {placeholderText}
    </Section>
    <Section />
    <Section color="primary" korosType="beat">
      <h2>primary Beat</h2>
      {placeholderText}
    </Section>
    <Section color="tertiary" />
    <Section color="secondary" korosType="storm">
      <h2>Storm</h2>
      {placeholderText}
    </Section>
    <Section>This section has neither a heading or a koros.</Section>
  </>
);

Multiple.story = {
  name: 'Multiple sections',
};

export const Playground = () => {
  const sectionTitle = text('Title', placeholderTitle);
  const sectionText = text('Text', placeholderText);
  const color = radios(
    'Color',
    { plain: 'plain', primary: 'primary', secondary: 'secondary', tertiary: 'tertiary' },
    'plain',
  );
  const korosType = radios(
    'Koros',
    { none: null, basic: 'basic', beat: 'beat', pulse: 'pulse', wave: 'wave', storm: 'storm' },
    null,
  );

  return (
    <Section color={color} korosType={korosType}>
      <h1>{sectionTitle}</h1>
      <p>{sectionText}</p>
    </Section>
  );
};

Playground.story = {
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    docs: {
      disable: true,
    },
  },
};
