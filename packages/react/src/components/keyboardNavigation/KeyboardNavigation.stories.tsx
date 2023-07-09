import React, { useCallback, useEffect, useRef, useState } from 'react';

import { KeyboardNavigation, useKeyboardNavigation, useFocusTrapper, KeyboardTrackerProps } from './index';
import { Button } from '../button/Button';
import { NumberInput } from '../numberInput/NumberInput';

export default {
  component: KeyboardNavigation,
  title: 'Components/KeyboardNavigation',
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

const StoryStyles = () => {
  return (
    <style>
      {`
      .nav {
        list-style: none;
        display:flex;
        border: 1px solid var(--color-black);
        padding: var(--spacing-2-xs) 0;
        position: relative;
      }
      .nav li {
        padding: var(--spacing-xs);
      }
      .nav li a {
        padding: var(--spacing-xs);
        border: 1px solid var(--color-white);
      }
      a:focus, a:focus-visible {
        border: 1px solid var(--color-bus);
      }
      .buttons{
        display:flex;
        margin: var(--spacing-xs) 0;
      }
      .buttons > * {
        margin-right: var(--spacing-xs);
      }
      .visibleFocusWithIn li:focus-within{
        background: var(--color-black-10);
      }
      .visibleFocusWithIn li:focus-within > a{
        border-color: var(--color-black-10);
      }
      .subNav{
        flex-direction:row;
        position: absolute;
        top: 80px;
        left:0;
        background: var(--color-white);
      }
    `}
    </style>
  );
};

const onLinkClick = (e: React.MouseEvent) => {
  e.preventDefault();
};

export const Example = (args: KeyboardTrackerProps) => {
  return (
    <div>
      <StoryStyles />
      <KeyboardNavigation {...args}>
        <ul className="nav">
          <li>
            <a href="/" onClick={onLinkClick} tabIndex={0}>
              Item 1
            </a>
          </li>
          <li>
            <a href="/" onClick={onLinkClick} tabIndex={0}>
              Item 2
            </a>
          </li>
          <li>
            <a href="/" onClick={onLinkClick} tabIndex={0}>
              Item 3
            </a>
          </li>
          <li>
            <a href="/" onClick={onLinkClick} tabIndex={0}>
              Item 4
            </a>
          </li>
        </ul>
        <p>Once focused, you can navigate with arrow and tab keys.</p>
      </KeyboardNavigation>
    </div>
  );
};

export const KeepAndResetFocusWithHook = () => {
  const selectedElementIndexPathRef = useRef<number[]>([]);
  const [show, setShow] = useState(true);
  const [key, setKey] = useState(Math.random());

  const { ref, getTracker } = useKeyboardNavigation({
    onChange: (type, tracker, path) => {
      if (type === 'focusChange') {
        // store selected item, so it can be focused after re-render
        selectedElementIndexPathRef.current = path ? path.map((data) => data.index) : [];
      }
    },
  });
  useEffect(() => {
    if (show && selectedElementIndexPathRef.current.length) {
      const tracker = getTracker();
      if (tracker) {
        tracker.setFocusedElementByIndex(selectedElementIndexPathRef.current);
      }
    }
  });

  return (
    <div>
      <StoryStyles />
      {show && (
        <div ref={ref} key={key}>
          <ul className="nav">
            <li>
              <a href="/" onClick={onLinkClick} tabIndex={0}>
                Item 1
              </a>
            </li>
            <li>
              <a href="/" onClick={onLinkClick} tabIndex={0}>
                Item 2
              </a>
            </li>
            <li>
              <a href="/" onClick={onLinkClick} tabIndex={0}>
                Item 3
              </a>
            </li>
            <li>
              <a href="/" onClick={onLinkClick} tabIndex={0}>
                Item 4
              </a>
            </li>
          </ul>
        </div>
      )}
      <div className="buttons">
        <Button type="button" onClick={() => setShow(!show)}>
          {show ? 'Remove menu' : 'Show menu'}
        </Button>
        {show && (
          <Button type="button" onClick={() => setKey(Math.random())}>
            Re-render menu
          </Button>
        )}
      </div>
      <p>Once focused, you can navigate with arrow and tab keys.</p>
      <p>Focus is restored, when component re-renders.</p>
    </div>
  );
};

export const DynamicElementsWithHook = () => {
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
  const [insertionIndex, setInsertionIndex] = useState<number>(-1);
  const lastFocusedIndexRef = useRef<number[]>([]);
  const resetFocusProps = useRef<{ removeIndex: number; addIndex: number } | undefined>(undefined);
  const { ref, refresh, getTracker } = useKeyboardNavigation({
    onChange: (type, tracker, path) => {
      const item = path ? path[path.length - 1] : undefined;
      if (type === 'focusChange' && item && item.index > -1) {
        lastFocusedIndexRef.current.unshift(item.index);
      }
    },
  });
  const setFocusedElementByIndex = (index: number[] | number) => {
    const tracker = getTracker();
    if (tracker) {
      tracker.setFocusedElementByIndex(index);
    }
  };
  const resetFocus = ({ removeIndex, addIndex }: { removeIndex: number; addIndex: number }) => {
    const previouslyFocusedElement =
      removeIndex > -1
        ? lastFocusedIndexRef.current.find((index) => removeIndex !== index)
        : lastFocusedIndexRef.current[0];
    refresh();

    if (previouslyFocusedElement === undefined) {
      return;
    }
    if (removeIndex > -1) {
      lastFocusedIndexRef.current = lastFocusedIndexRef.current.filter((i) => i !== removeIndex);
      setFocusedElementByIndex(
        previouslyFocusedElement > removeIndex ? previouslyFocusedElement - 1 : previouslyFocusedElement,
      );
    }
    if (addIndex > -1) {
      setFocusedElementByIndex(
        addIndex >= previouslyFocusedElement ? previouslyFocusedElement : previouslyFocusedElement + 1,
      );
    }
  };
  const removeItem = (e: React.MouseEvent, removeIndex: number) => {
    setItems((currentItems) => {
      const clone = [...currentItems];
      clone.splice(removeIndex, 1);
      return clone;
    });
    e.preventDefault();
    resetFocusProps.current = { removeIndex, addIndex: -1 };
  };
  const addItem = () => {
    setItems((currentItems) => {
      const clone = [...currentItems];
      const addIndex = !Number.isNaN(insertionIndex) && insertionIndex >= 0 ? insertionIndex : currentItems.length;
      clone.splice(addIndex, 0, `New ${addIndex + 1}/${clone.length + 1}`);
      resetFocusProps.current = { removeIndex: -1, addIndex };
      return clone;
    });
  };
  useEffect(() => {
    if (resetFocusProps.current) {
      resetFocus(resetFocusProps.current);
    }
  }, [items.length]);
  return (
    <div>
      <div ref={ref}>
        <StoryStyles />
        <ul className="nav">
          {items.map((data, index) => {
            return (
              <li key={`${data}_${Math.random()}`}>
                <a
                  tabIndex={0}
                  href="#remove"
                  onClick={(e) => {
                    removeItem(e, index);
                  }}
                >
                  {data}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p>Click an item to remove it.</p>
        <p>
          Add a new item. &quot;-1&quot; adds to the end. &quot;0&quot; to the beginning. Other values can be used too.
        </p>
        <NumberInput
          id="insertionIndex"
          style={{ width: '200px' }}
          label="Insertion position"
          value={insertionIndex}
          onInput={(e) => {
            setInsertionIndex(parseInt(e.currentTarget.value, 10));
          }}
        />
        <div className="buttons">
          <Button onClick={() => addItem()}>Add item</Button>
        </div>
        <p>Once focused, you can navigate with arrow and tab keys.</p>
        <p>Focus is restored, when component updates.</p>
      </div>
    </div>
  );
};

export const MultiLevelExampleWithHook = () => {
  const [focusedIndex, setFocusedIndex] = useState([-1, -1]);
  const items = [0, 1, 2, 3, 4, 5];
  const { ref, refresh } = useKeyboardNavigation({
    containerSelector: ':scope > ul > li',
    focusableSelector: ':scope > a, :scope > button',
    keys: {
      next: ['ArrowRight'],
      previous: ['ArrowLeft'],
      levelDown: ['PageDown', 'ArrowDown'],
      levelUp: ['PageUp', 'Escape', 'ArrowUp'],
    },
    autoFocusAfterUpdate: true,
  });
  const setFocusLevel0 = (index: number) => {
    setFocusedIndex([focusedIndex[0] === index ? -1 : index, -1]);
  };
  const setFocusLevel1 = (level0: number, level1: number) => {
    setFocusedIndex([level0, focusedIndex[1] === level1 ? -1 : level1]);
  };

  useEffect(() => {
    refresh();
  }, [focusedIndex]);

  return (
    <div ref={ref}>
      <StoryStyles />
      <ul className="nav visibleFocusWithIn">
        {items.map((data, index) => {
          return (
            <li key={data}>
              <a
                tabIndex={0}
                href="#nothing"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Item {data}
              </a>
              <button type="button" onClick={() => setFocusLevel0(index)}>
                {'\u203a'}
              </button>
              {focusedIndex[0] === index && (
                <ul className="nav subNav">
                  {[0, 1, 2].map((childData, subIndex) => {
                    return (
                      <li key={`${data}.${childData}}`}>
                        <a
                          tabIndex={0}
                          href="#nothing"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {`Item ${data}.${childData}`}
                        </a>
                        <button type="button" onClick={() => setFocusLevel1(index, subIndex)}>
                          {'\u203a'}
                          {'\u203a'}
                        </button>
                        {focusedIndex[1] === subIndex && (
                          <ul className="nav subNav">
                            {['a', 'b', 'c'].map((grandChildData) => {
                              return (
                                <li key={`${data}.${childData}.${grandChildData}}`}>
                                  <a
                                    tabIndex={0}
                                    href="#nothing"
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    {`Item  ${data}.${childData}.${grandChildData}`}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <p>Once focused, you can navigate horizontally with arrow left, arrow right and tab keys.</p>
      <p>
        Buttons open new menus. You can navigate vertically with arrow up, arrow down, page down, page up, tab and esc.
      </p>
    </div>
  );
};

export const CustomNavigatorWithHook = () => {
  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const getId = (index: number, childIndex: number) => {
    return `pos_${index}_${childIndex}`;
  };
  const getElement = (index: number, childIndex: number) => {
    return document.getElementById(getId(index, childIndex)) || undefined;
  };
  const getPos = (element: HTMLElement): number[] => {
    const id = element.getAttribute('id');
    return id
      ? id
          .split('_')
          .map((n) => parseInt(n, 10))
          .slice(-2)
      : [-1, -1];
  };
  const { ref } = useKeyboardNavigation({
    navigator: (elementOrPath) => {
      if (elementOrPath) {
        const path = Array.isArray(elementOrPath) ? elementOrPath : [];
        const data = path[path.length - 1];
        if (data && data.element) {
          const pos = getPos(data.element);
          return {
            next: getElement(pos[0], pos[1] + 1),
            previous: getElement(pos[0], pos[1] - 1),
            levelDown: getElement(pos[0] + 1, pos[1]),
            levelUp: getElement(pos[0] - 1, pos[1]),
          };
        }
      }
      return {
        next: undefined,
        previous: undefined,
        levelUp: undefined,
        levelDown: undefined,
      };
    },
    keys: {
      next: ['ArrowRight'],
      previous: ['ArrowLeft'],
      levelDown: ['ArrowDown'],
      levelUp: ['ArrowUp'],
    },
  });

  const skip = (index: number, childIndex: number) => {
    if (childIndex === 4 && index >= 4) {
      return false;
    }
    if (index === 5) {
      return false;
    }
    if (childIndex !== 2 && childIndex !== 6 && (index === 1 || index === 2)) {
      return true;
    }
    if ((index === 4 || index === 5 || index === 7) && childIndex > 0 && childIndex < 8) {
      return true;
    }
    if ((index === 6 || index === 7) && childIndex > 0 && childIndex < 8) {
      return true;
    }
    if (index === 5 && childIndex > 0 && childIndex < 8) {
      return true;
    }

    return false;
  };

  return (
    <div ref={ref}>
      <style>
        {`
          .nav {
            list-style: none;
            display:flex;
            flex-direction:column;
            position:relative;
          }
          .nav li {
            display:flex;
            position:relative;
          }
          .nav li a{
            position:absolute;
            padding:5px;
            width:25px;
            height:25px;
            display: block;
            border:1px solid var(--color-black);
            color: var(--color-black);
          }
          .nav li a:focus, .nav li a:focus-visible{
            background-color:#000;
            outline:1px solid 000;
            color: var(--color-white);
          }
        `}
      </style>
      <p>You can navigate with arrow keys. Navigation directions are re-calculated on every key press. </p>
      <p>Tab key is not tracked, it changes focus according to browser&apos;s defaults.</p>
      <ul className="nav">
        {items.map((data) => {
          return (
            <li key={data}>
              {items.map((childData) => {
                if (skip(data, childData)) {
                  return null;
                }
                const id = getId(data, childData);
                return (
                  <a
                    key={id}
                    id={id}
                    tabIndex={0}
                    href="#nothing"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className={id}
                    style={{ top: `${data * 42}px`, left: `${childData * 42}px` }}
                  >
                    {`${data}.${childData}`}
                  </a>
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const ChangeKeysWithHook = () => {
  let defaultKeys: KeyboardTrackerProps['keys'];
  const [focusedIndex, setFocusedIndex] = useState([-1]);
  const items = [0, 1, 2, 3];
  const { ref, refresh } = useKeyboardNavigation({
    containerSelector: ':scope > ul > li',
    focusableSelector: ':scope > a, :scope > button',
    onChange: (type, tracker) => {
      if (type === 'dataUpdated' || type === 'focusChange') {
        if (!defaultKeys) {
          defaultKeys = tracker.setKeys({});
        }
        const newKeys: Partial<KeyboardTrackerProps['keys']> = {};
        const navOpts = tracker.getNavigationOptions();
        const currentElement = tracker.getFocusedElement();
        if (!currentElement) {
          return;
        }
        newKeys.next = navOpts.levelDown ? ['ArrowDown'] : ['ArrowRight', 'ArrowDown'];
        newKeys.levelDown = navOpts.levelDown ? ['ArrowRight'] : undefined;
        newKeys.levelUp = navOpts.levelUp ? ['ArrowLeft', 'Escape'] : undefined;
        newKeys.previous = navOpts.levelUp ? ['ArrowUp'] : ['ArrowLeft', 'ArrowUp'];

        tracker.setKeys({
          ...defaultKeys,
          ...newKeys,
        });
      }
    },
  });
  const setFocusLevel0 = (index: number) => {
    setFocusedIndex([focusedIndex[0] === index ? -1 : index, -1]);
  };

  useEffect(() => {
    refresh();
  }, [focusedIndex]);

  return (
    <div ref={ref}>
      <StoryStyles />
      <style>
        {`
          .verticalNav {
            flex-direction:column;
            border:0;
          }
          .verticalNav .nav {
            border:0;
          }
          .verticalNav li {
            display: flex;
            flex-direction:row;
            align-items: baseline;
            position: relative;
            margin-bottom: var(--spacing-xs);
          }
          .verticalNav .subNav {
            position: relative;
            inset: unset;
            background: transparent;
            padding: 0;
          }
          .verticalNav .subNav li {
            padding: 0 0 0 var(--spacing-xs);
            margin:0;
          }
          .verticalNav > li, .verticalNav .subNav a  {
            border: 1px solid var(--color-black-50);
          }
        `}
      </style>
      <ul className="nav verticalNav visibleFocusWithIn">
        {items.map((data, index) => {
          return (
            <li key={data}>
              <a
                tabIndex={0}
                href="#nothing"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {data}
              </a>
              <button type="button" onClick={() => setFocusLevel0(index)}>
                {'\u203a'}
              </button>
              {focusedIndex[0] === index && (
                <ul className="nav subNav">
                  {[0, 1, 2].map((childData) => {
                    return (
                      <li key={`${data}.${childData}}`}>
                        <a
                          tabIndex={0}
                          href="#nothing"
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {`${data}.${childData}`}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <p>You can navigate with arrow keys. If sub-menu is open, left and right arrow key behaviour changes.</p>
    </div>
  );
};

export const WithFocusTrappingHook = () => {
  const {
    refForFirstTrapper,
    refForLastTrapper,
    disableElements,
    enableElements,
    getElementPosition,
  } = useFocusTrapper({});
  const keyboardTrackerOnChange = useCallback<Required<KeyboardTrackerProps>['onChange']>(
    (type, tracker, path) => {
      const item = path ? path[path.length - 1] : undefined;
      const focusIsNotInTrackedElement = !item || (item && item.index === -1);
      if (type === 'focusIn' && focusIsNotInTrackedElement) {
        const position = item ? getElementPosition(item.element) : undefined;
        tracker.setFocusedElementByIndex(position === 'last' ? -1 : 0);
        // do not disable before setting index or focus is lost when disabled
        // this will result in focusOut event
        disableElements();
      }
      if (type === 'focusOut' && focusIsNotInTrackedElement) {
        enableElements();
      }
    },
    [enableElements, disableElements],
  );
  const { ref } = useKeyboardNavigation({
    focusableSelector: 'li',
    onChange: keyboardTrackerOnChange,
  });

  return (
    <div>
      <button type="button">Focusable button outside</button>
      <div ref={ref}>
        <StoryStyles />
        <style>
          {`
          .hidden{
            height: 0;
             width: 0; 
             overflow:hidden;
            border:0;
            opacity:0;
          }
        `}
        </style>
        <button ref={refForFirstTrapper} type="button" className="hidden">
          First hidden focus trapper
        </button>
        <ul className="nav">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <button ref={refForLastTrapper} type="button" className="hidden">
          Last hidden focus trapper
        </button>
      </div>
      <button type="button">Focusable button outside</button>
      <p>This story demonstrates how to use keyboard navigation with elements which not not receive focus natively.</p>
      <p>
        It uses useFocusTrapper-hook and two invisible focusable elements. Those move focus to the elements that should
        be usable with keyboard.
      </p>
      <p>
        Users do not notice elements are not focusable. Hidden elements are disabled when focus is inside. This keeps
        tab-key presses logical.
      </p>
    </div>
  );
};
