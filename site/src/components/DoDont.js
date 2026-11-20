import React from 'react';
import PropTypes from 'prop-types';
import { IconCheck, IconError } from 'hds-react';

const variants = {
  do: {
    label: 'Do',
    Icon: IconCheck,
    color: 'var(--color-success)',
    background: 'var(--color-success-light)',
  },
  dont: {
    label: "Don't",
    Icon: IconError,
    color: 'var(--color-error)',
    background: 'var(--color-error-light)',
  },
};

/**
 * A "Do" / "Don't" guideline box. The label is rendered as a real heading so that screen reader users can
 * navigate to it. Pick `headingLevel` so that it is one level below the section heading the box sits under.
 */
const DoDont = ({ type, headingLevel, children }) => {
  const { label, Icon, color, background } = variants[type];
  const Heading = `h${headingLevel}`;

  return (
    <div
      className={`guideline-${type}`}
      style={{
        background,
        padding: 'var(--spacing-s)',
        marginBottom: 'var(--spacing-layout-2-xs)',
        maxWidth: 600,
      }}
    >
      <Heading
        className={`guideline-${type}-label`}
        style={{
          color,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'bold',
          letterSpacing: 'inherit',
          lineHeight: 'inherit',
          margin: '0 0 var(--spacing-s)',
        }}
      >
        <Icon style={{ marginRight: 'var(--spacing-3-xs)', verticalAlign: 'middle' }} size="small" />
        {label}
      </Heading>
      {children}
    </div>
  );
};

DoDont.propTypes = {
  type: PropTypes.oneOf(['do', 'dont']).isRequired,
  headingLevel: PropTypes.oneOf([2, 3, 4, 5, 6]).isRequired,
  children: PropTypes.node,
};

export default DoDont;
