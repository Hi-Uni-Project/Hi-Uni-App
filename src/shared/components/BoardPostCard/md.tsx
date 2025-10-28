import React from 'react';

import { View, Text, Pressable } from 'react-native';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import {
  POST_CATEGORY_DISPLAY_NAME,
  POST_TYPE_DISPLAY_NAME,
} from '@/features/board/shared/types/enum/postEnum';
import BoardActionIcons from '@/shared/icons/BoardActionIcons';
import { formatDateOrTime, formatMajor } from '@/shared/utils/formatter';

interface Props extends Post {
  onPress?: () => void;
}

const BoardPostCardMD = ({ onPress, ...post }: Props) => {
  return (
    <Pressable
      id={post.id.toString()}
      onPress={onPress}
      className="rounded-[15px] border border-surface-200 bg-white px-4 pb-2 pt-4 shadow-sm">
      {/* 카테고리 + 타입 */}
      <View className="mb-2 flex-row gap-1.5">
        <Text className="rounded-[20px] bg-surface-200 px-[11px] py-[5px] text-surface-500 typo-caption-14-regular">
          {POST_CATEGORY_DISPLAY_NAME[post.category]}
        </Text>
        <Text className="rounded-[20px] bg-surface-200 px-[11px] py-[5px] text-surface-500 typo-caption-14-regular">
          {POST_TYPE_DISPLAY_NAME[post.type]}
        </Text>
      </View>

      {/* 제목 + 내용 */}
      <View className="mb-3 px-1">
        <Text className="mb-[6px] font-semibold text-surface-900 typo-body-16-bold">
          {post.title}
        </Text>
        <Text
          className="mb-3 text-surface-600 typo-body-15-regular"
          numberOfLines={1}
          ellipsizeMode="tail">
          {post.content}
        </Text>

        {/* 작성자 + 학과 + 시간 */}
        <View className="flex-col justify-between">
          <View className="flex-row space-x-1">
            <Text className="text-surface-500 typo-caption-13-light">익명</Text>
            <Text className="text-surface-500 typo-caption-13-light">
              · {formatMajor(post.firstMajorName, post.secondMajorName)}
            </Text>
            <Text className="text-surface-500 typo-caption-13-light">
              · {formatDateOrTime(post.createdAt)}
            </Text>
          </View>

          {/* action */}
          <View className="-mb-2 mr-1.5 mt-1.5 flex-row space-x-2.5">
            <View className="flex-row items-center space-x-[2px]">
              <BoardActionIcons action="like" />
              <Text className="text-error-red typo-caption-13-medium">
                {post.likeCount}
              </Text>
            </View>
            <View className="flex-row items-center space-x-[2px]">
              <BoardActionIcons action="comment" />
              <Text className="text-primary-purple typo-caption-13-medium">
                {post.commentCount}
              </Text>
            </View>
            {post.bookmarkCount && (
              <View className="flex-row items-center space-x-[2px]">
                <BoardActionIcons action="scrab" />
                <Text className="text-tertiary-yellow typo-caption-13-medium">
                  {post.bookmarkCount}
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
