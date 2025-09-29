import React from 'react';

import { ScrollView } from 'react-native';

import useTerms from '../../features/terms/hooks/useTerms';

import RegisterDefaultLayout from '@/features/register/shared/components/layouts/RegisterDefaultLayout';
import RegisterHeader from '@/features/register/shared/components/layouts/RegisterHeader';
import TermsSection from '@/features/terms/components/TermsSection';
import HeaderWithBack from '@/shared/components/layouts/HeaderWithBack';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import HUButton from '@/shared/ui/atoms/HUButton';

const TermsScreen = () => {
  const { state, toggle, agreeAll, isValid } = useTerms();

  // const testApi = async () => {
  //   const response = await axiosInstance.post('/tos/agree', {
  //     serviceTosIsAgreed: true,
  //     personalInfoTosIsAgreed: true,
  //     marketingTosIsAgreed: true,
  //     serviceImprovementTosIsAgreed: true,
  //     inPersonTosIsAgreed: false,
  //   });

  //   return response.data;
  // };

  // const handleTest = async () => {
  //   try {
  //     const response = await testApi();

  //     console.log(response);
  //   } catch (err) {
  //     console.error('인증실패: ', err);
  //   }
  // };

  // handleTest();

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
            // 네비게이션
          }}
        />
      </RegisterDefaultLayout>
    </ScreenLayout>
  );
};

export default TermsScreen;
