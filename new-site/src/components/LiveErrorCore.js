import React, { useState, useEffect } from 'react';
import { default as html5 } from 'html-validate/elements/html5.json';

import './LiveErrorCore.scss';

// https://stackoverflow.com/a/65896524
const supportsRegexpLookBehind = () => {
  try {
    return 'foobarfoofoo'.replace(new RegExp('(?<=foo)foo', 'g'), 'behind') === 'foobarfoobehind';
  } catch (error) {
    return false;
  }
};

const LiveErrorCore = ({ code }) => {
  const [error, setError] = useState(null);
  const [htmlValidate, setHtmlValidate] = useState(undefined);

  /*
    TODO: Remove lookbehind support test and async import once Safari supports regexp lookbehind.
    Html-validate library uses regexp lookbehind feature which is not supported in Safari at the moment (17.5.2022).
    We need to disable validation in browsers that do not support lookbehind.
    - https://caniuse.com/js-regexp-lookbehind
    - https://gitlab.com/html-validate/html-validate/-/issues/147
 */
  useEffect(() => {
    if (supportsRegexpLookBehind()) {
      import('html-validate/dist/cjs/browser').then(({ StaticConfigLoader, HtmlValidate }) => {
        const loader = new StaticConfigLoader({
          extends: ['html-validate:standard'],
          elements: [html5],
        });
        setHtmlValidate(new HtmlValidate(loader));
      });
    }
  }, []);

  useEffect(() => {
    if (htmlValidate) {
      const report = htmlValidate.validateString(code);
      if (report.valid) {
        setError(null);
      } else {
        setError(report.results[0].messages[0]);
      }
    }
  }, [code]);

  if (!htmlValidate) {
    return null;
  }
  if (!error) {
    return null;
  }
  return <pre className="live-error-core">SyntaxError: {`${error.message} (${error.line}:${error.column})`}</pre>;
};

export default LiveErrorCore;
