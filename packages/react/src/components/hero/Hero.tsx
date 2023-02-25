import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Hero.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import { Koros, KorosProps, KorosShiftSpacer } from '../koros';

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
    variant?: 'imageLeft' | 'imageRight' | 'backgroundTop' | 'wideImage' | 'diagonalKoros' | 'textOnly';
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
   * Koros of the koros
   * Default --background-color
   */
  '--koros-color'?: string;
  /**
   * The 'backgroundTop' variant might need a custom color for the bottom/mobile koros.
   * Default none
   */
  '--bottom-koros-color'?: string;
  /**
   * The "diagonalKoros" variant might need koros position adjustment, if texts overflow.
   * This is an inset value with "top right bottom left"
   * Default "auto auto 10% -33%"
   */
  '--diagonal-koros-inset'?: string;
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
  const currentVariant: HeroProps['variant'] = variant || (imageSrc ? 'imageLeft' : 'textOnly');
  const customThemeClass = useTheme<HeroCustomTheme>(styles.hero, editableTheme);
  const korosStyle = { fill: 'var(--koros-color)' };
  const hideKoros = !!koros?.hide;
  const canKorosBeFlipped = koros?.flipHorizontal !== false;

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

  if (currentVariant === 'backgroundTop') {
    const TopOrBottomKoros = ({ top }: { top?: boolean }) => {
      const className = top ? styles.topKoros : styles.bottomKoros;
      const korosFillColor =
        !top && theme && theme['--bottom-koros-color'] ? theme['--bottom-koros-color'] : 'var(--koros-color)';
      return (
        <Koros
          {...koros}
          shift
          compact
          className={`${(koros && koros.className) || ''} ${className}`}
          style={{ fill: korosFillColor }}
        />
      );
    };

    return (
      <div {...heroElementAttributes}>
        <div className={styles.withBackgroundContainer}>
          <ImageAsBackground />
          <TopOrBottomKoros top />
          <div className={classNames(styles.content)}>
            <Content />
            <div className={styles.emptyColumn} />
          </div>
        </div>
        <TopOrBottomKoros />
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
            <div className={styles.diagonalKorosMobileKoros}>
              <Koros {...koros} flipHorizontal shift compact style={korosStyle} />
            </div>
          </div>
          <Koros {...koros} className={styles.diagonalKorosAndBackground} style={korosStyle} />
          <ImageAsBackground className={styles.diagonalKorosBackgroundContainer} />
        </div>
      </div>
    );
  }

  const hasImage = !!imageSrc && currentVariant !== 'textOnly';
  const columnStyle = hasImage && currentVariant !== 'wideImage' ? styles.twoColumns : styles.singleColumn;
  return (
    <div {...heroElementAttributes}>
      <div className={styles.container}>
        <div key="content" className={classNames(styles.content, columnStyle)}>
          {hasImage && currentVariant === 'imageLeft' && <TwoColumsImage />}
          <Content />
          {hasImage && currentVariant === 'imageRight' && <TwoColumsImage />}
          {!hideKoros && !canKorosBeFlipped && <KorosShiftSpacer {...koros} />}
        </div>
      </div>
      {!hideKoros && <Koros {...koros} flipHorizontal={canKorosBeFlipped} style={korosStyle} />}
      {hasImage && (
        <div key="imageContainer" className={classNames(styles.imageContainer, styles.imageBelowKoros)}>
          <Image />
        </div>
      )}
    </div>
  );
};
