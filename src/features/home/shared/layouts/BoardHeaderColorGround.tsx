import React from 'react';

import { Platform, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BoardHeaderColorGround = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? insets.top : 0,
      }}
    />
  );
};

export default BoardHeaderColorGround;
