import * as React from 'react';

import { ColorValue } from 'react-native';

import ArrowLeft from '@/static/icons/left_arrow.svg';

interface Props {
  direction: 'left';
  color?: ColorValue;
}

const ArrowIcons = ({ direction, color }: Props) => {
  switch (direction) {
    case 'left':
      return <ArrowLeft color={color} />;
    default:
      return null;
  }
};

export default ArrowIcons;
