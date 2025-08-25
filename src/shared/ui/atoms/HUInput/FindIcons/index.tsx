import React from 'react';

import { View, Pressable } from 'react-native';

import ActionIcons from '@/shared/icons/ActionIcons';

interface Props {
  onPress?: () => void;
}

const FindIcons = ({ onPress }: Props) => (
  <>
    <View className="absolute left-[20px]">
      <ActionIcons type="search" width={17} height={17} color="#979797" />
    </View>
    <Pressable onPress={onPress} className="absolute right-[17px]">
      <ActionIcons type="erase" width={17} height={17} color="#979797" />
    </Pressable>
  </>
);

export default FindIcons;
