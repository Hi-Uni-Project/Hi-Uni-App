import React, { ComponentProps, ReactNode } from 'react';

import { View, Text, Platform } from 'react-native';

interface HUBadgeProps extends ComponentProps<typeof View> {
  text: string;

  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;

  LeftSideComponent?: ReactNode;
  RightSideComponent?: ReactNode;
}

const HUBadge = ({
  text,
  borderColor,
  backgroundColor,
  textColor,
  LeftSideComponent,
  RightSideComponent,
}: HUBadgeProps) => {
  return (
    <View
      className="mb-[10px] flex-row items-center justify-center rounded-full px-2"
      style={{
        backgroundColor,
        borderColor,
        borderWidth: borderColor ? 1.5 : 0,
      }}>
      {LeftSideComponent}
      <Text
        className="typo-caption-12-regular px-[3px] py-2"
        style={{
          color: textColor,
          lineHeight: Platform.OS === 'android' ? 13 : undefined,
        }}
        numberOfLines={1}>
        {text}
      </Text>
      {RightSideComponent}
    </View>
  );
};

export default HUBadge;
