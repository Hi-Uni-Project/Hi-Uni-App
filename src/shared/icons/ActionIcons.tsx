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
}

const ActionIcons = ({ type, color }: Props) => {
  switch (type) {
    case 'search':
      return <Search color={color} />;
    case 'close':
      return <Close color={color} />;
    case 'erase':
      return <Erase color={color} />;
    case 'message':
      return <Message color={color} />;
    default:
      return null;
  }
};

export default ActionIcons;
