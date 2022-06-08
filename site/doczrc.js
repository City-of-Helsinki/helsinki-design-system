const themeConfig = {
  showDarkModeSwitch: false,
  showPlaygroundEditor: false,
  fonts: {
    body: '"HelsinkiGrotesk", Helvetica, Arial, MS Gothic, Meiryo, Osaka',
    heading: '"HelsinkiGrotesk", Helvetica, Arial, MS Gothic, Meiryo, Osaka',
    monospace: 'Menlo, monospace',
  },
};

const menu = [
  'Helsinki Design System',
  {
    name: 'Getting started',
    menu: ['Introduction', 'For designers', 'For developers'],
  },
  {
    name: 'Tutorials',
    menu: ['Guide to version 1.0.0', 'Getting started with Abstract'],
  },
  'Tutorials',
  'Guidelines',
  'Visual assets',
  'Design tokens',
  {
    name: 'Components',
    menu: ['Overview'],
  },
  {
    name: 'Patterns',
    menu: ['Forms', 'Form validation'],
  },
  {
    name: 'About',
    menu: ['What is new', 'Roadmap', 'Support', 'Accessibility statement'],
  },
  {
    name: 'Contributing',
    menu: ['Before contributing', 'Design', 'Implementation', 'Documentation'],
  },
  'Resources',
];

export default {
  base: '/v1.0',
  dest: '/public',
  public: '/static',
  typescript: true,
  src: 'docs',
  files: 'docs/**/*.{md,markdown,mdx}',
  title: 'Helsinki Design System',
  themeConfig,
  menu,
};
