import * as React from 'react';

import { ColorValue } from 'react-native';

import Close from '@/static/icons/close.svg';
import Erase from '@/static/icons/erase.svg';
import Message from '@/static/icons/message.svg';
import Search from '@/static/icons/search.svg';

type ActionType = 'search' | 'close' | 'erase' | 'message';

interface Props {
  type: ActionType;
  color?: ColorValue;
  size?: number;
  width?: number;
  height?: number;
}

const ActionIcons = ({ type, color, width, height }: Props) => {
  switch (type) {
    case 'search':
      return <Search color={color} width={width} height={height} />;
    case 'close':
      return <Close color={color} width={width} height={height} />;
    case 'erase':
      return <Erase color={color} width={width} height={height} />;
    case 'message':
      return <Message color={color} width={width} height={height} />;
    default:
      return null;
  }
};

export default ActionIcons;
