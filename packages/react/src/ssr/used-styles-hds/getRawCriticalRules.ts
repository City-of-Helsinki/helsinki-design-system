/**
 * The code here is based on used-styles npm library: https://github.com/theKashey/used-styles
 * Some of the code was leaking to browser causing problems, so we copied the code instead of using the library as is.
 */
import { kashe } from 'kashe';
import memoizeOne from 'memoize-one';

import { SingleStyleAst, StyleDefinition, StyleSelector, SelectionFilter, StyleChunk } from './types';
import { convertStyleSelectorsToString } from './convertStyleSelectorsToString';

type FlagType = Record<string, boolean>;

type SelectorLookUp = Set<string>;

const astToUsedStyles = kashe((styles: string[], def: StyleDefinition) => {
  const { lookup, ast } = def;
  const fetches: Record<string, FlagType> = {};
  const visitedStyles = new Set<string>();

  styles.forEach((className) => {
    if (visitedStyles.has(className)) {
      return;
    }

    visitedStyles.add(className);

    const classes = className.split(' ');

    classes.forEach((singleClass) => {
      const files = lookup[singleClass];

      if (files) {
        files.forEach((file) => {
          if (!fetches[file]) {
            fetches[file] = {};
          }

          fetches[file][singleClass] = true;
        });
      }
    });
  });

  return {
    fetches,
    usage: Object.keys(ast).filter((file) => !!fetches[file]),
  };
});

const flattenClasses = (classes: string[]): string[] => {
  const result = new Set<string>();

  // eslint-disable-next-line no-restricted-syntax
  for (const cls of classes) {
    if (cls.includes(' ')) {
      cls.split(' ').forEach((cl) => result.add(cl));
    } else {
      result.add(cls);
    }
  }

  return Array.from(result.values());
};

const isMatching = (rule: StyleSelector, rules: SelectorLookUp) =>
  rule.pieces.length > 0 && rule.pieces.every((piece) => rules.has(piece));

const findMatchingSelectors = (rules: SelectorLookUp, selectors: StyleSelector[]): StyleSelector[] =>
  selectors.filter((rule) => isMatching(rule, rules));

const fromAst = (rules: string[], def: SingleStyleAst, filter?: SelectionFilter) => {
  const blocks: StyleSelector[] = [];
  const lookup: SelectorLookUp = new Set(rules);

  blocks.push(
    ...findMatchingSelectors(lookup, def.selectors).filter((block) => !filter || filter(block.selector, block)),
  );

  return convertStyleSelectorsToString(blocks, def);
};

const astToStyles = kashe((styles: string[], def: StyleDefinition, filter?: SelectionFilter): StyleChunk[] => {
  const { ast } = def;
  const { fetches, usage } = astToUsedStyles(styles, def);

  if (filter && filter.introduceClasses) {
    filter.introduceClasses(flattenClasses(styles));
  }

  return usage.map((file) => ({
    file,
    css: fromAst(Object.keys(fetches[file]), ast[file], filter),
  }));
});

const memoizedArray = memoizeOne((...args: string[]): string[] => args);

const classPlaceholder = 'class="';
const classPlaceholderLength = classPlaceholder.length;

const getStylesInReactText = (html: string): string[] =>
  [...(html.match(/class="([^"]+)"/g) || [])].map((className) =>
    className.substr(classPlaceholderLength, className.length - classPlaceholderLength - 1),
  );

const getStylesInText = (html: string): string[] => memoizedArray(...getStylesInReactText(html));

export const assertIsReady = (def: StyleDefinition) => {
  if (!('isReady' in def)) {
    throw new Error(
      'used-styles: style definitions has to be created using discoverProjectStyles or loadStyleDefinitions',
    );
  }

  if (!def.isReady) {
    throw new Error('used-styles: style definitions are not ready yet. You should `await discoverProjectStyles(...)`');
  }
};

export const getRawCriticalRules = (html: string, def: StyleDefinition, filter?: SelectionFilter) => {
  assertIsReady(def);

  return astToStyles(getStylesInText(html), def, filter);
};
