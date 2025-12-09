import React from 'react';

import { View, Text } from 'react-native';

export const toastConfig = {
  customToast: ({ text1, text2 }: any) => (
    <View className="mx-5 rounded-[15px] bg-[#1E2128]/[70%] px-5 py-4 shadow-lg">
      <Text className="text-center text-white typo-body-15-regular">
        {text1}
      </Text>
      {text2 && (
        <Text className="mt-1 text-center text-white typo-body-15-regular">
          {text2}
        </Text>
      )}
    </View>
  ),
};
