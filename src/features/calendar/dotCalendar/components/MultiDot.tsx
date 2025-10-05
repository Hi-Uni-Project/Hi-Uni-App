import React from 'react';

import { View } from 'react-native';

interface MultiDotProps {
  count: number;
  size?: number;
  color?: string;
  spacing?: number;
}

const MultiDot = ({
  count,
  size = 5,
  color = '#DADADA',
  spacing = 2,
}: MultiDotProps) => {
  return (
    <View
      style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 2 }}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            marginHorizontal: spacing / 2,
          }}
        />
      ))}
    </View>
  );
};

export default MultiDot;
