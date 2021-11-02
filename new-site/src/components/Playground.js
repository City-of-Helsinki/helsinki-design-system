import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, LiveError, LivePreview, withLive } from 'react-live';
import * as Hds from 'hds-react';
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

const copy = (textarea) => {
  textarea.focus();
  textarea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.warn('Oops, unable to copy');
  }
  clearSelection();
};

const Editor = ({ onChange, hasChanged, languageClass, reset }) => {
  const editorRef = React.useRef();
  const textAreaId = `code-block-textarea-${languageClass}`;
  const helperTextId = `code-block-helper-${languageClass}`;
  const getTextArea = useCallback((el) => el.querySelector(`#${textAreaId}`), [textAreaId]);

  useEffect(() => {
    if (editorRef.current) {
      const textArea = getTextArea(editorRef.current);
      textArea.setAttribute('aria-describedby', helperTextId);
    }
  }, [getTextArea, helperTextId]);

  return (
    <>
      <div className="playground-block-editor">
        <div className="playground-block-editor-viewport">
          <div ref={editorRef} className="playground-block-editor-code">
            <div className="playground-block-editor-texts">
              <label className="playground-block-editor-label" htmlFor={textAreaId}>
                Editable code example
              </label>
              <span className="playground-block-editor-helper" id={helperTextId}>
                Press Enter to start editing. Press Esc to stop editing.
              </span>
            </div>
            <LiveEditor
              onChange={onChange}
              style={{ background: 'none', padding: '0', overflow: 'visible', whiteSpace: 'nowrap' }}
              textareaId={textAreaId}
              theme={theme}
            />
          </div>
        </div>
      </div>
      <div className="playground-block-buttons">
        <Hds.Button
          variant="secondary"
          size="small"
          onClick={() => {
            if (editorRef.current) {
              const textArea = getTextArea(editorRef.current);
              copy(textArea);
            }
          }}
        >
          Copy code
        </Hds.Button>
        <Hds.Button
          variant="secondary"
          iconLeft={<Hds.IconArrowUndo aria-hidden />}
          size="small"
          disabled={!hasChanged}
          onClick={() => {
            reset();
          }}
        >
          Reset example
        </Hds.Button>
      </div>
      <LiveError />
    </>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  hasChanged: PropTypes.bool.isRequired,
  languageClass: PropTypes.string.isRequired,
};

const EditorWithLive = withLive(Editor);

const CodeBlock = ({ codeBlock }) => {
  const initialCode = codeBlock.code;
  const [code, setCode] = useState(initialCode);

  return (
    <LiveProvider code={code} scope={{ ...Hds }}>
      <div className="playground-block-content">
        <LivePreview className="playground-block-preview" />
        <EditorWithLive
          onChange={setCode}
          reset={() => setCode(initialCode)}
          hasChanged={code !== initialCode}
          languageClass={codeBlock.languageClass}
        />
      </div>
    </LiveProvider>
  );
};

export const PlaygroundBlock = ({ codeBlocks }) => {
  return (
    <div className="playground-block">
      <Hds.Tabs>
        <Hds.TabList className="playground-block-tabs">
          {codeBlocks.map((codeBlock) => (
            <Hds.Tab key={codeBlock.languageClass}>
              {codeBlock.languageClass === 'language-jsx' ? 'React' : 'Core'}
            </Hds.Tab>
          ))}
        </Hds.TabList>
        {codeBlocks.map((codeBlock) => (
          <Hds.TabPanel key={codeBlock.languageClass}>
            <CodeBlock codeBlock={codeBlock} />
          </Hds.TabPanel>
        ))}
      </Hds.Tabs>
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
