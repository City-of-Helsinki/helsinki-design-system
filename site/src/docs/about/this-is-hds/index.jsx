import React from 'react';
import { Button, Card, Container,  IconGlobe,
  IconPersonWheelchair, IconStar, IconFaceSmile, IconHeart,
 Footer, ImageWithCard, Koros, Logo, Link, Table } from 'hds-react';

import Seo from '../../../components/Seo';

import './../../../components/layout.scss';
import './styles.scss';
import { navigate, withPrefix } from 'gatsby';

const TableBasicInfo = () => {
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'about', headerName: '' },
  ];
  const unitRows = [
    { id: 'name', about: 'Helsinki Design System (HDS)' },
    {
      id: 'link',
      about: (
        <Link href="https://hds.hel.fi/" size="s">
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
    { key: 'companies', headerName: 'Consultancies since v1.0.0' },
    { key: 'competition', headerName: 'Competition category' },
    { key: 'tech', headerName: 'Technologies used' },
    { key: 'design', headerName: 'Design tools used' },
  ];
  const caption = (
    <span>
      <b>Table 1:</b> Key information on HDS
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
        title="Helsinki Design System (HDS)"
        pageTitle="Info page"
        description="Info page for Helsinki Design system"
      ></Seo>
      <div className="hero-container">
        <div className="hero-wrapper">
          <div className="hero">
            <div className="hero-content">
              <div className="hero-content-shape" />
              <Logo aria-hidden="true" className="info-page-hero-logo" />
              <h1 className="hero-title info-page-hero-title">Helsinki Design System (HDS)</h1>
              <p className="hero-text">
                The Helsinki Design System is focused on usability and accessibility and aims to improve the quality and
                consistency of City of Helsinki digital services – making the user experience better for everyone.
              </p>
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
            </div>
            <Koros className="hero-koros hero-koros-rotated" flipHorizontal rotate="45deg" />
            <Koros className="hero-koros hero-koros-horizontal" flipHorizontal />
          </div>
        </div>
        <div
          className="hero-bg-image"
          style={{ backgroundImage: `url(${withPrefix('/images/about/this-is-hds/tripla.jpg')}` }}
        />
      </div>

      <Container className="info-page-content text-body">
        <div className="info-page-image-card-container">
          <ImageWithCard
            className="info-page-image-card"
            cardLayout="hover"
            cardAlignment="left"
            src="/images/about/this-is-hds/background.jpg"
          >
            <h2 className="heading-l">Background</h2>
            <p>
              The City of Helsinki offers thousands of digital and non-digital services for different purposes. The
              common goal is to meet the needs of the users.
            </p>
          </ImageWithCard>
        </div>

        <div className="info-page-subcontent">
          <h3>For example, citizens of Helsinki need to:</h3>
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
              className="info-page-card-grid-item-dark"
              heading="Find events in Helsinki"
            >
              <Link
                ariaLabel="Learn more about events"
                openInNewTabAriaLabel="Opens in new tab"
                openInExternalDomainAriaLabel="Directs to another site"
                className="info-page-card-grid-link-button"
                href="https://tapahtumat.hel.fi/en/home"
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
        </div>

        <div className="info-page-image-card-container">
          <ImageWithCard
            className="info-page-image-card"
            cardLayout="hover"
            cardAlignment="left"
            src="/images/about/this-is-hds/goals.jpg"
          >
            <h2 className="heading-l">Goals</h2>
            <p>
              The Helsinki Design System helps teams work and communicate more efficiently and supports the City of
              Helsinki in fulfilling its vision in the digital world.{' '}
            </p>
          </ImageWithCard>
        </div>

        <div className="info-page-subcontent">
          <h3 className="heading-l">HDS is part of the city strategy</h3>
          <p>
            HDS is a tool for building the digital presence and brand of city of Helsinki. HDS supports creating equal
            and functional city services.
          </p>

          <p>
            Digitalisation is a key enabler to city services and the new city strategy. The city strategy emphasises
            creating accessible services for all citizens, regardless the time and place. HDS provides building blocks
            for such services and enables projects to solve actual user problems instead of rebuilding basic elements.
            HDS has accessibility baked in so that the end user projects using the ready components are one step closer
            on accessible services.
          </p>

          <p>
            The brand of Helsinki is present in physical world and in digital world. 
            One Helsinki is the guideline for creating the visual identity also in the digital services. The goal is that digital services and websites are recognized as city of Helsinki services at first glance. This emphasizes consistent user experience and trust towards city services.
            HDS is an important corner stone for building this consistent user experience and bringing brand to digital world.
          </p>

          <h3>HDS team vision consists of five cornerstones</h3>
          <div id="vision" className="info-page-card-grid">
            <Card 
              theme={{ '--background-color': 'var(--color-coat-of-arms)', '--color': 'var(--color-white)' }}
              className="info-page-card-grid-item"
              heading =  'Unity'
              >
                <IconGlobe />
                We promote a consistent and whole city experience and maintain the digital appearance of the city.
            </Card>
            <Card 
              theme={{ '--background-color': 'var(--color-coat-of-arms)', '--color': 'var(--color-white)' }}
              className="info-page-card-grid-item"
              heading =  'Equality'
              >
                <IconPersonWheelchair />
                Together, we create a city that is accessible and worthy for every city dweller.
            </Card>
            <Card 
              theme={{ '--background-color': 'var(--color-coat-of-arms)', '--color': 'var(--color-white)' }}
              className="info-page-card-grid-item"
              heading =  'Impact'
              >
                <IconStar />
                We make the city more attractive and a point of pride. We enable evolution by inspiring and supporting.
            </Card>
            <Card 
              theme={{ '--background-color': 'var(--color-coat-of-arms)', '--color': 'var(--color-white)' }}
              className="info-page-card-grid-item"
              heading =  'Joy'
              >
                <IconFaceSmile />
                We enjoy building a better city for everyone and wish to share the delight with every user.
            </Card>
            <Card 
              theme={{ '--background-color': 'var(--color-coat-of-arms)', '--color': 'var(--color-white)' }}
              className="info-page-card-grid-item"
              heading =  'Wellbeing'
              >
                <IconHeart />
                We support the wellbeing of city employees by providing proper tools for digital development.
            </Card>
          </div>

          <h3 className="heading-l">How we work</h3>
          <p>
            Helsinki Design System -team is a collaboration of professionals from different consultancies and City of
            Helsinki. City of Helsinki didn't buy ready design system but rather decided to gather the best
            professionals in the same team. This way City of Helsinki owns and continues to maintain the design system.
            When the people change, it is important that the processes but also the actual design system are well
            documented, so that it is possible to transfer the knowledge.
          </p>

          
          <p>
            HDS is developed as open source project so anyone can benefit from it. The source code is available in{' '}
            <Link href="https://github.com/City-of-Helsinki/helsinki-design-system" external size="m">
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
            HDS ensures accessibility in every stage of component development. HDS components always meet at least WCAG
            2.1 AA level and often also reach the AAA level. HDS components and patterns are tested with the newest NVDA
            on Windows and the newest VoiceOver on Mac and iOS.{' '}
          </p>
          <p>
            Collaboration and support are built-in in the processes. City of Helsinki has a dedicated slack-channel to
            handle discussion and requests from the projects across the city organization.
          </p>
        </div>

        <div className="info-page-image-card-container">
          <ImageWithCard
            className="info-page-image-card"
            cardLayout="hover"
            src="/images/about/this-is-hds/results.jpg"
          >
            <h2 className="heading-l">Results</h2>
            <p>
              The Helsinki Design System gains more users from the City of Helsinki teams and the impact on the city's
              digital user experience is constantly increasing.
            </p>
          </ImageWithCard>
        </div>

        <div className="info-page-subcontent">
          <h3 className="heading-l">Some of our key metrics</h3>

          <Card
            className="info-page-data-card"
            border
            heading="HDS component usage is increasing"
            text="React component instances in the City of Helsinki's projects at nine times"
          >
            <iframe
              className="datawrapper-iframe"
              title="HDS React component usage"
              aria-label="Interactive bar chart"
              id="datawrapper-chart-X0PtN"
              src="https://datawrapper.dwcdn.net/X0PtN/8/"
              scrolling="no"
              frameBorder="0"
              data-external="1"
            ></iframe>
          </Card>

          <Card
            className="info-page-data-card"
            border
            heading="HDS design kit usage"
            text="Lorem ipsum..."
            style={{}}
          />

          <Card
            className="info-page-data-card"
            border
            heading="HDS documentation is viewed more"
            text="Unique visitors on hds.hel.fi from June 2020 to December 2022"
          >
            <iframe
              className="datawrapper-iframe"
              title="Unique visitors on hds.hel.fi"
              aria-label="Interactive line chart"
              id="datawrapper-chart-LLonN"
              src="https://datawrapper.dwcdn.net/LLonN/3/"
              scrolling="no"
              frameBorder="0"
              data-external="1"
            ></iframe>
          </Card>
        </div>

        <div className="info-page-image-card-container">
          <ImageWithCard
            className="info-page-image-card"
            cardLayout="hover"
            cardAlignment="left"
            src="/images/about/this-is-hds/basic-information.jpg"
          >
            <h2 className="heading-l">Basic info</h2>
            <p>
              Below you can find details about the Helsinki Design System in an accessible HDS Table component. This
              page uses HDS components solely.{' '}
            </p>
          </ImageWithCard>
        </div>

        <div className="info-page-subcontent">
          <div className="info-page-table">
            <TableBasicInfo />
          </div>
        </div>
      </Container>
      <Footer id="page-footer" className="page-footer" title="Helsinki Design System">
        <Footer.Base copyrightHolder="Copyright">
          <Footer.Item label="Contribution" href={withPrefix('/getting-started/contributing/before-contributing')} />
          <Footer.Item label="Accessibility" href={withPrefix('/about/accessibility/statement')} />
          <Footer.Item label="GitHub" href="https://github.com/City-of-Helsinki/helsinki-design-system" />
        </Footer.Base>
      </Footer>
    </>
  );
};

export default DemoPage;
