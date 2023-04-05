import './step-by-step.css';

export default {
  title: 'Components/Step By Step',
};

export const NumberedStepByStep = () => `
  <div class="hds-step-by-step__container">
    <header>
      <h2>Numeroitu vaiheistuskomponentti</h2>
      <p>Numeroitu prosessi soveltuu hyvin tapauksiin, joissa vaiheiden järjestys on selkeä.</p>
    </header>
    <ol class="hds-step-by-step__steps-container">
      <li class="hds-step-by-step__step-item">
        <p class="hds-step-by-step__step-item__title">Vaiheen otsikko</p>
        <div>
          <p>Tähän voit lisätä tekstiä, joka kertoo käyttäjälle mitä kyseisessä vaiheessa tapahtuu. Pidä teksti tiiviinä, jotta käyttäjä saa kokonaiskuvan prosessista ja sen vaiheista helposti silmäilemällä.</p>
          <p><button type="button" class="hds-button hds-button--primary"><span class="hds-button__label">Esimerkki painikkeesta</span></button></p>
          <p><a href="#" class="hds-link hds-link--medium">Esimerkki lisätietolinkistä</a></p>
        </div>
      </li>
      <li class="hds-step-by-step__step-item">
        <p class="hds-step-by-step__step-item__title">Vaiheen otsikko</p>
        <div>
          <p>Tähän voit lisätä tekstiä.</p>
        </div>
      </li>
    </ol>
  </div>
`;

export const RegularStepByStep = () => `
  <div class="hds-step-by-step__container">
    <header>
      <h2>Numeroimaton vaiheistuskomponentti</h2>
      <p>Voit käyttää numeroimatonta prosessia silloin, kun vaiheiden järjestys on enemmän ohjeellinen.</p>
    </header>
    <ul class="hds-step-by-step__steps-container">
      <li class="hds-step-by-step__step-item">
        <p class="hds-step-by-step__step-item__title">Vaiheen otsikko</p>
        <div>
          <p>Tähän voit lisätä tekstiä, joka kertoo käyttäjälle mitä kyseisessä vaiheessa tapahtuu. Pidä teksti tiiviinä, jotta käyttäjä saa kokonaiskuvan prosessista ja sen vaiheista helposti silmäilemällä.</p>
          <p><button type="button" class="hds-button hds-button--primary"><span class="hds-button__label">Esimerkki painikkeesta</span></button></p>
          <p><a href="#" class="hds-link hds-link--medium">Esimerkki lisätietolinkistä</a></p>
        </div>
      </li>
      <li class="hds-step-by-step__step-item">
        <p class="hds-step-by-step__step-item__title">Vaiheen otsikko</p>
        <div>
          <p>Tähän voit lisätä tekstiä.</p>
        </div>
      </li>
    </ul>
  </div>
`;

export const RegularStepByStepWithoutHeader = () => `
  <div class="hds-step-by-step__container">
    <ul class="hds-step-by-step__steps-container">
      <li class="hds-step-by-step__step-item">
        <p class="hds-step-by-step__step-item__title">Vaiheen otsikko</p>
        <div>
          <p>Tähän voit lisätä tekstiä, joka kertoo käyttäjälle mitä kyseisessä vaiheessa tapahtuu. Pidä teksti tiiviinä, jotta käyttäjä saa kokonaiskuvan prosessista ja sen vaiheista helposti silmäilemällä.</p>
          <p><button type="button" class="hds-button hds-button--primary"><span class="hds-button__label">Esimerkki painikkeesta</span></button></p>
          <p><a href="#" class="hds-link hds-link--medium">Esimerkki lisätietolinkistä</a></p>
        </div>
      </li>
      <li class="hds-step-by-step__step-item">
        <p class="hds-step-by-step__step-item__title">Vaiheen otsikko</p>
        <div>
          <p>Tähän voit lisätä tekstiä.</p>
        </div>
      </li>
    </ul>
  </div>
`;
