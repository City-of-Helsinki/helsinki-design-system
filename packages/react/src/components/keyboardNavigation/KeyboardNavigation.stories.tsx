import React from 'react';

import { KeyboardNavigation } from './KeyboardNavigation';

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
