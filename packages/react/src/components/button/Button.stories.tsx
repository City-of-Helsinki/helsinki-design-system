import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './Button';
import { IconShare, IconAngleRight } from '../../icons';

(Button as React.FC).displayName = 'Button';

storiesOf('Button', module)
  .add('default', () => (
    <>
      <Button>Button</Button>
      <br />
      <br />
      <Button disabled>Button</Button>
      <br />
      <br />
      <Button size="small">Button</Button>
      <br />
      <br />
      <Button size="small" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button iconLeft={<IconShare />}>Button</Button>
      <br />
      <br />
      <Button iconRight={<IconAngleRight />}>Button</Button>
      <br />
      <br />
      <Button size="small" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button size="small" iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
    </>
  ))
  .add('full width', () => (
    <>
      <Button fullWidth>Button</Button>
      <br />
      <br />
      <Button fullWidth disabled>
        Button
      </Button>
      <br />
      <br />
      <Button fullWidth size="small">
        Button
      </Button>
      <br />
      <br />
      <Button fullWidth size="small" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button fullWidth iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button fullWidth iconRight={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button fullWidth iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button fullWidth size="small" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button fullWidth iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button fullWidth size="small" iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
    </>
  ))
  .add('secondary', () => (
    <>
      <Button color="secondary">Button</Button>
      <br />
      <br />
      <Button color="secondary" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button color="secondary" size="small">
        Button
      </Button>
      <br />
      <br />
      <Button color="secondary" size="small" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button color="secondary" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="secondary" size="small" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="secondary" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="secondary" size="small" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="secondary" iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="secondary" size="small" iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
    </>
  ))
  .add('tertiary', () => (
    <>
      <Button color="tertiary">Button</Button>
      <br />
      <br />
      <Button color="tertiary" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button color="tertiary" size="small">
        Button
      </Button>
      <br />
      <br />
      <Button color="tertiary" size="small" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button color="tertiary" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="tertiary" size="small" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="tertiary" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="tertiary" size="small" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="tertiary" iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="tertiary" size="small" iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
    </>
  ))
  .add('supplementary', () => (
    <>
      <Button color="supplementary">Button</Button>
      <br />
      <br />
      <Button color="supplementary" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button color="supplementary" size="small">
        Button
      </Button>
      <br />
      <br />
      <Button color="supplementary" size="small" disabled>
        Button
      </Button>
      <br />
      <br />
      <Button color="supplementary" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="supplementary" size="small" iconLeft={<IconShare />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="supplementary" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="supplementary" size="small" iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="supplementary" iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
      <br />
      <br />
      <Button color="supplementary" size="small" iconLeft={<IconShare />} iconRight={<IconAngleRight />}>
        Button
      </Button>
    </>
  ));
