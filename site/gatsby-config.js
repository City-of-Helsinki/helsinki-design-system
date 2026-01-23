require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const fs = require('node:fs');
const path = require('node:path');

const buildSingleVersion = process.env.BUILD_SINGLE_VERSION === 'true';

// Extract version number from directory name
function extractVersionFromDir(dir) {
  const versionPart = dir.replace('helsinki-design-system-', '');
  // Extract only the semantic version part (X.Y.Z)
  // This ensures we extract just the version even if there's extra text after it
  const match = versionPart.match(/^(\d+\.\d+\.\d+)/);
  return match ? match[1] : null;
}

// Sort versions descending (newest first)
function sortVersionsDesc(a, b) {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if (bParts[i] !== aParts[i]) return bParts[i] - aParts[i];
  }
  return 0;
}

// Auto-detect versions from .previous-versions directory
function getPreviousVersions() {
  const previousVersionsDir = path.join(__dirname, '.previous-versions');
  if (!fs.existsSync(previousVersionsDir)) return [];
  
  try {
    return fs.readdirSync(previousVersionsDir)
      .filter(item => {
        const itemPath = path.join(previousVersionsDir, item);
        try {
          return fs.statSync(itemPath).isDirectory() && item.startsWith('helsinki-design-system-');
        } catch {
          return false;
        }
      })
      .map(extractVersionFromDir)
      .filter(Boolean)
      .sort(sortVersionsDesc)
      .reduce((acc, version) => {
        // Ensure we only keep the latest minor for each major version
        const major = version.split('.')[0];
        if (!acc.some(v => v.split('.')[0] === major)) {
          acc.push(version);
        }
        return acc;
      }, [])
      .slice(0, 2); // Get latest minors from the previous two majors
  } catch (error) {
    console.warn('Warning: Could not read .previous-versions directory:', error.message);
    return [];
  }
}

const previousVersions = buildSingleVersion ? [] : getPreviousVersions();

// Get current version from package.json for siteMetadata
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version;

// Combine current and previous versions into a single array
const versions = buildSingleVersion ? [currentVersion] : [currentVersion, ...previousVersions];

// Create local sources using gatsby-source-filesystem
const previousVersionSources = previousVersions.map(version => {
  const docsPath = path.join(__dirname, `.previous-versions/helsinki-design-system-${version}/site/src/docs`);
  
  // Verify the path exists before adding it
  if (fs.existsSync(docsPath)) {
    return {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs-release-${version}`,
        path: docsPath,
      },
    };
  }
  return null;
}).filter(Boolean);

module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    versions,
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
    ...previousVersionSources,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false
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
