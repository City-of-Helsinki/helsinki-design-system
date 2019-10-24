import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from './HeaderWithWave';

(Header as React.FC).displayName = 'HeaderWithWave';

storiesOf('Header', module).add('Header With Wave', () => <Header headingText="Otsikko" />);
