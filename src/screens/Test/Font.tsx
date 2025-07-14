import React from 'react';

import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Font = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="typo-title-26-bold">Prentendard Bold 26</Text>
      <Text className="typo-subtitle-18-medium">Prentendard Medium 18</Text>
      <Text className="typo-body-16-bold">Prentendard Bold 16</Text>
      <Text className="typo-body-16-regular">Prentendard Regular 16</Text>
      <Text className="typo-body-15-regular">Prentendard Regular 15</Text>
      <Text className="typo-body-14-semibold">Prentendard SemiBold 14</Text>
      <Text className="typo-body-13-light">Prentendard Light 13</Text>
      <Text className="typo-body-12-light">Prentendard Light 12</Text>
      <Text className="typo-error-14-medium">Prentendard Medium 14</Text>
      <Text className="typo-error-14-regular">Prentendard Regular 14</Text>
      <Text className="typo-button-18-semibold">Prentendard SemiBold 18</Text>
      <Text className="typo-button-16-semibold">Prentendard SemiBold 16</Text>
    </SafeAreaView>
  );
};

export default Font;
