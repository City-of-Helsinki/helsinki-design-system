import React from 'react';

import { useAuthenticatedUser } from '../../../login/client/hooks';
import { IconUser } from '../../../../icons';
import { Profile } from '../../../login';
import { HeaderActionBarItem, HeaderActionBarItemProps } from '../headerActionBarItem';
import { HeaderErrorUsageType, useHeaderError } from '../headerError/useHeaderError';

const getAvatarContent = (profile: Profile): string => {
  // eslint-disable-next-line camelcase
  const { email, given_name, family_name } = profile;
  // eslint-disable-next-line camelcase
  const initials = [given_name, family_name]
    .filter((str) => !!str)
    .map((str) => (str as string).substring(0, 1))
    .join('');
  if (initials.length > 0) {
    return initials;
  }
  return String(email || '').substring(0, 1) || '';
};

export const HeaderUserMenuButton = ({ children, ...rest }: HeaderActionBarItemProps) => {
  const user = useAuthenticatedUser();
  const { elementProps } = useHeaderError({ usage: HeaderErrorUsageType.UserMenu });
  if (!user || !user.profile) {
    return null;
  }
  const { profile } = user;

  const itemProps: HeaderActionBarItemProps = {
    ...rest,
    ...elementProps,
    label: profile.name || profile.email,
    avatar: getAvatarContent(profile).toUpperCase(),
    fixedRightPosition: true,
    icon: <IconUser />,
  };

  return <HeaderActionBarItem {...itemProps}>{children}</HeaderActionBarItem>;
};
