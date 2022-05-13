import _get from 'lodash.get';
import _set from 'lodash.set';

import type {
  CookieData,
  ConsentGroup,
  Content,
  Description,
  Category,
  SupportedLanguage,
  UiTexts,
  TableData,
} from './CookieConsentContext';
import commonContent from './content.json';
import { COOKIE_NAME } from './cookieConsentController';

type ContentSourceConsentData = Partial<CookieData> & {
  commonGroup?: string;
  required?: boolean;
  groupId?: string;
  commonCookie?: string;
};

type ContentSourceConsentGroup = Omit<Partial<ConsentGroup>, 'consents'> & {
  commonGroup?: string;
  required?: boolean;
  id?: string;
  consents: ContentSourceConsentData[];
};

export type ContentSourceCategory = Omit<Partial<Category>, 'groups'> & {
  groups: ContentSourceConsentGroup[];
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
  requiredConsents?: ContentSourceCategory;
  optionalConsents?: ContentSourceCategory;
  groups?: ContentSourceConsentGroup[];
  cookies?: ContentSourceConsentData[];
  texts?: ContentSourceTexts;
  language?: Partial<Content['language']>;
  noCommonConsentCookie?: boolean;
  onAllConsentsGiven?: Content['onAllConsentsGiven'];
  onConsentsParsed?: Content['onConsentsParsed'];
};

type GenericContentObject = {
  [key: string]: string | GenericContentObject;
};

type MergableContent = Partial<GenericContentObject | ContentSourceConsentGroup | ContentSourceCategory>;

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
): { requiredConsents: Description; optionalConsents: Description } {
  const { requiredConsents, optionalConsents } = commonContent;
  return {
    requiredConsents: requiredConsents[language],
    optionalConsents: optionalConsents[language],
  };
}

function getCommonConsentGroup(language: string, id: string): Omit<ConsentGroup, 'consents'> {
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
    path: dataWithTranslations.path,
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

function buildConsentGroups(
  props: ContentSource,
): { requiredConsents: ConsentGroup[]; optionalConsents: ConsentGroup[] } {
  const requiredConsents = [];
  const optionalConsents = [];
  const groupMap = new Map<string, ConsentGroup>();
  const { currentLanguage, groups, cookies, noCommonConsentCookie } = props;

  const parseGroup = (groupSource: ContentSourceConsentGroup, isRequired?: boolean) => {
    let consentGroup: ConsentGroup | undefined;
    const isRequiredOverride = !!(isRequired !== undefined ? isRequired : groupSource.required);
    const mapId = groupSource.commonGroup || groupSource.id || groupSource.title;
    consentGroup = groupMap.get(mapId);
    if (!consentGroup) {
      if (groupSource.commonGroup) {
        const groupTexts = getCommonConsentGroup(currentLanguage, groupSource.commonGroup);
        consentGroup = {
          ...groupTexts,
          consents: [],
        };
        mergeObjects(consentGroup, groupSource, ['title', 'text', 'expandAriaLabel', 'checkboxAriaDescription']);
      } else {
        consentGroup = {
          title: groupSource.title,
          text: groupSource.text,
          expandAriaLabel: groupSource.expandAriaLabel,
          checkboxAriaDescription: groupSource.checkboxAriaDescription,
          consents: [],
        };
      }
      groupMap.set(mapId, consentGroup);
      isRequiredOverride ? requiredConsents.push(consentGroup) : optionalConsents.push(consentGroup);
    }
    if (groupSource.consents) {
      groupSource.consents.forEach((cookieSource) => {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const {
          commonGroup,
          groupId,
          required,
          commonCookie,
          ...cookieProps
        } = cookieSource as ContentSourceConsentData;
        /* eslint-enable @typescript-eslint/no-unused-vars */
        const cookieData = commonCookie ? getCommonCookie(currentLanguage, commonCookie, cookieProps) : cookieProps;
        consentGroup.consents.push(cookieData as CookieData);
      });
    }
  };

  if (props.requiredConsents?.groups) {
    props.requiredConsents.groups.forEach((group) => {
      parseGroup(group, true);
    });
  }
  if (props.optionalConsents?.groups) {
    props.optionalConsents.groups.forEach((group) => {
      parseGroup(group, false);
    });
  }
  if (groups) {
    groups.forEach((group) => {
      parseGroup(group);
    });
  }
  let helConsentCookieFound = false;
  if (cookies) {
    cookies.forEach((cookie) => {
      const { commonGroup, groupId } = cookie;
      const groupIdentifier = commonGroup || groupId;
      if (groupIdentifier) {
        parseGroup({ commonGroup, id: groupId, consents: [cookie] }, cookie.required);
      } else {
        throw new Error('Cannot add single cookie without a group');
      }
      if (cookie.id === COOKIE_NAME) {
        helConsentCookieFound = true;
      }
    });
  }
  if (!noCommonConsentCookie && !helConsentCookieFound) {
    const consentCookie: Partial<CookieData> = getCommonCookie(currentLanguage, 'helConsentCookie');
    consentCookie.id = COOKIE_NAME;
    parseGroup({ commonGroup: 'sharedConsents', consents: [consentCookie] }, true);
  }
  return {
    requiredConsents,
    optionalConsents,
  };
}

function buildConsentCategories(
  description: Description,
  overrides?: Partial<ContentSourceCategory>,
  groups?: ConsentGroup[],
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
    optionalConsents,
    requiredConsents,
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
  const consentGroups = buildConsentGroups(props);
  const categoryDescriptions = getCategoryDescriptions(currentLanguage);
  content.optionalConsents = buildConsentCategories(
    categoryDescriptions.optionalConsents,
    optionalConsents,
    consentGroups.optionalConsents,
  );
  content.requiredConsents = buildConsentCategories(
    categoryDescriptions.requiredConsents,
    requiredConsents,
    consentGroups.requiredConsents,
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

  const consentGroups = buildConsentGroups(contentSource as ContentSource);

  consentGroups.requiredConsents.forEach((group) => {
    if (group.consents) {
      required = group.consents.map((consent) => consent.id);
    }
  });
  consentGroups.optionalConsents.forEach((group) => {
    if (group.consents) {
      optional = group.consents.map((consent) => consent.id);
    }
  });

  return {
    required,
    optional,
  };
}
