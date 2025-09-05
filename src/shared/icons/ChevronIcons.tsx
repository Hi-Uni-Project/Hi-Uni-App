import React from 'react';

import { ColorValue } from 'react-native';

import ChevronBottom from '@/static/icons/down_chevron.svg';
import ChevronLeft from '@/static/icons/left_chevron.svg';
import ChevronRight from '@/static/icons/right_chevron.svg';
import ChevronTop from '@/static/icons/top_chevron.svg';

interface Props {
  direction: 'left' | 'top' | 'bottom' | 'right';
  color?: ColorValue;
  width?: number;
  height?: number;
}

const ChevronIcons = ({ direction, color, width, height }: Props) => {
  switch (direction) {
    case 'left':
      return <ChevronLeft color={color} width={width} height={height} />;
    case 'right':
      return <ChevronRight color={color} width={width} height={height} />;
    case 'top':
      return <ChevronTop color={color} width={width} height={height} />;
    case 'bottom':
      return <ChevronBottom color={color} width={width} height={height} />;
    default:
      return null;
  }
};

export default ChevronIcons;
