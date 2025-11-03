import React, { useCallback, useRef, useState } from 'react';

import { Search, SearchProps } from './Search';
import { Notification } from '../../notification';
import { Button } from '../../button';

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
    return Promise.resolve({ groups: [{ label: 'Search suggestions', options: ['tuomo', 'testaa', 'tuomo testaa'] }] });
  }, []);

  const onSend = (val: string) => {
    console.log('Search submitted test:', val);
    setNotificationMessage(`Search submitted: "${val}"`);
    setShowNotification(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('ONCHANGE --> Search changed:', e.target.value);
    setValue(e.target.value);
  };

  const onBlur = () => {
    console.log('ONBLUR --> Search blurred');
  };

  const onFocus = () => {
    console.log('ONFOCUS --> Search focused');
  };

  const [props] = useState({
    id: 'hds-search-component',
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
        historyId="test"
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
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // const handleSearch: SearchProps['onSearch'] = useCallback((selectedOptions, lastClickedOption, data) => {
  //   console.log('Search event:', { selectedOptions, lastClickedOption, data });
  //   return Promise.resolve({ groups: [{ label: 'Search suggestions', options: ['tuomo', 'testaa', 'tuomo testaa'] }] });
  // }, []);

  const onSend = (val: string) => {
    setNotificationMessage(`Search submitted: "${val}"`);
    setShowNotification(true);
  };

  const handleExternalButtonClick = () => {
    const currentValue = searchInputRef.current?.value;
    if (currentValue) {
      onSend(currentValue);
    }
  };

  const [props] = useState({
    id: 'hds-search-component',
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
      <Search {...props} historyId="test" ref={searchInputRef} />
      <Button onClick={handleExternalButtonClick}>Send search</Button>
    </>
  );
};
