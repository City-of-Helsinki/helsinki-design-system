import React, { useState } from 'react';

export type AccordionConfig = {
  initiallyOpen: boolean;
};

export type AccordionButtonProps = {
  onClick: () => void;
  'aria-expanded': boolean;
};

export type AccordionContentProps = {
  style?: React.CSSProperties;
};

export type AccordionState = {
  isOpen: boolean;
  openAccordion: () => void;
  closeAccordion: () => void;
  toggleAccordion: () => void;
  buttonProps: AccordionButtonProps;
  contentProps: AccordionContentProps;
};

export const useAccordion = ({ initiallyOpen = false }: AccordionConfig): AccordionState => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const openAccordion = () => {
    setIsOpen(true);
  };

  const closeAccordion = () => {
    setIsOpen(false);
  };

  const toggleAccordion = () => {
    isOpen ? closeAccordion() : openAccordion();
  };

  const buttonProps: AccordionButtonProps = {
    onClick: toggleAccordion,
    'aria-expanded': isOpen,
  };

  const contentProps: AccordionContentProps = {};
  if (isOpen === false) {
    contentProps.style = { display: 'none' };
  }

  return {
    isOpen,
    openAccordion,
    closeAccordion,
    toggleAccordion,
    buttonProps,
    contentProps,
  };
};
