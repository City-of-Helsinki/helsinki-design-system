import React from 'react';

import { WithAuthentication } from './WithAuthentication';

export function WithoutAuthenticatedUser(props: React.PropsWithChildren<unknown>): React.ReactElement | null {
  const UnauthorisedComponent = () => {
    return <>{props.children}</>;
  };
  return <WithAuthentication UnauthorisedComponent={UnauthorisedComponent} />;
}
