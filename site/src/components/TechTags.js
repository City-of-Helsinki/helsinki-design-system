import React from 'react';
import { Tag } from 'hds-react';
import PropTypes from 'prop-types';
import componentData from '../data/components.json';

const tagStyles = {
  core: { label: 'Core', theme: { '--background-color': 'var(--color-copper-medium-light)' } },
  react: { label: 'React', theme: { '--background-color': 'var(--color-fog-medium-light)' } },
  js: { label: 'Vanilla JS', theme: { '--background-color': 'var(--color-engel)' } },
};

export const TechTags = ({ componentName, withoutHeading }) => {
  const componentTags = componentData.find((item) => item.name === componentName)?.tags;

  return (
    <>
      {!withoutHeading && <h4 className="heading-s">Available technologies</h4>}
      {componentTags && (
        <div style={{ display: 'flex', gap: 'var(--spacing-2-xs)' }}>
          {componentTags.map(
            (tag) =>
              tagStyles?.[tag] && (
                <Tag key={tag} theme={tagStyles[tag]?.theme}>
                  {tagStyles[tag]?.label}
                </Tag>
              ),
          )}
        </div>
      )}
    </>
  );
};

TechTags.propTypes = {
  componentName: PropTypes.string.isRequired,
  withoutHeading: PropTypes.bool,
};

export default TechTags;
