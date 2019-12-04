import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './Button';

(Button as React.FC).displayName = 'Button';

storiesOf('Button', module)
  .add('default', () => <Button>Button</Button>)
  .add('secondary', () => <Button color="secondary">Button</Button>)
  .add('tertiary', () => <Button color="tertiary">Button</Button>)
  .add('supplementary', () => <Button color="supplementary">Button</Button>)
  .add('default small', () => <Button size="small">Button</Button>)
  .add('secondary small', () => (
    <Button size="small" color="secondary">
      Button
    </Button>
  ))
  .add('tertiary small', () => (
    <Button size="small" color="tertiary">
      Button
    </Button>
  ))
  .add('supplementary small', () => (
    <Button size="small" color="supplementary">
      Button
    </Button>
  ))
  .add('default disabled', () => <Button disabled>Button</Button>)
  .add('secondary disabled', () => (
    <Button disabled color="secondary">
      Button
    </Button>
  ))
  .add('tertiary disabled', () => (
    <Button disabled color="tertiary">
      Button
    </Button>
  ))
  .add('supplementary disabled', () => (
    <Button disabled color="supplementary">
      Button
    </Button>
  ))
  .add('default small disabled', () => (
    <Button size="small" disabled>
      Button
    </Button>
  ))
  .add('secondary small disabled', () => (
    <Button color="secondary" size="small" disabled>
      Button
    </Button>
  ))
  .add('tertiary small disabled', () => (
    <Button color="tertiary" size="small" disabled>
      Button
    </Button>
  ))
  .add('supplementary small disabled', () => (
    <Button color="supplementary" size="small" disabled>
      Button
    </Button>
  ));
