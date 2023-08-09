import React from 'react';

import { Hero, HeroCustomTheme, HeroProps } from './Hero';
import { Button } from '../button/Button';
// @ts-ignore
import imageFile from '../../assets/img/placeholder_1920x1080.jpg';
import { Navigation } from '../navigation/Navigation';
import { Section } from '../section/Section';
import { Logo, logoFi } from '../logo';

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
  description: 'Position of the koros in the variant "diagonalKoros".',
};

const defaultText =
  'Nullam ut nunc consectetur, accumsan nunc sed, luctus nisl. Curabitur lacinia tristique est, sit amet egestas velit elementum sit amet. Nam lacinia volutpat erat vel faucibus.';

const imageLeftOrRightTheme = { '--background-color': '#c2a251', '--color': '#000' };
const noImageOptions = ['', 'Without image', 'Without image II', 'Without image and koros'];

const getThemePropertyDescriptionAsSummary = (themeVariable: string) => ({
  table: {
    type: {
      summary: `Storybook control for a theme variable, not an actual component property. Given value is set to theme property as "${themeVariable}".`,
    },
  },
});

const getKorosPropertyDescriptionAsSummary = () => ({
  table: {
    type: {
      summary: `Storybook control for a koros property, not an actual component property. Given value is set to the "koros" property of the component.`,
    },
  },
});

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

const getDefaultArgs = (variant: HeroProps['variant'], preset?: string): HeroProps => {
  const defaultValuePicker = (args: Record<string, { defaultValue: unknown }>) => {
    return Object.entries(args).reduce((currentObject, [prop, value]) => {
      if (value.defaultValue) {
        return {
          ...currentObject,
          [prop]: value.defaultValue,
        };
      }
      return currentObject;
    }, {});
  };
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (variant === 'noImage') {
    if (preset === noImageOptions[1]) {
      return defaultValuePicker(WithoutImage.argTypes);
    }
    if (preset === noImageOptions[2]) {
      return defaultValuePicker(WithoutImageKorosOverlay.argTypes);
    }
    return defaultValuePicker(WithoutImageAndKoros.argTypes);
  }

  switch (variant) {
    case 'backgroundImage':
      return defaultValuePicker(BackgroundImage.argTypes);
    case 'imageLeft':
      return defaultValuePicker(ImageLeft.argTypes);
    case 'imageRight':
      return defaultValuePicker(ImageRight.argTypes);
    case 'imageBottom':
      return defaultValuePicker(ImageBottom.argTypes);
    case 'diagonalKoros':
      return defaultValuePicker(DiagonalKoros.argTypes);
    default:
      return {};
  }
};

const defaultImageSrcArg = {
  imageSrc: {
    defaultValue: imageFile,
    control: 'text',
  },
};
const createCenteredContentArg = (defaultValue: boolean) => ({
  centeredContent: {
    defaultValue,
    control: 'boolean',
  },
});
const createThemeArg = (themeProps: HeroCustomTheme) => ({
  theme: {
    defaultValue: { ...themeProps },
    control: 'object',
  },
});

const createKorosArg = (korosProps: HeroProps['koros']) => ({
  koros: {
    defaultValue: { ...korosProps },
    control: 'object',
  },
});

const createVariantArg = (defaultValue: HeroProps['variant']) => ({
  variant: {
    ...variantSelection,
    defaultValue,
  },
});

const DefaultContent = (props: DefaultContentProps) => {
  const { title, text, buttonTheme } = props;
  const h1Text = title || 'Welcome to the hero story';
  const paragraphText = text || defaultText;
  const blackButtonStyle = {
    '--background-color': '#000',
    '--color': '#fff',
    '--border-color': '#000',
    '--color-focus': '#fff',
    '--background-color-focus': '#000',
    '--background-color-hover': '#fff',
    '--background-color-hover-focus': '#fff',
  };
  const whiteButtonStyle = {
    '--background-color': '#fff',
    '--color': '#000',
    '--border-color': '#fff',
    '--color-focus': '#000',
    '--color-hover': '#fff',
    '--color-hover-focus': '#fff',
    '--background-color-focus': '#fff',
    '--background-color-hover': '#000',
    '--border-color-hover': '#fff',
    '--background-color-hover-focus': '#000',
  };
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
  <Navigation
    menuToggleAriaLabel="Menu"
    skipTo="#content"
    skipToContentLabel="Skip to main content"
    logo={<Logo src={logoFi} />}
  >
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
  return (
    <Hero {...args}>
      <DefaultContent buttonTheme="black" />
    </Hero>
  );
};
ImageLeft.argTypes = {
  ...defaultImageSrcArg,
  ...createThemeArg(imageLeftOrRightTheme),
  ...createVariantArg('imageLeft'),
};

export const ImageRight = (args) => {
  return (
    <Hero {...args}>
      <DefaultContent buttonTheme="black" />
    </Hero>
  );
};
ImageRight.argTypes = {
  ...getDisabledControl('variant'),
  ...defaultImageSrcArg,
  ...createThemeArg(imageLeftOrRightTheme),
  ...createVariantArg('imageRight'),
};

export const WithoutImage = (args) => {
  return (
    <Hero {...args}>
      <DefaultContent />
    </Hero>
  );
};

WithoutImage.argTypes = {
  ...getDisabledControl('imageSrc', true),
  ...createThemeArg({
    '--background-color': '#9fc9eb',
    '--color': '#000',
    '--koros-color': '#009246',
    '--koros-height': '82px',
  }),
  ...createKorosArg({ type: 'pulse' }),
  ...createVariantArg('noImage'),
  ...createCenteredContentArg(true),
};

export const WithoutImageKorosOverlay = (args) => {
  return (
    <Hero {...args}>
      <DefaultContent buttonTheme="white" />
    </Hero>
  );
};

WithoutImageKorosOverlay.argTypes = {
  ...getDisabledControl('imageSrc', true),
  ...createThemeArg({
    '--background-color': '#000',
    '--color': '#fff',
    '--koros-color': '#000',
  }),
  ...createKorosArg({ flipVertical: true }),
  ...createVariantArg('noImage'),
  ...createCenteredContentArg(false),
};

export const WithoutImageAndKoros = (args) => {
  return (
    <Hero {...args}>
      <DefaultContent />
    </Hero>
  );
};

WithoutImageAndKoros.argTypes = {
  ...getDisabledControl('imageSrc', true),
  ...createThemeArg({
    '--background-color': '#fff',
    '--color': '#000',
  }),
  ...createKorosArg({ hide: true }),
  ...createVariantArg('noImage'),
  ...createCenteredContentArg(false),
};

export const BackgroundImage = (args) => {
  return (
    <Hero {...args}>
      <DefaultContent buttonTheme="black" />
    </Hero>
  );
};

BackgroundImage.argTypes = {
  ...defaultImageSrcArg,
  ...createThemeArg({
    '--background-color': '#fff',
  }),
  ...createVariantArg('backgroundImage'),
};

export const DiagonalKoros = (args) => {
  return (
    <Hero {...args}>
      <DefaultContent buttonTheme="black" />
    </Hero>
  );
};

DiagonalKoros.argTypes = {
  ...defaultImageSrcArg,
  ...createThemeArg({
    '--background-color': '#f5a3c7',
    '--color': '#000',
  }),
  ...createVariantArg('diagonalKoros'),
};

export const ImageBottom = (args) => {
  return (
    <Hero {...args}>
      <DefaultContent />
    </Hero>
  );
};
ImageBottom.storyName = 'Bottom image';
ImageBottom.argTypes = {
  ...defaultImageSrcArg,
  ...createThemeArg({
    '--background-color': '#fff',
    '--image-position': 'bottom left',
  }),
  ...createVariantArg('imageBottom'),
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
    <div>
      <style>
        {`
          .theme {
            padding: 20px;
            font-size:10px;
          }
        `}
      </style>
      <Hero {...heroProps}>
        <DefaultContent />
      </Hero>
      <div className="theme">
        <p>Applied theme:</p>
        <pre>{JSON.stringify(heroProps.theme, null, 2)}</pre>
      </div>
      <div className="theme">
        <p>Applied koros:</p>
        <pre>{JSON.stringify(heroProps.koros, null, 2)}</pre>
      </div>
    </div>
  );
};

PlaygroundForKoros.argTypes = {
  ...getDisabledControl('centeredContent'),
  ...getDisabledControl('imageSrc'),
  type: {
    defaultValue: 'basic',
    description: 'Koros type',
    control: {
      type: 'select',
      options: ['basic', 'beat', 'pulse', 'storm', 'wave', 'calm'],
    },
    ...getKorosPropertyDescriptionAsSummary(),
  },
  color: {
    control: { type: 'color' },
    description: 'Koros color. Default is "--background-color"',
    ...getThemePropertyDescriptionAsSummary('--koros-color'),
  },
  hide: {
    control: 'boolean',
    description: 'Hide koros. Most variants override this setting.',
    ...getKorosPropertyDescriptionAsSummary(),
  },
  dense: {
    control: 'boolean',
    description: 'Use dense koros version or not',
    ...getKorosPropertyDescriptionAsSummary(),
  },
  diagonalKorosPosition: {
    ...korosPosition,
    ...getThemePropertyDescriptionAsSummary('--diagonal-koros-position'),
  },
  flipVertical: {
    control: 'boolean',
    description: 'Flip koros vertically. Most variants override this setting.',
    ...getKorosPropertyDescriptionAsSummary(),
  },
  ...createVariantArg('diagonalKoros'),
};

export const EmbeddedToPage = (args) => {
  const { preset, variant } = args;
  const props = getDefaultArgs(variant, preset);
  const NoImage = () => {
    if (preset === noImageOptions[1]) {
      return <WithoutImage {...props} />;
    }
    if (preset === noImageOptions[2]) {
      return <WithoutImageKorosOverlay {...props} />;
    }
    return <WithoutImageAndKoros {...props} />;
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NavigationComponent />
      {variant === 'imageRight' && <ImageRight {...props} />}
      {variant === 'imageLeft' && <ImageLeft {...props} />}
      {variant === 'backgroundImage' && (
        <BackgroundImage {...{ ...props, theme: { '--koros-color': 'var(--color-fog)' } }} />
      )}
      {variant === 'diagonalKoros' && <DiagonalKoros {...props} />}
      {variant === 'noImage' && <NoImage {...props} />}
      {variant === 'imageBottom' && <ImageBottom {...props} />}
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
  ...createVariantArg('noImage'),
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
  backgroundColor: {
    defaultValue: demoBgColor,
    control: 'color',
    description: 'Background color. Also koros color, if not set.',
    ...getThemePropertyDescriptionAsSummary('--background-color'),
  },
  color: {
    defaultValue: '',
    control: 'color',
    description: 'Text color.',
    ...getThemePropertyDescriptionAsSummary('--color'),
  },
  korosColor: {
    defaultValue: '',
    control: 'color',
    description: 'Optional koros color. Default is "--background-color"',
    ...getThemePropertyDescriptionAsSummary('--koros-color'),
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
    ...getThemePropertyDescriptionAsSummary('--image-position'),
  },
  diagonalKorosPosition: {
    ...korosPosition,
    ...getThemePropertyDescriptionAsSummary('--diagonal-koros-position'),
  },
  horizontalPaddingSmall: {
    defaultValue: demoPadding,
    control: 'text',
    description: 'Horizontal padding on small screens <768px.',
    ...getThemePropertyDescriptionAsSummary('--horizontal-padding-small'),
  },
  horizontalPaddingMedium: {
    defaultValue: demoPadding,
    control: 'text',
    description: 'Horizontal padding on medium screens >=768px.',
    ...getThemePropertyDescriptionAsSummary('--horizontal-padding-medium'),
  },
  horizontalPaddingLarge: {
    defaultValue: demoPadding,
    control: 'text',
    description: 'Horizontal padding on large screens >=992px.',
    ...getThemePropertyDescriptionAsSummary('--horizontal-padding-large'),
  },
  horizontalPaddingXLarge: {
    defaultValue: demoPadding,
    control: 'text',
    description: 'Horizontal padding on x-large screens >=1248px.',
    ...getThemePropertyDescriptionAsSummary('--horizontal-padding-x-large'),
  },
  ...createVariantArg('backgroundImage'),
};

export const AllHeroes = () => {
  const Divider = () => {
    return <div style={{ height: '50px' }} />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#eafad4' }}>
      <NavigationComponent />
      <ImageLeft {...getDefaultArgs('imageLeft')} />
      <Divider />
      <BackgroundImage {...{ ...getDefaultArgs('backgroundImage'), theme: { '--koros-color': '#eafad4' } }} />
      <Divider />
      <ImageRight {...getDefaultArgs('imageRight')} />
      <Divider />
      <WithoutImage {...getDefaultArgs('noImage', noImageOptions[1])} />
      <Divider />
      <DiagonalKoros {...getDefaultArgs('diagonalKoros')} />
      <Divider />
      <WithoutImageKorosOverlay {...getDefaultArgs('noImage', noImageOptions[2])} />
      <Divider />
      <ImageBottom {...getDefaultArgs('imageBottom')} />
      <Divider />
      <WithoutImageAndKoros {...getDefaultArgs('noImage', noImageOptions[3])} />
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
