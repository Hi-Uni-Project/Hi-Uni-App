import React from 'react';

import { View, Text, Pressable } from 'react-native';

import BoardActionIcons from '@/shared/icons/BoardActionIcons';

interface Props {
  category1: string;
  category2: string;
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

const BoardPostCardMD = ({
  category1,
  category2,
  title,
  content,
  author,
  major,
  time,
  likes,
  comments,
  onPress,
  scrab,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-[15px] border border-surface-200 bg-white px-4 pb-2 pt-4 shadow-sm">
      {/* 카테고리 */}
      <View className="mb-2 flex-row gap-1.5">
        <Text className="rounded-[20px] bg-surface-200 px-[11px] py-[5px] text-surface-500 typo-caption-14-regular">
          {category1}
        </Text>
        <Text className="rounded-[20px] bg-surface-200 px-[11px] py-[5px] text-surface-500 typo-caption-14-regular">
          {category2}
        </Text>
      </View>

      {/* 제목 + 내용 */}
      <View className="mb-3 px-1">
        <Text className="mb-[6px] font-semibold text-surface-900 typo-body-16-bold">
          {title}
        </Text>
        <Text
          className="mb-3.5 text-surface-600 typo-body-15-regular"
          numberOfLines={1}
          ellipsizeMode="tail">
          {content}
        </Text>

        {/* 작성자 + 학과 + 시간 / action */}
        <View className="flex-row items-center justify-between">
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
            {scrab && (
              <View className="flex-row items-center space-x-[2px]">
                <BoardActionIcons action="scrab" />
                <Text className="text-tertiary-yellow typo-caption-13-medium">
                  {scrab}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default BoardPostCardMD;
