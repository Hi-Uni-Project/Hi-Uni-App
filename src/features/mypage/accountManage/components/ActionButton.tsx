import React from 'react';

import { Pressable, View, Text } from 'react-native';

import { shadowStyleSheet } from '@/shared/styles/shadow';

interface Props {
  label: string;
  onPress: () => void;
}

const ActionButton = ({ label, onPress }: Props) => (
  <Pressable className="px-4" onPress={onPress}>
    <View
      className="mb-2 rounded-[15px] bg-surface-100 py-2"
      style={shadowStyleSheet.dropShadow}>
      <View className="px-4 py-3">
        <Text className="text-surface-500 typo-body-16-semibold">{label}</Text>
      </View>
    </View>
  </Pressable>
);

export default ActionButton;
