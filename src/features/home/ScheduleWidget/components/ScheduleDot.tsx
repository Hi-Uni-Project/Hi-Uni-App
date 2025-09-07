import React from 'react';

import { View } from 'react-native';

interface ScheduleDotProps {}

const ScheduleDot = ({}: ScheduleDotProps) => {
  return (
    <View className="absolute bottom-[-4px] h-[10px] w-[10px] rounded-2xl bg-primary-purple" />
  );
};

export default ScheduleDot;
