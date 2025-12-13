import React from 'react';

import { View } from 'react-native';

import {
  AppInfoSection,
  MypageHeader,
  OtherSection,
  ProfileSection,
  QuickMenuSection,
} from '@/features/mypage/main/components';
import { useMypageMainService } from '@/features/mypage/main/hooks/mypageMainService';

const MypageMain = () => {
  const {
    univ,
    navigation,
    handleAccountManagePress,
    handlePrivacyPress,
    handleRulesPress,
    handleScrabPress,
    handleTermsPress,
  } = useMypageMainService();

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
