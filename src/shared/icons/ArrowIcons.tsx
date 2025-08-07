import * as React from 'react';

import { ColorValue } from 'react-native';

import ArrowLeft from '@/static/icons/left_arrow.svg';

interface Props {
  direction: 'left';
  color?: ColorValue;
  width?: number;
  height?: number;
}

const ArrowIcons = ({ direction, color, width, height }: Props) => {
  switch (direction) {
    case 'left':
      return <ArrowLeft color={color} width={width} height={height} />;
    default:
      return null;
  }
};

export default ArrowIcons;
