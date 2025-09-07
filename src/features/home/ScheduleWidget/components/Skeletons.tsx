import React, { useEffect } from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  FadeOut,
} from 'react-native-reanimated';

const ScheduleListSkeleton = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.5, { duration: 500 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View className="p-4" exiting={FadeOut}>
      <Animated.View
        className="mb-[15px] h-4 rounded bg-gray-300"
        style={animatedStyle}
      />

      <Animated.View
        className="mb-2 h-6 rounded bg-gray-300"
        style={animatedStyle}
      />
      <Animated.View
        className="mb-2 h-6 w-3/4 rounded bg-gray-300"
        style={animatedStyle}
      />
      <Animated.View
        className="mb-2 h-6 w-1/2 rounded bg-gray-300"
        style={animatedStyle}
      />
    </Animated.View>
  );
};

const MiniCalendarSkeleton = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.5, { duration: 500 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View className="p-4" exiting={FadeOut}>
      <Animated.View
        className="h-[50px] w-[300px] rounded bg-gray-300"
        style={animatedStyle}
      />
      <Animated.View
        className="mt-2 h-[10px] w-[300px] rounded bg-gray-300"
        style={animatedStyle}
      />
    </Animated.View>
  );
};

export { ScheduleListSkeleton, MiniCalendarSkeleton };
