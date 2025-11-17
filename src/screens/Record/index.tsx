import React from 'react';

import { Pressable, Text, View } from 'react-native';

import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import PlusIcon from '@/static/icons/add.svg';
import ChevronRightIcon from '@/static/icons/right_chevron.svg';

const RecordScreen = () => {
  const isResumeExist = false;
  const isCoverLetterExist = false;

  return (
    <ScreenLayout className="items-start px-5">
      <View className="mt-[50px] flex-row items-center">
        <Text className="text-main-text typo-sub-title-22-bold">내 이력서</Text>
        {isResumeExist && (
          <ChevronRightIcon height={14} color="#B7B7B7" className="ml-3" />
        )}
      </View>

      {!isResumeExist && (
        <>
          <Text className="mt-[18px] text-surface-400 typo-body-16-medium">
            아직 작성한 이력서가 없어요.
          </Text>

          <Pressable className="mt-[15px] flex-row items-center rounded-full bg-primary-purple px-[27px] py-[14px]">
            <PlusIcon width={16} height={16} color="#DADADA" />
            <Text className="ml-[7px] text-surface-200 typo-body-17-semibold">
              새 이력서 작성하기
            </Text>
          </Pressable>
        </>
      )}

      <View className="mt-[42px] flex-row items-center">
        <Text className="text-main-text typo-sub-title-22-bold">
          내 자기소개서
        </Text>
        {isCoverLetterExist && (
          <ChevronRightIcon height={14} color="#B7B7B7" className="ml-3" />
        )}
      </View>

      {!isCoverLetterExist && (
        <>
          <Text className="mt-[18px] text-surface-400 typo-body-16-medium">
            아직 작성한 자기소개서가 없어요.
          </Text>

          <Pressable className="mt-[15px] flex-row items-center rounded-full bg-primary-purple px-[27px] py-[14px]">
            <PlusIcon width={16} height={16} color="#DADADA" />
            <Text className="ml-[7px] text-surface-200 typo-body-17-semibold">
              새 자기소개서 작성하기
            </Text>
          </Pressable>
        </>
      )}
    </ScreenLayout>
  );
};

export default RecordScreen;
