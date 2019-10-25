import React from 'react';
import { storiesOf } from '@storybook/react';

import HeaderWithWave from './HeaderWithWave';

(HeaderWithWave as React.FC).displayName = 'HeaderWithWave';

storiesOf('HeaderWithWave', module).add('HeaderWithWave', () => <HeaderWithWave headingText="HeaderWithWave" />);
