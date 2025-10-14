import styles from '../Select.module.scss';
import { SelectCustomTheme, SelectMetaData, ThemeTarget } from '../types';
import { useSelectDataHandlers } from './useSelectDataHandlers';
import { useGenericCustomThemes, GenericThemeConfig } from '../../shared';

// Select-specific theme configuration
const selectThemeConfig: GenericThemeConfig<ThemeTarget> = {
  prefixMappings: [
    { prefix: '--checkbox-', target: 'checkbox' },
    { prefix: '--text-', target: 'textInput' },
    { prefix: '--tag-', target: 'tag' },
    { prefix: '--show-all-', target: 'showAllButton' },
    { prefix: '--clear-all-', target: 'clearAllButton' },
  ],
  styleMappings: {
    root: '',
    checkbox: styles.checkbox,
    textInput: styles.searchOrFilterInput,
    tag: styles.tag,
    showAllButton: styles.showAllButton,
    clearAllButton: styles.clearAllButton,
  },
  rootClass: styles.root,
  updateMetaData: () => {
    // This will be set in the hook implementation
  },
};

export function useCustomThemes(theme: SelectCustomTheme | undefined) {
  const { updateMetaData } = useSelectDataHandlers();

  // Configure the updateMetaData function
  const config = {
    ...selectThemeConfig,
    updateMetaData: (data: { themes: SelectMetaData['themes'] }) => updateMetaData(data),
  };

  return useGenericCustomThemes(theme, config);
}
