import './search-input.css';
import '../../icons/icon.css';

export default {
  title: 'Components/Search input',
  decorators: [(storyFn) => `<div style="max-width: 420px;">${storyFn()}</div>`],
};

export const Default = () => `
  <div class="hds-search-input">
    <label for="example" class="hds-search-input__label">Search</label>
    <div class="hds-search-input__input-wrapper">
      <input
        id="example"
        class="hds-search-input__input"
        type="text"
        placeholder="Placeholder text"
      />
      <div class="hds-search-input__buttons">
        <button
          type="button"
          aria-label="Search"
          class="hds-search-input__button"
        >
          <i class="hds-icon hds-icon--search hds-icon--size-s" aria-hidden="true"></i>
      </div>
    </div>
    <span class="hds-search-input__helper-text">Assistive text</span>
  </div>
`;
