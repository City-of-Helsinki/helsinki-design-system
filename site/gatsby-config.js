module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: 63,
        matomoUrl: 'https://analytics.hel.ninja/',
        siteUrl: 'https://hds.hel.fi/',
      },
    },
  ],
};
