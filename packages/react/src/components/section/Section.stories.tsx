import React from 'react';
import { storiesOf } from '@storybook/react';

import Section from './Section';
import imageFile from '../../assets/img/placeholder_1920x1080.jpg';

(Section as React.FC).displayName = 'Section';

const placeholderText = (
  <>
    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.
  </>
);

const placeholderImg = <img src={imageFile} alt="" style={{ display: 'block', width: '100%' }} />;

storiesOf('Section', module)
  .add('primary', () => (
    <Section>
      <h1>Lorem Ipsum</h1>
      {placeholderText}
    </Section>
  ))
  .add('primary with koros', () => (
    <>
      <Section korosType="basic">
        <h1>Lorem Ipsum</h1>
        {placeholderText}
      </Section>
      {placeholderImg}
    </>
  ))
  .add('secondary', () => (
    <Section color="secondary">
      <h1>Lorem Ipsum</h1>
      {placeholderText}
    </Section>
  ))
  .add('secondary with koros', () => (
    <>
      {placeholderImg}
      <Section color="secondary" korosType="basic">
        <h1>Lorem Ipsum</h1>
        {placeholderText}
      </Section>
    </>
  ))
  .add('multiple sections', () => (
    <>
      <Section color="secondary" korosType="basic">
        <h1>Lorem Ipsum</h1>
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
  ));
