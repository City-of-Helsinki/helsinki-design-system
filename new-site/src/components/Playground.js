import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useMDXScope } from 'gatsby-plugin-mdx/context';
import { LiveProvider, LiveEditor, LiveError, LivePreview, withLive } from 'react-live';
import sanitizeHtml from 'sanitize-html';
import { Tabs, TabList, TabPanel, Tab, Button, IconArrowUndo } from 'hds-react';
import theme from 'prism-react-renderer/themes/github';

import './Playground.scss';
import LiveErrorCore from './LiveErrorCore';

const Playground = ({ children }) => {
  if (children) {
    return <pre>{children}</pre>;
  }

  return null;
};

Playground.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Playground;

const playgroundPreviewClassName = 'playground-block-preview';

const PlaygroundPreviewComponent = ({ children, className, ...props }) => (
  <div {...props} className={`${playgroundPreviewClassName} ${className ?? ''}`}>
    {children}
  </div>
);

export const PlaygroundPreview = ({ ...props }) => (
  <PlaygroundPreviewComponent className="playground-block-preview-light" {...props} />
);

const clearSelection = () => {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
};

const isJsx = (language) => language === 'jsx';

const sanitize = (code) => {
  const trimmedCode = code.trim();
  return trimmedCode.startsWith('{') && trimmedCode.endsWith('}')
    ? trimmedCode.substr(1, trimmedCode.length - 2).trim()
    : trimmedCode;
};

const HtmlLivePreview = ({ code }) => {
  const sanitizedHtml = () => ({
    __html: sanitizeHtml(code),
  });

  return <PlaygroundPreviewComponent dangerouslySetInnerHTML={sanitizedHtml()} />;
};

const Editor = ({ onChange, initialCode, code, language }) => {
  const viewPortRef = useRef();
  const copyButtonRef = useRef();
  const [resetCount, setResetCount] = useState(0);
  const textAreaId = `code-block-textarea-${language}-${resetCount}`;
  const helperTextId = `code-block-helper-${language}-${resetCount}`;
  const getTextArea = useCallback((el) => el.querySelector(`#${textAreaId}`), [textAreaId]);

  const onFocusKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter' && viewPortRef.current && event.target === viewPortRef.current) {
        event.preventDefault();
        const textArea = getTextArea(viewPortRef.current);
        textArea.focus();
      }
    },
    [getTextArea],
  );

  const copy = () => {
    if (viewPortRef.current && copyButtonRef.current) {
      const textArea = getTextArea(viewPortRef.current);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        if (copyButtonRef.current) {
          copyButtonRef.current.focus();
        }
      } catch (err) {
        console.warn('Oops, unable to copy');
      }
      clearSelection();
    }
  };

  const reset = () => {
    onChange(initialCode);
    setResetCount(resetCount + 1);
    if (viewPortRef.current) {
      viewPortRef.current.focus();
    }
  };

  useEffect(() => {
    if (viewPortRef.current) {
      const textArea = getTextArea(viewPortRef.current);
      textArea.setAttribute('aria-describedby', helperTextId);
      textArea.setAttribute('tabIndex', '-1');
      textArea.addEventListener('blur', (e) => {
        // Set viewport focus on textarea Esc keypress (no related target)
        if (viewPortRef.current && !e.relatedTarget) {
          viewPortRef.current.focus();
        }
      });
    }
  }, [getTextArea, helperTextId]);

  return (
    <>
      <div className="playground-block-editor">
        <div // eslint-disable-line jsx-a11y/no-static-element-interactions
          className="playground-block-editor-viewport"
          tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
          onKeyDown={onFocusKeyDown}
          ref={viewPortRef}
        >
          <div className="playground-block-editor-code">
            <div className="playground-block-editor-texts">
              <label className="playground-block-editor-label" htmlFor={textAreaId}>
                Editable code example
              </label>
              <span className="playground-block-editor-helper" id={helperTextId}>
                Press Enter to start editing. Press Esc to stop editing.
              </span>
            </div>
            <div className="playground-block-editor-scrollbox" tabIndex={-1}>
              <LiveEditor
                key={resetCount}
                onChange={onChange}
                className="playground-block-editor-code-input"
                textareaId={textAreaId}
                theme={theme}
                language={language}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="playground-block-buttons">
        <Button ref={copyButtonRef} variant="secondary" size="small" onClick={copy}>
          Copy code
        </Button>
        <Button
          variant="secondary"
          iconLeft={<IconArrowUndo aria-hidden />}
          size="small"
          disabled={initialCode === code}
          onClick={reset}
        >
          Reset example
        </Button>
      </div>
      {language === 'jsx' &&
        <LiveError />
      }
      {language !== 'jsx' &&
        <LiveErrorCore code={code} />
      }

    </>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialCode: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

const EditorWithLive = withLive(Editor);

export const PlaygroundBlock = (props) => {
  const scopeComponents = useMDXScope();
  const codeBlocks = React.Children.toArray(props.children).map(({ props }) => {
    const childrenProps = props.children.props;
    return {
      code: childrenProps.children,
      language: childrenProps.className && childrenProps.className.split('-')[1],
    };
  });
  const codeByLanguage = codeBlocks.reduce((acc, block) => {
    acc[block.language] = block.code;
    return acc;
  }, {});
  const [codeByLanguageState, setCodeByLanguageState] = useState(codeByLanguage);
  const setCodeByLanguage = (language) => (code) => {
    setCodeByLanguageState({ ...codeByLanguageState, [language]: code });
  };

  return (
    <div className="playground-block">
      <Tabs>
        <TabList className="playground-block-tabs">
          {codeBlocks.map(({ language }) => (
            <Tab key={language}>{isJsx(language) ? 'React' : 'Core'}</Tab>
          ))}
        </TabList>
        {codeBlocks.map(({ code, language }) => {
          const sanitizedCode = sanitize(codeByLanguageState[language]);
          const PreviewComponent = () =>
            isJsx(language) ? (
              <LivePreview className={playgroundPreviewClassName} />
            ) : (
              <HtmlLivePreview code={sanitizedCode} />
            );

          return (
            <TabPanel key={language}>
              <LiveProvider code={sanitizedCode} scope={scopeComponents} language={language}>
                <div className="playground-block-content">
                  <PreviewComponent />
                  <EditorWithLive
                    initialCode={sanitize(code)}
                    language={language}
                    onChange={setCodeByLanguage(language)}
                    code={codeByLanguageState[language]}
                  />
                </div>
              </LiveProvider>
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
};

const CodeBlockShape = PropTypes.shape({
  props: PropTypes.shape({
    children: PropTypes.shape({
      props: PropTypes.shape({
        children: PropTypes.string.isRequired,
        className: PropTypes.string.isRequired,
      }),
    }),
  }),
});

PlaygroundBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(CodeBlockShape),
    PropTypes.objectOf(CodeBlockShape),
    PropTypes.node,
  ]),
};
