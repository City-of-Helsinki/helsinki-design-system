module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    title: `Helsinki Design System`,
    description: `Documentation for the Helsinki Design System`,
    siteUrl: `https://hds.hel.fi/`,
    menuLinks: [
      {
        name: 'Home',
        link: '/',
        subMenuLinks: [],
      },
      {
        name: 'Getting started',
        link: '/getting-started',
        subMenuLinks: [
          {
            name: 'Getting started',
            link: '/getting-started',
          },
          {
            name: 'Designer',
            link: '/getting-started/designer',
            withDivider: true,
          },
          {
            name: 'Developer',
            link: '/getting-started/developer',
          },
          {
            name: 'FAQ',
            link: '/getting-started/faq',
            withDivider: true,
          },
          {
            name: 'Tutorials',
            link: '/getting-started/tutorials',
          },
        ],
      },
      {
        name: 'Guidelines',
        link: '/guidelines',
        subMenuLinks: [
          {
            name: 'Overview',
            link: '/guidelines',
          },
          {
            name: 'Data formats',
            link: '/guidelines/data-formats',
            withDivider: true,
          },
          {
            name: 'Grid',
            link: '/guidelines/grid',
          },
          {
            name: 'Inclusivity',
            link: '/guidelines/inclusivity',
          },
          {
            name: 'Localisation',
            link: '/guidelines/localisation',
          },
          {
            name: 'Photography',
            link: '/guidelines/photography',
          },
          {
            name: 'Checkboxes, radio buttons, or toggles?',
            link: '/guidelines/checkbox-radiobutton-toggle',
            withDivider: true,
          },
        ],
      },
      {
        name: 'Elements',
        link: '/elements',
        subMenuLinks: [
          {
            name: 'Overview',
            link: '/elements',
          },
          {
            name: 'Visual assets',
            link: '/elements/visual-assets',
            withDivider: true,
          },
          {
            name: 'Design tokens',
            link: '/elements/design-tokens',
          },
          {
            name: 'Components',
            link: '/elements/components',
          },
        ],
      },
      {
        name: 'About',
        link: '/about',
        subMenuLinks: [
          {
            name: 'Overview',
            link: '/about',
          },
          {
            name: 'Support',
            link: '/about/support',
            withDivider: true,
          },
          {
            name: 'Contributing',
            link: '/about/contributing',
          },
          {
            name: 'Accessibility',
            link: '/about/accessibility',
          },
          {
            name: 'What is new',
            link: '/about/what-is-new',
            withDivider: true,
          },
          {
            name: 'Roadmap',
            link: '/about/roadmap',
          },
          {
            name: 'Resources',
            link: '/about/resources',
            withDivider: true,
          },
        ],
      },
    ],
    footerTitle: 'Helsinki Design System',
    footerAriaLabel: 'HDS footer',
    footerCopyrightLinks: [
      {
        name: 'Accessibility',
        link: '/about/accessibility',
      },
      {
        name: 'GitHub',
        link: 'https://github.com/City-of-Helsinki/helsinki-design-system',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: `${__dirname}/src/docs/`,
      },
    },
    // This config is needed when pages are somewhere else than in the pages folder.
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src/docs`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<i class="hdsAnchorIcon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></i>`,
              isIconAfterHeader: true,
              className: `headerAnchor`
            }
          }
        ],
        defaultLayouts: {
          default: require.resolve('./src/components/layout.js'),
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
