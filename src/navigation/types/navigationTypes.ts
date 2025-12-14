import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  Schedule,
  ScheduleDatePayload,
} from '@/features/calendar/shared/types';

export type MainNavigationProps = {
  OnboardRoute: undefined;
  SignupRoute: undefined;
  HomeRoute: undefined;
  BoardRoute: NavigatorScreenParams<BoardNavigationProps>;
  MyPageRoute: undefined;
  RecordRoute: NavigatorScreenParams<RecordNavigationProps>;
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

  MyPageRoute: undefined;

  EditSchedule: Schedule;
  CreateSchedule: ScheduleDatePayload;
};

export type BoardNavigationProps = {
  MyComments: undefined;
  MyPosts: undefined;
  PopularReviews: { title: string };
  BoardWrite: undefined;
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
  CreateSchedule: ScheduleDatePayload;
};

export type MypageNavigationProps = {
  MypageMain: undefined;
  MyScrab: undefined;
  AccountManage: undefined;
};

export type RecordNavigationProps = {
  ResumeEdit: undefined;
  CreateEducation: undefined;
  EditEducation: { educationId?: number; tempId?: string };
  CreateLink: undefined;
  EditLink: { linkId?: number; tempId?: string };
  CreateAchievement: undefined;
  EditAchievement: { achievementId?: number; tempId?: string };
  CreateLanguage: undefined;
  EditLanguage: { languageId?: number; tempId?: string };
  CreateCareer: undefined;
  EditCareer: { careerId?: number; tempId?: string };
  CreateProject: undefined;
  EditProject: { projectId?: number; tempId?: string };

  CreateCoverLetter: undefined;
  EditCoverLetter: { coverLetterId?: number; tempId?: string };
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

export type MypageStackNavigationProp =
  NativeStackNavigationProp<MypageNavigationProps>;

export type RecordStackNavigationProp =
  NativeStackNavigationProp<RecordNavigationProps>;

export type HomeTabNavigationProp = BottomTabNavigationProp<TabNavigationProps>;
