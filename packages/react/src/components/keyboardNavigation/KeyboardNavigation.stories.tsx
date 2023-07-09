import React, { useEffect, useRef, useState } from 'react';

import { KeyboardNavigation } from './KeyboardNavigation';
import { Button } from '../button/Button';
import { NumberInput } from '../numberInput/NumberInput';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

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
      }
      .nav li {
        padding: var(--spacing-xs);
      }
      .nav li a {
        padding: var(--spacing-xs);
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
    `}
    </style>
  );
};

const onLinkClick = (e: React.MouseEvent) => {
  e.preventDefault();
};

export const Example = () => {
  return (
    <div>
      <StoryStyles />
      <KeyboardNavigation>
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
