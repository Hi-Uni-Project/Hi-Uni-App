import React from 'react';

import { StyleSheet, ViewProps } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';

// 안드로이드와 iOS에서 그림자 스타일을 통일하기 위해 boxShadow 사용
const shadowStyleSheet = StyleSheet.create({
  dropShadow: {
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.03)',
  },
});

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
