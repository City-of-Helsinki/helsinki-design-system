const themeConfig = {
  showDarkModeSwitch: false,
  fonts: {
    body: '"HelsinkiGrotesk", Helvetica, Arial, MS Gothic, Meiryo, Osaka',
    heading: '"HelsinkiGrotesk", Helvetica, Arial, MS Gothic, Meiryo, Osaka',
    monospace: "Menlo, monospace"
  }
};

const menu = [
  "Helsinki Design System",
  {
    name: "Get Started",
    menu: ["Introduction", "For Designers", "For Developers"]
  },
  "Guidelines",
  "Components"
];

export default {
  dest: "/public",
  public: "/static",
  typescript: true,
  files: "docs/**/*.{md,markdown,mdx}",
  title: "Helsinki Design System",
  themeConfig,
  menu
};
