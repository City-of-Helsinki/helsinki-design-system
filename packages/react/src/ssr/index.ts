/**
 * The code here is based on used-styles npm library: https://github.com/theKashey/used-styles
 * Some of the code was leaking to browser causing problems, so we copied the code instead of using the library as is.
 */
import { extractAllUnmatchable } from './used-styles-hds/extractAllUnmatchable';
import { getRawCriticalRules, assertIsReady } from './used-styles-hds/getRawCriticalRules';
import { loadStyleDefinitions, parseProjectStyles } from './used-styles-hds/loadStyleDefinitions';
import { StyleDefinition, StyleSelector, SelectionFilter } from './used-styles-hds/types';

const createUsedFilter = () => {
  const usedSelectors = new Set<string>();

  return (_: never, rule: StyleSelector) => {
    if (usedSelectors.has(rule.hash)) {
      return false;
    }

    usedSelectors.add(rule.hash);

    return true;
  };
};

/**
 * returns critical rules(selector) used in a given HTML code
 */
const getCriticalRules = (html: string, def: StyleDefinition, filter: SelectionFilter = createUsedFilter()): string => {
  assertIsReady(def);

  return [...extractAllUnmatchable(def, filter), ...getRawCriticalRules(html, def, filter)]
    .map(({ css, file }) => `\n/* ${file} */\n${css}`)
    .join('');
};

/**
 * SSR tool based on used-styles npm library. We copied necessary code here instead of using the library, because
 * the used-styles library contained unnecessary code which caused problems in browsers.
 */
export async function getCriticalHdsRules(markup: string, allHDSStyles: string): Promise<string> {
  if (markup && markup.length > 0 && allHDSStyles && allHDSStyles.length > 0) {
    const styleData = loadStyleDefinitions(
      () => ['index.css'],
      () => allHDSStyles,
    );

    await styleData;

    return getCriticalRules(markup, styleData);
  }

  return '';
}

/**
 * Syncronous version of the getCriticalHdsRules() that does not load any files.
 * @param markup
 * @param allHDSStyles
 * @returns
 */

export function getCriticalHdsRulesSync(markup: string, allHDSStyles: string): string {
  if (markup && markup.length > 0 && allHDSStyles && allHDSStyles.length > 0) {
    const styles = parseProjectStyles({ 'index.css': allHDSStyles }) as StyleDefinition;
    return getCriticalRules(markup, styles);
  }

  return '';
}
