import React, { useCallback, useEffect, useRef, useState } from 'react';
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

const sanitize = (code) => {
  const trimmedCode = code.trim();
  return trimmedCode.startsWith('{') && trimmedCode.endsWith('}')
    ? trimmedCode.substr(1, trimmedCode.length - 2).trim()
    : trimmedCode;
};

const HtmlLivePreview = ({ libPackage, code }) => {
  const sanitizedHtml = () => ({
    __html: sanitizeHtml(code, sanitizeConfig),
  });

  return <PlaygroundPreviewComponent key={libPackage} dangerouslySetInnerHTML={sanitizedHtml()} />;
};

const Editor = ({ onChange, initialCode, libPackage, code, language }) => {
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
      <div className="playground-block-editor" key={libPackage}>
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

const jsxLangaugeKey = 'jsx';
const htmlLangaugeKey = 'html';

const getLanguage = (className) => {
  if (className.includes('web-components')) {
    return htmlLangaugeKey;
  } else if (className.includes('html')) {
    return htmlLangaugeKey;
  }
  return jsxLangaugeKey;
};

const ReactPackage = 'React';
const CorePackage = 'Core';
const WebComponentsPackage = 'WebComponents';

const getPackage = (className) => {
  if (className.includes('web-components')) {
    return WebComponentsPackage;
  } else if (className.includes('html')) {
    return CorePackage;
  }
  return ReactPackage;
};

export const PlaygroundBlock = (props) => {
  const scopeComponents = useMDXScope();
  const codeBlocks = React.Children.toArray(props.children).map(({ props }) => {
    const childrenProps = props.children.props;
    return {
      code: childrenProps.children,
      language: getLanguage(childrenProps.className),
      libPackage: getPackage(childrenProps.className),
    };
  });
  const codeByPackage = codeBlocks.reduce((acc, block) => {
    acc[block.libPackage] = block.code;
    return acc;
  }, {});
  const [codeByPackageState, setCodeByPackageState] = useState(codeByPackage);
  const setCodeByPackage = (libPackage) => (code) => {
    setCodeByPackageState({ ...codeByPackageState, [libPackage]: code });
  };

  return (
    <div className="playground-block">
      <Tabs>
        <TabList className="playground-block-tabs">
          {codeBlocks.map(({ libPackage }) => (
            <Tab key={libPackage}>{libPackage}</Tab>
          ))}
        </TabList>
        {codeBlocks.map(({ code, language, libPackage }) => {
          const sanitizedCode = sanitize(codeByPackage[libPackage]);

          return (
            <TabPanel key={libPackage}>
              <LiveProvider code={sanitizedCode} scope={scopeComponents} language={language}>
                <div className="playground-block-content">
                  {libPackage === ReactPackage ? (
                    <LivePreview className={playgroundPreviewClassName} />
                  ) : (
                    <HtmlLivePreview libPackage={libPackage} code={sanitizedCode} />
                  )}
                  <EditorWithLive
                    libPackage={libPackage}
                    initialCode={sanitize(code)}
                    language={language}
                    onChange={setCodeByPackage(libPackage)}
                    code={codeByPackageState[libPackage]}
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
