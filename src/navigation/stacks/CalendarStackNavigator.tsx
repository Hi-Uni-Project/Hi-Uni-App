import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CalendarNavigationProps } from '../types/navigationTypes';

import EditSchedule from '@/features/calendar/editSchedule/components/EditSchedule';
import CalendarScreen from '@/screens/Calendar';

const Stack = createNativeStackNavigator<CalendarNavigationProps>();

const CalendarRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CalendarMain" component={CalendarScreen} />
      <Stack.Screen name="EditSchedule" component={EditSchedule} />
      <Stack.Screen name="CreateSchedule" component={EditSchedule} />
    </Stack.Navigator>
  );
};

export default CalendarRoute;
