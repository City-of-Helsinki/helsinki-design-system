import React from 'react';
import { storiesOf } from '@storybook/react';

import Sidebar from './Sidebar';

(Sidebar as React.FC).displayName = 'Sidebar';

storiesOf('Sidebar', module).add('Sidebar', () => (
  <Sidebar>
    <div>one</div>
    <div>two</div>
  </Sidebar>
));
