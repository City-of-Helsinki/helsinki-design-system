import React from 'react';
import { storiesOf } from '@storybook/react';

import Section from './Section';

(Section as React.FC).displayName = 'Section';

const placeholderText = (
  <>
    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.
  </>
);

const placeholderImg = <img src="https://picsum.photos/id/689/1440/480" alt="" style={{ display: 'block' }} />;

storiesOf('Section', module)
  .add('default', () => (
    <Section>
      <h1>Lorem Ipsum</h1>
      {placeholderText}
    </Section>
  ))
  .add('default with koros', () => (
    <>
      <Section koros="basic">
        <h1>Lorem Ipsum</h1>
        {placeholderText}
      </Section>
      {placeholderImg}
    </>
  ))
  .add('alternative', () => (
    <Section alternative>
      <h1>Lorem Ipsum</h1>
      {placeholderText}
    </Section>
  ))
  .add('alternative with koros', () => (
    <>
      {placeholderImg}
      <Section alternative koros="basic">
        <h1>Lorem Ipsum</h1>
        {placeholderText}
      </Section>
    </>
  ))
  .add('multiple sections', () => (
    <>
      <Section alternative koros="basic">
        <h1>Lorem Ipsum</h1>
        {placeholderText}
      </Section>
      {placeholderImg}
      <Section koros="pulse">
        <h2>Pulse</h2>
        {placeholderText}
      </Section>
      <Section alternative />
      <Section koros="storm">
        <h2>Storm</h2>
        {placeholderText}
      </Section>
      <Section alternative />
      <Section koros="wave">
        <h2>Wave</h2>
        {placeholderText}
      </Section>
      <Section alternative />
      <Section koros="beat">
        <h2>Default Beat</h2>
        {placeholderText}
      </Section>
      <Section alternative />
      <Section />
      <Section alternative koros="beat">
        <h2>Alternative Beat</h2>
        {placeholderText}
      </Section>
      <Section>This section has neither a heading or a koros.</Section>
    </>
  ));
