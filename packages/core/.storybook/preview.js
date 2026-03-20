import './index.css';
import '../src/base.css';

const viewports = {
  narrow: {
    name: 'Narrow full-height (320px)',
    styles: {
      width: '320px',
      height: '100%',
    },
  },
};

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
  },
};

export default preview;
