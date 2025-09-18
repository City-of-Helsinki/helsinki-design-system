import { SearchCustomTheme, SearchMetaData, ThemeTarget } from '../types';
import { useSearchDataHandlers } from './useSearchDataHandlers';
import { useTheme } from '../../../../hooks/useTheme';
import styles from '../Search.module.scss';

function parseThemes(theme: SearchCustomTheme) {
  const checkboxVariablePrefix = '--checkbox-';
  const textInputVariablePrefix = '--text-';
  const clearButtonVariablePrefix = '--clear-';
  const themeKeys = theme ? Object.keys(theme) : [];
  const themes: Record<ThemeTarget, undefined | SearchCustomTheme> = {
    root: undefined,
    checkbox: undefined,
    textInput: undefined,
    clearButton: undefined,
  };
  if (!themeKeys.length) {
    return themes;
  }
  const assignTheme = (targetKey: ThemeTarget, themekey: string, prefix?: string) => {
    if (!themes[targetKey]) {
      themes[targetKey] = {};
    }
    const newKey = prefix ? themekey.replace(prefix, '--') : themekey;
    themes[targetKey][newKey] = `${theme[themekey]}`;
  };
  const getKeyThemeAndPrefix = (key: string): [ThemeTarget, string | undefined] => {
    if (key.startsWith(checkboxVariablePrefix)) {
      return ['checkbox', checkboxVariablePrefix];
    }
    if (key.startsWith(textInputVariablePrefix)) {
      return ['textInput', textInputVariablePrefix];
    }
    if (key.startsWith(clearButtonVariablePrefix)) {
      return ['clearButton', clearButtonVariablePrefix];
    }
    return ['root', undefined];
  };
  themeKeys.forEach((key) => {
    const [themeTarget, prefix] = getKeyThemeAndPrefix(key);
    assignTheme(themeTarget, key, prefix);
  });
  return themes;
}

export function useCustomThemes(theme: SearchCustomTheme) {
  const { updateMetaData } = useSearchDataHandlers();

  const givenThemes = parseThemes(theme);

  const rootThemeClass = useTheme<SearchCustomTheme | undefined>(
    styles.root,
    givenThemes ? givenThemes.root : undefined,
  );

  const checkboxThemeClass = useTheme<SearchCustomTheme | undefined>(
    styles.root,
    givenThemes ? givenThemes.checkbox : undefined,
    ` .${styles.checkbox}`,
  );

  const textInputThemeClass = useTheme<SearchCustomTheme | undefined>(
    styles.root,
    givenThemes ? givenThemes.textInput : undefined,
    ` .${styles.searchOrFilterInput}`,
  );

  const clearButtonThemeClass = useTheme<SearchCustomTheme | undefined>(
    styles.root,
    givenThemes ? givenThemes.clearButton : undefined,
    ` .${styles.clearButton}`,
  );

  const themes: SearchMetaData['themes'] = {
    root: rootThemeClass,
    checkbox: checkboxThemeClass,
    textInput: textInputThemeClass,
    clearButton: clearButtonThemeClass,
  };

  updateMetaData({ themes });

  return themes;
}
