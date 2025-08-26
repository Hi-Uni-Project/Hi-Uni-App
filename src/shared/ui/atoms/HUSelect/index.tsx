import React from 'react';

import { Text, Pressable, PressableProps } from 'react-native';

import ToggleIcons from '@/shared/icons/ToggleIcons';

interface HUSelectProps extends PressableProps {
  text: string;
  onPressed?: () => void;
  isSelected: boolean;
}

const HUSelect = ({ text, onPressed, isSelected }: HUSelectProps) => {
  return (
    <Pressable
      onPress={() => {
        onPressed && onPressed();
      }}
      className="flex-row items-center">
      {isSelected === true ? (
        <ToggleIcons type="check" color="#6568EB" width={18} height={18} />
      ) : (
        <ToggleIcons type="nonCheck" color="#DADADA" width={18} height={18} />
      )}
      <Text className="ml-2 typo-body-14-semibold">{text}</Text>
    </Pressable>
  );
};

export default HUSelect;
