import * as React from 'react';
import { createMedia, BreakpointKey } from '@artsy/fresnel';

export const breakpoints = {
  xs: 0,
  s: 576,
  m: 768,
  l: 992,
  xl: 1248,
};

export const { MediaContextProvider, Media, createMediaStyle } = createMedia({
  breakpoints,
});

export const mediaStylesAsString = createMediaStyle([BreakpointKey.between, BreakpointKey.greaterThanOrEqual]);

export const MobileMedia = ({ children }) => <Media between={['xs', 'm']}>{children}</Media>;
export const DesktopMedia = ({ children }) => <Media greaterThanOrEqual="m">{children}</Media>;
