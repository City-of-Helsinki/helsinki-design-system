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
    name: 'Get Started',
    menu: ['Introduction', 'For Designers', 'For Developers'],
  },
  'Guidelines',
  'Design tokens',
  'Visual elements',
  {
    name: 'Components',
    menu: ['HDS Components'],
  },
  'How to contribute',
  'About'
];

export default {
  dest: '/public',
  public: '/static',
  typescript: true,
  src: 'docs',
  files: 'docs/**/*.{md,markdown,mdx}',
  title: 'Helsinki Design System',
  themeConfig,
  menu,
};
