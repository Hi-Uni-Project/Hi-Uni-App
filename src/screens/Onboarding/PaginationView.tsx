import React from 'react';

import { View } from 'react-native';
import { Extrapolation, interpolate } from 'react-native-reanimated';
import { Pagination } from 'react-native-reanimated-carousel';

type Props = {
  progress: any;
  data: any[];
};

const PaginationView: React.FC<Props> = ({ progress, data }) => {
  return (
    <View>
      <Pagination.Custom
        progress={progress}
        data={data}
        size={20}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 50,
          backgroundColor: '#E4E4F4',
        }}
        activeDotStyle={{
          borderRadius: 50,
          width: 31,
          height: 10,
          overflow: 'hidden',
          backgroundColor: '#6568EB',
        }}
        containerStyle={{
          gap: 10,
          alignItems: 'center',
        }}
        horizontal
        customReanimatedStyle={(p: number, index: number, length: number) => {
          let val = Math.abs(p - index);
          if (index === 0 && p > length - 1) {
            val = Math.abs(p - length);
          }

          return {
            transform: [
              {
                translateY: interpolate(
                  val,
                  [0, 1],
                  [0, 0],
                  Extrapolation.CLAMP,
                ),
              },
            ],
          };
        }}
      />
    </View>
  );
};

export default PaginationView;
