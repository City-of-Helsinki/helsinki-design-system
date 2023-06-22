import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderActionBar } from '.';
import { HeaderWrapper } from '../../../../utils/test-utils';
import { DEFAULT_LANGUAGE, LanguageOption } from '../../../../context/languageContext';
import { Header } from '../../Header';

const languages: LanguageOption[] = [
  { label: 'Suomi', value: 'fi' },
  { label: 'Svenska', value: 'sv' },
  { label: 'English', value: 'en' },
];

type StrFn = (string) => string;

const getLanguageLabelByValue: StrFn = (val) => languages.find((obj) => obj.value === val)?.label || '';

const HeaderWithActionBar = ({ onDidChangeLanguage }) => {
  return (
    <Header onDidChangeLanguage={onDidChangeLanguage}>
      <Header.ActionBar title="Otsake">
        <Header.NavigationLanguageSelector languages={languages} />
      </Header.ActionBar>
    </Header>
  );
};

describe('<HeaderActionBar /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<HeaderActionBar title="Test" />, { wrapper: HeaderWrapper });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<HeaderActionBar title="Test" />, { wrapper: HeaderWrapper });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has a language context that correctly dispatches language change events', () => {
    const handleLanguageChange = jest.fn();

    const getLogoTitle = () => {
      const logoElement = screen.getByTestId('action-bar-logo');
      const title = logoElement.getAttribute('title');
      return title;
    };

    render(<HeaderWithActionBar onDidChangeLanguage={handleLanguageChange} />);

    expect(handleLanguageChange.mock.calls.length).toBe(1);
    expect(handleLanguageChange.mock.calls[0][0]).toBe(DEFAULT_LANGUAGE);

    const text = getLanguageLabelByValue(DEFAULT_LANGUAGE);
    const svText = getLanguageLabelByValue('sv');
    const defaultLanguageButton = screen.getByText(text);
    const svButtonSpan = screen.getByText(svText);

    fireEvent.click(svButtonSpan);
    expect(handleLanguageChange.mock.calls.length).toBe(2);
    expect(handleLanguageChange.mock.calls[1][0]).toBe('sv');
    expect(getLogoTitle()).toBe('Helsingfors stad');

    fireEvent.click(defaultLanguageButton);
    expect(handleLanguageChange.mock.calls.length).toBe(3);
    expect(handleLanguageChange.mock.calls[2][0]).toBe(DEFAULT_LANGUAGE);
    expect(getLogoTitle()).toBe('Helsingin kaupunki');
  });
});
