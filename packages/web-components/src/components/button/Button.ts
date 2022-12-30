import { LitElement, html, PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators';
import { ifDefined } from 'lit/directives/if-defined.js';
import { toString } from 'lodash';

import style from './buttonStyles';

// import core base styles
import 'hds-core';

const booleanConverter = {
  fromAttribute: (value) => value === 'true',
  toAttribute: (value) => toString(value),
};

// FIXME: Remove and import from a common utility file or such
const classNames = (...args) => args.filter(Boolean).join(' ');


export type ButtonSize = 'default' | 'small';
export type ButtonTheme = 'default' | 'coat' | 'black';
export type ButtonVariant = 'primary' | 'secondary' | 'supplementary' | 'success' | 'danger';

export type CommonButtonProps = {
  /**
   * The content of the button
   */
  children: any;
  /**
   * Additional class names to apply to the button
   */
  className?: string;
  /**
   * Defines the button variant
   */
  variant?: Exclude<ButtonVariant, 'supplementary'>;
  /**
   * Defines the button theme
   */
  theme?: ButtonTheme;
  /**
   * If `true`, the button will be disabled
   */
  disabled?: boolean;
  /**
   * If `true`, the button will take up the full width of its container
   */
  fullWidth?: boolean;
  /**
   * Element placed on the left side of the button label
   */
  iconLeft?: any;
  /**
   * Element placed on the right side of the button label
   */
  iconRight?: any;
  /**
   * The size of the button
   */
  size?: ButtonSize;
  /**
   * If `true` a loading spinner is displayed inside the button along `loadingText`
   */
  isLoading?: boolean;
  /**
   * Loading text to show alongside loading spinner
   */
  loadingText?: string;
};

// Supplementary variant requires iconLeft or iconRight
export type SupplementaryButtonProps = Omit<CommonButtonProps, 'variant'> & {
  variant: 'supplementary';
} & (
    | {
        iconLeft: any;
      }
    | {
        iconRight: any;
      }
  );

// Loading button requires loading text
export type LoadingButtonProps = Omit<CommonButtonProps, 'isLoading' | 'loadingText'> & {
  isLoading: true;
  loadingText: string;
};

export type ButtonProps = CommonButtonProps | SupplementaryButtonProps | LoadingButtonProps;

@customElement('hds-button')
export default class ButtonHTMLElement extends LitElement {
  children: HTMLCollection;
  variant?: Exclude<ButtonVariant, 'supplementary'>;
  disabled: boolean = false;
  fullWidth: boolean = false;
  isLoading: boolean = false;
  loadingText?: string;
  iconLeft?: HTMLElement;
  iconRight?: HTMLElement;
  size?: ButtonSize;
  onClick?: (event: Event) => void;
  // TODO theme

  static get properties() {
    return {
      children: { type: HTMLCollection },
      variant: { type: String },
      disabled: { type: Boolean, converter: booleanConverter },
      fullWidth: { type: Boolean, converter: booleanConverter },
      isLoading: { type: Boolean, converter: booleanConverter },
      loadingText: { type: String },
      iconLeft: { type: HTMLElement },
      iconRight: { type: HTMLElement },
      size: { type: String },
      onClick: { type: Function },
    };
  }

  protected willUpdate(_changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>): void {
    // TODO: Figure out how this side-effect-ish className would be better handled
    //       e.g. best practices for non-ortogonal stuff in lit library.
    const fullWidth = this.fullWidth && 'fullWidth';
    const isLoading = this.isLoading && 'isLoading';

    // styles[`theme-${theme}`],
    // styles[`size-${size}`],
    this.className = classNames('button', fullWidth, isLoading, this.variant, this.size, ...this.classList);
    return super.willUpdate(_changedProperties);
  }

  render() {
    return html`
      <button
        class=${this.className}
        disabled=${ifDefined(this.disabled ? this.disabled : undefined)}
        aria-disabled=${this.isLoading || this.disabled || undefined}
        aria-label=${this.isLoading ? this.loadingText : undefined}
        type="button"
        @click=${this.handleClick}
      >
        ${this.renderLeftIcon()} ${this.renderLabel()} ${this.renderRightIcon()}
      </button>
    `;
  }

  renderLabel() {
    return html`
      <span class="label">
        ${this.isLoading ? this.loadingText : ''}
        <slot></slot>
      </span>
    `;
  }

  renderRightIcon() {
    if (this.isLoading) return '';

    if (!this.iconRight) return '';

    return html` <div class="icon" aria-hidden="true">${this.iconRight}</div> `;
  }

  renderLeftIcon() {
    // TODO: Change to spinner
    if (this.isLoading) return html``;

    if (!this.iconLeft) return '';

    return html` <div class="icon" aria-hidden="true">${this.iconLeft}</div> `;
  }

  handleClick(event) {
    if (this.isLoading) event.preventDefault();
    if (this.onClick) this.onClick(event);
  }

  static readonly styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'hds-button': ButtonHTMLElement;
  }
}
