import React from 'react';

import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import useSvgAnimatedProps from '@/shared/hooks/useSvgAnimatedProps';

interface TabRecordIconProps {
  width?: number;
  height?: number;
  isSelected?: boolean;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const TabRecordIcon = ({
  width = 44,
  height = 60,
  isSelected = false,
}: TabRecordIconProps) => {
  const { useAnimatedFillProps, useAnimatedStrokeFillProps } =
    useSvgAnimatedProps(isSelected);

  return (
    <Animated.View>
      <Svg width={width} height={height} viewBox="0 0 44 60" fill="none">
        <AnimatedPath
          d="M15.3077 32L15.1092 28.9638C14.5087 19.7795 21.7961 12 31 12V12L29.3537 13.2589C29.1764 13.3945 29.0878 13.4623 29.0046 13.5282C26.193 15.7583 24.5269 19.1297 24.4634 22.7178C24.4615 22.8239 24.4615 22.9355 24.4615 23.1587V23.1587C24.4615 23.3302 24.4615 23.416 24.4592 23.4843C24.3765 25.9039 22.1802 27.6959 19.7932 27.2914C19.7258 27.28 19.6418 27.2628 19.4738 27.2283L15.3077 26.375"
          strokeWidth="2"
          animatedProps={useAnimatedStrokeFillProps(
            '#6568EB',
            '#ffffff',
            '#6568EB',
            '#B7B7B7',
          )}
        />
        <AnimatedPath
          d="M14.6063 42.7041V54.0791H13.451V48.252H11.9911V53.4951H10.8612V42.9326H11.9911V47.2617H13.451V42.7041H14.6063ZM5.40221 51.1846V44.0498H6.60826V50.1245C7.65562 50.1118 8.80455 50.0293 10.0995 49.7754L10.2264 50.8291C8.6649 51.1084 7.36363 51.1909 6.13853 51.1846H5.40221ZM28.2162 42.7041V54.0791H26.9974V42.7041H28.2162ZM18.8724 51.0322C21.8939 49.5913 23.3729 47.541 23.6078 44.8877H19.4183V43.9229H24.8265C24.8265 47.2554 23.411 50.1372 19.5072 52.0098L18.8724 51.0322ZM40.131 48.9121V49.8896H29.7208V48.9121H34.3292V47.833H31.0538V44.9385H37.6173V43.9229H31.0285V42.9707H38.8234V45.8271H32.2472V46.8936H39.0519V47.833H35.5226V48.9121H40.131ZM30.8888 51.6543V50.6895H38.8869V53.9902H37.6681V51.6543H30.8888Z"
          animatedProps={useAnimatedFillProps('#6568EB', '#B7B7B7')}
        />
      </Svg>
    </Animated.View>
  );
};

export default TabRecordIcon;
