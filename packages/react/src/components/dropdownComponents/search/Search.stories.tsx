import React, { useCallback, useState } from 'react';

import { Search } from './Search';
import { SelectProps } from '../select/types';
import { getOptionLabels } from './batch.options';

export default {
  component: Search,
  title: 'Components/DropdownComponents/Search',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = () => {
  const options = getOptionLabels(200);
  const handleSearch: SelectProps['onSearch'] = useCallback((selectedOptions, lastClickedOption, data) => {
    // eslint-disable-next-line no-console
    console.log(lastClickedOption);
    // eslint-disable-next-line no-console
    console.log(data);
    // get search value from data
    return Promise.resolve({ options: options.filter((t) => t.search(selectedOptions) > 0) });
  }, []);

  const [props] = useState<Partial<SelectProps>>({
    id: 'hds-search-component',
  });

  return <Search {...props} onSearch={handleSearch} />;
};
