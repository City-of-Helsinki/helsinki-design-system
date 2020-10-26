import React from 'react';
import { ArgsTable, Title } from '@storybook/addon-docs/blocks';
import { radios, text } from '@storybook/addon-knobs';

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
    <h1 style={{ fontSize: 'var(--fontsize-heading-xl)' }}>{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);

export const Primary = () => (
  <Section color="primary">
    <h1 style={{ fontSize: 'var(--fontsize-heading-xl)' }}>{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);

export const Secondary = () => (
  <Section color="secondary">
    <h1 style={{ fontSize: 'var(--fontsize-heading-xl)' }}>{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);

export const Tertiary = () => (
  <Section color="tertiary">
    <h1 style={{ fontSize: 'var(--fontsize-heading-xl)' }}>{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);

export const WithKoros = () => (
  <Section color="primary" korosType="basic">
    <h1 style={{ fontSize: 'var(--fontsize-heading-xl)' }}>{placeholderTitle}</h1>
    {placeholderText}
  </Section>
);
WithKoros.storyName = 'With koros';

export const Multiple = () => (
  <>
    <Section color="secondary" korosType="basic">
      <h1 style={{ fontSize: 'var(--fontsize-heading-xl)' }}>{placeholderTitle}</h1>
      {placeholderText}
    </Section>
    {placeholderImg}
    <Section color="primary">
      <h2 style={{ fontSize: 'var(--fontsize-heading-l)' }}>No Koros</h2>
      This section does not have any koros.
    </Section>
    <Section korosType="pulse">
      <h2 style={{ fontSize: 'var(--fontsize-heading-l)' }}>Pulse</h2>
      {placeholderText}
    </Section>
    <Section color="secondary">Secondary non-koros section</Section>
    <Section color="tertiary" korosType="beat">
      <h2 style={{ fontSize: 'var(--fontsize-heading-l)' }}>secondary Beat</h2>
      {placeholderText}
    </Section>
    <Section />
    <Section color="secondary" korosType="wave">
      <h2 style={{ fontSize: 'var(--fontsize-heading-l)' }}>Wave</h2>
      {placeholderText}
    </Section>
    <Section />
    <Section color="primary" korosType="beat">
      <h2 style={{ fontSize: 'var(--fontsize-heading-l)' }}>primary Beat</h2>
      {placeholderText}
    </Section>
    <Section color="tertiary" />
    <Section color="secondary" korosType="storm">
      <h2 style={{ fontSize: 'var(--fontsize-heading-l)' }}>Storm</h2>
      {placeholderText}
    </Section>
    <Section>This section has neither a heading or a koros.</Section>
  </>
);
Multiple.storyName = 'Multiple sections';

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
      <h1 style={{ fontSize: 'var(--fontsize-heading-xl)' }}>{sectionTitle}</h1>
      {sectionText}
    </Section>
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
