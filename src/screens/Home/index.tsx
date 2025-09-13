import React from 'react';

import Animated, { LinearTransition } from 'react-native-reanimated';

import DynamicCTABanner from '@/features/home/dynamicCTABanner/components/DynamicCTABanner';
import NextUpdateTemplate from '@/features/home/nextUpdateTemplate/components/NextUpdateTemplate';
import ScheduleWidget from '@/features/home/scheduleWidget/components/ScheduleWidget';
import UnivMajorBadge from '@/features/home/univMajorBadge/components/UnivMajorBadge';
import HotPostsWidget from '@/features/home/weeklyHotPosts/components/HotPostsWidget';
import HomeScrollLayout from '@/shared/components/layouts/HomeScrollLayout';

const HomeScreen = () => {
  return (
    <HomeScrollLayout>
      <UnivMajorBadge univName="제주대학교" majorName="산업디자인학과 20학번" />
      <DynamicCTABanner
        visible
        onSharedPress={() => {
          console.log('공유 페이지 네비게이션');
        }}
      />
      <ScheduleWidget />
      <HotPostsWidget />
      <Animated.View
        style={{ rowGap: 38, marginTop: 38 }}
        layout={LinearTransition}>
        <NextUpdateTemplate title="대외활동" />

        <NextUpdateTemplate title="인턴십" />

        <NextUpdateTemplate title="채용공고" />
      </Animated.View>
    </HomeScrollLayout>
  );
};

export default HomeScreen;
