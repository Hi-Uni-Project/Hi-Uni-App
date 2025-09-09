import React from 'react';

import { ScrollView } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import NextUpdateTemplate from '@/features/home/components/NextUpdateTemplate';
import DynamicCTABanner from '@/features/home/DynamicCTABanner/components/DynamicCTABanner';
import ScheduleWidget from '@/features/home/ScheduleWidget/components/ScheduleWidget';
import UnivMajorBadge from '@/features/home/UnivMajorBadge/components/UnivMajorBadge';
import HotPostsWidget from '@/features/home/WeeklyHotPosts/components/HotPostsWidget';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';

const HomeScreen = () => {
  return (
    <ScreenLayout className="bg-[#F9F9F9]">
      <ScrollView>
        <UnivMajorBadge
          univName="제주대학교"
          majorName="산업디자인학과 20학번"
        />
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
      </ScrollView>
    </ScreenLayout>
  );
};

export default HomeScreen;
