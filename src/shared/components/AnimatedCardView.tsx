import React from 'react';

import { ViewProps } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';

import { shadowStyleSheet } from '../styles/shadow';

interface AnimatedCardProps extends AnimatedProps<ViewProps> {
  children: React.ReactNode;
}

const AnimatedCardView = ({ children, ...rest }: AnimatedCardProps) => {
  return (
    <Animated.View
      className="rounded-[15px] border-[1px] border-gray-200 bg-white"
      {...rest}
      style={[shadowStyleSheet.dropShadow, rest.style]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedCardView;
