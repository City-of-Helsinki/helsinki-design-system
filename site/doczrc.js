const themeConfig = {
  showDarkModeSwitch: false,
  fonts: {
    body: '"HelsinkiGrotesk", Helvetica, Arial, MS Gothic, Meiryo, Osaka',
    heading: '"HelsinkiGrotesk", Helvetica, Arial, MS Gothic, Meiryo, Osaka',
    monospace: "Menlo, monospace"
  }
};

const menu = [
  "Introduction",
  { name: "Get Started", menu: ["For designers", "For developers"] },
  "Guidelines",
  "Components",
  "Community"
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
