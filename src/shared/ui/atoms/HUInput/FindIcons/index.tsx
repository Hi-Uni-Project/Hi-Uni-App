import React from 'react';

import { View, Pressable } from 'react-native';

import ActionIcons from '@/shared/icons/ActionIcons';

interface Props {
  onPress?: () => void;
  length?: number;
}

const FindIcons = ({ onPress, length }: Props) => (
  <>
    <View className="absolute left-[20px]">
      <ActionIcons type="search" width={17} height={17} color="#979797" />
    </View>

    {length > 0 && (
      <Pressable onPress={onPress} className="absolute right-[17px]">
        <ActionIcons type="erase" width={17} height={17} color="#DADADA" />
      </Pressable>
    )}
  </>
);

export default FindIcons;
