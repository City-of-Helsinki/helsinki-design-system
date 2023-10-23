import './tag.css';

export default {
  title: 'Components/Tag',
};

export const DefaultTag = () => `
  <div class="hds-tag">
    <span class="hds-tag__label">Label</span>
  </div>
`;

export const DefaultTagClickable = () => `
  <div class="hds-tag" role="link" tabindex="0" onclick="">
    <span class="hds-tag__label">Label</span>
  </div>
`;

export const DefaultTagDeletable = () => `
  <div class="hds-tag">
    <span class="hds-tag__label" aria-hidden="true">Label</span>
    <button aria-label="Delete item: Label" class="hds-tag__delete-button button-reset">
        <span aria-hidden="true" class="hds-icon hds-icon--cross"></span>
    </button>
  </div>
`;

export const DefaultTagWithLongText = () => `
  <div class="hds-tag" style="max-width: 300px;">
    <span class="hds-tag__label">Label - This is a tag with a very long text which is not advisable and might span into multiple lines</span>
  </div>
`;

export const DefaultTagWithLongTextAndDeletable = () => `
  <div class="hds-tag" style="max-width: 300px;">
  <span class="hds-tag__label" aria-hidden="true">Label - This is a tag with a very long text which is not advisable and might span into multiple lines</span>
    <button aria-label="Delete item: Label" class="hds-tag__delete-button button-reset">
      <span aria-hidden="true" class="hds-icon hds-icon--cross"></span>
    </button>
  </div>
`;

export const LargeTag = () => `
  <div class="hds-tag hds-tag--large">
    <span class="hds-tag__label">Label</span>
  </div>
`;

export const LargeTagDeletable = () => `
  <div class="hds-tag hds-tag--large">
    <span class="hds-tag__label" aria-hidden="true">Label</span>
    <button aria-label="Delete item: Label" class="hds-tag__delete-button button-reset">
        <span aria-hidden="true" class="hds-icon hds-icon--cross"></span>
    </button>
  </div>
`;

export const LargeTagWithLongText = () => `
  <div class="hds-tag hds-tag--large" style="max-width: 300px;">
    <span class="hds-tag__label" aria-hidden="true">Label - This is a tag with a very long text which is not advisable and might span into multiple lines</span>
  </div>
`;

export const LargeTagWithLongTextAndDeletable = () => `
  <div class="hds-tag hds-tag--large" style="max-width: 300px;">
    <span class="hds-tag__label" aria-hidden="true">Label - This is a tag with a very long text which is not advisable and might span into multiple lines</span>
    <button aria-label="Delete item: Label" class="hds-tag__delete-button button-reset">
      <span aria-hidden="true" class="hds-icon hds-icon--cross"></span>
    </button>
  </div>
`;