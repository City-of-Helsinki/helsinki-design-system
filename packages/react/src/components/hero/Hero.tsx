import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Hero.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import { Koros, KorosProps, KorosShiftSpacer } from '../koros';
import { getChildrenAsArray } from '../../utils/getChildren';
import { FCWithName } from '../../common/types';

type HTMLElementAttributes = React.HtmlHTMLAttributes<HTMLDivElement>;
type ImgElementAttributes = React.ImgHTMLAttributes<HTMLImageElement>;
export type HeroProps = React.PropsWithChildren<
  HTMLElementAttributes & {
    theme?: HeroCustomTheme;
    koros?: Omit<KorosProps, 'rotate'> & {
      hide?: boolean;
    };
  }
>;

export interface HeroCustomTheme {
  '--background-color'?: string;
  '--color'?: string;
  '--image-position'?: string;
  '--koros-color'?: string;
  '--horizontal-padding-small'?: string;
  '--horizontal-padding-medium'?: string;
  '--horizontal-padding-large'?: string;
  '--horizontal-padding-x-large'?: string;
}

export type ChildProps = {
  imageChildIndex: number;
  cardChildIndex: number;
  wideImageChildIndex?: number;
  components: React.ReactElement[];
};

const pickChildProps = (children: React.ReactNode): ChildProps => {
  const childProps: ChildProps = {
    imageChildIndex: -1,
    cardChildIndex: -1,
    components: [],
  };

  getChildrenAsArray(children).forEach((child, index) => {
    const { componentName } = (child.type as FCWithName) || {};
    childProps.components.push(child);
    switch (componentName) {
      case 'ImageContainer': {
        childProps.imageChildIndex = index;
        break;
      }
      case 'WideImage': {
        childProps.wideImageChildIndex = index;
        break;
      }
      case 'Card': {
        childProps.cardChildIndex = index;
        break;
      }
      default: {
        break;
      }
    }
  });
  return childProps;
};

const Card = ({
  children,
  centered,
  className,
  ...elementAttributes
}: React.PropsWithChildren<HTMLElementAttributes & { centered?: boolean }>) => {
  const classNameList = centered
    ? classNames(styles.card, styles.centeredContent, className)
    : classNames(styles.card, className);
  return (
    <div {...elementAttributes} className={classNameList}>
      {children}
    </div>
  );
};

Card.componentName = 'Card';

const ImageContainer = (props: ImgElementAttributes) => {
  return (
    /* eslint-disable-next-line jsx-a11y/alt-text */
    <img className={styles.image} {...props} aria-hidden alt="" />
  );
};

ImageContainer.componentName = 'ImageContainer';

const WideImage = (props: ImgElementAttributes) => {
  return <ImageContainer {...props} />;
};

WideImage.componentName = 'WideImage';

export const Hero = ({ children, theme, koros, ...elementAttributes }: HeroProps) => {
  const { components, imageChildIndex, backgroundChildIndex, wideImageChildIndex, cardChildIndex } = pickChildProps(
    children,
  );
  const editableTheme = { ...theme };
  if (!editableTheme['--koros-color']) {
    editableTheme['--koros-color'] = 'var(--background-color)';
  }
  const customThemeClass = useTheme<HeroCustomTheme>(styles.hero, editableTheme);
  const korosStyle = { fill: 'var(--koros-color)' };
  const hideKoros = !!koros?.hide;
  const canKorosBeFlipped = koros?.flipHorizontal !== false;

  const getHeroType = () => {
    if (wideImageChildIndex > -1) {
      return 'wideImage';
    }
    if (imageChildIndex === -1) {
      return 'textOnly';
    }
    return imageChildIndex === 0 ? 'imageLeft' : 'imageRight';
  };

  const type = getHeroType();
  const heroElementAttributes: HTMLElementAttributes = {
    ...elementAttributes,
    className: classNames(
      styles.hero,
      customThemeClass,
      styles[type],
      (elementAttributes as HTMLElementAttributes).className,
    ),
  };

  const Content = () => (
    <>
      {components.map((c, index) => {
        if (index === imageChildIndex) {
          return (
            <div key="imageContainer" className={styles.twoColumnsImageContainer}>
              {c}
            </div>
          );
        }
        if (index === wideImageChildIndex) {
          return null;
        }
        return c;
      })}
    </>
  );

  const ImageClone = () => {
    const imageIndex = type === 'wideImage' ? wideImageChildIndex : imageChildIndex;
    if (imageIndex === -1) {
      return null;
    }
    const imageComponent = components[imageIndex];
    const clonedProps = { ...imageComponent.props };
    if (clonedProps.id) {
      clonedProps.id = `${clonedProps.id}-clone`;
    }
    return React.cloneElement(imageComponent, clonedProps);
  };

  const columnStyle = imageChildIndex > -1 && cardChildIndex > -1 ? styles.twoColumns : styles.singleColumn;
  return (
    <div {...heroElementAttributes}>
      <div key="content" className={classNames(styles.content, columnStyle)}>
        <Content />
        {!hideKoros && !canKorosBeFlipped && <KorosShiftSpacer {...koros} />}
      </div>
      {!hideKoros && <Koros {...koros} flipHorizontal={canKorosBeFlipped} style={korosStyle} />}
      {type !== 'textOnly' && (
        <div key="imageContainer" className={classNames(styles.imageContainer, styles.imageBelowKoros)}>
          <ImageClone />
        </div>
      )}
    </div>
  );
};
Hero.Card = Card;
Hero.Image = ImageContainer;
Hero.WideImage = WideImage;
