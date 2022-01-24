/* eslint-disable jest/no-mocks-import */
import cookie from 'cookie';

import { Content } from './CookieConsentContext';
import { COOKIE_NAME } from './cookieConsentController';
import { CookieSetOptions } from './cookieController';
import { MockedDocumentCookieActions } from './__mocks__/mockDocumentCookie';

export function extractSetCookieArguments(
  mockedCookieControls: MockedDocumentCookieActions,
  index = -1,
): {
  cookieName: string;
  data: string;
  options: CookieSetOptions;
} {
  const mockCalls = mockedCookieControls.mockSet.mock.calls;
  const pos = index > -1 ? index : mockCalls.length - 1;
  const callArgs = mockCalls[pos];
  const dataStr = callArgs[0] || '';
  const parsed = callArgs ? cookie.parse(dataStr) : {};
  const keyFound = Object.keys(parsed).includes(COOKIE_NAME);
  const data = parsed[COOKIE_NAME];
  return {
    cookieName: keyFound ? COOKIE_NAME : '',
    data,
    options: mockedCookieControls.extractCookieOptions(dataStr, COOKIE_NAME),
  };
}

export const getContent = (): Content => {
  return {
    mainTitle: 'Evästesuostumukset',
    mainText: `Tämä sivusto käyttää välttämättömiä evästeitä suorituskyvyn varmistamiseksi sekä yleisen käytön seurantaan.
      Lisäksi käytämme kohdennusevästeitä käyttäjäkokemuksen parantamiseksi, analytiikkaan ja kohdistetun sisällön
      näyttämiseen. Jatkamalla sivuston käyttöä ilman asetusten muuttamista hyväksyt välttämättömien evästeiden
      käytön.`,
    detailsTitle: 'Tietoa sivustolla käytetyistä evästeistä',
    detailsText: `Sivustolla käytetyt evästeet on luokiteltu käyttötarkoituksen mukaan. Alla voit lukea tietoa jokaisesta
      kategoriasta ja sallia tai kieltää evästeiden käytön.`,
    requiredConsentsTitle: 'Välttämättömät evästeet',
    requiredConsentsText:
      'Välttämättömien evästeiden käyttöä ei voi kieltää. Ne mahdollistavat sivuston toiminnan ja vaikuttavat sivuston käyttäjäystävällisyyteen.',
    optionalConsentsTitle: 'Muut evästeet',
    optionalConsentsText: 'Voit hyväksyä tai jättää hyväksymättä muut evästeet.',
    consents: {},
    approveAllConsents: 'Hyväksy kaikki evästeet',
    approveRequiredAndSelectedConsents: 'Hyväksy valitut ja pakolliset evästeet',
    approveOnlyRequiredConsents: 'Hyväksy vain pakolliset evästeet',
    showSettings: 'Näytä asetukset',
    hideSettings: 'Piilota asetukset',
    language: 'fi',
    languageOptions: [
      { code: 'fi', label: 'Suomeksi (FI)' },
      { code: 'sv', label: 'På svenska (SV)' },
    ],
    languageSelectorAriaLabel: 'Kieli: Suomi. Vaihda kieli. Change language. Ändra språk.',
  } as Content;
};
