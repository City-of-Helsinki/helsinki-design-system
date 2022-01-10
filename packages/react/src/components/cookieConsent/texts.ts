const texts = {
  matomoTitle: 'Tilastointievästeet',
  matomoText: 'Tilastointievästeiden keräämää tietoa käytetään verkkosivuston kehittämiseen',
  tunnistamoTitle: 'Kirjautumiseväste',
  tunnistamoText: 'Sivuston pakollinen eväste mahdollistaa kävijän vierailun sivustolla.',
  languageTitle: 'Kielieväste',
  languageText: 'Tallennamme valitsemasi käyttöliittymäkielen',
  preferencesTitle: 'Mieltymysevästeet',
  preferencesText: 'Mieltymysevästeet mukauttavat sivuston ulkoasua ja toimintaa käyttäjän aiemman käytön perusteella.',
  marketingTitle: 'Markkinointievästeet',
  marketingText: 'Markkinointievästeiden avulla sivuston käyttäjille voidaan kohdentaa sisältöjä.',
  someOtherConsentTitle: 'Palvelun oma eväste',
  someOtherConsentText: 'Palvelun omaa eväste on demoa varten',
};

export const getTitle = (key: string): string => {
  return texts[`${key}Title`] || key;
};

export const getText = (key: string): string => {
  return texts[`${key}Text`] || key;
};
