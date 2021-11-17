import React from 'react';

import Application from './Application';
import { CookieConsent } from '../CookieConsent';

function Demo(): React.ReactElement {
  return (
    <div>
      <CookieConsent />
      <Application />
    </div>
  );
}

export default Demo;
