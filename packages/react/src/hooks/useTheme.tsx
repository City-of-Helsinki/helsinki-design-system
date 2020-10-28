import { useEffect, useRef } from 'react';
import uniqueId from 'lodash.uniqueid';

/**
 * Sets the given custom theme for the component
 * @param selector  The class selector for the component. Used to find the correct style sheet to apply the custom styles to
 * @param theme     The custom theme overrides
 * @return {string} The custom class name that should be applied to the component
 */
const setComponentTheme = <T,>(selector: string, theme: T): string => {
  if (typeof window === 'undefined') return '';

  try {
    // create a unique selector for the custom theme
    const customClass: string = uniqueId('custom-theme-');
    const { styleSheets } = document;
    // the index of the parent stylesheet
    const parentIndex = [...styleSheets].findIndex(
      (styleSheet) => [...styleSheet.cssRules].findIndex((rule) => rule.cssText.includes(selector)) >= 0,
    );
    // style sheet containing the css rules for the selector
    const parentStyleSheet = styleSheets[parentIndex];
    // parent css rules
    const parentCssRules = parentStyleSheet.cssRules;
    // insert a rule with the component and custom selector into the stylesheet
    parentStyleSheet.insertRule(`.${selector}.${customClass} { content: '' }`, parentCssRules.length);
    // the index of the rule within the stylesheet where the custom theme styles will be set
    const customRuleIndex = [...parentCssRules].findIndex((rule) =>
      rule.cssText.includes(`${selector}.${customClass}`),
    );
    // the rule that should be updated
    const rule = parentCssRules.item(customRuleIndex) as CSSStyleRule;

    // set the theme
    Object.entries(theme).forEach(([property, value]) => rule.style.setProperty(property, value));

    return customClass;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(`Could not find the stylesheet to update with the "${selector}" selector!`);
    return '';
  }
};

/**
 * Hook for applying custom themes
 * @param `selector`  The class selector for the component. Used to find the correct style sheet to apply the custom styles to.
 * @param `theme`     The custom theme overrides.
 * @return {string}   The custom class name that should be applied to the component.
 */
export const useTheme = <T,>(selector: string, theme: T): string => {
  const customClass = useRef<string>('');

  useEffect(() => {
    if (theme && typeof theme !== 'string') {
      customClass.current = setComponentTheme<T>(selector, theme);
    }
  }, [selector, theme]);

  return customClass.current;
};
