import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderActionBar } from '.';
import { HeaderWrapper } from '../../../../utils/test-utils';
import { DEFAULT_LANGUAGE, LanguageOption, useActiveLanguage } from '../../LanguageContext';
import { Header } from '../../Header';
import { Link } from '../../../link/Link';
import { Logo, logoFi, logoSv } from '../../../logo';

type StrFn = (str: string) => string;

const languages: LanguageOption[] = [
  { label: 'Suomi', value: 'fi' },
  { label: 'Svenska', value: 'sv' },
  { label: 'English', value: 'en' },
];

const getLanguageLabelByValue: StrFn = (val) => languages.find((obj) => obj.value === val)?.label || '';
const ariaLabel = 'LanguageSelectorAriaLabel';
const h3Text = 'Dropdown heading';
const linkText = 'Selkosuomi';

const LogoWithLanguageCheck = () => {
  const lang = useActiveLanguage();
  const src = lang === 'sv' ? logoSv : logoFi;
  return <Logo src={src} dataTestId="action-bar-logo" alt="Helsingin kaupunki" />;
};

const HeaderWithActionBar = ({ onDidChangeLanguage }) => {
  return (
    <Header onDidChangeLanguage={onDidChangeLanguage} languages={languages}>
      <Header.ActionBar title="Otsake" logo={<LogoWithLanguageCheck />}>
        <Header.LanguageSelector ariaLabel={ariaLabel}>
          <h3>{h3Text}</h3>
          <Link external href="www.example.com">
            {linkText}
          </Link>
        </Header.LanguageSelector>
      </Header.ActionBar>
    </Header>
  );
};

describe('<HeaderActionBar /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <HeaderActionBar
        title="Test"
        logo={<Logo src="dummySrc" dataTestId="action-bar-logo" alt="Helsingin kaupunki" />}
      />,
      { wrapper: HeaderWrapper },
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <HeaderActionBar
        title="Test"
        logo={<Logo src="dummySrc" dataTestId="action-bar-logo" alt="Helsingin kaupunki" />}
      />,
      { wrapper: HeaderWrapper },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has a language context that correctly dispatches language change events', async () => {
    const handleLanguageChange = jest.fn();

    render(HeaderWithActionBar({ onDidChangeLanguage: handleLanguageChange }));

    const getLogoSrc = () => {
      const logoElement = screen.getByTestId('action-bar-logo');
      return logoElement.getAttribute('src');
    };

    expect(handleLanguageChange.mock.calls.length).toBe(1);
    expect(handleLanguageChange.mock.calls[0][0]).toBe(DEFAULT_LANGUAGE);

    const text = getLanguageLabelByValue(DEFAULT_LANGUAGE);
    const svText = getLanguageLabelByValue('sv');
    const defaultLanguageButton = screen.getByText(text);
    const svButtonSpan = screen.getByText(svText);
    expect(getLogoSrc()).toBe(logoFi);

    fireEvent.click(svButtonSpan);
    expect(handleLanguageChange.mock.calls.length).toBe(2);
    expect(handleLanguageChange.mock.calls[1][0]).toBe('sv');
    expect(getLogoSrc()).toBe(logoSv);

    fireEvent.click(defaultLanguageButton);
    expect(handleLanguageChange.mock.calls.length).toBe(3);
    expect(handleLanguageChange.mock.calls[2][0]).toBe(DEFAULT_LANGUAGE);
    expect(getLogoSrc()).toBe(logoFi);

    screen.getAllByLabelText(ariaLabel);
  });

  it('Language selector props and children are rendered', async () => {
    const handleLanguageChange = jest.fn();

    render(HeaderWithActionBar({ onDidChangeLanguage: handleLanguageChange }));

    expect(() => screen.getByLabelText(ariaLabel)).not.toThrow();
    expect(() => screen.getByText(h3Text)).not.toThrow();
    expect(() => screen.getByText(linkText)).not.toThrow();
  });
});
