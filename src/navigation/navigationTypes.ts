import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HiUniStackParamList = {
  Login: undefined;
  Onboarding: undefined;
  ButtonTest: undefined;
  FontTest: undefined;
  IconTest: undefined;
  InputTest: undefined;
};

export type HiUniNativeStackNavigationProp =
  NativeStackNavigationProp<HiUniStackParamList>;
