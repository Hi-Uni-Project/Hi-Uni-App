import React, { useState } from 'react';

import { View } from 'react-native';

import CategoryChipList from '@/features/board/components/CategoryChipList/components/CategoryChipList';
import PopularJobInfoReview from '@/features/board/components/PopularJobInfoReview/components/PopularJobInfoReview';

const JobInformationScreen = () => {
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
    <View>
      <CategoryChipList
        categories={categories}
        selectedCategoryIdx={selectedCategoryIdx}
        setSelectedCategoryIdx={setSelectedCategoryIdx}
      />

      <PopularJobInfoReview />
    </View>
  );
};

export default JobInformationScreen;
