import React from 'react';

import { Text, View, ViewProps } from 'react-native';

interface UnivMajorBadgeProps extends ViewProps {
  univName: string;
  majorName: string;
}

const UnivMajorBadge = ({ univName, majorName }: UnivMajorBadgeProps) => {
  return (
    <View className="mx-5 mt-6 items-start">
      <Text className="mb-1 font-bold text-main-text typo-title-22-semibold">
        {univName}
      </Text>
      <Text className="text-gray-700 typo-body-16-regular">{majorName}</Text>
    </View>
  );
};

export default UnivMajorBadge;
