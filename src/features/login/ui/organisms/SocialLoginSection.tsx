import React from 'react';

import { Pressable, View } from 'react-native';

import SocialButtons from '@/shared/components/SocialButtons';
import { PROVIDERS } from '@/shared/constants/socialProvider';

const SocialLoginSection = () => {
  return (
    <View className="w-full items-center pb-11" style={{ gap: 7 }}>
      {PROVIDERS.map(provider => {
        if (provider === 'kakao') {
          return (
            <Pressable
              key={provider}
              onPress={() => console.log(`${provider} login}`)}>
              <SocialButtons provider={provider} />
            </Pressable>
          );
        }
        return <SocialButtons key={provider} provider={provider} />;
      })}
    </View>
  );
};

export default SocialLoginSection;
