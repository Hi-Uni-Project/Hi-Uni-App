import React from 'react';

import { View, Text, Pressable } from 'react-native';

import CoverLetterList from '@/features/record/coverLetterList/components/CoverLetterList';
import PlusIcon from '@/static/icons/add.svg';

interface Props {
  coverLetters: { question: string; answer: string }[];
  isExist: boolean;
}

const CoverLetterSection = ({ coverLetters, isExist }: Props) => {
  return (
    <View className="w-full">
      <View className="mt-[42px] flex-row items-center px-5">
        <Text className="text-main-text typo-sub-title-22-bold">
          내 자기소개서
        </Text>
      </View>

      {!isExist && (
        <View className="items-start px-5">
          <Text className="mt-[18px] text-surface-400 typo-body-16-medium">
            아직 작성한 자기소개서가 없어요.
          </Text>

          <Pressable className="mt-[15px] flex-row items-center rounded-full bg-primary-purple px-[27px] py-[14px]">
            <PlusIcon width={16} height={16} color="#DADADA" />
            <Text className="ml-[7px] text-surface-200 typo-body-17-semibold">
              새 자기소개서 작성하기
            </Text>
          </Pressable>
        </View>
      )}

      {isExist && (
        <View className="mt-[18px]">
          <CoverLetterList coverLetters={coverLetters} />
        </View>
      )}
    </View>
  );
};

export default CoverLetterSection;
