import './breadcrumb.css';
import '../link/link.css';
import '../../icons/ui/icon-angle-right.css';
import '../../icons/ui/icon-angle-left.css';

export default {
  title: 'Components/Breadcrumb',
};

export const Breadcrumb = () => `
  <nav aria-label="Murupolku" class="hds-breadcrumb">
    <ol class="hds-breadcrumb__list hds-breadcrumb__list--desktop">
      <li class="hds-breadcrumb__list-item">
        <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/">Helsinki</a>
        <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>
      </li>
      <li class="hds-breadcrumb__list-item">
        <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/nuoret">Nuorten Helsinki</a>
        <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>
      </li>
      <li class="hds-breadcrumb__list-item">
        <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/nuoret/hyvinvointi">Hyvinvointi ja mielenterveysneuvonta</a>
        <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>
        </li>
      <li class="hds-breadcrumb__list-item">
        <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/nuoret/hyvinvointi/opiskelijat">Opiskelijan kehon- ja mielenhuolto-opas</a>
        <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>
        </li>
      <li class="hds-breadcrumb__list-item">
        <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/nuoret/hyvinvointi/opiskelijat/linkit">Kaikki Helsingin kaupungin tarpeelliset linkit</a>
        <span class="hds-icon hds-icon--angle-right hds-breadcrumb__separator" aria-hidden="true"></span>
        </li>
      <li class="hds-breadcrumb__list-item hds-breadcrumb__list-item--active">
        <span aria-current="true" class="Breadcrumb_active__02+NO">Tämänhetkisen sivun pitkä otsikko</span>
      </li>
    </ol>
    <div class="hds-breadcrumb__list hds-breadcrumb__list--mobile">
      <span class="hds-icon hds-icon--angle-left hds-breadcrumb__back-arrow" aria-hidden="true">
      </span>
      <a class="hds-link hds-link--medium hds-breadcrumb__link" href="/nuoret/hyvinvointi/opiskelijat/linkit">Kaikki Helsingin kaupungin tarpeelliset linkit</a>
    </div>
  </nav>
`;
