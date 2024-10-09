require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    title: `Helsinki Design System`,
    description: `Documentation for the Helsinki Design System`,
    siteUrl: process.env.SITE_URL,
    menuLinks: [
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
            name: 'Contributing',
            link: '/getting-started/contributing',
            withDivider: true,
          },
          {
            name: 'FAQ',
            link: '/getting-started/faq',
            withDivider: true,
          },
          {
            name: 'Versioning',
            link: '/getting-started/versioning',
            withDivider: true,
          },
          {
            name: 'Tutorials',
            link: '/getting-started/tutorials',
          },
        ],
      },
      {
        name: 'Foundation',
        link: '/foundation',
        subMenuLinks: [
          {
            name: 'Overview',
            link: '/foundation',
          },
          {
            name: 'Design tokens',
            link: '/foundation/design-tokens',
            withDivider: true,
          },
          {
            name: 'Visual assets',
            link: '/foundation/visual-assets',
          },
          {
            name: 'Guidelines',
            link: '/foundation/guidelines',
          },
        ],
      },
      {
        name: 'Components',
        link: '/components',
        subMenuLinks: [
          {
            name: 'Overview',
            link: '/components',
          },
        ],
      },
      {
        name: 'Patterns',
        link: '/patterns',
        subMenuLinks: [
          {
            name: 'Overview',
            link: '/patterns',
          },
          {
            name: 'Forms',
            link: '/patterns/forms',
          },
          {
            name: 'Cookies',
            link: '/patterns/cookies',
          },
          {
            name: 'Login',
            link: '/patterns/login',
          },
          {
            name: 'Navigation',
            link: '/patterns/navigation',
          },
        ],
      },
      {
        name: 'About',
        link: '/about',
        subMenuLinks: [
          {
            name: 'Support',
            link: '/about',
          },
          {
            name: 'Releases',
            link: '/about/releases',
          },
          {
            name: 'Accessibility',
            link: '/about/accessibility',
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
        path: `${__dirname}/src/docs`,
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `docs-release-3.9.0`,
        remote: `https://github.com/City-of-Helsinki/helsinki-design-system`,
        branch: `release-3.9.0`,
        patterns: `site/src/docs/**`,
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `docs-release-3.0.0`,
        remote: `https://github.com/City-of-Helsinki/helsinki-design-system`,
        branch: `release-3.0.0`,
        patterns: `site/src/docs/**`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<span class="hds-anchor-icon hds-icon hds-icon--link hds-icon--size-xs" aria-hidden="true" style="vertical-align: middle"></span>`,
              isIconAfterHeader: true,
              className: `header-anchor`,
            },
          },
        ],
        mdxOptions: {
          remarkPlugins: [
            require(`remark-gfm`),
          ],
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        theme_color: `#ffffff`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icons: [
          {
            src: '/favicon/light/favicon-32x32.ico',
            sizes: 'any'
          },
          {
            src: '/favicon/light/apple-touch-icon.png',
          },
          {
            src: '/favicon/light/favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/favicon/light/favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        include_favicon: false,
      },
    },
    `gatsby-plugin-sass`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        sitemap: null,
        policy: [{userAgent: '*', disallow: '/v1'}]
      }
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '831',
        matomoUrl: 'https://webanalytics.digiaiiris.com/js',
        siteUrl: 'https://hds.hel.fi',
        matomoJsScript: 'piwik.min.js',
        matomoPhpScript: 'tracker.php',
        requireCookieConsent: true,
      }
    },
    {
      resolve: "gatsby-plugin-no-sourcemaps",
    },
  ],
};
