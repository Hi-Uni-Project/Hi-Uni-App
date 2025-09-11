import React from 'react';

import Animated from 'react-native-reanimated';
import Svg, { Rect, Path } from 'react-native-svg';

import useSvgAnimatedProps from '@/shared/hooks/useSvgAnimatedProps';

interface TabCalendarIconProps {
  width?: number;
  height?: number;
  isSelected?: boolean;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

const TabCalendarIcon = ({
  width = 44,
  height = 60,
  isSelected = false,
}: TabCalendarIconProps) => {
  const { useAnimatedFillProps, useAnimatedStrokeProps } =
    useSvgAnimatedProps(isSelected);

  return (
    <Animated.View>
      <Svg width={width} height={height} viewBox="0 0 44 60">
        <AnimatedRect
          x="12"
          y="15"
          width="20"
          height="17"
          rx="2"
          strokeWidth="2"
          animatedProps={useAnimatedStrokeProps('#6568EB', '#B7B7B7')}
          fill="white"
        />
        <AnimatedPath
          animatedProps={useAnimatedFillProps('#6568EB', '#B7B7B7')}
          d="M12 19C12 17.1144 12 16.1716 12.5858 15.5858C13.1716 15 14.1144 15 16 15H28C29.8856 15 30.8284 15 31.4142 15.5858C32 16.1716 32 17.1144 32 19V23H12V19Z"
        />
        <AnimatedPath
          d="M17 12L17 15"
          strokeWidth="2"
          strokeLinecap="round"
          animatedProps={useAnimatedStrokeProps('#6568EB', '#B7B7B7')}
        />
        <AnimatedPath
          d="M27 12L27 15"
          strokeWidth="2"
          strokeLinecap="round"
          animatedProps={useAnimatedStrokeProps('#6568EB', '#B7B7B7')}
        />
        <AnimatedPath
          d="M11.404 43.3516C11.3977 46.0684 10.0329 48.0171 6.97338 49.1533L6.44018 48.3027C7.91918 47.7695 8.92211 47.0649 9.52514 46.189L6.57982 46.5127L6.40209 45.5352L9.97582 45.3193C10.0901 45.002 10.1663 44.6719 10.2043 44.3291H6.9226V43.3516H11.404ZM8.39525 50.0801V49.1279H16.0251V51.9082H9.614V52.9873H16.4568V53.9395H8.42064V51.0195H14.8445V50.0801H8.39525ZM12.3689 48.5693V42.9199H13.5115V45.2305H14.8826V42.7168H16.0251V48.6455H14.8826V46.2207H13.5115V48.5693H12.3689ZM26.7212 42.7168V51.083H25.5278V42.7168H26.7212ZM17.8726 44.4688V43.5039H23.103V46.8936H19.0786V48.5312C21.167 48.5186 22.5952 48.4551 24.2837 48.1504L24.4106 49.1406C22.6206 49.4517 21.1099 49.5151 18.8501 49.5215H17.8979V45.9795H21.9097V44.4688H17.8726ZM19.2056 53.8379V50.4229H20.4116V52.8604H27.0386V53.8379H19.2056ZM34.053 43.7578V44.7607H30.054V50.3086C31.9646 50.2959 33.2659 50.2261 34.7639 49.9404L34.9036 50.9307C33.2659 51.2417 31.8821 51.3115 29.7366 51.3115H28.8352V43.7578H34.053ZM33.4055 47.7695V46.7666H36.5667V42.7041H37.7727V54.1045H36.5667V47.7695H33.4055Z"
          animatedProps={useAnimatedFillProps('#6568EB', '#B7B7B7')}
        />
      </Svg>
    </Animated.View>
  );
};

export default TabCalendarIcon;
