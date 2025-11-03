import React, { useState } from 'react';

import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BoardFloatingButton from '@/features/board/boardMain/components/BoardFloatingButton';
import JobInformationScreen from '@/features/board/boardMain/components/JobInformation';
import BoardHeader from '@/features/board/shared/components/BoardHeader';
import { TabKey } from '@/features/board/shared/types/BoardUpperTab';
import SortPostList from '@/shared/components/Board/SortPostList';
import { useSortBoard } from '@/shared/hooks/useSortBoard';
import { mockPosts } from '@/shared/lib/mock';

const BoardScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabKey>('jobInfo');

  const {
    selectedSortLabel,
    setSelectedSort,
    sortSheetVisible,
    setSortSheetVisible,
  } = useSortBoard();

  const renderContent = () => {
    switch (activeTab) {
      case 'jobInfo':
        return <JobInformationScreen />;
      default:
        return <Text>..</Text>;
    }
  };

  return (
    <View className="flex-1">
      <BoardHeader onTabPress={setActiveTab} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: insets.top + 110 }}>{renderContent()}</View>

        <View className="flex-1 px-5">
          <SortPostList
            classname=""
            scrollEnabled={false}
            vertical
            selectedSortLabel={selectedSortLabel}
            setSelectedSort={setSelectedSort}
            setSortSheetVisible={setSortSheetVisible}
            sortSheetVisible={sortSheetVisible}
            data={mockPosts}
            onPostPress={() => console.log('ss')}
          />
        </View>
      </ScrollView>

      <BoardFloatingButton insets={insets} />
    </View>
  );
};

export default BoardScreen;
