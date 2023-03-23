import React from 'react';

import { StepByStep } from './StepByStep';

export default {
  component: StepByStep,
  title: 'Components/StepByStep',
  args: {
    steps: [
      {
        title: 'Vaiheen otsikko',
        description:
          'Tähän voit lisätä tekstiä, joka kertoo käyttäjälle mitä kyseisessä vaiheessa tapahtuu. Pidä teksti tiiviinä, jotta käyttäjä saa kokonaiskuvan prosessista ja sen vaiheista helposti silmäilemällä.',
        buttons: [
          {
            children: 'Esimerkki painikkeesta',
            href: 'https://hel.fi',
          },
        ],
        links: [
          {
            children: 'Esimerkki lisätietolinkistä',
            href: 'https://hel.fi',
          },
        ],
      },
      {
        title: 'Vaiheen otsikko',
        description: 'Tähän voit lisätä tekstiä.',
      },
      {
        title: 'Vaiheen otsikko',
        description: 'Tähän voit lisätä tekstiä.',
      },
      {
        title: 'Vaiheen otsikko',
        description: 'Tähän voit lisätä tekstiä.',
      },
      {
        title: 'Vaiheen otsikko',
        description: 'Tähän voit lisätä tekstiä.',
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
  title: 'Numeroitu vaiheistuskomponentti',
  helpText: 'Numeroitu prosessi soveltuu hyvin tapauksiin, joissa vaiheiden järjestys on selkeä.',
};

export const RegularStepByStep = (args) => <StepByStep {...args} />;

RegularStepByStep.args = {
  title: 'Numeroimaton vaiheistuskomponentti',
  helpText: 'Voit käyttää numeroimatonta prosessia silloin, kun vaiheiden järjestys on enemmän ohjeellinen.',
};
