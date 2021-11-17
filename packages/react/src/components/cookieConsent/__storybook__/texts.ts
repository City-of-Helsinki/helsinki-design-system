const texts = {
  matomoTitle: 'Tilastointievästeet',
  matomoText: 'Tilastointievästeiden keräämää tietoa käytetään verkkosivuston kehittämiseen',
  matomoAriaInputText: 'Hyväksy tai hylkää tilastotointieväste. {{consentText}}',
  tunnistamoTitle: 'Kirjautumiseväste',
  tunnistamoText: 'Sivuston pakollinen eväste mahdollistaa kävijän vierailun sivustolla.',
  tunnistamoAriaInputText: 'Hyväksy tai hylkää kirjautumiseväste. {{consentText}}',
  languageTitle: 'Kielieväste',
  languageText: 'Tallennamme valitsemasi käyttöliittymäkielen',
  preferencesTitle: 'Mieltymysevästeet',
  preferencesText: 'Mieltymysevästeet mukauttavat sivuston ulkoasua ja toimintaa käyttäjän aiemman käytön perusteella.',
  preferencesAriaInputText: 'Hyväksy tai hylkää mieltymyseväste. {{consentText}}',
  marketingTitle: 'Markkinointievästeet',
  marketingText: 'Markkinointievästeiden avulla sivuston käyttäjille voidaan kohdentaa sisältöjä.',
  marketingAriaInputText: 'Hyväksy tai hylkää markkinointieväste. {{consentText}}',
  someOtherConsentTitle: 'Palvelun oma eväste',
  someOtherConsentText: 'Palvelun omaa eväste on demoa varten',
  someOtherConsentAriaInputText: 'Hyväksy tai hylkää {{consentText}}',
};

export const getTitle = (key: string): string => {
  return texts[`${key}Title`] || key;
};

export const getText = (key: string): string => {
  return texts[`${key}Text`] || key;
};

export const getAriaLabel = (key: string): string => {
  const text = getText(key);
  const label = (texts[`${key}AriaInputText`] as string) || key;
  return label.replace('{{consentText}}', text);
};
