import React, {
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useMDXComponents } from '@mdx-js/react';
import { LiveProvider, LiveError, LivePreview, Editor as LiveCodeEditor } from 'react-live';
import { themes } from 'prism-react-renderer';
import sanitizeHtml from 'sanitize-html';
import {
  Notification,
  Tabs,
  TabList,
  TabPanel,
  Tab,
  Button,
  IconArrowUndo,
  ButtonSize,
  ButtonVariant,
} from 'hds-react';
import './Playground.scss';
import LiveErrorCore from './LiveErrorCore';

const theme = themes.github;

/**
 * Stand-in for `import { Link } from 'gatsby'` in live examples. The real Gatsby Link uses
 * useLocation and crashes outside Gatsby's router (react-live previews are not under Router).
 */
function PlaygroundRouterLink({ to, href, children, onClick, ...rest }) {
  return (
    <a
      href={to ?? href ?? '#'}
      onClick={(event) => {
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Available in every react-live example (many MDX snippets use React.useState etc.). */
const playgroundBuiltinScope = {
  React,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
};

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
      'oninput',
      'onkeydown',
      'patternUnits',
      'patternunits',
      'placeholder',
      'points',
      'readonly',
      'rel',
      'required',
      'role',
      'scope',
      'span',
      'style',
      'tabindex',
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

const playgroundPreviewClassName = 'playground-block-preview';

const PlaygroundPreviewComponent = ({ children, className, clipped, ...props }) => {
  const classNames = `${playgroundPreviewClassName} ${className || ''}`;
  if (clipped) {
    return (
      <div {...props} className={classNames}>
        <div className="playground-clipped-view-area">{children}</div>
      </div>
    );
  }
  return (
    <div {...props} className={classNames}>
      {children}
    </div>
  );
};

export const PlaygroundPreview = ({ ...props }) => (
  <PlaygroundPreviewComponent className="playground-block-preview-light" {...props} />
);

const clearSelection = () => {
  globalThis.getSelection()?.removeAllRanges();
};

const isJsx = (language) => language === 'jsx';

const sanitize = (code) => {
  let trimmedCode = code.trim();
  trimmedCode = trimmedCode.startsWith('{') && trimmedCode.endsWith('}')
    ? trimmedCode.substr(1, trimmedCode.length - 2).trim()
    : trimmedCode;
  return trimmedCode.endsWith(';')
    ? trimmedCode.substr(0, trimmedCode.length - 1).trim()
    : trimmedCode;
};

function transformCode(code) {
  const importsIgnored = code.replace(/import\s*{\s*(\S+)(\s*,\s*\S+)*\s*}\s*from\s*'([^\s;]+)';?/g, '');
  const renderAdded = `render(${importsIgnored})`;
  return renderAdded;
}

const HtmlLivePreview = ({ code }) => (
  <PlaygroundPreviewComponent
    dangerouslySetInnerHTML={{ __html: sanitizeHtml(code, sanitizeConfig) }}
  />
);

const Editor = ({ onChange, initialCode, code, language }) => {
  const viewPortRef = useRef();
  const scrollboxRef = useRef();
  const copyButtonRef = useRef();
  const [resetCount, setResetCount] = useState(0);
  const copySuccessState = 'COPY_SUCCESS';
  const copyErrorState = 'COPY_ERROR';
  const [copyState, setCopyState] = useState('');
  const editorId = `code-block-editor-${language}-${resetCount}`;
  const editorHelperId = `code-block-helper-${language}-${resetCount}`;
  const getEditableElement = useCallback(
    (el) => el?.querySelector('.playground-block-editor-code-input pre'),
    [],
  );

  const onFocusKeyDown = useCallback(
    (event) => {
      if (viewPortRef.current && event.target === viewPortRef.current) {
        if (event.key === 'Enter') {
          event.preventDefault();
          getEditableElement(viewPortRef.current)?.focus();
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          if (scrollboxRef.current) {
            event.preventDefault();
            const scrollAmount = event.key === 'ArrowLeft' ? -40 : 40;
            scrollboxRef.current.scrollLeft += scrollAmount;
          }
        }
      }
    },
    [getEditableElement],
  );

  const copy = async () => {
    setCopyState('');
    try {
      await navigator.clipboard.writeText(code);
      setCopyState(copySuccessState);
    } catch (err) {
      setCopyState(copyErrorState);
      console.warn(`Copy failed: ${err}`);
    }
    clearSelection();
  };

  const reset = () => {
    onChange(initialCode);
    setResetCount(resetCount + 1);
    if (viewPortRef.current) {
      viewPortRef.current.focus();
    }
  };

  useEffect(() => {
    const viewport = viewPortRef.current;
    const editable = viewport ? getEditableElement(viewport) : null;
    if (!editable) {
      return undefined;
    }

    editable.setAttribute('id', editorId);
    editable.setAttribute('aria-describedby', editorHelperId);
    editable.setAttribute('tabIndex', '-1');

    const onBlur = (event) => {
      if (viewPortRef.current && !event.relatedTarget) {
        viewPortRef.current.focus();
      }
    };
    editable.addEventListener('blur', onBlur);
    return () => editable.removeEventListener('blur', onBlur);
  }, [getEditableElement, editorHelperId, editorId]);

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
              <label className="playground-block-editor-label" htmlFor={editorId}>
                Editable code example
              </label>
              <span className="playground-block-editor-helper" id={editorHelperId}>
                Press Enter to start editing. Press Esc to stop editing.
              </span>
            </div>
            <div className="playground-block-editor-scrollbox" tabIndex={-1} ref={scrollboxRef}>
              <LiveCodeEditor
                key={resetCount}
                onChange={onChange}
                code={code}
                className="playground-block-editor-code-input"
                theme={theme}
                language={language}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="playground-block-buttons">
        <Button ref={copyButtonRef} variant={ButtonVariant.Secondary} size={ButtonSize.Small} onClick={copy}>
          Copy code
        </Button>
        {copyState === copySuccessState && (
          <Notification
            type="success"
            label="Code copied"
            position="bottom-right"
            autoClose
            autoCloseDuration={4000}
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
          variant={ButtonVariant.Secondary}
          iconStart={<IconArrowUndo />}
          size={ButtonSize.Small}
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

/** React playground — `liveCode` drives both LiveProvider preview and the editor. */
const JsxPlaygroundPanel = ({ initialCode, language, scope }) => {
  const [liveCode, setLiveCode] = useState(initialCode);

  return (
    <LiveProvider
      code={liveCode}
      transformCode={transformCode}
      scope={scope}
      language={language}
      noInline={true}
    >
      <div className="playground-block-content">
        <LivePreview className={playgroundPreviewClassName} />
        <Editor
          initialCode={initialCode}
          language={language}
          code={liveCode}
          onChange={setLiveCode}
        />
      </div>
    </LiveProvider>
  );
};

JsxPlaygroundPanel.propTypes = {
  initialCode: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  scope: PropTypes.object.isRequired,
};

/** Core/HTML playground — HTML preview is rendered outside react-live. */
const HtmlPlaygroundPanel = ({ initialCode, language }) => {
  const [liveCode, setLiveCode] = useState(initialCode);

  return (
    <div className="playground-block-content">
      <HtmlLivePreview code={sanitize(liveCode)} />
      <Editor
        initialCode={initialCode}
        language={language}
        code={liveCode}
        onChange={setLiveCode}
      />
    </div>
  );
};

HtmlPlaygroundPanel.propTypes = {
  initialCode: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

const playgroundScopeDenylist = new Set([
  'AnchorLink',
  'InternalLink',
  'ExternalLink',
  'Link',
]);

export const PlaygroundBlock = ({ children, scope }) => {
  const mdxComponents = useMDXComponents();
  const safeMdxScope = Object.fromEntries(
    Object.entries(mdxComponents).filter(([key]) => !playgroundScopeDenylist.has(key)),
  );
  const scopeComponents = { ...playgroundBuiltinScope, ...safeMdxScope, ...scope };
  // Imports are stripped from live code; expose `Link` for Header/Footer `as={Link}` examples.
  if (!Object.hasOwn(scope ?? {}, 'Link')) {
    scopeComponents.Link = PlaygroundRouterLink;
  }

  const childrenArray = Array.isArray(children) ? children : [children];
  const codeBlocks = childrenArray
    .filter((child) => isValidElement(child))
    .map(({ props }) => {
      const childrenProps = props.children.props;
      return {
        code: childrenProps.children,
        language: childrenProps.className && childrenProps.className.split('-')[1],
      };
    });
  return (
    <div className="playground-block">
      <Tabs>
        <TabList className="playground-block-tabs">
          {codeBlocks.map(({ language }) => (
            <Tab key={language}>{isJsx(language) ? 'React' : 'Core'}</Tab>
          ))}
        </TabList>
        {codeBlocks.map(({ code, language }) => {
          const initialCode = sanitize(code);
          return (
            <TabPanel key={language}>
              {isJsx(language) ? (
                <JsxPlaygroundPanel
                  initialCode={initialCode}
                  language={language}
                  scope={scopeComponents}
                />
              ) : (
                <HtmlPlaygroundPanel initialCode={initialCode} language={language} />
              )}
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
  /** Extra bindings passed to react-live (e.g. `Link` for Header/Footer examples). */
  scope: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
};

export default PlaygroundPreview;
