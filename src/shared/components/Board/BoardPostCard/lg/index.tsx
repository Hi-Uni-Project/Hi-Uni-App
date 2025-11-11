import React from 'react';

import { View, Text, Pressable } from 'react-native';

import PostActions from '../ui/organisms/PostActions';
import PostMetadata from '../ui/organisms/PostMetadata';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import { POST_TYPE_DISPLAY_NAME } from '@/features/board/shared/types/enum/postEnum';
import { truncateText } from '@/shared/utils/text/truncateText';

interface Props extends Post {
  onPress?: () => void;
}

const BoardPostCardLG = ({ onPress, ...post }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="relative h-[275px] w-[296px] justify-between rounded-[15px] border border-surface-200 bg-white px-[19px] pb-[20px] pt-[18px]">
      <View>
        <View className="mb-5 flex-row items-center justify-between">
          <Text className="text-main-text typo-body-17-semibold">
            {truncateText(post.title, 15)}
          </Text>

          <Text className="text-surface-500 typo-caption-13-medium">
            {POST_TYPE_DISPLAY_NAME[post.type]}
          </Text>
        </View>

        <Text
          className="mb-4 flex-shrink text-surface-700 typo-caption-14-regular"
          style={{ lineHeight: 24 }}
          numberOfLines={5}
          ellipsizeMode="tail">
          {post.content}
        </Text>
      </View>

      <View className="mb-1">
        <PostMetadata
          firstMajorName={post.firstMajorName}
          secondMajorName={post.secondMajorName}
          createdAt={post.createdAt}
        />

        <PostActions
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          bookmarkCount={post.bookmarkCount}
        />
      </View>
    </Pressable>
  );
};

export default BoardPostCardLG;
