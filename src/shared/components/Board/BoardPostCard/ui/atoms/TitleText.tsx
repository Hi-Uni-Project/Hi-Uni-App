import React from 'react';

import { Text } from 'react-native';

interface Props {
  title: string;
}

const TitleText = ({ title }: Props) => {
  return (
    <Text
      className="font-semibold text-surface-900 typo-body-16-bold"
      numberOfLines={1}
      ellipsizeMode="tail">
      {title}
    </Text>
  );
};

export default TitleText;
