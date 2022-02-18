import './koros.css';

export default {
  title: 'Components/Koros',
};

export const Basic = () => `
  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBasic" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
          <path
            transform="scale(5.3)"
            d="M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z"
          />
        </pattern>
      </defs>
      <rect fill="url(#korosBasic)" width="100%" height="85" />
    </svg>
  </div>
`;

export const Dense = () => `
  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBasic" x="0" y="0" width="35" height="85" patternUnits="userSpaceOnUse">
          <path
            transform="scale(1.8)"
            d="M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z"
          />
        </pattern>
      </defs>
      <rect fill="url(#korosBasic)" width="100%" height="85" />
    </svg>
  </div>
`;

export const Beat = () => `
  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBeat" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
        <path
          transform="scale(5.3)"
          d="M20,800H0V0c2.8,0,3.5,2.3,3.5,2.3l2.8,8.4c0.6,1.5,1.9,2.5,3.6,2.5c2.8,0,3.6-2.5,3.6-2.5s2.8-8.1,2.8-8.2 C17,1,18.3,0,20,0V800z"
        />
        </pattern>
      </defs>
      <rect fill="url(#korosBeat)" width="100%" height="85" />
    </svg>
  </div>
`;

export const Pulse = () => `
  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosPulse" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
        <path
          transform="scale(5.3)"
          d="M0,800h20V0c-5.1,0-5.1,6.4-10,6.4S4.9,0,0,0V800z"
        />
        </pattern>
      </defs>
      <rect fill="url(#korosPulse)" width="100%" height="85" />
    </svg>
  </div>
`;

export const Wave = () => `
  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosWave" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
        <polygon
          transform="scale(5.3)"
          points="0,800 20,800 20,0 9.8,10.1 0,0 "
        />
        </pattern>
      </defs>
      <rect fill="url(#korosWave)" width="100%" height="85" />
    </svg>
  </div>
`;

export const Storm = () => `
  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosStorm" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
        <path
          transform="scale(5.3)"
          d="M20,800V0c-2.3,5.5-8.7,8.1-14.3,5.7C3.1,4.7,1.2,2.6,0,0v800H20z"
        />
        </pattern>
      </defs>
      <rect fill="url(#korosStorm)" width="100%" height="85" />
    </svg>
  </div>
`;

export const Calm = () => `
  <div class="hds-koros">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosCalm" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
        <path d="M788 0.279785H0V109.739H788V0.279785Z" />
        </pattern>
      </defs>
      <rect fill="url(#korosCalm)" width="100%" height="85" />
    </svg>
  </div>
`;

export const Flipped = () => `
  <div class="hds-koros hds-koros--flip-horizontal">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBasicFlipped" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(5.3)" d="M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBasicFlipped)" width="100%" height="85" />
    </svg>
  </div>

  <br /><br />

  <div class="hds-koros hds-koros--flip-horizontal">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBeatFlipped" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
        <path
          transform="scale(5.3)"
          d="M20,800H0V0c2.8,0,3.5,2.3,3.5,2.3l2.8,8.4c0.6,1.5,1.9,2.5,3.6,2.5c2.8,0,3.6-2.5,3.6-2.5s2.8-8.1,2.8-8.2 C17,1,18.3,0,20,0V800z"
        />
        </pattern>
      </defs>
      <rect fill="url(#korosBeatFlipped)" width="100%" height="85" />
    </svg>
  </div>

  <br /><br />

  <div class="hds-koros hds-koros--flip-horizontal">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosPulseFlipped" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
        <path
          transform="scale(5.3)"
          d="M0,800h20V0c-5.1,0-5.1,6.4-10,6.4S4.9,0,0,0V800z"
        />
        </pattern>
      </defs>
      <rect fill="url(#korosPulseFlipped)" width="100%" height="85" />
    </svg>
  </div>

  <br /><br />

  <div class="hds-koros hds-koros--flip-horizontal">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosWaveFlipped" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
        <polygon
          transform="scale(5.3)"
          points="0,800 20,800 20,0 9.8,10.1 0,0 "
        />
        </pattern>
      </defs>
      <rect fill="url(#korosWaveFlipped)" width="100%" height="85" />
    </svg>
  </div>

  <br /><br />

  <div class="hds-koros hds-koros--flip-horizontal">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosStormFlipped" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
        <path
          transform="scale(5.3)"
          d="M20,800V0c-2.3,5.5-8.7,8.1-14.3,5.7C3.1,4.7,1.2,2.6,0,0v800H20z"
        />
        </pattern>
      </defs>
      <rect fill="url(#korosStormFlipped)" width="100%" height="85" />
    </svg>
  </div>
`;

export const RotatedBasic45deg = () => `
  <div class="hds-koros hds-koros--45deg" style="transform-origin: 43px">
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="korosBasic45deg" x="0" width="106" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(5.3)" d="M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z" />
        </pattern>
      </defs>
      <rect fill="url(#korosBasic45deg)" width="100%" height="85" />
    </svg>
  </div>
`;

export const RotatedBasic90deg = () => `
  <div class="hds-koros hds-koros--90deg" style="transform-origin: 43px">
   <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
     <defs>
       <pattern id="korosBasic90deg" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
         <path transform="scale(5.3)" d="M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z" />
       </pattern>
     </defs>
     <rect fill="url(#korosBasic90deg)" width="100%" height="85" />
   </svg>
  </div>
`;

export const RotatedBasic135deg = () => `
  <div class="hds-koros hds-koros--135deg" style="transform-origin: left; position: absolute; left: calc((100% / 1.4) + 43px);">
   <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
     <defs>
       <pattern id="korosBasic135deg" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
         <path transform="scale(5.3)" d="M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z" />
       </pattern>
     </defs>
     <rect fill="url(#korosBasic135deg)" width="100%" height="85" />
   </svg>
  </div>
`;

export const RotatedBasic225deg = () => `
  <div class="hds-koros hds-koros--225deg" style="transform-origin: left; position: absolute; bottom: 0; left: calc((100% / 1.4) + 43px);">
   <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
     <defs>
       <pattern id="korosBasic225deg" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
         <path transform="scale(5.3)" d="M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z" />
       </pattern>
     </defs>
     <rect fill="url(#korosBasic225deg)" width="100%" height="85" />
   </svg>
  </div>
`;

export const RotatedBasic270deg = () => `
  <div class="hds-koros hds-koros--270deg" style="transform-origin: calc(100% - 85px) 100%">
   <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
     <defs>
       <pattern id="korosBasic270deg" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
         <path transform="scale(5.3)" d="M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z" />
       </pattern>
     </defs>
     <rect fill="url(#korosBasic270deg)" width="100%" height="85" />
   </svg>
  </div>
`;

export const RotatedBasic315deg = () => `
  <div class="hds-koros hds-koros--315deg" style="transform-origin: bottom right;">
   <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
     <defs>
       <pattern id="korosBasic315deg" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
         <path transform="scale(5.3)" d="M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z" />
       </pattern>
     </defs>
     <rect fill="url(#korosBasic315deg)" width="100%" height="85" />
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
        <pattern id="korosBasicCustom" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
          <path
            transform="scale(5.3)"
            d="M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z"
          />
        </pattern>
      </defs>
      <rect fill="url(#korosBasicCustom)" width="100%" height="85" />
    </svg>
  </div>
`;
CustomColor.storyName = 'Custom color';
