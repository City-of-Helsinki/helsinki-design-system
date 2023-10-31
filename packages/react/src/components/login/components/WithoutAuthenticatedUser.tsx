import React from 'react';

import { WithAuthentication } from './WithAuthentication';

/**
 * Renders its children only, if the user is not authenticated
 * @param props React.PropsWithChildren<unknown>
 */
export function WithoutAuthenticatedUser(props: React.PropsWithChildren<unknown>): React.ReactElement | null {
  const UnauthorisedComponent = () => {
    return <>{props.children}</>;
  };
  return <WithAuthentication UnauthorisedComponent={UnauthorisedComponent} />;
}
