import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import { useTheme } from '../useTheme';

const baseSelector = 'baseClass';
const themeProperty = '--accent-line-color';
const themeValue = 'red';
const targetTestId = 'target-element';

const ThemeElement = () => {
  const customThemeClass = useTheme(baseSelector, {
    [themeProperty]: themeValue,
  });
  return (
    <div>
      <div data-testid={targetTestId} className={customThemeClass} />
      TEST ELEMENT
    </div>
  );
};

const renderElement = () => render(<ThemeElement />);

describe('useTheme', () => {
  beforeEach(cleanup);
  it('appends a new style to the document.styleSheets. Added className matches the returned class and style has given content', () => {
    renderElement();
    const targetElement = screen.queryByTestId(targetTestId) as HTMLElement;
    const classNames = targetElement.getAttribute('class') as string;
    const appendedStyleRule = document.styleSheets[0].cssRules[0] as CSSStyleRule;
    const appendedThemeValue = appendedStyleRule.style[themeProperty];
    expect(classNames?.length).toBeGreaterThan(0);
    expect(appendedStyleRule.selectorText.includes(baseSelector)).toBeTruthy();
    expect(appendedStyleRule.selectorText.includes(classNames)).toBeTruthy();
    expect(appendedThemeValue).toBe(themeValue);
  });
});
