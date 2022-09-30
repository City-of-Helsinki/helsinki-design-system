/**
 * The code here is based on used-styles npm library: https://github.com/theKashey/used-styles
 * Some of the code was leaking to browser causing problems, so we copied the code instead of using the library as is.
 */
export interface StyleSelector {
  selector: string;
  postfix: string;

  pieces: string[];
  media: string[];
  parents?: string[];

  declaration: number;
  hash: string;
}

export interface CodeLocation {
  line: number;
  column: number;
}

export interface StyleRule {
  prop: string;
  value: string;
  important: boolean;
}

export interface StyleBody {
  id: number;
  rules: StyleRule[];
  start: CodeLocation;
  end: CodeLocation;
}

export type StyleBodies = Record<number, StyleBody>;

export interface AtRule {
  kind: string;
  id: string;
  css: string;
}

export interface SingleStyleAst {
  file: string;
  selectors: StyleSelector[];
  bodies: StyleBodies;
  atRules: AtRule[];
}

export type StyleAst = Record<string, SingleStyleAst>;

export type StylesLookupTable = Record<string, string[]>;

export type StyleDefinition = Readonly<{
  isReady: boolean;
  lookup: Readonly<StylesLookupTable>;
  ast: Readonly<StyleAst>;
  urlPrefix: string;
  then(resolve?: () => void, reject?: () => void): Promise<void>;
}>;

export type SelectionFilter = {
  (selector: string, rule: StyleSelector): boolean;
  /**
   * Class discovery helper
   * @see {@link https://github.com/theKashey/used-styles/issues/30}
   * @internal
   */
  introduceClasses?(classes: string[]): void;
};

export interface StyleChunk {
  file: string;
  css: string;
}

export interface SyncStyleDefinition {
  isReady: true;
  lookup: StylesLookupTable;
  ast: StyleAst;
}
