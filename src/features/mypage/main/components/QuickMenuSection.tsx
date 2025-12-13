import React from 'react';

import { View } from 'react-native';

import { MenuItem } from './MenuItem';

import BoardActionIcons from '@/shared/icons/BoardActionIcons';

interface Props {
  onScrabPress: () => void;
}

export const QuickMenuSection = ({ onScrabPress }: Props) => (
  <View className="px-4">
    <View className="mb-2 rounded-[20px] border border-surface-200 bg-white py-1">
      <MenuItem
        icon={<BoardActionIcons action="scrab-gray" width={20} height={20} />}
        label="내 스크랩"
        onPress={onScrabPress}
      />
    </View>
  </View>
);
