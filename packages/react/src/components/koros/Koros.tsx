import React, { useState } from 'react';
import uniqueId from 'lodash.uniqueid';

// import base styles
import '../../styles/base.css';

import classNames from '../../utils/classNames';
import styles from './Koros.module.css';

export type KorosType = 'basic' | 'beat' | 'pulse' | 'wave' | 'vibration' | 'calm';

type RotateDegrees = '45deg' | '90deg' | '135deg' | '180deg' | '225deg' | '270deg' | '315deg';

export type KorosProps = {
  /**
   * Whether to use dense variant
   * @default false
   */
  dense?: boolean;
  /**
   * Whether the component should be flipped vertically
   */
  flipVertical?: boolean;
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

const getSVG = (dense: boolean, type: string, patternName: string): React.SVGProps<SVGElement> => {
  const transform = `scale(${dense ? 1.8 : 5.3})`;
  const patterns = {
    basic: <path transform={transform} d="M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z" />,
    beat: (
      <path
        transform={transform}
        d="M20,800H0V0c2.8,0,3.5,2.3,3.5,2.3l2.8,8.4c0.6,1.5,1.9,2.5,3.6,2.5c2.8,0,3.6-2.5,3.6-2.5s2.8-8.1,2.8-8.2 C17,1,18.3,0,20,0V800z"
      />
    ),
    pulse: <path transform={transform} d="M0,800h20V0c-5.1,0-5.1,6.4-10,6.4S4.9,0,0,0V800z" />,
    wave: <path transform={transform} d="M20,800V0c-2.3,5.5-8.7,8.1-14.3,5.7C3.1,4.7,1.2,2.6,0,0v800H20z" />,
    vibration: <polygon transform={transform} points="0,800 20,800 20,0 9.8,10.1 0,0 " />,
    calm: <path transform={transform} d="M788 0.279785H0V109.739H788V0.279785Z" />,
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern
          id={`${patternName}`}
          x="0"
          y="0"
          width={`${dense ? 35 : 106}`}
          height="85"
          patternUnits="userSpaceOnUse"
        >
          {patterns[type]}
        </pattern>
      </defs>
      <rect fill={`url(#${patternName})`} width="100%" height="85" />
    </svg>
  );
};

// first number is default, second for dense
const waveHeights: Record<KorosType, [number, number]> = {
  basic: [14, 5],
  beat: [70, 24],
  pulse: [34, 12],
  wave: [35, 12],
  vibration: [54, 18],
  calm: [0, 0],
};

export const getShapeHeight = ({ dense = false, type = 'basic' }: Pick<KorosProps, 'dense' | 'type'>): number => {
  const waveData = waveHeights[type];
  const index = dense ? 1 : 0;
  return (waveData && waveData[index]) || 0;
};

export const Koros = ({
  dense = false,
  flipVertical = false,
  type = 'basic',
  rotate,
  className = '',
  style,
}: KorosProps) => {
  const patternName = `koros_${type}`;
  const [id] = useState(uniqueId(`${patternName}-`));
  const cssTransforms: string[] = [flipVertical && 'scaleY(-1)', rotate && `rotate(${rotate}) translateZ(0)`].filter(
    (t) => !!t,
  );
  return (
    <div
      className={classNames(styles.koros, styles[type], rotate && styles.rotate, className)}
      style={{ ...style, ...(cssTransforms.length > 0 ? { transform: cssTransforms.join(' ') } : {}) }}
    >
      {getSVG(dense, type, id)}
    </div>
  );
};
