import React from 'react';

import { Hero, HeroProps } from './Hero';
import { Button } from '../button/Button';
import { Navigation } from '../navigation/Navigation';
import { Section } from '../section/Section';

export default {
  component: Hero,
  title: 'Components/Hero',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

type DefaultCardContentProps = {
  title?: string;
  text?: string;
  buttonStyle?: Record<string, string>;
};

const defaultText =
  'Nullam ut nunc consectetur, accumsan nunc sed, luctus nisl. Curabitur lacinia tristique est, sit amet egestas velit elementum sit amet. Nam lacinia volutpat erat vel faucibus.';

const DefaultCardContent = (props: DefaultCardContentProps) => {
  const { title, text, buttonStyle } = props;
  const h1Text = title || 'Welcome to the hero story';
  const paragraphText = text || defaultText;
  return (
    <>
      <h1>{h1Text}</h1>
      <p>{paragraphText}</p>
      <Button
        variant="secondary"
        role="link"
        // @ts-ignore
        style={buttonStyle}
      >
        Click me
      </Button>
    </>
  );
};

const NavigationComponent = () => (
  <Navigation menuToggleAriaLabel="Menu" skipTo="#content" skipToContentLabel="Skip to main content">
    {/* NAVIGATION ROW */}
    <Navigation.Row ariaLabel="Main navigation">
      <Navigation.Item href="#" label="Link" active onClick={(e) => e.preventDefault()} />
      <Navigation.Item href="#" label="Link" onClick={(e) => e.preventDefault()} />
      <Navigation.Item href="#" label="Link" onClick={(e) => e.preventDefault()} />
      <Navigation.Item href="#" label="Link" onClick={(e) => e.preventDefault()} />
      <Navigation.Dropdown label="Dropdown">
        <Navigation.Item href="#" label="Link" onClick={(e) => e.preventDefault()} />
        <Navigation.Item href="#" label="Link" onClick={(e) => e.preventDefault()} />
        <Navigation.Item href="#" label="Link" onClick={(e) => e.preventDefault()} />
        <Navigation.Item href="#" label="Link" onClick={(e) => e.preventDefault()} />
      </Navigation.Dropdown>
    </Navigation.Row>

    {/* NAVIGATION ACTIONS */}
    <Navigation.Actions>
      {/* LANGUAGE SELECTOR */}
      <Navigation.LanguageSelector label="FI">
        <Navigation.Item href="#" onClick={(e) => e.preventDefault()} lang="fi" label="Suomeksi" />
        <Navigation.Item href="#" onClick={(e) => e.preventDefault()} lang="sv" label="På svenska" />
        <Navigation.Item href="#" onClick={(e) => e.preventDefault()} lang="en" label="In English" />
        <Navigation.Item href="#" onClick={(e) => e.preventDefault()} lang="fr" label="En français" />
        <Navigation.Item href="#" onClick={(e) => e.preventDefault()} lang="de" label="Auf deutsch" />
        <Navigation.Item href="#" onClick={(e) => e.preventDefault()} lang="ru" label="По-русски" />
      </Navigation.LanguageSelector>
    </Navigation.Actions>
  </Navigation>
);

export const WithoutImage = (args) => {
  const heroProps: HeroProps = {};
  const defaultContentProps: DefaultCardContentProps = {};
  if (args.heroType === 'blueAndGreen') {
    heroProps.theme = { '--background-color': '#9fc9eb', '--color': '#000', '--koros-color': '#009246' };
    heroProps.koros = { type: 'pulse', flipHorizontal: false };
  } else if (args.heroType === 'blackAndWhite') {
    heroProps.theme = { '--background-color': '#000', '--color': '#fff' };
    defaultContentProps.buttonStyle = { '--background-color': '#fff', '--color': '#000', '--border-color': '#fff' };
  } else if (args.heroType === 'whiteWithoutKoros') {
    heroProps.koros = { hide: true };
    heroProps.theme = { '--background-color': '#fff', '--color': '#000' };
    defaultContentProps.buttonStyle = {};
  }
  heroProps.theme = { ...heroProps.theme, ...args.theme };
  heroProps.koros = { ...heroProps.koros, ...args.koros };
  return (
    <Hero {...heroProps}>
      <Hero.Card centered={args.heroType === 'blueAndGreen'}>
        <DefaultCardContent {...defaultContentProps} />
      </Hero.Card>
    </Hero>
  );
};

WithoutImage.argTypes = {
  heroType: {
    options: ['blackAndWhite', 'blueAndGreen', 'whiteWithoutKoros'],
    control: { type: 'radio' },
    defaultValue: 'blueAndGreen',
    description: 'Choose a preset hero type',
  },
};

const componentTypes = {
  withoutImage: 'without image',
};

export const EmbeddedToPage = (args) => {
  const { componentType, variant } = args;
  const { withoutImage } = componentTypes;

  const NoImage = () => {
    const heroTypes = ['blueAndGreen', 'whiteWithoutKoros', 'blackAndWhite'];
    return <WithoutImage heroType={heroTypes[parseInt(variant, 10) - 1]} />;
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NavigationComponent />
      {componentType === withoutImage && <NoImage />}
      <Section color="secondary">
        <h1 className="heading-xl">Component after hero</h1>
        This component shows padding after hero
      </Section>
    </div>
  );
};

EmbeddedToPage.argTypes = {
  koros: {
    description: '*** Koros is not passed the the components ***',
    control: false,
  },
  theme: {
    description: '*** Theme is not passed the the components ***',
    control: false,
  },
  componentType: {
    defaultValue: componentTypes.withoutImage,
    control: {
      type: 'select',
      options: Object.values(componentTypes),
    },
  },
  variant: {
    defaultValue: '1',
    control: {
      type: 'select',
      options: ['1', '2', '3'],
    },
    table: {
      type: { summary: 'Changes to another variant of the selected component.' },
    },
  },
};
