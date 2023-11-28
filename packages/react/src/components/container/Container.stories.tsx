import React from 'react';

import { Container } from './Container';
import { Header } from '../header';
import { Logo, logoFi } from '../logo';
import { IconUser } from '../../icons';

export default {
  component: Container,
  title: 'Components/Container',
  args: {},
};

export const Example = (args) => (
  <Container {...args}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </Container>
);

export const AlignsWithHeader = (args) => {
  return (
    <>
      <Header>
        <Header.UniversalBar primaryLinkText="City of Helsinki" primaryLinkHref="#">
          <Header.Link href="#news" label="News" />
          <Header.Link href="#online" label="Online" />
          <Header.Link href="#feedback" label="Feedback" />
        </Header.UniversalBar>
        <Header.ActionBar
          frontPageLabel="Frontpage"
          title="City of Helsinki"
          titleAriaLabel="City of Helsinki"
          titleHref="https://hel.fi"
          logo={<Logo src={logoFi} alt="Service Logo" />}
        >
          <Header.ActionBarItem
            label="Login"
            fixedRightPosition
            icon={<IconUser />}
            id="action-bar-login"
            closeLabel="Close"
          >
            <h3>Tempor incididunt ut labore et dolore</h3>
          </Header.ActionBarItem>
        </Header.ActionBar>
        <Header.NavigationMenu>
          <Header.Link
            label="Sosiaali ja terveyspalvelut"
            onClick={(event) => {
              event.preventDefault();
            }}
          />
          <Header.Link
            label="kasvatus ja koulutus"
            onClick={(event) => {
              event.preventDefault();
            }}
          />
        </Header.NavigationMenu>
      </Header>
      <Container {...args}>
        <h1>Duis aute irure dolor in reprehenderit</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </Container>
    </>
  );
};

AlignsWithHeader.argTypes = {
  alignWithHeader: {
    defaultValue: true,
    control: 'boolean',
  },
};

AlignsWithHeader.parameters = {
  layout: 'fullscreen',
};
