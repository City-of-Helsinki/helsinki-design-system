import React, { isValidElement } from 'react';

import { WithAuthentication } from './WithAuthentication';
import { User } from '../types';
import { getChildrenAsArray } from '../../../utils/getChildren';

type Props = { user: User };
type RenderProp = (props: Props) => React.ReactElement<Record<string, unknown>>;

export function createChildrenWithUser(children: React.ReactNode | null, user: User): React.ReactNode[] {
  const renderChild = (child: React.ReactElement<Record<string, unknown>>, key: string) => {
    return React.cloneElement(child, { key, ...child.props, user });
  };
  return getChildrenAsArray(children).map((child, index) => {
    if (!child) {
      return null;
    }
    const childType = typeof child;
    if (childType === 'string' || childType === 'number') {
      return child;
    }
    if (childType === 'function') {
      const renderResult = (child as unknown as (props: Props) => React.ReactElement<Record<string, unknown>>)({
        user,
      }) as React.ReactElement<Record<string, unknown>>;
      return renderChild(renderResult, `key-${index}`);
    }
    if (!isValidElement(child)) {
      return null;
    }
    return renderChild(child as React.ReactElement<Record<string, unknown>>, `key-${index}`);
  });
}

/**
 * Renders its children only, if the user is authenticated
 * @param props React.PropsWithChildren<unknown>
 */
export function WithAuthenticatedUser({
  children,
}: {
  children?: React.ReactNode | RenderProp | Array<React.ReactNode | RenderProp>;
}): React.ReactElement<Record<string, unknown>> | null {
  const AuthorisedComponent = (authProps: React.PropsWithChildren<{ user: User }>) => {
    return <>{createChildrenWithUser(children as React.ReactNode, authProps.user)}</>;
  };
  return <WithAuthentication AuthorisedComponent={AuthorisedComponent} />;
}
