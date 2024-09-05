import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import {
  DEFAULT_LANGUAGE,
  LanguageOption,
  LanguageProvider,
  LanguageProviderProps,
  useActiveLanguage,
} from '../../LanguageContext';
import { Link } from '../../../link/Link';
import {
  HeaderLanguageSelector,
  HeaderLanguageSelectorConsumer,
  LanguageButton,
  LanguageSelectorProps,
  SimpleLanguageOptions,
} from './HeaderLanguageSelector';
import { HeaderActionBar } from '../headerActionBar/HeaderActionBar';
import { Logo } from '../../../logo/Logo';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';

type StrFn = (str: string) => string;
type TestScenarioProps = LanguageProviderProps &
  LanguageSelectorProps & {
    doNotRenderMenuItems?: boolean;
    renderActiveLanguage?: boolean;
    consumerOnly?: boolean;
  };

const defaultLanguages: LanguageOption[] = [
  { label: 'Suomi', value: 'fi', isPrimary: true },
  { label: 'Svenska', value: 'sv', isPrimary: true },
  { label: 'English', value: 'en', isPrimary: true },
  { label: 'Spanish', value: 'es', isPrimary: false },
  { label: 'Norway', value: 'no', isPrimary: false },
];

const getLanguageLabelByValue: StrFn = (val) => defaultLanguages.find((obj) => obj.value === val)?.label || '';
const handleLanguageChange = jest.fn();

const ariaLabel = 'LanguageSelectorAriaLabel';
const menuH4 = 'Dropdown heading';
const linkText = 'Selkosuomi';
const menuTestId = 'menu-content';
const activeLanguageTestId = 'active-language';

const MenuContent = () => {
  return (
    <li>
      <div data-testid={menuTestId}>
        <h4>{menuH4}</h4>
        <Link external href="www.example.com">
          {linkText}
        </Link>
      </div>
    </li>
  );
};

const RenderActiveLanguage = () => {
  const activeLanguage = useActiveLanguage();
  return <span data-testid={activeLanguageTestId}>{activeLanguage}</span>;
};

const getActiveLanguage = () => {
  const container = screen.getByTestId(activeLanguageTestId) as HTMLElement;
  return container.innerHTML;
};

const fireLanguageChangeEvent = (languageCode: string) => {
  const buttonText = getLanguageLabelByValue(languageCode);
  const button = screen.getByText(buttonText);
  fireEvent.click(button);
};

const RenderTestScenario = ({
  onDidChangeLanguage,
  languages = defaultLanguages,
  defaultLanguage = DEFAULT_LANGUAGE,
  doNotRenderMenuItems = false,
  renderActiveLanguage = false,
  consumerOnly = false,
  ...rest
}: TestScenarioProps) => {
  return (
    <LanguageProvider onDidChangeLanguage={onDidChangeLanguage} defaultLanguage={defaultLanguage} languages={languages}>
      {renderActiveLanguage && <RenderActiveLanguage />}
      {!consumerOnly ? (
        <HeaderActionBar
          title="Otsake"
          titleAriaLabel="Otsake"
          frontPageLabel="Etusivu"
          titleHref="https://hel.fi"
          logo={<Logo src="dummySrc" data-testid="action-bar-logo" alt="Helsingin kaupunki" />}
        >
          <HeaderLanguageSelector {...rest}>{!doNotRenderMenuItems && <MenuContent />}</HeaderLanguageSelector>
        </HeaderActionBar>
      ) : (
        <HeaderLanguageSelectorConsumer aria-label={ariaLabel}>
          {!doNotRenderMenuItems && <MenuContent />}
        </HeaderLanguageSelectorConsumer>
      )}
    </LanguageProvider>
  );
};

const LanguageSelectorWithActionBar = (props: TestScenarioProps) => {
  return RenderTestScenario({ ...props, consumerOnly: false });
};

const LanguageSelectorConsumerOnly = (props: TestScenarioProps) => {
  return RenderTestScenario({ ...props, consumerOnly: true });
};

describe('<Header.LanguageSelector /> spec', () => {
  beforeEach(() => {
    handleLanguageChange.mockClear();
  });

  it('renders the consumer component correctly', () => {
    const { asFragment } = render(<LanguageSelectorConsumerOnly />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the consumer component with props and children passed from the LanguageSelector', () => {
    const { asFragment } = render(<LanguageSelectorWithActionBar aria-label={ariaLabel} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<LanguageSelectorConsumerOnly />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    // aria-label goes to a descendant in HeaderActionBarItem
    divProps['aria-label'] = undefined;
    const { getByTestId } = render(<LanguageSelectorWithActionBar {...divProps} />);
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });

  it('Native html props are passed to the SimpleLanguageOptions element', async () => {
    const divProps = getCommonElementTestProps('div');
    // "." is added to aria-label inside the component if missing.
    divProps['aria-label'] = `${divProps['aria-label']}.`;
    const { getByTestId } = render(
      <SimpleLanguageOptions
        languages={[defaultLanguages[0], defaultLanguages[1], defaultLanguages[2]]}
        {...divProps}
      />,
    );
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });

  it('native html props are passed to the LanguageButton element', async () => {
    const buttonProps = getCommonElementTestProps<'button', { value: string }>('button', { 'aria-label': ariaLabel });
    // aria-label is passed to button
    buttonProps['aria-label'] = `${buttonProps['aria-label']}.`;
    const { getByTestId } = render(<LanguageButton {...defaultLanguages[0]} {...buttonProps} />);
    const element = getByTestId(buttonProps['data-testid']);
    expect(getElementAttributesMisMatches(element, buttonProps)).toHaveLength(0);
  });

  it('Language selector props and children are rendered by the consumers', async () => {
    render(<LanguageSelectorWithActionBar aria-label={ariaLabel} />);

    expect(() => screen.getByLabelText(ariaLabel)).not.toThrow();
    expect(() => screen.getByText(menuH4)).not.toThrow();
    expect(() => screen.getByText(linkText)).not.toThrow();
  });

  it('Clicking buttons changes the selected language', async () => {
    render(LanguageSelectorWithActionBar({ onDidChangeLanguage: handleLanguageChange, renderActiveLanguage: true }));

    expect(handleLanguageChange.mock.calls.length).toBe(0);
    expect(getActiveLanguage()).toBe(DEFAULT_LANGUAGE);

    fireLanguageChangeEvent('sv');
    expect(handleLanguageChange.mock.calls.length).toBe(1);
    expect(handleLanguageChange.mock.calls[0][0]).toBe('sv');
    expect(getActiveLanguage()).toBe('sv');

    fireLanguageChangeEvent(DEFAULT_LANGUAGE);
    expect(handleLanguageChange.mock.calls.length).toBe(2);
    expect(handleLanguageChange.mock.calls[1][0]).toBe(DEFAULT_LANGUAGE);
    expect(getActiveLanguage()).toBe(DEFAULT_LANGUAGE);
  });
});
