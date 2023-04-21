import React from 'react';

import { StepByStep } from './StepByStep';

export default {
  component: StepByStep,
  title: 'Components/StepByStep',
  args: {
    steps: [
      {
        title: 'Step title',
        description:
          "Here you can describe the step in detail. Keep the text compact so the user gets the big picture of the whole process and it's steps easily.",
        buttons: [
          {
            children: 'Example button',
            href: 'https://hel.fi',
          },
        ],
      },
      {
        title: 'Step title',
        description: 'You can put text here.',
        links: [
          {
            children: 'Example link',
            href: 'https://hel.fi',
          },
        ],
      },
      {
        title: 'Step title',
        description: 'You can put text here.',
      },
      {
        title: 'Step title',
        description: 'You can put text here.',
      },
      {
        title: 'Step title',
        description: 'You can put text here.',
      },
    ],
  },
  argTypes: {
    title: { control: { type: 'string' } },
    steps: { control: { type: 'string' } },
    helpText: { control: { type: 'string' } },
  },
};

export const NumberedStepByStep = (args) => <StepByStep numberedList {...args} />;

NumberedStepByStep.args = {
  title: 'Numbered step by step component',
  helpText: 'Numbered component is suitable for cases where the order of the steps is important.',
};

export const RegularStepByStep = (args) => <StepByStep {...args} />;

RegularStepByStep.args = {
  title: 'Numbered step by step component',
  helpText: 'Use the unnumbered list when the order of the steps is less important and they form more of a guideline.',
};
