import React, { useState, useRef } from 'react';

import styles from './HeaderSearch.module.scss';
import { Search, SearchFunction, TextKey as SearchTextKey } from '../../../dropdownComponents/search';
import { SupportedLanguage } from '../../../dropdownComponents/modularOptionList/types';
import { Button } from '../../../button';
import { Notification } from '../../../notification';
import { MergeAndOverrideProps } from '../../../../utils/elementTypings';
import classNames from '../../../../utils/classNames';
import { HeaderActionBarItem, HeaderActionBarItemProps } from '../headerActionBarItem';
import { IconSearch, IconCross } from '../../../../icons';

export type TextKey = SearchTextKey | 'heading' | 'buttonLabel' | 'placeholder';
export type Texts = Record<TextKey, string> & { language?: SupportedLanguage };

export type HeaderSearchProps = MergeAndOverrideProps<
  Omit<HeaderActionBarItemProps, 'children' | 'id'>,
  {
    /**
     * ID for the search component.
     * @default "header-search"
     */
    id?: string;
    /**
     * Callback fired when the search button or Enter key is pressed
     */
    onSubmit?: (value: string) => void;
    /**
     * Callback for search function
     */
    onSearch?: SearchFunction;
    /**
     * All texts.
     */
    texts?: Partial<Texts>;
    /**
     * Icon for the Search button in the Header.
     * @default "Close"
     */
    buttonIcon?: JSX.Element;
    /**
     * Label or Icon for the close button in the Header when dropdown is open.
     * @default "Close"
     */
    closeLabel?: string | JSX.Element;
  }
>;

export const HeaderSearch = ({
  onSubmit,
  onSearch,
  texts,
  buttonIcon = <IconSearch />,
  id = 'header-search',
  className,
  fullWidthDropdown = true,
  closeLabel = 'Close',
  ...rest
}: HeaderSearchProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const onSend = (val: string) => {
    setNotificationMessage(`Search submitted: "${val}"`);
    setShowNotification(true);
    if (onSearch) {
      onSearch(val, [], undefined);
    }
    if (onSubmit) {
      onSubmit(val);
    }
  };

  const onSearchButtonClick = () => {
    const currentValue = searchInputRef.current?.value;
    if (currentValue) {
      onSend(currentValue);
    }
  };

  const searchProps = {
    id: `${id}-search-component`,
  };

  return (
    <>
      {showNotification && (
        <Notification
          label="Search submitted"
          type="success"
          position="bottom-right"
          autoClose
          closeButtonLabelText="Close notification"
          dismissible
          onClose={() => setShowNotification(false)}
        >
          {notificationMessage}
        </Notification>
      )}
      <HeaderActionBarItem
        {...rest}
        id={id}
        label={texts?.buttonLabel || 'Search'}
        icon={buttonIcon}
        closeIcon={<IconCross />}
        closeLabel={closeLabel}
        fullWidthDropdown={fullWidthDropdown}
        preventButtonResize
        className={styles.headerSearchButton}
      >
        <div className={classNames(styles.searchContainer, className)} role="search">
          <div>
            <h3>{texts.heading}</h3>
            <div className={classNames(styles.searchRow)}>
              <Search
                {...searchProps}
                historyId={`${id}-search-input`}
                ref={searchInputRef}
                texts={texts}
                onSearch={onSearch}
              />
              <Button onClick={onSearchButtonClick}>{texts?.buttonLabel || 'Search'}</Button>
            </div>
          </div>
        </div>
      </HeaderActionBarItem>
    </>
  );
};

HeaderSearch.displayName = 'HeaderSearch';
