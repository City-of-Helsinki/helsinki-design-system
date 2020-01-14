import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Expandable from './Expandable';

(Expandable as React.FC).displayName = 'Expandable';

storiesOf('Expandable', module).add('Expandable', () => (
  <div style={{ width: '150px' }}>
    <Expandable label="Expandable" onClick={action('click')}>
      child
    </Expandable>
  </div>
));
