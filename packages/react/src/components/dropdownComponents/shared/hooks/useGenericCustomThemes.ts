import { useTheme } from '../../../../hooks/useTheme';

export interface GenericThemeConfig<TThemeTarget extends string> {
  /**
   * Variable prefix mappings for theme parsing
   */
  prefixMappings: Array<{
    prefix: string;
    target: TThemeTarget;
  }>;
  /**
   * CSS class selector mappings for theme targets
   */
  styleMappings: {
    [key in TThemeTarget]: string;
  };
  /**
   * Root CSS class for the component
   */
  rootClass: string;
  /**
   * Function to update component metadata with themes
   */
  updateMetaData: (data: { themes: Record<TThemeTarget, string> }) => void;
}

/**
 * Generic theme parsing function that works with any theme type and targets
 */
export function parseGenericThemes<TThemeType extends Record<string, unknown>, TThemeTarget extends string>(
  theme: TThemeType | undefined,
  config: Pick<GenericThemeConfig<TThemeTarget>, 'prefixMappings'>,
): Record<TThemeTarget, TThemeType> | null {
  if (!theme) {
    return null;
  }

  const themeKeys = Object.keys(theme);

  if (themeKeys.length === 0) {
    return null;
  }

  const themes = {} as Record<TThemeTarget, TThemeType>;

  const assignTheme = (themeTarget: TThemeTarget, key: string, prefix?: string) => {
    const themeForTarget = themes[themeTarget] || ({} as TThemeType);
    const keyWithoutPrefix = prefix ? key.replace(prefix, '') : key;
    (themeForTarget as Record<string, unknown>)[keyWithoutPrefix] = theme[key];
    themes[themeTarget] = themeForTarget;
  };

  const getKeyThemeAndPrefix = (key: string): [TThemeTarget, string | undefined] => {
    // Use traditional for loop instead of for...of to satisfy ESLint
    for (let i = 0; i < config.prefixMappings.length; i += 1) {
      const { prefix, target } = config.prefixMappings[i];
      if (key.startsWith(prefix)) {
        return [target, prefix];
      }
    }
    // Default to 'root' if no prefix matches - cast needed for type safety
    return ['root' as TThemeTarget, undefined];
  };

  themeKeys.forEach((key) => {
    const [themeTarget, prefix] = getKeyThemeAndPrefix(key);
    assignTheme(themeTarget, key, prefix);
  });

  return themes;
}

/**
 * Generic custom themes hook that can be configured for different components
 */
export function useGenericCustomThemes<TThemeType extends Record<string, unknown>, TThemeTarget extends string>(
  theme: TThemeType | undefined,
  config: GenericThemeConfig<TThemeTarget>,
): Record<TThemeTarget, string> {
  const givenThemes = parseGenericThemes(theme, config);

  const themeClasses = {} as Record<TThemeTarget, string>;

  // Generate theme classes for each target
  Object.keys(config.styleMappings).forEach((target) => {
    const themeTarget = target as TThemeTarget;
    const styleSelector = config.styleMappings[themeTarget];

    const themeClass = useTheme<TThemeType | undefined>(
      config.rootClass,
      givenThemes ? givenThemes[themeTarget] : undefined,
      themeTarget === 'root' ? undefined : ` .${styleSelector}`,
    );

    themeClasses[themeTarget] = themeClass;
  });

  config.updateMetaData({ themes: themeClasses });

  return themeClasses;
}
