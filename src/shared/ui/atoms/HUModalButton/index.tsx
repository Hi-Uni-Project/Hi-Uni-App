import React from 'react';

import { cva } from 'class-variance-authority';
import { Text, Pressable, PressableProps } from 'react-native';

import { cn } from '@/shared/lib/cn';

interface Props extends PressableProps {
  variant?: 'primary' | 'gray';
  text?: string;
}

const buttonVariants = cva(
  'flex justify-center items-center shrink-0 border-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary-purple rounded-[10px] w-full h-[54px] ',
        gray: 'bg-white rounded-[10px] w-full h-[54px] border border-surface-300',
      },
    },
  },
);

const textVariants = cva('typo-main-button-16-semibold', {
  variants: {
    variant: {
      primary: 'text-white typo-main-button-16-semibold',
      gray: 'text-surface-400 typo-main-button-16-semibold',
    },
  },
});

const HUModalButton = ({
  variant = 'primary',
  className,
  text = '',

  ...props
}: Props) => {
  return (
    <Pressable
      className={cn(buttonVariants({ variant }), className, 'relative')}
      {...props}>
      <Text className={textVariants({ variant })}>{text}</Text>
    </Pressable>
  );
};

export default HUModalButton;
