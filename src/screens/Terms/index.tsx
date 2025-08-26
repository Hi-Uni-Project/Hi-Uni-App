import React from 'react';

import { ScrollView, Text, View } from 'react-native';

import useTerms from '../../features/terms/hooks/useTerms';

import TermsSection from '@/features/terms/components/TermsSection';
import HeaderWithBack from '@/shared/components/layouts/HeaderWithBack';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import HUButton from '@/shared/ui/atoms/HUButton';

const TermsScreen = () => {
  const { state, toggle, agreeAll, isValid } = useTerms();

  return (
    <ScreenLayout>
      <HeaderWithBack />
      <View className="flex-1 items-center">
        <ScrollView className="w-full px-9">
          <Text className="typo-title-26-bold">
            {'계정을 만들기 위해\n약관에 동의해주세요.'}
          </Text>
          <Text className="mt-1 text-gray-600 typo-sub-title-18-medium">
            설명 및 약관을 이해하였음을 확인합니다.
          </Text>

          <TermsSection state={state} toggle={toggle} agreeAll={agreeAll} />
        </ScrollView>
        <HUButton
          text="확인"
          disabled={!isValid}
          onPress={() => {
            // 네비게이션
          }}
        />
      </View>
    </ScreenLayout>
  );
};

export default TermsScreen;
