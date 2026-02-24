import React, { useState, useRef } from 'react';

import styles from './HeaderSearch.module.scss';
import {
  Search,
  SearchFunction,
  TextKey as SearchTextKey,
  SearchInputHandle,
} from '../../../dropdownComponents/search';
import { SupportedLanguage } from '../../../dropdownComponents/modularOptionList/types';
import { Button } from '../../../button';
import { Notification } from '../../../notification';
import { MergeAndOverrideProps } from '../../../../utils/elementTypings';
import classNames from '../../../../utils/classNames';
import { HeaderActionBarItem, HeaderActionBarItemProps } from '../headerActionBarItem';
import { IconSearch, IconCross } from '../../../../icons';

export type TextKey = SearchTextKey | 'heading' | 'buttonLabel' | 'closeLabel' | 'placeholder';
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
     */
    buttonIcon?: JSX.Element;
  }
>;

export const HeaderSearch = ({
  onSubmit,
  onSearch,
  texts,
  buttonIcon = <IconSearch />,
  id,
  className,
  // HeaderActionBarItem specific props
  fixedRightPosition,
  labelOnRight,
  iconClassName,
  dropdownClassName,
  // Native HTML attributes for the search container div
  ...nativeDivProps
}: HeaderSearchProps) => {
  const searchInputRef = useRef<SearchInputHandle>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Use id for internal element IDs, or use default
  const internalId = id || 'header-search';

  // Called by Search's onSend (Enter key) and indirectly by the external button via submit()
  const handleSubmit = (value: string) => {
    if (value) {
      setNotificationMessage(`Search submitted: "${value}"`);
      setShowNotification(true);
      if (onSearch) {
        onSearch(value, [], undefined);
      }
      if (onSubmit) {
        onSubmit(value);
      }
    }
  };

  // External button click: submit() closes dropdown + adds to history + calls onSend (handleSubmit)
  const onSearchButtonClick = () => {
    if (searchInputRef.current?.submit) {
      searchInputRef.current.submit();
    }
  };

  const searchProps = {
    id: `${internalId}-search-component`,
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
        id={internalId}
        label={texts?.buttonLabel || 'Search'}
        icon={buttonIcon}
        closeIcon={<IconCross />}
        closeLabel={texts?.closeLabel || 'Close'}
        fixedRightPosition={fixedRightPosition}
        labelOnRight={labelOnRight}
        iconClassName={iconClassName}
        dropdownClassName={dropdownClassName}
        className={styles.headerSearchButton}
        preventButtonResize
        fullWidthDropdown
      >
        <li style={{ padding: 0 }}>
          <div {...nativeDivProps} id={id} className={classNames(styles.searchContainer, className)} role="search">
            <div>
              <h3>{texts.heading}</h3>
              <div className={classNames(styles.searchRow)}>
                <Search
                  {...searchProps}
                  historyId={`${internalId}-search-input`}
                  ref={searchInputRef}
                  texts={texts}
                  onSearch={onSearch}
                  onSend={handleSubmit}
                  hideSubmitButton
                />
                <Button onClick={onSearchButtonClick}>{texts?.buttonLabel || 'Search'}</Button>
              </div>
            </div>
          </div>
        </li>
      </HeaderActionBarItem>
    </>
  );
};

HeaderSearch.displayName = 'HeaderSearch';
