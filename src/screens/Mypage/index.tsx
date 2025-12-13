import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import {
  AppInfoSection,
  MypageHeader,
  OtherSection,
  ProfileSection,
  QuickMenuSection,
} from '@/features/mypage/main/components';
import { MypageStackNavigationProp } from '@/navigation/types/navigationTypes';
import { useRegisterStore } from '@/shared/stores/register';

const MypageMain = () => {
  const navigation = useNavigation<MypageStackNavigationProp>();
  const { univ } = useRegisterStore();

  const handleScrabPress = () => navigation.navigate('MyScrab');
  const handleAccountManagePress = () => navigation.navigate('AccountManage');
  const handleTermsPress = () => console.log('노션 링킹');
  const handleRulesPress = () => console.log('노션 링킹');
  const handlePrivacyPress = () => console.log('노션 링킹');

  return (
    <View className="flex-1 bg-surface-100">
      <MypageHeader onBackPress={() => navigation.goBack()} />

      <View className="flex-1">
        <ProfileSection
          univName={univ.univName}
          firstMajorName={univ.firstMajorName}
          secondMajorName={univ.secondMajorName}
        />

        <QuickMenuSection onScrabPress={handleScrabPress} />

        <AppInfoSection
          onTermsPress={handleTermsPress}
          onRulesPress={handleRulesPress}
          onPrivacyPress={handlePrivacyPress}
          appVersion="1.0.0.1"
        />

        <OtherSection onAccountManagePress={handleAccountManagePress} />
      </View>
    </View>
  );
};

export default MypageMain;
