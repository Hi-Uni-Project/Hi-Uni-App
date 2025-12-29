import React from 'react';

import { Platform, ScrollView, View } from 'react-native';

import AppInfoSection from '@/features/mypage/main/components/AppInfoSection.tsx';
import MypageHeader from '@/features/mypage/main/components/MypageHeader';
import OtherSection from '@/features/mypage/main/components/OtherSection';
import ProfileSection from '@/features/mypage/main/components/ProfileSection';
import QuickMenuSection from '@/features/mypage/main/components/QuickMenuSection';
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
    <ScrollView
      className="flex-1 bg-surface-50"
      scrollEnabled={Platform.OS === 'ios' ? false : true}>
      <MypageHeader
        title="마이페이지"
        onBackPress={() => navigation.goBack()}
      />

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
    </ScrollView>
  );
};

export default MypageMain;
