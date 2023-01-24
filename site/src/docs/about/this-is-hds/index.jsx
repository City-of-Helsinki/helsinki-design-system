import React from 'react';
import {
  Accordion,
  useAccordion,
  Button,
  Card,
  Container,
  IconAngleDown,
  IconAngleUp,
  ImageWithCard,
  Link,
  Linkbox,
  Table,
} from 'hds-react';
import Hero from '../../../components/Hero';
import Seo from '../../../components/Seo';

import './../../../components/layout.scss';
import './styles.scss';

const TableBasicInfo = () => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'about', headerName: 'Key information for the competition' },
  ];
  const unitRows = [
    { id: 'name', about: 'Helsinki Design System (HDS)' },
    {
      id: 'link',
      about: (
        <Link href="https://hds.hel.fi/" size="M">
          Link to Helsinki Design System (HDS)
        </Link>
      ),
    },
    { id: 'client', about: 'City of Helsinki' },
    {
      id: 'companies',
      about: ' Futurice, Gofore, HiQ, Kodan, Nitor, SiteImprove, Solita, Suomen Ohjelmistokehitys OSK, Unicus ',
    },
    { id: 'competition', about: 'Best Design System' },
    { id: 'tech', about: 'React, html+css (core)' },
    { id: 'design', about: 'Sketch, Abstract' },
  ];
  const verticalHeaders = [
    { key: 'name', headerName: 'Name' },
    { key: 'link', headerName: 'Link' },
    { key: 'client', headerName: 'Client' },
    { key: 'companies', headerName: 'Companies involved since v1.0.0 (in alphabetical order)' },
    { key: 'competition', headerName: 'Competition category' },
    { key: 'tech', headerName: 'Technologies used' },
    { key: 'design', headerName: 'Design tools used' },
  ];
  const caption = (
    <span>
      <b>Table 1</b>: Key infomation on HDS
    </span>
  );
  return (
    <div>
      <Table
        verticalHeaders={verticalHeaders}
        cols={cols}
        rows={unitRows}
        caption={caption}
        indexKey="id"
        renderIndexCol={false}
      />
    </div>
  );
};

const DemoPage = () => {
  return (
    <>
      <Seo
        title="Helsinki Design System"
        pageTitle="Info page"
        description="Info page for Helsinki Design system"
      ></Seo>
      <Hero
        title="Helsinki Design System"
        text="The Helsinki Design System is focused on usability and accessibility and aims to improve the quality and consistency of City of Helsinki digital services – making the user experience better for everyone."
        backgroundImageUrl="/images/homepage/amos58.jpg"
      >
        <Button
          variant="primary"
          className="front-page-hero-button"
          role="link"
          onClick={() => {
            navigate('/getting-started');
          }}
        >
          Learn more
        </Button>
      </Hero>

      <Container className="info-page-content text-body">
        <div className="info-page-image-card-container">
          <ImageWithCard
            className="info-page-image-card"
            cardLayout="hover"
            cardAlignment="left"
            src="/images/homepage/amos58.jpg"
          >
            <h2 className="heading-l">Background</h2>
            <p>
              The City of Helsinki offers thousands of digital and non-digital services for different purposes. The
              common goal is to meet the needs of the users.
            </p>
          </ImageWithCard>
        </div>

        <h2>For example, citizens of Helsinki need to:</h2>
        <div className="info-page-card-grid">
          <Card
            style={{ backgroundImage: 'url(/images/about/this-is-hds/hki-illustration-daycare.svg)' }}
            theme={{ '--background-color': 'var(--color-coat-of-arms-medium-light)' }}
            className="info-page-card-grid-item"
            heading="Apply to daycare"
          >
            <Link
              ariaLabel="Learn more about applying to daycare"
              openInNewTabAriaLabel="Opens in new tab"
              openInExternalDomainAriaLabel="Directs to another site"
              className="info-page-card-grid-link-button"
              href="https://asti.hel.fi"
              style={{ color: 'var(--color-black)' }}
              external
            >
              Learn more
            </Link>
          </Card>
          <Card
            style={{ backgroundImage: 'url(/images/about/this-is-hds/hki-illustration-dj.svg)' }}
            theme={{ '--background-color': 'var(--color-metro)' }}
            className="info-page-card-grid-item"
            heading="Find events in Helsinki"
          >
            <Link
              ariaLabel="Learn more about events"
              openInNewTabAriaLabel="Opens in new tab"
              openInExternalDomainAriaLabel="Directs to another site"
              className="info-page-card-grid-link-button"
              href="https://hds.hel.fihttps://tapahtumat.hel.fi/en/home"
              external
              style={{ color: 'var(--color-white)', '--link-hover-color': 'var(--color-metro-dark)' }}
            >
              Learn more
            </Link>
          </Card>
          <Card
            style={{ backgroundImage: 'url(/images/about/this-is-hds/hki-illustration-boat.svg)' }}
            theme={{ '--background-color': 'var(--color-suomenlinna)' }}
            className="info-page-card-grid-item"
            heading="Rent a place for a boat"
          >
            <Link
              ariaLabel="Learn more about renting a place for a boat"
              openInNewTabAriaLabel="Opens in new tab"
              openInExternalDomainAriaLabel="Directs to another site"
              className="info-page-card-grid-link-button"
              href="https://hds.hel.fi"
              external
              style={{ color: 'var(--color-black)' }}
            >
              Learn more
            </Link>
          </Card>
          <Card
            style={{ backgroundImage: 'url(/images/about/this-is-hds/hki-illustration-culture-kids.svg)' }}
            theme={{ '--background-color': 'var(--color-copper-light)' }}
            className="info-page-card-grid-item"
            heading="Become a Culture Kid"
          >
            <Link
              ariaLabel="Learn more about becoming a culture kid"
              openInNewTabAriaLabel="Opens in new tab"
              openInExternalDomainAriaLabel="Directs to another site"
              className="info-page-card-grid-link-button"
              href="https://kummilapset.hel.fi/en/"
              external
              style={{ color: 'var(--color-black)' }}
            >
              Learn more
            </Link>
          </Card>
          <Card
            style={{ backgroundImage: 'url(/images/about/this-is-hds/hki-illustration-havis-amanda.svg)' }}
            theme={{ '--background-color': 'var(--color-engel-light)' }}
            className="info-page-card-grid-item"
            heading="Visit the official site hel.fi"
          >
            <Link
              ariaLabel="Learn more about hel.fi site"
              openInNewTabAriaLabel="Opens in new tab"
              openInExternalDomainAriaLabel="Directs to another site"
              className="info-page-card-grid-link-button"
              href="https://hel.fi"
              external
              style={{ color: 'var(--color-black)' }}
            >
              Learn more
            </Link>
          </Card>
          <Card
            style={{ backgroundImage: 'url(/images/about/this-is-hds/hki-illustration-truck.svg)' }}
            theme={{ '--background-color': 'var(--color-gold-light)' }}
            className="info-page-card-grid-item"
            heading="Buy a resident parking permit"
          >
            <Link
              ariaLabel="Learn more about parking permits"
              openInNewTabAriaLabel="Opens in new tab"
              openInExternalDomainAriaLabel="Directs to another site"
              className="info-page-card-grid-link-button"
              href="https://www.hel.fi/en/urban-environment-and-traffic/parking/resident-parking"
              external
              style={{ color: 'var(--color-black)' }}
            >
              Learn more
            </Link>
          </Card>
        </div>

        <div className="info-page-image-card-container">
          <ImageWithCard
            className="info-page-image-card"
            cardLayout="hover"
            cardAlignment="left"
            src="/images/homepage/amos58.jpg"
          >
            <h2 className="heading-l">Goals</h2>
            <p>
              The Helsinki Design System is a shared point of reference for designers, developers and product owners
              working for the City of Helsinki. HDS helps teams work and communicate more efficiently and assists the
              City of Helsinki in fulfilling its vision in the digital world.{' '}
            </p>
          </ImageWithCard>
        </div>

        <h2 className="heading-l">HDS is part of the city strategy</h2>
        <p>
          HDS is a tool for building the digital presence and brand of city of Helsinki. HDS supports creating equal and
          functional city services.
        </p>

        <p>
          Digitalisation is a key enabler to city services and the new city strategy. The city strategy emphasises
          creating accessible services for all citizens, regardless the time and place. HDS provides building blocks for
          such services and enables projects to solve actual user problems instead of rebuilding basic elements. HDS has
          accessibility baked in so that the end user projects using the ready components are one step closer on
          accessible services.
        </p>

        <p>
          HDS ensures accessibility in every stage of component development. HDS components always meet at least WCAG
          2.1 AA level and often also reach the AAA level. HDS components and patterns are tested with the newest NVDA
          on Windows and the newest VoiceOver on Mac and iOS.{' '}
        </p>

        <p>
          The brand of Helsinki is present in physical world and in digital world. These two should represent the same
          city and feel familiar and recognisable. HDS is a tool to build digital presence according to city of Helsinki
          brand.
        </p>

        <h2 className="heading-l">How we work</h2>
        <p>
          Helsinki Design System -team is a collaboration of professionals from different consultancies and City of
          Helsinki. City of Helsinki didn't buy ready design system but rather decided to gather the best professionals
          in the same team. This way City of Helsinki owns and continues to maintain the design system. When the people
          change, it is important that the processes but also the actual design system are well documented, so that it
          is possible to transfer the knowledge.
        </p>

        <p>
          HDS is developed as open source project so anyone can benefit from it. The source code is available in{' '}
          <Link href="https://github.com/City-of-Helsinki/helsinki-design-system" external size="M">
            {' '}
            Github{' '}
          </Link>
          free of charge and even the designs are shared for those who are interested. Building open source design
          system has many valuable points:
        </p>
        <ul>
          <li>Open source is one way to share the benefits to larger community</li>
          <li>
            Open source projects enables collaboration with other cities and companies as well, allowing contributions
            from the community
          </li>
          <li>Open source creates transparency</li>
        </ul>
        <p>
          A key principle is to pay attention accessibility all the way from the first drafts to the final component.
          Accessibility specialists audit every component before we release it. (accessibility process image here).
        </p>
        <p>
          Collaboration and support are built-in in the processes. City of Helsinki has a dedicated slack-channel to
          handle discussion and requests from the projects across the city organization.
        </p>

        <ImageWithCard
          cardLayout="hover"
          src="/images/homepage/amos58.jpg"
          style={{
            height: '106px',
            marginTop: 'var(--spacing-m)',
            backgroundColor: 'var(--silver-medium-light !important',
          }}
        >
          <h2 className="heading-l">Results</h2>
          <p>
            Helsinki Design System is gaining more users and that way larger impact on the city of Helsinki digital user
            experiene.
          </p>
        </ImageWithCard>

        <h2 className="heading-l">Some of the key metrics</h2>

        <Card
          border
          heading="HDS React component usage"
          text="React component usage in 6 different times."
          style={{
            marginTop: 'var(--spacing-s)',
          }}
        >
          <iframe
            title="HDS React component usage"
            aria-label="Interactive bar chart"
            id="datawrapper-chart-X0PtN"
            src="https://datawrapper.dwcdn.net/X0PtN/8/"
            scrolling="no"
            frameBorder="0"
            data-external="1"
            style={{
              width: '100%',
              //min-width: "100% !important",
              border: 'none',
              height: '620',
            }}
          ></iframe>
        </Card>

        <Card
          border
          heading="Design"
          text="Usage of Design kit"
          style={{
            marginTop: 'var(--spacing-s)',
            width: '45%',
          }}
        />

        <Card
          border
          heading="Unique visitors on hds.hel.fi"
          text="Unique visitors on the documentation site between June 2020 to end of December 2022."
          style={{
            marginTop: 'var(--spacing-s)',
          }}
        >
          <iframe
            title="Unique visitors on hds.hel.fi"
            aria-label="Interactive line chart"
            id="datawrapper-chart-LLonN"
            src="https://datawrapper.dwcdn.net/LLonN/3/"
            scrolling="no"
            frameBorder="0"
            data-external="1"
            style={{
              width: '100%',
              //min-width: "100% !important",
              border: 'none',
              height: '620',
            }}
          ></iframe>
        </Card>

        <h2 className="heading-l">Basic Info</h2>
        <TableBasicInfo />
      </Container>
    </>
  );
};

export default DemoPage;
