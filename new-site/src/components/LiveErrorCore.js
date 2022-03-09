import React, { useState, useEffect } from 'react';
import { StaticConfigLoader, HtmlValidate } from "html-validate/dist/cjs/browser";
import { default as html5 } from "html-validate/elements/html5.json";

import './LiveErrorCore.scss'

const loader = new StaticConfigLoader({
  extends: ["html-validate:standard"],
  elements: [html5],
});
const htmlvalidate = new HtmlValidate(loader);

const LiveErrorCore = ({code}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const report = htmlvalidate.validateString(code);
    if (!report.valid) {
      setError(report.results[0].messages[0]);
    } else {
      setError(null);
    }
  }, [code])

  if (!error) {
    return null;
  }
  return (
    <pre className="live-error-core">SyntaxError: {`${error.message} (${error.line}:${error.column})`}</pre>
  );
};

export default LiveErrorCore;
