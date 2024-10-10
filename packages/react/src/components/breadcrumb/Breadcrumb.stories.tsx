import React from 'react';

import { Header } from '../header/Header';
import { Breadcrumb, BreadcrumbProps } from './Breadcrumb';
import { Link } from '../link';
import { LanguageOption } from '../header/LanguageContext';
import { Container } from '../container/Container';
import { Logo, logoFi } from '../logo';

export default {
  component: Breadcrumb,
  title: 'Components/Breadcrumb',
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
  },
  args: {
    'aria-label': 'Breadcrumb',
    list: [
      { title: 'Front page', path: '/' },
      { title: 'Health and social services', path: '/path' },
      { title: 'Senior services ', path: '/path/2ndLevelPath' },
      { title: 'Informal care', path: '/path/2ndLevelPath/3rdLevelPath' },
      { title: 'Care options', path: null },
    ],
  },
};

const languages: LanguageOption[] = [
  { label: 'Suomi', value: 'fi' },
  { label: 'Svenska', value: 'sv' },
  { label: 'English', value: 'en' },
];

export const Example = (args: BreadcrumbProps) => <Breadcrumb {...args} />;

export const ExampleInHeader = (args: BreadcrumbProps) => {
  return (
    <>
      <Header languages={languages}>
        <Header.ActionBar
          title="Helsingin kaupunki"
          titleAriaLabel="Helsingin kaupunki"
          titleHref="https://hel.fi"
          logoAriaLabel="Service logo"
          logoHref="https://hel.fi"
          logo={<Logo src={logoFi} alt="Helsingin kaupunki" />}
          menuButtonAriaLabel="Menu"
          frontPageLabel="Etusivu"
        >
          <Header.LanguageSelector aria-label="Kielen valinta">
            <h3>Tietoa muilla kielillä</h3>
            <Link external href="www.example.com">
              Selkosuomi
            </Link>
            <Link external href="www.example.com">
              Viittomakieli
            </Link>
          </Header.LanguageSelector>
        </Header.ActionBar>
        <Header.NavigationMenu>
          <Header.Link
            href="#"
            label="Health and social services"
            onClick={(event) => event.preventDefault()}
            active
            dropdownLinks={[
              <Header.Link
                href="#"
                label="Senior services"
                active
                dropdownLinks={[
                  <Header.Link href="#" label="Informal care" active />,
                  <Header.Link href="#" label="Senior centres" />,
                  <Header.Link href="#" label="Home care" />,
                ]}
              />,
              <Header.Link
                href="#"
                label="Data and the rights of the client"
                dropdownLinks={[
                  <Header.Link href="#" label="Requesting client data" />,
                  <Header.Link href="#" label="Fees" />,
                ]}
              />,
            ]}
          />
          <Header.Link href="#" label="Child and family services" />
        </Header.NavigationMenu>
      </Header>
      <Container alignWithHeader>
        <Breadcrumb
          {...args}
          theme={{
            '--horizontal-margin-small': '0',
            '--horizontal-margin-medium': '0',
            '--horizontal-margin-large': '0',
            '--horizontal-margin-x-large': '0',
          }}
        />
      </Container>
    </>
  );
};

ExampleInHeader.storyName = 'Breadcrumb in header';

export const LastItemIsLink = (args: BreadcrumbProps) => (
  <Breadcrumb
    {...args}
    list={[
      { title: 'Front page', path: '/' },
      { title: 'Health and social services', path: '/path' },
      { title: 'Senior services ', path: '/path/2ndLevelPath' },
      { title: 'Informal care', path: '/path/2ndLevelPath/3rdLevelPath' },
      { title: 'Care options', path: '/path/2ndLevelPath/3rdLevelPath/currentPage' },
    ]}
  />
);

LastItemIsLink.storyName = 'Last item a link';

export const WithCustomTheme = (args: BreadcrumbProps) => (
  <Breadcrumb
    {...args}
    theme={{
      '--horizontal-margin-small': 'var(--spacing-layout-s)',
      '--horizontal-margin-medium': 'var(--spacing-layout-m)',
      '--horizontal-margin-large': 'var(--spacing-layout-l)',
      '--horizontal-margin-x-large': 'var(--spacing-layout-xl)',
    }}
  />
);

WithCustomTheme.storyName = 'With custom theme';
