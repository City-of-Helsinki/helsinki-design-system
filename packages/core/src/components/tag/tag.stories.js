import './tag.css';

export default {
  title: 'Components/Tag',
};

export const Default = () => `
  <div class="hds-tag">
    <span class="hds-tag__label">Label</span>
  </div>
`;

export const Clickable = () => `
  <div class="hds-tag" role="link" tabindex="0" onclick="">
    <span class="hds-tag__label">Label</span>
  </div>
`;

export const Deletable = () => `
  <div class="hds-tag">
    <span class="hds-tag__label" aria-hidden="true">Label</span>
    <button aria-label="Delete item: Label" class="hds-tag__delete-button button-reset">
        <span aria-hidden="true" class="hds-icon hds-icon--cross"></span>
    </button>
  </div>
`;

export const Rounded = () => `
  <div class="hds-tag hds-tag--rounded-corners">
    <span class="hds-tag__label">Label</span>
  </div>
`;

export const RoundedDeletable = () => `
  <div class="hds-tag hds-tag--rounded-corners">
    <span class="hds-tag__label" aria-hidden="true">Label</span>
    <button aria-label="Delete item: Label" class="hds-tag__delete-button button-reset">
        <span aria-hidden="true" class="hds-icon hds-icon--cross"></span>
    </button>
  </div>
`;

export const LargeRoundedDeletable = () => `
  <div class="hds-tag hds-tag--rounded-corners hds-tag--rounded-corners-large">
    <span class="hds-tag__label" aria-hidden="true">Label</span>
    <button aria-label="Delete item: Label" class="hds-tag__delete-button button-reset">
        <span aria-hidden="true" class="hds-icon hds-icon--cross"></span>
    </button>
  </div>
`;
