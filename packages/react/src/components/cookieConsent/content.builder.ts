import _get from 'lodash.get';
import _set from 'lodash.set';

import type {
  CookieData,
  CookieGroup,
  Content,
  Description,
  Category,
  SupportedLanguage,
  UiTexts,
  TableData,
} from './CookieConsentContext';
import commonContent from './content.json';
import { COOKIE_NAME } from './cookieConsentController';

type ContentSourceCookieData = Partial<CookieData> & {
  commonGroup?: string;
  groupId?: string;
  commonCookie?: string;
};

export type ContentSourceCookieGroup = Omit<Partial<CookieGroup>, 'cookies'> & {
  commonGroup?: string;
  id?: string;
  cookies: ContentSourceCookieData[];
};

export type ContentSourceCategory = Omit<Partial<Category>, 'groups'> & {
  groups?: ContentSourceCookieGroup[];
  cookies?: ContentSourceCookieData[];
};

type ContentSourceTexts = {
  sections?: {
    main?: Partial<Description>;
    details?: Partial<Description>;
  };
  ui?: Partial<UiTexts>;
  tableHeadings?: Partial<TableData>;
};

export type ContentSource = {
  currentLanguage: SupportedLanguage;
  siteName: string;
  requiredCookies?: ContentSourceCategory;
  optionalCookies?: ContentSourceCategory;
  texts?: ContentSourceTexts;
  language?: Partial<Content['language']>;
  noCommonConsentCookie?: boolean;
  onAllConsentsGiven?: Content['onAllConsentsGiven'];
  onConsentsParsed?: Content['onConsentsParsed'];
};

type GenericContentObject = {
  [key: string]: string | GenericContentObject;
};

type MergableContent = Partial<GenericContentObject | ContentSourceCookieGroup | ContentSourceCategory>;

function getTexts(language: SupportedLanguage, siteName: string): Content['texts'] {
  const { texts } = commonContent;
  const textContent: Content['texts'] = {
    sections: {
      main: {
        ...texts.sections.main[language],
      },
      details: {
        ...texts.sections.details[language],
      },
    },
    ui: {
      ...texts.ui[language],
    },
    tableHeadings: {
      ...texts.tableHeadings[language],
    },
  };
  textContent.sections.main.title = textContent.sections.main.title.replace('{{siteName}}', siteName);
  return textContent;
}
function getLanguage(lang: SupportedLanguage, overrides: ContentSource['language']): Content['language'] {
  const { language } = commonContent;
  return {
    ...language,
    current: lang,
    onLanguageChange: () => undefined,
    ...overrides,
  } as Content['language'];
}

function getCategoryDescriptions(
  language: SupportedLanguage,
): { requiredCookies: Description; optionalCookies: Description } {
  const { requiredCookies, optionalCookies } = commonContent;
  return {
    requiredCookies: requiredCookies[language],
    optionalCookies: optionalCookies[language],
  };
}

function getCommonCookieGroup(language: string, id: string): Omit<CookieGroup, 'cookies'> {
  const { commonGroups } = commonContent;
  if (!commonGroups[id]) {
    throw new Error(`Unknown common consent group ${id}`);
  }
  return commonGroups[id][language];
}

function getCommonCookie(language: string, id: string, overrides?: Partial<CookieData>): CookieData {
  const { commonCookies } = commonContent;
  if (!commonCookies[id]) {
    throw new Error(`Unknown common cookie ${id}`);
  }
  const dataWithTranslations = commonCookies[id];
  const cookie: CookieData = {
    id: dataWithTranslations.id,
    hostName: dataWithTranslations.hostName,
    ...commonCookies[id][language],
    ...overrides,
  };
  return cookie;
}

function mergeObjects(target: MergableContent, source: MergableContent, paths: string[]) {
  paths.forEach((path) => {
    const pickedFromSource = _get(source, path);
    if (pickedFromSource) {
      const pickedFromTarget = _get(target, path);
      if (typeof pickedFromSource === 'string') {
        _set(target, path, pickedFromSource || pickedFromTarget);
      } else {
        _set(target, path, {
          ...pickedFromTarget,
          ...pickedFromSource,
        });
      }
    }
  });
}

function buildCookieGroups(props: ContentSource): { requiredCookies: CookieGroup[]; optionalCookies: CookieGroup[] } {
  const requiredCookies = [];
  const optionalCookies = [];
  const groupMap = new Map<string, CookieGroup>();
  const { currentLanguage, noCommonConsentCookie } = props;
  let helConsentCookieFound = false;

  const parseGroup = (groupSource: ContentSourceCookieGroup, isRequired: boolean) => {
    let consentGroup: CookieGroup | undefined;
    const mapId = groupSource.commonGroup || groupSource.id || groupSource.title;
    consentGroup = groupMap.get(mapId);
    if (!consentGroup) {
      if (groupSource.commonGroup) {
        const groupTexts = getCommonCookieGroup(currentLanguage, groupSource.commonGroup);
        consentGroup = {
          ...groupTexts,
          cookies: [],
        };
        mergeObjects(consentGroup, groupSource, ['title', 'text', 'expandAriaLabel', 'checkboxAriaDescription']);
      } else {
        consentGroup = {
          title: groupSource.title,
          text: groupSource.text,
          expandAriaLabel: groupSource.expandAriaLabel,
          checkboxAriaDescription: groupSource.checkboxAriaDescription,
          cookies: [],
        };
      }
      groupMap.set(mapId, consentGroup);
      isRequired ? requiredCookies.push(consentGroup) : optionalCookies.push(consentGroup);
    }
    if (groupSource.cookies) {
      groupSource.cookies.forEach((cookieSource) => {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const { commonGroup, groupId, commonCookie, ...cookieProps } = cookieSource as ContentSourceCookieData;
        /* eslint-enable @typescript-eslint/no-unused-vars */
        const cookieData = commonCookie ? getCommonCookie(currentLanguage, commonCookie, cookieProps) : cookieProps;
        consentGroup.cookies.push(cookieData as CookieData);
      });
    }
  };

  const parseCookie = (cookie: ContentSourceCookieData, isRequired: boolean): void => {
    const { commonGroup, groupId } = cookie;
    const groupIdentifier = commonGroup || groupId;
    if (groupIdentifier) {
      parseGroup({ commonGroup, id: groupId, cookies: [cookie] }, isRequired);
    } else {
      throw new Error('Cannot add single cookie without a group');
    }
  };

  if (props.requiredCookies?.groups) {
    props.requiredCookies.groups.forEach((group) => {
      parseGroup(group, true);
    });
  }
  if (props.optionalCookies?.groups) {
    props.optionalCookies.groups.forEach((group) => {
      parseGroup(group, false);
    });
  }
  if (props.requiredCookies?.cookies) {
    props.requiredCookies.cookies.forEach((cookie) => {
      parseCookie(cookie, true);
      if (cookie.id === COOKIE_NAME) {
        helConsentCookieFound = true;
      }
    });
  }
  if (props.optionalCookies?.cookies) {
    props.optionalCookies.cookies.forEach((cookie) => {
      parseCookie(cookie, false);
      if (cookie.id === COOKIE_NAME) {
        helConsentCookieFound = true;
      }
    });
  }
  if (!noCommonConsentCookie && !helConsentCookieFound) {
    const consentCookie: Partial<CookieData> = getCommonCookie(currentLanguage, 'helConsentCookie');
    consentCookie.id = COOKIE_NAME;
    parseGroup({ commonGroup: 'sharedConsents', cookies: [consentCookie] }, true);
  }
  return {
    requiredCookies,
    optionalCookies,
  };
}

function buildConsentCategories(
  description: Description,
  overrides?: Partial<ContentSourceCategory>,
  groups?: CookieGroup[],
): Category {
  if (!overrides && (!groups || !groups.length)) {
    return undefined;
  }
  const data: Partial<Category> = {
    ...description,
  };
  if (overrides) {
    mergeObjects(data, overrides, ['title', 'text', 'checkboxAriaDescription']);
  }
  if (groups) {
    data.groups = groups;
  }
  return data as Category;
}

export function createContent(props: ContentSource): Content {
  const {
    siteName,
    language,
    currentLanguage,
    optionalCookies,
    requiredCookies,
    onConsentsParsed,
    onAllConsentsGiven,
  } = props;
  const content: Partial<Content> = {
    texts: getTexts(currentLanguage, siteName),
    language: getLanguage(currentLanguage, language),
  };
  if (props.texts) {
    mergeObjects(content.texts, props.texts, ['sections.main', 'sections.details', 'ui', 'tableHeadings']);
  }
  const consentGroups = buildCookieGroups(props);
  const categoryDescriptions = getCategoryDescriptions(currentLanguage);
  content.optionalCookies = buildConsentCategories(
    categoryDescriptions.optionalCookies,
    optionalCookies,
    consentGroups.optionalCookies,
  );
  content.requiredCookies = buildConsentCategories(
    categoryDescriptions.requiredCookies,
    requiredCookies,
    consentGroups.requiredCookies,
  );
  if (onAllConsentsGiven) {
    content.onAllConsentsGiven = onAllConsentsGiven;
  }
  if (onConsentsParsed) {
    content.onConsentsParsed = onConsentsParsed;
  }
  return content as Content;
}

export function pickConsentIdsFromContentSource(
  contentSource: Partial<ContentSource>,
): { required: string[]; optional: string[] } {
  let required: string[] = [];
  let optional: string[] = [];

  const cookieGroups = buildCookieGroups(contentSource as ContentSource);

  cookieGroups.requiredCookies.forEach((group) => {
    if (group.cookies) {
      required = group.cookies.map((consent) => consent.id);
    }
  });
  cookieGroups.optionalCookies.forEach((group) => {
    if (group.cookies) {
      optional = group.cookies.map((consent) => consent.id);
    }
  });

  return {
    required,
    optional,
  };
}
