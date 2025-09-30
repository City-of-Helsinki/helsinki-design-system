import { appendTexts, createTextProvider, defaultTexts, getNumberedVariationsTextKey, getTextKey } from './texts';
import { SelectDataHandlers, SelectMetaData, TextProvider, Texts } from './types';
import { TextInterpolationContent, Option } from '../modularOptionList/types';
// eslint-disable-next-line jest/no-mocks-import
import {
  mockUseSelectDataHandlersContents,
  resetAllMocks,
  updateMockMetaData,
} from './hooks/__mocks__/useSelectDataHandlers';
import { validateOption } from '../modularOptionList/utils';

describe('texts', () => {
  let dataHandlers: SelectDataHandlers;
  const dummyTextProvider: TextProvider = (key) => {
    return key;
  };
  const getDataHandlers = () => {
    return mockUseSelectDataHandlersContents as SelectDataHandlers;
  };

  // metaData.textContent is created when getTextKey is called and it does not exist yet.
  const getTextInterpolationContent = (textProvider: TextProvider): TextInterpolationContent => {
    const metaData = dataHandlers.getMetaData();
    // remove possible old version
    metaData.textContent = undefined;
    updateMockMetaData({
      textProvider,
    });
    getTextKey('assistive', metaData);
    return metaData.textContent as unknown as TextInterpolationContent;
  };

  beforeEach(() => {
    resetAllMocks();
    dataHandlers = getDataHandlers();
  });

  describe('createTextProvider() returns a function for getting texts', () => {
    it('If a function is passed, it is not altered', () => {
      const textProvider = createTextProvider(dummyTextProvider);
      const content = getTextInterpolationContent(textProvider);
      expect(createTextProvider(dummyTextProvider)).toBe(dummyTextProvider);
      expect(textProvider('tagsShowAllButtonAriaLabel', content)).toBe('tagsShowAllButtonAriaLabel');
      expect(textProvider('error', content)).toBe('error');
    });
    it('If an object is passed, a textProvider function is returned which returns values from given texts or default texts.', () => {
      const texts: Partial<Texts> = {
        label: 'label',
        assistive: 'assistive',
        language: 'en',
      };
      const textProvider = createTextProvider(texts);
      const content = getTextInterpolationContent(textProvider);
      expect(textProvider('label', content)).toBe(texts.label);
      expect(textProvider('assistive', content)).toBe(texts.assistive);
      expect(textProvider('error', content)).toBe('');
      expect(textProvider('placeholder', content)).toBe(defaultTexts.en.placeholder);
    });
    it('Object\'s "language" prop defines which default texts are used', () => {
      const texts: Partial<Texts> = {
        language: 'sv',
      };
      const textProvider = createTextProvider(texts);
      const content = getTextInterpolationContent(textProvider);
      expect(textProvider('label', content)).toBe(defaultTexts.sv.label);
      expect(textProvider('placeholder', content)).toBe(defaultTexts.sv.placeholder);
    });
  });
  describe('TextProvider returns', () => {
    it('interpolated values', () => {
      const texts: Partial<Texts> = {
        label: 'Before{{selectionCount}}After{{}}',
        assistive: undefined,
        error: '{{unknown}}',
        language: 'en',
      };
      const textProvider = createTextProvider(texts);
      updateMockMetaData({ selectedOptions: [validateOption({})] });
      const content = getTextInterpolationContent(textProvider);
      expect(textProvider('label', content)).toBe('Before1After');
      expect(textProvider('selectedOptionsCount_one', content)).toBe('1 selected option');
      expect(textProvider('error', content)).toBe('undefined');
    });
  });
  describe('appendTexts() creates a new textProvider', () => {
    const initTests = () => {
      getTextInterpolationContent(createTextProvider(dummyTextProvider));
      const metaData = dataHandlers.getMetaData();
      const { textProvider, textContent } = metaData;
      return {
        metaData,
        textProvider,
        textContent: textContent as TextInterpolationContent,
      };
    };
    it('The function sets new TextProvider to metaData', () => {
      const { metaData, textProvider, textContent } = initTests();
      expect(textProvider('label', textContent)).toBe('label');
      expect(textProvider('placeholder', textContent)).toBe('placeholder');
      expect(textProvider('error', textContent)).toBe('error');

      appendTexts({ label: 'newLabel' }, metaData);
      expect(dataHandlers.getMetaData().textProvider('label', textContent)).toBe('newLabel');

      appendTexts({ label: '' }, metaData);
      expect(dataHandlers.getMetaData().textProvider('label', textContent)).toBe('');
      expect(dataHandlers.getMetaData().textProvider('placeholder', textContent)).toBe('placeholder');
      expect(dataHandlers.getMetaData().textProvider('error', textContent)).toBe('error');

      appendTexts({ error: 'newError' }, metaData);
      expect(dataHandlers.getMetaData().textProvider('label', textContent)).toBe('');
      expect(dataHandlers.getMetaData().textProvider('placeholder', textContent)).toBe('placeholder');
      expect(dataHandlers.getMetaData().textProvider('error', textContent)).toBe('newError');
    });
  });
  describe('getNumberedVariationsTextKey() compares given data returns variating text', () => {
    const textProvider = createTextProvider(defaultTexts.en);
    const option = validateOption('Option');
    const noSelectedOptions: Option[] = [];
    const oneSelectedOption: Option[] = [option];
    const multipleSelectedOptions: Option[] = [option, option, option];
    it('Source for the numeral must be set as "numberIndicator" or "selectionCount"', () => {
      expect(
        getNumberedVariationsTextKey(
          'selectedOptionsCount',
          { textProvider, selectedOptions: noSelectedOptions } as SelectMetaData,
          'selectionCount',
          {
            numberIndicator: 1,
          },
        ),
      ).toBe('0 selected options');
      expect(
        getNumberedVariationsTextKey(
          'selectedOptionsCount',
          { textProvider, selectedOptions: oneSelectedOption } as SelectMetaData,
          'selectionCount',
          {
            numberIndicator: 0,
          },
        ),
      ).toBe('1 selected option');
      expect(
        getNumberedVariationsTextKey(
          'selectedOptionsCount',
          { textProvider, selectedOptions: multipleSelectedOptions } as SelectMetaData,
          'selectionCount',
          {
            numberIndicator: 0,
          },
        ),
      ).toBe('3 selected options');

      expect(
        getNumberedVariationsTextKey(
          'choiceCount',
          { textProvider, selectedOptions: noSelectedOptions } as SelectMetaData,
          'numberIndicator',
          {
            numberIndicator: 1,
          },
        ),
      ).toBe('One choice.');

      expect(
        getNumberedVariationsTextKey(
          'choiceCount',
          { textProvider, selectedOptions: oneSelectedOption } as SelectMetaData,
          'numberIndicator',
          {
            numberIndicator: 2,
          },
        ),
      ).toBe('2 choices.');
    });
    it('If matching translation is not found, empty string is returned', () => {
      expect(
        getNumberedVariationsTextKey(
          'choiceCount',
          { textProvider, selectedOptions: oneSelectedOption } as SelectMetaData,
          'numberIndicator',
          {
            numberIndicator: 0,
          },
        ),
      ).toBe('');
      expect(
        getNumberedVariationsTextKey(
          'choiceCount',
          { textProvider, selectedOptions: oneSelectedOption } as SelectMetaData,
          'numberIndicator',
          {},
        ),
      ).toBe('');
    });
  });
});
