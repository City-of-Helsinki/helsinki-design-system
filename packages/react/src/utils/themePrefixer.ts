// prefixer for theme keys, replaces `--` with `-` in the original key if present

type Replace<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer Start}${From}${infer End}`
    ? `${Start}${To}${Replace<End, From, To>}`
    : S;

export type ThemePrefixer<T, PREFIX extends string> = {
  [P in keyof T as `${PREFIX}${Replace<string & P, '--', '-'>}`]: T[P];
};
