import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

import './SyntaxHighlighter.scss';

const SyntaxHighlighter = (props) => {
  const className = props.children.props.className;
  const matches = className.match(/language-(?<lang>.*)/);
  return (
    <Highlight
      code={props.children.props.children.trim()}
      theme={themes.github}
      language={matches && matches.groups && matches.groups.lang ? matches.groups.lang : ''}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} syntax-highlighter`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default SyntaxHighlighter;
