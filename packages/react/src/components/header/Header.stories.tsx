import React from 'react';

import { Header } from './Header';
import { HeaderUniversalBar } from './components/headerUniversalBar/HeaderUniversalBar';
import { NavigationLink } from './components/navigationLink/NavigationLink';
import { HeaderNavigationMenu } from './components/headerNavigationMenu';
import { StoryWIPAlert } from '../../internal/storyWIPAlert/StoryWIPAlert';
import { DropdownDirection } from './components/navigationLink/types';
import { SkipToTheme } from './components/skipToContentLink';

export default {
  component: Header,
  title: 'Components/Header',
  subcomponents: {
    HeaderUniversalBar,
    HeaderNavigationMenu,
    NavigationLink,
  },
  parameters: {
    controls: { expanded: true },
  },
  args: {},
};

export const Example = (args) => (
  <>
    <StoryWIPAlert />
    <Header {...args}>Header</Header>
  </>
);

export const WithFullFeatures = (args) => (
  <>
    <StoryWIPAlert />
    <Header {...args}>
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <Header.NavigationLink href="#" label="Link 1" />
        <Header.NavigationLink href="#" label="Link 2" />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.UniversalBar>
      <Header.NavigationMenu>
        <Header.NavigationLink
          href="#"
          label="Link 1"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownDirection={DropdownDirection.Dynamic}
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownDirection={DropdownDirection.Dynamic}
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink
          href="#"
          label="Link 2"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownDirection={DropdownDirection.Dynamic}
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownDirection={DropdownDirection.Dynamic}
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink href="#" label="Link 3" />
        <Header.NavigationLink href="#" label="Link 3" />
        <Header.NavigationLink href="#" label="Link 3" />
        <Header.NavigationLink
          href="#"
          label="Link 2"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownDirection={DropdownDirection.Dynamic}
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownDirection={DropdownDirection.Dynamic}
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
      </Header.NavigationMenu>
    </Header>
  </>
);

export const WithUniversalBar = (args) => (
  <>
    <StoryWIPAlert />
    <Header {...args}>
      <Header.UniversalBar primaryLinkText="Helsingin kaupunki" primaryLinkHref="#">
        <Header.NavigationLink href="#" label="Link 1" />
        <Header.NavigationLink href="#" label="Link 2" />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.UniversalBar>
    </Header>
  </>
);

export const WithNavigationMenu = (args) => (
  <>
    <StoryWIPAlert />
    <Header {...args}>
      <Header.NavigationMenu>
        <Header.NavigationLink
          href="#"
          label="Link 1"
          onClick={(event) => event.preventDefault()}
          active
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownDirection={DropdownDirection.Dynamic}
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownDirection={DropdownDirection.Dynamic}
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink
          href="#"
          label="Link 2"
          dropdownLinks={[
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownDirection={DropdownDirection.Dynamic}
              active
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
            <Header.NavigationLink
              href="#"
              label="Test"
              dropdownDirection={DropdownDirection.Dynamic}
              dropdownLinks={[
                <Header.NavigationLink href="#" label="Nested" />,
                <Header.NavigationLink href="#" label="Nested" />,
              ]}
            />,
          ]}
        />
        <Header.NavigationLink href="#" label="Link 3" />
      </Header.NavigationMenu>
    </Header>
  </>
);

const theme: SkipToTheme = {
  '--background-color': 'var(--color-bus)',
  '--text-color': '#fff',
};

export const WithSkipToContent = (args) => (
  <>
    <StoryWIPAlert />
    <Header {...args} skipToId="#content" skipToLabel="skip to content" skipToTheme={theme}>
      Header
    </Header>
    <p>
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
      form, by injected humour, or randomised words which don t look even slightly believable. If you are going to use a
      passage of Lorem Ipsum, you need to be sure there isn t anything embarrassing hidden in the middle of text. All
      the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first
      true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
      sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always
      free from repetition, injected humour, or non-characteristic words etc.
    </p>
    <p>
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at
      its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
    </p>
    <p>
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
      form, by injected humour, or randomised words which don t look even slightly believable. If you are going to use a
      passage of Lorem Ipsum, you need to be sure there isn t anything embarrassing hidden in the middle of text. All
      the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first
      true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
      sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always
      free from repetition, injected humour, or non-characteristic words etc.
    </p>
    <p>
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at
      its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
      opposed to using{}
    </p>
    <p>
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
      form, by injected humour, or randomised words which don t look even slightly believable. If you are going to use a
      passage of Lorem Ipsum, you need to be sure there isn t anything embarrassing hidden in the middle of text. All
      the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first
      true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
      sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always
      free from repetition, injected humour, or non-characteristic words etc.
    </p>
    <p>
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at
      its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
      opposed to using{}
    </p>
    <p>
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
      form, by injected humour, or randomised words which don t look even slightly believable. If you are going to use a
      passage of Lorem Ipsum, you need to be sure there isn t anything embarrassing hidden in the middle of text. All
      the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first
      true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
      sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always
      free from repetition, injected humour, or non-characteristic words etc.
    </p>
    <p>
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at
      its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
      opposed to using{}
    </p>
    <p id="content">JUMP HERE</p>
    <p>
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at
      its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
      opposed to using{}
    </p>
    <p>
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
      form, by injected humour, or randomised words which don t look even slightly believable. If you are going to use a
      passage of Lorem Ipsum, you need to be sure there isn t anything embarrassing hidden in the middle of text. All
      the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first
      true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
      sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always
      free from repetition, injected humour, or non-characteristic words etc.
    </p>
    <p>
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at
      its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
      opposed to using{}
    </p>
    <p>
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
      form, by injected humour, or randomised words which don t look even slightly believable. If you are going to use a
      passage of Lorem Ipsum, you need to be sure there isn t anything embarrassing hidden in the middle of text. All
      the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first
      true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
      sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always
      free from repetition, injected humour, or non-characteristic words etc.
    </p>
    <p>
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at
      its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
      opposed to using{}
    </p>
    <p>
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
      form, by injected humour, or randomised words which don t look even slightly believable. If you are going to use a
      passage of Lorem Ipsum, you need to be sure there isn t anything embarrassing hidden in the middle of text. All
      the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first
      true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
      sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always
      free from repetition, injected humour, or non-characteristic words etc.
    </p>
  </>
);
