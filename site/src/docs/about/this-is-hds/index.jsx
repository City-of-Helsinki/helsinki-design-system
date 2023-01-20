import React from 'react';
import { Accordion, useAccordion, Button, Card, Container, IconAngleDown, IconAngleUp, ImageWithCard, Link, Linkbox, Table } from 'hds-react';
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

export const AccordionExamples = () => {
  const initiallyOpen = false;
  const { isOpen, buttonProps, contentProps } = useAccordion({ initiallyOpen });
  const icon = isOpen ? <IconAngleUp aria-hidden /> : <IconAngleDown aria-hidden />;
  return (
    <>
      <Button iconLeft={icon} {...buttonProps}>
        Show me examples
      </Button>
      <Card aria-label="Show me examples" style={{ marginTop: 'var(--spacing-m)' }} {...contentProps}>
        <h2>Citizens of Helsinki need to</h2>
        <Linkbox linkboxAriaLabel="Linkbox: hel.fi main site" linkAriaLabel="hel.fi" href="https://hel.fi" withBorder>
          <div style={{ height: '106px', marginTop: 'var(--spacing-m)' }} ><h3>Visit city of Helsinki main site</h3></div>
        </Linkbox>
        <Linkbox linkboxAriaLabel="Linkbox: Asti" linkAriaLabel="Asti" href="https://asti.hel.fi" withBorder>
          <div style={{ height: '106px', marginTop: 'var(--spacing-m)' }} ><h3>Apply to daycare</h3></div>
        </Linkbox>
        <Linkbox linkboxAriaLabel="Linkbox: Boat Berts" linkAriaLabel="Boat Berths" href="https://hds.hel.fi" withBorder>
              <div style={{ height: '106px', marginTop: 'var(--spacing-m)' }}><h3>Rent boat berths</h3></div>
        </Linkbox>
        <Linkbox linkboxAriaLabel="Linkbox: Culture Kids" linkAriaLabel="Asti" href="https://kummilapset.hel.fi/en/" withBorder>
          <div style={{ height: '106px', marginTop: 'var(--spacing-m)' }}><h3>Enjoy culture with kids</h3></div>
        </Linkbox>
        <Linkbox linkboxAriaLabel="Linkbox: Events Helsinki" linkAriaLabel="Events Helsinki" href="https://hds.hel.fihttps://tapahtumat.hel.fi/en/home" withBorder>
              <div style={{ height: '106px', marginTop: 'var(--spacing-m)' }}><h3>Find events in Helsinki</h3></div>
        </Linkbox>

      </Card>
    </>
  );
};

//<script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();</script>

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
        <ImageWithCard cardLayout="hover" src="/images/homepage/amos58.jpg" color="--silver-medium-light">
         <h2 className="heading-l">Background</h2>
          <p >
          The City of Helsinki offers thousands of digital and non-digital services for different purposes. 
          The common goal is to meet the needs of the users.
          </p>
        </ImageWithCard>

        <ImageWithCard cardLayout="hover" src="/images/homepage/amos58.jpg" color="--silver-medium-light">
         <h2 className="heading-l">Goals</h2>
          <p >
          The Helsinki Design System is a shared point of reference for designers, developers and product owners working for the City of Helsinki. HDS helps teams work and communicate more efficiently and assists the City of Helsinki in fulfilling its vision in the digital world. </p>
        </ImageWithCard>
        
        <h2 className="heading-l">HDS is part of the city strategy</h2>
        <p>
        HDS is a tool for building the digital presence and brand of city of Helsinki. HDS supports creating equal and functional city services.</p>

        <p>Digitalisation is a key enabler to city services and the new city strategy. The city strategy emphasises creating accessible services for all citizens, regardless the time and place. HDS provides building blocks for such services and enables projects to solve actual user problems instead of rebuilding basic elements. HDS has accessibility baked in so that the end user projects using the ready components are one step closer on accessible services.</p>

        <p>HDS ensures accessibility in every stage of component development. HDS components always meet at least WCAG 2.1 AA level and often also reach the AAA level. HDS components and patterns are tested with the newest NVDA on Windows and the newest VoiceOver on Mac and iOS. </p>

        <p>The brand of Helsinki is present in physical world and in digital world. These two should represent the same city and feel familiar and recognisable. HDS is a tool to build digital presence according to city of Helsinki brand.</p>
        

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

        <h2 className="heading-l">Results</h2>

        <Card
          border
          heading="HDS React component usage"
          text="lore ipsum"
          style={{
            marginTop: 'var(--spacing-s)',

          }}
        >
          <iframe title="HDS React component usage" aria-label="Interactive bar chart" id="datawrapper-chart-X0PtN" src="https://datawrapper.dwcdn.net/X0PtN/8/" scrolling="no" frameborder="0" data-external="1"
            style={{
              width: "100%", 
              //min-width: "100% !important",
              border: "none", 
              height:"620",
            }}
          >
          </iframe>
          
        </Card>


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
          heading="Unique visitors on hds.hel.fi"
          text="Unique visitors on the documentation site between June 2020 to end of December 2022."
          style={{
            marginTop: 'var(--spacing-s)',

          }}
        >
          <iframe title="Unique visitors on hds.hel.fi" aria-label="Interactive line chart" id="datawrapper-chart-LLonN" src="https://datawrapper.dwcdn.net/LLonN/3/" scrolling="no" frameborder="0" data-external="1"
            style={{
              width: "100%", 
              //min-width: "100% !important",
              border: "none", 
              height:"620",
            }}
          >
          </iframe>
          
        </Card>
        
          


        <h2 className="heading-l">Basic Info</h2>
        <TableBasicInfo />
      </Container>
    </>
  );
};

export default DemoPage;

