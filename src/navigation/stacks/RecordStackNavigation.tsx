import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RecordNavigationProps } from '../types/navigationTypes';

import ResumeEditView from '@/screens/Record/ResumeEditView';

const Stack = createNativeStackNavigator<RecordNavigationProps>();

const RecordRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ResumeEdit" component={ResumeEditView} />
    </Stack.Navigator>
  );
};

export default RecordRoute;
