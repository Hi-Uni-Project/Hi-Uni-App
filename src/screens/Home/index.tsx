import React, { useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { SortType } from '@/features/board/shared/types/enum/sortEnum';
import NextUpdateTemplate from '@/features/home/nextUpdateTemplate/components/NextUpdateTemplate';
import ScheduleWidget from '@/features/home/scheduleWidget/components/ScheduleWidget';
import HomeScrollLayout from '@/features/home/shared/layouts/HomeScrollLayout';
import UnivMajorBadge from '@/features/home/univMajorBadge/components/UnivMajorBadge';
import HotPostsWidget from '@/features/home/weeklyHotPosts/components/HotPostsWidget';
import { useWeeklyHotPostsWidget } from '@/shared/hooks/useBoardQuery';
import { useRegisterStore } from '@/shared/stores/register';

const HomeScreen = () => {
  const { univ } = useRegisterStore();
  const {
    data: hotPosts = [],
    isLoading,
    refetch,
  } = useWeeklyHotPostsWidget(SortType.LIKE);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <HomeScrollLayout>
      <UnivMajorBadge univ={univ} />
      {/* 개발 중간 기능 */}
      {/* <DynamicCTABanner
        visible
        onSharedPress={() => {
          console.log('공유 페이지 네비게이션');
        }}
      /> */}
      <ScheduleWidget />
      <HotPostsWidget hotPosts={hotPosts} isLoading={isLoading} />
      <Animated.View
        style={{ rowGap: 38, marginTop: 38, marginBottom: 20 }}
        layout={LinearTransition}>
        {/* 개발 중간 기능 */}
        <NextUpdateTemplate title="대외활동" />

        <NextUpdateTemplate title="인턴십" />

        <NextUpdateTemplate title="채용공고" />
      </Animated.View>
    </HomeScrollLayout>
  );
};

export default HomeScreen;
