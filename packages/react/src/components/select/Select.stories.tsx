import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { capitalize } from 'lodash';

import {
  SelectProps,
  Texts,
  Option,
  TextProvider,
  Select,
  useSelectStorage,
  SupportedLanguage,
  defaultTexts as defaultUITexts,
  defaultFilter,
  getNewSelections,
  iterateAndCopyGroup,
  updateSelectedOptionsInGroups,
  getSelectedOptions,
  OptionInProps,
  Group,
  getElementIds,
} from './index';
import { IconBell, IconCogwheels, IconLocation, IconMoneyBag } from '../../icons';
import { Button } from '../button/Button';
import { getOptionLabels, getOptions, getOptionLabelsInGroups, getLargeBatchOfUniqueValues } from './batch.options';
import { Tag, TagSize } from '../tag/Tag';
import { Tooltip } from '../tooltip/Tooltip';
import useForceRender from '../../hooks/useForceRender';

export default {
  component: Select,
  title: 'Components/Select',
};

const WrapperWithButtonStyles = (props: PropsWithChildren<unknown>) => {
  return (
    <div>
      <style>
        {`
      .buttons{
        margin-top: var(--spacing-s);
      }
      .buttons > *{
        margin: 0 var(--spacing-s) var(--spacing-s) 0;
      }
  `}
      </style>
      {props.children}
    </div>
  );
};

const simulateSearchQuery = (search: string, withGroups: boolean) => {
  if (search === 'none') {
    return { groups: [] };
  }
  if (withGroups) {
    const groupsWithAllOptions = getOptionLabelsInGroups(150);
    const searchResult = [];
    groupsWithAllOptions?.forEach((group) => {
      const options = group.options.filter((option) => option.indexOf(search) !== -1);
      if (options.length) {
        searchResult.push({ label: group.label, options });
      }
    });
    return { groups: searchResult };
  }
  return { options: getOptions(500).filter((option) => option.label?.indexOf(search) !== -1) };
};

const onSearchQuery = async (searchValue, withGroups) => {
  await new Promise((res) => {
    setTimeout(res, 1000);
  });
  if (searchValue === 'error') {
    return Promise.reject(new Error('Simulated error'));
  }
  return Promise.resolve(searchValue ? simulateSearchQuery(searchValue, withGroups) : {});
};

const onSearch: SelectProps['onSearch'] = async (searchValue) => {
  return onSearchQuery(searchValue, false);
};

const onSearchWithGroups: SelectProps['onSearch'] = async (searchValue) => {
  return onSearchQuery(searchValue, true);
};

const genericOnChangeCallback: SelectProps['onChange'] = () => {
  action('onChange');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requireOneSelection: SelectProps['onChange'] = (selectedOptions, clickedOption, data) => {
  const hasSelections = selectedOptions.length > 0;

  return {
    invalid: !hasSelections,
    texts: {
      error: hasSelections ? '' : 'A selection is required',
    },
  };
};

const defaultTexts: Partial<Texts> = {
  label: 'Label',
  placeholder: 'Choose one',
  selectedOptionsCount_one: 'One selected option',
  selectedOptionsCount_multiple: '{{selectionCount}} selected options',
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
  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    return requireOneSelection(selectedOptions, lastClickedOption, props);
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

export const SingleselectWithTooltip = () => {
  const options = getOptionLabels(20);
  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    return requireOneSelection(selectedOptions, lastClickedOption, props);
  }, []);

  const tooltip = <Tooltip>This is a test tooltip</Tooltip>;

  return (
    <Select
      options={options}
      onChange={onChange}
      icon={<IconLocation />}
      required
      texts={defaultTexts}
      id="hds-select-component"
      tooltip={tooltip}
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
  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    // track changes here
    genericOnChangeCallback(selectedOptions, lastClickedOption, props);
  }, []);
  return (
    <Select
      groups={groups}
      onChange={onChange}
      icon={<IconLocation />}
      texts={defaultTexts}
      clearable
      id="hds-select-component"
    />
  );
};

export const OptionsAsHtml = () => {
  return (
    <Select onChange={genericOnChangeCallback} texts={defaultTexts} id="hds-select-component">
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

export const WithControls = () => {
  const [lang, setLang] = useState<SupportedLanguage>('fi');
  const reference = React.createRef<HTMLButtonElement>();
  const addLang = (value: string, language?: string) => {
    const withoutLang = value.split('(')[0];
    return `${withoutLang} (${language || lang})`;
  };
  const createOptionWithLanguage = (value: string) => {
    const labelAndValue = addLang(value);
    return { label: labelAndValue, value };
  };

  const [optionGroups, updateOptionGroups] = useState<SelectProps['groups']>([
    {
      label: addLang('Healthy choices'),
      options: getOptionLabels(4).map(createOptionWithLanguage),
    },
    {
      label: addLang('More healthy choices'),
      options: getOptionLabels(4, 5).map(createOptionWithLanguage),
    },
  ]);
  const onChange: SelectProps['onChange'] = useCallback(
    (selectedOptions) => {
      updateOptionGroups(updateSelectedOptionsInGroups(optionGroups, selectedOptions));
    },
    [optionGroups],
  );

  const [props, updateProps] = useState<Partial<SelectProps>>({
    disabled: false,
    multiSelect: true,
    open: false,
    invalid: false,
    id: 'hds-select-component',
  });

  const texts: Partial<Texts> = {
    language: lang,
    label: `Label (${lang})`,
    placeholder: `Placeholder (${lang})`,
    error: `Invalid selections! (${lang})`,
  };

  const icons: Record<SupportedLanguage, React.ReactNode> = {
    en: <IconBell />,
    fi: <IconCogwheels />,
    sv: <IconMoneyBag />,
  };

  const changeLang = (newLang: SupportedLanguage) => {
    setLang(newLang);
    if (!optionGroups) {
      return;
    }
    updateOptionGroups(
      optionGroups.map((group) => {
        return {
          label: addLang(group.label, newLang),
          options: group.options.map((opt: OptionInProps | string) => {
            if (!opt) {
              return '';
            }
            if (typeof opt === 'string') {
              return addLang(opt, newLang);
            }
            return {
              ...opt,
              label: addLang(opt.label || '', newLang),
            };
          }),
        };
      }),
    );
  };
  const setFinnish = () => {
    changeLang('fi');
  };
  const setEnglish = () => {
    changeLang('en');
  };
  const setSwedish = () => {
    changeLang('sv');
  };

  const resetSelections = () => {
    updateOptionGroups(updateSelectedOptionsInGroups(optionGroups, []));
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

  const setFocus = () => {
    reference?.current?.focus();
  };

  return (
    <WrapperWithButtonStyles>
      <Select {...props} groups={optionGroups} texts={texts} icon={icons[lang]} ref={reference} onChange={onChange} />
      <div className="buttons">
        <Button onClick={resetSelections}>Reset selections</Button>
        <Button onClick={toggleDisable}>Disable/enable component</Button>
        <Button onClick={toggleMenu}>Open/Close list</Button>
        <Button onClick={toggleInvalid}>Set valid/invalid</Button>
        <Button onClick={toggleRequired}>Toggle required</Button>
        <Button onClick={setFocus}>Focus</Button>
      </div>
      <div className="buttons">
        <Button onClick={setFinnish} disabled={lang === 'fi'}>
          Finnish
        </Button>
        <Button onClick={setEnglish} disabled={lang === 'en'}>
          English
        </Button>
        <Button onClick={setSwedish} disabled={lang === 'sv'}>
          Swedish
        </Button>
      </div>
    </WrapperWithButtonStyles>
  );
};

export const WithValidationAndForcedSelection = () => {
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

  const texts = { ...defaultTexts, label: 'Pick a healthy choice', error: '' };

  const onChange: SelectProps['onChange'] = (selectedOptions) => {
    const hasSelections = selectedOptions.length > 0;
    const hasErrorSelection = !!selectedOptions.find((option) => option.value.includes('invalid'));
    const getErrorText = () => {
      if (hasErrorSelection) {
        return 'Please make a good choice';
      }
      if (!hasSelections) {
        return 'A selection is required!';
      }
      return '';
    };
    const error = getErrorText();
    return {
      invalid: !!error,
      texts: {
        assistive: error ? '' : 'Excellent choice!',
        error,
      },
    };
  };

  return <Select groups={groups} onChange={onChange} texts={texts} required id="hds-select-component" />;
};

export const WithFilter = () => {
  const options = getOptionLabels(20);
  return (
    <Select
      options={options}
      onChange={genericOnChangeCallback}
      icon={<IconLocation />}
      filter={defaultFilter}
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
        onChange={genericOnChangeCallback}
        icon={<IconLocation />}
        onSearch={onSearch}
        texts={defaultTexts}
        id="hds-select-component"
      />
      <p>Search with &quot;none&quot; to return an empty set</p>
      <p>Search with &quot;error&quot; to simulate an error.</p>
    </>
  );
};

export const MultiselectWithSearch = () => {
  const [selectedOptionsValue, setSelectedOptionsValue] = React.useState<OptionInProps[]>([]);

  const onClose = (selectedOptions) => {
    setSelectedOptionsValue(selectedOptions);
  };
  const options = getOptions(5);

  return (
    <>
      <Select
        multiSelect
        options={options}
        onSearch={onSearch}
        onClose={onClose}
        texts={defaultTexts}
        id="hds-select-component"
        value={selectedOptionsValue}
      />
      <p>Search with &quot;none&quot; to return an empty set</p>
      <p>Search with &quot;error&quot; to simulate an error.</p>
    </>
  );
};

export const Multiselect = () => {
  const [onChangeSelections, setOnChangeSelections] = useState<Option[]>([]);
  const [onCloseSelections, setOnCloseSelections] = useState<Option[]>([]);

  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, data) => {
    setOnChangeSelections(selectedOptions);
    return requireOneSelection(selectedOptions, lastClickedOption, data);
  }, []);

  const onClose: SelectProps['onClose'] = useCallback((selectedOptions, lastClickedOption, data) => {
    setOnCloseSelections(selectedOptions);
    return requireOneSelection(selectedOptions, lastClickedOption, data);
  }, []);

  const [props] = useState<Partial<SelectProps>>({
    multiSelect: true,
    id: 'hds-select-component',
    texts: defaultTextsForMultiSelect,
    clearable: true,
    required: true,
    icon: <IconLocation />,
    options: getOptionLabels(20),
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '420px' }}>
      <label id="onchange-label" htmlFor="onchange">
        onChange triggered values
      </label>
      <input
        type="text"
        id="onchange"
        aria-labelledby="onchange-label"
        readOnly
        value={onChangeSelections.map((option) => option.label).join(', ')}
      />
      <label id="onclose-label" htmlFor="onclose">
        onClose triggered values
      </label>
      <input
        type="text"
        id="onclose"
        aria-labelledby="onclose-label"
        readOnly
        value={onCloseSelections.map((option) => option.label).join(', ')}
      />
      <Select {...props} onChange={onChange} onClose={onClose} />
    </div>
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
      options: getOptionLabels(4, 5),
    },
  ];

  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    // track changes here
    genericOnChangeCallback(selectedOptions, lastClickedOption, props);
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
      options: getOptionLabels(10),
    },
    {
      label: 'More healthy choices',
      options: getOptionLabels(10, 10),
    },
  ];

  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    // track changes here
    genericOnChangeCallback(selectedOptions, lastClickedOption, props);
  }, []);
  return (
    <Select
      groups={groups}
      onChange={onChange}
      multiSelect
      clearable
      filter={defaultFilter}
      icon={<IconLocation />}
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};

export const MultiselectWithGroupsAndSearch = () => {
  const groups: SelectProps['groups'] = getOptionLabelsInGroups(5);

  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    // track changes here
    genericOnChangeCallback(selectedOptions, lastClickedOption, props);
  }, []);
  return (
    <div>
      <Select
        groups={groups}
        onChange={onChange}
        multiSelect
        onSearch={onSearchWithGroups}
        icon={<IconLocation />}
        texts={defaultTextsForMultiSelect}
        id="hds-select-component"
      />
      <p>Search with &quot;none&quot; to return an empty set</p>
      <p>Search with &quot;error&quot; to simulate an error.</p>
    </div>
  );
};

export const MultiselectWithCustomTags = () => {
  const [selections, updateSelections] = useState<Option[]>([]);
  const CustomOptionList = ({ options }: { options: Option[] }) => {
    if (!options.length) {
      return <p>No options selected</p>;
    }
    return (
      <>
        <h3>Selected options:</h3>
        {options.map((option) => {
          return (
            <Tag key={option.value} size={TagSize.Large}>
              {option.label}
            </Tag>
          );
        })}
      </>
    );
  };

  const storage = useSelectStorage({
    groups: [
      {
        label: 'Healthy choices',
        options: getOptionLabels(4),
      },
      {
        label: 'More healthy choices',
        options: getOptionLabels(4, 5),
      },
    ],
    onChange: (selectedOptions) => {
      updateSelections(selectedOptions);
    },
    multiSelect: true,
    filter: defaultFilter,
    disabled: false,
    open: false,
    invalid: false,
    texts: defaultTextsForMultiSelect,
    id: 'hds-select-component',
    noTags: true,
  });

  return (
    <WrapperWithButtonStyles>
      <Select {...storage.getProps()} />
      <div className="buttons">
        <CustomOptionList options={selections} />
      </div>
    </WrapperWithButtonStyles>
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
  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    // track changes here
    genericOnChangeCallback(selectedOptions, lastClickedOption, props);
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
  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    // track changes here
    genericOnChangeCallback(selectedOptions, lastClickedOption, props);
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
  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    // track changes here
    genericOnChangeCallback(selectedOptions, lastClickedOption, props);
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
  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    // track changes here
    genericOnChangeCallback(selectedOptions, lastClickedOption, props);
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

  // need to memoize all or re-rendering will lose selections
  const memoizedProps = useMemo(() => {
    const changeTracking: { selectedOptions: Option[] } = {
      selectedOptions: [],
    };

    const onChange: SelectProps['onChange'] = (selectedOptions) => {
      changeTracking.selectedOptions = selectedOptions;
    };

    const options = getLargeBatchOfUniqueValues(100);

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

  const onBlur: SelectProps['onBlur'] = useCallback(() => {
    if (!memoizedProps.changeTracking.selectedOptions.length) {
      memoizedProps.texts.error = 'Select something';
    }
    setIsFocusedInHook(false);
  }, []);

  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    // track changes here
    genericOnChangeCallback(selectedOptions, lastClickedOption, props);
  }, []);

  return (
    <>
      <style>
        {`
          .focused,
          .blurred {
            padding: var(--spacing-s);
          }

          .focused {
            background-color: var(--color-tram-medium-light);
          }

          .blurred {
            background-color: var(--color-black-10);
          }

          .indicators {
            display: flex;
            flex-direction: column;
            margin:  var(--spacing-s); 0;

            .indicator {
              padding-left:  var(--spacing-s);
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

export const WithStorageControls = () => {
  const [lang, setLang] = useState<SupportedLanguage>('fi');
  const addLang = (value: string, language?: string) => {
    const withoutLang = value.split('(')[0];
    return `${withoutLang} (${language || lang})`;
  };

  const initialGroups = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(4),
    },
    {
      label: 'More healthy choices',
      options: getOptionLabels(4, 5),
    },
  ];

  const getTexts = (language: SupportedLanguage): Partial<Texts> => {
    return {
      language,
      label: `Controlled select (${language})`,
      placeholder: `Placeholder (${language})`,
    };
  };

  const storage = useSelectStorage({
    groups: initialGroups,
    onChange: genericOnChangeCallback,
    multiSelect: true,
    filter: defaultFilter,
    disabled: false,
    open: false,
    invalid: false,
    texts: getTexts(lang),
    id: 'hds-select-component',
  });

  const changeLang = (newLang: SupportedLanguage) => {
    setLang(newLang);
    storage.updateAllOptions((option) => {
      return {
        ...option,
        label: addLang(option.label, newLang),
        selected: option.selected,
      };
    });
    storage.updateTexts(getTexts(newLang));
    /// render is not really needed here because setLang() will re-render anyway.
    storage.render();
  };

  const setFinnish = () => {
    changeLang('fi');
  };
  const setEnglish = () => {
    changeLang('en');
  };
  const setSwedish = () => {
    changeLang('sv');
  };

  const resetSelections = () => {
    storage.updateAllOptions((option) => {
      return {
        ...option,
        selected: false,
        disabled: false,
      };
    });
    storage.setOpen(false);
    storage.render();
  };

  const invertSelections = () => {
    storage.updateAllOptions((option) => {
      return {
        ...option,
        selected: !option.selected,
        disabled: false,
      };
    });
    storage.setOpen(false);
    storage.render();
  };

  const selectAll = () => {
    storage.updateAllOptions((option) => {
      return {
        ...option,
        selected: true,
        disabled: false,
      };
    });
    storage.setOpen(false);
    storage.render();
  };

  const toggleGroupDisable = () => {
    storage.updateAllOptions((option) => {
      return {
        ...option,
        disabled: !option.disabled,
      };
    });
    storage.setOpen(false);
    storage.render();
  };

  const toggleDisable = () => {
    const current = storage.getProps().disabled;
    storage.setDisabled(!current);
    storage.render();
  };

  const toggleInvalid = () => {
    const current = storage.getProps().invalid;
    storage.setInvalid(!current);
    storage.render();
  };

  const showError = () => {
    storage.setError(`There is an error!`);
    storage.render();
  };

  const clearError = () => {
    storage.setError(false);
    storage.render();
  };

  return (
    <WrapperWithButtonStyles>
      <Select {...storage.getProps()} multiSelect filter={defaultFilter} />
      <div className="buttons">
        <Button onClick={resetSelections}>Reset selections</Button>
        <Button onClick={invertSelections}>Invert selections</Button>
        <Button onClick={selectAll}>Select all</Button>
      </div>
      <div className="buttons">
        <Button onClick={toggleDisable}>Disable/enable component</Button>
        <Button onClick={toggleGroupDisable}>Disable/enable options</Button>
      </div>
      <div className="buttons">
        <Button onClick={toggleInvalid}>Set valid/invalid</Button>
        <Button onClick={showError}>Set error</Button>
        <Button onClick={clearError}>Clear error</Button>
      </div>
      <div className="buttons">
        <Button onClick={setFinnish} disabled={lang === 'fi'}>
          Finnish
        </Button>
        <Button onClick={setEnglish} disabled={lang === 'en'}>
          English
        </Button>
        <Button onClick={setSwedish} disabled={lang === 'sv'}>
          Swedish
        </Button>
      </div>
    </WrapperWithButtonStyles>
  );
};

export const WithMinMax = () => {
  const requiredCount = 1;
  const maxCount = 3;

  const memoizedOnChange = useMemo(() => {
    const changeTracking: { hasSelectedSomething: boolean; previousSelections: Option[] } = {
      hasSelectedSomething: false,
      previousSelections: [],
    };

    const onChange: SelectProps['onChange'] = (selectedValues, lastClickedOption, data) => {
      if (!changeTracking.hasSelectedSomething && selectedValues.length > 0) {
        changeTracking.hasSelectedSomething = true;
      }
      const getAllowedSelections = (allSelections: Option[]) => {
        const overflow = allSelections.length - maxCount;

        if (overflow > 0) {
          const selections = [
            ...changeTracking.previousSelections,
            ...getNewSelections(changeTracking.previousSelections, allSelections),
          ];
          const allowed = selections.slice(0, maxCount);
          return allowed;
        }
        return allSelections;
      };
      const filteredSelections = getAllowedSelections(selectedValues).map((option) => option.value);
      const maxReached = filteredSelections.length >= maxCount;

      const newGroups = iterateAndCopyGroup(data.groups, (option) => {
        const isSelected = option.isGroupLabel ? option.selected : filteredSelections.includes(option.value);
        return {
          ...option,
          selected: isSelected,
          disabled: maxReached ? !isSelected : false,
        };
      });
      changeTracking.previousSelections = selectedValues;

      return {
        groups: newGroups,
      };
    };

    return {
      onChange,
    };
  }, []);

  const textsAsFunction: TextProvider = (key, { selectionCount }) => {
    const texts: Partial<Texts> = {
      label: 'Select 1-3 fruits or vegetables',
      placeholder: 'Choose 1-3 options',
    };

    const textFromObj = texts[key];
    if (textFromObj) {
      return textFromObj;
    }
    if (key === 'assistive') {
      const selectedCount = selectionCount as number;
      return selectedCount >= requiredCount
        ? `Required number of selections done!`
        : `Please select ${requiredCount - selectedCount} more items. Up to ${maxCount} items.`;
    }

    return defaultUITexts.en[key];
  };

  const storage = useSelectStorage({
    groups: [
      {
        label: 'Healthy choices',
        options: getOptionLabels(6).map((option) => {
          return { label: option, value: option, disabled: false };
        }),
      },
      {
        label: 'More healthy choices',
        options: getOptionLabels(6, 10).map((option) => {
          return { label: option, value: option, disabled: false };
        }),
      },
    ],
    multiSelect: true,
    id: 'hds-select-component',
    texts: textsAsFunction,
    ...memoizedOnChange,
  });

  return <Select {...storage.getProps()} />;
};

export const VeryLongLabels = () => {
  const options = getOptionLabels(10).map((label, index) => {
    return label + ` ${label.toLowerCase()} `.repeat(10).substring(0, 30 + index * 5);
  });
  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    // track changes here
    return genericOnChangeCallback(selectedOptions, lastClickedOption, props);
  }, []);
  return (
    <Select
      options={options}
      onChange={onChange}
      icon={<IconLocation />}
      multiSelect
      texts={defaultTextsForMultiSelect}
      id="hds-select-component"
    />
  );
};

export const PreselectedValue = () => {
  const options = getOptionLabels(20);
  const onChange: SelectProps['onChange'] = useCallback((selectedOptions, lastClickedOption, props) => {
    return requireOneSelection(selectedOptions, lastClickedOption, props);
  }, []);
  return (
    <Select
      options={options}
      onChange={onChange}
      icon={<IconLocation />}
      required
      texts={defaultTexts}
      id="hds-select-component"
      value={options[0]}
    />
  );
};

export const KeepOneSelection = () => {
  const options = getOptionLabels(20);
  const onChange: SelectProps['onChange'] = useCallback((selectedOptions) => {
    if (selectedOptions.length > 0) {
      return {
        invalid: false,
      };
    }
    return {};
  }, []);
  return (
    <Select
      options={options}
      onChange={onChange}
      icon={<IconLocation />}
      required
      invalid
      clearable={false}
      texts={{ ...defaultTexts, error: 'Select one option' }}
      id="hds-select-component"
    />
  );
};

export const WithCollaboration = () => {
  const forceRender = useForceRender();
  const [selectedItems, updateSelectedItems] = useState<Record<string, Option[]>>({});

  const removeDuplicatesAndSort = (arr: string[]) => {
    const unique = Array.from(new Set(arr));
    return unique.sort();
  };

  const optionList = getOptionLabels(20).map((item) => item.split(' '));
  const adjectives = removeDuplicatesAndSort(optionList.map(([adj]) => adj));
  const fruits = removeDuplicatesAndSort(optionList.map(([, item]) => item));

  const onTopCategoryChange: SelectProps['onChange'] = () => {
    forceRender();
  };

  const topCategoryStorage = useSelectStorage({
    options: fruits.map((option) => {
      return {
        label: capitalize(option),
        value: option,
        selected: false,
      };
    }),
    onChange: onTopCategoryChange,
    texts: { label: 'Select a category', placeholder: 'Choose one' },
    clearable: false,
  });

  const getSelectedTopCategoryValue = () => {
    return (getSelectedOptions(topCategoryStorage.getProps().groups as Group[])[0] || ({} as Option)).value || '';
  };

  const createSubCategoryOptions = () => {
    const currentTopCategory = getSelectedTopCategoryValue();
    if (!currentTopCategory) {
      return [];
    }
    const selected = selectedItems[currentTopCategory] || [];
    return adjectives.map((value) => {
      const lcValue = value.toLowerCase();
      const label = capitalize(`${value} ${currentTopCategory}`);
      return { label, value: lcValue, selected: !!selected.find((opt) => opt.value === lcValue) };
    });
  };

  const addToSelectedItems = (topCat: string, selections: Option[]) => {
    if (topCat) {
      const copy = { ...selectedItems };
      copy[topCat] = selections.map((s) => ({ ...s }));
      updateSelectedItems(copy);
    }
  };

  const onSubCategoryChange: SelectProps['onChange'] = (selectedValues) => {
    addToSelectedItems(getSelectedTopCategoryValue(), selectedValues);
  };

  const hasSelectedTopCategory = !!getSelectedTopCategoryValue();

  const subCategoryStorage = useSelectStorage({
    options: createSubCategoryOptions(),
    onChange: onSubCategoryChange,
    multiSelect: true,
    noTags: true,
    texts: { label: 'Select favourite types', placeholder: 'Choose multiple', assistive: 'Select category first' },
    updateKey: getSelectedTopCategoryValue(),
    open: false,
    disabled: true,
  });

  if (subCategoryStorage.getProps().disabled && hasSelectedTopCategory) {
    subCategoryStorage.setDisabled(false);
    subCategoryStorage.updateTexts({ assistive: '' });
  }

  const removeFromSelectedItems = (option: Option) => {
    const [topCat, subCat] = String(option.label).split(': ');
    const topCatLowerCase = topCat.toLowerCase();
    const items = selectedItems[topCatLowerCase] || [];
    const newItems = items.filter((e) => e.value !== subCat);
    addToSelectedItems(topCatLowerCase, newItems);

    if (getSelectedTopCategoryValue().toLowerCase() === topCatLowerCase) {
      subCategoryStorage.updateAllOptions((opt) => {
        return {
          ...opt,
          selected: !!newItems.find((o) => o.value === opt.value),
        };
      });
    }
  };

  const SelectedValues = () => {
    const selectedTopCategories = Object.keys(selectedItems);
    if (!selectedTopCategories.length) {
      return null;
    }
    const values: OptionInProps[] = [];
    selectedTopCategories.forEach((key) => {
      const options = selectedItems[key];
      options.forEach((option) => {
        const value = `${key}: ${option.value}`;
        values.push({ label: capitalize(value), value });
      });
    });
    if (!values.length) {
      return null;
    }
    return (
      <>
        <style>
          {`
          .tags{
            margin-top: 20px;
          }
          .tags > *{
            margin-right: 10px;
          }
      `}
        </style>

        <div>
          <h3>Selected</h3>
          <div className="tags">
            {values.map((opt) => {
              const onDelete = () => {
                removeFromSelectedItems(opt as Option);
              };
              return (
                <Tag onDelete={onDelete} key={opt.value}>
                  {opt.label as string}
                </Tag>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <Select {...topCategoryStorage.getProps()} />
      <Select {...subCategoryStorage.getProps()} />
      <SelectedValues />
    </div>
  );
};

export const WithExternalLabel = () => {
  const options = getOptionLabels(4).map((option, i) => {
    return { label: option, value: option, disabled: i === 3 };
  });

  const selectId = 'labelless-select';
  const { button: buttonId, label: labelId } = getElementIds(selectId);
  return (
    <div>
      <label htmlFor={buttonId} id={labelId}>
        External label
      </label>
      <Select
        id={selectId}
        options={options}
        onChange={genericOnChangeCallback}
        texts={{ placeholder: 'Choose three or more', dropdownButtonAriaLabel: 'External label. Choose anything.' }}
      />
    </div>
  );
};

export const WithCustomTheme = (args: SelectProps) => {
  const groups: SelectProps['groups'] = [
    {
      label: 'Healthy choices',
      options: getOptionLabels(3).map((label, index) => {
        return {
          label,
          disabled: index === 1,
          selected: index === 2,
        };
      }),
    },
    {
      label: 'More healthy choices',
      options: getOptionLabels(3, 5).map((label, index) => {
        return {
          label,
          disabled: index === 0,
          selected: index === 0,
        };
      }),
    },
    {
      label: 'Only disabled choices',
      options: getOptionLabels(3, 10).map((label, index) => {
        return {
          label,
          disabled: true,
          selected: index !== 2,
        };
      }),
    },
  ];
  return (
    <Select
      {...args}
      multiSelect
      invalid
      groups={groups}
      filter={defaultFilter}
      onChange={genericOnChangeCallback}
      texts={{ ...defaultTexts, assistive: 'Change theme with Story parameters!' }}
      id="hds-select-component"
      icon={<IconLocation />}
    />
  );
};
WithCustomTheme.args = {
  theme: {
    '--assistive-color': 'var(--color-bus)',
    '--checkbox-background-default': 'var(--color-summer-light)',
    '--checkbox-background-selected': 'var(--color-summer-dark)',
    '--checkbox-background-hover': 'var(--color-summer-dark)',
    '--checkbox-background-disabled': 'var(--color-black-30)',
    '--checkbox-border-color-selected': 'var(--color-summer-dark)',
    '--checkbox-border-color-selected-hover': 'var(--color-summer-dark)',
    '--checkbox-border-color-selected-focus': 'var(--color-black)',
    '--checkbox-border-color-unselected': 'var(--color-summer-light)',
    '--checkbox-border-color-unselected-hover': 'var(--color-summer-dark)',
    '--checkbox-border-color-unselected-focus': 'var(--color-summer)',
    '--checkbox-border-color-disabled': 'var(--color-black-60)',
    '--checkbox-icon-color-unselected': 'transparent',
    '--checkbox-icon-color-selected': 'var(--color-black)',
    '--checkbox-icon-color-disabled': 'var(--color-black-60)',
    '--clear-all-background-color': 'var(--color-metro-light)',
    '--clear-all-background-color-focus': 'var(--color-metro-medium-light)',
    '--clear-all-background-color-hover': 'var(--color-metro-light)',
    '--clear-all-background-color-active': 'var(--color-metro-light)',
    '--clear-all-background-color-disabled': 'var(--color-black-30)',
    '--clear-all-border-color': 'var(--color-metro-dark)',
    '--clear-all-border-color-focus': 'var(--color-metro-dark)',
    '--clear-all-border-color-hover': 'var(--color-metro)',
    '--clear-all-border-color-active': 'var(--color-metro-dark)',
    '--clear-all-border-color-disabled': 'var(--color-black-60)',
    '--clear-all-color': 'var(--color-black)',
    '--clear-all-color-hover': 'var(--color-metro)',
    '--clear-all-color-focus': 'var(--color-metro-dark)',
    '--clear-all-color-active': 'var(--color-metro-dark)',
    '--clear-all-color-disabled': 'var(--color-black-80)',
    '--clear-all-outline-color-focus': 'var(--color-metro-dark)',
    '--error-text-color': 'var(--color-black)',
    '--error-icon-color': 'var(--color-black)',
    '--error-background-color': 'var(--color-black-10)',
    '--error-border-color': 'var(--color-black)',
    '--focus-outline-color': 'var(--color-black)',
    '--icon-color': 'var(--color-white)',
    '--dropdown-background-default': 'var(--color-black)',
    '--dropdown-background-disabled': 'var(--color-black-30)',
    '--dropdown-border-color-default': 'var(--color-bus-dark)',
    '--dropdown-border-color-hover': 'var(--color-error)',
    '--dropdown-border-color-hover-invalid': 'var(--color-metro)',
    '--dropdown-border-color-focus': 'var(--color-bus)',
    '--dropdown-border-color-invalid': 'var(--color-error)',
    '--dropdown-color-default': 'var(--color-white)',
    '--dropdown-color-disabled': 'var(--color-black-80)',
    '--dropdown-icon-color': 'var(--color-white)',
    '--menu-divider-color': 'var(--color-white)',
    '--menu-item-background-color-default': 'var(--color-summer)',
    '--menu-item-background-color-hover': 'var(--color-summer-light)',
    '--menu-item-background-color-selected': 'var(--color-summer-light)',
    '--menu-item-background-color-selected-hover': 'var(--color-summer)',
    '--menu-item-background-color-disabled': 'var(--color-black-30)',
    '--menu-item-background-color-disabled-hover': 'var(--color-black-30)',
    '--menu-item-color-default': 'var(--color-black-90)',
    '--menu-item-color-hover': 'var(--color-black)',
    '--menu-item-color-selected': 'var(--color-black-90)',
    '--menu-item-color-selected-hover': 'var(--color-black)',
    '--menu-item-color-disabled': 'var(--color-black-80)',
    '--menu-item-icon-color-selected': 'var(--color-white)',
    '--menu-item-icon-color-disabled': 'var(--color-black-60)',
    '--menu-item-border-color-focus': 'var(--color-white)',
    '--menu-item-group-label-background-default': 'var(--color-white)',
    '--menu-item-group-label-background-disabled': 'var(--color-black-30)',
    '--menu-item-group-label-background-disabled-hover': 'var(--color-black-30)',
    '--menu-item-group-label-color-disabled': 'var(--color-black-80)',
    '--placeholder-color': 'var(--color-black-30)',
    '--show-all-background-color': 'var(--color-tram-light)',
    '--show-all-background-color-focus': 'var(--color-tram-medium-light)',
    '--show-all-background-color-hover': 'var(--color-tram-light)',
    '--show-all-background-color-active': 'var(--color-tram-light)',
    '--show-all-background-color-disabled': 'var(--color-black-30)',
    '--show-all-border-color': 'var(--color-tram-dark)',
    '--show-all-border-color-focus': 'var(--color-tram-dark)',
    '--show-all-border-color-hover': 'var(--color-tram)',
    '--show-all-border-color-active': 'var(--color-tram-dark)',
    '--show-all-border-color-disabled': 'var(--color-black-60)',
    '--show-all-color': 'var(--color-black)',
    '--show-all-color-hover': 'var(--color-tram)',
    '--show-all-color-focus': 'var(--color-tram-dark)',
    '--show-all-color-active': 'var(--color-tram-dark)',
    '--show-all-color-disabled': 'var(--color-black-80)',
    '--show-all-outline-color-focus': 'var(--color-tram-dark)',
    '--tag-background-color': 'var(--color-summer-light)',
    '--tag-background-color-focus': 'var(--color-summer-medium-light)',
    '--tag-background-color-hover': 'var(--color-summer-light)',
    '--tag-background-color-active': 'var(--color-summer-dark)',
    '--tag-border-color': 'var(--color-summer-dark)',
    '--tag-border-color-focus': 'var(--color-summer-dark)',
    '--tag-border-color-hover': 'var(--color-summer)',
    '--tag-border-color-active': 'var(--color-summer-dark)',
    '--tag-color': 'var(--color-black)',
    '--tag-color-focus': 'var(--color-summer-dark)',
    '--tag-color-hover': 'var(--color-summer)',
    '--tag-color-active': 'var(--color-black)',
    '--tag-outline-color': 'var(--color-black)',
    '--text-icon-color': 'var(--color-white)',
    '--text-input-background-default': 'var(--color-black)',
    '--text-input-border-color-default': 'var(--color-black-30)',
    '--text-input-border-color-hover': 'var(--color-white)',
    '--text-input-border-color-focus': 'var(--color-bus)',
    '--text-input-color-default': 'var(--color-white)',
    '--text-color-focus-outline': 'var(--color-coat-of-arms-light)',
    '--text-input-placeholder-color': 'var(--color-black-20)',
    '--text-label-color-default': 'var(--color-white)',
  },
};
