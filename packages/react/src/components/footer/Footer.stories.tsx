import React from 'react';

import { Footer } from './Footer';
import { IconFacebook, IconInstagram, IconLinkedin, IconTiktok, IconTwitter, IconYoutube } from '../../icons';
import { FooterItem } from './footerItem/FooterItem';
import { FooterItemGroup } from './footerItemGroup/FooterItemGroup';
import { FooterNavigation } from './footerNavigation/FooterNavigation';
import { FooterUtilities } from './footerUtilities/FooterUtilities';
import { FooterSoMe } from './footerSoMe/FooterSoMe';
import { FooterBase } from './footerBase/FooterBase';

const footerAriaLabel = 'Helsinki Design System';
const footerNavAriaLabel = 'Footer navigation items';
const createArray = (length: number): number[] => Array.from({ length }, (value, index) => index);

const Utilities = () => (
  <Footer.Utilities backToTopLabel="Back to top">
    <Footer.SoMe>
      <Footer.Item
        title="Link to Facebook"
        aria-label="Link to Facebook"
        icon={<IconFacebook />}
        href="https://facebook.com"
      />
      <Footer.Item
        title="Link to Twitter"
        aria-label="Link to Twitter"
        icon={<IconTwitter />}
        href="https://twitter.com"
      />
      <Footer.Item
        title="Link to Instagram"
        aria-label="Link to Instagram"
        icon={<IconInstagram />}
        href="https://instagram.com"
      />
      <Footer.Item
        title="Link to Youtube"
        aria-label="Link to Youtube"
        icon={<IconYoutube />}
        href="https://youtube.com"
      />
      <Footer.Item title="Link to Tiktok" aria-label="Link to Tiktok" icon={<IconTiktok />} href="https://tiktok.com" />
    </Footer.SoMe>
    <Footer.Item href="https://google.com" onClick={(e) => e.preventDefault()} label="Contact us" />
    <Footer.Item as="button" type="button" label="Give feedback" />
  </Footer.Utilities>
);

const Base = () => (
  <Footer.Base copyrightHolder="Copyright" copyrightText="All rights reserved">
    {createArray(5).map((index) => (
      <Footer.Item key={index} href="https://google.com" onClick={(e) => e.preventDefault()} label="Link" />
    ))}
  </Footer.Base>
);

export default {
  component: Footer,
  title: 'Components/Footer',
  subcomponents: {
    FooterNavigation,
    FooterItem,
    FooterItemGroup,
    FooterUtilities,
    FooterSoMe,
    FooterBase,
  },
  parameters: {
    controls: { expanded: true },
    layout: 'fullscreen',
  },
  args: { title: 'Helsinki Design System', korosType: 'basic', theme: 'white' },
  argTypes: {
    korosType: { control: { type: 'radio', options: ['basic', 'beat', 'pulse', 'storm', 'wave'] } },
    theme: { control: { type: 'inline-radio', options: ['white', 'black'] } },
    title: { control: { type: 'text' } },
  },
};

export const Default = (args) => (
  <Footer footerAriaLabel={footerAriaLabel} {...args}>
    <Footer.Navigation navigationAriaLabel={footerNavAriaLabel}>
      {createArray(8).map((index) => (
        <Footer.Item key={index} href="https://google.com" onClick={(e) => e.preventDefault()} label="Nav item" />
      ))}
    </Footer.Navigation>
    <Utilities />
    <Base />
  </Footer>
);

export const Minimal = (args) => (
  <Footer footerAriaLabel={footerAriaLabel} {...args}>
    <Footer.Navigation navigationAriaLabel={footerNavAriaLabel} variant="minimal">
      {createArray(4).map((index) => (
        <Footer.Item key={index} href="https://google.com" onClick={(e) => e.preventDefault()} label="Nav item" />
      ))}
    </Footer.Navigation>
    <Utilities />
    <Base />
  </Footer>
);

export const NoNav = (args) => (
  <Footer footerAriaLabel={footerAriaLabel} {...args}>
    <Utilities />
    <Base />
  </Footer>
);
NoNav.storyName = 'No navigation';

export const CustomTheme = (args) => (
  <Footer footerAriaLabel={footerAriaLabel} {...args}>
    <Footer.Navigation navigationAriaLabel={footerNavAriaLabel}>
      {createArray(8).map((index) => (
        <Footer.Item key={index} href="https://google.com" onClick={(e) => e.preventDefault()} label="Nav item" />
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
    '--footer-color': 'var(--color-black)',
    '--footer-divider-color': 'var(--color-black)',
    '--footer-focus-outline-color': 'var(--color-black)',
  },
};
CustomTheme.argTypes = {
  theme: {
    control: {
      type: 'object',
    },
  },
};

export const Sitemap = (args) => {
  const labelMapping = {
    1: 'Asuminen ja ympäristö',
    2: 'Kulttuuri ja vapaa-aika',
    3: 'Liikenne ja kadut',
    4: 'Varhaiskasvatus ja koulutus',
    5: 'Sosiaali- ja terveyspalvelut',
    6: 'Työ ja yrittäminen',
  };
  const subLabelMapping = {
    1: 'Hätätilanteet ja päivystys',
    2: 'Terveyspalvelut',
    3: 'Mielenterveys- ja päihdepalvelut',
    4: 'Sosiaalinen tuki ja toimeentulo',
    5: 'Ympäristö ja luonto',
    6: 'Asuminen',
    7: 'Kaavoitus',
    8: 'Rakentaminen ja kiinteistöt',
    9: 'Kaupunkisuunnittelu- ja rakentamishankkeet',
    10: 'Elintarvikevalvonta ja ympäristöterveys',
    11: 'Kirjastot',
    12: 'Kulttuuri',
    13: 'Liikunta',
    14: 'Ulkoilu ja retkeily',
    15: 'Matkailu',
    16: 'Tapahtumat',
    17: 'Liikenne- ja katusuunnittelu',
    18: 'Katujen rakentaminen ja kunnossapito',
    19: 'Joukkoliikenne',
    20: 'Pysäköinti',
  };

  const getRandomNumberInRange = (min, max) => {
    // eslint-disable-next-line no-param-reassign
    min = Math.ceil(min);
    // eslint-disable-next-line no-param-reassign
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <Footer footerAriaLabel={footerAriaLabel} {...args}>
      <Footer.Navigation navigationAriaLabel={footerNavAriaLabel} variant="sitemap">
        {createArray(getRandomNumberInRange(3, 6)).map((index) => (
          <Footer.ItemGroup key={index}>
            {createArray(getRandomNumberInRange(3, 6)).map((subIndex) => {
              const subItem = subIndex !== 0;
              return (
                <Footer.Item
                  key={subIndex}
                  subItem={subItem}
                  href="https://google.com"
                  onClick={(e) => e.preventDefault()}
                  label={
                    subItem
                      ? subLabelMapping[getRandomNumberInRange(1, 20)]
                      : labelMapping[getRandomNumberInRange(1, 6)]
                  }
                />
                // <Footer.Item
                //   key={subIndex}
                //   subItem={subItem}
                //   href="https://google.com"
                //   onClick={(e) => e.preventDefault()}
                //   label={subItem ? 'Sub page' : 'Main Page'}
                // />
              );
            })}
          </Footer.ItemGroup>
        ))}
      </Footer.Navigation>
      <Utilities />
      <Base />
    </Footer>
  );
};

export const Example = (args) => (
  <Footer footerProps={{ lang: 'fi' }} {...args}>
    <Footer.Navigation navigationAriaLabel="Nostoja palveluista">
      <Footer.Item href="https://asiointi.hel.fi/wps/portal/login?locale=fi" label="Sähköinen asiointi" />
      <Footer.Item href="https://palvelukartta.hel.fi/" label="Palvelut kartalla" />
      <Footer.Item href="https://hel.fi/yritystenhelsinki" label="Yritysten Helsinki" />
      <Footer.Item href="https://hel.fi/rekry/fi" label="Avoimet työpaikat" />
      <Footer.Item href="https://helsinkikanava.fi/fi_FI/" label="Videoita kaupungista" />
      <Footer.Item href="https://helmet.fi/" label="Kirjastot verkossa" />
      <Footer.Item href="https://reittiopas.fi/" label="Reittiopas" />
    </Footer.Navigation>
    <Footer.Utilities backToTopLabel="Sivun alkuun">
      <Footer.SoMe>
        <Footer.Item
          title="Helsingin kaupungin Facebook-tili"
          aria-label="Helsingin kaupungin Facebook-tili"
          icon={<IconFacebook aria-hidden="true" />}
          href="https://facebook.com/helsinginkaupunki/"
        />
        <Footer.Item
          title="Helsingin kaupungin Twitter-tili"
          aria-label="Helsingin kaupungin Twitter-tili"
          icon={<IconTwitter aria-hidden="true" />}
          href="https://twitter.com/helsinki"
        />
        <Footer.Item
          title="Helsingin kaupungin Instagram-tili"
          aria-label="Helsingin kaupungin Instagram-tili"
          icon={<IconInstagram aria-hidden="true" />}
          href="https://instagram.com/helsinki/"
        />
        <Footer.Item
          title="Helsingin kaupungin LinkedIn-tili"
          aria-label="Helsingin kaupungin LinkedIn-tili"
          icon={<IconLinkedin aria-hidden="true" />}
          href="https://linkedin.com/company/city-of-helsinki"
        />
        <Footer.Item
          title="Helsingin kaupungin Youtube-tili"
          aria-label="Helsingin kaupungin Youtube-tili"
          icon={<IconYoutube aria-hidden="true" />}
          href="https://youtube.com/channel/UCzJFvpjRB62oRoep4oRgwjg"
        />
      </Footer.SoMe>
      <Footer.Item
        href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/ota-yhteytta/ota-yhteytta"
        label="Yhteystiedot"
      />
      <Footer.Item
        href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute/anna-palautetta"
        label="Anna ja lue palautetta"
      />
      <Footer.Item href="https://hel.fi/kanslia/neuvonta-fi" label="Chat-neuvonta" />
    </Footer.Utilities>
    <Footer.Base copyrightHolder="Helsingin kaupunki" copyrightText="Kaikki oikeudet pidetään">
      <Footer.Item
        href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/tietoa-helsingista/tietoa-hel-fista/"
        label="Tietoa palvelusta"
      />
      <Footer.Item
        href="https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/tietoa-helsingista/saavutettavuus/saavutettavuus-helfi-sivustolla/"
        label="Saavutettavuusseloste"
      />
    </Footer.Base>
  </Footer>
);
Example.args = {
  footerAriaLabel: 'Helsingin kaupungin palvelun alatunniste',
};
