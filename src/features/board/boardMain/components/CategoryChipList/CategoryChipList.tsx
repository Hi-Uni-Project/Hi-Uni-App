import React from 'react';

import { Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CategoryChip from './CategoryChip';

import { JOB_CATEGORY_CHIPS } from '@/features/board/shared/types/enum/postEnum';

interface Props {
  categories: typeof JOB_CATEGORY_CHIPS;
  selectedCategoryIdx: number;
  setSelectedCategoryIdx: (index: number) => void;
  resetSort: () => void;
}

const CategoryChipList = ({
  categories,
  selectedCategoryIdx,
  setSelectedCategoryIdx,
  resetSort,
}: Props) => {
  const handlePressedChip = (index: number) => {
    setSelectedCategoryIdx(index);
    resetSort();
  };

  return (
    <View>
      <ScrollView
        nestedScrollEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          Platform.OS === 'android' ? { paddingRight: 20 } : {}
        }
        className="flex-row px-4 py-[17px]">
        {categories.map((category, index) => (
          <CategoryChip
            key={category}
            text={category}
            isSelected={selectedCategoryIdx === index}
            onPress={() => handlePressedChip(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryChipList;
