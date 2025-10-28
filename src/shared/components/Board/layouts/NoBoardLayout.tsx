import React from 'react';

import { View, Text } from 'react-native';

interface Props {
  des: string;
}

const NoBoardLayout = ({ des }: Props) => {
  return (
    <View className="h-[80%] items-center justify-center">
      <Text className="text-surface-400 typo-body-16-medium">
        {des} 없어요.
      </Text>
    </View>
  );
};

export default NoBoardLayout;
