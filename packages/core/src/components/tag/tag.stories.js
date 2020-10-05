import './tag.css';
import '../../icons/icon.css';
import '../../icons/ui/icon-cross.css';

export default {
  title: 'Components/Tag',
};

export const Default = () => `
  <div class="hds-tag">
    <span>Label</span>
    <button aria-label="Delete item" class="hds-tag__delete-button button-reset">
        <span aria-hidden="true" class="hds-icon hds-icon--cross"></span>
    </button>
  </div>
`;
