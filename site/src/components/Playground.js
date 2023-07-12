import React, { isValidElement, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useMDXScope } from 'gatsby-plugin-mdx/context';
import { LiveProvider, LiveEditor, LiveError, LivePreview, withLive } from 'react-live';
import sanitizeHtml from 'sanitize-html';
import { Notification, Tabs, TabList, TabPanel, Tab, Button, IconArrowUndo } from 'hds-react';
import theme from 'prism-react-renderer/themes/github';

import './Playground.scss';
import LiveErrorCore from './LiveErrorCore';

const sanitizeConfig = {
  allowedTags: false,
  disallowedTagsMode: 'discard',
  allowedAttributes: {
    '*': [
      'aria-describedby',
      'aria-hidden',
      'aria-label',
      'aria-labelledby',
      'aria-level',
      'class',
      'checked',
      'd',
      'data-*',
      'disabled',
      'fill',
      'for',
      'height',
      'href',
      'id',
      'name',
      'onclick',
      'patternUnits',
      'patternunits',
      'placeholder',
      'points',
      'rel',
      'required',
      'role',
      'scope',
      'span',
      'style',
      'tabIndex',
      'target',
      'transform',
      'type',
      'value',
      'width',
      'x',
      'xmlns',
      'y',
    ],
    a: ['href', 'name', 'target'],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
  },
  selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
  allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel'],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
  allowProtocolRelative: true,
  enforceHtmlBoundary: false,
};

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

function transformCode(code) {
  const importsIgnored = code.replace(/import\s*{\s*(\S+)(\s*,\s*\S+)*\s*}\s*from\s*'([^\s;]+)';?/g, '');
  const renderAdded = `render(${importsIgnored})`;
  return renderAdded;
}

const HtmlLivePreview = ({ code }) => {
  const sanitizedHtml = () => ({
    __html: sanitizeHtml(code, sanitizeConfig),
  });

  return <PlaygroundPreviewComponent dangerouslySetInnerHTML={sanitizedHtml()} />;
};

const Editor = ({ onChange, initialCode, code, language }) => {
  const viewPortRef = useRef();
  const copyButtonRef = useRef();
  const [resetCount, setResetCount] = useState(0);
  const copySuccessState = 'COPY_SUCCESS';
  const copyErrorState = 'COPY_ERROR';
  const [copyState, setCopyState] = useState('');
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

  const copy = async () => {
    if (viewPortRef.current && copyButtonRef.current) {
      const textArea = getTextArea(viewPortRef.current);
      setCopyState('');
      try {
        await navigator.clipboard.writeText(textArea.value);
        setCopyState(copySuccessState);
      } catch (err) {
        setCopyState(copyErrorState);
        console.warn(`Copy failed: ${err}`);
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
        {copyState === copySuccessState && (
          <Notification
            type="success"
            label="Code copied"
            position="bottom-right"
            autoClose
            displayAutoCloseProgress={false}
            onClose={() => setCopyState('')}
          >
            Example code was copied to clipboard.
          </Notification>
        )}
        {copyState === copyErrorState && (
          <Notification
            type="error"
            label="Copy failed"
            position="bottom-right"
            displayAutoCloseProgress={false}
            dismissible
            closeButtonLabelText="Close toast"
            onClose={() => {
              setCopyState('');
              if (copyButtonRef.current) {
                copyButtonRef.current.focus();
              }
            }}
          >
            Try again or copy the code using the clipboard.
          </Notification>
        )}
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
      {language === 'jsx' && <LiveError />}
      {language !== 'jsx' && <LiveErrorCore code={code} />}
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

  const childrenArray = Array.isArray(props.children) ? props.children : [props.children];

  const codeBlocks = childrenArray
    .filter((child) => isValidElement(child))
    .map(({ props }) => {
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
  const blockContentClassName = props.noPreview ? "playground-block-content no-preview" : "playground-block-content"
 
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
              <LiveProvider
                code={sanitizedCode}
                transformCode={(code) => `${transformCode(code)}`}
                scope={scopeComponents}
                language={language}
                noInline={true}>
                <div className={blockContentClassName}>
                {!props.noPreview && <PreviewComponent />}
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
  noPreview: PropTypes.bool
};
