import React from 'react';
import { fireEvent } from '@testing-library/react';

import {
  isArrowButtonType,
  isClearAllButtonType,
  isClearButtonType,
  isContainerType,
  isListGroupLabelType,
  isListItemType,
  isListType,
  isSearchOrFilterInputLabelType,
  isSearchOrFilterInputType,
  isSelectedOptionsButtonType,
  isShowAllButtonType,
  isTagListType,
  isTagType,
  useElementDetection,
} from '../useElementDetection';
import { GetSelectProps, getSelectProps, renderWithHelpers } from '../../testUtil';
import { Group, KnownElementType } from '../../types';
import { getAllOptions, propsToGroups } from '../../utils';

const mockHookData = jest.fn();

jest.mock('../useElementDetection', () => {
  return {
    __esModule: true,
    // had to type cast this because random ts check fails.
    ...(jest.requireActual('../useElementDetection') as Record<string, never>),
    useElementDetection: () => {
      const exported = jest.requireActual('../useElementDetection');
      const result = exported.useElementDetection();
      mockHookData.mockReturnValue(result);
      return result;
    },
  };
});

const initHookTest = (props: GetSelectProps) => {
  const selectProps = getSelectProps(props);
  const helpers = renderWithHelpers(selectProps);
  return {
    ...helpers,
    getHook: () => mockHookData() as ReturnType<typeof useElementDetection>,
  };
};

type LinkedData = {
  type: KnownElementType;
  getElement: () => HTMLElement;
  isChecker: (target: KnownElementType) => boolean;
};

describe('useElementDetection', () => {
  const createLinkedData = (helpers: ReturnType<typeof initHookTest>): LinkedData[] => {
    const linkedData: LinkedData[] = [
      { type: 'list', getElement: helpers.getListElement, isChecker: isListType },
      { type: 'dropdownButton', getElement: helpers.getButtonElement, isChecker: isSelectedOptionsButtonType },
      { type: 'container', getElement: helpers.getRootContainer, isChecker: isContainerType },
      { type: 'searchOrFilterInput', getElement: helpers.getInputElement, isChecker: isSearchOrFilterInputType },
      {
        type: 'searchOrFilterInputLabel',
        getElement: helpers.getSearchOrFilterInputLabel,
        isChecker: isSearchOrFilterInputLabelType,
      },
      { type: 'showAllButton', getElement: helpers.getShowAllButton, isChecker: isShowAllButtonType },
      { type: 'clearAllButton', getElement: helpers.getClearAllButton, isChecker: isClearAllButtonType },
      { type: 'clearButton', getElement: helpers.getClearButton, isChecker: isClearButtonType },
      { type: 'arrowButton', getElement: helpers.getArrowButton, isChecker: isArrowButtonType },
      { type: 'tagList', getElement: helpers.getTagList, isChecker: isTagListType },
      { type: 'tag', getElement: () => helpers.getTagElements()[0], isChecker: isTagType },
      { type: 'listGroupLabel', getElement: () => helpers.getGroupLabelElements()[0], isChecker: isListGroupLabelType },
      { type: 'listItem', getElement: () => helpers.getOptionElements()[1], isChecker: isListItemType },
    ];
    return linkedData;
  };

  const multiSelectOnlyElementTypes: KnownElementType[] = ['showAllButton', 'clearAllButton', 'tagList'];
  const requiresSelectionsElementTypes: KnownElementType[] = [
    'showAllButton',
    'clearAllButton',
    'clearButton',
    'tag',
    'tagList',
  ];
  const requiresGroupsElementTypes: KnownElementType[] = ['listGroupLabel'];
  const requiresOpenListElementTypes: KnownElementType[] = ['listItem', 'listGroupLabel'];
  const requiresInputElementTypes: KnownElementType[] = ['searchOrFilterInput', 'searchOrFilterInputLabel'];

  const filterKnownTypes = (data: LinkedData[], excludedTypes: KnownElementType[]) => {
    return data.filter((item) => !excludedTypes.includes(item.type));
  };

  const filterLinkedData = (
    data: LinkedData[],
    { groups, multiSelect, input, open, hasSelections }: GetSelectProps,
  ) => {
    let excluded: KnownElementType[] = [];
    if (!multiSelect) {
      excluded = [...excluded, ...multiSelectOnlyElementTypes];
    }
    if (!input) {
      excluded = [...excluded, ...requiresInputElementTypes];
    }
    if (!hasSelections) {
      excluded = [...excluded, ...requiresSelectionsElementTypes];
    }
    if (!groups) {
      excluded = [...excluded, ...requiresGroupsElementTypes];
    }
    if (!open) {
      excluded = [...excluded, ...requiresOpenListElementTypes];
    }
    return filterKnownTypes(data, excluded);
  };

  const defaultProps: GetSelectProps = {
    groups: true,
    multiSelect: true,
    input: 'filter',
    hasSelections: true,
    open: true,
  };

  describe('getElementByKnownType', () => {
    it('returns element by type or null', async () => {
      const helpers = initHookTest(defaultProps);
      const { getElementByKnownType } = helpers.getHook();
      const linkedData = filterLinkedData(createLinkedData(helpers), defaultProps);
      // getElementByKnownType does not handle list items or tags
      const failingTypes = ['listGroupLabel', 'listItem', 'tag'];
      linkedData.forEach((data) => {
        const willFail = failingTypes.includes(data.type);
        const el = data.getElement();
        expect(getElementByKnownType(data.type)).toBe(willFail ? null : el);
        linkedData.forEach((otherData) => {
          if (otherData.type === data.type) {
            return;
          }
          expect(getElementByKnownType(otherData.type)).not.toBe(el);
        });
      });
    });
  });
  describe('getElementType', () => {
    it('returns type of given element or undefined', async () => {
      const helpers = initHookTest(defaultProps);
      const { getElementType } = helpers.getHook();
      const linkedData = filterLinkedData(createLinkedData(helpers), defaultProps);
      linkedData.forEach((data) => {
        expect(getElementType(data.getElement())).toBe(data.type);
        linkedData.forEach((otherData) => {
          if (otherData.type === data.type) {
            return;
          }
          expect(getElementType(otherData.getElement())).not.toBe(data.type);
        });
      });
    });
  });
  describe('is....Type', () => {
    it('returns true when type is matches the function', async () => {
      const helpers = initHookTest(defaultProps);
      const linkedData = filterLinkedData(createLinkedData(helpers), defaultProps);
      linkedData.forEach((data) => {
        expect(data.isChecker(data.type)).toBeTruthy();
        linkedData.forEach((otherData) => {
          if (otherData.type === data.type) {
            return;
          }
          expect(otherData.isChecker(data.type)).toBeFalsy();
        });
      });
    });
  });
  describe('elements are correctly mapped to nearest known element with getEventElementType and getElementType', () => {
    it('List elements are mapped', async () => {
      const helpers = initHookTest(defaultProps);
      const { getOptionElements, getRootContainer, getGroupLabelElements } = helpers;
      const { getEventElementType, getElementType } = helpers.getHook();
      const container = getRootContainer();
      let lastEvent: MouseEvent | undefined;
      // not using click, because it would cause re-render
      container.addEventListener(
        'dragend',
        (e: MouseEvent) => {
          e.stopPropagation();
          lastEvent = e;
          // @ts-ignore
          e.nativeEvent = e;
        },
        true,
      );
      const triggerStoredEvent = (element: HTMLElement) => {
        fireEvent.dragEnd(element);
      };
      getOptionElements().forEach((element) => {
        triggerStoredEvent(element);
        expect(getElementType(element)).toBe('listItem');
        // console.log('ch', element.childNodes[0].childNodes[0].childNodes.length);
        expect(getElementType(element.childNodes[0].childNodes[0].childNodes[0] as HTMLElement)).toBe('listItem');
        expect(getEventElementType(lastEvent as unknown as React.MouseEvent<HTMLElement>).type).toBe('listItem');
      });
      getGroupLabelElements().forEach((element) => {
        triggerStoredEvent(element);
        expect(getElementType(element)).toBe('listGroupLabel');
        expect(getElementType(element.childNodes[0].childNodes[0].childNodes[0] as HTMLElement)).toBe('listGroupLabel');
        expect(getEventElementType(lastEvent as unknown as React.MouseEvent<HTMLElement>).type).toBe('listGroupLabel');
      });
    });
    it('Tag elements are mapped', async () => {
      const helpers = initHookTest(defaultProps);
      const { getTagElements, getRootContainer } = helpers;
      const { getEventElementType, getElementType } = helpers.getHook();
      const container = getRootContainer();
      let lastEvent: MouseEvent | undefined;
      container.addEventListener(
        // not using click, because it would cause re-render
        'dragend',
        (e: MouseEvent) => {
          e.stopPropagation();
          lastEvent = e;
          // @ts-ignore
          e.nativeEvent = e;
        },
        true,
      );
      const triggerStoredEvent = (element: HTMLElement) => {
        fireEvent.dragEnd(element);
      };
      getTagElements().forEach((element) => {
        expect(getElementType(element)).toBe('tag');
        expect(getElementType(element.childNodes[0] as HTMLElement)).toBe('tag');
        triggerStoredEvent(element);
        expect(getEventElementType(lastEvent as unknown as React.MouseEvent<HTMLElement>).type).toBe('tag');
      });
    });
  });
  describe('getListItemSiblings() returns next and previous list items', () => {
    const initializeAndReturnElements = () => {
      const { getAllListElements, getHook } = initHookTest(defaultProps);
      const { getListItemSiblings } = getHook();
      const allListElements = getAllListElements();
      return { allListElements, getListItemSiblings, count: allListElements.length };
    };
    it('if looping is allowed, element picking loops the child list.', async () => {
      const { allListElements, getListItemSiblings, count } = initializeAndReturnElements();
      const getPrevAndNextWhenLooping = (index: number) => {
        const expectedPrev = index === 0 ? allListElements[count - 1] : allListElements[index - 1];
        const expectedNext = index === count - 1 ? allListElements[0] : allListElements[index + 1];
        return {
          expectedPrev,
          expectedNext,
        };
      };
      allListElements.forEach((element, index) => {
        const { expectedPrev, expectedNext } = getPrevAndNextWhenLooping(index);
        const { prev, next } = getListItemSiblings(element as HTMLLIElement, true);
        expect(prev === expectedPrev).toBeTruthy();
        expect(next === expectedNext).toBeTruthy();
      });
    });
    it('if looping is not allowed, overflow returns null', async () => {
      const { allListElements, getListItemSiblings, count } = initializeAndReturnElements();
      const getPrevAndNextWhenNotLooping = (index: number) => {
        const expectedPrev = index === 0 ? null : allListElements[index - 1];
        const expectedNext = index === count - 1 ? null : allListElements[index + 1];
        return {
          expectedPrev,
          expectedNext,
        };
      };
      allListElements.forEach((element, index) => {
        const { expectedPrev, expectedNext } = getPrevAndNextWhenNotLooping(index);
        const { prev, next } = getListItemSiblings(element as HTMLLIElement, false);
        expect(prev === expectedPrev).toBeTruthy();
        expect(next === expectedNext).toBeTruthy();
      });
    });
  });
  describe('getTagSiblings() returns next and previous tag items', () => {
    const initializeAndReturnElements = () => {
      const { getTagElements, getHook } = initHookTest(defaultProps);
      const { getTagSiblings } = getHook();
      const allTagElements = getTagElements();
      return { allTagElements, getTagSiblings, count: allTagElements.length };
    };
    it('if looping is allowed, element picking loops the child list.', async () => {
      const { allTagElements, getTagSiblings, count } = initializeAndReturnElements();
      const getPrevAndNextWhenLooping = (index: number) => {
        const expectedPrev = index === 0 ? allTagElements[count - 1] : allTagElements[index - 1];
        const expectedNext = index === count - 1 ? allTagElements[0] : allTagElements[index + 1];
        return {
          expectedPrev,
          expectedNext,
        };
      };
      allTagElements.forEach((element, index) => {
        const { expectedPrev, expectedNext } = getPrevAndNextWhenLooping(index);
        const { prev, next } = getTagSiblings(element as HTMLLIElement, true);
        expect(prev === expectedPrev).toBeTruthy();
        expect(next === expectedNext).toBeTruthy();
      });
    });
  });
  describe('getOptionListItem()', () => {
    it('Finds element for given option', async () => {
      const { getAllListElements, getHook, groupsAndOptions } = initHookTest(defaultProps);
      const { getOptionListItem } = getHook();
      const allListElements = getAllListElements();
      const groups = propsToGroups({ groups: groupsAndOptions }) as Group[];
      const options = getAllOptions(groups, false);
      options.forEach((option, index) => {
        const element = getOptionListItem(groups, option, defaultProps.multiSelect);
        expect(!!element).toBeTruthy();
        expect(allListElements[index] === element).toBeTruthy();
      });
    });
  });
  describe('getElementUsingActiveDescendant()', () => {
    it('Returns the input element if it should exist. Returns null if menu is closed', async () => {
      const { getInputElement, getHook, openList } = initHookTest({ ...defaultProps, open: false });
      expect(getHook().getElementUsingActiveDescendant()).toBeNull();
      expect(getInputElement()).not.toBeNull();
      await openList();
      expect(getHook().getElementUsingActiveDescendant() === getInputElement()).toBeTruthy();
    });
    it('Returns the button element if input does not exist. Menu state does not matter', async () => {
      const { getButtonElement, getHook, openList } = initHookTest({ ...defaultProps, open: false, input: undefined });
      expect(getHook().getElementUsingActiveDescendant() === getButtonElement()).toBeTruthy();
      await openList();
      expect(getHook().getElementUsingActiveDescendant() === getButtonElement()).toBeTruthy();
    });
  });
});
/**
 * isInSelectedOptionsType +++

 */
