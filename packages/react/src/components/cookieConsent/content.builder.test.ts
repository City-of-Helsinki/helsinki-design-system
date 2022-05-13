import _get from 'lodash.get';

import { ContentSource, createContent } from './content.builder';
import commonContent from './content.json';
import { CookieData, CookieGroup, Content, Category } from './CookieConsentContext';

describe(`content.builder.ts`, () => {
  const siteName = 'hel.fi';
  const commonContentTestProps: ContentSource = {
    noCommonConsentCookie: true,
    siteName,
    currentLanguage: 'fi',
  };
  const defaults = createContent(commonContentTestProps);
  const mainTitlePath = 'texts.sections.main.title';
  const mainTextPath = 'texts.sections.main.text';
  const detailsTitlePath = 'texts.sections.title.title';
  const detailsTextPath = 'texts.sections.details.text';

  const defaultTextsAndLanguage = {
    texts: defaults.texts,
    language: defaults.language,
  };

  const marketingGroup: CookieGroup = {
    ...commonContent.commonGroups.marketing.fi,
    cookies: [],
  };
  const essentialGroup: CookieGroup = {
    ...commonContent.commonGroups.essential.fi,
    cookies: [],
  };

  const matomo: CookieData = {
    id: commonContent.commonCookies.matomo.id,
    hostName: commonContent.commonCookies.matomo.hostName,
    path: commonContent.commonCookies.matomo.path,
    ...commonContent.commonCookies.matomo.fi,
  };

  const tunnistamo: CookieData = {
    id: commonContent.commonCookies.tunnistamo.id,
    hostName: commonContent.commonCookies.tunnistamo.hostName,
    path: commonContent.commonCookies.tunnistamo.path,
    ...commonContent.commonCookies.tunnistamo.fi,
  };

  const requiredConsents: Category = {
    ...commonContent.requiredConsents.fi,
    groups: [],
  };

  const optionalConsents: Category = {
    ...commonContent.optionalConsents.fi,
    groups: [],
  };

  const testCookieData: CookieData = {
    id: 'testCookieData',
    name: 'testCookieData name',
    hostName: 'testCookieData hostName',
    path: 'testCookieData path',
    description: 'testCookieData description',
    expiration: 'testCookieData expiration',
  };

  const testCookieData2: CookieData = {
    id: 'testCookieData2',
    name: 'testCookieData2 name',
    hostName: 'testCookieData2 hostName',
    path: 'testCookieData2 path',
    description: 'testCookieData2 description',
    expiration: 'testCookieData2 expiration',
  };

  const userDefinedGroup: CookieGroup = {
    title: 'userDefinedGroup title',
    text: 'userDefinedGroup text',
    expandAriaLabel: 'userDefinedGroup expandAriaLabel',
    checkboxAriaDescription: 'userDefinedGroup checkboxAriaDescription',
    cookies: [
      {
        ...testCookieData2,
      },
      {
        ...testCookieData,
      },
    ],
  };

  // jest toEqual fails if functions exist.
  const filterContentWithoutFunctions = (content: Content): Content => {
    return JSON.parse(JSON.stringify(content));
  };

  describe('createContent', () => {
    it('returns content.texts and content.language when categories, groups nor cookies are not passed. SiteName is in main.title.', () => {
      const plainContent = createContent(commonContentTestProps);
      expect(plainContent).toBeDefined();
      expect(plainContent.texts).toBeDefined();
      expect(plainContent.texts.sections.main.title.length).toBeTruthy();
      expect(plainContent.texts.sections.main.text.length).toBeTruthy();
      expect(plainContent.texts.sections.details.title.length).toBeTruthy();
      expect(plainContent.texts.sections.details.text.length).toBeTruthy();

      const uiTexts = plainContent.texts.ui;
      const uiTextKeys = Object.keys(uiTexts);
      expect(uiTextKeys).toHaveLength(6);
      uiTextKeys.forEach((key) => {
        expect(uiTexts[key].length).toBeTruthy();
      });

      const { tableHeadings } = plainContent.texts;
      const tableHeadingsKeys = Object.keys(tableHeadings);
      expect(tableHeadingsKeys).toHaveLength(5);
      tableHeadingsKeys.forEach((key) => {
        expect(tableHeadings[key].length).toBeTruthy();
      });

      const { language } = plainContent;
      expect(language.languageOptions).toHaveLength(3);
      expect(language.languageSelectorAriaLabel.length).toBeTruthy();
      expect(language.current).toBe('fi');
      expect(typeof language.onLanguageChange).toBe('function');

      expect(plainContent.requiredConsents).toBeUndefined();
      expect(plainContent.optionalConsents).toBeUndefined();

      expect(_get(plainContent, mainTitlePath).indexOf(siteName)).toBe(0);
    });
  });
  describe('contentSource.texts', () => {
    it('can override default section texts one by one or all at once', () => {
      const newMainTitle = 'new main title';
      const newDetailsText = 'new details text';
      const contentWithNewMainTitle = createContent({
        ...commonContentTestProps,
        texts: { sections: { main: { title: newMainTitle } } },
      });
      expect(_get(contentWithNewMainTitle, mainTitlePath)).toBe(newMainTitle);
      expect(_get(contentWithNewMainTitle, mainTextPath)).toBe(_get(defaults, mainTextPath));
      const contentWithNewDetailsText = createContent({
        ...commonContentTestProps,
        texts: { sections: { details: { text: newDetailsText } } },
      });
      expect(_get(contentWithNewDetailsText, detailsTextPath)).toBe(newDetailsText);
      expect(_get(contentWithNewDetailsText, detailsTitlePath)).toBe(_get(defaults, detailsTitlePath));
    });
  });
  describe('contentSource.language', () => {
    it('is merged to the content.language', () => {
      const onLanguageChangeMock = jest.fn();
      const newLanguage = 'xyz';
      const content = createContent({
        ...commonContentTestProps,
        language: { onLanguageChange: onLanguageChangeMock },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { onLanguageChange, ...languageProps } = content.language;
      expect(languageProps).toEqual({
        ...commonContent.language,
        current: 'fi',
      });
      content.language.onLanguageChange(newLanguage);
      expect(onLanguageChangeMock).toHaveBeenCalledTimes(1);
      expect(onLanguageChangeMock).toHaveBeenCalledWith(newLanguage);
    });
  });
  describe('contentSource.cookies[]', () => {
    it('define also groups and create requiredConsents if cookie.required = true', () => {
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        cookies: [
          {
            commonGroup: 'marketing',
            required: true,
            ...testCookieData,
          },
        ],
      });
      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        requiredConsents: {
          ...requiredConsents,
          groups: [
            {
              ...marketingGroup,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
          ],
        },
        optionalConsents: undefined,
      };

      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
    it('define also groups and create optionalConsents if cookie.required = false', () => {
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        cookies: [
          {
            commonGroup: 'marketing',
            required: false,
            ...testCookieData,
          },
        ],
      });
      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        optionalConsents: {
          ...optionalConsents,
          groups: [
            {
              ...marketingGroup,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
          ],
        },
        requiredConsents: undefined,
      };

      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
    it('common cookies can be used', () => {
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        cookies: [
          {
            commonGroup: 'marketing',
            required: false,
            commonCookie: 'tunnistamo',
          },
          {
            commonGroup: 'essential',
            required: true,
            commonCookie: 'matomo',
          },
        ],
      });

      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        requiredConsents: {
          ...requiredConsents,
          groups: [
            {
              ...essentialGroup,
              cookies: [
                {
                  ...matomo,
                },
              ],
            },
          ],
        },
        optionalConsents: {
          ...optionalConsents,
          groups: [
            {
              ...marketingGroup,
              cookies: [
                {
                  ...tunnistamo,
                },
              ],
            },
          ],
        },
      };

      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
    it('common cookie texts can be overridden', () => {
      const newCookieTexts: Partial<CookieData> = {
        name: 'New cookie name',
        description: 'New cookie description',
        expiration: 'New cookie expiration',
      };
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        cookies: [
          {
            commonGroup: 'marketing',
            required: false,
            commonCookie: 'tunnistamo',
            ...newCookieTexts,
          },
          {
            commonGroup: 'essential',
            required: true,
            commonCookie: 'matomo',
            ...newCookieTexts,
          },
        ],
      });

      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        requiredConsents: {
          ...requiredConsents,
          groups: [
            {
              ...essentialGroup,
              cookies: [
                {
                  ...matomo,
                  ...newCookieTexts,
                },
              ],
            },
          ],
        },
        optionalConsents: {
          ...optionalConsents,
          groups: [
            {
              ...marketingGroup,
              cookies: [
                {
                  ...tunnistamo,
                  ...newCookieTexts,
                },
              ],
            },
          ],
        },
      };

      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
    it('multiple cookies and groups can be added', () => {
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        cookies: [
          {
            commonGroup: 'marketing',
            required: false,
            ...testCookieData,
          },
          {
            commonGroup: 'essential',
            required: true,
            ...testCookieData,
          },
        ],
      });

      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        requiredConsents: {
          ...requiredConsents,
          groups: [
            {
              ...essentialGroup,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
          ],
        },
        optionalConsents: {
          ...optionalConsents,
          groups: [
            {
              ...marketingGroup,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
          ],
        },
      };

      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
    it('cookies with groupId are added to the matching group. cookie.required is ignored when its group exists.', () => {
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        groups: [
          {
            ...marketingGroup,
            id: 'group1-for-cookies',
            required: true,
            cookies: [
              {
                ...testCookieData,
                name: 'group-1-existing-cookie',
              },
            ],
          },
          {
            ...essentialGroup,
            id: 'group2-for-cookies',
            required: false,
            cookies: [
              {
                ...testCookieData,
                name: 'group-2-existing-cookie',
              },
            ],
          },
        ],
        cookies: [
          {
            groupId: 'group1-for-cookies',
            required: false,
            ...testCookieData,
            name: 'group1-cookie',
          },
          {
            groupId: 'group2-for-cookies',
            required: false,
            ...testCookieData,
            name: 'group2-cookie',
          },
        ],
      });

      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        requiredConsents: {
          ...requiredConsents,
          groups: [
            {
              ...marketingGroup,
              cookies: [
                {
                  ...testCookieData,
                  name: 'group-1-existing-cookie',
                },
                {
                  ...testCookieData,
                  name: 'group1-cookie',
                },
              ],
            },
          ],
        },
        optionalConsents: {
          ...optionalConsents,
          groups: [
            {
              ...essentialGroup,
              cookies: [
                {
                  ...testCookieData,
                  name: 'group-2-existing-cookie',
                },
                {
                  ...testCookieData,
                  name: 'group2-cookie',
                },
              ],
            },
          ],
        },
      };
      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
  });
  describe('contentSource.groups[]', () => {
    it('adds a group when commonGroup is set and creates requiredConsents if group.required = true', () => {
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        groups: [
          {
            commonGroup: 'marketing',
            required: true,
            cookies: [
              {
                ...testCookieData,
              },
            ],
          },
          {
            ...userDefinedGroup,
            id: 'userDefinedGroup',
            required: true,
          },
        ],
      });
      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        requiredConsents: {
          ...requiredConsents,
          groups: [
            {
              ...marketingGroup,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
            {
              ...userDefinedGroup,
            },
          ],
        },
        optionalConsents: undefined,
      };

      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
    it('adds a group when commonGroup is set and creates optionalConsents if group.required = false', () => {
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        groups: [
          {
            ...userDefinedGroup,
          },
          {
            commonGroup: 'marketing',
            required: false,
            cookies: [
              {
                ...testCookieData,
              },
            ],
          },
        ],
      });
      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        optionalConsents: {
          ...optionalConsents,
          groups: [
            {
              ...userDefinedGroup,
            },
            {
              ...marketingGroup,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
          ],
        },
        requiredConsents: undefined,
      };

      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
    it('multiple groups and cookies can be added this way', () => {
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        groups: [
          {
            ...userDefinedGroup,
            id: 'userDefinedGroup1',
          },
          {
            commonGroup: 'marketing',
            required: false,
            cookies: [
              {
                ...testCookieData,
              },
            ],
          },
          {
            commonGroup: 'essential',
            required: true,
            cookies: [
              {
                ...testCookieData,
              },
            ],
          },
          {
            ...userDefinedGroup,
            id: 'userDefinedGroup2',
            required: true,
          },
        ],
      });

      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        requiredConsents: {
          ...requiredConsents,
          groups: [
            {
              ...essentialGroup,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
            {
              ...userDefinedGroup,
            },
          ],
        },
        optionalConsents: {
          ...optionalConsents,
          groups: [
            {
              ...userDefinedGroup,
            },
            {
              ...marketingGroup,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
          ],
        },
      };

      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
    it('common group texts can be overridden', () => {
      const newGroupTexts = {
        title: 'overridden title',
        text: 'overridden text',
        expandAriaLabel: 'overridden expandAriaLabel',
        checkboxAriaDescription: 'overridden checkboxAriaDescription',
      };
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        groups: [
          {
            commonGroup: 'marketing',
            required: false,
            cookies: [
              {
                ...testCookieData,
              },
            ],
            ...newGroupTexts,
          },
          {
            commonGroup: 'essential',
            required: true,
            cookies: [
              {
                ...testCookieData,
              },
            ],
            ...newGroupTexts,
          },
        ],
      });

      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        requiredConsents: {
          ...requiredConsents,
          groups: [
            {
              ...essentialGroup,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
              ...newGroupTexts,
            },
          ],
        },
        optionalConsents: {
          ...optionalConsents,
          groups: [
            {
              ...marketingGroup,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
              ...newGroupTexts,
            },
          ],
        },
      };

      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
  });
  describe('contentSource.requiredConsents and optionalConsents', () => {
    it('requiredConsents are constructed from its props', () => {
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        requiredConsents: {
          groups: [
            {
              commonGroup: 'marketing',
              required: true,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
            {
              ...userDefinedGroup,
              id: 'userDefinedGroup1',
              required: true,
            },
          ],
        },
      });
      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        requiredConsents: {
          ...requiredConsents,
          groups: [
            {
              ...marketingGroup,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
            {
              ...userDefinedGroup,
            },
          ],
        },
        optionalConsents: undefined,
      };
      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
    it('optionalConsents are constructed from its props', () => {
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        optionalConsents: {
          groups: [
            {
              commonGroup: 'marketing',
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
            {
              ...userDefinedGroup,
              id: 'userDefinedGroup1',
            },
          ],
        },
      });
      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        optionalConsents: {
          ...optionalConsents,
          groups: [
            {
              ...marketingGroup,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
            {
              ...userDefinedGroup,
            },
          ],
        },
        requiredConsents: undefined,
      };
      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
    it('group.required is ignored when group is already in a category', () => {
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        optionalConsents: {
          groups: [
            {
              commonGroup: 'marketing',
              required: true,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
            {
              ...userDefinedGroup,
              id: 'userDefinedGroup1',
            },
          ],
        },
      });
      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        optionalConsents: {
          ...optionalConsents,
          groups: [
            {
              ...marketingGroup,
              cookies: [
                {
                  ...testCookieData,
                },
              ],
            },
            {
              ...userDefinedGroup,
            },
          ],
        },
        requiredConsents: undefined,
      };
      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
    it('category texts can be overridden', () => {
      const newCategoryTexts: Partial<ContentSource['requiredConsents']> = {
        title: 'overridden title',
        text: 'overridden text',
        checkboxAriaDescription: 'overridden checkboxAriaDescription',
      };
      const contentWithCookie = createContent({
        ...commonContentTestProps,
        requiredConsents: {
          ...newCategoryTexts,
          groups: [
            {
              commonGroup: 'essential',
              cookies: [],
            },
          ],
        },
        optionalConsents: {
          ...newCategoryTexts,
          groups: [
            {
              commonGroup: 'marketing',
              cookies: [],
            },
          ],
        },
      });
      const expectedResult: Content = {
        ...defaultTextsAndLanguage,
        requiredConsents: {
          ...requiredConsents,
          ...newCategoryTexts,
          groups: [
            {
              ...essentialGroup,
              cookies: [],
            },
          ],
        },
        optionalConsents: {
          ...optionalConsents,
          ...newCategoryTexts,
          groups: [
            {
              ...marketingGroup,
              cookies: [],
            },
          ],
        },
      };
      expect(filterContentWithoutFunctions(contentWithCookie)).toEqual(filterContentWithoutFunctions(expectedResult));
    });
  });
  describe('Callbacks are appended to the content', () => {
    it('onAllConsentsGiven and onConsentsParsed are set ', () => {
      const onAllConsentsGiven = jest.fn();
      const onConsentsParsed = jest.fn();
      const dummyObject = { cookie: false };
      const content = createContent({ ...commonContentTestProps, onAllConsentsGiven, onConsentsParsed });
      content.onAllConsentsGiven(dummyObject);
      expect(onAllConsentsGiven).toHaveBeenCalledTimes(1);
      expect(onAllConsentsGiven).toHaveBeenCalledWith(dummyObject);

      content.onConsentsParsed(dummyObject, false);
      expect(onConsentsParsed).toHaveBeenCalledTimes(1);
      expect(onConsentsParsed).toHaveBeenCalledWith(dummyObject, false);
    });
  });
  describe('Automatically adds the consent storage cookie to required consents', () => {
    it('when noCommonConsentCookie is not true ', () => {
      const content = createContent({ siteName, currentLanguage: 'fi' });
      expect(content.requiredConsents).toBeDefined();
      expect(content.requiredConsents.groups[0].title).toBe(commonContent.commonGroups.sharedConsents.fi.title);
      expect(content.requiredConsents.groups[0].cookies[0].name).toBe(
        commonContent.commonCookies.helConsentCookie.fi.name,
      );
    });
  });
});
