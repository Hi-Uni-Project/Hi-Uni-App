import React from 'react';

import { PanResponder, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useDerivedValue,
} from 'react-native-reanimated';

import CoverLetterCard from '../../coverLetter/components/CoverLetterCard';

import PaginationView from '@/screens/Onboarding/PaginationView';

interface CoverLetterListProps {
  coverLetters: { question: string; answer: string }[];
}

const CoverLetterList = ({ coverLetters }: CoverLetterListProps) => {
  // 각 카드의 위치 (x 좌표)
  const moveList = [-20, 263, 573, 883];

  const page = useSharedValue(0);

  // 컨테이너가 왼쪽으로 이동하기 때문에 음수 값 사용
  const translateX = useSharedValue(-moveList[0]);

  // 페이지 간 이동 거리 계산
  const firstMoveWidth = 283;
  const eachMoveWidth = 310;

  // 현재 슬라이드 위치를 나타내는 연속적인 값
  const progress = useDerivedValue(() => {
    'worklet';
    const offset = -translateX.value;

    // 값이 0 ~ 1 까지 이동함.
    if (offset <= firstMoveWidth) {
      return offset / firstMoveWidth;
    }

    // 2 페이지 이상부터
    return 1 + (offset - firstMoveWidth) / eachMoveWidth;
  });

  const moveToPage = (newPage: number) => {
    'worklet';
    // 0 과 마지막 페이지 사이로 제한
    const limiter = Math.max(0, Math.min(newPage, coverLetters.length - 1));
    translateX.value = withSpring(-moveList[limiter], {
      damping: 15,
      stiffness: 150,
    });
    page.value = limiter;
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dx) > 10,
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 30) {
        moveToPage(page.value - 1);
      } else if (gestureState.dx < -30) {
        moveToPage(page.value + 1);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <>
      <Animated.View
        className="h-[298px] flex-row"
        {...panResponder.panHandlers}
        style={animatedStyle}>
        {coverLetters.map((item, index) => (
          <View
            key={item.question}
            className="mr-4"
            style={{
              alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
            }}>
            <CoverLetterCard title={item.question} content={item.answer} />
          </View>
        ))}
      </Animated.View>

      <View className="mt-[20px] w-full flex-row items-center justify-center">
        <PaginationView progress={progress} data={coverLetters} />
      </View>
    </>
  );
};

export default CoverLetterList;
