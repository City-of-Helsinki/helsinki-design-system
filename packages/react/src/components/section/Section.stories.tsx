import React from 'react';
import { storiesOf } from '@storybook/react';

import Section from './Section';

(Section as React.FC).displayName = 'Section';

const placeholderText = (
  <>
    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.
  </>
);

const placeholderImg = (
  <img src="https://picsum.photos/id/689/1440/720" alt="" theme={{ display: 'block', width: '100%' }} />
);

storiesOf('Section', module)
  .add('primary', () => (
    <Section>
      <h1>Lorem Ipsum</h1>
      {placeholderText}
    </Section>
  ))
  .add('primary with koros', () => (
    <>
      <Section koros="basic">
        <h1>Lorem Ipsum</h1>
        {placeholderText}
      </Section>
      {placeholderImg}
    </>
  ))
  .add('secondary', () => (
    <Section theme="secondary">
      <h1>Lorem Ipsum</h1>
      {placeholderText}
    </Section>
  ))
  .add('secondary with koros', () => (
    <>
      {placeholderImg}
      <Section theme="secondary" koros="basic">
        <h1>Lorem Ipsum</h1>
        {placeholderText}
      </Section>
    </>
  ))
  .add('multiple sections', () => (
    <>
      <Section theme="secondary" koros="basic">
        <h1>Lorem Ipsum</h1>
        {placeholderText}
      </Section>
      {placeholderImg}
      <Section koros="pulse">
        <h2>Pulse</h2>
        {placeholderText}
      </Section>
      <Section theme="primary">
        <h2>No Koros</h2>
        This section does not have any koros.
      </Section>
      <Section />
      <Section theme="tertiary" koros="beat">
        <h2>secondary Beat</h2>
        {placeholderText}
      </Section>
      <Section />
      <Section theme="secondary" koros="wave">
        <h2>Wave</h2>
        {placeholderText}
      </Section>
      <Section />
      <Section theme="primary" koros="beat">
        <h2>primary Beat</h2>
        {placeholderText}
      </Section>
      <Section theme="tertiary" />
      <Section theme="secondary" koros="storm">
        <h2>Storm</h2>
        {placeholderText}
      </Section>
      <Section>This section has neither a heading or a koros.</Section>
    </>
  ));
