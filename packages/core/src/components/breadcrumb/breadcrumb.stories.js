import './breadcrumb.scss';
import '../link/link.css';
import '../../icons/angle-right.css';
import '../../icons/angle-left.css';

export default {
  title: 'Components/Breadcrumb',
};

export const Breadcrumb = () => `
  <nav aria-label="Breadcrumb" class="hds-breadcrumb">
    <ol class="hds-breadcrumb__list hds-breadcrumb__list--desktop">
      <li class="hds-breadcrumb__list-item">
        <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/">Front page</a>
        <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>
      </li>
      <li class="hds-breadcrumb__list-item">
        <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/path">Health and social services</a>
        <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>
      </li>
      <li class="hds-breadcrumb__list-item">
        <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/path/2ndLevelPath">Senior services</a>
        <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>
      </li>
      <li class="hds-breadcrumb__list-item">
        <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/path/2ndLevelPath/3rdLevelPath">Informal care</a>
        <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>
      </li>
      <li class="hds-breadcrumb__list-item hds-breadcrumb__list-item--active">
        <span aria-current="true" class="Breadcrumb_active__02+NO">Care options</span>
      </li>
    </ol>
    <div class="hds-breadcrumb__list hds-breadcrumb__list--mobile">
      <span class="hds-icon hds-icon--angle-left hds-breadcrumb__back-arrow" aria-hidden="true"> </span>
      <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/path/2ndLevelPath/3rdLevelPath">Informal care</a>
    </div>
  </nav>
`;

export const WithCustomTheme = () => `
  <style type="text/css">
    .custom-theme {
      content: "";
      --horizontal-margin-small: var(--spacing-layout-s);
      --horizontal-margin-medium: var(--spacing-layout-m);
      --horizontal-margin-large: var(--spacing-layout-l);
      --horizontal-margin-x-large: var(--spacing-layout-xl);
    }
  </style>
  <nav aria-label="Breadcrumb" class="hds-breadcrumb custom-theme">
    <ol class="hds-breadcrumb__list hds-breadcrumb__list--desktop">
      <li class="hds-breadcrumb__list-item">
        <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/">Front page</a>
        <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>
      </li>
      <li class="hds-breadcrumb__list-item">
        <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/path">Health and social services</a>
        <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>
      </li>
      <li class="hds-breadcrumb__list-item">
        <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/path/2ndLevelPath">Senior services</a>
        <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>
      </li>
      <li class="hds-breadcrumb__list-item">
        <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/path/2ndLevelPath/3rdLevelPath">Informal care</a>
        <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>
      </li>
      <li class="hds-breadcrumb__list-item hds-breadcrumb__list-item--active">
        <span aria-current="true" class="Breadcrumb_active__02+NO">Care options</span>
      </li>
    </ol>
    <div class="hds-breadcrumb__list hds-breadcrumb__list--mobile">
      <span class="hds-icon hds-icon--angle-left hds-breadcrumb__back-arrow" aria-hidden="true"> </span>
      <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/path/2ndLevelPath/3rdLevelPath">Informal care</a>
    </div>
  </nav>
 `;
WithCustomTheme.storyName = 'With custom theme';
