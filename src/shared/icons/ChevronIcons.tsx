import React from 'react';

import { ColorValue } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import ChevronBottom from '@/static/icons/down_chevron.svg';
import ChevronLeft from '@/static/icons/left_chevron.svg';
import ChevronTop from '@/static/icons/top_chevron.svg';

interface Props {
  direction: 'left' | 'top' | 'bottom' | 'right';
  color?: ColorValue;
  width?: number;
  height?: number;
}

interface RightChevronProps {
  width?: number;
  height?: number;
  stroke?: ColorValue;
}

const RightChevron = ({
  width = 6,
  height = 12,
  stroke = '#111111',
}: RightChevronProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 6 12" fill="none">
      <Path
        d="M1 1L5 6L1 11"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};

const ChevronIcons = ({ direction, color, width, height }: Props) => {
  switch (direction) {
    case 'left':
      return <ChevronLeft color={color} width={width} height={height} />;
    case 'right':
      return <RightChevron stroke={color} width={width} height={height} />;
    case 'top':
      return <ChevronTop color={color} width={width} height={height} />;
    case 'bottom':
      return <ChevronBottom color={color} width={width} height={height} />;
    default:
      return null;
  }
};

export default ChevronIcons;
