import React from 'react';

import { View, Pressable, Text } from 'react-native';

import Checked from '@/static/icons/check_fill.svg';
import NonChecked from '@/static/icons/non_check.svg';

interface Props {
  isReview: boolean;
  onPress: () => void;
  description?: string;
}

const ReviewCheckbox = ({ isReview, onPress, description }: Props) => {
  return (
    <View className="flex-row items-start justify-start pt-5">
      <Pressable className="mt-[3px]" onPress={onPress}>
        {isReview ? (
          <Checked color="#6568ea" />
        ) : (
          <NonChecked color="#DADADA" />
        )}
      </Pressable>

      <View className="pl-3">
        <Text className="text-surface-700 typo-body-17-semibold">
          후기로 작성할게요.
        </Text>

        <Text className="pt-1 text-surface-500 typo-body-16-regular">
          {description}
        </Text>
      </View>
    </View>
  );
};

export default ReviewCheckbox;
