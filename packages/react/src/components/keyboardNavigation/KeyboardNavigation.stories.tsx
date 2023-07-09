import React, { useEffect, useRef, useState } from 'react';

import { KeyboardNavigation } from './KeyboardNavigation';
import { Button } from '../button/Button';
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
