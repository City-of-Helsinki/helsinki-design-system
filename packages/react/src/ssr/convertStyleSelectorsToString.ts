import { kashe } from 'kashe';
import { decl } from 'postcss';

import { StyleSelector, SingleStyleAst, StyleBody, StyleRule } from './types';

const getMedia = ({ media }: { media: string[] }) => {
  const prefix: string[] = [];
  const postfix: string[] = [];

  media.forEach((currentMedia) => {
    prefix.push(`@media ${currentMedia} {`);
    postfix.push('}');
  });

  return [prefix.join(''), postfix.join('')];
};

const createDecl = (declaration: StyleRule) => `${decl(declaration)};`;

const declsToString = (rules: StyleRule[]) => rules.map((declaration) => createDecl(declaration)).join('');

const renderRule = kashe(
  (rule: StyleSelector, style: StyleBody) => `${rule.selector} { ${declsToString(style.rules)} }`,
);

export const convertStyleSelectorsToString = (blocks: StyleSelector[], { bodies }: SingleStyleAst) => {
  blocks.sort((ruleA, ruleB) => bodies[ruleA.declaration].id - bodies[ruleB.declaration].id);

  const result: string[] = [];

  let lastMedia = ['', ''];

  blocks.forEach((block, index) => {
    const media = getMedia(block);

    if (media[0] !== lastMedia[0]) {
      result.push(lastMedia[1]);
      lastMedia = media;
      result.push(lastMedia[0]);
    }

    if (index < blocks.length - 1 && block.declaration === blocks[index + 1].declaration) {
      result.push(`${block.selector},`);
    } else {
      result.push(renderRule(block, bodies[block.declaration]));
    }
  });

  result.push(lastMedia[1]);

  return result.join('');
};
