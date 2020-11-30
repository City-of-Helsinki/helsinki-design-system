import { useEffect, useRef } from 'react';
import uniqueId from 'lodash.uniqueid';

/**
 * Sets the given custom theme for the component
 * @param selector    The class selector for the component. Used to find the correct style sheet to apply the custom styles to
 * @param theme       The custom theme overrides
 * @param customClass The class where the custom theme styles will be applied
 * @return The custom class name that should be applied to the component
 */
const setComponentTheme = <T,>(selector: string, theme: T, customClass: string): void => {
  if (typeof window === 'undefined') return;

  // checks if the given css rule contains the custom class selector
  const hasCustomRule = (rule: CSSStyleRule): boolean => rule.selectorText?.includes(`${selector}.${customClass}`);

  try {
    // the index of the parent stylesheet
    let parentIndex = [...document.styleSheets].findIndex((styleSheet) => {
      // Accessing external stylesheet's cssRules might throw an error
      try {
        return [...styleSheet.cssRules].findIndex((rule: CSSStyleRule) => rule.selectorText?.includes(selector)) >= 0;
      } catch (e) {
        return false;
      }
    });
    // If parent stylesheet was not found, create a new one. This can happen with server-side-rendering
    // when styles are bundled into an external file, which we cant access.
    if (parentIndex === -1) {
      const stylesheetElement = document.createElement('style');
      document.head.appendChild(stylesheetElement);
      parentIndex = document.styleSheets.length - 1;
    }
    // style sheet containing the css rules for the selector
    const parentStyleSheet = document.styleSheets[parentIndex];
    // parent css rules
    const parentCssRules = parentStyleSheet.cssRules;
    // the index of the rule within the stylesheet where the custom theme styles will be set
    let customRuleIndex = [...parentCssRules].findIndex(hasCustomRule);
    // insert a rule with the component and custom selector into the stylesheet if the rule doesn't already exist
    if (customRuleIndex === -1) {
      parentStyleSheet.insertRule(`.${selector}.${customClass} { content: '' }`, parentCssRules.length);
      customRuleIndex = [...parentCssRules].findIndex(hasCustomRule);
    }
    // the rule that should be updated
    const rule = parentCssRules.item(customRuleIndex) as CSSStyleRule;
    // set the theme
    Object.entries(theme).forEach(([property, value]) => rule.style.setProperty(property, value));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(`Could not find the stylesheet to update with the "${selector}" selector!`);
  }
};

/**
 * Hook for applying custom themes
 * @param `selector`  The class selector for the component. Used to find the correct style sheet to apply the custom styles to.
 * @param `theme`     The custom theme overrides.
 * @return {string}   The custom class name that should be applied to the component.
 */
export const useTheme = <T,>(selector: string, theme: T): string => {
  const useCustomTheme = theme && typeof theme !== 'string';
  // create a unique selector for the custom theme
  const customClass = useRef<string>(useCustomTheme ? uniqueId('custom-theme-') : '').current;

  useEffect(() => {
    if (useCustomTheme) setComponentTheme<T>(selector, theme, customClass);
  }, [selector, theme, customClass, useCustomTheme]);

  return customClass;
};
