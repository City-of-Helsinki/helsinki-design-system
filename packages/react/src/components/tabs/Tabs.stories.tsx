import React from 'react';

import { Tabs } from './Tabs';
import { TabList } from './TabList';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';

export default {
  component: Tabs,
  title: 'Components/Tabs',
  decorators: [
    (storyFn) => (
      <div>
        <style>{`.example-tablist { margin-bottom: var(--spacing-m); }`}</style>
        {storyFn()}
      </div>
    ),
  ],
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Default = () => (
  <Tabs>
    <TabList className="example-tablist">
      <Tab>Daycare</Tab>
      <Tab>Pre-school</Tab>
      <Tab>Basic education</Tab>
      <Tab>Upper secondary</Tab>
      <Tab>University</Tab>
    </TabList>
    <TabPanel>Daytime care for people who cannot be fully independent, such as children or elderly people.</TabPanel>
    <TabPanel>
      A pre-school is an educational establishment offering early childhood education to children before they begin
      compulsory education at primary school.
    </TabPanel>
    <TabPanel>
      The objective of basic education in Finland is to support pupils&#39; growth towards humanity and ethically
      responsible membership of society.
    </TabPanel>
    <TabPanel>
      Upper secondary school studies last three to four years, preparing the students for the matriculation examination.
    </TabPanel>
    <TabPanel>
      A high-level educational institution in which students study for degrees and academic research is done.
    </TabPanel>
  </Tabs>
);

export const Small = () => (
  <Tabs small>
    <TabList className="example-tablist">
      <Tab>Daycare</Tab>
      <Tab>Pre-school</Tab>
      <Tab>Basic education</Tab>
      <Tab>Upper secondary</Tab>
      <Tab>University</Tab>
    </TabList>
    <TabPanel>Daytime care for people who cannot be fully independent, such as children or elderly people.</TabPanel>
    <TabPanel>
      A pre-school is an educational establishment offering early childhood education to children before they begin
      compulsory education at primary school.
    </TabPanel>
    <TabPanel>
      The objective of basic education in Finland is to support pupils&#39; growth towards humanity and ethically
      responsible membership of society.
    </TabPanel>
    <TabPanel>
      Upper secondary school studies last three to four years, preparing the students for the matriculation examination.
    </TabPanel>
    <TabPanel>
      A high-level educational institution in which students study for degrees and academic research is done.
    </TabPanel>
  </Tabs>
);

export const WithCustomTheme = () => {
  const theme = {
    '--tab-color': 'var(--color-brick)',
    '--tab-active-border-color': 'var(--color-brick)',
  };

  return (
    <Tabs theme={theme}>
      <TabList className="example-tablist">
        <Tab>Daycare</Tab>
        <Tab>Pre-school</Tab>
        <Tab>Basic education</Tab>
        <Tab>Upper secondary</Tab>
        <Tab>University</Tab>
      </TabList>
      <TabPanel>Daytime care for people who cannot be fully independent, such as children or elderly people.</TabPanel>
      <TabPanel>
        A pre-school is an educational establishment offering early childhood education to children before they begin
        compulsory education at primary school.
      </TabPanel>
      <TabPanel>
        The objective of basic education in Finland is to support pupils&#39; growth towards humanity and ethically
        responsible membership of society.
      </TabPanel>
      <TabPanel>
        Upper secondary school studies last three to four years, preparing the students for the matriculation
        examination.
      </TabPanel>
      <TabPanel>
        A high-level educational institution in which students study for degrees and academic research is done.
      </TabPanel>
    </Tabs>
  );
};
