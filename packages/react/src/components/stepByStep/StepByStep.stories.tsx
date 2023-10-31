import React from 'react';

import { StepByStep } from './StepByStep';

export default {
  component: StepByStep,
  title: 'Components/StepByStep',
  args: {
    steps: [
      {
        title: 'Step 1 title',
        description:
          'Here you can describe the step in detail. Keep the text compact so the user gets the big picture of the whole process and its steps easily.',
        buttons: [
          {
            children: 'Example button',
            href: 'https://hel.fi',
            key: 'button',
          },
        ],
      },
      {
        title: 'Step 2 title',
        description: 'You can put text here.',
        links: [
          {
            children: 'Example link',
            href: 'https://hel.fi',
            key: 'link',
          },
        ],
      },
      {
        title: 'Step 3 title',
        description: 'You can put text here.',
      },
      {
        title: 'Step 4 title',
        description: 'You can put text here.',
      },
      {
        title: 'Step 5 title',
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
