import React from 'react';

import { Hero, HeroCustomTheme, HeroProps } from './Hero';
import { Button, ButtonVariant } from '../button/Button';
// @ts-ignore
import imageFile from '../../assets/img/placeholder_1920x1080.jpg';
import { Logo, logoFi } from '../logo';
import { Header } from '../header/Header';
import { Section } from '../section/Section';
import { LanguageOption } from '../header/LanguageContext';
import { KorosType } from '../koros';

export default {
  component: Hero,
  title: 'Components/Hero',
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
  },
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
  const defaultValuePicker = (values: Record<string, { defaultValue: unknown }>) => {
    return Object.entries(values).reduce((currentObject, [prop, value]) => {
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
        variant={ButtonVariant.Secondary}
        role="link"
        // @ts-ignore
        style={buttonTheme ? buttonStyle : {}}
      >
        Click me
      </Button>
    </>
  );
};

const languages: LanguageOption[] = [
  { label: 'Suomi', value: 'fi' },
  { label: 'Svenska', value: 'sv' },
  { label: 'English', value: 'en' },
];

const NavigationComponent = () => (
  <Header languages={languages}>
    <Header.SkipLink skipTo="#content" label="Skip to main content" />
    <Header.ActionBar
      title="Helsingin kaupunki"
      titleAriaLabel="Helsingin kaupunki"
      titleHref="https://hel.fi"
      logoAriaLabel="Service logo"
      logoHref="https://hel.fi"
      menuButtonAriaLabel="Menu"
      logo={<Logo src={logoFi} alt="Helsingin kaupunki" />}
      frontPageLabel="Etusivu"
    >
      <Header.LanguageSelector aria-label="Kielen valinta" />
    </Header.ActionBar>
    <Header.NavigationMenu>
      <Header.Link href="#" label="Link" active onClick={(e) => e.preventDefault()} />
      <Header.Link href="#" label="Link" onClick={(e) => e.preventDefault()} />
      <Header.Link href="#" label="Link" onClick={(e) => e.preventDefault()} />
      <Header.Link href="#" label="Link" onClick={(e) => e.preventDefault()} />
      <Header.Link
        href="#"
        label="Dropdown"
        onClick={(e) => e.preventDefault()}
        dropdownLinks={[
          <Header.Link href="#" label="Link" onClick={(e) => e.preventDefault()} />,
          <Header.Link href="#" label="Link" onClick={(e) => e.preventDefault()} />,
          <Header.Link href="#" label="Link" onClick={(e) => e.preventDefault()} />,
          <Header.Link href="#" label="Link" onClick={(e) => e.preventDefault()} />,
        ]}
      />
    </Header.NavigationMenu>
  </Header>
);

export const ImageLeft = (args: HeroProps) => {
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

export const ImageRight = (args: HeroProps) => {
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

export const WithoutImage = (args: HeroProps) => {
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

export const WithoutImageKorosOverlay = (args: HeroProps) => {
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
    '--arrow-icon-color': 'var(--color-brick)',
  }),
  ...createKorosArg({ flipVertical: true }),
  ...createVariantArg('noImage'),
  ...createCenteredContentArg(false),
};

export const WithoutImageAndKoros = (args: HeroProps) => {
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

export const BackgroundImage = (args: HeroProps) => {
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

export const DiagonalKoros = (args: HeroProps) => {
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

export const ImageBottom = (args: HeroProps) => {
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

export const PlaygroundForKoros = (args: HeroProps & Record<string, string> & { type: KorosType }) => {
  const heroProps: HeroProps = {
    koros: {
      type: args.type,
      dense: !!args.dense,
      hide: !!args.hide,
      flipVertical: !!args.flipVertical,
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
    information: args.information,
    showArrowIcon: !!args.showArrowIcon,
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

export const EmbeddedToPage = (args: HeroProps & { preset: string }) => {
  const { preset, variant, information } = args;
  const props = { ...getDefaultArgs(variant, preset), information };
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

export const PlaygroundForTheme = (args: HeroProps & Record<string, string>) => {
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
    '--bottom-background-color': args.informationBackgroundColor,
    '--information-color': args.informationColor,
    ...args.theme,
  };
  // @ts-ignore is for  Object.fromEntries
  const theme = Object.fromEntries(Object.entries(argsAsTheme).filter(([, value]) => !!value));
  const heroProps: HeroProps = {
    koros: args.koros,
    theme,
    imageSrc: imageFile,
    variant: args.variant,
    information: args.information,
    showArrowIcon: args.showArrowIcon,
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
  informationBackgroundColor: {
    defaultValue: '',
    control: 'color',
    description: 'Optional background color for the information text. Default is "--color-white"',
    ...getThemePropertyDescriptionAsSummary('--bottom-background-color'),
  },
  informationColor: {
    defaultValue: '',
    control: 'color',
    description: 'Optional text color for the information text. Default is "inherit"',
    ...getThemePropertyDescriptionAsSummary('--information-color'),
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

export const AllHeroesWithArrowIconAndInformation = () => {
  const DummyContent = () => {
    return (
      <div style={{ minHeight: '200px', padding: '20px', marginTop: '-32px' }}>
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, quam sed aliquet faucibus, nisl risus
          condimentum nisl, quis aliquam ligula mauris nec enim. Donec euismod, quam sed aliquet faucibus, nisl risus
          condimentum nisl, quis aliquam ligula mauris nec enim. Donec euismod, quam sed aliquet faucibus, nisl risus
          condimentum nisl, quis aliquam ligula mauris nec enim.
        </p>
      </div>
    );
  };

  const information = 'Photo: Firstname Middlename Long-Lastname';

  const mergeThemes = (props: HeroProps, additionalTheme: HeroProps['theme']): Pick<HeroProps, 'theme'> => {
    const { theme } = props;
    return {
      theme: { ...theme, ...additionalTheme },
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'beige' }}>
      <ImageLeft
        {...{
          ...getDefaultArgs('imageLeft'),
          showArrowIcon: true,
          information,
          ...mergeThemes(getDefaultArgs('imageLeft'), { '--bottom-background-color': 'beige' }),
        }}
      />
      <DummyContent />
      <BackgroundImage
        {...{
          ...getDefaultArgs('backgroundImage'),
          theme: { '--koros-color': 'beige', '--bottom-background-color': 'var(--koros-color)' },
          showArrowIcon: true,
          information,
        }}
      />
      <DummyContent />
      <ImageRight
        {...{
          ...getDefaultArgs('imageRight'),
          showArrowIcon: true,
          information,
          ...mergeThemes(getDefaultArgs('imageRight'), { '--bottom-background-color': 'beige' }),
        }}
      />
      <DummyContent />
      <WithoutImage
        {...{
          ...getDefaultArgs('noImage', noImageOptions[1]),
          showArrowIcon: true,
          ...mergeThemes(getDefaultArgs('noImage', noImageOptions[1]), { '--bottom-background-color': 'beige' }),
        }}
      />
      <DummyContent />
      <DiagonalKoros
        {...{
          ...getDefaultArgs('diagonalKoros'),
          showArrowIcon: true,
          information,
          ...mergeThemes(getDefaultArgs('diagonalKoros'), { '--bottom-background-color': 'beige' }),
        }}
      />
      <DummyContent />
      <WithoutImageKorosOverlay
        {...{
          ...getDefaultArgs('noImage', noImageOptions[2]),
          showArrowIcon: true,
          ...mergeThemes(getDefaultArgs('noImage', noImageOptions[2]), { '--bottom-background-color': 'beige' }),
        }}
      />
      <DummyContent />
      <ImageBottom
        {...{
          ...getDefaultArgs('imageBottom'),
          showArrowIcon: true,
          information,
          ...mergeThemes(getDefaultArgs('imageBottom'), { '--bottom-background-color': 'beige' }),
        }}
      />
      <DummyContent />
      <WithoutImageAndKoros
        {...{
          ...getDefaultArgs('noImage', noImageOptions[3]),
          showArrowIcon: true,
          ...mergeThemes(getDefaultArgs('noImage'), { '--bottom-background-color': 'beige' }),
        }}
      />
      <DummyContent />
    </div>
  );
};
