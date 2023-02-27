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

let korosId = 0;
const getKorosSVG = () => {
  korosId = korosId + 1;
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

const koros = `
      <div class="hds-koros" style="fill: var(--koros-color); transform: scaleY(-1); margin-bottom: -14px; height: 14px; overflow: hidden;">
        ${getKorosSVG()}
      </div>`;

const image = `<img class="hds-hero__image" src="https://hds.hel.fi/images/homepage/amos58.jpg" aria-hidden="true" alt="">`;

export const ImageBottom = () => `
<div class="hds-hero hds-hero--image-bottom">
  <div class="hds-hero__container">
    <div class="hds-hero__content hds-hero__content--single-column">
      ${card}
    </div>
  </div>
  ${koros}
  <div class="hds-hero__image-below-koros">
    ${image}
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
  .shifted-koros{
    margin-bottom: -14px;
    height: 14px;
  }  
  @media only screen and (min-width: 992px){
    .shifted-koros{
      margin-bottom: 0;
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
      <div class="hds-hero--with-background__emptyColumn"></div>
      </div>
      <div class="hds-koros shifted-koros hds-hero--diagonal-koros__koros-and-background" style="fill: var(--koros-color);">
         ${getKorosSVG()}
      </div>
      <div class="hds-hero--with-background__background">
        ${image}
      </div>
   </div>
</div>`;
DiagonalKoros.storyName = 'Diagonal koros and background';

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
          <div class="hds-koros__spacer" style="height: 34px;"></div>
        </div>
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
   ${koros}
   <div class="hds-hero__image-below-koros">${image}</div>
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
   ${koros}
   <div class="hds-hero__image-below-koros">${image}</div>
</div>`;
ImageLeft.storyName = 'Image left';

export const BackgroundImage = () => `
    <style type="text/css">
      .custom-theme {
        content: "";
        --background-color: #fff;
        --color: #000;
        --koros-color: var(--background-color);
      }
    </style>
    <div class="hds-hero custom-theme hds-hero--background-top">
        <div class="hds-hero--with-background__container">
          <div class="hds-hero--with-background__background">${image}</div>
          <div class="hds-koros hds-hero--background-top__top-koros" style="fill: var(--koros-color); margin-top: -14px; height: 14px; overflow: hidden;">
            ${getKorosSVG()}
          </div>
          <div class="hds-hero__content">
              ${card}
              <div class="hds-hero--with-background__emptyColumn"></div>
          </div>
        </div>
        <div class="hds-koros hds-hero--background-top__bottom-koros" style="fill: var(--koros-color); margin-top: -14px; height: 14px; overflow: hidden;">
          ${getKorosSVG()}
        </div>
    </div>`;
BackgroundImage.storyName = 'Background image';
