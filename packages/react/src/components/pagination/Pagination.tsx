import React, { useEffect, useMemo, useRef, useState } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

// import core base styles
import 'hds-core';
import styles from './Pagination.module.scss';
import classNames from '../../utils/classNames';
import { Button } from '../button';
import { IconAngleLeft, IconAngleRight } from '../../icons';
import { useTheme } from '../../hooks/useTheme';

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

const range = (start, end) => {
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
    ...(siblingsStart > 3 ? ['start-ellipsis'] : pageCount - 1 > 2 ? [2] : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < pageCount - 2 ? ['end-ellipsis'] : pageCount - 1 > 1 ? [pageCount - 1] : []),

    ...endPages,
  ];
};

export interface PaginationCustomTheme {
  /**
   * Colour of the active page background. Use black, white or any of the brand colours.
   */
  '--active-page-background-color'?: string;
}

export type PaginationProps = {
  /**
   * Data test id of pagination
   */
  dataTestId?: string;
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
  onChange?: (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, index: number) => void;
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
};

export const Pagination = ({
  dataTestId = 'hds-pagination',
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
}: PaginationProps) => {
  const initialPageIndex = useRef(pageIndex);
  const [hasUserChangedPage, setHasUserChangedPage] = useState<boolean>(false);

  useEffect(() => {
    if (hasUserChangedPage === false) {
      if (pageIndex !== initialPageIndex.current) {
        setHasUserChangedPage(true);
      }
    }
  }, [pageIndex, hasUserChangedPage]);

  const itemList = useMemo(() => createPaginationItemList({ pageCount, pageIndex, siblingCount }), [
    pageCount,
    pageIndex,
    siblingCount,
  ]);

  const customThemeClass = useTheme<PaginationCustomTheme>(styles.pagination, theme);

  if (pageCount <= 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <nav
        className={classNames(styles.pagination, customThemeClass, hideNextButton ? styles.hideNextButton : '')}
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
            data-testid={`${dataTestId}-previous-button`}
            disabled={pageIndex === 0 || pageCount === 1}
            onClick={(event) => onChange(event, pageIndex - 1)}
            variant="supplementary"
            theme="black"
            iconLeft={<IconAngleLeft />}
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

            return (
              <li key={pageItem}>
                <a
                  className={classNames(styles.itemLink, pageIndex + 1 === pageItem ? styles.itemLinkActive : '')}
                  data-testid={`${dataTestId}-page-${pageItem}`}
                  href={pageHref(pageItem as number)}
                  onClick={onChange ? (event) => onChange(event, (pageItem as number) - 1) : undefined}
                  title={mapLangToPageTitle(pageItem as number, language, pageItem === pageIndex + 1)}
                  aria-label={mapLangToPageAriaLabel(pageItem as number, language)}
                  aria-current={pageIndex + 1 === pageItem ? 'page' : false}
                >
                  {pageItem}
                </a>
              </li>
            );
          })}
        </ul>
        {!hideNextButton && (
          <Button
            className={styles.buttonNext}
            data-testid={`${dataTestId}-next-button`}
            disabled={pageIndex === pageCount - 1 || pageCount === 1}
            onClick={(event) => onChange(event, pageIndex + 1)}
            variant="supplementary"
            theme="black"
            iconRight={<IconAngleRight className={styles.angleRightIcon} />}
          >
            {mapLangToNext(language)}
          </Button>
        )}
      </nav>
    </div>
  );
};
