import './pagination.css';

export default {
  title: 'Components/Pagination',
  decorators: [(storyFn) => `<div style="width: 100%;">${storyFn()}</div>`],
};

export const Basic = () => `
<div class="hds-pagination-container">
  <nav class="hds-pagination" role="navigation" aria-label="Pagination" data-next="Next">
    <button type="button" disabled class="hds-button hds-button--supplementary hds-button--theme-black hds-pagination__button-prev">
      <span aria-hidden="true" class="hds-icon hds-icon--angle-left"></span>
      <span class="hds-button__label">Previous</span>
    </button>
    <ul class="hds-pagination__pages">
      <li>
        <span class="hds-pagination__item-link hds-pagination__item-link--active" title="Current page" aria-label="Page 1" aria-current="page">
          1
        </span>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" aria-label="Page 2" title="Go to page 2">
          2
        </a>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#"  aria-label="Page 3" title="Go to page 3">
          3
        </a>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" aria-label="Page 4" title="Go to page 4">
          4
        </a>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" aria-label="Page 5" title="Go to page 5">
          5
        </a>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" aria-label="Page 6" title="Go to page 6">
          6
        </a>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" aria-label="Page 7" title="Go to page 7">
          7
        </a>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" aria-label="Page 8" title="Go to page 8">
          8
        </a>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" aria-label="Page 9" title="Go to page 9">
          9
        </a>
      </li>
    </ul>
    <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black hds-pagination__button-next">
      <span class="hds-button__label">Next</span>
      <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
    </button>
  </nav>
</div>
`;

export const WithTruncation = () => `
<div class="hds-pagination-container">
  <nav class="hds-pagination" role="navigation" aria-label="Pagination 1" data-next="Next">
    <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black hds-pagination__button-prev">
      <span aria-hidden="true" class="hds-icon hds-icon--angle-left"></span>
      <span class="hds-button__label">Previous</span>
    </button>
    <ul class="hds-pagination__pages">
      <li>
        <a class="hds-pagination__item-link" href="#" title="Go to page 1" aria-label="Page 1">
          1
        </a>
      </li>
      <li>
        <span class="hds-pagination__item-ellipsis">
          ...
        </span>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" aria-label="Page 64" title="Go to page 64">
          64
        </a>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" aria-label="Page 65" title="Go to page 65">
          65
        </a>
      </li>
      <li>
        <span class="hds-pagination__item-link hds-pagination__item-link--active" aria-label="Page 66" title="Current page" aria-current="page">
          66
        </span>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" aria-label="Page 67" title="Go to page 67">
          67
        </a>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" aria-label="Page 68" title="Go to page 68">
          68
        </a>
      </li>
    </ul>
    <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black hds-pagination__button-next">
      <span class="hds-button__label">Next</span>
      <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
    </button>
  </nav>
</div>

<div class="hds-pagination-container">
  <nav class="hds-pagination" role="navigation" aria-label="Pagination 2" data-next="Next">
    <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black hds-pagination__button-prev">
      <span aria-hidden="true" class="hds-icon hds-icon--angle-left"></span>
      <span class="hds-button__label">Previous</span>
    </button>
    <ul class="hds-pagination__pages">
      <li>
        <a class="hds-pagination__item-link" href="#" title="Go to page 1" aria-label="Page 1">
          1
        </a>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" title="Go to page 2" aria-label="Page 2">
          2
        </a>
      </li>
      <li>
        <span class="hds-pagination__item-link hds-pagination__item-link--active" title="Current page" aria-label="Page 3" aria-current="page">
          3
        </span>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" title="Go to page 4" aria-label="Page 4">
          4
        </a>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" title="Go to page 5" aria-label="Page 5">
          5
        </a>
      </li>
      <li>
        <span class="hds-pagination__item-ellipsis">
          ...
        </span>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" aria-label="Page 68" title="Go to page 68">
          68
        </a>
      </li>
    </ul>
    <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black hds-pagination__button-next">
      <span class="hds-button__label">Next</span>
      <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
    </button>
  </nav>
</div>

<div class="hds-pagination-container">
  <nav class="hds-pagination" role="navigation" aria-label="Pagination 3" data-next="Next">
    <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black hds-pagination__button-prev">
      <span aria-hidden="true" class="hds-icon hds-icon--angle-left"></span>
      <span class="hds-button__label">Previous</span>
    </button>
    <ul class="hds-pagination__pages">
      <li>
        <a class="hds-pagination__item-link" href="#" title="Go to page 1" aria-label="Page 1">
          1
        </a>
      </li>
      <li>
        <span class="hds-pagination__item-ellipsis">
          ...
        </span>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" title="Go to page 30" aria-label="Page 30">
          30
        </a>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" title="Go to page 31" aria-label="Page 31">
          31
        </a>
      </li>
      <li>
        <span class="hds-pagination__item-link hds-pagination__item-link--active" title="Current page" aria-label="Page 32" aria-current="page">
          32
        </span>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" title="Go to page 33" aria-label="Page 33">
          33
        </a>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" title="Go to page 34" aria-label="Page 34">
          34
        </a>
      </li>
      <li>
        <span class="hds-pagination__item-ellipsis">
          ...
        </span>
      </li>
      <li>
        <a class="hds-pagination__item-link" href="#" aria-label="Page 68" title="Go to page 68">
          68
        </a>
      </li>
    </ul>
    <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black hds-pagination__button-next">
      <span class="hds-button__label">Next</span>
      <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
    </button>
  </nav>
</div>
`;

WithTruncation.storyName = 'With truncation';

export const CustomActivePageColor = () => `
  <style>
    .custom-active-page-background-color {
      --active-page-background-color: var(--color-bus);
    }
  </style>
<div class="hds-pagination-container">
  <nav class="hds-pagination custom-active-page-background-color" role="navigation" aria-label="Pagination" data-next="Next">
      <button type="button" disabled class="hds-button hds-button--supplementary hds-button--theme-black hds-pagination__button-prev">
        <span aria-hidden="true" class="hds-icon hds-icon--angle-left"></span>
        <span class="hds-button__label">Previous</span>
      </button>
      <ul class="hds-pagination__pages">
        <li>
          <span class="hds-pagination__item-link hds-pagination__item-link--active" title="Current page" aria-label="Page 1" aria-current="page">
            1
          </span>
        </li>
        <li>
          <a class="hds-pagination__item-link" href="#" aria-label="Page 2" title="Go to page 2">
            2
          </a>
        </li>
        <li>
          <a class="hds-pagination__item-link" href="#"  aria-label="Page 3" title="Go to page 3">
            3
          </a>
        </li>
        <li>
          <a class="hds-pagination__item-link" href="#" aria-label="Page 4" title="Go to page 4">
            4
          </a>
        </li>
        <li>
          <a class="hds-pagination__item-link" href="#" aria-label="Page 5" title="Go to page 5">
            5
          </a>
        </li>
        <li>
          <a class="hds-pagination__item-link" href="#" aria-label="Page 6" title="Go to page 6">
            6
          </a>
        </li>
        <li>
          <a class="hds-pagination__item-link" href="#" aria-label="Page 7" title="Go to page 7">
            7
          </a>
        </li>
        <li>
          <a class="hds-pagination__item-link" href="#" aria-label="Page 8" title="Go to page 8">
            8
          </a>
        </li>
        <li>
          <a class="hds-pagination__item-link" href="#" aria-label="Page 9" title="Go to page 9">
            9
          </a>
        </li>
      </ul>
      <div class="hds-pagination__item hds-pagination__next-button">
        <button type="button" class="hds-button hds-button--supplementary hds-button--theme-black hds-pagination__button-next">
          <span class="hds-button__label">Next</span>
          <span aria-hidden="true" class="hds-icon hds-icon--angle-right"></span>
        </button>
      </div>
  </nav>
</div>
`;

CustomActivePageColor.storyName = 'Custom active page color';

export const States = () => `
<p>Selected</p>
<nav class="hds-pagination" aria-label="Pagination 1">
  <ul class="hds-pagination__pages">
    <li>
      <span class="hds-pagination__item-link hds-pagination__item-link--active" title="Current page" aria-label="Page 1">
        1
      </span>
    </li>
  </ul>
</nav>
<p>Unselected</p>
<nav class="hds-pagination" aria-label="Pagination 2">
  <ul class="hds-pagination__pages">
    <li>
      <a class="hds-pagination__item-link" href="#" title="Current page" aria-label="Page 2">
        2
      </a>
    </li>
  </ul>
</nav>
`;
