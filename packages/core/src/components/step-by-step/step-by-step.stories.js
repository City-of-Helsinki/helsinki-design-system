import './step-by-step.css';

export default {
  title: 'Components/Step By Step',
};

export const NumberedStepByStep = () => `
  <div class="hds-step-by-step__container">
    <header>
      <h2>Numbered step by step component</h2>
      <p>Numbered component is suitable for case where the order of the steps is clear.</p>
    </header>
    <ol class="hds-step-by-step__steps-container">
      <li class="hds-step-by-step__step-item">
        <p class="hds-step-by-step__step-item__title">Step title</p>
        <div>
          <p>Here you can describe the step in detail. Keep the text compact so the user gets the big picture of the whole process and it's steps easily.</p>
          <p><button type="button" class="hds-button hds-button--primary"><span class="hds-button__label">Example button</span></button></p>
          <p><a href="#" class="hds-link hds-link--medium">Example link</a></p>
        </div>
      </li>
      <li class="hds-step-by-step__step-item">
        <p class="hds-step-by-step__step-item__title">Step title</p>
        <div>
          <p>You can put text here.</p>
        </div>
      </li>
    </ol>
  </div>
`;

export const RegularStepByStep = () => `
  <div class="hds-step-by-step__container">
    <header>
      <h2>Unnumbered step by step component</h2>
      <p>Unnumbered component is suitable for cases where the order of the steps is less important and they form more of a guideline.</p>
    </header>
    <ul class="hds-step-by-step__steps-container">
      <li class="hds-step-by-step__step-item">
        <p class="hds-step-by-step__step-item__title">Step title</p>
        <div>
          <p>Here you can describe what's going on in the step for the user. Keep the text compact so the user gets the big picture of the whole process and it's steps easily..</p>
          <p><button type="button" class="hds-button hds-button--primary"><span class="hds-button__label">Example button</span></button></p>
          <p><a href="#" class="hds-link hds-link--medium">Example link</a></p>
        </div>
      </li>
      <li class="hds-step-by-step__step-item">
        <p class="hds-step-by-step__step-item__title">Step title</p>
        <div>
          <p>You can put text here.</p>
        </div>
      </li>
    </ul>
  </div>
`;

export const RegularStepByStepWithoutHeader = () => `
  <div class="hds-step-by-step__container">
    <ul class="hds-step-by-step__steps-container">
      <li class="hds-step-by-step__step-item">
        <p class="hds-step-by-step__step-item__title">Step title</p>
        <div>
          <p>Here you can describe what's going on in the step for the user. Keep the text compact so the user gets the big picture of the whole process and it's steps easily..</p>
          <p><button type="button" class="hds-button hds-button--primary"><span class="hds-button__label">Example button</span></button></p>
          <p><a href="#" class="hds-link hds-link--medium">Example link</a></p>
        </div>
      </li>
      <li class="hds-step-by-step__step-item">
        <p class="hds-step-by-step__step-item__title">Step title</p>
        <div>
          <p>You can put text here..</p>
        </div>
      </li>
    </ul>
  </div>
`;
