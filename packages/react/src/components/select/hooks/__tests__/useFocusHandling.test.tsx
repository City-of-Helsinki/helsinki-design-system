import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';

import { useFocusHandling } from '../useFocusHandling';
import { GetSelectProps, initTests, mockedContainer, testUtilAfterAll, testUtilBeforeAll } from '../../testUtil';
import { waitForElementFocus, getActiveElement } from '../../../cookieConsent/test.util';

jest.mock('../../components/Label', () => {
  return {
    __esModule: true,
    Label: () => mockedContainer(),
  };
});
// The mock needs to render something
const Temp = () => <div>Label replacement</div>;

const mockHookData = jest.fn();

jest.mock('../useFocusHandling', () => {
  return {
    __esModule: true,
    // had to type cast this because random ts check fails.
    ...(jest.requireActual('../useFocusHandling') as Record<string, never>),
    useFocusHandling: () => {
      const exported = jest.requireActual('../useFocusHandling');
      const result = exported.useFocusHandling();
      mockHookData.mockReturnValue(result);
      return result;
    },
  };
});

const initHookTest = (props: GetSelectProps) => {
  // const selectProps = getSelectProps(props) as GetSelectProps;
  const helpers = initTests({ testProps: props, renderComponentOnly: false, withForceRender: true });
  return {
    ...helpers,
    getHook: () => mockHookData() as ReturnType<typeof useFocusHandling>,
  };
};

describe('useFocusHandling', () => {
  const defaultProps: GetSelectProps = {
    groups: true,
    multiSelect: true,
    input: 'filter',
    hasSelections: true,
    open: false,
  };

  const simplerProps: GetSelectProps = {
    ...defaultProps,
    open: true,
    multiSelect: false,
    groups: false,
  };

  beforeEach(() => {
    //
  });
  beforeAll(() => {
    testUtilBeforeAll(Temp);
  });
  afterAll(() => {
    testUtilAfterAll();
  });

  describe('Focus shifting', () => {
    it('When metaData.focusTarget is set, focus is moved to the named component', async () => {
      const helpers = initHookTest(defaultProps);
      const { getInputElement, triggerDataChange, triggerForceRender, getMetaDataFromElement } = helpers;

      // this triggers an "open" event that sets focusTarget to input
      await triggerDataChange({});
      await waitForElementFocus(getInputElement);
      await triggerForceRender();
      const metaData = getMetaDataFromElement();
      expect(metaData.focusTarget).toBeUndefined();
    });
    it('When metaData.focusTarget is "tag", focus is moved to first tag', async () => {
      const helpers = initHookTest({ ...defaultProps, hasSelections: true });
      const { triggerMetaDataChange, triggerForceRender, getTagElements } = helpers;

      // this triggers an "open" event that sets focusTarget to input
      await triggerMetaDataChange({ focusTarget: 'tag' });
      await triggerForceRender();
      const getFirstTagElement = () => {
        return getTagElements()[0];
      };
      await waitForElementFocus(getFirstTagElement);
    });
    it('When metaData.activeDescendant is set, focus is moved to the element if not focused yet.', async () => {
      const helpers = initHookTest({ ...defaultProps, hasSelections: true, open: true });
      const { getAllListElements, triggerMetaDataChange, triggerForceRender } = helpers;

      const getOptionSecondElement = () => {
        return getAllListElements()[1];
      };
      const option = getOptionSecondElement();
      const id = option.getAttribute('id') as string;
      await triggerMetaDataChange({ activeDescendant: id });
      await triggerForceRender();

      await waitForElementFocus(getOptionSecondElement);
    });
    it('If menu is open and a tag related element gets focus, menu is closed and focus is set to the first tag.', async () => {
      const helpers = initHookTest({ ...defaultProps, hasSelections: true, open: true });
      const { getTagElements, getListElement, isListOpen } = helpers;
      expect(isListOpen()).toBeTruthy();
      getListElement().focus();
      const getTagElement = () => {
        return getTagElements()[0];
      };
      //
      getTagElements()[2].focus();
      await waitFor(() => {
        expect(isListOpen()).toBeFalsy();
      });
      await waitForElementFocus(getTagElement);
    });
    it('When the list gets focus, it is moved to the first element. Active-descendant is reset.', async () => {
      const helpers = initHookTest(simplerProps);
      const { getListElement, getAllListElements, getInputElement } = helpers;

      getListElement().focus();
      const getFirstListElement = () => {
        return getAllListElements()[0];
      };
      await waitForElementFocus(getFirstListElement);
      const input = getInputElement();
      const selected = getFirstListElement();
      expect(input.getAttribute('aria-activedescendant')).toBe(selected.getAttribute('id'));
    });
    it('When a list item gets focus, active-descendant is reset.', async () => {
      const helpers = initHookTest(simplerProps);
      const { getAllListElements, getInputElement } = helpers;

      const setFocusAndVerifyActivedescendant = (index: number) => {
        const optionElement = getAllListElements()[index];
        optionElement.focus();
        const input = getInputElement();
        expect(input.getAttribute('aria-activedescendant')).toBe(optionElement.getAttribute('id'));
      };

      setFocusAndVerifyActivedescendant(0);
      setFocusAndVerifyActivedescendant(1);
      setFocusAndVerifyActivedescendant(2);
    });
    it('When other element gets focus, active-descendant is cleared.', async () => {
      const helpers = initHookTest({ ...defaultProps, hasSelections: true, open: true });
      const { getAllListElements, getInputElement, getTagElements } = helpers;

      const option = getAllListElements()[1];
      option.focus();
      expect(getInputElement().getAttribute('aria-activedescendant')).toBe(option.getAttribute('id'));
      getTagElements()[0].focus();
      await waitFor(() => {
        expect(getInputElement().getAttribute('aria-activedescendant')).toBe('');
      });
    });
    it('When the container loses focus, menu is closed', async () => {
      const helpers = initHookTest({ ...defaultProps, hasSelections: true, open: true });
      const { isListOpen, getRootContainer } = helpers;
      expect(isListOpen()).toBeTruthy();
      fireEvent.blur(getRootContainer());
      await waitFor(() => {
        expect(isListOpen()).toBeFalsy();
      });
    });
    it('When the container loses focus but a tag was focused, menu is closed and tag remains focus.', async () => {
      const helpers = initHookTest({ ...defaultProps, hasSelections: true, open: true });
      const { isListOpen, getAllListElements, getTagElements } = helpers;
      expect(isListOpen()).toBeTruthy();
      getAllListElements()[0].focus();
      getTagElements()[0].focus();
      await waitFor(() => {
        expect(isListOpen()).toBeFalsy();
      });
      expect(getActiveElement(getTagElements()[0]) === getTagElements()[0]).toBeTruthy();
    });
  });
});
