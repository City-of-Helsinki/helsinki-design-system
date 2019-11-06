module.exports = {
  dest: "/public",
  public: "/static",
  typescript: true,
  themeConfig: {
    showDarkModeSwitch: false
  },
  files: "docs/**/*.{md,markdown,mdx}",
  title: "Helsinki Design System",
  menu: [
    "Introduction",
    { name: "Get Started", menu: ["For designers", "For developers"] },
    "Guidelines",
    "Components",
    "Community"
  ]
};
