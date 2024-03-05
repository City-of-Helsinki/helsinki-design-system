import './tag.css';

export default {
  title: 'Components/Tag',
};

const longText =
  'Label - This is a tag with a very long text which is not advisable and might span into multiple lines';

const tagWrapperStyle = 'display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-start;';

export const ActionTags = () => `
  <div style="${tagWrapperStyle}">
    <div role="button" tabindex="0" class="hds-tag hds-tag--action" id="action-1" onclick={console.log("action-1");} aria-label="run action 1">
      <span class="hds-tag__label">Label</span>
    </div>
    <div role="button" tabindex="0" class="hds-tag hds-tag--action" id="action-2" onclick={console.log("action-2");} aria-label="run action 2">
      <span class="hds-icon hds-tag__icon hds-icon--trash" aria-hidden="true"></span>
      <span class="hds-tag__label">Label</span>
    </div>
    <div role="button" tabindex="0" class="hds-tag hds-tag--large hds-tag--action" id="action-3" onclick={console.log("action-3");} aria-label="run action 3">
      <span class="hds-tag__label">Label</span>
    </div>
    <div role="button" tabindex="0" class="hds-tag hds-tag--large hds-tag--action" id="action-4" onclick={console.log("action-4");} aria-label="run action 4">
      <span class="hds-icon hds-tag__icon hds-icon--trash" aria-hidden="true"></span>
      <span class="hds-tag__label">Label</span>
    </div>
  </div>
`;

const customA = `
    --tag-background-color: var(--color-brick);
    --tag-color: var(--color-white);
    --tag-focus-outline-color: var(--color-black-90);`;

const customB = `
    --tag-background-color: var(--color-engel);
    --tag-color: var(--color-black-90);
    --tag-focus-outline-color: var(--color-black-90);`;

const customC = `
    --tag-background-color: var(--color-copper-dark);
    --tag-hover-background-color: var(--color-tram-dark);
    --tag-color: var(--color-white);
    --tag-focus-outline-color: var(--color-metro);`;

const customD = `
    --tag-background-color: var(--color-fog);
    --tag-color: var(--color-black-90);
    --tag-focus-outline-color: var(--color-black-90);
    --tag-hover-background-color: orange;`;

export const CustomThemeTags = () => `
  <div style="${tagWrapperStyle}">
    <div class="hds-tag" style="${customA}" id="custom-1">
      <span class="hds-tag__label">Label</span>
    </div>
    <div class="hds-tag" style="${customB}" id="custom-2">
      <span class="hds-icon hds-tag__icon hds-icon--share" aria-hidden="true"></span>
      <span class="hds-tag__label">Label</span>
    </div>
    <div role="button" class="hds-tag hds-tag--large hds-tag--action" style="${customC}" id="custom-3" tabindex="0"  onclick={console.log("custom-3");} aria-label="run custom action">
      <span class="hds-tag__label">Label</span>
    </div>
    <a href="#" target="_blank" class="hds-tag hds-tag--link hds-tag--large" style="${customD}" id="custom-4" aria-label="open custom link">
      <span class="hds-icon hds-tag__icon hds-icon--share" aria-hidden="true"></span>
      <span class="hds-tag__label">Label</span>
    </a>
  </div>
`;

export const DeletableTags = () => `
  <div style="${tagWrapperStyle}">
    <div role="button" tabindex="0" class="hds-tag hds-tag--action" id="delete-1"  onclick={console.log("delete-1");}>
      <span class="hds-tag__label">Label</span>
      <span class="hds-icon hds-tag__icon hds-icon--cross" aria-hidden="true"></span>
    </div>
    <div role="button" tabindex="0" class="hds-tag hds-tag--large hds-tag--action" id="delete-2"  onclick={console.log("delete-2");}>
      <span class="hds-tag__label">Label</span>
      <span class="hds-icon hds-tag__icon hds-icon--cross" aria-hidden="true"></span>
    </div>
  </div>
`;

export const InformativeTagsLarge = () => `
  <div style="${tagWrapperStyle}">
    <div class="hds-tag hds-tag--large" id="info-1">
      <span class="hds-tag__label">Label</span>
    </div>
    <div class="hds-tag hds-tag--large" id="info-2">
      <span class="hds-icon hds-tag__icon hds-icon--share" aria-hidden="true"></span>
      <span class="hds-tag__label">Label</span>
    </div>
    <div class="hds-tag hds-tag--large" id="info-3">
      <span class="hds-tag__label">Label</span>
      <span class="hds-icon hds-tag__icon hds-icon--trash" aria-hidden="true"></span>
    </div>
    <div class="hds-tag hds-tag--large" id="info-4">
      <span class="hds-icon hds-tag__icon hds-icon--share" aria-hidden="true"></span>
      <span class="hds-tag__label">Label</span>
      <span class="hds-icon hds-tag__icon hds-icon--trash" aria-hidden="true"></span>
    </div>
  </div>
`;

export const InformativeTagsSmall = () => `
  <div style="${tagWrapperStyle}">
    <div class="hds-tag" id="infos-1">
      <span class="hds-tag__label">Label</span>
    </div>
    <div class="hds-tag" id="infos-2">
      <span class="hds-icon hds-tag__icon hds-icon--share" aria-hidden="true"></span>
      <span class="hds-tag__label">Label</span>
    </div>
    <div class="hds-tag" id="infos-3">
      <span class="hds-tag__label">Label</span>
      <span class="hds-icon hds-tag__icon hds-icon--trash" aria-hidden="true"></span>
    </div>
    <div class="hds-tag" id="infos-4">
      <span class="hds-icon hds-tag__icon hds-icon--share" aria-hidden="true"></span>
      <span class="hds-tag__label">Label</span>
      <span class="hds-icon hds-tag__icon hds-icon--trash" aria-hidden="true"></span>
    </div>
  </div>
`;

export const LinkTags = () => `
  <div style="${tagWrapperStyle}">
    <a href="#" target="_blank" class="hds-tag hds-tag--link" id="link-1">
      <span class="hds-tag__label">Label</span>
      <span class="hds-icon hds-tag__icon hds-icon--share" aria-hidden="true"></span>
    </a>
    <a href="#" target="_blank" class="hds-tag hds-tag--link hds-tag--large" id="link-2">
      <span class="hds-tag__label">Label</span>
      <span class="hds-icon hds-tag__icon hds-icon--share" aria-hidden="true"></span>
    </a>
  </div>
`;

const LontTextTags = (sizeClass) => `
<div style="${tagWrapperStyle} max-width: 300px;">
    <div class="hds-tag ${sizeClass}" id="longtext-l-1">
      <span class="hds-tag__label hds-tag__label--multiline">
        ${longText}
      </span>
    </div>
    <div class="hds-tag ${sizeClass}" id="longtext-l-2">
      <span class="hds-icon hds-tag__icon hds-icon--share" aria-hidden="true"></span>
      <span class="hds-tag__label hds-tag__label--multiline">
        ${longText}
      </span>
    </div>
    <div class="hds-tag ${sizeClass}" id="longtext-l-3">
      <span class="hds-tag__label hds-tag__label--multiline">
        ${longText}
      </span>
      <span class="hds-icon hds-tag__icon hds-icon--share" aria-hidden="true"></span>
    </div>
    <div class="hds-tag ${sizeClass}" id="longtext-l-4">
      <span class="hds-icon hds-tag__icon hds-icon--share" aria-hidden="true"></span>
      <span class="hds-tag__label hds-tag__label--multiline">
        ${longText}
      </span>
      <span class="hds-icon hds-tag__icon hds-icon--trash" aria-hidden="true"></span>
    </div>
    <div class="hds-tag ${sizeClass} hds-tag--action" id="longtext-l-5">
      <span class="hds-tag__label hds-tag__label--multiline">
        ${longText}
      </span>
      <span class="hds-icon hds-tag__icon hds-icon--cross" aria-hidden="true"></span>
    </div>
    <div class="hds-tag ${sizeClass} hds-tag--action" id="longtext-l-5">
      <span class="hds-tag__label hds-tag__label--multiline">
        ${longText}
      </span>
    </div>
    <a href="#" target="_blank" class="hds-tag hds-tag--link ${sizeClass}" id="longtext-link">
      <span class="hds-tag__label hds-tag__label--multiline">
        ${longText}
      </span>
    </a>
  </div>
`;

export const LongTextTagsLarge = () => `
  ${LontTextTags('hds-tag--large')}
`;

export const LongTextTagsSmall = () => `
  ${LontTextTags()}
`;