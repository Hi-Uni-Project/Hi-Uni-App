import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, Image } from 'react-native';

import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';
import PlusIcon from '@/static/icons/add.svg';
import ChevronRightIcon from '@/static/icons/right_chevron.svg';

interface Props {
  title?: string;
  imageUrl?: string;
  isExist: boolean;
}

const ResumeSection = ({ title, imageUrl, isExist }: Props) => {
  const navigation = useNavigation<MainStackNavigationProp>();

  return (
    <View className="w-full">
      <View className="mt-[50px] flex-row items-center px-5">
        <Text className="text-main-text typo-sub-title-22-bold">내 이력서</Text>

        {isExist && (
          <ChevronRightIcon
            height={14}
            width={8}
            color="#B7B7B7"
            className="ml-3"
          />
        )}
      </View>

      {!isExist && (
        <View className="items-start px-5">
          <Text className="mt-[18px] text-surface-400 typo-body-16-medium">
            아직 작성한 이력서가 없어요.
          </Text>

          <Pressable
            className="mt-[15px] flex-row items-center rounded-full bg-primary-purple px-[27px] py-[14px]"
            onPress={() =>
              navigation.navigate('RecordRoute', { screen: 'ResumeEdit' })
            }>
            <PlusIcon width={16} height={16} color="#DADADA" />
            <Text className="ml-[7px] text-surface-200 typo-body-17-semibold">
              새 이력서 작성하기
            </Text>
          </Pressable>
        </View>
      )}

      {isExist && (
        <Pressable
          className="relative mt-[18px] w-full px-5"
          onPress={() =>
            navigation.navigate('RecordRoute', { screen: 'ResumeEdit' })
          }>
          <View className="rounded-full bg-[#E4E4F4]">
            <Text className="my-[19px] ml-6 text-primary-purple typo-body-17-semibold">
              {title}
            </Text>
          </View>

          <Image
            source={{ uri: imageUrl }}
            resizeMode="cover"
            className="absolute right-[40px] top-[-29px] h-[72px] w-[72px] rounded-full border-2 border-white"
          />
        </Pressable>
      )}
    </View>
  );
};

export default ResumeSection;
