import React from 'react';

import { View, Text } from 'react-native';

interface Props {
  title: string;
}

const SectionTitle = ({ title }: Props) => (
  <View className="-mb-2 px-3 py-3">
    <Text className="text-main-text typo-body-16-semibold">{title}</Text>
  </View>
);

export default SectionTitle;
