import { RefObject, MouseEvent, KeyboardEvent, FocusEvent, BaseSyntheticEvent } from 'react';
import { isElement } from 'lodash';

import { KnownElementType } from '../types';
import { useSelectDataHandlers } from './useSelectDataHandlers';
import { isSingleSelectElement, isMultiSelectElement } from '../components/list/common';

type UIEvent = MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement> | FocusEvent<HTMLElement>;
type HTMLElementSource = HTMLElement | HTMLElement | UIEvent;

export function useElementDetection() {
  const { getMetaData } = useSelectDataHandlers();
  const { refs, elementIds } = getMetaData();

  const elementIdEntries = Object.entries(elementIds) as [KnownElementType, string][];
  const getElementId = (element: HTMLElement): string | null => {
    return element.getAttribute('id');
  };

  const getKnownElementId = (element: HTMLElement): KnownElementType | null => {
    const id = getElementId(element);

    if (!id) {
      return null;
    }
    const index = elementIdEntries.findIndex(([, v]) => {
      return v === id;
    });
    return index > -1 ? elementIdEntries[index][0] : null;
  };

  const isDescendantOf = (parent: HTMLElement, assumendChild?: HTMLElement) => {
    if (!parent || !assumendChild) {
      return false;
    }

    return parent.contains(assumendChild);
  };

  const isDirectChildOf = (child?: HTMLElement, assumedParent?: HTMLElement) => {
    if (!assumedParent || !child) {
      return false;
    }

    return child.parentElement === assumedParent;
  };
  /*
  const isRefHitOrParentOf = (target?: RefObject<HTMLElement>, eventTarget?: HTMLElement) => {
    if (!target || !target.current || !eventTarget) {
      return false;
    }

    return target.current === eventTarget || isChildOf(target.current, eventTarget);
  }; 
  
  const isRefParentOf = (target?: RefObject<HTMLElement>, eventTarget?: HTMLElement) => {
    if (!target || !target.current || !eventTarget) {
      return false;
    }

    return eventTarget.parentElement === target.current;
  };
  */

  const isRefAncestorOf = (target?: RefObject<HTMLElement>, eventTarget?: HTMLElement) => {
    if (!target || !target.current || !eventTarget) {
      return false;
    }

    return isDescendantOf(target.current, eventTarget);
  };

  const isChildOfList = (element: HTMLElement) => {
    return isRefAncestorOf(refs.list, element);
  };

  const isListItemElement = (element: HTMLElement) => {
    return isSingleSelectElement(element) || isMultiSelectElement(element);
  };

  const isTagOrChild = (element: HTMLElement) => {
    return isRefAncestorOf(refs.tagList, element);
  };

  const traverseToTag = (element: HTMLElement) => {
    const tagList = refs.tagList.current as HTMLElement;
    if (isDirectChildOf(tagList, element)) {
      return element;
    }
    return (
      ([...tagList.children].find((e) => {
        return e === element || isDescendantOf(e as HTMLElement, element);
      }) as HTMLElement) || null
    );
  };

  const isListGroupLabel = (element: HTMLElement) => {
    return element.nodeName === 'LI' && isChildOfList(element);
  };

  const getElementSiblings = <T = HTMLElement>(
    parent: HTMLElement,
    target?: T,
    loop = true,
    allowSameElement = false,
  ) => {
    const childElements = parent.children ? ([...parent.children] as unknown as T[]) : [];
    const index = target ? childElements.indexOf(target) : -1;
    const getNewIndex = (dir: -1 | 1) => {
      const newIndex = index + dir;
      if (newIndex < 0) {
        return loop ? childElements.length - 1 : 0;
      }
      if (newIndex >= childElements.length) {
        return loop ? 0 : childElements.length - 1;
      }
      return newIndex;
    };
    const prevIndex = getNewIndex(-1);
    const nextIndex = getNewIndex(1);
    return {
      prev: allowSameElement || prevIndex !== index ? childElements[prevIndex] : null,
      next: allowSameElement || nextIndex !== index ? childElements[nextIndex] : null,
    };
  };
  const getListItemSiblings = (listItem?: HTMLLIElement, loop = true) => {
    const list = refs.list.current as HTMLElement;
    return getElementSiblings<HTMLLIElement>(list, listItem, loop);
  };

  const getTagSiblings = (tag: HTMLElement, loop = true) => {
    const list = refs.tagList.current as HTMLElement;
    return getElementSiblings(list, tag, loop);
  };

  const cacheForLastElement: { element: HTMLElement | null; id: KnownElementType | null } = {
    element: null,
    id: null,
  };

  const narrowDownKnownElement = (element: HTMLElement, type: KnownElementType | null): KnownElementType | null => {
    if (type === 'list' && isListItemElement(element)) {
      return 'listItem';
    }
    if (type === 'list' && isListGroupLabel(element)) {
      return 'listGroupLabel';
    }
    if (type === 'tagList' && isTagOrChild(element)) {
      return 'tag';
    }
    return type;
  };

  const isUIEvent = (e: HTMLElementSource) => {
    return (e as BaseSyntheticEvent).nativeEvent instanceof Event;
  };

  const pickElement = (elementOrEvent: HTMLElementSource) => {
    if (isElement(elementOrEvent)) {
      return elementOrEvent as HTMLElement;
    }
    if (isUIEvent(elementOrEvent)) {
      return (elementOrEvent as UIEvent).target as HTMLElement;
    }
    return null;
  };

  const getClosestKnownElementById = (element: HTMLElement): KnownElementType | null => {
    let currentElement: HTMLElement | null = element;
    while (currentElement) {
      const knownId = getKnownElementId(currentElement);
      if (knownId) {
        currentElement = null;
        return knownId;
      }
      currentElement = currentElement.parentElement;
    }
    return null;
  };

  const getElementType = (element: HTMLElement): KnownElementType | null => {
    if (cacheForLastElement.element === element) {
      return cacheForLastElement.id;
    }
    const knownElementById = narrowDownKnownElement(element, getClosestKnownElementById(element));
    if (knownElementById) {
      cacheForLastElement.element = element;
      cacheForLastElement.id = knownElementById;
      return knownElementById;
    }
    cacheForLastElement.element = null;
    cacheForLastElement.id = null;
    return null;
  };

  const getEventElementType = (event: UIEvent): { type: KnownElementType | null; element: HTMLElement | null } => {
    const element = pickElement(event);
    const type = element ? getElementType(element) : null;

    return {
      element: element && type === 'tag' ? traverseToTag(element) : element,
      type,
    };
  };

  return {
    getEventElementType,
    getElementType,
    getListItemSiblings,
    getTagSiblings,
  };
}

export const isSelectedOptionsButtonType = (id: KnownElementType) => {
  return id === 'button';
};

export const isClearButtonType = (id: KnownElementType) => {
  return id === 'clearButton';
};

export const isArrowButtonType = (id: KnownElementType) => {
  return id === 'arrowButton';
};

export const isInSelectedOptionsType = (id: KnownElementType) => {
  return isSelectedOptionsButtonType(id) || isClearButtonType(id) || isArrowButtonType(id);
};

export const isSearchOrFilterInputType = (id: KnownElementType) => {
  return id === 'searchOrFilterInput';
};

export const isListItemType = (id: KnownElementType) => {
  return id === 'listItem';
};

export const isListType = (id: KnownElementType) => {
  return id === 'list';
};

export const isListGroupLabelType = (id: KnownElementType) => {
  return id === 'listGroupLabel';
};

export const isAnyListChildType = (id: KnownElementType) => {
  return isListItemType(id) || isListGroupLabelType(id);
};

export const isTagListType = (id: KnownElementType) => {
  return id === 'tagList';
};

export const isTagType = (id: KnownElementType) => {
  return id === 'tag';
};

export const isShowAllButtonType = (id: KnownElementType) => {
  return id === 'showAllButton';
};

export const isClearAllButtonType = (id: KnownElementType) => {
  return id === 'clearAllButton';
};

export const isContainerType = (id: KnownElementType) => {
  return id === 'container';
};
