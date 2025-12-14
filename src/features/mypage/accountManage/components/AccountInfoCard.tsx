import React from 'react';

import { View, Text } from 'react-native';

import { SocialTypes } from '@/features/login/types';
import SocialProviderIcons from '@/shared/icons/SocialProviderIcons';

interface Props {
  socialTypes: SocialTypes;
  email: string;
}

const AccountInfoCard = ({ socialTypes, email }: Props) => (
  <View className="px-4">
    <View className="mb-2 rounded-[15px] border border-surface-200 bg-white py-2">
      <View className="px-4 py-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-main-text typo-body-16-semibold">내 계정</Text>

          <View className="flex-row items-center space-x-2">
            <SocialProviderIcons socialTypes={socialTypes} />
            <Text className="ml-2 text-surface-500 typo-body-15-regular">
              {email}
            </Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default AccountInfoCard;
