import React from 'react';

import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Test = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="font-bold text-fuchsia-500">Test</Text>
      <Text className="text-sm font-light">test</Text>
    </SafeAreaView>
  );
};

export default Test;
