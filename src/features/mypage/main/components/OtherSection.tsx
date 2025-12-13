import React from 'react';

import { View } from 'react-native';

import { MenuItem } from './MenuItem';
import { SectionTitle } from './SectionTitle';

interface Props {
  onAccountManagePress: () => void;
}

export const OtherSection = ({ onAccountManagePress }: Props) => (
  <View className="px-4">
    <View className="rounded-[20px] border border-surface-200 bg-white py-1">
      <SectionTitle title="기타" />
      <MenuItem label="계정 관리" onPress={onAccountManagePress} />
    </View>
  </View>
);
