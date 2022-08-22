import React, { useMemo } from 'react';

// import core base styles
import 'hds-core';
import styles from './Pagination.module.scss';
import classNames from '../../utils/classNames';
import { Button } from '../button';
import { IconAngleLeft, IconAngleRight } from '../../icons';

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

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export const createPaginationItemList = ({ pageCount, pageIndex, siblingCount }: Partial<PaginationProps>) => {
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

export type PaginationProps = {
  /**
   * If true, hide the previous-page button
   * @default false
   */
  hidePrevButton?: boolean;
  /**
   * If true, hide the next-page button
   * @default false
   */
  hideNextButton?: boolean;
  /**
   * Number of always visible pages before and after the current page
   * @default 1
   */
  siblingCount?: number;
  /**
   * Callback fired when the page is changed
   */
  onChange?: (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, index: number) => void;
  paginationAriaLabel: string;
  pageHref: (index: number) => string;
  pageIndex: number;
  pageCount: number;
  language?: Language;
};

export const Pagination = ({
  hidePrevButton = false,
  hideNextButton = false,
  siblingCount = 1,
  onChange,
  paginationAriaLabel,
  pageCount,
  pageIndex,
  pageHref,
  language = 'fi',
}: PaginationProps) => {
  const itemList = useMemo(() => createPaginationItemList({ pageCount, pageIndex, siblingCount }), [
    pageCount,
    pageIndex,
    siblingCount,
  ]);

  if (pageCount <= 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <nav
        className={classNames(styles.pagination, hideNextButton ? styles.hideNextButton : '')}
        role="navigation"
        aria-label={paginationAriaLabel}
        data-next={mapLangToNext(language)}
      >
        {!hidePrevButton && (
          <Button
            className={styles.buttonPrevious}
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
            if (pageItem === 'start-ellipsis' || pageItem === 'end-ellipsis') {
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
                  href={pageHref(pageItem)}
                  onClick={onChange ? (event) => onChange(event, pageItem - 1) : undefined}
                  title={mapLangToPageTitle(pageItem, language, pageItem === pageIndex + 1)}
                  aria-label={mapLangToPageAriaLabel(pageItem, language)}
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
