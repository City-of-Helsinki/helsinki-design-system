import React, { useState, useEffect } from 'react';
import { StaticConfigLoader, HtmlValidate } from 'html-validate/dist/cjs/browser';
import { default as html5 } from 'html-validate/elements/html5.json';

import './LiveErrorCore.scss';

// https://stackoverflow.com/a/65896524
const testRegexpLookAheadLookBehind = () => {
  try {
    return (
      'foobarfoofoo'
        .replace(new RegExp('(?<=foo)foo', 'g'), 'ahead')
        .replace(new RegExp('foo(?!bar)', 'g'), 'behind') === 'foobarbehindahead'
    );
  } catch (error) {
    return false;
  }
};

const getValidator = () => {
  const loader = new StaticConfigLoader({
    extends: ['html-validate:standard'],
    elements: [html5],
  });
  return new HtmlValidate(loader);
};

/*
 Html-validate library uses regexp lookbehind feature which is not supported in Safari at the moment (17.5.2022).
 We need to disable validation in browsers which do not support lookbehind.
 - https://caniuse.com/js-regexp-lookbehind
 - https://gitlab.com/html-validate/html-validate/-/issues/147
 */

const htmlValidate = testRegexpLookAheadLookBehind() ? getValidator() : undefined;
const isValidatorSupported = !!htmlValidate;

const LiveErrorCore = ({ code }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isValidatorSupported) {
      const report = htmlValidate.validateString(code);
      if (report.valid) {
        setError(null);
      } else {
        setError(report.results[0].messages[0]);
      }
    }
  }, [code]);

  if (!isValidatorSupported) {
    return null;
  }
  if (!error) {
    return null;
  }
  return <pre className="live-error-core">SyntaxError: {`${error.message} (${error.line}:${error.column})`}</pre>;
};

export default LiveErrorCore;
