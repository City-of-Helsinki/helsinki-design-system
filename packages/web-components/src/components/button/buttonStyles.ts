import { css } from "lit";

// TODO: Use rollup plugin for css file imports so we can have this as an actual CSS file
export default css`

:host {
  --border-width: 2px;
  --color: inherit;
  --min-size: 44px;
  --outline-gutter: 2px;
  --outline-width: 3px;
  --padding: var(--padding-2-xs);

  --background-color: var(--background-color);
  --border-color: var(--border-color);
  --color: var(--color);
}

.button {
  align-content: flex-start;
  align-items: center;
  background-color: var(--background-color, transparent);
  border: var(--border-width) solid var(--border-color, transparent);
  border-radius: 0;
  color: var(--color);
  cursor: pointer;
  display: inline-flex;
  font-weight: 500;
  justify-content: center;
  min-height: var(--min-size);
  min-width: var(--min-size);
  padding: 0 var(--padding);
  position: relative;
  vertical-align: top;
}

.button:hover,
.button:focus {
  transition-property: background-color, border-color, color;
  transition-duration: 85ms;
  transition-timing-function: ease-out;
}

.button:hover {
  background-color: var(--background-color-hover, transparent);
  color: var(--color-hover);
}

.button:focus {
  background-color: var(--background-color-focus, transparent);
  color: var(--color-focus);
  outline: none;
}

.button:active {
  background-color: var(--background-color-focus, transparent);
  color: var(--color-focus);
  outline: none;
}

.button:focus:hover {
  background-color: var(--background-color-hover-focus, transparent);
}

.button:active:hover {
  background-color: var(--background-color-hover-focus, transparent);
}

.button:disabled {
  background-color: var(--background-color-disabled, transparent);
  border-color: var(--border-color-disabled, transparent);
  color: var(--color-disabled);
  cursor: not-allowed;
}

.button:not(:disabled) {
  border-color: var(--border-color, transparent);
}

.button:not(:disabled):hover {
  border-color: var(--border-color-hover, transparent);
}

.button:not(:disabled):focus {
  border-color: var(--border-color-focus, transparent);
}

.button:not(:disabled):active {
  border-color: var(--border-color-focus, transparent);
}

.button:not(:disabled):focus:hover {
  border-color: var(--border-color-hover-focus, transparent);
  color: var(--color-hover-focus);
}

.button:not(:disabled):active:hover {
  border-color: var(--border-color-hover-focus, transparent);
  color: var(--color-hover-focus);
}



.fullwidth {
  width: 100%;
}

.icon {
  height: var(--spacing-m);
  margin-left: var(--spacing-s);
  width: var(--spacing-m);
}

.label ~ .icon {
  margin: 0 var(--spacing-s) 0 0;
}



.label {
  font-weight: inherit;
  line-height: 1.25em;
  padding: var(--spacing-s);
}

.label:only-child {
  margin: 0 var(--padding);
}

/* supplementary with right icon */
:host(.supplementary) .label:first-child {
  padding-right: var(--padding);
}

/* supplementary with left icon */
:host(.supplementary) .icon + .label:last-child {
  padding-left: var(--padding);
}

/* supplementary with both icons */
:host(.supplementary) .icon + .label:not(:last-child) {
  padding-left: var(--padding);
  padding-right: var(--padding);
}

/* PRIMARY */

.button.primary {
  --background-color: var(--color-bus);
  --background-color-hover: var(--color-bus-dark);
  --background-color-focus: var(--color-bus);
  --background-color-hover-focus: var(--color-bus-dark);
  --background-color-disabled: var(--color-black-20);

  --border-color: var(--color-bus);
  --border-color-hover: var(--color-bus-dark);
  --border-color-focus: var(--color-bus);
  --border-color-hover-focus: var(--color-bus-dark);
  --border-color-disabled: var(--color-black-20);

  --color: var(--color-white);
  --color-hover: var(--color-white);
  --color-focus: var(--color-white);
  --color-hover-focus: var(--color-white);
  --color-disabled: var(--color-white);

  --focus-outline-color: var(--color-coat-of-arms);
  --submit-input-focus-gutter-color: var(--color-white);
}

/* SUPPLEMENTARY */

.button.supplementary {
  --background-color: transparent;
  --background-color-hover: var(--color-bus-light);
  --background-color-focus: transparent;
  --background-color-hover-focus: var(--color-bus-light);
  --background-color-disabled: transparent;

  --border-color: transparent;
  --border-color-hover: transparent;
  --border-color-focus: var(--color-coat-of-arms);
  --border-color-hover-focus: var(--color-coat-of-arms);
  --border-color-disabled: transparent;

  --color: var(--color-bus);
  --color-hover: var(--color-bus-dark);
  --color-focus: var(--color-bus);
  --color-hover-focus: var(--color-bus-dark);
  --color-disabled: var(--color-black-40);

  --focus-outline-color: transparent;
  --submit-input-focus-gutter-color: transparent;

  --background-color: transparent;
  --background-color-hover: var(--color-black-5);
  --background-color-focus: transparent;
  --background-color-hover-focus: var(--color-black-5);

  --border-color: transparent;
  --border-color-hover: transparent;
  --border-color-focus: var(--color-coat-of-arms);
  --border-color-hover-focus: var(--color-coat-of-arms-dark);

  --color: var(--color-black);
  --color-hover: var(--color-black);
  --color-focus: var(--color-black);
  --color-hover-focus: var(--color-black);

}
`;
