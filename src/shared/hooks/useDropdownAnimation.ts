import { Dispatch } from 'react';

import { ViewStyle } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const useDropdownAnimation = () => {
  const dropdownHeight = useSharedValue(0);
  const rotation = useSharedValue(0);
  const dimmed = useSharedValue(0);

  const animateRotateStyle = useAnimatedStyle<ViewStyle>(() => {
    const rotationDeg = interpolate(rotation.value, [0, 1], [0, 180]);

    return {
      transform: [
        {
          rotate: `${rotationDeg}deg`,
        },
      ],
    };
  });

  const animatedExpandStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      height: dropdownHeight.value,
    };
  });

  const animatedDimmedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: withTiming(dimmed.value, { duration: 300 }),
    };
  });

  const handleOpenAnimation = (dropdownListHeight: number) => {
    rotation.value = withTiming(1, {
      duration: 300,
    });

    dimmed.value = withTiming(1, { duration: 300 });

    dropdownHeight.value = withTiming(dropdownListHeight, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const handleCloseAnimation = (callback: Dispatch<boolean>) => {
    rotation.value = withTiming(0, {
      duration: 300,
    });

    dimmed.value = withTiming(0, { duration: 300 });

    dropdownHeight.value = withTiming(0, {}, () => {
      runOnJS(callback)(false);
    });
  };

  return {
    animateRotateStyle,
    animatedExpandStyle,
    animatedDimmedStyle,
    handleOpenAnimation,
    handleCloseAnimation,
  };
};

export default useDropdownAnimation;
