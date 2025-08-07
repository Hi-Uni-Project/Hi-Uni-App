import * as React from 'react';

import { ColorValue } from 'react-native';

import Caution from '@/static/icons/caution.svg';
import Check from '@/static/icons/check.svg';

type StatusType = 'check' | 'caution';

interface Props {
  status: StatusType;
  color?: ColorValue;
  width?: number;
  height?: number;
}

const StatusIcons = ({ status, color, width, height }: Props) => {
  switch (status) {
    case 'check':
      return <Check color={color} width={width} height={height} />;
    case 'caution':
      return <Caution color={color} width={width} height={height} />;
    default:
      return null;
  }
};

export default StatusIcons;
