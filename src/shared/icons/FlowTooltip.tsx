import React from 'react';

import Tooltip_1 from '@/static/tooltip/flow-tooltip-1.svg';
import Tooltip_2 from '@/static/tooltip/flow-tooltip-2.svg';
import Tooltip_3 from '@/static/tooltip/flow-tooltip-3.svg';

interface Props {
  flow: '1' | '2' | '3';
}

const FlowTooltip = ({ flow }: Props) => {
  switch (flow) {
    case '1':
      return <Tooltip_1 />;
    case '2':
      return <Tooltip_2 />;
    case '3':
      return <Tooltip_3 />;
    default:
      return null;
  }
};

export default FlowTooltip;
