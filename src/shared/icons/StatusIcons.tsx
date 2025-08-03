import * as React from 'react';

import { ColorValue } from 'react-native';

import Caution from '@/static/icons/caution.svg';
import Check from '@/static/icons/check.svg';

type StatusType = 'check' | 'caution';

interface Props {
  status: StatusType;
  color?: ColorValue;
}

const StatusIcons = ({ status, color }: Props) => {
  switch (status) {
    case 'check':
      return <Check color={color} />;
    case 'caution':
      return <Caution color={color} />;
    default:
      return null;
  }
};

export default StatusIcons;
