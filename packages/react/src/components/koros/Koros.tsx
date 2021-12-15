import React, { useState } from 'react';
import uniqueId from 'lodash.uniqueid';

// import core base styles
import 'hds-core';
import classNames from '../../utils/classNames';
import styles from './Koros.module.css';

export type KorosType = 'basic' | 'beat' | 'pulse' | 'storm' | 'wave' | 'calm';

type RotateDegrees = '45deg' | '90deg' | '135deg' | '180deg' | '225deg' | '270deg' | '315deg';

export type KorosProps = {
  /**
   * Whether the component should be flipped horizontally
   */
  flipHorizontal?: boolean;
  /**
   * A property to rotate Koros
   */
  rotate?: RotateDegrees;
  /**
   * Koros type
   */
  type?: KorosType;
  /**
   * Additional class names to apply to component
   */
  className?: string;
  /**
   * Additional style properties to apply to component
   */
  style?: React.CSSProperties;
};

const getSVG = (type: string, patternName: string): React.SVGProps<SVGElement> => {
  const transform = 'scale(5.3)';
  const patterns = {
    basic: <path transform={transform} d="M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z" />,
    beat: (
      <path
        transform={transform}
        d="M20,800H0V0c2.8,0,3.5,2.3,3.5,2.3l2.8,8.4c0.6,1.5,1.9,2.5,3.6,2.5c2.8,0,3.6-2.5,3.6-2.5s2.8-8.1,2.8-8.2 C17,1,18.3,0,20,0V800z"
      />
    ),
    pulse: <path transform={transform} d="M0,800h20V0c-5.1,0-5.1,6.4-10,6.4S4.9,0,0,0V800z" />,
    storm: <path transform={transform} d="M20,800V0c-2.3,5.5-8.7,8.1-14.3,5.7C3.1,4.7,1.2,2.6,0,0v800H20z" />,
    wave: <polygon transform={transform} points="0,800 20,800 20,0 9.8,10.1 0,0 " />,
    calm: <path transform={transform} d="M788 0.279785H0V109.739H788V0.279785Z" />,
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id={`${patternName}`} x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
          {patterns[type]}
        </pattern>
      </defs>
      <rect fill={`url(#${patternName})`} width="100%" height="85" />
    </svg>
  );
};

export const Koros = ({ flipHorizontal = false, type = 'basic', rotate, className = '', style }: KorosProps) => {
  const patternName = `koros_${type}`;
  const [id] = useState(uniqueId(`${patternName}-`));
  const cssTransforms: string[] = [flipHorizontal && 'scaleY(-1)', rotate && `rotate(${rotate}) translateZ(0)`].filter(
    (t) => !!t,
  );

  return (
    <div
      className={classNames(styles.koros, styles[type], className)}
      style={{ ...style, ...(cssTransforms.length > 0 ? { transform: cssTransforms.join(' ') } : {}) }}
    >
      {getSVG(type, id)}
    </div>
  );
};
