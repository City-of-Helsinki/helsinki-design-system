import React, { useState } from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';

import {
  DEFAULT_LANGUAGE,
  LanguageOption,
  LanguageProvider,
  LanguageProviderProps,
  useActiveLanguage,
  useAvailableLanguages,
  useSetAvailableLanguages,
  useSetLanguage,
} from './LanguageContext';

type TestScenarioProps = LanguageProviderProps & { listDefault?: boolean };

const defaultLanguages: LanguageOption[] = [
  { label: 'Suomi', value: 'fi' },
  { label: 'Svenska', value: 'sv' },
];
const newLanguages: LanguageOption[] = [
  { label: 'AF', value: 'af' },
  { label: 'DE', value: 'de' },
];
const allLanguageOptions = [...defaultLanguages, ...newLanguages];

const getLanguageLabelByValue = (val: string) => allLanguageOptions.find((obj) => obj.value === val)?.label || '';
const listLanguageCodes = (languages: LanguageOption[]) => languages.map((language) => language.value).join(',');
const handleLanguageChange = jest.fn();
const activeLanguageTestId = 'active-language';
const availableLanguagesTestId = 'available-languages';
const setNewLanguagesButtonTestId = 'set-languages-button';
const reRenderButtonTestId = 're-render-button';
const renderCounterTestId = 'render-count';
const renderTimeTestId = 'render-time';

const RenderActiveLanguage = () => {
  const activeLanguage = useActiveLanguage();
  return <span data-testid={activeLanguageTestId}>{activeLanguage}</span>;
};

const RenderUpdateTime = () => {
  return <span data-testid={renderTimeTestId}>{Date.now()}</span>;
};

const RenderAvailableLanguageCodes = () => {
  const languages = useAvailableLanguages();
  return <span data-testid={availableLanguagesTestId}>{listLanguageCodes(languages)}</span>;
};

const RenderAvailableLanguagesSetter = () => {
  const setNewLanguages = useSetAvailableLanguages();
  return (
    <button data-testid={setNewLanguagesButtonTestId} onClick={() => setNewLanguages(newLanguages)} type="button">
      Set languages
    </button>
  );
};

const LanguageChanger = ({ listDefault = true }: { listDefault?: boolean } = {}) => {
  const setLanguage = useSetLanguage();
  const list = listDefault ? defaultLanguages : useAvailableLanguages();
  const LanguageSelector = ({ value, label }: LanguageOption) => {
    return (
      <button lang={value} onClick={() => setLanguage(value)} type="button">
        {label}
      </button>
    );
  };
  return (
    <div id="language-changer">
      {list.map(({ value, label }) => {
        return <LanguageSelector key={value} value={value} label={label} />;
      })}
      <RenderActiveLanguage />
      <RenderAvailableLanguageCodes />
      <RenderAvailableLanguagesSetter />
      <RenderUpdateTime />
    </div>
  );
};

const TestScenario = ({
  onDidChangeLanguage = handleLanguageChange,
  languages = defaultLanguages,
  defaultLanguage,
  listDefault = true,
}: TestScenarioProps) => {
  const [renderCount, setRenderCount] = useState(0);
  const forceRender = () => {
    setRenderCount((n) => n + 1);
  };
  return (
    <div id="test-scenario">
      <LanguageProvider
        onDidChangeLanguage={onDidChangeLanguage}
        defaultLanguage={defaultLanguage}
        languages={languages}
      >
        <LanguageChanger listDefault={listDefault} />
      </LanguageProvider>
      <button data-testid={reRenderButtonTestId} onClick={() => forceRender()} type="button">
        Re-render
      </button>
      <span data-testid={renderCounterTestId}>{renderCount}</span>
    </div>
  );
};

const renderTestScenario = (props: TestScenarioProps = {}) => {
  const renderResult = render(<TestScenario {...props} />);
  const { getByText, getByTestId } = renderResult;

  const clickButton = (buttonEl?: HTMLElement) => {
    if (!buttonEl) {
      throw new Error('No element for clickButton');
    }
    fireEvent.click(buttonEl as HTMLButtonElement);
  };

  const fireLanguageChangeEvent = (languageCode: string) => {
    const buttonText = getLanguageLabelByValue(languageCode);
    clickButton(getByText(buttonText));
  };

  const getActiveLanguage = () => {
    const container = getByTestId(activeLanguageTestId) as HTMLElement;
    return container.innerHTML;
  };
  const getRenderCount = () => {
    return (getByTestId(renderCounterTestId) as HTMLElement).innerHTML;
  };

  const getRenderTime = () => {
    return (getByTestId(renderTimeTestId) as HTMLElement).innerHTML;
  };

  const reRender = async () => {
    const currentCount = getRenderCount();
    clickButton(getByTestId(reRenderButtonTestId));
    await waitFor(() => {
      if (getRenderCount() === currentCount) {
        throw new Error('Not updated');
      }
    });
  };
  // this will always resolve, so catchig is not required
  const createReRenderChecker = async (initializer: () => void) => {
    const lastRenderTime = getRenderTime();
    initializer();
    return new Promise((resolve) => {
      waitFor(
        () => {
          if (getRenderTime() === lastRenderTime) {
            throw new Error('Not re-rendered');
          }
        },
        { timeout: 1000 },
      )
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  };

  return {
    ...renderResult,
    fireLanguageChangeEvent,
    getActiveLanguage,
    reRender,
    clickButton,
    createReRenderChecker,
  };
};

describe('<LanguageContext />', () => {
  beforeEach(() => {
    handleLanguageChange.mockClear();
  });
  afterEach(() => {
    cleanup();
  });

  it('Sets the defaultLanguage to DEFAULT_LANGUAGE by default. onDidChangeLanguage is not called', async () => {
    const { getActiveLanguage } = renderTestScenario();
    expect(getActiveLanguage()).toBe(DEFAULT_LANGUAGE);
    expect(handleLanguageChange.mock.calls.length).toBe(0);
  });

  it('Sets the defaultLanguage to given language', async () => {
    const newDefault = 'no';
    const { getActiveLanguage, reRender } = renderTestScenario({ defaultLanguage: newDefault });
    expect(getActiveLanguage()).toBe(newDefault);
    await reRender();
    expect(getActiveLanguage()).toBe(newDefault);
    expect(handleLanguageChange.mock.calls.length).toBe(0);
  });

  it("useSetLanguage changes the language and re-render won't change it back to default", async () => {
    const { fireLanguageChangeEvent, getActiveLanguage, reRender } = renderTestScenario();

    expect(handleLanguageChange.mock.calls.length).toBe(0);

    const svCode = 'sv';
    fireLanguageChangeEvent(svCode);
    expect(handleLanguageChange.mock.calls.length).toBe(1);
    expect(handleLanguageChange.mock.calls[0][0]).toBe(svCode);
    expect(getActiveLanguage()).toBe(svCode);

    await reRender();

    expect(getActiveLanguage()).toBe(svCode);
    fireLanguageChangeEvent(DEFAULT_LANGUAGE);
    expect(handleLanguageChange.mock.calls.length).toBe(2);
    expect(handleLanguageChange.mock.calls[1][0]).toBe(DEFAULT_LANGUAGE);
    expect(getActiveLanguage()).toBe(DEFAULT_LANGUAGE);
  });

  it("Selecting same language again won't trigger a re-render or onDidChangeLanguage", async () => {
    const { fireLanguageChangeEvent, createReRenderChecker } = renderTestScenario();

    expect(handleLanguageChange.mock.calls.length).toBe(0);

    const willNotRender = await createReRenderChecker(() => fireLanguageChangeEvent(DEFAULT_LANGUAGE));
    expect(willNotRender).toBeFalsy();
    expect(handleLanguageChange.mock.calls.length).toBe(0);

    const svCode = 'sv';
    const willRender = await createReRenderChecker(() => fireLanguageChangeEvent(svCode));
    expect(willRender).toBeTruthy();
    expect(handleLanguageChange.mock.calls.length).toBe(1);

    const willNotRenderEither = await createReRenderChecker(() => fireLanguageChangeEvent(svCode));
    expect(willNotRenderEither).toBeFalsy();
    expect(handleLanguageChange.mock.calls.length).toBe(1);
  });

  it('useAvailableLanguages lists all languages', async () => {
    const { getByTestId } = renderTestScenario();
    const list = getByTestId(availableLanguagesTestId) as HTMLElement;
    expect(list.innerHTML).toBe(listLanguageCodes(defaultLanguages));
  });

  it('useSetAvailableLanguages changes languages and new language can be selected.', async () => {
    const { getByTestId, fireLanguageChangeEvent, getActiveLanguage, clickButton } = renderTestScenario({
      listDefault: false,
    });
    clickButton(getByTestId(setNewLanguagesButtonTestId));
    await waitFor(() => {
      const list = getByTestId(availableLanguagesTestId) as HTMLElement;
      expect(list.innerHTML).toBe(listLanguageCodes(newLanguages));
    });
    const newSelection = newLanguages[0].value;
    fireLanguageChangeEvent(newSelection);
    expect(handleLanguageChange.mock.calls.length).toBe(1);
    expect(handleLanguageChange.mock.calls[0][0]).toBe(newSelection);
    expect(getActiveLanguage()).toBe(newSelection);
  });
});
