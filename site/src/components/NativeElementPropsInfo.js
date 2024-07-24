import React from 'react';
import PropTypes from 'prop-types';

import ExternalLink from './ExternalLink';

/**
 * Helper component to display information about native element props the component supports.
 * Some attributes may be omitted and those can be listed with "notAllowed".
 *
 * Can also show information when a prop overrides a native prop. Some components use "ariaLabel" or "dataTestId" custom props.
 * Most used prop overrides are pre-set as constants "ariaLabel"/"dataTestId". Other overrides can be added by providing the data in format "used/overwritten".
 *
 * Some components have element props that are not all set to one element. That may be confusing, so information about it should be shown.
 *
 */

const NativeElementPropsInfo = ({ nodeName, splitProps, overlappingProps, notAllowed }) => {
  const ElementInfo = () => (
    <p>
      This component also accepts all native
      <ExternalLink href={`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${nodeName}#attributes`}>
        <code>{nodeName}</code> element props
      </ExternalLink>
      {notAllowed && notAllowed.length ? (
        <>
          , except{' '}
          {notAllowed.map((attr, index) => (
            <>
              <code>{attr}</code>
              <>{index < notAllowed.length - 1 ? ', ' : ''}</>
            </>
          ))}{' '}
          attribute(s)
        </>
      ) : (
        ''
      )}
      .
    </p>
  );

  const SplitTags = () => {
    if (splitProps.length === 0) {
      return '';
    }
    const propList = splitProps.join(', ');
    return (
      <>
        {' '}
        (<code>{propList}</code>){' '}
      </>
    );
  };

  const SplitInfo = () => {
    // if splitProps are defined, but array is empty, the text is displayed but tag list is not seen.
    if (splitProps) {
      return (
        <p>
          {' '}
          Some native element props <SplitTags /> are split into multiple children in the component.
        </p>
      );
    }
    return null;
  };

  const Overlaps = () => {
    const getPropTuple = (prop) => {
      if (prop === 'ariaLabel') {
        return {
          used: 'ariaLabel',
          overwritten: 'aria-label',
        };
      }
      if (prop === 'dataTestId') {
        return {
          used: 'dataTestId',
          overwritten: 'data-testid',
        };
      }
      const [used, overwritten] = prop.split('/');
      return {
        used,
        overwritten,
      };
    };
    return (
      <ul>
        {overlappingProps.map((prop) => {
          const { used, overwritten } = getPropTuple(prop);
          if (!used || !overwritten) {
            return null;
          }
          return (
            <li>
              <code>{used}</code> overrides the <code>{overwritten}</code>
            </li>
          );
        })}
      </ul>
    );
  };

  const OverlapInfo = () => {
    if (overlappingProps && overlappingProps.length) {
      return (
        <p>
          Following component properties override their native counterparts: <Overlaps />
        </p>
      );
    }
    return null;
  };

  return (
    <>
      <ElementInfo />
      <OverlapInfo />
      <SplitInfo />
    </>
  );
};

NativeElementPropsInfo.propTypes = {
  nodeName: PropTypes.string.isRequired,
  notAllowed: PropTypes.arrayOf(PropTypes.string),
  splitProps: PropTypes.arrayOf(PropTypes.string),
  overlappingProps: PropTypes.oneOf('ariaLabel', 'dataTestId', PropTypes.string),
};

export default NativeElementPropsInfo;
