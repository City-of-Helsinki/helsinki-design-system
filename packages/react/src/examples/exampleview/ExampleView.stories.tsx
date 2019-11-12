import React from 'react';
import { storiesOf } from '@storybook/react';

import { Section } from '../..';

const ExampleView = () => (
  <>
    <Section color="secondary" koros="basic">
      <h1>Lorem ipsum dolor sit</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi
        consequat.
      </p>
    </Section>
    <img src="https://picsum.photos/id/689/1440/720" alt="" style={{ display: 'block', width: '100%' }} />
    <Section>
      <h2>Lorem ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi
        consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi
        consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </Section>
  </>
);

storiesOf('ExampleView', module).add('ExampleView', () => <ExampleView />);
