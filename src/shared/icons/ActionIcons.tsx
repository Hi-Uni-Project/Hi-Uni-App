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
}

const ActionIcons = ({ type, color, size = 20 }: Props) => {
  switch (type) {
    case 'search':
      return <Search color={color} width={size} height={size} />;
    case 'close':
      return <Close color={color} width={size} height={size} />;
    case 'erase':
      return <Erase color={color} width={size} height={size} />;
    case 'message':
      return <Message color={color} width={size} height={size} />;
    default:
      return null;
  }
};

export default ActionIcons;
