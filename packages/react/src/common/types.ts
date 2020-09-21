import React from 'react';

/**
 * Extends the React FunctionComponent type with the componentName key
 *
 */
export type FCWithName = React.FC & { componentName: string };
