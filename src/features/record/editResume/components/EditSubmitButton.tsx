import React from 'react';

import { Pressable, Text, View } from 'react-native';

interface Props {
  text: string;
  onPress: () => void;
  disabled: boolean;
}

const EditSubmitButton = ({ text, onPress, disabled }: Props) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <View
        className={`flex-row items-center rounded-full px-[27px] py-[14px] ${
          !disabled ? 'bg-main-text' : 'bg-surface-300'
        }`}>
        <Text className="text-surface-200 typo-body-16-medium">{text}</Text>
      </View>
    </Pressable>
  );
};

export default EditSubmitButton;
