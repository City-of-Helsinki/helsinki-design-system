import React from 'react';

import { MenuButton } from './MenuButton';

export default {
  component: MenuButton,
  title: 'Components/MenuButton',
};

export const Example = () => (
  <div style={{ display: 'flex', gap: 25 }}>
    <MenuButton>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        W3C Home Page
      </a>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        W3C Web Accessibility Initiative
      </a>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        Accessible Rich Internet Application Specification
      </a>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        WAI-ARIA Authoring Practices
      </a>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        WAI-ARIA Implementation Guide
      </a>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        Accessible Name and Description
      </a>
    </MenuButton>
    <MenuButton>
      <a href="https://google.com">Item 1</a>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        Item 2
      </a>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        Item 3
      </a>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        Item 4
      </a>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        Item 5
      </a>
    </MenuButton>
    <MenuButton>
      <a href="https://google.com">Item 1</a>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        Item 2
      </a>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        Item 3
      </a>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        Item 4
      </a>
      <a href="https://google.com" onClick={(e) => e.preventDefault()}>
        Item 5
      </a>
    </MenuButton>
  </div>
);
