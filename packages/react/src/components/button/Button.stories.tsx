import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './Button';

(Button as React.FC).displayName = 'Button';

storiesOf('Button', module)
  .add('default', () => <Button>Butgjon</Button>)
  .add('secondary', () => <Button color="secondary">Butgjon</Button>)
  .add('tertiary', () => <Button color="tertiary">Butgjon</Button>)
  .add('supplementary', () => <Button color="supplementary">Butgjon</Button>)
  .add('default small', () => <Button size="small">Butgjon</Button>)
  .add('secondary small', () => (
    <Button size="small" color="secondary">
      Butgjon
    </Button>
  ))
  .add('tertiary small', () => (
    <Button size="small" color="tertiary">
      Butgjon
    </Button>
  ))
  .add('supplementary small', () => (
    <Button size="small" color="supplementary">
      Butgjon
    </Button>
  ))
  .add('default disabled', () => <Button disabled>Butgjon</Button>)
  .add('secondary disabled', () => (
    <Button disabled color="secondary">
      Butgjon
    </Button>
  ))
  .add('tertiary disabled', () => (
    <Button disabled color="tertiary">
      Butgjon
    </Button>
  ))
  .add('supplementary disabled', () => (
    <Button disabled color="supplementary">
      Butgjon
    </Button>
  ))
  .add('default small disabled', () => (
    <Button size="small" disabled>
      Butgjon
    </Button>
  ))
  .add('secondary small disabled', () => (
    <Button color="secondary" size="small" disabled>
      Butgjon
    </Button>
  ))
  .add('tertiary small disabled', () => (
    <Button color="tertiary" size="small" disabled>
      Butgjon
    </Button>
  ))
  .add('supplementary small disabled', () => (
    <Button color="supplementary" size="small" disabled>
      Butgjon
    </Button>
  ));
