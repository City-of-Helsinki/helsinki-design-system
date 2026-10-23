import React from 'react';
import { useVisuallyHidden } from '@react-aria/visually-hidden';

import { HeaderErrorUsageType, useHeaderError } from './useHeaderError';

export const HeaderErrorFocusShifter = () => {
  const { hasError, elementProps } = useHeaderError({
    usage: HeaderErrorUsageType.FocusShifter,
  });
  const { visuallyHiddenProps } = useVisuallyHidden();
  if (!hasError) {
    return null;
  }

  const buttonProps = {
    ...visuallyHiddenProps,
    ...elementProps,
  } as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return <button {...buttonProps} type="button" />;
};
