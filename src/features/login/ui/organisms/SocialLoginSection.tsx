import React from 'react';

import { View } from 'react-native';

import { SOCIAL_PROVIDERS } from '@/shared/constants/socialProvider';
import HUButton from '@/shared/ui/atoms/HUButton';

const SocialLoginSection = () => {
  return (
    <View className="w-full items-center gap-[7px] pb-11">
      {SOCIAL_PROVIDERS.map(provider => (
        <HUButton
          key={provider.id}
          variant={provider.id}
          text={provider.text}
          onPress={() => console.log(`${provider.id} login`)}
        />
      ))}
    </View>
  );
};
export default SocialLoginSection;
