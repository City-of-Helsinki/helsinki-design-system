import './koros.css';

export default {
  title: 'Components/Koros',
};

export const Basic = () => `
  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBasic" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 5v80h32v-80c-8 0-8-5-16-5s-8 5-16 5z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBasic)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>
`;

export const Beat = () => `
  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBeat" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 21v64h32v-64c-4 0-5.4-4-5.4-4l-5.2-13s-1.4-4-5.4-4-5.4 4-5.4 4l-5.2 13s-1.4 4-5.4 4z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBeat)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>
`;

export const Pulse = () => `
  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosPulse" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 10v75h32v-75c-8 0-8-10-16-10s-8 10-16 10z" />
        </pattern>
      </defs>
      <rect fill="url(#korosPulse)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>
`;

export const Vibration = () => `
  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosVibration" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 0v85h32v-85l-16 16z" />
        </pattern>
      </defs>
      <rect fill="url(#korosVibration)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>
`;

export const Calm = () => `
  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosCalm" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 0v85h32v-85z" />
        </pattern>
      </defs>
      <rect fill="url(#korosCalm)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>
`;

export const Dense = () => `
  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBasicDense" x="0" y="0" width="32" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(1)" d="m0 5v80h32v-80c-8 0-8-5-16-5s-8 5-16 5z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBasicDense)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>

  <br />

  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBeatDense" x="0" y="0" width="32" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(1)" d="m0 21v64h32v-64c-4 0-5.4-4-5.4-4l-5.2-13s-1.4-4-5.4-4-5.4 4-5.4 4l-5.2 13s-1.4 4-5.4 4z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBeatDense)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>

  <br />

  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosPulseDense" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 10v75h32v-75c-8 0-8-10-16-10s-8 10-16 10z" />
        </pattern>
      </defs>
      <rect fill="url(#korosPulseDense)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>

  <br />

  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosVibrationDense" x="0" y="0" width="32" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(1)" d="m0 0v85h32v-85l-16 16z" />
        </pattern>
      </defs>
      <rect fill="url(#korosVibrationDense)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>

  <br />

  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosWaveDense" x="0" y="0" width="32" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(1)" d="m0 10v75h32v-75c-8 0-13-3.7-16-10-3 6.3-8 10-16 10z" />
        </pattern>
      </defs>
      <rect fill="url(#korosWaveDense)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>
`;

export const Flipped = () => `
  <div class="hds-koros hds-koros--flip-horizontal">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBasicFlipped" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 5v80h32v-80c-8 0-8-5-16-5s-8 5-16 5z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBasicFlipped)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>

  <br /><br />

  <div class="hds-koros hds-koros--flip-horizontal">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBeatFlipped" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 21v64h32v-64c-4 0-5.4-4-5.4-4l-5.2-13s-1.4-4-5.4-4-5.4 4-5.4 4l-5.2 13s-1.4 4-5.4 4z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBeatFlipped)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>

  <br /><br />

  <div class="hds-koros hds-koros--flip-horizontal">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosPulseFlipped" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 10v75h32v-75c-8 0-8-10-16-10s-8 10-16 10z" />
        </pattern>
      </defs>
      <rect fill="url(#korosPulseFlipped)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>

  <br /><br />

  <div class="hds-koros hds-koros--flip-horizontal">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosVibrationFlipped" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 0v85h32v-85l-16 16z" />
        </pattern>
      </defs>
      <rect fill="url(#korosVibrationFlipped)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>

  <br /><br />

  <div class="hds-koros hds-koros--flip-horizontal">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosWaveFlipped" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 10v75h32v-75c-8 0-13-3.7-16-10-3 6.3-8 10-16 10z" />
        </pattern>
      </defs>
      <rect fill="url(#korosWaveFlipped)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>
`;

export const RotatedBasic45deg = () => `
  <div class="hds-koros hds-koros--45deg" style="transform-origin: 43px">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBasic45deg" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 5v80h32v-80c-8 0-8-5-16-5s-8 5-16 5z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBasic45deg)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>
`;

export const RotatedBasic90deg = () => `
  <div class="hds-koros hds-koros--90deg" style="transform-origin: 43px">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBasic90deg" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 5v80h32v-80c-8 0-8-5-16-5s-8 5-16 5z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBasic90deg)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>
`;

export const RotatedBasic135deg = () => `
  <div class="hds-koros hds-koros--135deg" style="transform-origin: left; position: absolute; left: calc((100% / 1.4) + 43px);">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBasic135deg" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 5v80h32v-80c-8 0-8-5-16-5s-8 5-16 5z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBasic135deg)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>
`;

export const RotatedBasic225deg = () => `
  <div class="hds-koros hds-koros--225deg" style="transform-origin: left; position: absolute; bottom: 0; left: calc((100% / 1.4) + 43px);">
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
    <defs>
      <pattern id="korosBasic225deg" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
        <path transform="scale(3)" d="m0 5v80h32v-80c-8 0-8-5-16-5s-8 5-16 5z" />
      </pattern>
    </defs>
    <rect fill="url(#korosBasic225deg)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
  </svg>
  </div>
`;

export const RotatedBasic270deg = () => `
  <div class="hds-koros hds-koros--270deg" style="transform-origin: calc(100% - 85px) 100%">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBasic270deg" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 5v80h32v-80c-8 0-8-5-16-5s-8 5-16 5z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBasic270deg)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>
`;

export const RotatedBasic315deg = () => `
  <div class="hds-koros hds-koros--315deg" style="transform-origin: bottom right;">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBasic315deg" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 5v80h32v-80c-8 0-8-5-16-5s-8 5-16 5z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBasic315deg)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>
`;

export const CustomColor = () => `
  <style type="text/css">
    .hds-custom-koros {
      fill: var(--color-coat-of-arms);
    }
  </style>
  <div class="hds-koros hds-custom-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBasicCustom" x="0" y="0" width="96" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(3)" d="m0 5v80h32v-80c-8 0-8-5-16-5s-8 5-16 5z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBasicCustom)" width="100%" height="85" style="shapeRendering:'crispEdges'" />
    </svg>
  </div>
`;
CustomColor.storyName = 'Custom color';
