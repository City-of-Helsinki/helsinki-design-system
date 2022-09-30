/**
 * The code here is based on used-styles npm library: https://github.com/theKashey/used-styles
 * Some of the code was leaking to browser causing problems, so we copied the code instead of using the library as is.
 */
import { kashe } from 'kashe';

import { convertStyleSelectorsToString } from './convertStyleSelectorsToString';
import { SelectionFilter, SingleStyleAst, StyleAst, StyleDefinition, StyleSelector, StyleChunk } from './types';

const findUnmatchableSelectors = (selectors: StyleSelector[]): StyleSelector[] =>
  selectors.filter((rule) => rule.pieces.length === 0);

const getUnmatchableRules = (def: SingleStyleAst, filter?: SelectionFilter): StyleSelector[] =>
  findUnmatchableSelectors(def.selectors).filter((block) => !filter || filter(block.selector, block));

const getAtRules = (def: SingleStyleAst) => def.atRules.reduce((acc, rule) => acc + rule.css, '');

const extractUnmatchable = (def: SingleStyleAst, filter?: SelectionFilter) =>
  convertStyleSelectorsToString(getUnmatchableRules(def, filter), def) + getAtRules(def);

const extractUnmatchableFromAst = kashe((ast: StyleAst, filter?: SelectionFilter): StyleChunk[] =>
  Object.keys(ast || {})
    .map((file) => {
      const css = extractUnmatchable(ast[file], filter);

      if (css) {
        return {
          file,
          css,
        } as StyleChunk;
      }

      return undefined;
    })
    .filter((x) => !!x)
    .map((x) => x as StyleChunk),
);

export const extractAllUnmatchable = (def: StyleDefinition, filter?: SelectionFilter): StyleChunk[] =>
  extractUnmatchableFromAst(def.ast, filter);
