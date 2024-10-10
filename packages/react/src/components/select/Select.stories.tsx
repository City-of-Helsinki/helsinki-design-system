import React, { useCallback, useMemo, useState } from 'react';

import { Group, SelectProps, Texts, Option } from './types';
import { IconLocation } from '../../icons';
import { Select } from './Select';
import { Button } from '../button/Button';
import { clearAllSelectedOptions, defaultFilter, propsToGroups } from './utils';
import { getOptionLabels, getOptions, getLargeBatchOfUniqueValues } from './batch.options';

export default {
  component: Select,
  title: 'Components/Select',
};

const createRandomGroupsForSearch = (search: string) => {
  if (search === 'none') {
    return { groups: [] };
  }
  const groups: SelectProps['groups'] = [
    {
      label: 'Random items',
      options: getOptions(),
    },
    {
      label: 'Common items',
      options: [
        {
          value: `${search}`,
          label: `Searched for ${search}`,
        },
        {
          value: `match`,
          label: `Same option everytime`,
        },
      ],
    },
  ];
  return { groups };
};

const onSearch: SelectProps['onSearch'] = async (searchValue) => {
  await new Promise((res) => {
    setTimeout(res, 1000);
  });
  if (searchValue === 'error') {
    return Promise.reject(new Error('Simulated error'));
  }
  return Promise.resolve(searchValue ? createRandomGroupsForSearch(searchValue) : {});
};

const dummyOnChange: SelectProps['onChange'] = () => ({});
const defaultTexts: Partial<Texts> = {
  label: 'Label',
  placeholder: 'Choose one',
  selectedOptionsLabel: 'Selected options',
  error: 'Wrong choice!',
  language: 'en',
};
const defaultTextsForMultiSelect: Partial<Texts> = {
  ...defaultTexts,
  label: 'Select multiple fruits or vegetables',
  placeholder: 'Choose many',
};

/**
 *
 * Visual Playwright tests depend on these stories. Changing option labels or other props may brake the tests.
 *
 */

export const Singleselect = () => {
  const options = getOptionLabels(20);
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
  }, []);
  return (
    <Select
      options={options}
      onChange={onChange}
      icon={<IconLocation />}
      required
      texts={defaultTexts}
      id="hds-select-component"
    />
  );
};

export const SingleselectWithGroups = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(40),
    },
    {
      label: 'Bad choices',
      options: [
        { value: 'Candy cane', label: 'Candy cane' },
        { value: 'Sugar bomb', label: 'Sugar bomb' },
        { value: 'Dr. Pepper', label: 'Dr. Pepper' },
      ],
    },
  ];
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changess
  }, []);
  return (
    <Select
      groups={groups}
      onChange={onChange}
      icon={<IconLocation />}
      required
      texts={defaultTexts}
      id="hds-select-component"
    />
  );
};

export const OptionsAsHtml = () => {
  return (
    <Select onChange={dummyOnChange} texts={defaultTexts} id="hds-select-component">
      <optgroup label="Group 1">
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      </optgroup>
      <optgroup label="Group 2">
        <option value="opt3">Option 3</option>
        <option value="opt4">Option 4</option>
      </optgroup>
    </Select>
  );
};

export const WithGroups = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(40),
    },
    {
      label: 'Bad choices',
      options: [
        { value: 'Candy cane', label: 'Candy cane' },
        { value: 'Sugar bomb', label: 'Sugar bomb' },
        { value: 'Dr. Pepper', label: 'Dr. Pepper' },
      ],
    },
  ];

  return (
    <Select
      groups={groups}
      icon={<IconLocation />}
      onChange={dummyOnChange}
      texts={defaultTexts}
      id="hds-select-component"
    >
      <optgroup label="Group label">
        <option value="label">Text</option>
      </optgroup>
    </Select>
  );
};

export const WithControls = () => {
  const initialGroups = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(4),
    },
    {
      label: 'More healthy choices',
      options: getOptionLabels(4),
    },
  ];

  const onChange: SelectProps['onChange'] = useCallback(() => {
    // not needed
  }, []);

  const [props, updateProps] = useState<SelectProps>({
    groups: propsToGroups({ groups: initialGroups }),
    onChange,
    required: true,
    disabled: false,
    open: false,
    invalid: false,
    texts: { ...defaultTexts, label: 'Controlled select' },
    id: 'hds-select-component',
  });

  const resetSelections = () => {
    updateProps({ ...props, groups: clearAllSelectedOptions(props.groups as Group[]), open: false });
  };

  const toggleDisable = () => {
    const { disabled } = props;
    updateProps({ ...props, disabled: !disabled });
  };

  const toggleMenu = () => {
    const { open } = props;
    updateProps({ ...props, open: !open });
  };

  const toggleInvalid = () => {
    const { invalid } = props;
    updateProps({ ...props, invalid: !invalid });
  };

  const toggleRequired = () => {
    const { required } = props;
    updateProps({ ...props, required: !required });
  };
  return (
    <div>
      <style>
        {`
          .buttons{
            margin-top: 20px;
          }
          .buttons > *{
            margin-right: 10px;
          }
      `}
      </style>

      <div>
        <Select {...props} />
        <div className="buttons">
          <Button onClick={resetSelections}>Reset selections</Button>
          <Button onClick={toggleDisable}>Disable/enable component</Button>
          <Button onClick={toggleMenu}>Open/Close list</Button>
          <Button onClick={toggleInvalid}>Set valid/invalid</Button>
          <Button onClick={toggleRequired}>Toggle required</Button>
        </div>
      </div>
    </div>
  );
};

export const WithValidation = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(3),
    },
    {
      label: 'Bad choices',
      options: [
        { value: 'invalid1', label: 'Candy cane' },
        { value: 'invalid2', label: 'Sugar bomb' },
        { value: 'invalid3', label: 'Dr. Pepper' },
      ],
    },
  ];

  const texts = { ...defaultTexts, label: 'Pick a healthy choice' };

  const onChange: SelectProps['onChange'] = (selectedOptions) => {
    const hasErrorSelection = !!selectedOptions.find((option) => option.value.includes('invalid'));
    return {
      invalid: hasErrorSelection,
      texts: {
        assistive: hasErrorSelection || !selectedOptions.length ? '' : 'Excellent choice!',
      },
    };
  };

  return <Select groups={groups} onChange={onChange} texts={texts} id="hds-select-component" />;
};

export const WithFilter = () => {
  const options = getOptionLabels(20);
  return (
    <Select
      options={options}
      onChange={dummyOnChange}
      icon={<IconLocation />}
      filter={defaultFilter}
      required
      texts={defaultTexts}
      id="hds-select-component"
    />
  );
};

export const WithSearch = () => {
  const options = getOptionLabels(20);
  return (
    <>
      <Select
        options={options}
        onChange={dummyOnChange}
        icon={<IconLocation />}
        onSearch={onSearch}
        required
        texts={defaultTexts}
        id="hds-select-component"
      />
      <p>Search with &quot;none&quot; to return an empty set</p>
      <p>Search with &quot;error&quot; to simulate an error.</p>
    </>
  );
};

export const Multiselect = () => {
  const options = getOptionLabels(20);
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
  }, []);
  return (
    <Select
      options={options}
      onChange={onChange}
      icon={<IconLocation />}
      required
      multiSelect
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};

export const MultiselectWithGroups = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(4),
    },
    {
      label: 'More healthy choices',
      options: getOptionLabels(4),
    },
  ];

  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
  }, []);
  return (
    <Select
      groups={groups}
      onChange={onChange}
      multiSelect
      icon={<IconLocation />}
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};

export const MultiselectWithGroupsAndFilter = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(4),
    },
    {
      label: 'More healthy choices',
      options: getOptionLabels(4),
    },
  ];

  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
  }, []);
  return (
    <Select
      groups={groups}
      onChange={onChange}
      multiSelect
      filter={defaultFilter}
      icon={<IconLocation />}
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};

export const MultiselectWithGroupsAndSearch = () => {
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
  }, []);
  return (
    <div>
      <Select
        onChange={onChange}
        multiSelect
        onSearch={onSearch}
        icon={<IconLocation />}
        texts={defaultTextsForMultiSelect}
        id="hds-select-component"
      />
      <p>Search with &quot;none&quot; to return an empty set</p>
      <p>Search with &quot;error&quot; to simulate an error.</p>
    </div>
  );
};

export const MultiselectWithoutTags = () => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(4),
    },
    {
      label: 'More healthy choices',
      options: getOptionLabels(4),
    },
  ];

  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
  }, []);
  return (
    <Select
      groups={groups}
      onChange={onChange}
      multiSelect
      icon={<IconLocation />}
      texts={defaultTextsForMultiSelect}
      noTags
      id="hds-select-component"
    />
  );
};

export const VirtualizedMultiselectWithGroups = () => {
  const groups = [
    {
      label: 'Healthy choices',
      options: getLargeBatchOfUniqueValues(1000),
    },
    {
      label: 'More healthy choices',
      options: getLargeBatchOfUniqueValues(1000),
    },
  ];
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
  }, []);
  return (
    <Select
      groups={groups}
      onChange={onChange}
      multiSelect
      virtualize
      icon={<IconLocation />}
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};
export const VirtualizedSingleselectWithGroups = () => {
  const groups = [
    {
      label: 'Healthy choices',
      options: getLargeBatchOfUniqueValues(1000),
    },
    {
      label: 'More healthy choices',
      options: getLargeBatchOfUniqueValues(1000),
    },
  ];
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
  }, []);
  return (
    <Select
      groups={groups}
      onChange={onChange}
      virtualize
      icon={<IconLocation />}
      texts={defaultTexts}
      id="hds-select-component"
    />
  );
};

export const VirtualizationMultiselectWithoutGroups = () => {
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
  }, []);
  return (
    <Select
      options={getLargeBatchOfUniqueValues(2000)}
      onChange={onChange}
      virtualize
      multiSelect
      icon={<IconLocation />}
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};

export const VirtualizedSingleselectWithoutGroups = () => {
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
  }, []);
  return (
    <Select
      options={getLargeBatchOfUniqueValues(2000)}
      onChange={onChange}
      virtualize
      texts={defaultTexts}
      id="hds-select-component"
    />
  );
};

export const FocusListenerExample = () => {
  const [isFocused, setIsFocused] = useState(false);

  const setIsFocusedInHook = useCallback(
    (focusValue: boolean) => {
      setIsFocused(focusValue);
    },
    [setIsFocused],
  );

  // need to memoize all or re-rendering would lose selections
  const memoizedProps = useMemo(() => {
    const changeTracking: { selectedOptions: Option[] } = {
      selectedOptions: [],
    };

    const onChange: SelectProps['onChange'] = (selectedOptions) => {
      changeTracking.selectedOptions = selectedOptions;
    };

    const options = getLargeBatchOfUniqueValues(2000);

    return {
      texts: defaultTexts,
      onChange,
      changeTracking,
      options,
    };
  }, []);

  const onFocus: SelectProps['onFocus'] = useCallback(async () => {
    memoizedProps.texts.error = '';
    setIsFocusedInHook(true);
  }, []);
  const onBlur: SelectProps['onBlur'] = useCallback(async () => {
    if (!memoizedProps.changeTracking.selectedOptions.length) {
      memoizedProps.texts.error = 'Select something';
    }
    setIsFocusedInHook(false);
  }, []);
  const onChange: SelectProps['onChange'] = useCallback(() => {
    // track changes
  }, []);

  return (
    <>
      <style>
        {`
          .focused,
          .blurred {
            padding: 10px;
          }

          .focused {
            background-color: #defcde;
          }

          .blurred {
            background-color: #ececec;
          }

          .indicators {
            display: flex;
            flex-direction: column;
            margin: 20px 0;

            .indicator {
              padding-left: 20px;
              position: relative;
            }

            .indicator:before {
              background: #defcde;
              content: ' ';
              display: block;
              height: 10px;
              left: 0;
              position: absolute;
              top: 5px;
              width: 10px;
            }

            .indicator.blurIndicator:before {
              background: #ececec;
            }
          }

        `}
      </style>
      <div className={isFocused ? 'focused' : 'blurred'}>
        <Select
          options={memoizedProps.options}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          virtualize
          multiSelect
          icon={<IconLocation />}
          texts={defaultTextsForMultiSelect}
          id="hds-select-component"
        />
      </div>
      <div className="indicators">
        <div className="indicator">Focused</div>
        <div className="indicator blurIndicator">Blurred</div>
      </div>
      <Button>This is just a focus target</Button>
    </>
  );
};
