import React from 'react';

import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useCategorySelector from '../hooks/useCategorySelector';

import CategorySelector from './CategorySelector';

import { Category } from '@/shared/types/categoryType';
import HUInput from '@/shared/ui/atoms/HUInput';

interface ScheduleHeaderProps {
  category: Category | null;
  updateCategory: (category: Category) => void;

  detail: string;
  updateDetail: (detail: string) => void;
}

const ScheduleHeaderInput = ({
  category,
  updateCategory,
  detail,
  updateDetail,
}: ScheduleHeaderProps) => {
  const insets = useSafeAreaInsets();

  const { categories } = useCategorySelector();

  return (
    <View style={{ marginTop: insets.top }}>
      <View className="flex-row pt-3">
        <HUInput
          leftComponent={
            <CategorySelector
              categories={categories}
              currentCategory={category}
              setCurrentCategory={updateCategory}
            />
          }
          value={detail}
          onChangeText={text => updateDetail(text)}
          placeholder="일정명을 입력해주세요."
          variant="calendarSchedule"
          className="text-main-text typo-sub-title-20-semibold"
        />
      </View>
    </View>
  );
};

export default ScheduleHeaderInput;
