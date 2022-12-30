// FIXME: This is just a copy of the file in packages/react/src/components/accordion

export type Language = 'en' | 'fi' | 'sv';

export interface AccordionCustomTheme {
  '--background-color'?: string;
  '--border-color'?: string;
  '--padding-horizontal'?: string;
  '--padding-vertical'?: string;
  '--header-font-color'?: string;
  '--header-font-size'?: string;
  '--header-line-height'?: string;
  '--button-size'?: string;
  '--header-focus-outline-color'?: string;
  '--content-font-size'?: string;
  '--content-line-height'?: string;
}

export type CommonAccordionProps = React.PropsWithChildren<{
  /**
   * If `true` border will be drawn around the accordion card.
   */
  border?: false;
  /**
   * Use the card variant if `true`
   */
  card?: false;
  /**
   * Additional class names for accordion
   */
  className?: string;
  /**
   * Boolean indicating whether there is a close button at the bottom of the accordion or not.
   * @Default true
   */
  closeButton?: boolean;
  /**
   * className for close button to enable custom styling
   */
  closeButtonClassName?: string;
  /**
   * Heading text.
   */
  heading?: string;
  /**
   * Heading level
   * @default 2
   */
  headingLevel?: number;
  /**
   * The id for the accordion element
   */
  id?: string;
  /**
   * Boolean indicating whether the accordion is initially opened.
   * @default false
   */
  initiallyOpen?: boolean;
  /**
   * The language of the component. It affects which language is used for the close button text.
   *
   * @default "fi"
   */
  language?: Language;
  /**
   * Size
   * @default m
   */
  size?: 's' | 'm' | 'l';
  /**
   * Additional styles
   */
  style?: React.CSSProperties;
  /**
   * Custom theme styles
   */
  theme?: AccordionCustomTheme;
}>;

export type CardAccordionProps = Omit<CommonAccordionProps, 'card' | 'border'> & {
  /**
   * If `true` border will be drawn around the accordion card.
   */
  border?: boolean;
  /**
   * Use the card variant if `true`
   */
  card: true;
};

export type AccordionProps = CommonAccordionProps | CardAccordionProps;
