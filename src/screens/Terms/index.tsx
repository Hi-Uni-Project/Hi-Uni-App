import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';

import useTerms from '../../features/terms/hooks/useTerms';

import RegisterDefaultLayout from '@/features/register/shared/components/layouts/RegisterDefaultLayout';
import RegisterHeader from '@/features/register/shared/components/layouts/RegisterHeader';
import TermsSection from '@/features/terms/components/TermsSection';
import { SignupStackNavigationProp } from '@/navigation/types/navigationTypes';
import HeaderWithBack from '@/shared/components/layouts/HeaderWithBack';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import HUButton from '@/shared/ui/atoms/HUButton';

const TermsScreen = () => {
  const navigation = useNavigation<SignupStackNavigationProp>();
  const { state, toggle, agreeAll, isValid } = useTerms();

  return (
    <ScreenLayout>
      <HeaderWithBack />
      <RegisterDefaultLayout>
        <RegisterHeader
          reverse
          main="설명 및 약관을 이해하였음을 확인합니다."
          sub={`계정을 만들기 위해
약관에 동의해주세요.`}
        />
        <ScrollView className="w-full px-9">
          <TermsSection state={state} toggle={toggle} agreeAll={agreeAll} />
        </ScrollView>
        <HUButton
          className="self-center"
          text="확인"
          disabled={!isValid}
          onPress={() => {
            navigation.navigate('Univ');
          }}
        />
      </RegisterDefaultLayout>
    </ScreenLayout>
  );
};

export default TermsScreen;
