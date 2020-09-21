/**
 * Sets the given custom theme for the component
 * @param selector
 * @param theme
 */
export default <T>(selector: string, theme: T): void => {
  const styleSheets = document?.styleSheets;
  // the index of the rule within the stylesheet that contains the custom theme styles
  let customRuleIndex = 0;
  // the index of the style sheet that should be updated
  const index = [...styleSheets].findIndex((styleSheet) => {
    customRuleIndex = [...styleSheet.cssRules].findIndex(
      (rule) => rule.cssText.includes(selector) && rule.cssText.includes('custom'),
    );
    return customRuleIndex >= 0;
  });
  // the rule that should be updated
  const rule = styleSheets[index]?.cssRules.item(customRuleIndex) as CSSStyleRule;

  try {
    // set the theme
    Object.entries(theme).forEach(([property, value]) => rule.style.setProperty(property, value));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(`Could not find stylesheet to update with the "${selector}" selector!`);
  }
};
