import { extractAllUnmatchable } from './extractAllUnmatchable';
import { getRawCriticalRules, assertIsReady } from './getRawCriticalRules';
import { loadStyleDefinitions } from './loadStyleDefinitions';
import { StyleDefinition, StyleSelector, SelectionFilter } from './types';

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
