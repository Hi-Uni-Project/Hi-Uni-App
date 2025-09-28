import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { useLoginService } from '../../hooks/useUserLogin';

import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';
import { SOCIAL_PROVIDERS } from '@/shared/constants/socialProvider';
import HUButton from '@/shared/ui/atoms/HUButton';

const SocialLoginSection = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { handleSocialLogin } = useLoginService(navigation);

  return (
    <View className="w-full items-center gap-[7px] pb-11">
      {SOCIAL_PROVIDERS.map(provider => (
        <HUButton
          key={provider.id}
          variant={provider.id}
          text={provider.text}
          onPress={() => handleSocialLogin(provider.id)}
        />
      ))}
    </View>
  );
};
export default SocialLoginSection;
