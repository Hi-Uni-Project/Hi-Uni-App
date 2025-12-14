import React, { forwardRef, ReactNode } from 'react';

import { cva } from 'class-variance-authority';
import { TextInput, View, TextInputProps } from 'react-native';

import FindIcons from './FindIcons';

import { cn } from '@/shared/lib/cn';

interface Props extends TextInputProps {
  variant?: 'find' | 'submit' | 'calendarSchedule';
  onPress?: () => void;
  length?: number;
  leftComponent?: ReactNode;
}

const viewVariants = cva('w-full flex-row items-center', {
  variants: {
    variant: {
      find: 'h-[60px] bg-[#F2F2F2] rounded-full',
      submit: 'h-[52px] border-b-[1px] border-gray-300',
      calendarSchedule: 'h-[52px] border-b-[1px] border-surface-300',
    },
  },
});
const inputVariants = cva(
  'flex-1 font-normal text-[16px] text-secondary-black text-start',
  {
    variants: {
      variant: {
        find: 'pl-11',
        submit: 'pl-3 text-gray-400',
        calendarSchedule: 'pl-3 text-surface-400 typo-sub-title-20-semibold',
      },
    },
  },
);

const HUInput = forwardRef<TextInput, Props>(
  ({ variant = 'find', onPress, length, leftComponent, ...props }, ref) => {
    return (
      <View className={cn(viewVariants({ variant }))}>
        {leftComponent}

        <TextInput
          ref={ref}
          className={cn(inputVariants({ variant }))}
          maxLength={variant === 'calendarSchedule' ? undefined : 18}
          placeholderTextColor="#979797"
          {...props}
        />

        {variant === 'find' && <FindIcons length={length} onPress={onPress} />}
      </View>
    );
  },
);

HUInput.displayName = 'HUInput';
export default HUInput;
