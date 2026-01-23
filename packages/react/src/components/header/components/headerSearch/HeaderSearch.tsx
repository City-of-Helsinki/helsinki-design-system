import React, { useCallback, useState, useRef, useEffect } from 'react';

import styles from './HeaderSearch.module.scss';
import { Search, SearchProps } from '../../../dropdownComponents/search';
import { Button } from '../../../button';
import { Notification } from '../../../notification';
import { MergeAndOverrideProps } from '../../../../utils/elementTypings';
import classNames from '../../../../utils/classNames';
import { HeaderActionBarItem, HeaderActionBarItemProps } from '../headerActionBarItem';
import { IconSearch, IconCross } from '../../../../icons';
import { useMobile } from '../../../../hooks/useMobile';

export type NavigationSearchProps = MergeAndOverrideProps<
  Omit<HeaderActionBarItemProps, 'children' | 'id'>,
  {
    /**
     * Callback fired when the search button or Enter key is pressed
     */
    onSubmit?: (value: string) => void;
    /**
     * Callback fired when the search input value is changed
     */
    onChange?: (inputValue: string) => void;
    /**
     * Callback for search function
     */
    onSearch?: SearchProps['onSearch'];
    /**
     * Heading for the search container.
     */
    heading: string | JSX.Element;
    /**
     * Label for the search element.
     */
    label: string;
    /**
     * Placeholder for the search input.
     */
    placeholder: string;
    /**
     * Label for the action bar button.
     * @default "Haku"
     */
    buttonLabel?: string;
    /**
     * Icon for the action bar button.
     */
    buttonIcon?: JSX.Element;
    /**
     * ID for the search component.
     * @default "header-search"
     */
    id?: string;
    /**
     * Label for the close button when dropdown is open.
     * @default "Close"
     */
    closeLabel?: string | JSX.Element;
  }
>;

export const HeaderSearch = ({
  onSubmit,
  onChange,
  onSearch,
  heading,
  label,
  placeholder = '',
  buttonLabel = 'Search',
  buttonIcon = <IconSearch />,
  id = 'header-search',
  className,
  fullWidthDropdown = true,
  closeLabel = 'Close',
  ...rest
}: NavigationSearchProps) => {
  const [value, setValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const isMobile = useMobile();

  const onSend = (val: string) => {
    console.log('Search submitted test:', val);
    setNotificationMessage(`Search submitted: "${val}"`);
    setShowNotification(true);
    if (onSearch) {
      onSearch(val, [], undefined);
    }
    if (onSubmit) {
      onSubmit(val);
    }
  };

  const onChangeWrap = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('ONCHANGE --> Search changed:', e.target.value);
    setValue(e.target.value);
    if (onChange) {
      onChange(value);
    }
  };

  const onBlurWrap = () => {
    console.log('ONBLUR --> Search blurred');
  };

  const onFocusWrap = () => {
    console.log('ONFOCUS --> Search focused');
  };

  const onSearchButtonClick = () => {
    const currentValue = searchInputRef.current?.value;
    if (currentValue) {
      onSend(currentValue);
    }
  };

  const [props] = useState({
    id: `${id}-search-component`,
  });

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
        label={buttonLabel}
        icon={buttonIcon}
        closeIcon={<IconCross />}
        closeLabel={closeLabel}
        fullWidthDropdown={fullWidthDropdown}
        preventButtonResize
        className={styles.headerSearchButton}
      >
        <div className={classNames(styles.searchContainer, className)} role="search">
          <h3>{heading}</h3>
          <div className={classNames(styles.searchRow)} >
            <Search
              {...props}
              historyId={`${id}-search-input`}
              ref={searchInputRef}
              texts={{
                label: label,
                searchPlaceholder: placeholder,
                language: 'fi',
              }}
              onBlur={onBlurWrap}
              onFocus={onFocusWrap}
              onSearch={onSearch}

              {...(isMobile ? { onSend } : {})}
            />
            {!isMobile && <Button onClick={onSearchButtonClick}>{buttonLabel}</Button>}
          </div>
        </div>
      </HeaderActionBarItem>
    </>
  );
};

HeaderSearch.displayName = 'HeaderSearch';
