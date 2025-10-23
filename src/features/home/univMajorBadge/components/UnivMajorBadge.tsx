import React from 'react';

import { Text, View } from 'react-native';

import { UnivData } from '@/shared/stores/register/types';
import { formatMajor } from '@/shared/utils/formatter';

interface Props {
  univ: UnivData;
}

const UnivMajorBadge = ({ univ }: Props) => {
  return (
    <View className="mx-5 mt-6 items-start">
      <Text className="mb-1 text-main-text typo-sub-title-22-bold">
        {univ.univName}
      </Text>
      <Text className="text-gray-700 typo-body-16-regular">
        {formatMajor(univ.firstMajorName, univ.secondMajorName)}
      </Text>
    </View>
  );
};

export default UnivMajorBadge;
