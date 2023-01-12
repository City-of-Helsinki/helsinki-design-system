import React from 'react';
import { Button, Container } from 'hds-react';
import Hero from '../../../components/Hero';
import Seo from '../../../components/Seo';

import './../../../components/layout.scss';
import './styles.scss';

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
        text="The Helsinki Design System (HDS) is focused on usability and accessibility. HDS aims to improve the quality and consistency of the City of Helsinki's digital services – making the user experience better for everyone."
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
        <h2 className="page-heading-2">Goals</h2>
        <p>Content</p>
      </Container>
    </>
  );
};

export default DemoPage;
