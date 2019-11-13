import React from 'react';
import { storiesOf } from '@storybook/react';

import ImageWithCard from './ImageWithCard';
import imageFile from '../../assets/img/placeholder_1920x1080.jpg';

(ImageWithCard as React.FC).displayName = 'ImageWithCard';

const content = (
  <>
    <h2>Lorem ipsum</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi
      consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint obcaecat cupiditat non proident.
    </p>
  </>
);

storiesOf('ImageWithCard', module)
  .add('default', () => (
    <ImageWithCard color="primary" src={imageFile}>
      <h2>Lorem ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi
        consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint obcaecat cupiditat non proident.
      </p>
    </ImageWithCard>
  ))
  .add('split', () => (
    <ImageWithCard color="primary" cardLayout="split" src={imageFile}>
      {content}
    </ImageWithCard>
  ))
  .add('split fullWidth', () => (
    <ImageWithCard color="tertiary" cardAlignment="right" cardLayout="split" fullWidth src={imageFile}>
      {content}
    </ImageWithCard>
  ))
  .add('hover', () => (
    <ImageWithCard color="primary" cardLayout="hover" src={imageFile}>
      {content}
    </ImageWithCard>
  ))
  .add('hover fullWidth', () => (
    <ImageWithCard color="secondary" cardAlignment="right" cardLayout="hover" fullWidth src={imageFile}>
      {content}
    </ImageWithCard>
  ));
