import React from 'react';

import { View, Text } from 'react-native';

import StatusIcons from '@/shared/icons/StatusIcons';

const ErrorTextArea = () => {
  return (
    <View className="mt-2 flex-row items-center space-x-1 self-start pl-3">
      <StatusIcons status="caution" color="#FB6C6C" width={16} height={16} />
      <Text className="typo-error-14-medium">
        유효하지 않은 웹메일입니다. 다시 입력해주세요.
      </Text>
    </View>
  );
};

export default ErrorTextArea;
