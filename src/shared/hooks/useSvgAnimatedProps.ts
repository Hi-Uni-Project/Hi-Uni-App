import { useEffect } from 'react';

import {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';

const useSvgAnimatedProps = (isSelected: boolean) => {
  const isSelectedShared = useSharedValue(isSelected ? 1 : 0);

  useEffect(() => {
    isSelectedShared.value = withTiming(isSelected ? 1 : 0, {
      duration: 300,
    });
  }, [isSelected]);

  const useCreateAnimatedColor = (
    selectedColor: string,
    unSelectedColor: string,
  ) => {
    return useDerivedValue(() => {
      return interpolateColor(
        isSelectedShared.value,
        [0, 1],
        [unSelectedColor, selectedColor],
      );
    });
  };

  const useAnimatedFillProps = (
    selectedColor: string,
    unSelectedColor: string,
  ) => {
    const animatedColor = useCreateAnimatedColor(
      selectedColor,
      unSelectedColor,
    );

    const animatedFillProps = useAnimatedProps(() => {
      return {
        fill: animatedColor.value,
      };
    }, []);

    return animatedFillProps;
  };

  const useAnimatedStrokeProps = (
    selectedColor: string,
    unSelectedColor: string,
  ) => {
    const animatedColor = useCreateAnimatedColor(
      selectedColor,
      unSelectedColor,
    );

    const animatedStrokeProps = useAnimatedProps(() => {
      return {
        stroke: animatedColor.value,
      };
    }, []);

    return animatedStrokeProps;
  };

  const useAnimatedStrokeFillProps = (
    selectedFillColor: string,
    unSelectedFillColor: string,
    selectedStrokeColor: string,
    unSelectedStrokeColor: string,
  ) => {
    const animatedFill = useCreateAnimatedColor(
      selectedFillColor,
      unSelectedFillColor,
    );

    const animatedStroke = useCreateAnimatedColor(
      selectedStrokeColor,
      unSelectedStrokeColor,
    );

    return useAnimatedProps(() => {
      return {
        fill: animatedFill.value,
        stroke: animatedStroke.value,
      };
    }, []);
  };

  return {
    useAnimatedFillProps,
    useAnimatedStrokeProps,
    useAnimatedStrokeFillProps,
  };
};

export default useSvgAnimatedProps;
