import React from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from './Checkbox';

(Checkbox as React.FC).displayName = 'Checkbox';

storiesOf('Checkbox', module).add('Checkbox', () => <Checkbox />);

storiesOf('Checkbox', module).add('Checkbox checked', () => <Checkbox checked>Checkbox</Checkbox>);

storiesOf('Checkbox', module).add('Checkbox disabled', () => <Checkbox disabled>Checkbox</Checkbox>);
