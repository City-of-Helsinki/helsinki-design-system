import * as React from 'react';
import { Helmet } from 'react-helmet';

import 'hds-core';
import './assets/index.css';

const Wrapper = ({ children }) => (
  <React.Fragment>
    <Helmet>
      <link rel="apple-touch-icon" sizes="57x57" href={require('./assets/apple-icon-57x57.png')} />
      <link rel="apple-touch-icon" sizes="60x60" href={require('./assets/apple-icon-60x60.png')} />
      <link rel="apple-touch-icon" sizes="72x72" href={require('./assets/apple-icon-72x72.png')} />
      <link rel="apple-touch-icon" sizes="76x76" href={require('./assets/apple-icon-76x76.png')} />
      <link rel="apple-touch-icon" sizes="114x114" href={require('./assets/apple-icon-114x114.png')} />
      <link rel="apple-touch-icon" sizes="120x120" href={require('./assets/apple-icon-120x120.png')} />
      <link rel="apple-touch-icon" sizes="144x144" href={require('./assets/apple-icon-144x144.png')} />
      <link rel="apple-touch-icon" sizes="152x152" href={require('./assets/apple-icon-152x152.png')} />
      <link rel="apple-touch-icon" sizes="180x180" href={require('./assets/apple-icon-180x180.png')} />
      <link rel="icon" type="image/png" sizes="144x144" href={require('./assets/android-icon-144x144.png')} />
      <link rel="icon" type="image/png" sizes="32x32" href={require('./assets/favicon-32x32.png')} />
      <link rel="icon" type="image/png" sizes="96x96" href={require('./assets/favicon-96x96.png')} />
      <link rel="icon" type="image/png" sizes="16x16" href={require('./assets/favicon-16x16.png')} />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content={require('./assets/ms-icon-144x144.png')} />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
    <div className="text-body">{children}</div>
  </React.Fragment>
);
export default Wrapper;
