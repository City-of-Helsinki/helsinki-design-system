import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Hero.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import { getShapeHeight, Koros, KorosProps } from '../koros';
import { Text } from './Text';
import { Title } from './Title';

type HTMLElementAttributes = React.HtmlHTMLAttributes<HTMLDivElement>;
type ImgElementAttributes = React.ImgHTMLAttributes<HTMLImageElement>;
export type HeroProps = React.PropsWithChildren<
  HTMLElementAttributes & {
    /**
     * Should texts be centered. Use when there is no image.
     */
    centeredContent?: boolean;
    /**
     * Image source
     */
    imageSrc?: string;
    /**
     * Koros properties. Accepts also boolean "hide", which hides the koros.
     * @see KorosProps
     */
    koros?: Omit<KorosProps, 'rotate'> & {
      hide?: boolean;
    };
    /*
     * Css variables for theming the hero
     */
    theme?: HeroCustomTheme;
    /**
     * Defines the hero variant
     */
    variant?: 'imageLeft' | 'imageRight' | 'backgroundImage' | 'imageBottom' | 'diagonalKoros' | 'noImage';
  }
>;

export interface HeroCustomTheme {
  /**
   * Sets the background color. Is also koros color, if --koros-color is not set.
   * Default --color-white
   */
  '--background-color'?: string;
  /**
   * Text color
   * Default --color-black-90
   */
  '--color'?: string;
  /**
   * How background image is positioned if it overflows the container. Is set to css property "object-position"
   * Default bottom right
   */
  '--image-position'?: string;
  /**
   * Color of the koros
   * Default --background-color
   */
  '--koros-color'?: string;
  /**
   * Height of the koros
   * Default 85px
   */
  '--koros-height'?: string;
  /**
   * The "diagonalKoros" variant might need koros position adjustment, if texts overflow.
   * This set the koros element's css rule "right"
   * Default "45%"
   */
  '--diagonal-koros-position'?: string;
  /**
   * Custom horizontal padding for small screens
   * Default --spacing-layout-2-xs
   */
  '--horizontal-padding-small'?: string;
  /**
   * Custom horizontal padding for medium screens
   * Default --spacing-layout-xs
   */
  '--horizontal-padding-medium'?: string;
  /**
   * Custom horizontal padding for large screens
   * Default --spacing-layout-xs
   */
  '--horizontal-padding-large'?: string;
  /**
   * Custom horizontal padding for x-large screens
   * Default --spacing-layout-xs
   */
  '--horizontal-padding-x-large'?: string;
}

export const Hero = ({
  children,
  variant,
  imageSrc,
  centeredContent,
  theme,
  koros,
  ...elementAttributes
}: HeroProps) => {
  const editableTheme = { ...theme };
  if (!editableTheme['--koros-color']) {
    editableTheme['--koros-color'] = 'var(--background-color)';
  }
  if (variant === 'backgroundImage') {
    editableTheme['--top-koros-color'] = 'var(--background-color)';
    editableTheme['--bottom-koros-color'] = 'var(--koros-color)';
  }
  if (!editableTheme['--koros-height']) {
    const korosHeight = getShapeHeight(koros || {});
    if (korosHeight) {
      editableTheme['--koros-height'] = `${korosHeight}px`;
    }
  }

  const currentVariant: HeroProps['variant'] = variant || (imageSrc ? 'imageLeft' : 'noImage');
  const customThemeClass = useTheme<HeroCustomTheme>(styles.hero, editableTheme);
  const korosStyle = { ...koros, style: { fill: 'var(--koros-color)' } };

  const heroElementAttributes: HTMLElementAttributes = {
    ...elementAttributes,
    className: classNames(
      styles.hero,
      customThemeClass,
      styles[currentVariant],
      (elementAttributes as HTMLElementAttributes).className,
    ),
  };

  const Image = () => {
    return (
      /* eslint-disable-next-line jsx-a11y/alt-text */
      <img className={styles.image} src={imageSrc} aria-hidden alt="" />
    );
  };

  const ImageAsBackground = (props?: Pick<ImgElementAttributes, 'className'>) => {
    return (
      <div className={classNames(styles.withBackgroundBackground, props && props.className)}>
        <Image />
      </div>
    );
  };

  const TwoColumsImage = () => {
    return (
      <div key={`imageContainer-${currentVariant}`} className={styles.twoColumnsImageContainer}>
        <Image />
      </div>
    );
  };

  const Content = () => {
    const classNameList = centeredContent ? classNames(styles.card, styles.centeredContent) : classNames(styles.card);
    return <div className={classNameList}>{children}</div>;
  };

  const KorosInContainer = (
    props: KorosProps & {
      inward?: boolean;
      containerClassName?: string;
    },
  ) => {
    const { inward, containerClassName, style, ...korosProps } = props;
    const className =
      containerClassName || (inward !== true ? styles.korosContainer : styles.korosContainerInwardKoros);
    return (
      <div className={className}>
        <Koros {...{ ...korosProps, style, shift: false, compact: false }} />
      </div>
    );
  };

  if (currentVariant === 'backgroundImage') {
    return (
      <div {...heroElementAttributes}>
        <div className={styles.withBackgroundContainer}>
          <div className={classNames(styles.withBackgroundBackground)}>
            <Image />
            <KorosInContainer {...korosStyle} containerClassName={styles.backgroundImageKoros} />
          </div>
          <div className={classNames(styles.content)}>
            <Content />
            <div className={styles.emptyColumn} />
          </div>
        </div>
      </div>
    );
  }

  if (currentVariant === 'diagonalKoros') {
    return (
      <div {...heroElementAttributes}>
        <div className={styles.diagonalKorosWithBackgroundContainer}>
          <div className={styles.content}>
            <div className={styles.contentColums}>
              <Content />
              <div className={styles.emptyColumn} />
            </div>
          </div>
          <div className={styles.korosAligner}>
            <div className={styles.diagonalKorosAndBackground}>
              <KorosInContainer {...korosStyle} />
            </div>
          </div>
          <ImageAsBackground className={styles.diagonalKorosBackgroundContainer} />
        </div>
      </div>
    );
  }

  const hideKoros = !!koros?.hide;
  const flipHorizontal = koros?.flipHorizontal;
  const hasImage = !!imageSrc && currentVariant !== 'noImage';
  const columnStyle = hasImage && currentVariant !== 'imageBottom' ? styles.twoColumns : styles.singleColumn;
  return (
    <div {...heroElementAttributes}>
      <div className={styles.container}>
        <div key="content" className={classNames(styles.content, columnStyle)}>
          {hasImage && currentVariant === 'imageLeft' && <TwoColumsImage />}
          <Content />
          {hasImage && currentVariant === 'imageRight' && <TwoColumsImage />}
        </div>
      </div>
      {!hasImage && !hideKoros && (
        <KorosInContainer
          {...korosStyle}
          inward={!flipHorizontal}
          flipHorizontal={flipHorizontal}
          containerClassName={flipHorizontal ? styles.korosContainerOverflowBottom : undefined}
        />
      )}
      {hasImage && (
        <div key="korosAndImageContainer" className={classNames(styles.korosAndImageContainer)}>
          <KorosInContainer {...korosStyle} flipHorizontal={flipHorizontal !== false} />
          <div key="imageContainer" className={classNames(styles.imageBelowKoros)}>
            <Image />
          </div>
        </div>
      )}
    </div>
  );
};

Hero.Title = Title;
Hero.Text = Text;
