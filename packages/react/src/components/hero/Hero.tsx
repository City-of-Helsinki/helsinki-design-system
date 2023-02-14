import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Hero.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import { Koros, KorosProps } from '../koros';

type HTMLElementAttributes = React.HtmlHTMLAttributes<HTMLDivElement>;
export type HeroProps = React.PropsWithChildren<
  HTMLElementAttributes & {
    theme?: HeroCustomTheme;
    koros?: Omit<KorosProps, 'rotate'> & {
      hide?: boolean;
    };
  }
>;

export interface HeroCustomTheme {
  '--background-color'?: string;
  '--color'?: string;
  '--koros-color'?: string;
  '--horizontal-padding-small'?: string;
  '--horizontal-padding-medium'?: string;
  '--horizontal-padding-large'?: string;
  '--horizontal-padding-x-large'?: string;
}

const Card = ({
  children,
  centered,
  className,
  ...elementAttributes
}: React.PropsWithChildren<HTMLElementAttributes & { centered?: boolean }>) => {
  const classNameList = centered
    ? classNames(styles.card, styles.centeredContent, className)
    : classNames(styles.card, className);
  return (
    <div {...elementAttributes} className={classNameList}>
      {children}
    </div>
  );
};

Card.componentName = 'Card';

export const Hero = ({ children, theme, koros, ...elementAttributes }: HeroProps) => {
  const editableTheme = { ...theme };
  if (!editableTheme['--koros-color']) {
    editableTheme['--koros-color'] = 'var(--background-color)';
  }
  const customThemeClass = useTheme<HeroCustomTheme>(styles.hero, editableTheme);
  const korosStyle = { fill: 'var(--koros-color)' };
  const hideKoros = !!koros?.hide;
  const canKorosBeFlipped = koros?.flipHorizontal !== false;

  const heroElementAttributes: HTMLElementAttributes = {
    ...elementAttributes,
    className: classNames(
      styles.hero,
      customThemeClass,
      styles.textOnly,
      (elementAttributes as HTMLElementAttributes).className,
    ),
  };

  return (
    <div {...heroElementAttributes}>
      <div key="content" className={classNames(styles.content, styles.singleColumn)}>
        {children}
      </div>
      {!hideKoros && <Koros {...koros} flipHorizontal={canKorosBeFlipped} style={korosStyle} />}
    </div>
  );
};
Hero.Card = Card;
