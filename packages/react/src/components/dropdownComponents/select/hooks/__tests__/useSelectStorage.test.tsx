import React from 'react';
import { render } from '@testing-library/react';

import { SelectStorageProps, useSelectStorage } from '../useSelectStorage';
import { Select } from '../../Select';
import { getOptionLabels } from '../../../modularOptionList/batch.options';
import { defaultTexts } from '../../texts';
import { mockedContainer, renderResultToHelpers, testUtilAfterAll, testUtilBeforeAll } from '../../testUtil';
import { useTextProvider } from '../useTextProvider';
import { Group, SelectProps, Option } from '../../types';
import { getLastMockCallArgs } from '../../../../../utils/testHelpers';
import { getAllOptions } from '../../utils';
import { eventIds, eventTypes } from '../../events';
import useForceRender from '../../../../../hooks/useForceRender';
import { ChangeEvent } from '../../../../dataProvider/DataContext';

const mockHookData = jest.fn();

jest.mock('../useSelectStorage', () => {
  return {
    __esModule: true,
    // had to type cast this because random ts check fails.
    ...(jest.requireActual('../useSelectStorage') as Record<string, never>),
    useSelectStorage: (props: SelectStorageProps) => {
      const exported = jest.requireActual('../useSelectStorage');
      const result = exported.useSelectStorage(props);
      mockHookData.mockReturnValue(result);
      return result;
    },
  };
});

jest.mock('../../components/Label', () => {
  return {
    __esModule: true,
    Label: () => {
      return mockedContainer();
    },
  };
});

describe('useSelectStorage', () => {
  const ids = {
    assistiveText: 'assistive-text',
    errorText: 'error-text',
  };
  const Outputs = () => {
    const assistiveText = useTextProvider('assistive');
    const errorText = useTextProvider('error');
    return (
      <>
        <p>This replaces Container</p>
        <p id={ids.assistiveText}>{assistiveText}</p>
        <p id={ids.errorText}>{errorText}</p>
      </>
    );
  };
  let injectProps: Partial<SelectStorageProps> = {};

  beforeAll(() => {
    testUtilBeforeAll(Outputs);
  });
  afterAll(() => {
    testUtilAfterAll();
  });
  afterEach(() => {
    injectProps = {};
  });

  const ComponentWithHook = (props: SelectStorageProps) => {
    const forceRender = useForceRender();
    const storage = useSelectStorage({ ...props, ...injectProps });

    return (
      <>
        <Select {...storage.getProps()} />
        <button type="button" onClick={forceRender} id="force-render">
          Update data
        </button>
        <span id="force-render-time">{Date.now()}</span>;
      </>
    );
  };

  const initHookTest = (props: SelectStorageProps) => {
    const result = render(<ComponentWithHook {...props} />);
    const helpers = renderResultToHelpers(result);
    const getAssistiveText = () => {
      return helpers.getElementById(ids.assistiveText).innerHTML;
    };
    const getErrorText = () => {
      return helpers.getElementById(ids.errorText).innerHTML;
    };
    return {
      ...result,
      ...helpers,
      getAssistiveText,
      getErrorText,
      getHook: () => mockHookData() as ReturnType<typeof useSelectStorage>,
    };
  };

  const defaultProps: SelectStorageProps = {
    groups: [
      {
        label: 'Healthy choices',
        options: getOptionLabels(20).map((option) => {
          return { label: option, value: option, disabled: false };
        }),
      },
    ],
    multiSelect: true,
    open: false,
    texts: defaultTexts.fi,
    onChange: jest.fn(),
  };

  const getGroupsFromPropGetter = (getPropsFn: () => SelectProps): Group[] => {
    return getPropsFn().groups as Group[];
  };
  const getOptionsFromPropGetter = (getPropsFn: () => SelectProps): Option[] => {
    return getAllOptions(getGroupsFromPropGetter(getPropsFn), false);
  };

  describe('setters update the storage. Component is updated after storage.render() is called.', () => {
    it('getProps() returns given groups and options', async () => {
      const helpers = initHookTest(defaultProps);
      const { getProps } = helpers.getHook();
      expect(getGroupsFromPropGetter(getProps)).toHaveLength(1);
      // option count is 20 options +1 label
      expect(getOptionsFromPropGetter(getProps)).toHaveLength(21);
    });
    it('updateAllOptions is called with each option and it updates all options in groups.', async () => {
      const { getHook, getDataFromElement, createRenderUpdatePromise } = initHookTest(defaultProps);
      const { getProps, updateAllOptions, render: renderInHook } = getHook();
      const toggleDisable = jest.fn().mockImplementation((option) => {
        return {
          ...option,
          disabled: !option.disabled,
        };
      });
      updateAllOptions(toggleDisable);
      // option count is 20 options +1 label
      expect(toggleDisable).toHaveBeenCalledTimes(21);
      expect(getOptionsFromPropGetter(getProps).filter((e) => !e.disabled)).toHaveLength(0);

      // component has not been re-rendered yet
      const data = getDataFromElement();
      const { options } = data.groups[0];
      expect(options.filter((e) => !e.disabled)).toHaveLength(21);
      const promise = createRenderUpdatePromise();
      renderInHook();
      await promise;
      // component has been re-rendered
      const dataAfterUpdate = getDataFromElement();
      const { options: optionsAfterUpdate } = dataAfterUpdate.groups[0];
      expect(optionsAfterUpdate.filter((e) => !e.disabled)).toHaveLength(0);

      updateAllOptions(toggleDisable);
      expect(getOptionsFromPropGetter(getProps).filter((e) => !e.disabled)).toHaveLength(21);
      const updatePromise = createRenderUpdatePromise();
      renderInHook();
      await updatePromise;
      // component has been re-rendered
      const dataAfterUpdate2 = getDataFromElement();
      const { options: optionsAfterUpdate2 } = dataAfterUpdate2.groups[0];
      expect(optionsAfterUpdate2.filter((e) => !e.disabled)).toHaveLength(21);

      // updateAllOptions is called with (current option,current group, optionIndex, groupIndex)
      const [option, group, optionIndex, groupIndex] = getLastMockCallArgs(toggleDisable);
      expect(groupIndex).toBe(0);
      expect(optionIndex).toBe(20);
      expect(group).toBeTruthy();
      expect(option.label === getOptionsFromPropGetter(getProps)[20].label).toBeTruthy();
    });

    it('updateTexts updates texts.', async () => {
      const { getHook, createRenderUpdatePromise, getAssistiveText } = initHookTest(defaultProps);
      const { updateTexts, render: renderInHook } = getHook();

      const assistive = 'new assistive text';
      updateTexts({ assistive });
      const promise = createRenderUpdatePromise();
      renderInHook();
      await promise;
      expect(getAssistiveText()).toBe(assistive);
    });
    it('setError updates invalid prop and the error text. Value can be a boolean or string.', async () => {
      const { getHook, createRenderUpdatePromise, getErrorText, getDataFromElement } = initHookTest(defaultProps);
      const { setError, render: renderInHook } = getHook();

      const errorText = 'new error text';
      expect(getDataFromElement().invalid).toBeFalsy();
      setError(errorText);
      const promise = createRenderUpdatePromise();
      renderInHook();
      await promise;
      expect(getDataFromElement().invalid).toBeTruthy();
      expect(getErrorText()).toBe(errorText);

      setError(false);
      const updatePromise = createRenderUpdatePromise();
      renderInHook();
      await updatePromise;
      expect(getDataFromElement().invalid).toBeFalsy();
      // error text did not change. Error is not visible in component unless error text and invalid are both truthy
      expect(getErrorText()).toBe(errorText);

      // setting "true", means text stays the same, only invalid updates
      setError(true);
      const lastPromise = createRenderUpdatePromise();
      renderInHook();
      await lastPromise;
      expect(getDataFromElement().invalid).toBeTruthy();
      // error text did not change
      expect(getErrorText()).toBe(errorText);
    });
    it('setOpen updates open prop', async () => {
      const { getHook, createRenderUpdatePromise, getDataFromElement } = initHookTest(defaultProps);
      const { setOpen, render: renderInHook } = getHook();

      expect(getDataFromElement().open).toBeFalsy();
      setOpen(true);
      const promise = createRenderUpdatePromise();
      renderInHook();
      await promise;
      expect(getDataFromElement().open).toBeTruthy();

      setOpen(false);
      const newPromise = createRenderUpdatePromise();
      renderInHook();
      await newPromise;
      expect(getDataFromElement().open).toBeFalsy();
    });
    it('setDisabled updates disabled prop', async () => {
      const { getHook, createRenderUpdatePromise, getDataFromElement } = initHookTest(defaultProps);
      const { setDisabled, render: renderInHook } = getHook();

      expect(getDataFromElement().disabled).toBeFalsy();
      setDisabled(true);
      const promise = createRenderUpdatePromise();
      renderInHook();
      await promise;
      expect(getDataFromElement().disabled).toBeTruthy();

      setDisabled(false);
      const newPromise = createRenderUpdatePromise();
      renderInHook();
      await newPromise;
      expect(getDataFromElement().disabled).toBeFalsy();
    });
    it('setInvalid updates disabled prop', async () => {
      const { getHook, createRenderUpdatePromise, getDataFromElement } = initHookTest(defaultProps);
      const { setInvalid, render: renderInHook } = getHook();

      expect(getDataFromElement().invalid).toBeFalsy();
      setInvalid(true);
      const promise = createRenderUpdatePromise();
      renderInHook();
      await promise;
      expect(getDataFromElement().invalid).toBeTruthy();

      setInvalid(false);
      const newPromise = createRenderUpdatePromise();
      renderInHook();
      await newPromise;
      expect(getDataFromElement().invalid).toBeFalsy();
    });
  });
  describe('onChange', () => {
    const onChangeCallTracker = jest.fn();
    const triggerOptionClickEvent = async (
      getPropsFn: () => SelectProps,
      trigger: (e: ChangeEvent<string, string>) => Promise<unknown>,
    ) => {
      const options = getOptionsFromPropGetter(getPropsFn);
      await trigger({ id: eventIds.listItem, type: eventTypes.click, payload: { value: options[1] } });
    };
    const onChange1: SelectProps['onChange'] = () => {
      onChangeCallTracker(1);
      return { options: ['onChange1Option'] };
    };
    const onChange2: SelectProps['onChange'] = () => {
      onChangeCallTracker(2);
      return { options: ['onChange2Option1', 'onChange2Option2'] };
    };
    it('is stored and updated each time it is set', async () => {
      const helpers = initHookTest({ ...defaultProps, onChange: onChange1 });
      const { getHook, triggerChangeEvent, triggerForceRender } = helpers;
      const { getProps } = getHook();
      await triggerOptionClickEvent(getProps, triggerChangeEvent);
      expect(onChangeCallTracker).toHaveBeenCalledTimes(1);
      expect(onChangeCallTracker).toHaveBeenLastCalledWith(1);
      const optionsAfterUpdate = getOptionsFromPropGetter(getProps);
      expect(optionsAfterUpdate).toHaveLength(2);

      injectProps.onChange = onChange2;
      await triggerForceRender();
      expect(onChangeCallTracker).toHaveBeenCalledTimes(1);
      await triggerOptionClickEvent(getProps, triggerChangeEvent);
      expect(onChangeCallTracker).toHaveBeenCalledTimes(2);
      expect(onChangeCallTracker).toHaveBeenLastCalledWith(2);
      const optionsAfterSecondUpdate = getOptionsFromPropGetter(getProps);
      expect(optionsAfterSecondUpdate).toHaveLength(3);

      injectProps.onChange = onChange1;
      await triggerForceRender();
      expect(onChangeCallTracker).toHaveBeenCalledTimes(2);
      await triggerOptionClickEvent(getProps, triggerChangeEvent);
      expect(onChangeCallTracker).toHaveBeenCalledTimes(3);
      expect(onChangeCallTracker).toHaveBeenLastCalledWith(1);
      const optionsAfterThirdUpdate = getOptionsFromPropGetter(getProps);
      expect(optionsAfterThirdUpdate).toHaveLength(2);
    });
    it('props returned from onChange are stored and passed', async () => {
      const newProps = {
        options: ['onChangeOption1', 'onChangeOption2', 'onChangeOption3'],
        texts: { assistive: 'onChangeAssistive' },
        invalid: true,
      };
      const onChange: SelectProps['onChange'] = () => {
        return newProps;
      };

      const helpers = initHookTest({ ...defaultProps, onChange });
      const { getHook, triggerChangeEvent, getAssistiveText } = helpers;
      const { getProps } = getHook();
      await triggerOptionClickEvent(getProps, triggerChangeEvent);

      const optionsAfterUpdate = getOptionsFromPropGetter(getProps);
      expect(optionsAfterUpdate).toHaveLength(4);
      // comparing 2 to 1, because in options #0 is added groupLabel
      expect(optionsAfterUpdate[2].label).toBe(newProps.options[1]);
      expect(getAssistiveText()).toBe(newProps.texts.assistive);
      expect(getProps().invalid).toBe(newProps.invalid);
    });
  });
});
