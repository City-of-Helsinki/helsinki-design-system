import React, { useCallback, useRef, useState } from 'react';

import { Search, SearchProps, SearchInputHandle } from './Search';
import { Notification } from '../../notification';
import { Button, ButtonVariant, ButtonSize } from '../../button';
import { getOptions } from '../modularOptionList/batch.options';
import { CookieConsentContextProvider, CookieBanner } from '../../cookieConsent';
import siteSettings from '../../cookieConsentCore/example/hds_sitesettings.json';

export default {
  component: Search,
  title: 'Components/DropdownComponents/Search',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = () => {
  const [value, setValue] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleSearch: SearchProps['onSearch'] = useCallback((searchValue /* , lastClickedOption, data */) => {
    if (searchValue === 'error') {
      return Promise.reject(new Error('Simulated error'));
    }
    return Promise.resolve({
      groups: [
        {
          label: '',
          options: getOptions(100).filter((s) => (s.value ?? '').toUpperCase().indexOf(searchValue.toUpperCase()) >= 0),
        },
      ],
    });
  }, []);

  const onSend = (val: string) => {
    setNotificationMessage(`Search submitted: "${val}"`);
    setShowNotification(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {};

  const onFocus = () => {};

  const [props] = useState({
    id: 'hds-search-component',
    historyId: 'hds-search-history',
    texts: { label: 'Mitä etsit?' },
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
      <Search
        {...props}
        onSend={onSend}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        value={value}
        onSearch={handleSearch}
      />
      <span>Value: {value}</span>
    </>
  );
};

export const WithExternalButton = () => {
  const searchInputRef = useRef<SearchInputHandle>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleSearch: SearchProps['onSearch'] = useCallback((searchValue /* , lastClickedOption, data */) => {
    if (searchValue === 'error') {
      return Promise.reject(new Error('Simulated error'));
    }
    return Promise.resolve({
      groups: [
        {
          label: '',
          options: getOptions(100).filter((s) => (s.value ?? '').toUpperCase().indexOf(searchValue.toUpperCase()) >= 0),
        },
      ],
    });
  }, []);

  const onSend = (val: string) => {
    setNotificationMessage(`Search submitted: "${val}"`);
    setShowNotification(true);
  };

  const handleExternalButtonClick = () => {
    // Call the submit method to add to history
    if (searchInputRef.current?.submit) {
      searchInputRef.current.submit();
    }

    // Handle notification
    const currentValue = searchInputRef.current?.value;
    if (currentValue) {
      onSend(currentValue);
    }
  };

  const [props] = useState({
    id: 'hds-search-component',
    historyId: 'hds-search-history',
    texts: { label: 'Mitä etsit?' },
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
      <Search {...props} onSearch={handleSearch} onSend={onSend} hideSubmitButton ref={searchInputRef} />
      <Button onClick={handleExternalButtonClick}>Send search</Button>
    </>
  );
};

export const WithoutHistoryAndSuggestions = () => {
  const [value, setValue] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const onSend = (val: string) => {
    setNotificationMessage(`Search submitted: "${val}"`);
    setShowNotification(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const [props] = useState({
    id: 'hds-search-component',
    texts: { label: 'Mitä etsit?' },
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
      <Search {...props} onSend={onSend} onChange={onChange} value={value} />
    </>
  );
};

export const WithCookieConsent = () => {
  const [value, setValue] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleSearch: SearchProps['onSearch'] = useCallback((searchValue /* , lastClickedOption, data */) => {
    if (searchValue === 'error') {
      return Promise.reject(new Error('Simulated error'));
    }
    return Promise.resolve({
      groups: [
        {
          label: '',
          options: getOptions(100).filter((s) => (s.value ?? '').toUpperCase().indexOf(searchValue.toUpperCase()) >= 0),
        },
      ],
    });
  }, []);

  const onSend = (val: string) => {
    setNotificationMessage(`Search submitted: "${val}"`);
    setShowNotification(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const [props] = useState({
    id: 'hds-search-component',
    historyId: 'hds-search-history',
    texts: { label: 'Mitä etsit?' },
  });

  return (
    <CookieConsentContextProvider
      siteSettings={{ ...siteSettings, remove: true, monitorInterval: 1 }}
      options={{ focusTargetSelector: 'main h1' }}
    >
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
      <Search {...props} onSend={onSend} onChange={onChange} value={value} onSearch={handleSearch} />
      <CookieBanner />
      <br />
      <Button
        variant={ButtonVariant.Secondary}
        size={ButtonSize.Small}
        onClick={() => {
          if (window.hds?.cookieConsent) {
            window.hds.cookieConsent.openBanner();
          }
        }}
      >
        Cookie settings
      </Button>
    </CookieConsentContextProvider>
  );
};
