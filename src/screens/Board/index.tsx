import React, { useState } from 'react';

import { Text, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import JobInformationScreen from './JobInformation';

import BoardHeader from '@/features/board/shared/components/BoardHeader';
import { TabKey } from '@/features/board/shared/types/BoardUpperTab';

const BoardScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabKey>('notice');

  // 탭 콘텐츠 렌더링
  const renderContent = () => {
    switch (activeTab) {
      case 'notice':
        return <JobInformationScreen />;
      default:
        return <Text>애옹..</Text>;
    }
  };

  return (
    <View className="relative">
      <BoardHeader onTabPress={setActiveTab} />
      <ScrollView style={{ marginTop: insets.top + 110 }}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

export default BoardScreen;
