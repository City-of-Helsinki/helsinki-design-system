import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconThumbsDown = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <rect width="24" height="24" />
      <path
        fill="currentColor"
        d="M13.4296946,4 C14.9248873,4 15.8180492,5.24934085 15.8180492,6.45653721 C15.8180492,6.91012935 15.6373719,7.68159261 15.3124919,8.57377573 L15.3124919,8.57377573 L18.716733,8.57377573 C19.9753411,8.57377573 20.9997492,9.64632252 20.9997492,10.9638819 C20.9997492,11.7924903 20.5872584,12.5032366 19.9608314,12.9613979 C20.0029124,13.1435491 20.0247504,13.3303076 20.0247504,13.5199948 C20.0247504,14.3307447 19.6347592,15.060421 19.0265914,15.4943687 C19.0409742,15.6020526 19.0484293,15.7113791 19.0484293,15.8201693 C19.0484293,16.6173481 18.6713926,17.3416661 18.0656113,17.7784717 C17.9824313,19.0181708 16.9927958,20 15.7883909,20 L15.7883909,20 L13.9976363,20 C12.7703916,20 11.5567827,19.5749812 10.5769629,18.8058385 L10.5769629,18.8058385 L9.32687785,17.8229378 C9.11265558,17.6547163 8.99974918,17.399954 8.99974918,17.1396928 C8.99974918,16.6875296 9.34678648,16.2810827 9.81893501,16.2810827 C9.9897269,16.2810827 10.1620523,16.3370141 10.3091513,16.452912 L10.3091513,16.452912 L11.5588956,17.4354563 C12.2570614,17.9834805 13.122951,18.2858513 13.99634,18.2858513 L13.99634,18.2858513 L15.7870946,18.2858513 C16.1434732,18.2858513 16.4337845,17.9822663 16.4337845,17.6090349 C16.4337845,17.4842081 16.3959449,17.4325635 16.3959449,17.2713058 C16.3959449,16.3112638 17.4108078,16.6291349 17.4108078,15.8198129 C17.4108078,15.4905124 17.1929037,15.4258668 17.1929037,15.0251345 C17.1929037,13.9604442 18.387081,14.4258221 18.387081,13.5197103 C18.387081,13.0568328 17.9987939,13.0396888 17.9987939,12.4871641 C17.9987939,12.0392866 18.3294686,11.6628164 18.7610498,11.6321258 C19.0986792,11.6078392 19.3634229,11.3142192 19.3634229,10.9638819 C19.3634229,10.592437 19.0736567,10.288852 18.7151652,10.2574229 L18.7151652,10.2574229 L14.0243629,10.2574229 C13.5958497,10.2574229 13.2061997,9.92955084 13.2061997,9.43238583 C13.2061997,9.28830808 13.2409723,9.14401562 13.3107204,9.01379565 C13.9228426,7.8694585 14.1817228,6.7213359 14.1817228,6.45689581 C14.1817228,6.16973982 13.9778635,5.71436232 13.4296946,5.71436232 C12.3054027,5.71436232 12.9459555,7.90481796 10.3291972,10.0967009 C10.1785189,10.2230995 9.99804553,10.2845662 9.81886791,10.2845662 C9.35319658,10.2845662 9.0000228,9.88633384 9.0000228,9.4277415 C9.0000228,8.4605559 9.97738681,8.96450756 11.0566805,6.08937908 C11.4061044,5.15862329 11.8407535,4 13.4296946,4 Z M7,9 C7.55228475,9 8,9.44771525 8,10 L8,17 C8,17.5522847 7.55228475,18 7,18 L3,18 L3,9 L7,9 Z"
        transform="rotate(180 12 12)"
      />
    </g>
  </svg>
);
