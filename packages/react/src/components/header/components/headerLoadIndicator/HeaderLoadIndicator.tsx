import React from 'react';

import { LoadingSpinner } from '../../../loadingSpinner';

export type HeaderLoadIndicatorProps = {
  spinnerColor?: string;
  loadingText: string;
};

export const HeaderLoadIndicator = ({ spinnerColor, loadingText }: HeaderLoadIndicatorProps) => {
  return (
    <LoadingSpinner
      small
      style={
        {
          '--spinner-color': spinnerColor || `var(--header-spinner-color,--color-black-60)`,
        } as React.HTMLAttributes<HTMLDivElement>['style']
      }
      loadingText={loadingText}
      /* loadingFinishedText is not needed because browser is redirected or an error is shown. */
      loadingFinishedText=""
    />
  );
};
