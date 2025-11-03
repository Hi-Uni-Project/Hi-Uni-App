import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BoardNavigationProps } from '../types/navigationTypes';

import MyComments from '@/screens/Board/MyComments';
import MyPosts from '@/screens/Board/MyPosts';
import PopularReviews from '@/screens/Board/PopularReviews';

const Stack = createNativeStackNavigator<BoardNavigationProps>();

const BoardRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyComments" component={MyComments} />
      <Stack.Screen name="MyPosts" component={MyPosts} />
      <Stack.Screen name="PopularReviews" component={PopularReviews} />
    </Stack.Navigator>
  );
};

export default BoardRoute;
