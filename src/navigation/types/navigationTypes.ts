import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type MainNavigationProps = {
  Onboarding: undefined;
  Login: undefined;
  SignupRoute: undefined;
  HomeRoute: undefined;
};

export type SignupNavigationProps = {
  Terms: undefined;
  Univ: undefined;
  Department: undefined;
  InputEmail: undefined;
  InputCode: undefined;
  SignupSuccess: undefined;
};

export type MainStackNavigationProp =
  NativeStackNavigationProp<MainNavigationProps>;

export type SignupStackNavigationProp =
  NativeStackNavigationProp<SignupNavigationProps>;
