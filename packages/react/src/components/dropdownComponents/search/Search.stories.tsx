import React, { useCallback, useState } from 'react';

import { Search, SearchProps } from './Search';

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

  const handleSearch: SearchProps['onSearch'] = useCallback((selectedOptions, lastClickedOption, data) => {
    console.log('Search event:', { selectedOptions, lastClickedOption, data });
    return Promise.resolve({ groups: [{ label: 'Search suggestions', options: ['tuomo', 'testaa', 'tuomo testaa'] }] });
  }, []);

  const onSend = (val: string) => {
    console.log('Search submitted test:', val);
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
      {/* <Search {...props} historyId="test" onSearch={handleSearch} onSend={onSend} /> */}
      <Search
        {...props}
        historyId="test2"
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
