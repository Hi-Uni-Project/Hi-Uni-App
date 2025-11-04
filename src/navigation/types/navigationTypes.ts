import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Schedule } from '@/features/calendar/shared/types';

export type MainNavigationProps = {
  OnboardRoute: undefined;
  SignupRoute: undefined;
  HomeRoute: undefined;
  BoardRoute: NavigatorScreenParams<BoardNavigationProps>;
};

export type SignupNavigationProps = {
  Terms: undefined;
  Univ: undefined;
  Department: undefined;
  InputEmail: undefined;
  InputCode: { authMailId: string };
  SignupSuccess: undefined;
};

export type OnboardNavigationProps = {
  Onboarding: undefined;
  Login: undefined;
  SignupRoute: undefined;
  HomeRoute: undefined;
};

export type HomeNavigationProps = {
  HomeMain: undefined;
  HomeSearch: undefined;
  HotBoard: undefined;
  Detail: undefined;
  Profile: undefined;

  EditSchedule: Schedule;
  CreateSchedule: undefined;
};

export type BoardNavigationProps = {
  MyComments: undefined;
  MyPosts: undefined;
  PopularReviews: undefined;
};

export type TabNavigationProps = {
  HomeTab: undefined;
  Search: undefined;
  Board: undefined;
  Calendar: undefined;
  Record: undefined;
};

export type CalendarNavigationProps = {
  CalendarMain: undefined;
  EditSchedule: Schedule;
  CreateSchedule: undefined;
};

export type MainStackNavigationProp =
  NativeStackNavigationProp<MainNavigationProps>;

export type SignupStackNavigationProp =
  NativeStackNavigationProp<SignupNavigationProps>;

export type OnboardStackNavigationProp =
  NativeStackNavigationProp<OnboardNavigationProps>;

export type HomeStackNavigationProp =
  NativeStackNavigationProp<HomeNavigationProps>;

export type CalendarStackNavigationProp =
  NativeStackNavigationProp<CalendarNavigationProps>;

export type BoardStackNavigationProp =
  NativeStackNavigationProp<BoardNavigationProps>;

export type HomeTabNavigationProp = BottomTabNavigationProp<TabNavigationProps>;
