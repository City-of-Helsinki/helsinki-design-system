import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import '../../styles/base.module.css';
import styles from './Pagination.module.scss';
import classNames from '../../utils/classNames';
import { Button, ButtonPresetTheme, ButtonVariant } from '../button';
import { IconAngleLeft, IconAngleRight } from '../../icons';
import { useTheme } from '../../hooks/useTheme';
import { AllElementPropsWithoutRef, MergeAndOverrideProps } from '../../utils/elementTypings';

type Language = 'en' | 'fi' | 'sv';

const mapLangToNext = (language: string): string => {
  const next = {
    fi: 'Seuraava',
    sv: 'Nästa',
    en: 'Next',
  };

  return next[language];
};

const mapLangToPrevious = (language: string): string => {
  const previous = {
    fi: 'Edellinen',
    sv: 'Föregående',
    en: 'Previous',
  };

  return previous[language];
};

const mapLangToPageAriaLabel = (pageNumber: number, language: Language): string => {
  const pageAriaLabel = {
    fi: `Sivu ${pageNumber}`,
    sv: `Sida ${pageNumber}`,
    en: `Page ${pageNumber}`,
  };

  return pageAriaLabel[language];
};

const mapLangToPageTitle = (pageNumber: number, language: Language, currentPage: boolean): string => {
  const currentPageTitle = {
    fi: 'Nykyinen sivu',
    sv: 'Nuvarande sida',
    en: 'Current page',
  };

  if (currentPage) {
    return currentPageTitle[language];
  }

  const pageTitle = {
    fi: `Sivu ${pageNumber}`,
    sv: `Sida ${pageNumber}`,
    en: `Page ${pageNumber}`,
  };

  return pageTitle[language];
};

const mapLangToOpenedPage = (pageNumber: number, language: Language): string => {
  const openedPage = {
    fi: `Avattu sivu ${pageNumber}`,
    sv: `Öppnad sida ${pageNumber}`,
    en: `Opened page ${pageNumber}`,
  };

  return openedPage[language];
};

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

enum Ellipsis {
  start = 'start-ellipsis',
  end = 'end-ellipsis',
}

const createPaginationItemList = ({
  pageCount,
  pageIndex,
  siblingCount,
}: Partial<PaginationProps>): (Ellipsis | number)[] => {
  const endPages = range(Math.max(pageCount, 2), pageCount);
  const startPages = range(1, Math.min(1, pageCount));

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      pageIndex + 1 - siblingCount,
      // Lower boundary when page is high
      pageCount - 1 - siblingCount * 2 - 1,
    ),
    // Greater than startPages, because we will insert startPages separately
    3,
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      pageIndex + 1 + siblingCount,
      // Upper boundary when page is low
      1 + siblingCount * 2 + 2,
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : pageCount - 1,
  );

  return [
    ...startPages,
    // start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > 3 ? [Ellipsis.start] : pageCount - 1 > 2 ? [2] : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < pageCount - 2 ? [Ellipsis.end] : pageCount - 1 > 1 ? [pageCount - 1] : []),

    ...endPages,
  ];
};

export interface PaginationCustomTheme {
  /**
   * Colour of the active page background. Use black, white or any of the brand colours.
   */
  '--active-page-background-color'?: string;
}

export type PaginationProps = MergeAndOverrideProps<
  AllElementPropsWithoutRef<'nav'>,
  {
    /**
     * If true, hide the next-page button
     * @default false
     */
    hideNextButton?: boolean;
    /**
     * If true, hide the previous-page button
     * @default false
     */
    hidePrevButton?: boolean;
    /**
     * The language of the pagination component.
     * @default fi
     */
    language?: Language;
    /**
     * Callback fired when the page is changed
     */
    onChange?: (
      event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>,
      index: number,
    ) => void;
    /**
     * The total number of pages
     */
    pageCount: number;
    /**
     * A function for generating the href of pages
     */
    pageHref: (index: number) => string;
    /**
     * The active page index
     */
    pageIndex: number;
    /**
     * Aria-label for the pagination nav element
     */
    paginationAriaLabel: string;
    /**
     * Number of always visible pages before and after the current page
     * @default 1
     */
    siblingCount?: number;
    /**
     * Theme prop for customisation of the Pagination component
     */
    theme?: PaginationCustomTheme;
  }
>;

export const Pagination = ({
  'data-testid': dataTestId,
  hideNextButton = false,
  hidePrevButton = false,
  language = 'fi',
  onChange,
  pageCount,
  pageHref,
  pageIndex,
  paginationAriaLabel,
  siblingCount = 1,
  theme,
  className,
  ...rest
}: PaginationProps) => {
  const initialPageIndex = useRef(pageIndex);
  const activeItemRef = useRef<HTMLSpanElement>();
  const userSelectedIndex = useRef(-1);
  const [hasUserChangedPage, setHasUserChangedPage] = useState<boolean>(false);

  const onChangeWithInternalHandler = useCallback(
    (event, index, wasButtonClick = false) => {
      // do not shift focus away from buttons
      userSelectedIndex.current = wasButtonClick ? -1 : index;
      if (onChange) {
        onChange(event, index);
      }
    },
    [onChange],
  );

  useEffect(() => {
    if (hasUserChangedPage === false) {
      if (pageIndex !== initialPageIndex.current) {
        setHasUserChangedPage(true);
      }
    }
  }, [pageIndex, hasUserChangedPage]);

  useEffect(() => {
    if (userSelectedIndex.current > -1 && activeItemRef.current) {
      // Active element changes from <a> to <span>, so focus is lost after re-render.
      // Move it back manually
      activeItemRef.current.focus();
    }
  }, [userSelectedIndex.current]);

  const itemList = useMemo(
    () => createPaginationItemList({ pageCount, pageIndex, siblingCount }),
    [pageCount, pageIndex, siblingCount],
  );

  const customThemeClass = useTheme<PaginationCustomTheme>(styles.pagination, theme);

  if (pageCount <= 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <nav
        {...rest}
        className={classNames(
          styles.pagination,
          customThemeClass,
          hideNextButton ? styles.hideNextButton : '',
          className,
        )}
        role="navigation"
        aria-label={paginationAriaLabel}
        data-next={mapLangToNext(language)}
        data-testid={dataTestId}
      >
        <VisuallyHidden>
          <span aria-atomic aria-live="polite">
            {hasUserChangedPage ? mapLangToOpenedPage(pageIndex + 1, language) : ''}
          </span>
        </VisuallyHidden>
        {!hidePrevButton && (
          <Button
            className={styles.buttonPrevious}
            data-testid={dataTestId ? `${dataTestId}-previous-button` : undefined}
            disabled={pageIndex === 0 || pageCount === 1}
            aria-disabled={pageIndex === 0 || pageCount === 1 || undefined}
            onClick={(event) => onChangeWithInternalHandler(event, pageIndex - 1, true)}
            variant={ButtonVariant.Supplementary}
            theme={ButtonPresetTheme.Black}
            iconStart={<IconAngleLeft />}
          >
            {mapLangToPrevious(language)}
          </Button>
        )}
        <ul className={styles.pages}>
          {itemList.map((pageItem) => {
            if (pageItem === Ellipsis.start || pageItem === Ellipsis.end) {
              return (
                <li key={pageItem}>
                  <span className={styles.itemEllipsis}>...</span>
                </li>
              );
            }

            const isCurrent = pageIndex + 1 === pageItem;

            return (
              <li key={pageItem}>
                {isCurrent ? (
                  <span
                    className={classNames(styles.itemLink, styles.itemLinkActive)}
                    data-testid={dataTestId ? `${dataTestId}-page-${pageItem}` : undefined}
                    aria-label={`${mapLangToPageAriaLabel(pageItem, language)}. ${mapLangToPageTitle(pageItem, language, true)}.`}
                    aria-current="page"
                    tabIndex={-1}
                    ref={activeItemRef}
                  >
                    {pageItem}
                  </span>
                ) : (
                  <a
                    className={classNames(styles.itemLink)}
                    data-testid={dataTestId ? `${dataTestId}-page-${pageItem}` : undefined}
                    href={pageHref(pageItem)}
                    onClick={(event) => onChangeWithInternalHandler(event, pageItem - 1)}
                    title={mapLangToPageTitle(pageItem, language, false)}
                    aria-label={mapLangToPageAriaLabel(pageItem, language)}
                  >
                    {pageItem}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
        {!hideNextButton && (
          <Button
            className={styles.buttonNext}
            data-testid={dataTestId ? `${dataTestId}-next-button` : undefined}
            disabled={pageIndex === pageCount - 1 || pageCount === 1}
            aria-disabled={pageIndex === pageCount - 1 || pageCount === 1 || undefined}
            onClick={(event) => onChangeWithInternalHandler(event, pageIndex + 1, true)}
            variant={ButtonVariant.Supplementary}
            theme={ButtonPresetTheme.Black}
            iconEnd={<IconAngleRight className={styles.angleRightIcon} />}
          >
            {mapLangToNext(language)}
          </Button>
        )}
      </nav>
    </div>
  );
};
