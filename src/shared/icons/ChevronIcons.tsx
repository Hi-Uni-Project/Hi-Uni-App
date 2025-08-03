import React from 'react';

import { ColorValue } from 'react-native';

import ChevronBottom from '@/static/icons/down_chevron.svg';
import ChevronLeft from '@/static/icons/left_chevron.svg';
import ChevronTop from '@/static/icons/top_chevron.svg';

interface Props {
  direction: 'left' | 'top' | 'bottom';
  color?: ColorValue;
}

const ChevronIcons = ({ direction, color }: Props) => {
  switch (direction) {
    case 'left':
      return <ChevronLeft color={color} />;
    case 'top':
      return <ChevronTop color={color} />;
    case 'bottom':
      return <ChevronBottom color={color} />;
    default:
      return null;
  }
};

export default ChevronIcons;
