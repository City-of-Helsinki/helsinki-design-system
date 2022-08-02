import { getCriticalRules, loadStyleDefinitions } from 'used-styles';

export async function getCriticalHDSRules(markup, allHDSStyles) {
  if (markup && markup.length > 0 && allHDSStyles && allHDSStyles.length > 0) {
    const styleData = loadStyleDefinitions(
      () => ['index.css'],
      () => allHDSStyles,
    );

    await styleData;

    return getCriticalRules(markup, styleData);
  }

  return '';
}
