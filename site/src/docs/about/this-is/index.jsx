import React from 'react';
import { Button, Card, Container, Link, Table } from 'hds-react';
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
  ];
  const verticalHeaders = [
    { key: 'name', headerName: 'Name' },
    { key: 'link', headerName: 'Link' },
    { key: 'client', headerName: 'Client' },
    { key: 'companies', headerName: 'Companies involved since v1.0.0 (in alphabetical order)' },
    { key: 'competition', headerName: 'Competition category' },
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

      <Container className="info-page-content">
        <h2 className="page-heading-2">Background</h2>
        <p>
          The city of Helsinki provides a huge variety of digital services from applying for day care to renting a place
          for your boat, from business opportunities to museums and theathers, from event calendars to construction
          permissions. There are at least 287 recognized web sites, created separately across the city organization.
          There is a huge need to support these different services to create consistent, user friendly and accessible
          digital services.
        </p>

        <h2 className="page-heading-2">Goals</h2>
        <p>
          HDS is an important tool building the digital precence and brand of city of Helsinki. HDS supports creating
          equal and functional city services.
        </p>

        <h2 className="page-heading-2">How we work</h2>
        <p>
          Helsinki Design System -team is a collaboration of professionals from different consultancies and City of
          Helsinki. City of Helsinki didn't buy ready design system but rather decided to gather the best professionals
          in the same team. This way City of Helsinki owns and continues to maintain the design system. When the people
          change, it is important that the processes but also the actual design system are well documented, so that it
          is possible to transfer the knowledge
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

        <h2>Results</h2>
        <Card
          border
          heading="React"
          text="Usage of the React components"
          style={{
            marginTop: 'var(--spacing-s)',
            width: '45%'
          }}
        />


        <Card
          border
          heading="Core"
          text="Usage of Core components"
          style={{
            marginTop: 'var(--spacing-s)',
            width: '45%'
          }}
        />


        <Card
          border
          heading="Design"
          text="Usage of Design kit"
          style={{
            marginTop: 'var(--spacing-s)',
            width: '45%'

          }}
        />


        <Card
          border
          heading="Documentation"
          text="Visitors on the documentation site"
          style={{
            marginTop: 'var(--spacing-s)',
            width: '45%',
          }}
        />


        <h2 className="page-heading-2">Basic Info</h2>
        <TableBasicInfo />
      </Container>
    </>
  );
};

export default DemoPage;
