import React from 'react';

import { Hero, HeroProps } from './Hero';
import { Button } from '../button/Button';
// @ts-ignore
import imageFile from '../../assets/img/placeholder_1920x1080.jpg';
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

type DefaultContentProps = {
  title?: string;
  text?: string;
  buttonStyle?: Record<string, string>;
};

const variantSelection = {
  defaultValue: 'noImage',
  control: {
    type: 'select',
    options: ['imageLeft', 'imageRight', 'backgroundImage', 'imageBottom', 'diagonalKoros', 'noImage'],
  },
};

const korosPosition = {
  defaultValue: '45%',
  control: 'text',
  description:
    'Position of the koros in variant "diagonalKoros". Value is set to the theme of the hero. Theme property is "--diagonal-koros-position".',
};

const defaultText =
  'Nullam ut nunc consectetur, accumsan nunc sed, luctus nisl. Curabitur lacinia tristique est, sit amet egestas velit elementum sit amet. Nam lacinia volutpat erat vel faucibus.';

const DefaultContent = (props: DefaultContentProps) => {
  const { title, text, buttonStyle } = props;
  const h1Text = title || 'Welcome to the hero story';
  const paragraphText = text || defaultText;
  return (
    <>
      <Hero.Title>{h1Text}</Hero.Title>
      <Hero.Text>{paragraphText}</Hero.Text>
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

export const ImageLeftOrRight = (args) => {
  const heroProps: HeroProps = {
    koros: args.koros,
    theme: { '--background-color': '#c2a251', '--color': '#000', ...args.theme },
    imageSrc: imageFile,
    variant: args.variant,
  };
  return (
    <Hero {...heroProps}>
      <DefaultContent buttonStyle={{ '--background-color': '#000', '--color': '#fff', '--border-color': '#000' }} />
    </Hero>
  );
};

ImageLeftOrRight.argTypes = {
  variant: {
    options: ['imageRight', 'imageLeft'],
    control: { type: 'radio' },
    defaultValue: 'imageRight',
  },
};

export const WithoutImage = (args) => {
  const heroProps: HeroProps = {};
  const defaultContentProps: DefaultContentProps = {};
  if (args.heroType === 'blueAndGreen') {
    heroProps.theme = {
      '--background-color': '#9fc9eb',
      '--color': '#000',
      '--koros-color': '#009246',
      '--koros-height': '82px',
    };
    heroProps.koros = { type: 'pulse' };
  } else if (args.heroType === 'blackAndWhite') {
    heroProps.theme = {
      '--background-color': '#000',
      '--color': '#fff',
      '--koros-color': '#000',
    };
    heroProps.koros = { flipHorizontal: true };
    defaultContentProps.buttonStyle = { '--background-color': '#fff', '--color': '#000', '--border-color': '#fff' };
  } else if (args.heroType === 'whiteWithoutKoros') {
    heroProps.koros = { hide: true };
    heroProps.theme = { '--background-color': '#fff', '--color': '#000' };
    defaultContentProps.buttonStyle = {};
  }
  heroProps.theme = { ...heroProps.theme, ...args.theme };
  heroProps.koros = { ...heroProps.koros, ...args.koros };
  heroProps.centeredContent =
    (args.heroType === 'blueAndGreen' && args.centeredContent === undefined) || args.centeredContent;
  return (
    <Hero {...heroProps}>
      <DefaultContent {...defaultContentProps} />
    </Hero>
  );
};

WithoutImage.argTypes = {
  heroType: {
    options: ['blackAndWhite', 'blueAndGreen', 'whiteWithoutKoros'],
    control: { type: 'radio' },
    defaultValue: 'blueAndGreen',
    description: 'Choose a preset hero type. This is a Storybook control, not an actual component property.',
  },
};

export const WithBackgroundImage = (args) => {
  const heroProps: HeroProps = {};
  if (args.variant === 'backgroundImage') {
    heroProps.theme = { '--background-color': '#fff', ...args.theme };
  } else if (args.variant === 'diagonalKoros') {
    heroProps.theme = { '--background-color': '#f5a3c7', '--color': '#000', ...args.theme };
  }

  heroProps.theme = { ...heroProps.theme, ...args.theme };
  heroProps.koros = { ...args.koros };
  heroProps.imageSrc = imageFile;
  heroProps.variant = args.variant;
  return (
    <Hero {...heroProps}>
      {!args.demoLongContent ? (
        <DefaultContent buttonStyle={{ '--background-color': '#000', '--color': '#fff', '--border-color': '#000' }} />
      ) : (
        <>
          <Hero.Title>This is a header with too much text for single line</Hero.Title>
          <Hero.Text>{defaultText}</Hero.Text>
          <Hero.Text>{defaultText}</Hero.Text>
          <Button variant="secondary" role="link">
            Click me once!
          </Button>
          <p>
            <Button variant="secondary" role="link">
              Never click me!
            </Button>
          </p>
        </>
      )}
    </Hero>
  );
};

WithBackgroundImage.argTypes = {
  variant: {
    options: ['backgroundImage', 'diagonalKoros'],
    control: { type: 'radio' },
    defaultValue: 'backgroundImage',
  },
  demoLongContent: {
    control: 'boolean',
    description: 'Storybook control, not an actual component property.',
  },
};

export const ImageBottom = (args) => {
  const heroProps: HeroProps = {
    koros: { ...args.koros },
    theme: { '--background-color': '#fff', '--image-position': 'bottom left', ...args.theme },
    imageSrc: imageFile,
    variant: 'imageBottom',
  };
  return (
    <Hero {...heroProps}>
      <DefaultContent />
    </Hero>
  );
};

export const PlaygroundForKoros = (args) => {
  const heroProps: HeroProps = {
    koros: {
      type: args.type,
      dense: !!args.dense,
      hide: !!args.hide,
      ...args.koros,
    },
    theme: {
      '--background-color': '#9fc9eb',
      '--koros-color': args.color || '#9fc9eb',
      '--diagonal-koros-position': args.diagonalKorosPosition,
      ...args.theme,
    },
    imageSrc: imageFile,
    variant: args.variant,
  };

  return (
    <Hero {...heroProps}>
      <DefaultContent />
    </Hero>
  );
};

PlaygroundForKoros.argTypes = {
  type: {
    defaultValue: 'basic',
    description: 'Koros type',
    control: {
      type: 'select',
      options: ['basic', 'beat', 'pulse', 'storm', 'wave', 'calm'],
    },
  },
  color: {
    control: { type: 'color' },
    description: 'Koros color. Default is "--background-color"',
  },
  hide: {
    control: 'boolean',
    description: 'Hide koros',
  },
  dense: {
    control: 'boolean',
    description: 'Use dense koros version or not',
  },
  diagonalKorosPosition: korosPosition,
  flipHorizontal: {
    control: 'boolean',
    description: 'Flip koros horizontally. Most variants override this setting.',
  },
  variant: {
    ...variantSelection,
    defaultValue: 'diagonalKoros',
  },
};

export const EmbeddedToPage = (args) => {
  const { preset, variant } = args;
  const BasicImageVersion = () => {
    return <ImageLeftOrRight variant={variant} />;
  };
  const BackgroundImageVersion = () => {
    const theme = variant === 'backgroundImage' ? { '--koros-color': 'var(--color-fog)' } : {};
    return <WithBackgroundImage variant={variant} theme={theme} />;
  };
  const NoImage = () => {
    const heroPresets = ['blueAndGreen', 'whiteWithoutKoros', 'blackAndWhite'];
    return <WithoutImage heroType={heroPresets[parseInt(preset, 10) - 1]} />;
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NavigationComponent />
      {(variant === 'imageLeft' || variant === 'imageRight') && <BasicImageVersion />}
      {(variant === 'backgroundImage' || variant === 'diagonalKoros') && <BackgroundImageVersion />}
      {variant === 'noImage' && <NoImage />}
      {variant === 'imageBottom' && <ImageBottom />}
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
  variant: {
    ...variantSelection,
  },
  preset: {
    defaultValue: '1',
    control: {
      type: 'select',
      options: ['1', '2', '3'],
    },
    table: {
      type: {
        summary:
          'Changes to another preset of the selected variant. Storybook control, not an actual component property',
      },
    },
  },
};

const demoPadding = '55px';
const demoBgColor = '#f5a3c7';

export const PlaygroundForTheme = (args) => {
  const argsAsTheme = {
    '--background-color': args.backgroundColor,
    '--color': args.color,
    '--image-position': args.imagePosition,
    '--koros-color': args.korosColor,
    '--diagonal-koros-position': args.diagonalKorosPosition,
    '--horizontal-padding-small': args.horizontalPaddingSmall,
    '--horizontal-padding-medium': args.horizontalPaddingMedium,
    '--horizontal-padding-large': args.horizontalPaddingLarge,
    '--horizontal-padding-x-large': args.horizontalPaddingXLarge,
  };

  const theme = Object.fromEntries(Object.entries(argsAsTheme).filter(([, value]) => !!value));
  const heroProps: HeroProps = {
    koros: args.koros,
    theme,
    imageSrc: imageFile,
    variant: args.variant,
  };
  return (
    <div>
      <style>
        {`
        .oddly-padded {
          padding: 20px ${demoPadding};
          background:${demoBgColor};
        }
        .oddly-padded p{
          max-width: var(--container-width-xl);
          margin: 0 auto;
        }
        .theme {
          padding: 20px 20px 20px ${demoPadding};
          font-size:10px;
          border:1px solid #000;
        }
      `}
      </style>
      <Hero {...heroProps}>
        <DefaultContent />
      </Hero>
      <div className="oddly-padded">
        <p>This text should align with the hero content box on all screen sizes</p>
      </div>
      <div className="theme">
        <p>Applied theme:</p>
        <pre>{JSON.stringify(theme, null, 2)}</pre>
      </div>
    </div>
  );
};

PlaygroundForTheme.argTypes = {
  theme: {
    description: '*** Theme is not used here ***',
    control: false,
  },
  backgroundColor: {
    defaultValue: demoBgColor,
    control: 'color',
    description: 'Background color. Also koros color, if not set.',
  },
  color: {
    defaultValue: '',
    control: 'color',
    description: 'Text color.',
  },
  korosColor: {
    defaultValue: '',
    control: 'color',
    description: 'Optional koros color. Default is "--background-color"',
  },
  imagePosition: {
    defaultValue: '',
    description:
      'How image is aligned to its container when image is larger than the container. Value can be any valid value for css rule "object-fit"',
    control: {
      type: 'select',
      options: [
        'top left',
        'top center',
        'top right',
        'center left',
        'center center',
        'center right',
        'bottom left',
        'bottom center',
        'bottom right',
        '',
      ],
    },
  },
  diagonalKorosPosition: korosPosition,
  horizontalPaddingSmall: {
    defaultValue: demoPadding,
    control: 'text',
    description: 'Horizontal padding on small screens <768px.',
  },
  horizontalPaddingMedium: {
    defaultValue: demoPadding,
    control: 'text',
    description: 'Horizontal padding on medium screens >=768px.',
  },
  horizontalPaddingLarge: {
    defaultValue: demoPadding,
    control: 'text',
    description: 'Horizontal padding on large screens >=992px.',
  },
  horizontalPaddingXLarge: {
    defaultValue: demoPadding,
    control: 'text',
    description: 'Horizontal padding on x-large screens >=1248px.',
  },
  variant: {
    ...variantSelection,
    defaultValue: 'backgroundImage',
  },
};

export const AllHeroes = () => {
  const Divider = () => {
    return <div style={{ height: '50px' }} />;
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#eafad4' }}>
      <NavigationComponent />
      <ImageLeftOrRight variant="imageLeft" />
      <Divider />
      <WithBackgroundImage variant="backgroundImage" theme={{ '--koros-color': '#eafad4' }} />
      <Divider />
      <ImageLeftOrRight variant="imageRight" />
      <Divider />
      <WithoutImage heroType="blueAndGreen" />
      <Divider />
      <WithBackgroundImage variant="diagonalKoros" />
      <Divider />
      <WithoutImage heroType="blackAndWhite" />
      <Divider />
      <ImageBottom />
      <Divider />
      <WithoutImage heroType="whiteWithoutKoros" />
      <Divider />
    </div>
  );
};
