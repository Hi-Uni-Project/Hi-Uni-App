import React from 'react';

import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BoardFloatingButton from '@/features/board/boardMain/components/BoardFloatingButton';
import JobInformationScreen from '@/features/board/boardMain/components/JobInformation';
import BoardHeader from '@/features/board/shared/components/BoardHeader';
import SortPostList from '@/shared/components/Board/SortPostList';
import { useSortBoard } from '@/shared/hooks/useSortBoard';
import { mockPosts } from '@/shared/lib/mock';

const BoardScreen = () => {
  const insets = useSafeAreaInsets();

  const {
    selectedSortLabel,
    setSelectedSort,
    sortSheetVisible,
    setSortSheetVisible,
  } = useSortBoard();

  return (
    <View className="flex-1">
      <BoardHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: insets.top + 110 }}>
          <JobInformationScreen />
        </View>

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
