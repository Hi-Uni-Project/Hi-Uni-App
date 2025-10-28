import React from 'react';

import { cva } from 'class-variance-authority';
import { Pressable, View, Text } from 'react-native';

interface CategoryChipProps {
  text: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const chipVariants = cva('rounded-full justify-center items-center', {
  variants: {
    isSelected: {
      true: 'bg-secondary-black ',
      false: 'bg-surface-200 ',
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

const textVariants = cva('px-[17px] py-2 typo-body-16-regular', {
  variants: {
    isSelected: {
      true: 'text-white',
      false: 'text-surface-500',
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

const CategoryChip = ({
  text,
  isSelected = false,
  onPress,
}: CategoryChipProps) => {
  return (
    <Pressable onPress={onPress} className="pr-2">
      <View className={chipVariants({ isSelected })}>
        <Text
          className={textVariants({ isSelected })}
          style={{ lineHeight: 16 }}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default CategoryChip;
