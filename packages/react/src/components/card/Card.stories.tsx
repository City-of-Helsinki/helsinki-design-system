import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from './Card';

(Card as React.FC).displayName = 'Card';

storiesOf('Card', module).add('Card', () => <Card title="Title">Lorem ipsum</Card>);
