import './index.css';

// Inject HelsinkiGroteskPro @font-face rules using FONT_URL from the environment.
// The URL is injected at build time by webpack DefinePlugin (see main.js).
const fontUrl = process.env.FONT_URL;
if (fontUrl) {
  const style = document.createElement('style');
  style.textContent = [
    { weight: 400, style: 'normal' },
    { weight: 400, style: 'italic' },
    { weight: 500, style: 'normal' },
    { weight: 500, style: 'italic' },
    { weight: 700, style: 'normal' },
    { weight: 700, style: 'italic' },
    { weight: 900, style: 'normal' },
    { weight: 900, style: 'italic' },
  ]
    .map(
      ({ weight, style: fontStyle }) =>
        `@font-face { font-display: swap; font-family: HelsinkiGroteskPro; font-style: ${fontStyle}; font-weight: ${weight}; src: url("${fontUrl}") format("woff2"); text-rendering: optimizelegibility; }`,
    )
    .join('\n');
  document.head.appendChild(style);
}

const viewports = {
  narrow: {
    name: 'Narrow full-height (320px)',
    styles: {
      width: '320px',
      height: '100%',
    },
  },
};

/** @type {import('@storybook/react').Preview} */
const preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    viewport: {
      viewports,
    },
    backgrounds: {
      default: 'White',
      values: [
        { name: 'White', value: '#fff' },
        { name: 'Black', value: '#111' },
      ],
    },
    controls: { expanded: true, sort: 'alpha' },
  },
};

// Wait for fonts to load before each story renders.
// This ensures visual tests (loki) capture the correct font instead of the fallback.
export const loaders = [
  async () => {
    await document.fonts.ready;
    return {};
  },
];

export default preview;
