import './cookie-consent.css';

export default {
  title: 'Components/Cookie consent'
};

export const Default = () => `
  <div class="hds-cookie-consent__container" id="hds-cookie-consent">
    <div class="hds-cookie-consent__aligner">
      <div class="hds-cookie-consent__content" tabindex="-1">
        <div class="hds-cookie-consent__main-content">
          <h2>This website uses cookies</h2>
          <p class="visually-hidden-without-focus">This website uses required cookies to ensure the basic functionality and performance. In addition, we use targeting cookies to improve the user experience, perform analytics and display personalised content.</p>
          <button type="button" class="hds-cookie-consent__read-more-button">
            <span>Read more</span>
            <span class="hds-icon hds-icon--angle-up hds-icon--size-s" aria-hidden="true"></span>
          </button>
        </div>
        <button type="button" class="hds-cookie-consent__details-accordion-button hds-cookie-consent__accordion-button hds-cookie-consent__hidden-without-focus">
          <span class="hds-icon hds-icon--angle-down hds-icon--size-s" aria-hidden="true"></span>
          <span>Show cookie settings</span>
        </button>

        <!-- form  -->
        <form id="hds-cookie-consent__form" action="">
          <div class="hds-cookie-consent__details hds-cookie-consent__text-content">
            <h3>About the cookies used on the website</h3>
            <p>The cookies used on the website have been classified according to their intended use. Below, you can read about the various categories and accept or reject the use of cookies.</p>

            <!-- TODO: add example how to loop cookie categories and groups -->
            <!-- consent category -->
            <div class="hds-cookie-consent__category">
              <div class="hds-cookie-consent__title-with-checkbox">
                <div class="hds-checkbox">
                  <input type="checkbox" id="checkbox-category" class="hds-checkbox__input" />
                  <label for="checkbox-category" class="hds-checkbox__label">Necessary cookies</label>
                </div>
              </div>
              <p aria-hidden>Necessary cookies cannot be rejected. They enable the proper functioning of the website and affect the usability.</p>
              <div class="visually-hidden">Necessary cookies cannot be rejected. They enable the proper functioning of the website and affect the usability.</div>
              <ul class="hds-cookie-consent__list">
                <li>

                  <!-- consent group -->
                  <div class="hds-cookie-consent__consent-group">
                    <div class="hds-cookie-consent__title-with-checkbox">
                      <div class="hds-checkbox">
                        <input type="checkbox" id="checkbox-group" class="hds-checkbox__input" />
                        <label for="checkbox-group" class="hds-checkbox__label">Cookies related to basic functionalities</label>
                      </div>
                    </div>
                    <div class="hds-cookie-consent__consent-group-content">
                      <p aria-hidden>Cookies related to basic functionalities cannot be rejected. They enable the proper functioning of the website and affect the usability.</p>
                      <div class="visually-hidden">Cookies related to basic functionalities cannot be rejected. They enable the proper functioning of the website and affect the usability.</div>
                      <button type="button" class="hds-cookie-consent__accordion-button" aria-label="Show cookie information related to basic functionalities">
                        <span class="hds-icon hds-icon--angle-down hds-icon--size-s" aria-hidden="true"></span>
                      </button>

                      <!-- table -->
                      <div class="hds-table-container" tabindex="0" role="region" aria-label="Cookies related to basic functionalities">
                        <table class="hds-table hds-table--dark">
                          <thead>
                            <tr class="hds-table__header-row">
                              <th scope="col">Name</th>
                              <th scope="col">Cookie set by</th>
                              <th scope="col">Purpose of use</th>
                              <th scope="col">Period of validity</th>
                            </tr>
                          </thead>
                          <tbody class="hds-table__content">
                            <tr>
                              <td>SSESS*</td>
                              <td>hel.fi</td>
                              <td>A cookie related to the operation of the content management system.</td>
                              <td>23 days</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </li>
              </ul>
            </div>
          </div>

          <div class="hds-cookie-consent__buttons">
            <button type="submit" class="hds-button hds-button--secondary">
              <span class="hds-button__label">Accept selected cookies</span>
            </button>
            <button type="submit" class="hds-button hds-button--secondary">
              <span class="hds-button__label">Accept required cookies only</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
`;



