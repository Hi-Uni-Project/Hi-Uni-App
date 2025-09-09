import React from 'react';

import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface SelectionIndicatorProps {
  selectedPosition: number;
}

const SelectionIndicator = ({ selectedPosition }: SelectionIndicatorProps) => {
  const animationStyle = useAnimatedStyle(() => {
    return {
      width: 41,
      height: 71,
      borderRadius: 41,
      backgroundColor: 'rgba(101, 104, 235, 0.1)',
      position: 'absolute',
      transform: [
        {
          translateX: withSpring(selectedPosition, {
            damping: 15,
            stiffness: 100,
            mass: 1,
          }),
        },
      ],
    };
  });

  return <Animated.View style={animationStyle} />;
};

export default SelectionIndicator;
