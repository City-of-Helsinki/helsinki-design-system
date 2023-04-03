import React from 'react';
import { Tooltip } from 'hds-react';
import './StatusLabelTooltip.scss';

const StatusLabelTooltip = () => {
  const content = {
    Draft: 'The component is work in progress',
    Beta: 'The component is being tested',
    Stable: 'The component has been tested and defects have been fixed',
    Accessible: 'The component has been reviewed for accessibility',
    Deprecated: 'The component will be removed'
  };

  return (
    <Tooltip placement="right-end" className="status-label-tooltip" boxShadow>
      <ul class="status-label-definitions">
        {Object.keys(content).map((key) => (
          <li>
            <div class="status-name">{key}</div><div>{content[key]}</div>
          </li>
        ))}
      </ul>
    </Tooltip>
  );
};

export default StatusLabelTooltip;
