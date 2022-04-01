import './pager.css';

export default {
  title: 'Components/Pager',
  decorators: [(storyFn) => `<div style="width: 100%;">${storyFn()}</div>`],
};

export const Basic = (args, context) => `
<nav class="hds-pager" role="navigation" aria-label="Pagination">
  <div class="hds-pager__items">
    <div class="hds-pager__item hds-pager__previous-button">
      <button type="button" disabled class="hds-button hds-button--supplementary hds-button--theme-black">
        <span aria-hidden="true" class="hds-icon hds-icon--angle-left"></span>
        <span class="hds-button__label">Previous</span>
      </button>
    </div>
    <ul class="hds-pager__pages">
      <li class="hds-pager__item">
        <a class="hds-pager__item-link hds-pager__item-link--active" href="?path=/story/${context.id}&page=1" title="Current page" aria-label="Page 1" aria-current="page">
          1
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=2" aria-label="Page 2" title="Go to page 2">
          2
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=3"  aria-label="Page 3" title="Go to page 3">
          3
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=4" aria-label="Page 4" title="Go to page 4">
          4
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=5" aria-label="Page 5" title="Go to page 5">
          5
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=6" aria-label="Page 6" title="Go to page 6">
          6
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=7" aria-label="Page 7" title="Go to page 7">
          7
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=8" aria-label="Page 8" title="Go to page 8">
          8
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=9" aria-label="Page 9" title="Go to page 9">
          9
        </a>
      </li>
    </ul>
    <div class="hds-pager__item hds-pager__next-button">
      <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black">
        <span class="hds-button__label">Next</span>
        <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
      </button>
    </div>
  </div>
</nav>
`;

export const WithTruncation = (args, context) => `
<nav class="hds-pager" role="navigation" aria-label="Pagination">
  <div class="hds-pager__items">
    <div class="hds-pager__item hds-pager__previous-button">
      <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black">
        <span aria-hidden="true" class="hds-icon hds-icon--angle-left"></span>
        <span class="hds-button__label">Previous</span>
      </button>
    </div>
    <ul class="hds-pager__pages">
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=1" title="Current page" aria-label="Page 1" aria-current="page">
          1
        </a>
      </li>
      <li class="hds-pager__item">
        <span class="hds-pager__item-ellipsis">
          ...
        </span>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=99995" aria-label="Page 99995" title="Go to page 99995">
          99995
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=99996" aria-label="Page 99996" title="Go to page 99996">
          99996
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link hds-pager__item-link--active" href="?path=/story/${context.id}&page=99997" aria-label="Page 99997" title="Go to page 99997">
          99997
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=99998" aria-label="Page 99998" title="Go to page 99998">
          99998
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=99999" aria-label="Page 99999" title="Go to page 99999">
          99999
        </a>
      </li>
    </ul>
    <div class="hds-pager__item hds-pager__next-button">
      <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black">
        <span class="hds-button__label">Next</span>
        <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
      </button>
    </div>
  </div>
</nav>
`;

WithTruncation.storyName = 'With truncation';

export const CustomActivePageColor = (args, context) => `
  <style>
    .custom-active-page-background-color {
      --active-page-background-color: var(--color-bus);
    }
  </style>
<nav class="hds-pager custom-active-page-background-color" role="navigation" aria-label="Pagination">
  <div class="hds-pager__items">
    <div class="hds-pager__item hds-pager__previous-button">
      <button type="button" disabled class="hds-button hds-button--supplementary hds-button--theme-black">
        <span aria-hidden="true" class="hds-icon hds-icon--angle-left"></span>
        <span class="hds-button__label">Previous</span>
      </button>
    </div>
    <ul class="hds-pager__pages">
      <li class="hds-pager__item">
        <a class="hds-pager__item-link hds-pager__item-link--active" href="?path=/story/${context.id}&page=1" title="Current page" aria-label="Page 1" aria-current="page">
          1
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=2" aria-label="Page 2" title="Go to page 2">
          2
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=3"  aria-label="Page 3" title="Go to page 3">
          3
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=4" aria-label="Page 4" title="Go to page 4">
          4
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=5" aria-label="Page 5" title="Go to page 5">
          5
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=6" aria-label="Page 6" title="Go to page 6">
          6
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=7" aria-label="Page 7" title="Go to page 7">
          7
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=8" aria-label="Page 8" title="Go to page 8">
          8
        </a>
      </li>
      <li class="hds-pager__item">
        <a class="hds-pager__item-link" href="?path=/story/${context.id}&page=9" aria-label="Page 9" title="Go to page 9">
          9
        </a>
      </li>
    </ul>
    <div class="hds-pager__item hds-pager__next-button">
      <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black">
        <span class="hds-button__label">Next</span>
        <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
      </button>
    </div>
  </div>
</nav>
`;

CustomActivePageColor.storyName = 'Custom active page color';
