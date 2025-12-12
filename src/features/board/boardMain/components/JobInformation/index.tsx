import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import CategoryChipList from '@/features/board/boardMain/components/CategoryChipList/CategoryChipList';
import PopularJobInfoReview from '@/features/board/boardMain/components/PopularJobInfoReview';
import { Post } from '@/features/board/shared/types/DefaultPostType';
import { JOB_CATEGORY_CHIPS } from '@/features/board/shared/types/enum/postEnum';
import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';

interface Props {
  selectedCategoryIdx: number;
  setSelectedCategoryIdx: (index: number) => void;
  resetSort: () => void;
  weeklyHotPosts: Post[];
  isWeeklyHotLoading: boolean;
}

const JobInformationScreen = ({
  selectedCategoryIdx,
  setSelectedCategoryIdx,
  resetSort,
  weeklyHotPosts,
  isWeeklyHotLoading,
}: Props) => {
  const navigation = useNavigation<MainStackNavigationProp>();

  return (
    <View>
      <CategoryChipList
        resetSort={resetSort}
        categories={JOB_CATEGORY_CHIPS}
        selectedCategoryIdx={selectedCategoryIdx}
        setSelectedCategoryIdx={setSelectedCategoryIdx}
      />

      {weeklyHotPosts.length > 0 && (
        <PopularJobInfoReview
          isLoading={isWeeklyHotLoading}
          posts={weeklyHotPosts}
          title={JOB_CATEGORY_CHIPS[selectedCategoryIdx]}
          onPress={() =>
            navigation.navigate('BoardRoute', {
              screen: 'PopularReviews',
              params: {
                title: JOB_CATEGORY_CHIPS[selectedCategoryIdx],
              },
            })
          }
        />
      )}
    </View>
  );
};

export default JobInformationScreen;
