import React, { useCallback } from 'react';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BoardFloatingButton from '@/features/board/boardMain/components/BoardFloatingButton';
import JobInformationScreen from '@/features/board/boardMain/components/JobInformation';
import NoPosts from '@/features/board/boardMain/components/NoPost';
import { useBoardCategory } from '@/features/board/boardMain/hooks/useBoardCategory';
import { useCategoryWeeklyHotQuery } from '@/features/board/boardMain/hooks/useWeeklyHotQuery';
import BoardHeader from '@/features/board/shared/components/BoardHeader';
import {
  getPostTypeByDisplayName,
  JOB_CATEGORY_CHIPS,
  PostCategory,
} from '@/features/board/shared/types/enum/postEnum';
import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';
import SortPostList from '@/shared/components/Board/SortPostList';
import { useSortBoard } from '@/shared/hooks/useSortBoard';
import Loading from '@/shared/ui/organisms/Loading';

const BoardScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MainStackNavigationProp>();

  const handleNavigation = () => {
    navigation.navigate('BoardRoute', { screen: 'BoardWrite' });
  };

  const {
    selectedSort,
    selectedSortLabel,
    setSelectedSort,
    sortSheetVisible,
    setSortSheetVisible,
    resetSort,
  } = useSortBoard();

  const {
    posts,
    isLoading,
    selectedCategoryIdx,
    setSelectedCategoryIdx,
    refetch: refetchPosts,
  } = useBoardCategory({
    selectedSort,
  });

  const selectedPostType = getPostTypeByDisplayName(
    JOB_CATEGORY_CHIPS[selectedCategoryIdx],
  );

  const {
    data: weeklyHotPosts = [],
    isLoading: isWeeklyHotLoading,
    refetch: refetchWeeklyHot,
  } = useCategoryWeeklyHotQuery(PostCategory.JOB_INFORMATION, selectedPostType);

  useFocusEffect(
    useCallback(() => {
      refetchPosts();
      refetchWeeklyHot();
    }, [refetchPosts, refetchWeeklyHot]),
  );

  return (
    <View className="flex-1">
      <BoardHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: insets.top + 110 }}>
          <JobInformationScreen
            resetSort={resetSort}
            selectedCategoryIdx={selectedCategoryIdx}
            setSelectedCategoryIdx={setSelectedCategoryIdx}
            weeklyHotPosts={weeklyHotPosts}
            isWeeklyHotLoading={isWeeklyHotLoading}
          />
        </View>

        {isLoading ? (
          <View className="min-h-[400px]">
            <Loading />
          </View>
        ) : posts.length > 0 ? (
          <View className="flex-1 px-5">
            <SortPostList
              scrollEnabled={false}
              vertical
              typeHide={selectedCategoryIdx === 0}
              classname=""
              selectedSortLabel={selectedSortLabel}
              setSelectedSort={setSelectedSort}
              setSortSheetVisible={setSortSheetVisible}
              sortSheetVisible={sortSheetVisible}
              data={posts}
              onPostPress={post =>
                navigation.navigate('BoardRoute', {
                  screen: 'BoardDetailPosts',
                  params: {
                    postId: post.id,
                    isReview: post.isReview,
                  },
                })
              }
            />
          </View>
        ) : (
          <NoPosts />
        )}
      </ScrollView>

      <BoardFloatingButton insets={insets} onPress={handleNavigation} />
    </View>
  );
};

export default BoardScreen;
