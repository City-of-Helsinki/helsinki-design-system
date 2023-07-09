import { createElementMapper } from './createElementMapper';
import { createFocusTracker } from './createFocusTracker';
import {
  FocusableElement,
  EventType,
  NodeOrElement,
  ElementData,
  ElementMapper,
  ElementPath,
  NodeSelector,
  Selector,
  Selectors,
  KeyboardTrackerOptions,
  KeyboardTrackerProps,
  KeyboardTracker,
  getArrayItemAtIndex,
} from '.';

const defaults: KeyboardTrackerOptions = {
  keys: {
    next: ['ArrowDown', 'ArrowRight'],
    previous: ['ArrowUp', 'ArrowLeft'],
    levelDown: [''],
    levelUp: ['Escape'],
  },
  loop: true,
  autoFocusAfterUpdate: true,
  selectors: {
    focusableElements: (root: HTMLElement) => {
      return Array.from(root.querySelectorAll('a'));
    },
  },
};

const untrackedElementData: ElementData = {
  type: 'untracked',
  index: -1,
  element: undefined,
};

function convertPropToSelectorFunction(prop: NodeSelector | string): Selector {
  return typeof prop === 'string'
    ? (target) => {
        return Array.from(target.querySelectorAll(prop as string)) as HTMLElement[];
      }
    : (target, path) => {
        return Array.from((prop as NodeSelector)(target, path)) as HTMLElement[];
      };
}

function createSelectorsFromDefaultsAndProps(
  defaultOptions: KeyboardTrackerOptions,
  props: KeyboardTrackerProps,
): Selectors {
  const { selectors: defaultSelectors } = defaultOptions;
  const { focusableSelector, containerSelector } = props;
  const selectors: Selectors = { ...defaultSelectors };
  if (focusableSelector) {
    selectors.focusableElements = convertPropToSelectorFunction(focusableSelector);
  }
  if (containerSelector) {
    selectors.containerElements = convertPropToSelectorFunction(containerSelector);
  }
  return selectors;
}

function createOptions(props: KeyboardTrackerProps): KeyboardTrackerOptions {
  const { keys: defaultkeys, ...restDefaults } = defaults;
  const selectors = createSelectorsFromDefaultsAndProps(defaults, props);
  // destructuring also unused vars to keep them from restProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { keys, focusableSelector, containerSelector, ...restProps } = props;
  return {
    ...restDefaults,
    ...restProps,
    keys: {
      ...defaultkeys,
      ...keys,
    },
    selectors,
  };
}

function isChild(parent: HTMLElement, assumedChildren: Array<NodeOrElement | null | undefined>) {
  return assumedChildren.some((child) => {
    return child && parent.contains(child as Node);
  });
}

function bindEvents({
  target,
  keyListener,
  focusInListener,
  focusOutListener,
}: {
  target: HTMLElement;
  keyListener: (event: KeyboardEvent) => void;
  focusInListener: (event: FocusEvent) => void;
  focusOutListener: (event: FocusEvent) => void;
}) {
  const addListeners = () => {
    target.addEventListener('focusin', focusInListener);
    target.addEventListener('focusout', focusOutListener);
    target.addEventListener('keyup', keyListener);
  };
  const removeListeners = () => {
    target.removeEventListener('focusin', focusInListener);
    target.removeEventListener('focusout', focusOutListener);
    target.removeEventListener('keyup', keyListener);
  };
  addListeners();
  return () => removeListeners();
}

function resolveKeyboardCommand(event: KeyboardEvent, keyMap: KeyboardTrackerOptions['keys']): EventType | null {
  const { key } = event;
  return (
    (Object.keys(keyMap).find((objectKey: string) => {
      const keyArray = keyMap[objectKey] as string[];
      return keyArray && keyArray.length && keyArray.includes(key);
    }) as EventType) || null
  );
}

export function createKeyboardTracker(target: HTMLElement, props: KeyboardTrackerProps) {
  const options = createOptions(props);
  const { loop, onChange, selectors, autoFocusAfterUpdate, navigator } = options;
  const elementMapper = createElementMapper(target, selectors);
  const focusTracker = createFocusTracker(elementMapper, loop, navigator);
  let isFocused = false;

  const triggerOnChange = (type: EventType, path?: ElementPath | null) => {
    if (!onChange) {
      return;
    }
    onChange(
      type,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      tracker,
      path,
    );
  };

  const updateElementData = (focusActiveElement: boolean) => {
    const currentPath = focusTracker.getPathToCurrentFocusedElement();
    elementMapper.refresh();
    focusTracker.reset();
    if (focusActiveElement && currentPath && document.activeElement && isChild(target, [document.activeElement])) {
      focusTracker.setFocusToElement(document.activeElement as HTMLElement);
    }
    triggerOnChange('dataUpdated', focusTracker.getPathToCurrentFocusedElement());
  };

  const disposeElementData = () => {
    elementMapper.dispose();
    focusTracker.storeFocusedElement(null);
    triggerOnChange('dataUpdated');
  };

  const keyListener = (keyboardEvent: KeyboardEvent) => {
    const command = resolveKeyboardCommand(keyboardEvent, options.keys);
    if (command && typeof focusTracker[command] === 'function') {
      focusTracker[command]();
    }
  };

  const focusInListener = (focusEvent: FocusEvent) => {
    // focusEvent.currentTarget is the element with listeners - the root element
    // focusEvent.relatedTarget is the previous element with the focus
    const relevantElement = focusEvent.target;
    if (isFocused) {
      if (!elementMapper.isTrackedElement(relevantElement)) {
        triggerOnChange('focusChange');
      } else {
        const focusWasChanged = focusTracker.storeFocusedElement(relevantElement as HTMLElement);
        if (focusWasChanged) {
          triggerOnChange('focusChange', focusTracker.getPathToCurrentFocusedElement());
        }
      }
      return;
    }
    isFocused = true;
    updateElementData(false);
    focusTracker.storeValidPathToFocusedElement(elementMapper.getPath(relevantElement as HTMLElement));
    triggerOnChange(
      'focusIn',
      focusTracker.getPathToCurrentFocusedElement() || [
        { ...untrackedElementData, element: relevantElement as FocusableElement },
      ],
    );
  };

  const focusOutListener = (focusEvent: FocusEvent) => {
    // focusEvent.currentTarget is the element with listeners, aka. container
    // focusEvent.target is the element that got the focus
    const relevantElement = focusEvent.relatedTarget;
    // check also document.activeElement, because focusout is triggered when
    // browser window loses focus
    if (isChild(target, [relevantElement, document.activeElement])) {
      // do nothing yet
    } else {
      const isTrackedElement = elementMapper.isTrackedElement(relevantElement);
      const current = focusTracker.getPathToCurrentFocusedElement();
      disposeElementData();
      isFocused = false;

      triggerOnChange(
        'focusOut',
        isTrackedElement
          ? current || null
          : [{ ...untrackedElementData, element: relevantElement as FocusableElement }],
      );
    }
  };

  const eventDisposer = bindEvents({
    target,
    keyListener,
    focusInListener,
    focusOutListener,
  });

  const moveFocusToRootIfNotFocused = () => {
    if (!isFocused) {
      focusInListener(({ target } as unknown) as FocusEvent);
    }
  };

  const tracker: KeyboardTracker = {
    dispose: () => {
      eventDisposer();
      focusTracker.reset();
      elementMapper.dispose();
    },
    setFocusedElementByIndex: (index: number | number[]) => {
      moveFocusToRootIfNotFocused();
      if (!Array.isArray(index)) {
        const rootElement = elementMapper.getRootData();
        const focusables = rootElement ? elementMapper.getRelatedFocusableElements(rootElement) : null;
        return focusables ? focusTracker.setFocusToElement(getArrayItemAtIndex(focusables, index)) : false;
      }
      return focusTracker.setFocusByIndexes(index);
    },
    setFocusToElement: (element?: FocusableElement | null) => {
      moveFocusToRootIfNotFocused();
      return focusTracker.setFocusToElement(element);
    },
    setFocusToElementDataOrPath: (dataOrPath?: Partial<ElementData> | ElementPath | null) => {
      moveFocusToRootIfNotFocused();
      return focusTracker.setFocusToElementDataOrPath(dataOrPath);
    },
    refresh: () => {
      updateElementData(autoFocusAfterUpdate);
    },
    getNavigationOptions: (): ReturnType<ElementMapper['getNavigationOptions']> => {
      const current = focusTracker.getCurrentFocusedElementData();
      return current && current.element ? elementMapper.getNavigationOptions(current.element, loop) : {};
    },
    getFocusedElement: () => {
      const current = focusTracker.getCurrentFocusedElementData();
      return (current && current.element) || document.activeElement;
    },
    getFocusedElementPath: () => {
      return focusTracker.getPathToCurrentFocusedElement();
    },
    setKeys: (newKeys: Partial<KeyboardTrackerOptions['keys']>) => {
      options.keys = {
        ...options.keys,
        ...newKeys,
      };
      return options.keys;
    },
  };
  return tracker;
}
