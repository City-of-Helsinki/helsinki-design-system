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

export const ImageLeftOrRight = (args) => (
  <Hero koros={args.koros} theme={{ '--background-color': '#c2a251', '--color': '#000', ...args.theme }}>
    {args?.imagePosition === 'left' && <Hero.Image src={imageFile} />}
    <Hero.Card>
      <DefaultCardContent buttonStyle={{ '--background-color': '#000', '--color': '#fff', '--border-color': '#000' }} />
    </Hero.Card>
    {args?.imagePosition === 'right' && <Hero.Image src={imageFile} />}
  </Hero>
);

ImageLeftOrRight.argTypes = {
  imagePosition: {
    options: ['right', 'left'],
    control: { type: 'radio' },
    defaultValue: 'right',
  },
};

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

export const WithBackgroundImage = (args) => {
  const heroProps: HeroProps = {};
  if (args.imagePosition === 'top') {
    heroProps.theme = { '--background-color': '#fff', ...args.theme };
  } else if (args.imagePosition === 'right') {
    heroProps.theme = { '--background-color': '#f5a3c7', '--color': '#000', ...args.theme };
  }

  heroProps.theme = { ...heroProps.theme, ...args.theme };
  heroProps.koros = { ...args.koros };

  return (
    <Hero {...heroProps}>
      {args?.imagePosition === 'top' && <Hero.BackgroundImage src={imageFile} />}
      <Hero.Card>
        {!args.demoLongContent ? (
          <DefaultCardContent
            buttonStyle={{ '--background-color': '#000', '--color': '#fff', '--border-color': '#000' }}
          />
        ) : (
          <Hero.Card>
            <h1>This is a header with too much text for single line</h1>
            <p>{defaultText}</p>
            <p>{defaultText}</p>
            <Button variant="secondary" role="link">
              Click me once!
            </Button>
            <p>
              <Button variant="secondary" role="link">
                Never click me!
              </Button>
            </p>
          </Hero.Card>
        )}
      </Hero.Card>
      {args?.imagePosition === 'right' && <Hero.BackgroundImage src={imageFile} />}
    </Hero>
  );
};

WithBackgroundImage.argTypes = {
  imagePosition: {
    options: ['top', 'right'],
    control: { type: 'radio' },
    defaultValue: 'top',
  },
  demoLongContent: {
    control: 'boolean',
  },
};

export const BottomWideImage = (args) => (
  <Hero koros={args.koros} theme={{ '--background-color': '#fff', '--image-position': 'bottom left', ...args.theme }}>
    <Hero.Card>
      <DefaultCardContent />
    </Hero.Card>
    <Hero.WideImage src={imageFile} />
  </Hero>
);

export const PlaygroundForKoros = (args) => {
  const heroProps: HeroProps = {
    koros: {
      type: args.type,
      dense: !!args.dense,
      hide: !!args.hide,
      forcedDirection: args.forcedDirection || undefined,
      ...args.koros,
    },
    theme: {
      '--background-color': '#9fc9eb',
      '--koros-color': args.color || '#9fc9eb',
      ...args.theme,
    },
  };

  return (
    <Hero {...heroProps}>
      <Hero.Image src={imageFile} />
      <Hero.Card>
        <DefaultCardContent />
      </Hero.Card>
    </Hero>
  );
};

PlaygroundForKoros.argTypes = {
  type: {
    defaultValue: 'basic',
    control: {
      type: 'select',
      options: ['basic', 'beat', 'pulse', 'storm', 'wave', 'calm'],
    },
  },
  color: { control: { type: 'color' } },
  hide: {
    control: 'boolean',
  },
  dense: {
    control: 'boolean',
  },
  flipHorizontal: {
    defaultValue: true,
    control: 'boolean',
  },
};

const componentTypes = {
  imageOnSide: 'image on side',
  backgroundImage: 'background image',
  withoutImage: 'without image',
  wideImage: 'wide image',
};

export const EmbeddedToPage = (args) => {
  const { componentType, variant } = args;
  const { imageOnSide, backgroundImage, withoutImage, wideImage } = componentTypes;
  const BasicImageVersion = () => {
    const imagePosition = variant === '1' ? 'left' : 'right';
    return <ImageLeftOrRight imagePosition={imagePosition} />;
  };
  const BackgroundImageVersion = () => {
    const imagePosition = variant === '1' ? 'top' : 'right';
    const theme = imagePosition === 'top' ? { '--bottom-koros-color': 'var(--color-fog)' } : {};
    return <WithBackgroundImage imagePosition={imagePosition} theme={theme} />;
  };
  const NoImage = () => {
    const heroTypes = ['blueAndGreen', 'whiteWithoutKoros', 'blackAndWhite'];
    return <WithoutImage heroType={heroTypes[parseInt(variant, 10) - 1]} />;
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NavigationComponent />
      {componentType === imageOnSide && <BasicImageVersion />}
      {componentType === backgroundImage && <BackgroundImageVersion />}
      {componentType === withoutImage && <NoImage />}
      {componentType === wideImage && <BottomWideImage />}
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

export const PlaygroundForAngledKoros = (args) => (
  <div>
    <style>
      {`
        .hero {
          --angled-koros-inset: ${args.korosInset};
        }
        .hero-card h1{
          max-width: ${args.headingMaxWidth};
        }
        #hero .hero-card > p {
          padding-right: ${args.paragraphPadding};
        }
      `}
    </style>
    <Hero
      id="hero"
      koros={args.koros}
      className="hero"
      theme={{ '--background-color': '#f5a3c7', '--color': '#000', ...args.theme }}
    >
      <Hero.Card id="hero-card" className="hero-card">
        <DefaultCardContent
          title="This hero layout is broken intentionally"
          text="When angled koros is visible*, heading or text may overflow the koros and image. Can be fixed by adding padding to the elements with css. Can also be fixed by changing theme property 'angled-koros-inset'"
        />
      </Hero.Card>
      <Hero.BackgroundImage id="hero-image" src={imageFile} />
    </Hero>
    <p>*On large screens, resolution &gt;=992px</p>
  </div>
);

PlaygroundForAngledKoros.argTypes = {
  korosInset: {
    defaultValue: 'auto auto 30% -40%',
    control: 'text',
    description: 'Position of the koros',
  },
  headingMaxWidth: {
    defaultValue: '35vw',
    control: 'text',
    description: 'Max width of the heading',
  },
  paragraphPadding: {
    defaultValue: '0%',
    control: 'text',
    description: 'Padding of the p element',
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
    '--bottom-koros-color': args.bottomKorosColor,
    '--angled-koros-inset': args.angledKorosInset,
    '--horizontal-padding-small': args.horizontalPaddingSmall,
    '--horizontal-padding-medium': args.horizontalPaddingMedium,
    '--horizontal-padding-large': args.horizontalPaddingLarge,
    '--horizontal-padding-x-large': args.horizontalPaddingXLarge,
  };

  const theme = Object.fromEntries(Object.entries(argsAsTheme).filter(([, value]) => !!value));

  return (
    <div>
      <style>
        {`
        .oddly-padded {
          padding: 20px ${demoPadding};
          background:${demoBgColor};
        }
        .theme {
          padding: 20px 20px 20px ${demoPadding};
          font-size:10px;
          border:1px solid #000;
        }
       
      `}
      </style>
      <Hero koros={args.koros} theme={theme}>
        <Hero.BackgroundImage src={imageFile} />
        <Hero.Card>
          <DefaultCardContent />
        </Hero.Card>
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
    description: 'Background / koros color',
  },
  color: {
    defaultValue: '',
    control: 'color',
    description: 'Text color',
  },
  korosColor: {
    defaultValue: '',
    control: 'color',
    description: 'Optional koros color',
  },
  bottomKorosColor: {
    defaultValue: '',
    control: 'color',
    description: 'Optional bottom koros color. Used only with top bg image.',
  },
  imagePosition: {
    defaultValue: '',
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
  korosInset: {
    defaultValue: demoPadding,
    control: 'text',
    description: 'Position of the koros. Used only with angled koros.',
  },
  horizontalPaddingSmall: {
    defaultValue: demoPadding,
    control: 'text',
    description: 'Horizontal padding on small screens <768px',
  },
  horizontalPaddingMedium: {
    defaultValue: demoPadding,
    control: 'text',
    description: 'Horizontal padding on medium screens >=768px',
  },
  horizontalPaddingLarge: {
    defaultValue: demoPadding,
    control: 'text',
    description: 'Horizontal padding on large screens >=992px',
  },
  horizontalPaddingXLarge: {
    defaultValue: demoPadding,
    control: 'text',
    description: 'Horizontal padding on x-large screens >=1248px',
  },
};
