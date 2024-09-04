import React, { FC } from 'react';

import '../../styles/base.module.css';
import styles from './StepByStep.module.scss';
import { Button, ButtonProps } from '../button';
import classNames from '../../utils/classNames';
import { Link, LinkProps } from '../link';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

type StepType = {
  /**
   * List of native button objects for the step.
   */
  buttons?: Array<ButtonProps>;
  /**
   * Step description.
   */
  description?: JSX.Element | string;
  /**
   * Optional key for the React component. Title is used unless a key is provided.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  key?: string;
  /**
   * List of native link objects for the step.
   */
  links?: Array<LinkProps>;
  /**
   * Step title.
   */
  title: string;
};

export type StepByStepProps = AllElementPropsWithoutRef<'div'> & {
  /**
   * Additional class names to apply to the container element.
   */
  className?: string;

  /**
   * Class name for the main heading.
   */
  headerClassName?: string;

  /**
   * Header level for the main heading.
   * @default 2
   */
  headerLevel?: number;

  /**
   * Help text for the step by step component. Displayed under the `title` property.
   */
  helpText?: string;

  /**
   * Boolean indicating whether the steps are numbered.
   */
  numberedList?: boolean;

  /**
   * Steps for the step by step component.
   */
  steps: Array<StepType>;

  /**
   * Title text for the step by step component.
   */
  title?: string;
};

const resolveElementKey = (props: ButtonProps | LinkProps) => {
  if (props.key) {
    return props.key;
  }
  if (typeof props.children === 'string') {
    return props.children as string;
  }
  return undefined;
};

const getButtonOrLinkRenderer = (Tag: typeof Button | typeof Link) => (componentProps: ButtonProps & LinkProps) => {
  const { children, ...props } = componentProps;
  return (
    <p key={resolveElementKey(componentProps)}>
      <Tag {...props}>{children}</Tag>
    </p>
  );
};

const renderLink = getButtonOrLinkRenderer(Link);
const renderButton = getButtonOrLinkRenderer(Button);

const StepComponent = ({ title, description, buttons = [], links = [] }: StepType) => {
  return (
    <li className={styles.stepItem}>
      <p className={styles.stepItemTitle}>{title}</p>
      <div>
        {description && <p key="description">{description}</p>}
        {buttons.map(renderButton)}
        {links.map(renderLink)}
      </div>
    </li>
  );
};

export const StepByStep: FC<StepByStepProps> = ({
  className,
  title,
  helpText,
  steps = [],
  numberedList = false,
  headerClassName,
  headerLevel = 2,
  ...rest
}) => {
  const wrapperClassName = classNames(styles.container, className);
  const titleComponent =
    title && React.createElement(`h${headerLevel}`, { className: classNames(styles.title, headerClassName) }, title);

  return (
    <div {...rest} className={wrapperClassName}>
      <div>
        {titleComponent}
        <p className={styles.description}>{helpText}</p>
      </div>
      {React.createElement(
        numberedList ? 'ol' : 'ul',
        { className: styles.stepsContainer },
        steps.map((step) => <StepComponent key={step.key || step.title} {...step} />),
      )}
    </div>
  );
};
