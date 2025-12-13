import React, { ReactNode } from 'react';

import { View, Text, Pressable } from 'react-native';

import ChevronIcons from '@/shared/icons/ChevronIcons';

interface Props {
  icon?: ReactNode;
  label: string;
  onPress: () => void;
  rightText?: string | null;
}

export const MenuItem = ({ icon, label, onPress, rightText = null }: Props) => (
  <View className="flex-row items-center justify-between px-4 py-3">
    <View className="flex-row items-center space-x-2">
      {icon && icon}
      <Text className="text-main-text typo-body-17-medium">{label}</Text>
    </View>

    {rightText ? (
      <Text className="mr-1 text-surface-400 typo-body-16-regular">
        {rightText}
      </Text>
    ) : (
      <Pressable onPress={onPress}>
        <ChevronIcons
          direction="right"
          color="#B7B7B7"
          width={15}
          height={15}
        />
      </Pressable>
    )}
  </View>
);
