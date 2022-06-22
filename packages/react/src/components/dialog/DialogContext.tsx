import React from 'react';

export type DialogContextProps = {
  /**
   * scrollable boolean that is passed down to children
   */
  scrollable?: boolean;
  close?: () => void;
  closeButtonLabelText?: string;
  isReadyToShowDialog?: boolean;
};

export const DialogContext = React.createContext<DialogContextProps>({});
