import React, { useRef } from 'react';

// import core base styles
import 'hds-core';
import styles from './Linkbox.module.scss';
import { IconArrowRight, IconLinkExternal } from '../../icons';
import classNames from '../../utils/classNames';

export type LinkboxProps = {
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
   * The image props passed to the linkbox image. Image variant requires prop withImg set to true.
   */
  imgProps?: React.ComponentPropsWithoutRef<'img'>;
  /**
   * The aria-label for the link (arrow or external icon) that is located at the bottom of the linkbox.
   */
  linkAriaLabel: string;
  /**
   * The aria-label for the whole linkbox region. Remember to tell users of assistive technology that they are inside
   * a linkbox. Check storybook examples on how it can be done.
   */
  linkboxAriaLabel: string;
  /**
   * Boolean for the variant with no background color. Changes paddings also. Defaults to false.
   */
  noBackground?: boolean;
  /**
   * The aria-label for opening link in an external domain. Active when external prop is true.
   */
  openInExternalDomainAriaLabel?: string;
  /**
   * Boolean indicating whether the link will open in new tab or not. Defaults to false.
   */
  openInNewTab?: boolean;
  /**
   * The aria-label for opening link in a new tab
   */
  openInNewTabAriaLabel?: string;
  /**
   * Optional text of the linkbox.
   */
  text?: string;
  /**
   * Boolean indicating whether the Linkbox contains a border or not. Defaults to false.
   */
  withBorder?: boolean;
  /**
   * Size variant for the linkbox. Affects texts and paddings.
   */
  size?: 'small' | 'medium' | 'large';
} & Omit<React.ComponentPropsWithoutRef<'a'>, 'tabIndex'>;

export const Linkbox = ({
  children,
  className,
  external = false,
  heading,
  headingAriaLevel = 2,
  href,
  imgProps,
  linkAriaLabel,
  linkboxAriaLabel,
  noBackground = false,
  openInExternalDomainAriaLabel,
  openInNewTab = false,
  openInNewTabAriaLabel,
  text,
  withBorder = false,
  size = 'medium',
  ...rest
}: LinkboxProps) => {
  const linkRef = useRef(null);

  const composeAriaLabel = (ariaLabel) => {
    const newTabText = openInNewTab ? openInNewTabAriaLabel || 'Avautuu uudessa välilehdessä.' : '';
    const externalText = external ? openInExternalDomainAriaLabel || 'Siirtyy toiseen sivustoon.' : '';
    let extendedAriaLabel = '';

    if (ariaLabel && ariaLabel.slice(-1) !== '.') {
      extendedAriaLabel = `${ariaLabel}.`;
    }

    return [extendedAriaLabel, newTabText, externalText].filter((txt) => txt).join(' ');
  };

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
      className={classNames(styles.linkbox, withBorder && styles.withBorder, className)}
      aria-label={composeAriaLabel(linkboxAriaLabel)}
    >
      {imgProps && <img {...imgProps} className={styles.image} alt="" />}
      <div
        className={classNames(
          noBackground && styles.withoutBackground,
          !noBackground && styles.withBackground,
          noBackground && !imgProps && styles.paddingWithoutImageAndWithoutBackground,
          !noBackground && !imgProps && styles.paddingWithoutImageAndWithBackground,
          imgProps && size === 'small' && styles.withSmallImage,
          imgProps && size === 'medium' && styles.withMediumImage,
          imgProps && size === 'large' && styles.withLargeImage,
          size === 'small' && styles.contentSmall,
          size === 'medium' && styles.contentMedium,
          size === 'large' && styles.contentLarge,
        )}
      >
        {heading && (
          <div
            role="heading"
            aria-level={headingAriaLevel}
            className={classNames(
              size === 'small' && styles.headingSmall,
              size === 'medium' && styles.headingMedium,
              size === 'large' && styles.headingLarge,
            )}
          >
            {heading}
          </div>
        )}
        {text && <p className={styles.text}>{text}</p>}
        {children}
      </div>
      <a
        className={styles.link}
        aria-label={composeAriaLabel(linkAriaLabel)}
        ref={linkRef}
        tabIndex={-1}
        href={href}
        {...(openInNewTab && { target: '_blank', rel: 'noopener' })}
        {...rest}
      >
        {external ? (
          <IconLinkExternal
            className={classNames(
              styles.icon,
              noBackground
                ? styles.iconWhenNoBackground
                : size === 'large' && styles.iconPositionForLinkboxLargeVariant,
            )}
            size="l"
            aria-hidden
          />
        ) : (
          <IconArrowRight
            className={classNames(
              styles.icon,
              noBackground
                ? styles.iconWhenNoBackground
                : size === 'large' && styles.iconPositionForLinkboxLargeVariant,
            )}
            size="l"
            aria-hidden
          />
        )}
      </a>
    </div>
  );
};
