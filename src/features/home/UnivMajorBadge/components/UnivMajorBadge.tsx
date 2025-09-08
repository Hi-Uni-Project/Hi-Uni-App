import React from 'react';

import { Text, View, ViewProps } from 'react-native';

interface UnivMajorBadgeProps extends ViewProps {
  univName: string;
  majorName: string;
}

const UnivMajorBadge = ({ univName, majorName }: UnivMajorBadgeProps) => {
  return (
    <View className="mx-5 mt-6 items-start">
      <Text className="mb-1 text-main-text typo-sub-title-22-bold">
        {univName}
      </Text>
      <Text className="text-gray-700 typo-body-16-regular">{majorName}</Text>
    </View>
  );
};

export default UnivMajorBadge;
