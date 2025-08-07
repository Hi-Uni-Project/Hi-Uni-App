import React from 'react';

import { cva } from 'class-variance-authority';
import {
  TextInputIOSProps,
  TextInputAndroidProps,
  TextInput,
  View,
  Platform,
} from 'react-native';

import ActionIcons from '@/shared/icons/ActionIcons';
import { cn } from '@/shared/lib/cn';

interface Props extends TextInputIOSProps, TextInputAndroidProps {
  placeholder?: string;
  variant?: 'find' | 'submit';
  value: string;
  onChangeText: (text: string) => void;
}

const viewVariants = cva('relative flex flex-row items-center', {
  variants: {
    variant: {
      find: 'w-[350px] h-[52px] bg-[#F2F2F2] rounded-full',
      submit: 'w-[350px] h-[52px] border-b-[1px] border-gray-300',
    },
  },
});

const inputVariants = cva(
  'outline-hidden typo-body-16-regular text-gray-500 text-base flex-1',
  {
    variants: {
      variant: {
        find: 'pl-11',
        submit: 'pl-3 text-gray-400',
      },
      platform: {
        ios: 'pb-2',
        android: 'pt-0 pb-0',
      },
    },
  },
);

const HUInput = ({
  placeholder = '',
  variant = 'find',
  value,
  onChangeText,
  ...props
}: Props) => {
  return (
    <View className={cn(viewVariants({ variant }), 'relative')}>
      {variant === 'find' && (
        <View className="absolute left-[16px]">
          <ActionIcons type="search" width={17} height={17} color={'#979797'} />
        </View>
      )}
      <TextInput
        className={cn(
          inputVariants({
            variant,
            platform:
              Platform.OS === 'ios' || Platform.OS === 'android'
                ? Platform.OS
                : 'ios',
          }),
        )}
        onChangeText={onChangeText}
        maxLength={30}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#979797"
        {...props}
      />
    </View>
  );
};

export default HUInput;
