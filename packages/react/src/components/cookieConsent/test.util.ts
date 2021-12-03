/* eslint-disable jest/no-mocks-import */
import cookie from 'cookie';

import { COOKIE_NAME } from './cookieConsentController';
import { CookieSetOptions } from './cookieController';
import { MockedDocumentCookieActions } from './__mocks__/mockDocumentCookie';

export default function extractSetCookieArguments(
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
