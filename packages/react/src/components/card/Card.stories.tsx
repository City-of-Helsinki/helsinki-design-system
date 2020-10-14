import React from 'react';
import { ArgsTable, Stories, Title } from '@storybook/addon-docs/blocks';

import { Card } from './Card';
import { Button } from '../button';

export default {
  component: Card,
  title: 'Components/Card',
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <ArgsTable />
          <Stories title="Examples" includePrimary />
        </>
      ),
    },
  },
};

export const Empty = () => (
  <>
    <Card />
    <br />
    <br />
    <Card border />
  </>
);

export const TextHeading = () => (
  <>
    <Card
      heading="Card"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    />
    <br />
    <br />
    <Card
      border
      heading="Card"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    />
  </>
);
TextHeading.storyName = 'Text & heading';

export const TextHeadingButton = () => (
  <>
    <Card
      heading="Card"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    >
      <Button variant="secondary" theme="black">
        Button
      </Button>
    </Card>
    <br />
    <br />
    <Card
      border
      heading="Card"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    >
      <Button variant="secondary" theme="black">
        Button
      </Button>
    </Card>
  </>
);
TextHeadingButton.storyName = 'Text, heading & button';
