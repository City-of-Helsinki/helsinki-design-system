import { LitElement, css, html, PropertyValueMap, CSSResultGroup } from 'lit';
// eslint-disable-next-line import/extensions
import { customElement } from 'lit/decorators.js';

import classNames from '../utils/className';
import iconStyles from './icon.scss';

@customElement('hds-icon-angle-up')
export class IconAngleUp extends LitElement {
  size: string; // SizeType = 'm';

  static readonly styles = [
    css`
      ${iconStyles as unknown as CSSResultGroup}
    `,
  ];

  static get properties() {
    return {
      size: { type: String },
    };
  }

  render() {
    return html`
      <svg
        class="${classNames('hds-icon', 'icon', `hds-icon--size-${this.size || 'm'}`)}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="img"
      >
        <g fill="none" fill-rule="evenodd">
          <path d="M0 24h24V0H0z" />
          <path fill="currentColor" d="M12 11.5l5 5 1.5-1.5L12 8.5 5.5 15 7 16.5z" />
        </g>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hds-icon-angle-up': IconAngleUp;
  }
}
