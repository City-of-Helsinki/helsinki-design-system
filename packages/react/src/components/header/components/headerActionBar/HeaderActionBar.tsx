import React, {
  ReactElement,
  PropsWithChildren,
  MouseEventHandler,
  EventHandler,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  ReactNode,
} from 'react';

import styles from './HeaderActionBar.module.scss';
import { styleBoundClassNames } from '../../../../utils/classNames';
import { Logo } from '../../../logo';
import { LinkItem, LinkProps } from '../../../../internal/LinkItem';
import { HeaderActionBarNavigationMenu } from './HeaderActionBarNavigationMenu';
import { HeaderLanguageSelectorConsumer, getLanguageSelectorComponentProps } from '../headerLanguageSelector';
import { useCallbackIfDefined, useEnterOrSpacePressCallback } from '../../../../utils/useCallback';
import { HeaderActionBarItem } from '../headerActionBarItem';
import HeaderActionBarLogo from './HeaderActionBarLogo';
import { getChildElementsEvenIfContainersInbetween } from '../../../../utils/getChildren';
import { useHeaderContext, useSetHeaderContext } from '../../HeaderContext';
import { HeaderActionBarItemProps } from '../headerActionBarItem/HeaderActionBarItem';
import { IconCross, IconMenuHamburger } from '../../../../icons';
import { AllElementPropsWithoutRef } from '../../../../utils/elementTypings';

const classNames = styleBoundClassNames(styles);

const addDocumentFocusPrevention = (
  modalContainer: HTMLElement,
  originalTabIndexes: React.MutableRefObject<Map<Element, string | null>>,
) => {
  const isFocusableByDefault = (element: Element): boolean => {
    const focusableElements = [
      'a[href]',
      'area[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex="-1"])',
    ];
    return focusableElements.some((selector) => element.matches(selector));
  };

  const isFocusableByTabIndex = (element: Element): boolean => {
    const tabIndex = window.getComputedStyle(element).getPropertyValue('tabindex');
    return tabIndex !== '' && tabIndex !== '-1';
  };

  const isFocusableByScroll = (element: Element): boolean => {
    const { overflowX, overflowY } = window.getComputedStyle(element);
    return overflowY === 'auto' || overflowY === 'scroll' || overflowX === 'auto' || overflowX === 'scroll';
  };

  if (modalContainer) {
    const allElements = document.querySelectorAll('*');

    Array.from(allElements)
      .filter((element) => !modalContainer.contains(element))
      .filter(
        (element) => isFocusableByDefault(element) || isFocusableByTabIndex(element) || isFocusableByScroll(element),
      )
      .forEach((element) => {
        originalTabIndexes.current.set(element, element.getAttribute('tabindex'));
        element.setAttribute('tabindex', '-1');
      });

    return () => {
      originalTabIndexes.current.forEach((tabIndex, element) => {
        if (tabIndex === null) {
          element.removeAttribute('tabindex');
        } else {
          element.setAttribute('tabindex', tabIndex);
        }
      });
      originalTabIndexes.current.clear();
    };
  }
  return null;
};

const addDocumentScrollPrevention = (actionBar?: HTMLElement) => {
  if (document && actionBar) {
    // Getting the closest ancestor HTML. Get the closest in case of iframes or such
    const closestHtmlElement = actionBar.closest('html');
    closestHtmlElement.style.overflow = 'hidden';

    return () => {
      closestHtmlElement.style.removeProperty('overflow');
    };
  }
  return null;
};

export enum TitleStyleType {
  Normal = 'normal',
  Bold = 'bold',
}

export type HeaderActionBarProps = PropsWithChildren<
  AllElementPropsWithoutRef<'div'> & {
    /**
     * Additional class names to apply.
     */
    className?: string;
    /**
     * Label for front page link in mobile navigation menu.
     */
    frontPageLabel: string;
    /**
     * Logo to use
     */
    logo: React.ReactElement<typeof Logo>;
    /**
     * The aria-label for the logo to screen reader users.
     */
    logoAriaLabel?: string;
    /**
     * Link for the logo.
     */
    logoHref?: string;
    /**
     * The label for the menu button.
     */
    menuButtonLabel?: string;
    /**
     * The aria-label for the menu button to screen reader users.
     */
    menuButtonAriaLabel?: string;
    /**
     * Callback fired when the logo is clicked.
     */
    onLogoClick?: MouseEventHandler;
    /**
     * Callback fired when the mobile menu is clicked.
     */
    onMenuClick?: MouseEventHandler;
    /**
     * Callback fired when the title is clicked.
     */
    onTitleClick?: MouseEventHandler;
    /**
     * Aria-label for describing opening main navigation links into view in mobile navigation menu.
     */
    openFrontPageLinksAriaLabel?: string;
    /**
     * ARIA role to describe the contents.
     */
    role?: string;
    /**
     * Service name that is displayed next to the Helsinki logo.
     */
    title: string;
    /**
     * The aria-label for the title describing the service to screen reader users.
     */
    titleAriaLabel?: string;
    /**
     * Link for the title.
     */
    titleHref: string;
    /**
     * Style for title.
     */
    titleStyle?: TitleStyleType;
  }
>;

export const HeaderActionBar = ({
  title,
  titleStyle,
  titleAriaLabel,
  logoAriaLabel,
  menuButtonLabel = 'Menu',
  menuButtonAriaLabel,
  titleHref,
  logoHref,
  logo,
  onTitleClick,
  onLogoClick,
  onMenuClick,
  children,
  className,
  frontPageLabel,
  openFrontPageLinksAriaLabel,
  ...rest
}: HeaderActionBarProps) => {
  const handleClick = useCallbackIfDefined(onTitleClick);
  const handleLogoClick = useCallbackIfDefined(onLogoClick);
  const handleKeyPress = useEnterOrSpacePressCallback(handleClick);
  const handleLogoKeyPress = useEnterOrSpacePressCallback(handleLogoClick);
  const { hasNavigationContent, mobileMenuOpen, isSmallScreen } = useHeaderContext();
  const { setMobileMenuOpen } = useSetHeaderContext();
  const actionBarRef = useRef<HTMLDivElement>();
  const documentTabIndexes = useRef(new Map());

  useEffect(() => {
    if (mobileMenuOpen && actionBarRef !== undefined) {
      // When mobile menu is open, set all elements of document unfocusable outside action bar
      const removeFocusPrevention = addDocumentFocusPrevention(actionBarRef.current, documentTabIndexes);
      // Set overflow: hidden to html tag so page content under the mobile menu is not scrollable
      const removeScrollPrevention = addDocumentScrollPrevention(actionBarRef.current);

      return () => {
        removeFocusPrevention();
        removeScrollPrevention();
      };
    }

    // Returning null from useEffect is prohibited, but undefined is fine
    return undefined;
  }, [actionBarRef, mobileMenuOpen]);

  const handleMenuClickCapture = useCallbackIfDefined(onMenuClick);
  const handleMenuClick: EventHandler<MouseEvent> = (event) => {
    if (!event.isPropagationStopped()) {
      setMobileMenuOpen(!mobileMenuOpen);
    }
    if (onMenuClick) onMenuClick(event);
  };

  const logoProps: LinkProps = {
    'aria-label': logoAriaLabel,
    href: logoHref,
    ...(logoHref ? { role: 'link' } : {}),
    className: classNames(styles.titleAndLogoContainer, styles.logo),
    onClick: handleLogoClick,
    onKeyPress: handleLogoKeyPress,
  };

  const titleProps: LinkProps = {
    'aria-label': titleAriaLabel,
    href: titleHref,
    className: classNames(styles.titleAndLogoContainer, styles.title, styles[titleStyle]),
    onClick: onTitleClick,
    onKeyPress: handleLogoKeyPress,
  };

  if (!(titleProps.href || titleProps.onClick)) {
    titleProps.role = titleAriaLabel && 'img';
  } else {
    titleProps.onKeyPress = handleKeyPress;
    titleProps.onClick = handleClick;
  }
  const validatedChildren = (Array.isArray(children) ? children : [children]).filter((item) =>
    React.isValidElement(item),
  );

  const getFixedRightPosition = (item: ReactElement | ReactNode) =>
    !!((item as ReactElement).props as HeaderActionBarItemProps).fixedRightPosition;

  const childrenLeft = validatedChildren.filter((item) => !getFixedRightPosition(item));
  const childrenRight = validatedChildren.filter((item) => getFixedRightPosition(item));
  const {
    children: lsChildren,
    props: lsProps,
    componentExists,
  } = getLanguageSelectorComponentProps(validatedChildren);
  const languageSelectorChildren = useMemo(() => {
    return lsChildren ? getChildElementsEvenIfContainersInbetween(lsChildren) : null;
  }, [lsChildren]);
  return (
    <>
      <div
        className={classNames(styles.headerActionBarContainer, mobileMenuOpen && styles.mobileMenuContainer)}
        ref={actionBarRef}
      >
        <div {...rest} className={classNames(styles.headerActionBar, className)}>
          <HeaderActionBarLogo logo={logo} logoProps={logoProps} />
          {title && (
            <LinkItem {...titleProps}>
              <span className={classNames(styles.title)}>{title}</span>
            </LinkItem>
          )}
          <div className={styles.headerActions}>
            {componentExists && (
              <HeaderLanguageSelectorConsumer {...lsProps}>{languageSelectorChildren}</HeaderLanguageSelectorConsumer>
            )}
            {childrenLeft}
            {(hasNavigationContent || childrenRight.length > 0) && isSmallScreen && (
              <HeaderActionBarItem
                id="Menu"
                label={menuButtonLabel}
                aria-label={menuButtonAriaLabel}
                onClick={handleMenuClick}
                onClickCapture={handleMenuClickCapture}
                icon={mobileMenuOpen ? <IconCross /> : <IconMenuHamburger />}
              />
            )}
            {!isSmallScreen && childrenRight.length > 0 && (
              <>
                <hr aria-hidden="true" />
                {childrenRight}
              </>
            )}
          </div>
        </div>
        {isSmallScreen && (
          <HeaderActionBarNavigationMenu
            frontPageLabel={frontPageLabel}
            titleHref={titleHref}
            logo={logo}
            logoProps={logoProps}
            openFrontPageLinksAriaLabel={openFrontPageLinksAriaLabel}
            actionBarItems={childrenRight as unknown as HeaderActionBarItemProps[]}
          />
        )}
      </div>
      {componentExists && (
        <HeaderLanguageSelectorConsumer {...lsProps} fullWidthForMobile>
          {languageSelectorChildren}
        </HeaderLanguageSelectorConsumer>
      )}
    </>
  );
};

HeaderActionBar.defaultProps = {
  titleStyle: TitleStyleType.Normal,
};
