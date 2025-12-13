import React from 'react';

import { View } from 'react-native';

import { MenuItem } from './MenuItem';
import { SectionTitle } from './SectionTitle';

interface Props {
  onTermsPress: () => void;
  onRulesPress: () => void;
  onPrivacyPress: () => void;
  appVersion: string;
}

export const AppInfoSection = ({
  onTermsPress,
  onRulesPress,
  onPrivacyPress,
  appVersion,
}: Props) => (
  <View className="px-4">
    <View className="mb-2 rounded-[20px] border border-surface-200 bg-white py-1">
      <SectionTitle title="앱 정보" />
      <MenuItem label="서비스 이용약관" onPress={onTermsPress} />
      <MenuItem label="커뮤니티 이용규칙" onPress={onRulesPress} />
      <MenuItem label="개인정보 처리방침" onPress={onPrivacyPress} />
      <MenuItem
        label="앱 버전"
        onPress={() => {}}
        rightText={appVersion}
        icon={undefined}
      />
    </View>
  </View>
);
