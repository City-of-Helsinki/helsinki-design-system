/**
 * SEO component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import * as React from 'react';
import { withPrefix } from 'gatsby';

function Seo({ lang, meta, title, description, pageTitle }) {
  const composedTitle = `${title} | ${pageTitle}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={composedTitle}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: composedTitle,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ].concat(meta)}
    >
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={withPrefix("/favicon/transparent_light_favicon_package/android-chrome-192x192.png")}
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="256x256"
        href={withPrefix("/favicon/transparent_light_favicon_package/android-chrome-256x256.png")}
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="apple-touch-icon"
        href={withPrefix("/favicon/transparent_light_favicon_package/apple-touch-icon.png")}
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={withPrefix("/favicon/transparent_light_favicon_package/favicon-32x32.png")}
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={withPrefix("/favicon/transparent_light_favicon_package/favicon-16x16.png")}
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={withPrefix("/favicon/transparent_dark_favicon_package/android-chrome-192x192.png")}
        media="(prefers-color-scheme: dark)"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="256x256"
        href={withPrefix("/favicon/transparent_dark_favicon_package/android-chrome-256x256.png")}
        media="(prefers-color-scheme: dark)"
      />
      <link
        rel="apple-touch-icon"
        href={withPrefix("/favicon/transparent_dark_favicon_package/apple-touch-icon.png")}
        media="(prefers-color-scheme: dark)"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={withPrefix("/favicon/transparent_dark_favicon_package/favicon-32x32.png")}
        media="(prefers-color-scheme: dark)"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={withPrefix("/favicon/transparent_dark_favicon_package/favicon-16x16.png")}
        media="(prefers-color-scheme: dark)"
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-TileImage" content="/favicon/transparent_light_favicon_package/mstile-150x150.png" />
      <meta name="msapplication-config" content="/favicon/transparent_light_favicon_package/browserconfig.xml" />
    </Helmet>
  );
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

Seo.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  description: PropTypes.string,
  pageTitle: PropTypes.string.isRequired,
};

export default Seo;
