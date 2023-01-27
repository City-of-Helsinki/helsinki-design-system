import React from 'react';
import {
  Button,
  Card,
  Container,
  IconGlobe,
  IconPersonWheelchair,
  IconStar,
  IconFaceSmile,
  IconHeart,
  Footer,
  ImageWithCard,
  Koros,
  Logo,
  Link,
  RoundedTag,
  Table,
} from 'hds-react';

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
      about: ' Gofore, HiQ, Kodan, Nitor, SiteImprove, Solita, Suomen Ohjelmistokehitys OSK, Unicus ',
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
        pageTitle="This is HDS"
        description="The Helsinki Design System is a tool to create a consistent, user-friendly and accessible digital user experience for the City of Helsinki."
      ></Seo>
      <div className="hero-container">
        <div className="hero-wrapper">
          <div className="hero">
            <div className="hero-content">
              <div className="hero-content-shape" />
              <Logo aria-hidden="true" className="info-page-hero-logo" />
              <h1 className="hero-title info-page-hero-title">Helsinki Design System (HDS)</h1>
              <p className="hero-text">
                The Helsinki Design System focuses on usability and accessibility. It aims to improve the quality and
                consistency of the City of Helsinki's digital services – making the user experience better for everyone.
              </p>
              <Button
                variant="primary"
                className="front-page-hero-button"
                role="link"
                onClick={() => {
                  navigate('/getting-started');
                }}
              >
                Visit hds.hel.fi
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
            src={withPrefix('/images/about/this-is-hds/background.jpg')}
          >
            <h2 className="heading-l">Background</h2>
            <p>
              The City of Helsinki offers thousands of digital and non-digital services for different purposes. The
              common goal is to meet the needs of the users.
            </p>
          </ImageWithCard>
        </div>

        <div className="info-page-subcontent">
          <h3 className="heading-l">For example, citizens of Helsinki need to:</h3>
          <div className="info-page-card-grid">
            <Card
              style={{ backgroundImage: `url(${withPrefix('/images/about/this-is-hds/hki-illustration-daycare.svg')}` }}
              className="info-page-card-grid-item info-page-card-grid-item-coat"
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
                Visit site
              </Link>
            </Card>
            <Card
              style={{ backgroundImage: `url(${withPrefix('/images/about/this-is-hds/hki-illustration-dj.svg')}` }}
              className="info-page-card-grid-item info-page-card-grid-item info-page-card-grid-item-metro"
              heading="Find events in Helsinki"
            >
              <Link
                ariaLabel="Learn more about events"
                openInNewTabAriaLabel="Opens in new tab"
                openInExternalDomainAriaLabel="Directs to another site"
                className="info-page-card-grid-link-button"
                href="https://tapahtumat.hel.fi/en/home"
                external
                style={{ color: 'var(--color-black)' }}
              >
                See events
              </Link>
            </Card>
            <Card
              style={{ backgroundImage: `url(${withPrefix('/images/about/this-is-hds/hki-illustration-boat.svg')}` }}
              className="info-page-card-grid-item info-page-card-grid-item-suomenlinna"
              heading="Rent a berth for a boat"
            >
              <Link
                ariaLabel="Learn more about renting a berth for a boat"
                openInNewTabAriaLabel="Opens in new tab"
                openInExternalDomainAriaLabel="Directs to another site"
                className="info-page-card-grid-link-button"
                href="https://venepaikat.hel.fi/fi/berths"
                external
                style={{ color: 'var(--color-black)' }}
              >
                Berth search
              </Link>
            </Card>
            <Card
              style={{
                backgroundImage: `url(${withPrefix('/images/about/this-is-hds/hki-illustration-culture-kids.svg')}`,
              }}
              className="info-page-card-grid-item info-page-card-grid-item-copper"
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
              style={{
                backgroundImage: `url(${withPrefix('/images/about/this-is-hds/hki-illustration-havis-amanda.svg')}`,
              }}
              className="info-page-card-grid-item info-page-card-grid-item-engel"
              heading="Visit the official site"
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
                Visit hel.fi
              </Link>
            </Card>
            <Card
              style={{ backgroundImage: `url(${withPrefix('/images/about/this-is-hds/hki-illustration-truck.svg')}` }}
              className="info-page-card-grid-item info-page-card-grid-item-gold"
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
                See how
              </Link>
            </Card>
          </div>
        </div>

        <div className="info-page-subcontent">
          <h3 className="heading-l">The Helsinki Design System was created to unify the user experience</h3>
          <div className="info-page-box-grid timeline">
            <div className="grid-box">
              <RoundedTag className="box-tag">May 26, 2020</RoundedTag>
              <div className="box-heading">HDS Alpha</div>
              <div className="box-text">Setting up the processes after a proof of concept.</div>
            </div>
            <div className="grid-box">
              <RoundedTag className="box-tag">October 29, 2020</RoundedTag>
              <div className="box-heading">HDS Beta</div>
              <div className="box-text">Providing a foundation of the library components.</div>
            </div>
            <div className="grid-box">
              <RoundedTag className="box-tag">May 3, 2021</RoundedTag>
              <div className="box-heading">HDS 1.0.0</div>
              <div className="box-text">Official support, continuous development, a city-wide acknowledged tool.</div>
            </div>
            <div className="grid-box">
              <RoundedTag className="box-tag">June 27, 2022</RoundedTag>
              <div className="box-heading">HDS 2.0.0</div>
              <div className="box-text">Design update for the entire component library.</div>
            </div>
            <div className="grid-box">
              <RoundedTag
                className="box-tag alert"
                theme={{
                  '--tag-background': 'var(--color-alert)',
                  '--tag-color': 'var(--color-grey-90)',
                }}
              >
                Coming soon
              </RoundedTag>
              <div className="box-heading">HDS 3.0.0</div>
              <div className="box-text">New navigation components and a navigation pattern.</div>
            </div>
          </div>
        </div>

        <div className="info-page-image-card-container">
          <ImageWithCard
            className="info-page-image-card"
            cardLayout="hover"
            cardAlignment="left"
            src={withPrefix('/images/about/this-is-hds/goals.jpg')}
          >
            <h2 className="heading-l">Goals</h2>
            <p>
              The Helsinki Design System helps teams work and communicate more efficiently and supports the City of
              Helsinki in fulfilling its vision in the digital world.
            </p>
          </ImageWithCard>
        </div>

        <div className="info-page-subcontent">
          <h3 className="heading-l">HDS is part of the city strategy</h3>
          <p>
            HDS is a tool for building the digital presence and brand of the City of Helsinki. HDS supports creating
            equal and functional city services.
          </p>

          <p>
            Digitalisation is a key enabler of city services and the new city strategy. The city strategy emphasises
            creating accessible services for all citizens, regardless of the time and place. HDS provides building
            blocks for such services and enables projects to solve actual user problems instead of rebuilding essential
            elements. HDS has accessibility baked in so that the end user projects using the ready components are one
            step closer to accessible services.
          </p>

          <p>
            The brand of Helsinki is present in the physical and digital worlds. One Helsinki is the guideline for
            visual identity in digital services. The goal is for digital services and websites to be recognised as the
            City of Helsinki services at first glance, emphasising consistent user experience and trust towards city
            services. HDS is a cornerstone for building this consistent user experience and bringing the brand to the
            digital world.
          </p>

          <h3 className="heading-l">HDS team vision consists of five cornerstones</h3>
          <div id="vision" className="info-page-box-grid vision">
            <div className="grid-box">
              <IconGlobe size="xl" />
              <div className="box-heading">Unity</div>
              We promote a consistent and whole city experience and maintain the digital appearance of the city.
            </div>
            <div className="grid-box">
              <IconPersonWheelchair size="xl" />
              <div className="box-heading">Equality</div>
              Together, we create a city that is accessible and worthy for every city dweller.
            </div>
            <div className="grid-box">
              <IconStar size="xl" />
              <div className="box-heading">Impact</div>
              We make the city more attractive and a point of pride. We enable evolution by inspiring and supporting.
            </div>
            <div className="grid-box">
              <IconFaceSmile size="xl" />
              <div className="box-heading">Joy</div>
              We enjoy building a better city for everyone and wish to share the delight with every user.
            </div>
            <div className="grid-box">
              <IconHeart size="xl" />
              <div className="box-heading">Wellbeing</div>
              We support the wellbeing of city employees by providing proper tools for digital development.
            </div>
          </div>
        </div>

        <div className="info-page-image-card-container">
          <ImageWithCard
            className="info-page-image-card"
            cardLayout="hover"
            cardAlignment="left"
            src={withPrefix('/images/about/this-is-hds/how-we-work.jpg')}
          >
            <h2 className="heading-l">How we work?</h2>
            <p>
              The Helsinki Design System team is a collaboration of professionals from different consultancies and City
              of Helsinki employees.
            </p>
          </ImageWithCard>
        </div>

        <div className="info-page-subcontent">
          <h3 className="heading-l">Multi-disciplinary collaboration</h3>
          <p>
            The City of Helsinki didn't buy a ready design system but instead gathered the best professionals in the
            same team. This way, the City of Helsinki owns and maintains the design system. When team members change,
            the processes but also the existing design system must be well documented so that it's possible to transfer
            the knowledge.
          </p>
          <p>
            HDS is developed as an open-source project so that anyone can benefit from it. The source code is available
            on
            <Link href="https://github.com/City-of-Helsinki/helsinki-design-system" external size="m">
              GitHub
            </Link>
            free of charge, and even the designs are shared for those interested. Building an open-source design system
            has many valuable points:
          </p>
          <ul>
            <li>Open-source is one way to share the benefits to larger community</li>
            <li>
              Open-source projects enables collaboration with other cities and companies as well, allowing contributions
              from the community
            </li>
            <li>Open-source creates transparency</li>
          </ul>
          <p>
            A fundamental principle is to pay attention to accessibility from the first drafts to the final component.
            Accessibility specialists audit every component before we release it.
          </p>
          <h4>Accessibility is ensured throughout the process</h4>
          <img
            className="accessibility-chart-m"
            src={withPrefix('/images/about/accessibility-flowchart-m.svg')}
            alt="A flowchart illustrating the accessibility process"
          />
          <img
            className="accessibility-chart-s"
            src={withPrefix('/images/about/accessibility-flowchart-s.svg')}
            alt="A flowchart illustrating the accessibility process"
          />
          <p>
            HDS ensures accessibility in every stage of component development. HDS components always meet at least the
            WCAG 2.1 AA level and often reach the AAA level. HDS components and patterns are tested with the newest NVDA
            on Windows and VoiceOver on Mac and iOS.
          </p>
          <p>
            Collaboration and support are built-in into the processes. The City of Helsinki has a dedicated slack
            channel to handle discussions and requests from the projects across the city organization.
          </p>
        </div>

        <div className="info-page-image-card-container">
          <ImageWithCard
            className="info-page-image-card"
            cardLayout="hover"
            src={withPrefix('/images/about/this-is-hds/results.jpg')}
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
            className="info-page-data-card-design"
            border
            heading="HDS design kit is in heavy use"
            text="Fifteen most used Sketch symbol categories as of January 2023"
          >
            <iframe
              className="datawrapper-iframe"
              title="HDS design kit usage"
              aria-label="Interactive bar chart"
              id="datawrapper-chart-WztVi"
              src="https://datawrapper.dwcdn.net/WztVi/"
              scrolling="no"
              frameBorder="0"
              data-external="1"
            ></iframe>
          </Card>

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
            src={withPrefix('/images/about/this-is-hds/basic-information.jpg')}
          >
            <h2 className="heading-l">Basic info</h2>
            <p>
              Below you can find details about HDS in an accessible HDS Table component. This page also uses other
              accessible HDS components.
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
