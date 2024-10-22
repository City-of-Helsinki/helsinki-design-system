import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import { useTheme } from '../useTheme';

const baseSelector = 'baseClass';
const themeProperty = '--accent-line-color';
const themeValue = 'red';
const targetTestId = 'target-element';

const ThemeElement = (props: { extraSelector?: string } = {}) => {
  const customThemeClass = useTheme(
    baseSelector,
    {
      [themeProperty]: themeValue,
    },
    props.extraSelector,
  );
  return (
    <div>
      <div data-testid={targetTestId} className={customThemeClass} />
      TEST ELEMENT
    </div>
  );
};

const renderElement = (extraSelector?: string) => render(<ThemeElement extraSelector={extraSelector} />);

describe('useTheme', () => {
  beforeEach(cleanup);
  const getLastCssRule = () => {
    const { cssRules } = document.styleSheets[0];
    return cssRules[cssRules.length - 1] as CSSStyleRule;
  };
  const getClassNames = () => {
    const targetElement = screen.queryByTestId(targetTestId) as HTMLElement;
    return targetElement.getAttribute('class') as string;
  };
  it('appends a new style to the document.styleSheets. Added className matches the returned class and style has given content', () => {
    renderElement();
    const classNames = getClassNames();
    const appendedStyleRule = getLastCssRule();
    const appendedThemeValue = appendedStyleRule.style[themeProperty];
    expect(classNames?.length).toBeGreaterThan(0);
    expect(appendedStyleRule.selectorText.includes(baseSelector)).toBeTruthy();
    expect(appendedStyleRule.selectorText.includes(classNames)).toBeTruthy();
    expect(appendedThemeValue).toBe(themeValue);
  });
  it('extraSelector adds className after custom class', () => {
    const extraSelector = ' .extra div span';
    renderElement(extraSelector);
    const classNames = getClassNames();
    const appendedStyleRule = getLastCssRule();
    expect(classNames?.length).toBeGreaterThan(0);
    expect(appendedStyleRule.selectorText.includes(baseSelector)).toBeTruthy();
    expect(appendedStyleRule.selectorText.includes(extraSelector)).toBeTruthy();
    expect(appendedStyleRule.selectorText.includes(classNames)).toBeTruthy();
  });
});
