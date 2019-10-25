import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from './Button';

(Button as React.FC).displayName = 'Button';

storiesOf('Button', module).add('Button', () => <Button>Button</Button>);
