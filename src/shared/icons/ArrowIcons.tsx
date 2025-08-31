import * as React from 'react';

import { ColorValue } from 'react-native';

import ArrowLeft from '@/static/icons/left_arrow.svg';
import ArrowRight from '@/static/icons/right_arrow.svg';

interface Props {
  direction: 'left' | 'right';
  color?: ColorValue;
  width?: number;
  height?: number;
}

const ArrowIcons = ({ direction, color, width, height }: Props) => {
  switch (direction) {
    case 'left':
      return <ArrowLeft color={color} width={width} height={height} />;
    case 'right':
      return <ArrowRight color={color} width={width} height={height} />;
    default:
      return null;
  }
};

export default ArrowIcons;
