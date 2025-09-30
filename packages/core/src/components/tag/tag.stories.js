import './tag.css';

export default {
  title: 'Components/Tag',
};

const longText =
  'Label - This is a tag with a very long text which is not advisable and might span into multiple lines';

const tagWrapperStyle = 'display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-start;';

export const ActionTags = () => `
  <div style="${tagWrapperStyle}">
    <div role="button" tabindex="0" class="hds-tag hds-tag--action" id="action-1" onclick={console.log("action-1");} aria-label="run action 1" data-playwright="true">
      <span>Label</span>
    </div>
    <div role="button" tabindex="0" class="hds-tag hds-tag--action hds-icon--trash hds-icon-start--trash" id="action-2" onclick={console.log("action-2");} aria-label="run action 2">
      <span>Label</span>
    </div>
    <div role="button" tabindex="0" class="hds-tag hds-tag--large hds-tag--action" id="action-3" onclick={console.log("action-3");} aria-label="run action 3" data-playwright="true">
      <span class="hds-tag__label">Label</span>
    </div>
    <div role="button" tabindex="0" class="hds-tag hds-tag--large hds-tag--action hds-icon--trash hds-icon-start--trash" id="action-4" onclick={console.log("action-4");} aria-label="run action 4">
      <span>Label</span>
    </div>
  </div>
`;

const customA = `
    --background-color: var(--color-brick);
    --color: var(--color-white);
    --outline-color: var(--color-black-90);`;

const customB = `
    --background-color: var(--color-engel);
    --color: var(--color-black-90);
    --outline-color: var(--color-black-90);`;

const customC = `
    --background-color: var(--color-tram-dark);
    --background-color-hover: color-mix(in srgb, var(--color-tram-dark) 80%, white);
    --color: var(--color-white);
    --outline-color: var(--color-metro);`;

const customD = `
    --background-color: var(--color-fog);
    --color: var(--color-black-90);
    --outline-color: var(--color-black-90);
    --background-color-hover: orange;`;

export const CustomThemeTags = () => `
  <div style="${tagWrapperStyle}">
    <div class="hds-tag" style="${customA}" id="custom-1">
      <span>Label</span>
    </div>
    <div class="hds-tag hds-icon--share hds-icon-start--share" style="${customB}" id="custom-2">
      <span>Label</span>
    </div>
    <div role="button" class="hds-tag hds-tag--large hds-tag--action" style="${customC}" id="custom-3" tabindex="0"  onclick={console.log("custom-3");} aria-label="run custom action">
      <span>Label</span>
    </div>
    <a href="#" target="_blank" class="hds-tag hds-tag--link hds-tag--large hds-icon--share hds-icon-start--share" style="${customD}" id="custom-4" aria-label="open custom link">
      <span>Label</span>
    </a>
  </div>
`;

export const DeletableTags = () => `
  <div style="${tagWrapperStyle}">
    <div role="button" tabindex="0" class="hds-tag hds-tag--action hds-icon--cross hds-icon-end--cross" id="delete-1"  onclick={console.log("delete-1");} data-playwright="true">
      <span>Label</span>
    </div>
    <div role="button" tabindex="0" class="hds-tag hds-tag--large hds-tag--action hds-icon--cross hds-icon-end--cross" id="delete-2"  onclick={console.log("delete-2");} data-playwright="true">
      <span>Label</span>
    </div>
  </div>
`;

export const InformativeTagsLarge = () => `
  <div style="${tagWrapperStyle}">
    <div class="hds-tag hds-tag--large" id="info-1">
      <span>Label</span>
    </div>
    <div class="hds-tag hds-tag--large hds-icon--share hds-icon-start--share" id="info-2">
      <span>Label</span>
    </div>
    <div class="hds-tag hds-tag--large hds-icon--trash hds-icon-end--trash" id="info-3">
      <span>Label</span>
    </div>
    <div class="hds-tag hds-tag--large hds-icon--share hds-icon-start--share hds-icon--trash hds-icon-end--trash" id="info-4">
      <span>Label</span>
    </div>
  </div>
`;

export const InformativeTagsSmall = () => `
  <div style="${tagWrapperStyle}">
    <div class="hds-tag" id="info-1">
    <span>Label</span>
    </div>
    <div class="hds-tag hds-icon--share hds-icon-start--share" id="info-2">
      <span>Label</span>
    </div>
    <div class="hds-tag hds-icon--trash hds-icon-end--trash" id="info-3">
      <span>Label</span>
    </div>
    <div class="hds-tag hds-icon--share hds-icon-start--share hds-icon--trash hds-icon-end--trash" id="info-4">
      <span>Label</span>
    </div>
  </div>
`;

export const LinkTags = () => `
  <div style="${tagWrapperStyle}">
    <a href="#" target="_blank" class="hds-tag hds-tag--link hds-icon--share hds-icon-end--share" id="link-1" data-playwright="true">
      <span>Label</span>
    </a>
    <a href="#" target="_blank" class="hds-tag hds-tag--link hds-tag--large hds-icon--share hds-icon-end--share" id="link-2" data-playwright="true">
      <span>Label</span>
    </a>
  </div>
`;

const LongTextTags = (sizeClass) => `
<div style="${tagWrapperStyle} max-width: 300px;">
    <div class="hds-tag ${sizeClass} hds-tag--multiline">
      <span>
        ${longText}
      </span>
    </div>
    <div class="hds-tag ${sizeClass} hds-tag--multiline hds-icon--share hds-icon-start--share">
      <span>
        ${longText}
      </span>
    </div>
    <div class="hds-tag ${sizeClass} hds-tag--multiline hds-icon--share hds-icon-end--share">
      <span>
        ${longText}
      </span>
    </div>
    <div class="hds-tag ${sizeClass} hds-tag--multiline hds-icon--share hds-icon-start--share hds-icon--trash hds-icon-end--trash">
      <span>
        ${longText}
      </span>
    </div>
    <div class="hds-tag ${sizeClass} hds-tag--action hds-tag--multiline hds-icon--cross hds-icon-end--cross">
      <span>
        ${longText}
      </span>
    </div>
    <div class="hds-tag ${sizeClass} hds-tag--action hds-tag--multiline">
      <span>
        ${longText}
      </span>
    </div>
    <a href="#" target="_blank" class="hds-tag hds-tag--link ${sizeClass} hds-tag--multiline">
      <span>
        ${longText}
      </span>
    </a>
  </div>
`;

export const LongTextTagsLarge = () => `
  ${LongTextTags('hds-tag--large')}
`;

export const LongTextTagsSmall = () => `
  ${LongTextTags()}
`;