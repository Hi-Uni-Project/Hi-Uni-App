import React from 'react';

import { View, Text, Pressable } from 'react-native';

import BoardActionIcons from '@/shared/icons/BoardActionIcons';

interface Props {
  company: string;
  period: string;
  position: string;
  jobType: string;
  title: string;
  content: string;
  author: string;
  major: string;
  time: string;
  likes: number;
  scrab?: number;
  comments: number;
  onPress?: () => void;
}

const BoardPostCardLG = ({
  company,
  period,
  position,
  jobType,
  title,
  content,
  author,
  major,
  time,
  likes,
  comments,
  onPress,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="relative h-[275px] w-[296px] justify-start rounded-[15px] border border-surface-200 bg-white px-[19px] pb-[20px] pt-[18px]">
      {/* 카테고리 + 직무 */}
      <View>
        <View className="mb-[9px] w-full flex-row items-center justify-between">
          <View className="flex-row gap-1.5">
            <Text className="rounded-[20px] bg-surface-100 px-[10px] py-[1px] text-primary-purple typo-caption-13-light">
              {company}
            </Text>
            <Text className="rounded-[20px] bg-surface-100 px-[10px] py-[1px] text-primary-purple typo-caption-13-light">
              {period}
            </Text>
            <Text className="rounded-[20px] bg-surface-100 px-[10px] py-[1px] text-primary-purple typo-caption-13-light">
              {position}
            </Text>
          </View>

          <Text className="text-surface-500 typo-caption-13-medium">
            {jobType}
          </Text>
        </View>
      </View>
      <Text className="mb-[18px] text-main-text typo-body-17-semibold">
        {title}
      </Text>

      {/* 제목 + 내용 */}
      <Text
        className="text-surface-700 typo-caption-14-regular"
        style={{ lineHeight: 24 }}
        numberOfLines={5}
        ellipsizeMode="tail">
        {content}
      </Text>

      {/* 작성자 + 학과 + 시간 / action */}
      <View className="flex-col justify-between">
        <View className="flex-row space-x-1">
          <Text className="text-surface-500 typo-caption-13-light">
            {author}
          </Text>
          <Text className="text-surface-500 typo-caption-13-light">
            · {major}
          </Text>
          <Text className="text-surface-500 typo-caption-13-light">
            · {time}
          </Text>
        </View>

        <View className="mr-1.5 flex-row space-x-2.5">
          <View className="flex-row items-center space-x-[2px]">
            <BoardActionIcons action="like" />
            <Text className="text-error-red typo-caption-13-medium">
              {likes}
            </Text>
          </View>
          <View className="flex-row items-center space-x-[2px]">
            <BoardActionIcons action="comment" />
            <Text className="text-primary-purple typo-caption-13-medium">
              {comments}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default BoardPostCardLG;
