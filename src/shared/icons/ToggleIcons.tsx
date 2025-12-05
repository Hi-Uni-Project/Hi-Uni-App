import * as React from 'react';

import { ColorValue } from 'react-native';

import Alert from '@/static/icons/alert.svg';
import CheckFill from '@/static/icons/check_fill.svg';
import DisableAlert from '@/static/icons/disable_alert.svg';
import EyeOpenStroke from '@/static/icons/eye-outline.svg';
import EyeClose from '@/static/icons/eye_close.svg';
import EyeOpen from '@/static/icons/eye_open.svg';
import NonCheck from '@/static/icons/non_check.svg';

type ToggleType =
  | 'eyeOpen'
  | 'eyeOpenStroke'
  | 'eyeClose'
  | 'check'
  | 'nonCheck'
  | 'alert'
  | 'disableAlert';

interface Props {
  type: ToggleType;
  color?: ColorValue;
  width?: number;
  height?: number;
}

const ToggleIcons = ({ type, color, width, height }: Props) => {
  switch (type) {
    case 'eyeOpen':
      return <EyeOpen color={color} width={width} height={height} />;
    case 'eyeOpenStroke':
      return <EyeOpenStroke color={color} width={width} height={height} />;
    case 'eyeClose':
      return <EyeClose color={color} width={width} height={height} />;
    case 'check':
      return <CheckFill color={color} width={width} height={height} />;
    case 'nonCheck':
      return <NonCheck color={color} width={width} height={height} />;
    case 'alert':
      return <Alert color={color} width={width} height={height} />;
    case 'disableAlert':
      return <DisableAlert color={color} width={width} height={height} />;
    default:
      return null;
  }
};

export default ToggleIcons;
