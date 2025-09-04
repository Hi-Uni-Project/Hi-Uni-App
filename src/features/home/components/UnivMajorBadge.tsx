import React from 'react';

import { Text, View } from 'react-native';

interface UnivMajorBadgeProps {
  univName: string;
  majorName: string;
}

const UnivMajorBadge = ({ univName, majorName }: UnivMajorBadgeProps) => {
  return (
    <View className="items-start px-5 pt-6">
      <Text className="mb-1 font-bold text-main-text typo-title-22-semibold">
        {univName}
      </Text>
      <Text className="text-gray-700 typo-body-16-regular">{majorName}</Text>
    </View>
  );
};

export default UnivMajorBadge;
