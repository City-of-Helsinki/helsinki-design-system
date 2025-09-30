import styles from '../Search.module.scss';
import { SearchCustomTheme, SearchMetaData, ThemeTarget } from '../types';
import { useSearchDataHandlers } from './useSearchDataHandlers';
import { useGenericCustomThemes, GenericThemeConfig } from '../../shared';

// Search-specific theme configuration
const searchThemeConfig: GenericThemeConfig<ThemeTarget> = {
  prefixMappings: [
    { prefix: '--checkbox-', target: 'checkbox' },
    { prefix: '--text-', target: 'textInput' },
    { prefix: '--clear-', target: 'clearButton' },
  ],
  styleMappings: {
    root: '',
    checkbox: styles.checkbox,
    textInput: styles.searchOrFilterInput,
    clearButton: styles.clearButton,
  },
  rootClass: styles.root,
  updateMetaData: () => {
    // This will be set in the hook implementation
  },
};

export function useCustomThemes(theme: SearchCustomTheme | undefined) {
  const { updateMetaData } = useSearchDataHandlers();

  // Configure the updateMetaData function
  const config = {
    ...searchThemeConfig,
    updateMetaData: (data: { themes: SearchMetaData['themes'] }) => updateMetaData(data),
  };

  return useGenericCustomThemes(theme, config);
}
