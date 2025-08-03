import * as React from 'react';

import { ColorValue } from 'react-native';

import Alert from '@/static/icons/alert.svg';
import CheckFill from '@/static/icons/check_fill.svg';
import DisableAlert from '@/static/icons/disable_alert.svg';
import EyeClose from '@/static/icons/eye_close.svg';
import EyeOpen from '@/static/icons/eye_open.svg';
import NonCheck from '@/static/icons/non_check.svg';

type ToggleType =
  | 'eyeOpen'
  | 'eyeClose'
  | 'check'
  | 'nonCheck'
  | 'alert'
  | 'disableAlert';

interface Props {
  type: ToggleType;
  color?: ColorValue;
}

const ToggleIcons = ({ type, color }: Props) => {
  switch (type) {
    case 'eyeOpen':
      return <EyeOpen color={color} />;
    case 'eyeClose':
      return <EyeClose color={color} />;
    case 'check':
      return <CheckFill color={color} />;
    case 'nonCheck':
      return <NonCheck color={color} />;
    case 'alert':
      return <Alert color={color} />;
    case 'disableAlert':
      return <DisableAlert color={color} />;
    default:
      return null;
  }
};

export default ToggleIcons;
