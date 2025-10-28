import React, { useState } from 'react';

import { Text, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import JobInformationScreen from '@/features/board/boardMain/components/JobInformation';
import BoardHeader from '@/features/board/shared/components/BoardHeader';
import { TabKey } from '@/features/board/shared/types/BoardUpperTab';

const BoardScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabKey>('jobInfo');

  const renderContent = () => {
    switch (activeTab) {
      case 'jobInfo':
        return <JobInformationScreen />;
      default:
        return <Text>..</Text>;
    }
  };

  return (
    <View className="relative">
      <BoardHeader onTabPress={setActiveTab} />
      <ScrollView style={{ marginTop: insets.top + 110 }}>
        {renderContent()}
        <View className="h-[1000px]" />
      </ScrollView>
    </View>
  );
};

export default BoardScreen;
