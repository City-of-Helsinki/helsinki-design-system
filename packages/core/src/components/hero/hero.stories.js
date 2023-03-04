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
    <h1 class="hds-hero__title">Welcome to the hero story</h1>
    <p class="hds-hero__text">Nullam ut nunc consectetur, accumsan nunc sed, luctus nisl. Curabitur lacinia tristique est, sit amet egestas velit elementum sit amet. Nam lacinia volutpat erat vel faucibus.</p>
    ${button}
  </div>`;

let korosId = 0;
const getKorosSVG = (pulse) => {
  korosId = korosId + 1;
  if (pulse) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
        <defs>
            <pattern id="koros_pulse-${korosId}" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
              <path transform="scale(5.3)" d="M0,800h20V0c-5.1,0-5.1,6.4-10,6.4S4.9,0,0,0V800z"></path>
            </pattern>
        </defs>
        <rect fill="url(#koros_pulse-${korosId})" width="100%" height="85"></rect>
      </svg>`;
  }
  return `
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="85">
      <defs>
        <pattern id="koros_basic-${korosId}" x="0" y="0" width="106" height="85" patternUnits="userSpaceOnUse">
          <path transform="scale(5.3)" d="M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z"></path>
        </pattern>
      </defs>
      <rect fill="url(#koros_basic-${korosId})" width="100%" height="85"></rect>
    </svg>`;
};

const getKoros = (flipped, pulse) => {
  return `<div class="hds-koros" style="fill: var(--koros-color);${!flipped ? ' transform: scaleY(-1);' : ''}">
            ${getKorosSVG(pulse)}
          </div>`;
};

const image = `<img class="hds-hero__image" src="https://hds.hel.fi/images/homepage/amos58.jpg" aria-hidden="true" alt="" />`;

export const ImageBottom = () => `
  <div class="hds-hero hds-hero--image-bottom">
    <div class="hds-hero__container">
      <div class="hds-hero__content hds-hero__content--single-column">
        ${card}
      </div>
    </div>
    <div class="hds-hero__koros-and-image-container">
      <div class="hds-hero__koros-container" style="height:14px;">
        ${getKoros()}
      </div>
      <div class="hds-hero__image-below-koros">
        ${image}
      </div>
    </div>
  </div>`;

ImageBottom.storyName = 'Bottom image';

export const DiagonalKoros = () => `
  <style type="text/css">
    .custom-theme {
      content: "";
      --background-color: #f5a3c7;
      --koros-color: var(--background-color);
      --color: #000;
    }
    /*
      Koros is very high by default, so height is defined here. Padding is set in the container.
      Koros should also "pull" next sibling upwards so koros overflows it.
      These are not in the css file as the amounts depend on the koros height.
      React version calculates these automatically.
      Heights of different koros are in https://github.com/City-of-Helsinki/helsinki-design-system/blob/master/packages/react/src/components/koros/Koros.tsx
    */
    .responsive-koros{
      height: 14px;
    }  
    @media only screen and (min-width: 992px){
      .responsive-koros{
        height: auto;
      }  
    }
  </style>
  <div class="hds-hero custom-theme hds-hero--diagonal-koros">
    <div class="hds-hero--with-background__container">
      <div class="hds-hero--with-background__contentColumns">
        <div class="hds-hero__content">
          ${card}
        </div>
        <div class="hds-hero--with-background__empty-column"></div>
      </div>
      <div class="hds-hero--diagonal-koros__koros-aligner">
        <div class="responsive-koros hds-hero--diagonal-koros__koros-and-background">
          <div class="hds-hero__koros-container">
            ${getKoros(true)}
          </div>
        </div>
      </div>
      <div class="hds-hero--with-background__background">
        ${image}
      </div>
    </div>
  </div>`;
DiagonalKoros.storyName = 'Diagonal koros';

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
    <div class="hds-hero__container">
      <div class="hds-hero__content hds-hero__content--single-column">
        ${card}
      </div>
    </div>
    <div class="hds-hero__koros-container--without-overlay" style="margin-top: -34px;">
        ${getKoros(true, true)}
      </div>
  </div>`;
WithoutImage.storyName = 'Without image';

export const ImageRight = () => `
  <style type="text/css">
    .custom-theme {
      content: "";
      --background-color: #c2a251;
      --color: #000;
      --koros-color: var(--background-color);
    }
  </style>
  <div class="hds-hero custom-theme hds-hero--image-right">
    <div class="hds-hero__container">
      <div class="hds-hero__content hds-hero__content--two-columns">
        ${card}
        <div class="hds-hero__content--two-columns__image-container">${image}</div>
      </div>
    </div>
    <div class="hds-hero__koros-and-image-container">
      <div class="hds-hero__koros-container" style="height:14px;">
        ${getKoros()}
      </div>
      <div class="hds-hero__image-below-koros">
        ${image}
      </div>
    </div>
  </div>`;
ImageRight.storyName = 'Image right';

export const ImageLeft = () => `
  <style type="text/css">
    .custom-theme {
      content: "";
      --background-color: #c2a251;
      --color: #000;
      --koros-color: var(--background-color);
    }
  </style>
  <div class="hds-hero custom-theme hds-hero--image-left">
    <div class="hds-hero__container">
      <div class="hds-hero__content hds-hero__content--two-columns">
        <div class="hds-hero__content--two-columns__image-container">${image}</div>
          ${card}
      </div>
    </div>
    <div class="hds-hero__koros-and-image-container">
      <div class="hds-hero__koros-container" style="height:14px;">
        ${getKoros()}
      </div>
      <div class="hds-hero__image-below-koros">
        ${image}
      </div>
    </div>
  </div>`;
ImageLeft.storyName = 'Image left';

export const BackgroundImage = () => `
  <style type="text/css">
    .container {
      content: "";
      background: #ccc;
      padding: 10px 10px 200px;
    }
    .custom-theme {
      content: "";
      --background-color: #fff;
      --color: #000;
      --bottom-koros-color: #ccc;
      --top-koros-color: var(--background-color);
    }
  </style>
  <div class="container">
    <div class="hds-hero custom-theme hds-hero--background-image">
      <div class="hds-hero--with-background__container">
        <div class="hds-hero--with-background__background">
          <div class="hds-hero--background-image__koros" style="height:14px;">
            ${getKoros(true)}
          </div>
          ${image}
        </div>
        <div class="hds-hero__content">
          ${card}
          <div class="hds-hero--with-background__empty-column">
          </div>
        </div>
      </div>
    </div>
  </div>`;
BackgroundImage.storyName = 'Background image';
