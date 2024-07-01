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
  };

  return <button {...buttonProps} type="button" />;
};
