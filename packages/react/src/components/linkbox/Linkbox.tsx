import React, { useRef } from 'react';

// import core base styles
import 'hds-core';
import styles from './Linkbox.module.scss';
import { IconArrowRight, IconLinkExternal } from '../../icons';
import classNames from '../../utils/classNames';

export type LinkboxProps = React.ComponentPropsWithoutRef<'a'> & {
  ariaLabel: string;
  /**
   * Boolean indicating for external link that takes user to an entirely new web site. Defaults to false.
   */
  external?: boolean;
  /**
   * Optional heading of the linkbox.
   */
  heading?: string;
  /**
   * Heading level for linkbox title. Defaults to 2.
   */
  headingAriaLevel?: number;
  /**
   * The image props passed to the hero image. Image variant requires prop withImg set to true.
   */
  imgProps?: React.ComponentPropsWithoutRef<'img'>;
  /**
   * Boolean for the variant with no background color. Changes paddings also. Defaults to false.
   */
  noBackground?: boolean;
  /**
   * Optional text of the linkbox.
   */
  text?: string;
  /**
   * Boolean indicating whether the Linkbox contains a border or not. Defaults to false.
   */
  withBorder?: boolean;
  /**
   * Boolean indicating whether the Linkbox contains a hero image or not. Defaults to false.
   */
  withImg?: boolean;
  /**
   * Size variant for the linkbox when accompanied with an img. Defaults to 'small'
   */
  withImgSize?: 'small' | 'medium' | 'large';
};

export const Linkbox = ({
  ariaLabel,
  children,
  external = false,
  heading,
  headingAriaLevel = 2,
  href,
  imgProps,
  noBackground = false,
  target,
  text,
  withBorder = false,
  withImg = false,
  withImgSize = 'small',
}: LinkboxProps) => {
  const linkRef = useRef(null);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      role="region"
      tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          linkRef.current.click();
        }
      }}
      onClick={() => {
        linkRef.current.click();
      }}
      className={classNames(styles.linkbox, withBorder && styles.withBorder, !withBorder && styles.withoutBorder)}
      aria-label={ariaLabel}
    >
      {withImg && <img {...imgProps} className={styles.image} alt="" />}
      <div
        className={classNames(
          noBackground && styles.withoutBackground,
          !noBackground && styles.withBackground,
          noBackground && !withImg && styles.paddingWithoutImageAndWithoutBackground,
          !noBackground && !withImg && styles.paddingWithoutImageAndWithBackground,
          withImg && withImgSize === 'small' && styles.withSmallImage,
          withImg && withImgSize === 'medium' && styles.withMediumImage,
          withImg && withImgSize === 'large' && styles.withLargeImage,
          withImg && noBackground && styles.horizontalPaddingWithImageAndNoBackground,
        )}
      >
        {heading && (
          <div
            role="heading"
            aria-level={headingAriaLevel}
            className={classNames(
              styles.headingCommon,
              !withImg && styles.headingWithoutImage,
              withImg && withImgSize === 'small' && styles.headingWhenSmallImage,
              withImg && withImgSize === 'medium' && styles.headingWhenMediumImage,
              withImg && withImgSize === 'large' && styles.headingWhenLargeImage,
            )}
          >
            {heading}
          </div>
        )}
        {text && <p className={styles.text}>{text}</p>}
        {children}
        <a className={styles.link} aria-label={ariaLabel} ref={linkRef} tabIndex={-1} href={href} target={target}>
          {external && <IconLinkExternal className={styles.icon} size="l" aria-hidden />}
          {!external && <IconArrowRight className={styles.icon} size="l" aria-hidden />}
        </a>
      </div>
    </div>
  );
};
