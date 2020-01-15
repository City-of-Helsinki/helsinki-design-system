import React from 'react';
import { storiesOf } from '@storybook/react';

import Text from './Text';

(Text as React.FC).displayName = 'Text';

storiesOf('Text', module).add('Variations', () => (
  <>
    <Text>default</Text>
    <br />
    <Text bold>bold</Text>
    <br />
    <Text italic>italic</Text>
    <br />
    <Text color="brand">branded</Text>
    <br />
    <Text color="critical">critical</Text>
    <br />
    <Text color="secondary">secondary</Text>
  </>
));

storiesOf('Text', module).add('Semantics', () => (
  <>
    <Text as="h1">Heading 1</Text>
    <br />
    <Text as="h2">Heading 2</Text>
    <br />
    <Text as="h3">Heading 3</Text>
    <br />
    <Text as="h4">Heading 4</Text>
    <br />
    <Text as="h5">Heading 5</Text>
    <br />
    <Text as="h6">Heading 6</Text>
    <hr />
    <Text as="strong">strong</Text>
    <br />
    <Text as="em">emphasized</Text>
    <br />
  </>
));

storiesOf('Text', module).add('Sizes', () => (
  <>
    <Text size="xxxl">Lorem ipsum</Text>
    <br />
    <Text size="xxl">Lorem ipsum</Text>
    <br />
    <Text size="xl">Lorem ipsum</Text>
    <br />
    <Text size="l">Lorem ipsum</Text>
    <br />
    <Text size="m">Lorem ipsum</Text>
    <br />
    <Text size="s">Lorem ipsum</Text>
    <br />
    <Text size="xs">Lorem ipsum</Text>
  </>
));
