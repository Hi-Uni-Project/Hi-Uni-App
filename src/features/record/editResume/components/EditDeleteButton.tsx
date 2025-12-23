import React from 'react';

import { Pressable, Text } from 'react-native';

import TrashIcon from '@/static/icons/trash.svg';

interface Props {
  text: string;
  onPress: () => void;
  isEditMode: boolean;
}

const EditDeleteButton = ({ text, onPress, isEditMode }: Props) => {
  if (!isEditMode) {
    return null;
  }

  return (
    <Pressable className="mt-3 flex-row items-center" onPress={onPress}>
      <TrashIcon className="mt-[2px] text-surface-400" />
      <Text className="ml-2 text-surface-400 typo-body-15-medium">{text}</Text>
    </Pressable>
  );
};

export default EditDeleteButton;
