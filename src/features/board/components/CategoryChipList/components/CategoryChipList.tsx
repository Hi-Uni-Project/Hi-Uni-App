import React from 'react';

import { Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CategoryChip from './CategoryChip';

interface CategoryChipListProps {
  categories: string[];
  selectedCategoryIdx: number;
  setSelectedCategoryIdx: (index: number) => void;
}

const CategoryChipList = ({
  categories,
  selectedCategoryIdx,
  setSelectedCategoryIdx,
}: CategoryChipListProps) => {
  return (
    <View>
      <ScrollView
        nestedScrollEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          Platform.OS === 'android' ? { paddingRight: 20 } : {}
        }
        className="flex-row px-5 py-[17px]">
        {categories.map((category, index) => (
          <CategoryChip
            key={category}
            text={category}
            isSelected={selectedCategoryIdx === index}
            onPress={() => setSelectedCategoryIdx(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryChipList;
