import React from 'react';
import { storiesOf } from '@storybook/react';

import Koros from './Koros';

(Koros as React.FC).displayName = 'Koros';

storiesOf('Koros', module)
  .add('basic', () => <Koros />)
  .add('beat', () => <Koros type="beat" />)
  .add('pulse', () => <Koros type="pulse" />)
  .add('wave', () => <Koros type="wave" />)
  .add('storm', () => <Koros type="storm" />);
