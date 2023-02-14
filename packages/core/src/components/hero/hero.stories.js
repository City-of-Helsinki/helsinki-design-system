import './hero.css';

export default {
  title: 'Components/Hero',
};

const button = `
    <button type="button" class="hds-button hds-button--secondary hds-button--theme-black" role="link">
      <span class="hds-button__label">Button</span>
    </button>`;

const card = `
      <div class="hds-hero__card">
        <h1>Welcome to the hero story</h1>
        <p>Nullam ut nunc consectetur, accumsan nunc sed, luctus nisl. Curabitur lacinia tristique est, sit amet egestas velit elementum sit amet. Nam lacinia volutpat erat vel faucibus.</p>
        ${button}
      </div>`;

export const WithoutImage = () => `
  <style type="text/css">
    .custom-theme {
      content: "";
      --background-color: #9fc9eb;
      --color: #000;
      --koros-color: #009246;
    }
    </style>
    <div class="hds-hero custom-theme">
      <div class="hds-hero__content hds-hero__content--single-column">
        ${card}
        <div class="hds-koros__spacer" style="height: 34px;"></div>
      </div>
      <div class="hds-koros" style="fill: var(--koros-color); margin-top: -34px;">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
            <defs>
                <pattern id="koros_pulse-23" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
                  <path transform="scale(5.3)" d="M0,800h20V0c-5.1,0-5.1,6.4-10,6.4S4.9,0,0,0V800z"></path>
                </pattern>
            </defs>
            <rect fill="url(#koros_pulse-23)" width="100%" height="85"></rect>
          </svg>
      </div>
      </div>
    </div>
  </div>`;
WithoutImage.storyName = 'Without image';
