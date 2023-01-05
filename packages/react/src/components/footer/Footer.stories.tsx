import React from 'react';

import { Footer } from './Footer';
import { IconFacebook, IconInstagram, IconLinkedin, IconTiktok, IconTwitter, IconYoutube } from '../../icons';
import { FooterNavigationHeading } from './footerNavigationHeading/FooterNavigationHeading';
import { FooterNavigationLink } from './footerNavigationLink/FooterNavigationLink';
import { FooterNavigationGroup } from './footerNavigationGroup/FooterNavigationGroup';
import { FooterNavigation } from './footerNavigation/FooterNavigation';
import { FooterUtilities } from './footerUtilities/FooterUtilities';
import { FooterSoMe } from './footerSoMe/FooterSoMe';
import { FooterBase } from './footerBase/FooterBase';

const footerNavAriaLabel = 'Footer navigation items';
const createArray = (length: number): number[] => Array.from({ length }, (value, index) => index);

const Utilities = () => (
  <Footer.Utilities>
    <Footer.SoMe>
      <Footer.NavigationLink
        title="Link to Facebook"
        aria-label="Link to Facebook"
        icon={<IconFacebook aria-hidden />}
        href="https://facebook.com"
      />
      <Footer.NavigationLink
        title="Link to Twitter"
        aria-label="Link to Twitter"
        icon={<IconTwitter aria-hidden />}
        href="https://twitter.com"
      />
      <Footer.NavigationLink
        title="Link to Instagram"
        aria-label="Link to Instagram"
        icon={<IconInstagram aria-hidden />}
        href="https://instagram.com"
      />
      <Footer.NavigationLink
        title="Link to Youtube"
        aria-label="Link to Youtube"
        icon={<IconYoutube aria-hidden />}
        href="https://youtube.com"
      />
      <Footer.NavigationLink
        title="Link to Tiktok"
        aria-label="Link to Tiktok"
        icon={<IconTiktok aria-hidden />}
        href="https://tiktok.com"
      />
    </Footer.SoMe>
    <Footer.NavigationLink href="https://google.com" onClick={(e) => e.preventDefault()} label="Contact us" />
    <Footer.NavigationLink href="https://google.com" onClick={(e) => e.preventDefault()} label="Give feedback" />
  </Footer.Utilities>
);

const Base = () => (
  <Footer.Base copyrightHolder="Copyright" copyrightText="All rights reserved" backToTopLabel="Back to top">
    {createArray(5).map((index) => (
      <Footer.NavigationLink key={index} href="https://google.com" onClick={(e) => e.preventDefault()} label="Link" />
    ))}
  </Footer.Base>
);

export default {
  component: Footer,
  title: 'Components/Footer',
  subcomponents: {
    FooterNavigation,
    FooterNavigationLink,
    FooterNavigationGroup,
    FooterNavigationHeading,
    FooterUtilities,
    FooterSoMe,
    FooterBase,
  },
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
  },
  args: { title: 'Helsinki Design System', korosType: 'basic', theme: 'light' },
  argTypes: {
    korosType: { control: { type: 'radio', options: ['basic', 'beat', 'pulse', 'wave', 'vibration'] } },
    theme: { control: { type: 'inline-radio', options: ['light', 'dark'] } },
    title: { control: { type: 'text' } },
  },
};

export const Default = (args) => (
  <Footer {...args}>
    <Footer.Navigation navigationAriaLabel={footerNavAriaLabel}>
      {createArray(8).map((index) => (
        <Footer.NavigationLink
          key={index}
          href="https://google.com"
          onClick={(e) => e.preventDefault()}
          label="Nav item"
        />
      ))}
    </Footer.Navigation>
    <Utilities />
    <Base />
  </Footer>
);

export const Minimal = (args) => (
  <Footer {...args}>
    <Footer.Navigation navigationAriaLabel={footerNavAriaLabel} variant="minimal">
      {createArray(4).map((index) => (
        <Footer.NavigationLink
          key={index}
          href="https://google.com"
          onClick={(e) => e.preventDefault()}
          label="Nav item"
        />
      ))}
    </Footer.Navigation>
    <Utilities />
    <Base />
  </Footer>
);

export const NoNav = (args) => (
  <Footer {...args}>
    <Utilities />
    <Base />
  </Footer>
);
NoNav.storyName = 'No navigation';

export const CustomTheme = (args) => (
  <Footer {...args}>
    <Footer.Navigation navigationAriaLabel={footerNavAriaLabel}>
      {createArray(8).map((index) => (
        <Footer.NavigationLink
          key={index}
          href="https://google.com"
          onClick={(e) => e.preventDefault()}
          label="Nav item"
        />
      ))}
    </Footer.Navigation>
    <Utilities />
    <Base />
  </Footer>
);
CustomTheme.storyName = 'Custom theme';
CustomTheme.args = {
  theme: {
    '--footer-background': 'var(--color-engel)',
    '--footer-color': 'var(--color-black-90)',
    '--footer-divider-color': 'var(--color-black-90)',
    '--footer-focus-outline-color': 'var(--color-black-90)',
  },
};
CustomTheme.argTypes = {
  theme: {
    control: {
      type: 'object',
    },
  },
};

export const Sitemap = (args) => (
  <Footer {...args}>
    <Footer.Navigation navigationAriaLabel={footerNavAriaLabel} variant="sitemap">
      {createArray(4).map((index) => (
        <Footer.NavigationGroup key={index}>
          <Footer.NavigationHeading href="https://google.com" onClick={(e) => e.preventDefault()} label="Main Page" />
          {createArray(6).map((subIndex) => {
            return (
              <Footer.NavigationLink
                key={subIndex}
                href="https://google.com"
                onClick={(e) => e.preventDefault()}
                label="Sub page"
              />
            );
          })}
        </Footer.NavigationGroup>
      ))}
    </Footer.Navigation>
    <Utilities />
    <Base />
  </Footer>
);

export const Example = (args) => (
  <Footer footerProps={{ lang: 'fi' }} {...args}>
    <Footer.Navigation navigationAriaLabel="Nostoja palveluista">
      <Footer.NavigationLink href="https://asiointi.hel.fi/wps/portal/login?locale=fi" label="Sähköinen asiointi" />
      <Footer.NavigationLink href="https://palvelukartta.hel.fi/" label="Palvelut kartalla" />
      <Footer.NavigationLink href="https://hel.fi/yritystenhelsinki" label="Yritysten Helsinki" />
      <Footer.NavigationLink href="https://hel.fi/rekry/fi" label="Avoimet työpaikat" />
      <Footer.NavigationLink href="https://helsinkikanava.fi/fi_FI/" label="Videoita kaupungista" />
      <Footer.NavigationLink href="https://helmet.fi/" label="Kirjastot verkossa" />
      <Footer.NavigationLink href="https://reittiopas.fi/" label="Reittiopas" />
    </Footer.Navigation>
    <Footer.Utilities>
      <Footer.SoMe soMeSectionProps={{ 'aria-label': 'Helsinki sosiaalisessa mediassa' }}>
        <Footer.NavigationLink
          title="Helsingin kaupungin Facebook-tili"
          aria-label="Helsingin kaupungin Facebook-tili"
          icon={<IconFacebook aria-hidden="true" />}
          href="https://facebook.com/helsinginkaupunki/"
        />
        <Footer.NavigationLink
          title="Helsingin kaupungin Twitter-tili"
          aria-label="Helsingin kaupungin Twitter-tili"
          icon={<IconTwitter aria-hidden="true" />}
          href="https://twitter.com/helsinki"
        />
        <Footer.NavigationLink
          title="Helsingin kaupungin Instagram-tili"
          aria-label="Helsingin kaupungin Instagram-tili"
          icon={<IconInstagram aria-hidden="true" />}
          href="https://instagram.com/helsinki/"
        />
        <Footer.NavigationLink
          title="Helsingin kaupungin LinkedIn-tili"
          aria-label="Helsingin kaupungin LinkedIn-tili"
          icon={<IconLinkedin aria-hidden="true" />}
          href="https://linkedin.com/company/city-of-helsinki"
        />
        <Footer.NavigationLink
          title="Helsingin kaupungin Youtube-tili"
          aria-label="Helsingin kaupungin Youtube-tili"
          icon={<IconYoutube aria-hidden="true" />}
          href="https://youtube.com/channel/UCzJFvpjRB62oRoep4oRgwjg"
        />
      </Footer.SoMe>
      <Footer.NavigationLink
        href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/ota-yhteytta/ota-yhteytta"
        label="Yhteystiedot"
      />
      <Footer.NavigationLink
        href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute/anna-palautetta"
        label="Anna ja lue palautetta"
      />
      <Footer.NavigationLink href="https://hel.fi/kanslia/neuvonta-fi" label="Chat-neuvonta" />
    </Footer.Utilities>
    <Footer.Base
      copyrightHolder="Helsingin kaupunki"
      copyrightText="Kaikki oikeudet pidetään"
      backToTopLabel="Sivun alkuun"
    >
      <Footer.NavigationLink
        href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/tietoa-helsingista/tietoa-hel-fista/"
        label="Tietoa palvelusta"
      />
      <Footer.NavigationLink
        href="https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/tietoa-helsingista/saavutettavuus/saavutettavuus-helfi-sivustolla/"
        label="Saavutettavuusseloste"
      />
    </Footer.Base>
  </Footer>
);

export const UtilityGroups = (args) => (
  <Footer footerProps={{ lang: 'fi' }} {...args}>
    <Footer.Navigation navigationAriaLabel="Nostoja palveluista">
      <Footer.NavigationLink href="https://asiointi.hel.fi/wps/portal/login?locale=fi" label="Sähköinen asiointi" />
      <Footer.NavigationLink href="https://palvelukartta.hel.fi/" label="Palvelut kartalla" />
      <Footer.NavigationLink href="https://hel.fi/yritystenhelsinki" label="Yritysten Helsinki" />
      <Footer.NavigationLink href="https://hel.fi/rekry/fi" label="Avoimet työpaikat" />
      <Footer.NavigationLink href="https://helsinkikanava.fi/fi_FI/" label="Videoita kaupungista" />
      <Footer.NavigationLink href="https://helmet.fi/" label="Kirjastot verkossa" />
      <Footer.NavigationLink href="https://reittiopas.fi/" label="Reittiopas" />
    </Footer.Navigation>
    <Footer.Utilities>
      {createArray(3).map((index) => (
        <Footer.NavigationGroup key={index}>
          <Footer.NavigationHeading href="https://google.com" onClick={(e) => e.preventDefault()} label="Main Page" />
          {createArray(6).map((subIndex) => {
            return (
              <Footer.NavigationLink
                key={subIndex}
                href="https://google.com"
                onClick={(e) => e.preventDefault()}
                label="Sub page"
              />
            );
          })}
        </Footer.NavigationGroup>
      ))}
      <Footer.NavigationGroup key={6}>
        <Footer.NavigationHeading label="Social media pages" />
        <Footer.NavigationLink
          title="Helsingin kaupungin Facebook-tili"
          label="Facebook"
          aria-label="Helsingin kaupungin Facebook-tili"
          icon={<IconFacebook aria-hidden="true" />}
          href="https://facebook.com/helsinginkaupunki/"
        />
        <Footer.NavigationLink
          title="Helsingin kaupungin Facebook-tili"
          label="Facebook"
          aria-label="Helsingin kaupungin Facebook-tili"
          icon={<IconFacebook aria-hidden="true" />}
          href="https://facebook.com/helsinginkaupunki/"
        />
        <Footer.NavigationLink
          title="Helsingin kaupungin Twitter-tili"
          label="Twitter"
          aria-label="Helsingin kaupungin Twitter-tili"
          icon={<IconTwitter aria-hidden="true" />}
          href="https://twitter.com/helsinki"
        />
        <Footer.NavigationLink
          title="Helsingin kaupungin Instagram-tili"
          label="Instagram"
          aria-label="Helsingin kaupungin Instagram-tili"
          icon={<IconInstagram aria-hidden="true" />}
          href="https://instagram.com/helsinki/"
        />
      </Footer.NavigationGroup>
    </Footer.Utilities>
    <Footer.Base
      copyrightHolder="Helsingin kaupunki"
      copyrightText="Kaikki oikeudet pidetään"
      backToTopLabel="Sivun alkuun"
    >
      <Footer.NavigationLink
        href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/tietoa-helsingista/tietoa-hel-fista/"
        label="Tietoa palvelusta"
      />
      <Footer.NavigationLink
        href="https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/tietoa-helsingista/saavutettavuus/saavutettavuus-helfi-sivustolla/"
        label="Saavutettavuusseloste"
      />
    </Footer.Base>
  </Footer>
);
