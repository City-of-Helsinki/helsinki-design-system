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
  buttonTheme?: 'black' | 'white';
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
    'Position of the koros in variant "diagonalKoros". Value is set to to theme of the hero. Theme property is "--diagonal-koros-position".',
};

const defaultText =
  'Nullam ut nunc consectetur, accumsan nunc sed, luctus nisl. Curabitur lacinia tristique est, sit amet egestas velit elementum sit amet. Nam lacinia volutpat erat vel faucibus.';

const imageLeftOrRightTheme = { '--background-color': '#c2a251', '--color': '#000' };

const getDisabledControl = (control: string, notUsed?: boolean) => {
  const description = notUsed
    ? `*** ${control} is not used in this variant ***`
    : `*** ${control} is not passed to the component in this story ***`;
  return {
    [control]: {
      description,
      control: false,
      table: {
        type: {
          summary: 'Disabled',
        },
      },
    },
  };
};

const DefaultContent = (props: DefaultContentProps) => {
  const { title, text, buttonTheme } = props;
  const h1Text = title || 'Welcome to the hero story';
  const paragraphText = text || defaultText;
  const blackButtonStyle = { '--background-color': '#000', '--color': '#fff', '--border-color': '#000' };
  const whiteButtonStyle = { '--background-color': '#fff', '--color': '#000', '--border-color': '#fff' };
  const buttonStyle = buttonTheme !== 'black' ? whiteButtonStyle : blackButtonStyle;
  return (
    <>
      <Hero.Title>{h1Text}</Hero.Title>
      <Hero.Text>{paragraphText}</Hero.Text>
      <Button
        variant="secondary"
        role="link"
        // @ts-ignore
        style={buttonTheme ? buttonStyle : {}}
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

export const ImageLeft = (args) => {
  const heroProps: HeroProps = {
    koros: args.koros,
    centeredContent: args.centeredContent,
    theme: { ...imageLeftOrRightTheme, ...args.theme },
    imageSrc: args.imageSrc || imageFile,
    variant: 'imageLeft',
  };
  return (
    <Hero {...heroProps}>
      <DefaultContent buttonTheme="black" />
    </Hero>
  );
};
ImageLeft.argTypes = {
  ...getDisabledControl('variant'),
};

export const ImageRight = (args) => {
  const heroProps: HeroProps = {
    koros: args.koros,
    centeredContent: args.centeredContent,
    theme: { ...imageLeftOrRightTheme, ...args.theme },
    imageSrc: args.imageSrc || imageFile,
    variant: 'imageRight',
  };
  return (
    <Hero {...heroProps}>
      <DefaultContent buttonTheme="black" />
    </Hero>
  );
};
ImageRight.argTypes = {
  ...getDisabledControl('variant'),
};

export const WithoutImage = (args) => {
  const heroProps: HeroProps = {
    theme: {
      '--background-color': '#9fc9eb',
      '--color': '#000',
      '--koros-color': '#009246',
      '--koros-height': '82px',
      ...args.theme,
    },
    koros: { type: 'pulse', ...args.koros },
    centeredContent: args.centeredContent !== false,
    variant: 'noImage',
  };
  return (
    <Hero {...heroProps}>
      <DefaultContent />
    </Hero>
  );
};

WithoutImage.argTypes = {
  ...getDisabledControl('variant'),
  ...getDisabledControl('imageSrc'),
};

export const WithoutImage2 = (args) => {
  const heroProps: HeroProps = {
    theme: {
      '--background-color': '#000',
      '--color': '#fff',
      '--koros-color': '#000',
      ...args.theme,
    },
    koros: { flipHorizontal: true, ...args.koros },
    centeredContent: args.centeredContent,
    variant: 'noImage',
  };
  return (
    <Hero {...heroProps}>
      <DefaultContent buttonTheme="white" />
    </Hero>
  );
};
WithoutImage2.storyName = 'Without image II';
WithoutImage2.argTypes = {
  ...getDisabledControl('variant'),
  ...getDisabledControl('imageSrc'),
};

export const WithoutImageAndKoros = (args) => {
  const heroProps: HeroProps = {
    theme: { '--background-color': '#fff', '--color': '#000', ...args.theme },
    koros: { hide: true, ...args.koros },
    centeredContent: args.centeredContent,
    variant: 'noImage',
  };
  return (
    <Hero {...heroProps}>
      <DefaultContent />
    </Hero>
  );
};

WithoutImageAndKoros.argTypes = {
  ...getDisabledControl('variant'),
  ...getDisabledControl('imageSrc'),
  ...getDisabledControl('koros'),
};

export const BackgroundImage = (args) => {
  const heroProps: HeroProps = {
    theme: { '--background-color': '#fff', ...args.theme },
    koros: { ...args.koros },
    imageSrc: args.imageSrc || imageFile,
    variant: 'backgroundImage',
  };
  return (
    <Hero {...heroProps}>
      <DefaultContent buttonTheme="black" />
    </Hero>
  );
};

BackgroundImage.argTypes = {
  ...getDisabledControl('centeredContent', true),
  ...getDisabledControl('variant'),
};

export const DiagonalKoros = (args) => {
  const heroProps: HeroProps = {
    theme: { '--background-color': '#f5a3c7', '--color': '#000', ...args.theme },
    koros: { ...args.koros },
    imageSrc: args.imageSrc || imageFile,
    variant: 'diagonalKoros',
  };

  return (
    <Hero {...heroProps}>
      <DefaultContent buttonTheme="black" />
    </Hero>
  );
};

DiagonalKoros.argTypes = {
  ...getDisabledControl('centeredContent', true),
  ...getDisabledControl('variant'),
};

export const ImageBottom = (args) => {
  const heroProps: HeroProps = {
    koros: { ...args.koros },
    centeredContent: args.centeredContent,
    theme: { '--background-color': '#fff', '--image-position': 'bottom left', ...args.theme },
    imageSrc: args.imageSrc || imageFile,
    variant: 'imageBottom',
  };
  return (
    <Hero {...heroProps}>
      <DefaultContent />
    </Hero>
  );
};
ImageBottom.storyName = 'Bottom image';
ImageBottom.argTypes = {
  ...getDisabledControl('variant'),
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
  ...getDisabledControl('centeredContent'),
  ...getDisabledControl('imageSrc'),
  ...getDisabledControl('theme'),
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
    description: 'Hide koros. Most variants override this setting.',
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

const noImageOptions = ['', 'Without image', 'Without image II', 'Without image and koros'];
export const EmbeddedToPage = (args) => {
  const { preset, variant } = args;
  const NoImage = () => {
    if (preset === noImageOptions[1]) {
      return <WithoutImage />;
    }
    if (preset === noImageOptions[2]) {
      return <WithoutImage2 />;
    }
    return <WithoutImageAndKoros />;
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NavigationComponent />
      {variant === 'imageRight' && <ImageRight />}
      {variant === 'imageLeft' && <ImageLeft />}
      {variant === 'backgroundImage' && <BackgroundImage theme={{ '--koros-color': 'var(--color-fog)' }} />}
      {variant === 'diagonalKoros' && <DiagonalKoros />}
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
  ...getDisabledControl('koros'),
  ...getDisabledControl('theme'),
  ...getDisabledControl('imageSrc'),
  ...getDisabledControl('centeredContent'),
  variant: {
    ...variantSelection,
  },
  preset: {
    defaultValue: noImageOptions[1],
    control: {
      type: 'select',
      options: noImageOptions,
    },
    table: {
      type: {
        summary:
          'Changes to another version of the "noImage" variant. Storybook control, not an actual component property',
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
    ...args.theme,
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
  ...getDisabledControl('centeredContent'),
  ...getDisabledControl('imageSrc'),
  ...getDisabledControl('koros'),
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
      <ImageLeft />
      <Divider />
      <BackgroundImage theme={{ '--koros-color': '#eafad4' }} />
      <Divider />
      <ImageRight />
      <Divider />
      <WithoutImage />
      <Divider />
      <DiagonalKoros />
      <Divider />
      <WithoutImage2 />
      <Divider />
      <ImageBottom />
      <Divider />
      <WithoutImageAndKoros />
      <Divider />
    </div>
  );
};

AllHeroes.argTypes = {
  ...getDisabledControl('koros'),
  ...getDisabledControl('theme'),
  ...getDisabledControl('imageSrc'),
  ...getDisabledControl('centeredContent'),
  ...getDisabledControl('variant'),
};
