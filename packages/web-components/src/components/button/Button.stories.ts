import { html } from 'lit';
import { action } from '@storybook/addon-actions';

import './Button';

const onClick = action('button-click');

export default {
  component: 'hds-button',
  title: 'Components/Button',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  args: {
    variant:      'primary',
    disabled:     false,
    fullWidth:    false,
    children:     'Button',
    isLoading:    false,
    loadingText:  '',
    size:         'default',
    style:        { 'max-width': '360px' },
  },
};

export const Default = (args) => {
  return html`
    <hds-button
      variant=${args.variant}
      disabled=${args.disabled}
      fullWidth=${args.fullWidth}
      isLoading=${args.isLoading}
      loadingText=${args.loadingText}
      size=${args.size}
      .onClick=${onClick}>
      ${args.children}
    </hds-button>
  `;
};
