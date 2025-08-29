import { ModularOptionListCustomTheme, ModularOptionListMetaData, ThemeTarget } from '../types';
import { useModularOptionListDataHandlers } from './useModularOptionListDataHandlers';
import { useTheme } from '../../../../hooks/useTheme';
import styles from '../ModularOptionList.module.scss';

function parseThemes(theme: ModularOptionListCustomTheme) {
  const checkboxVariablePrefix = '--checkbox-';
  const themeKeys = theme ? Object.keys(theme) : [];
  const themes: Record<ThemeTarget, undefined | ModularOptionListCustomTheme> = {
    root: undefined,
    checkbox: undefined,
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

  const themes: ModularOptionListMetaData['themes'] = {
    root: rootThemeClass,
    checkbox: checkboxThemeClass,
  };

  updateMetaData({ themes });

  return themes;
}
