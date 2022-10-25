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
    <span class="hds-tag__label">Label</span>
    <button aria-label="Delete item" class="hds-tag__delete-button button-reset">
        <span aria-hidden="true" class="hds-icon hds-icon--cross"></span>
    </button>
  </div>
`;
