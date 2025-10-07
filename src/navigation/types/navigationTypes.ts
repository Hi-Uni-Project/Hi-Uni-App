import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type MainNavigationProps = {
  OnboardRoute: undefined;
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

export type OnboardNavigationProps = {
  Onboarding: undefined;
  Login: undefined;
  SignupRoute: undefined;
};

export type MainStackNavigationProp =
  NativeStackNavigationProp<MainNavigationProps>;

export type SignupStackNavigationProp =
  NativeStackNavigationProp<SignupNavigationProps>;

export type OnboardStackNavigationProp =
  NativeStackNavigationProp<OnboardNavigationProps>;
