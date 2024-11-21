import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import { HeaderActionBar } from '.';
import { HeaderWrapper } from '../../../../utils/test-utils';
import { DEFAULT_LANGUAGE, LanguageOption, useActiveLanguage } from '../../LanguageContext';
import { Header } from '../../Header';
import { Logo, logoFi, logoSv } from '../../../logo';
import { getElementAttributesMisMatches, getCommonElementTestProps } from '../../../../utils/testHelpers';

type StrFn = (str: string) => string;

const languages: LanguageOption[] = [
  { label: 'Suomi', value: 'fi' },
  { label: 'Svenska', value: 'sv' },
  { label: 'English', value: 'en' },
];

const getLanguageLabelByValue: StrFn = (val) => languages.find((obj) => obj.value === val)?.label || '';

const LogoWithLanguageCheck = () => {
  const lang = useActiveLanguage();
  const src = lang === 'sv' ? logoSv : logoFi;
  return <Logo src={src} data-testid="action-bar-logo" alt="Helsingin kaupunki" />;
};

const HeaderWithActionBar = ({ onDidChangeLanguage }) => {
  return (
    <Header onDidChangeLanguage={onDidChangeLanguage} languages={languages}>
      <Header.ActionBar title="Otsake" logo={<LogoWithLanguageCheck />} frontPageLabel="Etusivu" titleHref="#">
        <Header.LanguageSelector />
      </Header.ActionBar>
    </Header>
  );
};

describe('<HeaderActionBar /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <HeaderActionBar
        title="Test"
        logo={<Logo src="dummySrc" data-testid="action-bar-logo" alt="Helsingin kaupunki" />}
        frontPageLabel="Etusivu"
        titleHref="#"
      />,
      { wrapper: HeaderWrapper },
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <HeaderActionBar
        title="Test"
        logo={<Logo src="dummySrc" data-testid="action-bar-logo" alt="Helsingin kaupunki" />}
        frontPageLabel="Etusivu"
        titleHref="#"
      />,
      { wrapper: HeaderWrapper },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('native html props are passed to the element', async () => {
    const divProps = getCommonElementTestProps('div');
    // check that removed specific "role" props is still added in ...rest
    divProps.role = 'role';
    const { getByTestId } = render(
      <HeaderActionBar
        {...divProps}
        title="Test"
        logo={<Logo src="dummySrc" data-testid="action-bar-logo" alt="Helsingin kaupunki" />}
        frontPageLabel="Etusivu"
        titleHref="#"
      />,
      { wrapper: HeaderWrapper },
    );
    const element = getByTestId(divProps['data-testid']);
    expect(getElementAttributesMisMatches(element, divProps)).toHaveLength(0);
  });

  it('has a language context that correctly dispatches language change events', async () => {
    const handleLanguageChange = jest.fn();

    render(HeaderWithActionBar({ onDidChangeLanguage: handleLanguageChange }));

    const getLogoSrc = () => {
      const logoElement = screen.getByTestId('action-bar-logo');
      return logoElement.getAttribute('src');
    };

    expect(handleLanguageChange.mock.calls.length).toBe(0);

    const text = getLanguageLabelByValue(DEFAULT_LANGUAGE);
    const svText = getLanguageLabelByValue('sv');
    const defaultLanguageButton = screen.getByText(text);
    const svButtonSpan = screen.getByText(svText);
    expect(getLogoSrc()).toBe(logoFi);

    fireEvent.click(svButtonSpan);
    expect(handleLanguageChange.mock.calls.length).toBe(1);
    expect(handleLanguageChange.mock.calls[0][0]).toBe('sv');
    expect(getLogoSrc()).toBe(logoSv);

    fireEvent.click(defaultLanguageButton);
    expect(handleLanguageChange.mock.calls.length).toBe(2);
    expect(handleLanguageChange.mock.calls[1][0]).toBe(DEFAULT_LANGUAGE);
    expect(getLogoSrc()).toBe(logoFi);
  });
});
