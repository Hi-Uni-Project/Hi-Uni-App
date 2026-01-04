import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

import CoverLetterCard from '../../coverLetter/components/CoverLetterCard';
import { useCoverLetterCarousel } from '../hooks/useCoverLetterCarousel';

import PaginationView from '@/features/onboarding/components/PaginationView';
import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';

interface CoverLetterListProps {
  coverLetters: { question: string; answer: string }[];
}

const CoverLetterList = ({ coverLetters }: CoverLetterListProps) => {
  const { progress, panResponder, animatedStyle } = useCoverLetterCarousel({
    coverLetters,
  });

  const navigation = useNavigation<MainStackNavigationProp>();

  return (
    <>
      <Animated.View
        className="h-[298px] flex-row"
        {...panResponder.panHandlers}
        style={animatedStyle}>
        {coverLetters.map((item, index) => (
          <View
            key={index}
            className="mr-4"
            style={{
              alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
            }}>
            <Pressable
              onPress={() =>
                navigation.navigate('RecordRoute', {
                  screen: 'EditCoverLetter',
                  params: { coverLetterIdx: index },
                })
              }>
              <CoverLetterCard title={item.question} content={item.answer} />
            </Pressable>
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
