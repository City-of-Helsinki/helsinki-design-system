import { ModularOptionListCustomTheme, ModularOptionListMetaData, ThemeTarget } from '../types';
import { useModularOptionListDataHandlers } from './useModularOptionListDataHandlers';
import { useTheme } from '../../../hooks/useTheme';
import styles from '../ModularOptionList.module.scss';

function parseThemes(theme: ModularOptionListCustomTheme) {
  const checkboxVariablePrefix = '--checkbox-';
  const textInputVariablePrefix = '--text-';
  const tagVariablePrefix = '--tag-';
  const showButtonVariablePrefix = '--show-all-';
  const clearButtonVariablePrefix = '--clear-all-';
  const themeKeys = theme ? Object.keys(theme) : [];
  const themes: Record<ThemeTarget, undefined | ModularOptionListCustomTheme> = {
    root: undefined,
    checkbox: undefined,
    textInput: undefined,
    tag: undefined,
    showAllButton: undefined,
    clearAllButton: undefined,
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
    if (key.startsWith(tagVariablePrefix)) {
      return ['tag', tagVariablePrefix];
    }
    if (key.startsWith(showButtonVariablePrefix)) {
      return ['showAllButton', showButtonVariablePrefix];
    }
    if (key.startsWith(clearButtonVariablePrefix)) {
      return ['clearAllButton', clearButtonVariablePrefix];
    }
    return ['root', undefined];
  };
  themeKeys.forEach((key) => {
    const [themeTarget, prefix] = getKeyThemeAndPrefix(key);
    assignTheme(themeTarget, key, prefix);
  });
  return themes;
}

export function useCustomThemes(theme: ModularOptionListCustomTheme) {
  const { updateMetaData } = useModularOptionListDataHandlers();

  const givenThemes = parseThemes(theme);

  const rootThemeClass = useTheme<ModularOptionListCustomTheme | undefined>(
    styles.root,
    givenThemes ? givenThemes.root : undefined,
  );

  const checkboxThemeClass = useTheme<ModularOptionListCustomTheme | undefined>(
    styles.root,
    givenThemes ? givenThemes.checkbox : undefined,
    ` .${styles.checkbox}`,
  );

  const textInputThemeClass = useTheme<ModularOptionListCustomTheme | undefined>(
    styles.root,
    givenThemes ? givenThemes.textInput : undefined,
    ` .${styles.searchOrFilterInput}`,
  );

  const tagThemeClass = useTheme<ModularOptionListCustomTheme | undefined>(
    styles.root,
    givenThemes ? givenThemes.tag : undefined,
    ` .${styles.tag}`,
  );

  const clearAllThemeClass = useTheme<ModularOptionListCustomTheme | undefined>(
    styles.root,
    givenThemes ? givenThemes.clearAllButton : undefined,
    ` .${styles.clearAllButton}`,
  );

  const showAllThemeClass = useTheme<ModularOptionListCustomTheme | undefined>(
    styles.root,
    givenThemes ? givenThemes.showAllButton : undefined,
    ` .${styles.showAllButton}`,
  );

  const themes: ModularOptionListMetaData['themes'] = {
    root: rootThemeClass,
    checkbox: checkboxThemeClass,
    tag: tagThemeClass,
    textInput: textInputThemeClass,
    showAllButton: showAllThemeClass,
    clearAllButton: clearAllThemeClass,
  };

  updateMetaData({ themes });

  return themes;
}
