import React from 'react';

import { Pressable, View } from 'react-native';

import CategoryBadges from './CategoryBadges';
import PostActions from './PostActions';
import PostContent from './PostContent';
import PostMetadata from './PostMetadata';

import { Post } from '@/features/board/shared/types/DefaultPostType';

interface Props extends Post {
  onPress?: () => void;
  vertical?: boolean;
}

const BoardPostCardMD = ({ vertical = false, onPress, ...post }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-[15px] border border-surface-200 bg-white px-4 pb-2 pt-4 shadow-sm">
      {!vertical && (
        <CategoryBadges category={post.category} type={post.type} />
      )}
      <View className="mb-3 px-1">
        <PostContent
          title={post.title}
          content={post.content}
          type={post.type}
          vertical={vertical}
        />

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

export default BoardPostCardMD;
