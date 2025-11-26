import React from 'react';

import { Pressable, Text, View } from 'react-native';

import AddIcon from '@/static/icons/add.svg';

interface AddButtonProps {
  onPress?: () => void;
}

const AddButton = ({ onPress }: AddButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center rounded-full bg-main-text px-4 py-2">
        <AddIcon color="#DADADA" width={14} height={14} />
        <Text className="ml-[7px] text-surface-200 typo-body-15-medium">
          추가하기
        </Text>
      </View>
    </Pressable>
  );
};

export default AddButton;
