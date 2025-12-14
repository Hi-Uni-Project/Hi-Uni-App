import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { RecordNavigationProps } from '../types/navigationTypes';

import AchievementEditView from '@/screens/Record/EditView/AchievementEditView';
import CareerEditView from '@/screens/Record/EditView/CareerEditView';
import EducationEditView from '@/screens/Record/EditView/EducationEditView';
import LanguageEditView from '@/screens/Record/EditView/LanguageEditView';
import LinkEditView from '@/screens/Record/EditView/LinkEditView';
import ProjectEditView from '@/screens/Record/EditView/ProjectEditView';
import ResumeEditView from '@/screens/Record/ResumeEditView';

const Stack = createNativeStackNavigator<RecordNavigationProps>();

const RecordRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ResumeEdit" component={ResumeEditView} />
      <Stack.Screen name="CreateEducation" component={EducationEditView} />
      <Stack.Screen name="EditEducation" component={EducationEditView} />
      <Stack.Screen name="CreateLink" component={LinkEditView} />
      <Stack.Screen name="EditLink" component={LinkEditView} />
      <Stack.Screen name="CreateAchievement" component={AchievementEditView} />
      <Stack.Screen name="EditAchievement" component={AchievementEditView} />
      <Stack.Screen name="CreateLanguage" component={LanguageEditView} />
      <Stack.Screen name="EditLanguage" component={LanguageEditView} />
      <Stack.Screen name="CreateCareer" component={CareerEditView} />
      <Stack.Screen name="EditCareer" component={CareerEditView} />
      <Stack.Screen name="CreateProject" component={ProjectEditView} />
      <Stack.Screen name="EditProject" component={ProjectEditView} />

      <Stack.Screen name="CreateCoverLetter" component={() => <Text />} />
      <Stack.Screen name="EditCoverLetter" component={() => <Text />} />
    </Stack.Navigator>
  );
};

export default RecordRoute;
