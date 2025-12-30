import React from 'react';

import { Pressable, View } from 'react-native';

import CategoryBadges from '../ui/atoms/CategoryBadges';
import PostActions from '../ui/organisms/PostActions';
import PostContent from '../ui/organisms/PostContent';
import PostMetadata from '../ui/organisms/PostMetadata';

import { Post } from '@/features/board/shared/types/DefaultPostType';

interface Props extends Post {
  onPress?: () => void;
  vertical?: boolean;
  typeHide?: boolean;
  makeInfoHide: boolean;
}

const BoardPostCardMD = ({
  vertical,
  typeHide,
  onPress,
  makeInfoHide,
  ...post
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-[15px] border border-surface-200 bg-white px-5 pb-2 pt-4 shadow-sm">
      {!vertical && (
        <CategoryBadges category={post.category} type={post.type} />
      )}
      <View className="mb-3 px-1">
        <PostContent
          typeHide={typeHide}
          title={post.title}
          content={post.content}
          type={post.type}
          vertical={vertical}
        />

        {!makeInfoHide && (
          <PostMetadata
            firstMajorName={post.firstMajorName}
            secondMajorName={post.secondMajorName}
            createdAt={post.createdAt}
          />
        )}

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
