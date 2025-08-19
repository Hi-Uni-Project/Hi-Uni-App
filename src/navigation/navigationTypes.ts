import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import SCREEN_NAME_PROVIDER from '@/shared/constants/screenNameProvider';

export type HiUniStackParamList = {
  [SCREEN_NAME_PROVIDER.LOGIN]: undefined;
  [SCREEN_NAME_PROVIDER.ONBOARDING]: undefined;
  [SCREEN_NAME_PROVIDER.TEST.BUTTON_TEST]: undefined;
  [SCREEN_NAME_PROVIDER.TEST.FONT_TEST]: undefined;
  [SCREEN_NAME_PROVIDER.TEST.ICON_TEST]: undefined;
  [SCREEN_NAME_PROVIDER.TEST.INPUT_TEST]: undefined;
};

export type HiUniNativeStackNavigationProp =
  NativeStackNavigationProp<HiUniStackParamList>;
