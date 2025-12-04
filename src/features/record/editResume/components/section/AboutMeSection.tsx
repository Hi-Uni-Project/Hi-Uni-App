import React from 'react';

import { Pressable, Text, TextInput, View } from 'react-native';

import InfoIcon from '@/static/icons/info.svg';

interface AboutMeSectionProps {
  aboutMe: string;
  onAboutMeChange: (text: string) => void;
}

const AboutMeSection = ({ aboutMe, onAboutMeChange }: AboutMeSectionProps) => {
  return (
    <View className="mt-6 px-5">
      <View className="flex-row items-center justify-between">
        <Text className="typo-body-17-semibold">내 소개</Text>
        <View className="flex-row items-center">
          <Pressable>
            <InfoIcon color="#B7B7B7" width={26} height={26} />
          </Pressable>
          <Pressable className="ml-[5px]">
            <View className="flex-row items-center rounded-full bg-primary-purple px-4 py-2">
              <Text className="text-surface-200 typo-body-15-medium">
                AI 내 소개 생성 (5/5)
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <TextInput
        className="mt-[9px] min-h-[120px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
        placeholder="나를 어필할 수 있는 소개를 작성해보세요! (최대 800자)"
        placeholderTextColor={'#B7B7B7'}
        value={aboutMe}
        textAlignVertical="top"
        onChangeText={onAboutMeChange}
        maxLength={800}
        multiline={true}
        numberOfLines={4}
      />
    </View>
  );
};

export default AboutMeSection;
