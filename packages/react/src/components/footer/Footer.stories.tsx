import React from 'react';

import { Footer } from './Footer';
import { IconFacebook, IconInstagram, IconLinkedin, IconTiktok, IconTwitter, IconYoutube } from '../../icons';
import { FooterGroupHeading } from './components/footerGroupHeading/FooterGroupHeading';
import { FooterLink } from './components/footerLink/FooterLink';
import { FooterNavigationGroup } from './components/footerNavigationGroup/FooterNavigationGroup';
import { FooterNavigation } from './components/footerNavigation/FooterNavigation';
import { FooterUtilities } from './components/footerUtilities/FooterUtilities';
import { FooterUtilityGroup } from './components/footerUtilityGroup/FooterUtilityGroup';
import { FooterBase } from './components/footerBase/FooterBase';
import { FooterCustom } from './components/footerCustom/FooterCustom';
import { Logo, logoFi } from '../logo';

const createArray = (length: number): number[] => Array.from({ length }, (value, index) => index);

const Utilities = () => {
  const someLinks = () => {
    return [
      <Footer.Link
        title="Helsingin kaupungin Facebook-tili"
        ariaLabel="Helsingin kaupungin Facebook-tili"
        external
        openInNewTab
        icon={<IconFacebook aria-hidden />}
        href="https://facebook.com"
      />,
      <Footer.Link
        title="Helsingin kaupungin Twitter-tili"
        ariaLabel="Helsingin kaupungin Twitter-tili"
        external
        openInNewTab
        icon={<IconTwitter aria-hidden />}
        href="https://twitter.com"
      />,
      <Footer.Link
        title="Helsingin kaupungin Instagram-tili"
        ariaLabel="Helsingin kaupungin Instagram-tili"
        external
        openInNewTab
        icon={<IconInstagram aria-hidden />}
        href="https://instagram.com"
      />,
      <Footer.Link
        title="Helsingin kaupungin Youtube-tili"
        ariaLabel="Helsingin kaupungin Youtube-tili"
        external
        openInNewTab
        icon={<IconYoutube aria-hidden />}
        href="https://youtube.com"
      />,
      <Footer.Link
        title="Helsingin kaupungin Tiktok-tili"
        ariaLabel="Helsingin kaupungin Tiktok-tili"
        external
        openInNewTab
        icon={<IconTiktok aria-hidden />}
        href="https://tiktok.com"
      />,
    ];
  };
  return (
    <Footer.Utilities soMeLinks={someLinks()}>
      <Footer.Link href="https://google.com" onClick={(e) => e.preventDefault()} label="Contact us" />
      <Footer.Link href="https://google.com" onClick={(e) => e.preventDefault()} label="Give feedback" />
      <Footer.Link href="https://google.com" onClick={(e) => e.preventDefault()} label="Support" />
      <Footer.Link href="https://google.com" onClick={(e) => e.preventDefault()} label="About" />
      <Footer.Link
        href="https://google.com"
        onClick={(e) => e.preventDefault()}
        label="Github page"
        external
        openInNewTab
      />
    </Footer.Utilities>
  );
};

const Base = () => (
  <Footer.Base
    copyrightHolder="Copyright"
    copyrightText="All rights reserved"
    backToTopLabel="Back to top"
    logo={<Logo src={logoFi} size="medium" />}
  >
    {createArray(5).map((index) => (
      <Footer.Link
        key={index}
        href="https://google.com"
        onClick={(e) => e.preventDefault()}
        label="Link"
        className="test"
        {...(index === 4 && { external: true, openInNewTab: true })}
      />
    ))}
  </Footer.Base>
);

export default {
  component: Footer,
  title: 'Components/Footer',
  subcomponents: {
    FooterNavigation,
    FooterLink,
    FooterNavigationGroup,
    FooterGroupHeading,
    FooterUtilities,
    FooterUtilityGroup,
    FooterBase,
    FooterCustom,
  },
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
  },
  args: { title: 'Helsinki Design System', korosType: 'basic', theme: 'light' },
  argTypes: {
    korosType: { control: { type: 'radio', options: ['basic', 'beat', 'calm', 'pulse', 'wave', 'vibration'] } },
    theme: { control: { type: 'inline-radio', options: ['light', 'dark'] } },
    title: { control: { type: 'text' } },
  },
};

export const NoNav = (args) => (
  <Footer {...args}>
    <Utilities />
    <Base />
  </Footer>
);
NoNav.storyName = 'No navigation';

export const CustomTheme = (args) => (
  <Footer {...args}>
    <Footer.Navigation>
      {createArray(8).map((index) => (
        <Footer.Link key={index} href="https://google.com" onClick={(e) => e.preventDefault()} label="Nav item" />
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
    <Footer.Navigation>
      {createArray(4).map((index) => (
        <Footer.NavigationGroup
          key={index}
          headingLink={<Footer.GroupHeading href="https://yourpath.com" label="Main Page" />}
        >
          {createArray(6).map((subIndex) => {
            return (
              <Footer.Link
                key={subIndex}
                href="https://google.com"
                onClick={(e) => e.preventDefault()}
                label="Sub page"
                subItem
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
    <Footer.Navigation>
      <Footer.Link href="https://asiointi.hel.fi/wps/portal/login?locale=fi" label="Sähköinen asiointi" />
      <Footer.Link href="https://palvelukartta.hel.fi/" label="Palvelut kartalla" />
      <Footer.Link href="https://hel.fi/yritystenhelsinki" label="Yritysten Helsinki" />
      <Footer.Link href="https://hel.fi/rekry/fi" label="Avoimet työpaikat" />
      <Footer.Link href="https://helsinkikanava.fi/fi_FI/" label="Videoita kaupungista" />
      <Footer.Link href="https://helmet.fi/" label="Kirjastot verkossa" />
      <Footer.Link href="https://reittiopas.fi/" label="Reittiopas" />
    </Footer.Navigation>
    <Footer.Utilities
      soMeSectionProps={{ 'aria-label': 'Helsinki sosiaalisessa mediassa' }}
      soMeLinks={[
        <Footer.Link
          title="Helsingin kaupungin Facebook-tili"
          ariaLabel="Helsingin kaupungin Facebook-tili"
          external
          openInNewTab
          icon={<IconFacebook aria-hidden="true" />}
          href="https://facebook.com/helsinginkaupunki/"
        />,
        <Footer.Link
          title="Helsingin kaupungin Twitter-tili"
          ariaLabel="Helsingin kaupungin Twitter-tili"
          external
          openInNewTab
          icon={<IconTwitter aria-hidden="true" />}
          href="https://twitter.com/helsinki"
        />,
        <Footer.Link
          title="Helsingin kaupungin Instagram-tili"
          ariaLabel="Helsingin kaupungin Instagram-tili"
          external
          openInNewTab
          icon={<IconInstagram aria-hidden="true" />}
          href="https://instagram.com/helsinki/"
        />,
        <Footer.Link
          title="Helsingin kaupungin LinkedIn-tili"
          ariaLabel="Helsingin kaupungin LinkedIn-tili"
          external
          openInNewTab
          icon={<IconLinkedin aria-hidden="true" />}
          href="https://linkedin.com/company/city-of-helsinki"
        />,
        <Footer.Link
          title="Helsingin kaupungin Youtube-tili"
          ariaLabel="Helsingin kaupungin Youtube-tili"
          external
          openInNewTab
          icon={<IconYoutube aria-hidden="true" />}
          href="https://youtube.com/channel/UCzJFvpjRB62oRoep4oRgwjg"
        />,
      ]}
    >
      <Footer.Link
        href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/ota-yhteytta/ota-yhteytta"
        label="Yhteystiedot"
      />
      <Footer.Link
        href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute/anna-palautetta"
        label="Anna ja lue palautetta"
      />
      <Footer.Link href="https://hel.fi/kanslia/neuvonta-fi" label="Chat-neuvonta" />
    </Footer.Utilities>
    <Footer.Base
      copyrightHolder="Helsingin kaupunki"
      copyrightText="Kaikki oikeudet pidetään"
      backToTopLabel="Sivun alkuun"
      logo={<Logo src={logoFi} size="medium" />}
    >
      <Footer.Link
        href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/tietoa-helsingista/tietoa-hel-fista/"
        label="Tietoa palvelusta"
      />
      <Footer.Link
        href="https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/tietoa-helsingista/saavutettavuus/saavutettavuus-helfi-sivustolla/"
        label="Saavutettavuusseloste"
      />
    </Footer.Base>
  </Footer>
);

export const UtilityGroups = (args) => (
  <Footer footerProps={{ lang: 'fi' }} {...args}>
    <Footer.Navigation>
      <Footer.Link href="https://asiointi.hel.fi/wps/portal/login?locale=fi" label="Sähköinen asiointi" />
      <Footer.Link href="https://palvelukartta.hel.fi/" label="Palvelut kartalla" />
      <Footer.Link href="https://hel.fi/yritystenhelsinki" label="Yritysten Helsinki" />
      <Footer.Link href="https://hel.fi/rekry/fi" label="Avoimet työpaikat" />
      <Footer.Link href="https://helsinkikanava.fi/fi_FI/" label="Videoita kaupungista" />
      <Footer.Link href="https://helmet.fi/" label="Kirjastot verkossa" />
      <Footer.Link href="https://reittiopas.fi/" label="Reittiopas" />
    </Footer.Navigation>
    <Footer.Utilities>
      {createArray(3).map((index) => (
        <Footer.UtilityGroup
          key={index}
          headingLink={
            <Footer.GroupHeading
              href="https://google.com"
              onClick={(e) => e.preventDefault()}
              label="Group heading link"
            />
          }
        >
          {createArray(6).map((subIndex) => {
            return (
              <Footer.Link
                key={subIndex}
                href="https://google.com"
                onClick={(e) => e.preventDefault()}
                label="Group link"
              />
            );
          })}
        </Footer.UtilityGroup>
      ))}
      <Footer.UtilityGroup key={6} headingLink={<Footer.GroupHeading label="Social media" />}>
        <Footer.Link
          title="Helsingin kaupungin Facebook-tili"
          label="Facebook"
          ariaLabel="Helsingin kaupungin Facebook-tili"
          openInNewTabAriaLabel="Avautuu uudessa välilehdessä."
          openInExternalDomainAriaLabel="Siirtyy toiseen sivustoon."
          icon={<IconFacebook aria-hidden="true" />}
          href="https://facebook.com/helsinginkaupunki/"
        />
        <Footer.Link
          title="Helsingin kaupungin Facebook-tili"
          label="Facebook"
          ariaLabel="Helsingin kaupungin Facebook-tili"
          openInNewTabAriaLabel="Avautuu uudessa välilehdessä."
          openInExternalDomainAriaLabel="Siirtyy toiseen sivustoon."
          icon={<IconFacebook aria-hidden="true" />}
          href="https://facebook.com/helsinginkaupunki/"
        />
        <Footer.Link
          title="Helsingin kaupungin Twitter-tili"
          label="Twitter"
          ariaLabel="Helsingin kaupungin Twitter-tili"
          openInNewTabAriaLabel="Avautuu uudessa välilehdessä."
          openInExternalDomainAriaLabel="Siirtyy toiseen sivustoon."
          icon={<IconTwitter aria-hidden="true" />}
          href="https://twitter.com/helsinki"
        />
        <Footer.Link
          title="Helsingin kaupungin Instagram-tili"
          label="Instagram"
          ariaLabel="Helsingin kaupungin Instagram-tili"
          openInNewTabAriaLabel="Avautuu uudessa välilehdessä."
          openInExternalDomainAriaLabel="Siirtyy toiseen sivustoon."
          icon={<IconInstagram aria-hidden="true" />}
          href="https://instagram.com/helsinki/"
        />
      </Footer.UtilityGroup>
    </Footer.Utilities>
    <Footer.Base
      copyrightHolder="Helsingin kaupunki"
      copyrightText="Kaikki oikeudet pidetään"
      backToTopLabel="Sivun alkuun"
      logo={<Logo src={logoFi} size="medium" />}
    >
      <Footer.Link
        href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/tietoa-helsingista/tietoa-hel-fista/"
        label="Tietoa palvelusta"
      />
      <Footer.Link
        href="https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/tietoa-helsingista/saavutettavuus/saavutettavuus-helfi-sivustolla/"
        label="Saavutettavuusseloste"
      />
    </Footer.Base>
  </Footer>
);

export const CustomSection = (args) => (
  <Footer {...args}>
    <Footer.Navigation>
      {createArray(8).map((index) => (
        <Footer.Link key={index} href="https://google.com" onClick={(e) => e.preventDefault()} label="Nav item" />
      ))}
    </Footer.Navigation>
    <Utilities />
    <Footer.Custom>
      <Footer.GroupHeading label="Partners" id="partners" />
      <div
        aria-label="partners"
        style={{ display: 'flex', flexDirection: 'row', gap: '12px 24px', flexWrap: 'wrap', marginTop: '8px' }}
      >
        <Footer.Link href="www.google.com" label="Partner 1" external openInNewTab />
        <Footer.Link href="www.google.com" label="Partner 1" external openInNewTab />
        <Footer.Link href="www.google.com" label="Partner 1" external openInNewTab />
      </div>
    </Footer.Custom>
    <Base />
  </Footer>
);

export const Minimal = (args) => (
  <Footer {...args}>
    <Footer.Base backToTopLabel="Back to top" logo={<Logo src={logoFi} size="medium" />} />
  </Footer>
);
