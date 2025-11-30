import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import { useCategoryWeeklyHotQuery } from '../../hooks/useWeeklyHotQuery';

import CategoryChipList from '@/features/board/boardMain/components/CategoryChipList/CategoryChipList';
import PopularJobInfoReview from '@/features/board/boardMain/components/PopularJobInfoReview';
import {
  getPostTypeByDisplayName,
  JOB_CATEGORY_CHIPS,
  PostCategory,
} from '@/features/board/shared/types/enum/postEnum';
import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';

interface Props {
  selectedCategoryIdx: number;
  setSelectedCategoryIdx: (index: number) => void;
  resetSort: () => void;
}

const JobInformationScreen = ({
  selectedCategoryIdx,
  setSelectedCategoryIdx,
  resetSort,
}: Props) => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const selectedPostType = getPostTypeByDisplayName(
    JOB_CATEGORY_CHIPS[selectedCategoryIdx],
  );

  const { data: posts = [], isLoading } = useCategoryWeeklyHotQuery(
    PostCategory.JOB_INFORMATION,
    selectedPostType,
  );

  return (
    <View>
      <CategoryChipList
        resetSort={resetSort}
        categories={JOB_CATEGORY_CHIPS}
        selectedCategoryIdx={selectedCategoryIdx}
        setSelectedCategoryIdx={setSelectedCategoryIdx}
      />

      {posts.length > 0 && (
        <PopularJobInfoReview
          isLoading={isLoading}
          posts={posts}
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
