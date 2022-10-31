import { CSSProperties } from 'react';
import { LitElement, html, css } from "lit";
import uniqueId from 'lodash.uniqueid';
import pickBy from 'lodash.pickby';

// import core base styles
import 'hds-core';

import { AccordionProps, AccordionCustomTheme, Language } from './AccordionProps';

// FIXME: Remove and import from a common utility file or such
const classNames = (...args) => args.filter(Boolean).join(' ');

export default class AccordionHTMLElement extends LitElement {

  id: string;
  border: boolean = false; // TODO
  card: boolean = false; // TODO
  children: HTMLCollection;
  language: Language = 'fi';
  heading: string;
  headingLevel: number = 2;
  isOpen: boolean = false;
  closeButton: boolean = true;
  closeButtonClassName: string;
  size: string = 'm';
  theme?: AccordionCustomTheme;
  // TODO style

  static get properties () {
    return {
      id: { type: String },
      children: { type: HTMLCollection },
      language: { type: String },
      heading: { type: String },
      headingLevel: { type: Number },
      isOpen: { type: Boolean },
      closeButton: { type: Boolean },
      closeButtonClassName: { type: String },
    }
  }

  get identifiers () {
    const root        = this.id || uniqueId('accordion-');
    const heading     = `${root}-heading`;
    const content     = `${root}-content`;
    const closeButton = `${root}-closeButton`;
    return { heading, content, closeButton };
  }

  toggleOpen = () => {
    console.log("toggling......");
    this.isOpen = !this.isOpen;
    console.log(this);
  }

  getIcon () {
    return html``;
  }

  hasCloseButton () {
    return !!this.closeButton;
  }

  render () {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        this.toggleOpen();
      }
    }

    return html`
      <div class='accordionHeader'>
        <div
          id=${this.identifiers.heading}
          aria-level=${this.headingLevel}
          role="heading">

          <div
            role='button'
            class='headingContainer'
            tabIndex=0
            aria-labelledby=${this.identifiers.heading}
            aria-expanded=${this.isOpen}
            @keypress=${handleKeyPress}
            @click=${this.toggleOpen}>

            <span class='label'>${this.heading}</span>
            ${this.getIcon()}
          </div>

        </div>
      </div>

      <div
        id=${this.identifiers.content}
        style="display: ${this.isOpen ? 'block' : 'none'}"
        role="region"
        class='accordionContent'
        aria-labelledby=${this.identifiers.heading}>
        <slot></slot>
        ${this.renderCloseButton()}
      </div>
    </div>
    `;
  }

  renderCloseButton () {
    if (!this.hasCloseButton)
      return '';

    const closeMessage  = getCloseMessage(this.language);
    const closeLabel    = classNames(closeMessage, this.heading)
    const className     = classNames('closeButton', this.closeButtonClassName)
    // TODO: .iconRight={<IconAngleUp aria-hidden size="xs" className={styles.accordionButtonIcon} />}

    const handleKeyPress = (e) => {
      if (e.key === ' ') {
        this.toggleOpen(); // FIXME
      }
    }
    return html`
      <button
        data-testid=${this.identifiers.closeButton}
        class=${className}
        variant='supplementary'
        aria-label=${closeLabel}
        theme='black'
        size='small'
        @keypress=${handleKeyPress}
        @click=${this.toggleOpen}>
        ${closeMessage}
      </button>
    `
  }

  static get styles () {
    return css`
      :host {
        --background-color: var(--color-white);
        --border-color: var(--color-black-60);
        --header-font-color: var(--color-black-90);
        --header-focus-outline-color: var(--color-coat-of-arms);
        --content-font-color: var(--color-black-90);
        --content-font-size: var(--fontsize-body-m);
        --content-line-height: var(--lineheight-l);
      }

      .card {
        background-color: var(--background-color);
        padding-left: var(--padding-horizontal);
        padding-right: var(--padding-horizontal);
      }

      .border {
        border: 2px solid var(--border-color);
      }

      .s {
        --header-font-size: var(--fontsize-heading-s);
        --padding-vertical: var(--spacing-s);
        --header-font-weight: 700;
        --header-letter-spacing: 0.2px;
        --header-line-height: 1.4;
        --button-size: 28px;
        --padding-horizontal: var(--spacing-2-xs);
      }

      .s .closeButton div {
        margin-right: var(--spacing-4-xs);
      }

      .accordionHeader {
        position: relative;
        color: var(--header-font-color);
        font-size: var(--header-font-size);
        letter-spacing: var(--header-letter-spacing);
        font-weight: var(--header-font-weight);
        line-height: var(--header-line-height);
        padding-top: var(--padding-vertical);
        padding-bottom: var(--padding-vertical);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .accordionHeader > div {
        flex: 1 1 auto;
      }

      .accordionContent {
        position: relative;
        font-size: var(--content-font-size);
        line-height: var(--content-line-height);
        padding-bottom: var(--spacing-m);
        color: var(--content-font-color);
      }

      .accordionContent .closeButton {
        color: var(--content-font-color);
        position: absolute;
        bottom: 0;
        right: 0;
      }

      .contentWithCloseButton {
        padding-bottom: 44px;
      }

      .headingContainer {
        cursor: pointer;
        width: 100%;
        display: grid;
        grid-template-columns: auto calc(var(--button-size));
        box-sizing: border-box;
        align-items: center;
      }

      .headingContainer:focus {
        outline: 2px solid var(--header-focus-outline-color, transparent);
      }

      .accordionButtonIcon {
        box-sizing: border-box;
        border: 2px solid transparent;
        width: var(--button-size) !important;
        height: var(--button-size) !important;
        margin: auto;
      }
    `;
  }
}

const getCloseMessage = (language: Language): string =>
  ({
    en: `Close`,
    fi: `Sulje`,
    sv: `Stäng`,
  }[language]);
