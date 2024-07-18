/**
 * The code here is based on used-styles npm library: https://github.com/theKashey/used-styles
 * Some of the code was leaking to browser causing problems, so we copied the code instead of using the library as is.
 */
import { AtRule as PostcssAtRule, parse, Rule } from 'postcss';
import { str as crc32Str } from 'crc-32';

import {
  AtRule,
  CodeLocation,
  SingleStyleAst,
  StyleAst,
  StyleBodies,
  StyleBody,
  StyleDefinition,
  StyleSelector,
  StylesLookupTable,
  SyncStyleDefinition,
} from './types';

interface FlattenFileOrder {
  file: string;
  order: number;
}

type StyleFiles = Record<string, string>;

const passAll = () => true;

const flattenOrder = (order: string | boolean | number | null): number => {
  if (typeof order === 'number' || typeof order === 'string') {
    return +order;
  }

  if (order === true) {
    return 0;
  }

  return Number.NaN;
};

const createAwaitableResult = () => {
  let resolve: (value?: void | PromiseLike<never>) => void;
  let reject: (reason?: never) => void;
  const awaiter = new Promise<void>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const result: StyleDefinition = {
    isReady: false,
    then(res, rej) {
      return awaiter.then(res, rej);
    },
  } as StyleDefinition;

  return {
    result,
    resolve,
    reject,
  };
};

const getAtRule = (rule: PostcssAtRule | Rule): string[] => {
  const ruleParent = rule && (rule.parent as unknown as PostcssAtRule);
  const isParentAPostcssAtRule = !!(rule.parent && 'name' in rule.parent);
  if (isParentAPostcssAtRule && ruleParent.name === 'media') {
    return getAtRule(ruleParent).concat(ruleParent.params);
  }

  return [];
};

const hasClassSelector = (str: string): boolean => !!str && str.indexOf('.') >= 0;

const mapSelector = (selector: string): string[] => {
  // replace `something:not(.something)` to `something:not`
  const cleanSelector = selector.replace(/\(([^)])*\)/g, '').replace(/(\\\+)/g, 'PLUS_SYMBOL');
  const ruleSelection =
    // anything like "class"
    cleanSelector.match(/\.([^>~+$:{[\s]+)?/g) || [];

  ruleSelection.reverse();

  const effectiveMatcher: string = ruleSelection.find(hasClassSelector) || '';
  const selectors = effectiveMatcher.match(/(\.[^.>~+,$:{[\s]+)?/g);

  return (selectors || []).map((x) => x.replace(/[.\s.:]+/, '').replace(/PLUS_SYMBOL/g, '+')).filter(Boolean);
};

const getBreak = (rule: string) => {
  const breakPoints = [
    rule.indexOf(' '),
    rule.indexOf('>'),
    rule.indexOf('~'),
    rule.indexOf('+'),
    rule.indexOf(':'),
  ].filter((index) => index > 0);

  if (breakPoints.length === 0) {
    return rule.length;
  }

  const min = Math.min(...breakPoints);

  return min || rule.length;
};

const getPostfix = (rule: string) => {
  return rule.substr(getBreak(rule)).trim();
};

const extractParents = (selector: string): string[] => {
  // replace `something:not(.something)` to `something:not`
  const cleanSelector = selector.replace(/\(([^)])*\)/g, '').replace(/(\\\+)/g, 'PLUS_SYMBOL');
  const parts = cleanSelector.split(' ');
  // remove the last part
  parts.pop();

  const ruleSelection =
    // anything like "class"
    parts.join(' ').match(/\.([^>~+$:{[\s]+)?/g) || [];

  const effectiveMatcher = ruleSelection.filter(hasClassSelector);

  return effectiveMatcher.map((x) => x.replace(/[.\s.:]+/, '').replace(/PLUS_SYMBOL/g, '+')).filter(Boolean);
};

const createRange = (line: number, column: number): CodeLocation => ({
  line,
  column,
});

const localRangeMin = (v: CodeLocation, max: CodeLocation): CodeLocation => {
  if (v.line < max.line) {
    return v;
  }

  if (v.line === max.line) {
    return {
      // file: v.file,
      line: v.line,
      column: Math.min(v.column, max.column),
    };
  }

  return {
    // file: v.file,
    ...max,
  };
};

const localRangeMax = (v: CodeLocation, min: CodeLocation): CodeLocation => {
  if (v.line > min.line) {
    return v;
  }

  if (v.line === min.line) {
    return {
      // file: v.file,
      line: v.line,
      column: Math.max(v.column, min.column),
    };
  }

  return {
    // file: v.file,
    ...min,
  };
};

interface CodeLocationRange {
  start: CodeLocation;
  end: CodeLocation;
}

const rangesEqual = (a: CodeLocation, b: CodeLocation) =>
  // a.file === b.file &&
  a.line === b.line && a.column === b.column;

export const rangesIntervalEqual = (a: CodeLocationRange, b: CodeLocationRange) =>
  rangesEqual(a.start, b.start) && rangesEqual(a.end, b.end);

let bodyCounter = 1;

const assignBody = (decl: StyleBody, bodies: StyleBodies): StyleBody => {
  const d = Object.values(bodies).find((bodyDecl) => rangesIntervalEqual(bodyDecl, decl));

  if (d) {
    return d;
  }

  // eslint-disable-next-line no-param-reassign,no-plusplus
  decl.id = bodyCounter++;
  // eslint-disable-next-line no-param-reassign
  bodies[decl.id] = decl;

  return decl;
};

const hashString = (str: string) => {
  return crc32Str(str).toString(32);
};

const hashBody = (body: StyleBody) => {
  return hashString(JSON.stringify(body.rules));
};

const buildAst = (CSS: string, file = ''): SingleStyleAst => {
  const root = parse(CSS);
  const selectors: StyleSelector[] = [];
  const atRules: AtRule[] = [];

  const bodies: StyleBodies = {};

  const atParents = new Set<PostcssAtRule>();

  root.walkAtRules((rule) => {
    if (rule.name === 'charset') {
      return;
    }

    if (rule.name !== 'media') {
      atParents.add(rule);

      atRules /* [rule.params] */
        .push({
          kind: rule.name,
          id: rule.params,
          css: rule.toString(),
        });
    }
  });

  root.walkRules((rule) => {
    if (atParents.has(<PostcssAtRule>rule.parent)) {
      return;
    }

    const ruleSelectors = rule.selector.split(',');

    ruleSelectors
      .map((sel) => sel.trim())
      .forEach((selector) => {
        const stand: StyleSelector = {
          media: getAtRule(rule),
          selector,
          pieces: mapSelector(selector),
          postfix: getPostfix(selector),
          declaration: 0,
          hash: selector,
        };
        const parents = extractParents(selector);

        if (parents.length > 0) {
          stand.parents = parents;
        }

        const delc: StyleBody = {
          id: NaN,
          rules: [],
          start: createRange(Infinity, Infinity),
          end: createRange(0, 0),
        };

        rule.walkDecls(({ prop, value, source, important }) => {
          if (source) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            delc.start = localRangeMin(delc.start, source.start!);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            delc.end = localRangeMax(delc.end, source.end!);

            delc.rules.push({
              prop,
              value,
              important,
            });
          }
        });

        stand.declaration = assignBody(delc, bodies).id;
        stand.hash = `${selector}${hashBody(delc)}${hashString(stand.postfix)}${hashString(stand.media.join())}`;

        selectors.push(stand);
      });
  });

  return {
    file,
    selectors,
    bodies,
    atRules,
  };
};

const astFromFiles = (fileDate: StyleFiles): StyleAst =>
  Object.keys(fileDate).reduce((acc, file) => {
    acc[file] = buildAst(fileDate[file], file);

    return acc;
  }, {} as StyleAst);

const toFlattenArray = (ast: StyleAst): StylesLookupTable =>
  Object.keys(ast).reduce((acc, file) => {
    ast[file].selectors.forEach((sel) => {
      sel.pieces.forEach((className) => {
        if (!acc[className]) {
          acc[className] = [];
        }

        acc[className].push(file);
      });
    });

    return acc;
  }, {} as StylesLookupTable);

/**
 * (synchronously) creates style definition from a given set of style data
 * @param data a data in form of {fileName: fileContent}
 */
export function parseProjectStyles(data: Readonly<StyleFiles>): SyncStyleDefinition {
  const ast = astFromFiles(data);

  return {
    isReady: true,
    lookup: toFlattenArray(ast),
    ast,
  };
}

/**
 * Loads a given set of styles. This function is useful for custom scenarios and dev mode, where no files are emitted on disk
 * @see {@link discoverProjectStyles} to automatically load styles from the build folder
 * @param getStyleNames - a style name generator
 * @param loader - a data loader
 * @param fileFilter - filter and order corrector
 * @example
 * ```ts
 * loadStyleDefinitions(
 *  async () => ['style1.css'],
 *  (styleName) => fetch(CDN+styleName),
 * )
 * ```
 */
export function loadStyleDefinitions(
  getStyleNames: () => string[] | Promise<string[]>,
  loader: (style: string) => string | Promise<string>,
  fileFilter: (fileName: string) => boolean | number | null = passAll,
): StyleDefinition {
  const { resolve, reject, result } = createAwaitableResult();

  async function scanner() {
    const files: string[] = (await getStyleNames())
      .map((file) => ({
        file,
        order: flattenOrder(fileFilter(file)),
      }))
      .filter(({ order }) => !Number.isNaN(order))
      .sort((a: FlattenFileOrder, b: FlattenFileOrder) => a.order - b.order)
      .map(({ file }) => file);

    const styleFiles: StyleFiles = {};
    // prefill the obiect to pin keys ordering
    // eslint-disable-next-line no-return-assign
    files.map((file) => (styleFiles[file] = undefined as never));

    await Promise.all(
      files.map(async (file) => {
        styleFiles[file] = await loader(file);
      }),
    );

    return parseProjectStyles(styleFiles);
  }

  scanner().then(
    (styles) => {
      Object.assign(result, styles);
      resolve();
    },
    (e) => {
      reject(e as never);
      // eslint-disable-next-line no-console
      console.error(e);
      throw new Error('used-styles failed to start');
    },
  );

  return result;
}
