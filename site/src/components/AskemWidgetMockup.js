import React, { useState } from 'react';

import { askemPluginCoreCss, askemPluginThemeCss } from './askemMockPluginStyles/injectedCss';

/**
 * DOM mock of Askem stages. Injects the same CSS the real plugin adds (core + theme), not HDS overrides.
 */
const AskemWidgetMockup = () => {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const showForm = selectedReaction !== null && !submitted;
  const showReactions = selectedReaction === null || submitted;
  const reactionsLocked = submitted;
  const pluginStage = selectedReaction === null ? 'stage-default' : 'stage-reacted';

  return (
    <>
      <style data-askem-mock="plugin-core" dangerouslySetInnerHTML={{ __html: askemPluginCoreCss }} />
      <style data-askem-mock="plugin-theme" dangerouslySetInnerHTML={{ __html: askemPluginThemeCss }} />
      <div className="askem askem-hds-overrides">
        <div className={`askem-plugin style-classic ${pluginStage}`}>
          {showReactions ? (
            <div className="askem-reactions askem-3">
              <div className="askem-header">
                <h2 className="askem-header-text" id="askem-header-text-mock">
                  Did you find what you were looking for on this page?
                </h2>
              </div>
              <fieldset
                className="askem-reactions-group"
                aria-labelledby="askem-header-text-mock"
              >
                <div
                  className={['askem-reaction', 'icon-check-mark', reactionsLocked && selectedReaction === 'yes' && 'selected']
                    .filter(Boolean)
                    .join(' ')}
                >
                  <button
                    type="button"
                    className="askem-reaction-button after-icons"
                    aria-label="Yes"
                    aria-pressed={reactionsLocked ? selectedReaction === 'yes' : undefined}
                    disabled={reactionsLocked}
                    tabIndex={reactionsLocked ? -1 : undefined}
                    onClick={() => setSelectedReaction('yes')}
                  >
                    <div className="askem-label">Yes</div>
                  </button>
                </div>
                <div
                  className={['askem-reaction', 'icon-ex-mark', reactionsLocked && selectedReaction === 'somewhat' && 'selected']
                    .filter(Boolean)
                    .join(' ')}
                >
                  <button
                    type="button"
                    className="askem-reaction-button after-icons"
                    aria-label="Only somewhat"
                    aria-pressed={reactionsLocked ? selectedReaction === 'somewhat' : undefined}
                    disabled={reactionsLocked}
                    tabIndex={reactionsLocked ? -1 : undefined}
                    onClick={() => setSelectedReaction('somewhat')}
                  >
                    <div className="askem-label">Only somewhat</div>
                  </button>
                </div>
                <div
                  className={['askem-reaction', 'icon-question-mark', reactionsLocked && selectedReaction === 'no' && 'selected']
                    .filter(Boolean)
                    .join(' ')}
                >
                  <button
                    type="button"
                    className="askem-reaction-button after-icons"
                    aria-label="No"
                    aria-pressed={reactionsLocked ? selectedReaction === 'no' : undefined}
                    disabled={reactionsLocked}
                    tabIndex={reactionsLocked ? -1 : undefined}
                    onClick={() => setSelectedReaction('no')}
                  >
                    <div className="askem-label">No</div>
                  </button>
                </div>
              </fieldset>
            </div>
          ) : null}
          {showForm ? (
            <div className="askem-inputs askem-highlight after-reaction active">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div>
                  <div className="askem-input">
                    <h3 className="askem-header askem-input-header" id="askem-input-header-mock">
                      What information were you looking for on the page? By answering, you help us develop the site.
                    </h3>
                    <div id="askem-disclaimer-mock" className="askem-input-disclaimer">
                      <p>
                        <strong>N.B. We do not answer feedback.</strong>{' '}
                        The feedback is processed anonymously. Please do not write your personal data or contact
                        information in the field. Feedback is used in the development of the website.
                      </p>
                    </div>
                    <textarea
                      id="askem-feedback-mock"
                      className="askem-input-field"
                      aria-labelledby="askem-input-header-mock"
                      aria-describedby="askem-disclaimer-mock"
                      name="askem-feedback-mock"
                      placeholder="Enter your feedback"
                      rows={5}
                    />
                  </div>
                  <button type="submit" className="askem-form-submit">
                    <span className="askem-form-submit-label">Send</span>
                  </button>
                </div>
              </form>
            </div>
          ) : null}
          {submitted ? (
            <span
              role="status"
              className="askem-input-sent after-reaction active"
              aria-live="polite"
            >
              Thank you for your feedback!
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AskemWidgetMockup;
