/**
 * SEO component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import * as React from 'react';

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
    />
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
