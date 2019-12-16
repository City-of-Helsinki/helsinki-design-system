import React from 'react';
import { storiesOf } from '@storybook/react';

import imageFile from '../assets/img/placeholder_1920x1080.jpg';
import imageFile2 from '../assets/img/placeholder_2_1920x1080.jpg';
import imageFile3 from '../assets/img/placeholder_1400x1164.jpg';
import Section from '../components/section/Section';
import Columns from '../components/columns/Columns';
import ImageWithCard from '../components/imagewithcard/ImageWithCard';
import TextInput from '../components/textinput/TextInput';
import Button from '../components/button/Button';
import { IconAngleRight } from '../icons';

const ExampleView = () => (
  <>
    <Section color="secondary" korosType="basic">
      <h1>Lorem ipsum dolor sit</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi
        consequat.
      </p>
    </Section>
    <ImageWithCard fullWidth src={imageFile2} />
    <Section>
      <h2>Lorem ipsum</h2>
      <Columns>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi
            consequat.
          </p>
          <TextInput id="myInput" alternative labelText="Lorem ipsum:" placeholder="dolor sit" />
          <br />
          <Button color="secondary">Lorem</Button>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi
            consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
        </div>
      </Columns>
    </Section>
    <ImageWithCard fullWidth color="tertiary" cardLayout="split" cardAlignment="right" src={imageFile}>
      <h2>Lorem ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi
        consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint obcaecat cupiditat non proident.
      </p>
      <Button color="supplementary" iconRight={<IconAngleRight />}>
        Ipsum
      </Button>
    </ImageWithCard>
    <Section>
      <h2>
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
        aliqua.
      </h2>
    </Section>
    <ImageWithCard color="primary" cardLayout="hover" src={imageFile3}>
      <h2>Lorem ipsum</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi
        consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <Button color="tertiary" iconRight={<IconAngleRight />}>
        Lorem
      </Button>
    </ImageWithCard>
  </>
);

storiesOf('ExampleView', module).add('ExampleView', () => <ExampleView />);
