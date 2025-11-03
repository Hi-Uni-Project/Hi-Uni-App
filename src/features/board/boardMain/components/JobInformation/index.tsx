import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import CategoryChipList from '@/features/board/boardMain/components/CategoryChipList/CategoryChipList';
import PopularJobInfoReview from '@/features/board/boardMain/components/PopularJobInfoReview';
import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';

const JobInformationScreen = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const categories = [
    '전체',
    '취업',
    '인턴십',
    '면접',
    '실무이야기',
    '자격증 후기',
  ];
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);

  return (
    <>
      <CategoryChipList
        categories={categories}
        selectedCategoryIdx={selectedCategoryIdx}
        setSelectedCategoryIdx={setSelectedCategoryIdx}
      />
      <PopularJobInfoReview
        onPress={() =>
          navigation.navigate('BoardRoute', { screen: 'PopularReviews' })
        }
      />
    </>
  );
};

export default JobInformationScreen;
