import React from 'react';

import Animated, { LinearTransition } from 'react-native-reanimated';

import DynamicCTABanner from '@/features/home/dynamicCTABanner/components/DynamicCTABanner';
import NextUpdateTemplate from '@/features/home/nextUpdateTemplate/components/NextUpdateTemplate';
import ScheduleWidget from '@/features/home/scheduleWidget/components/ScheduleWidget';
import HomeScrollLayout from '@/features/home/shared/layouts/HomeScrollLayout';
import UnivMajorBadge from '@/features/home/univMajorBadge/components/UnivMajorBadge';
import HotPostsWidget from '@/features/home/weeklyHotPosts/components/HotPostsWidget';
import { useRegisterStore } from '@/shared/stores/register';

const HomeScreen = () => {
  const { univ } = useRegisterStore();

  return (
    <HomeScrollLayout>
      <UnivMajorBadge univ={univ} />
      <DynamicCTABanner
        visible
        onSharedPress={() => {
          console.log('공유 페이지 네비게이션');
        }}
      />
      <ScheduleWidget />
      <HotPostsWidget />
      <Animated.View
        style={{ rowGap: 38, marginTop: 38, marginBottom: 20 }}
        layout={LinearTransition}>
        <NextUpdateTemplate title="대외활동" />

        <NextUpdateTemplate title="인턴십" />

        <NextUpdateTemplate title="채용공고" />
      </Animated.View>
    </HomeScrollLayout>
  );
};

export default HomeScreen;
