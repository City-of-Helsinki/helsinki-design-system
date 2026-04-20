import './index.css';

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
