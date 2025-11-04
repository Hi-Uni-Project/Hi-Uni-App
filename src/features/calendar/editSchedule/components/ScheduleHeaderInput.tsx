import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useCategorySelector from '../hooks/useCategorySelector';
import useCalendarScheduleStore from '../stores/useCalendarScheduleStore';

import CategorySelector from './CategorySelector';

import { Category } from '@/shared/types/categoryType';
import HUInput from '@/shared/ui/atoms/HUInput';

const ScheduleHeaderInput = () => {
  const insets = useSafeAreaInsets();

  const storeDetail = useCalendarScheduleStore(
    state => state.scheduleData.detail,
  );
  const storeUpdateScheduleField = useCalendarScheduleStore(
    state => state.updateScheduleField,
  );
  const storeInitialCategory = useCalendarScheduleStore(
    state => state.initialData.category,
  );

  const { categories } = useCategorySelector();

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  useEffect(() => {
    storeUpdateScheduleField('category', currentCategory);
    storeInitialCategory && setCurrentCategory(storeInitialCategory);
  }, [currentCategory, storeInitialCategory]);

  return (
    <View style={{ marginTop: insets.top }}>
      <View className="flex-row pt-3">
        <HUInput
          leftComponent={
            <CategorySelector
              categories={categories}
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
            />
          }
          value={storeDetail}
          onChangeText={text => storeUpdateScheduleField('detail', text)}
          placeholder="일정명을 입력해주세요."
          variant="calendarSchedule"
          className="text-main-text typo-sub-title-20-semibold"
        />
      </View>
    </View>
  );
};

export default ScheduleHeaderInput;
