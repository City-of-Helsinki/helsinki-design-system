import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useMDXScope } from 'gatsby-plugin-mdx/context';
import { LiveProvider, LiveEditor, LiveError, LivePreview, withLive } from 'react-live';
import { Tabs, TabList, TabPanel, Tab, Button, IconArrowUndo } from 'hds-react';
import theme from 'prism-react-renderer/themes/github';

import './Playground.scss';

const Playground = ({ children }) => {
  const childrenAsArray = React.Children.toArray(children);
  if (children) {
    const child = React.Children.only(childrenAsArray[0]);

    // We need to use the first element as a base element to get the right kind of mdx-element for MDXProvider lookup in Layout.
    return React.cloneElement(child, {
      playground: true,
      children: childrenAsArray,
    });
  }

  return null;
};

Playground.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Playground;

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

const Editor = ({ onChange, initialCode, code, languageClass }) => {
  const viewPortRef = useRef();
  const copyButtonRef = useRef();
  const [resetCount, setResetCount] = useState(0);
  const textAreaId = `code-block-textarea-${languageClass}-${resetCount}`;
  const helperTextId = `code-block-helper-${languageClass}-${resetCount}`;
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

  const onTextAreaBlur = useCallback((e) => {
    // Set viewport focus on textarea Esc keypress (no related target)
    if (viewPortRef.current && !e.relatedTarget) {
      viewPortRef.current.focus();
    }
  }, []);

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
      textArea.addEventListener('blur', onTextAreaBlur);
    }
  }, [getTextArea, helperTextId, onTextAreaBlur]);

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
                style={{
                  background: 'none',
                  padding: '0',
                  overflow: 'visible',
                  whiteSpace: 'nowrap',
                  width: 'max-content',
                  minWidth: '100%',
                }}
                textareaId={textAreaId}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="playground-block-buttons">
        <Button ref={copyButtonRef} variant="secondary" size="small" tabIndex={0} onClick={copy}>
          Copy code
        </Button>
        <Button
          variant="secondary"
          iconLeft={<IconArrowUndo aria-hidden />}
          size="small"
          tabIndex={0}
          disabled={initialCode === code}
          onClick={reset}
        >
          Reset example
        </Button>
      </div>
      <LiveError />
    </>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialCode: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  languageClass: PropTypes.string.isRequired,
};

const EditorWithLive = withLive(Editor);

export const PlaygroundBlock = ({ codeBlocks }) => {
  const scopeComponents = useMDXScope();
  const codeByLanguage = codeBlocks.reduce((acc, block) => {
    acc[block.languageClass] = block.code;
    return acc;
  }, {});

  const [codeByLanguageState, setCodeByLanguageState] = useState(codeByLanguage);
  const setCodeByLanguage = (languageClass) => (code) => {
    setCodeByLanguageState({ ...codeByLanguageState, [languageClass]: code });
  };

  return (
    <div className="playground-block">
      <Tabs>
        <TabList className="playground-block-tabs">
          {codeBlocks.map((codeBlock) => (
            <Tab key={codeBlock.languageClass}>{codeBlock.languageClass === 'language-jsx' ? 'React' : 'Core'}</Tab>
          ))}
        </TabList>
        {codeBlocks.map(({ code, languageClass }) => (
          <TabPanel key={languageClass}>
            <LiveProvider code={sanitize(codeByLanguageState[languageClass])} scope={scopeComponents}>
              <div className="playground-block-content">
                <LivePreview className="playground-block-preview" />
                <EditorWithLive
                  initialCode={sanitize(code)}
                  languageClass={languageClass}
                  onChange={setCodeByLanguage(languageClass)}
                  code={codeByLanguageState[languageClass]}
                />
              </div>
            </LiveProvider>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

PlaygroundBlock.propTypes = {
  codeBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      languageClass: PropTypes.string.isRequired,
    }),
  ),
};
