const config = {
  gatsby: {
    pathPrefix: "/",
    siteUrl: "https://www.hel.fi",
    gaTrackingId: null
  },
  header: {
    logo:
      "https://www.hel.fi/wps/CoHTheme/themes/html/RWD_main_theme_v2/img/HelsinkiUusiLogo.svg",
    logoLink: "",
    title: "Helsinki Design System",
    githubUrl: "https://github.com/City-of-Helsinki/helsinki-design-system",
    helpUrl: "",
    tweetText: "",
    links: [{ text: "", link: "" }],
    search: {
      enabled: false,
      indexName: "",
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY
    }
  },
  sidebar: {
    forcedNavOrder: [
      "/index",
      "/getstarted",
      "/guidelines",
      "/components",
      "/featurenotes"
    ],
    links: [
      { text: "City of Helsinki", link: "https://www.hel.fi/helsinki/en" }
    ],
    frontline: false,
    ignoreIndex: false
  },
  siteMetadata: {
    title: "Helsinki Design System | City of Helsinki",
    description: "Helsinki Design System documentation",
    ogImage: null,
    docsLocation:
      "https://github.com/City-of-Helsinki/helsinki-design-system/tree/master/site/content",
    favicon:
      "http://www.hel.fi/wps/CoHTheme/themes/html/RWD_main_theme/img/helfi-favicon.ico"
  }
};

module.exports = config;
