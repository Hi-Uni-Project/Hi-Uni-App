import React from 'react';

import { cva } from 'class-variance-authority';
import { TextInput, View, TextInputProps } from 'react-native';

import ActionIcons from '@/shared/icons/ActionIcons';
import { cn } from '@/shared/lib/cn';

interface Props extends TextInputProps {
  variant?: 'find' | 'submit';
}

const viewVariants = cva('w-full flex-row items-center', {
  variants: {
    variant: {
      find: 'h-[60px] bg-[#F2F2F2] rounded-full',
      submit: 'h-[52px] border-b-[1px] border-gray-300',
    },
  },
});

const inputVariants = cva('w-full font-normal text-[16px] text-[#1E2128]', {
  variants: {
    variant: {
      find: 'pl-11',
      submit: 'pl-3 text-gray-400',
    },
  },
});

const HUInput = ({ variant = 'find', ...props }: Props) => {
  return (
    <View className={cn(viewVariants({ variant }))}>
      {variant === 'find' && (
        <View className="absolute left-[16px]">
          <ActionIcons type="search" width={17} height={17} color={'#979797'} />
        </View>
      )}
      <TextInput
        className={cn(
          inputVariants({
            variant,
          }),
        )}
        maxLength={18}
        placeholderTextColor="#979797"
        {...props}
      />
    </View>
  );
};

export default HUInput;
