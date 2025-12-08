import React from 'react';

import { View, Text } from 'react-native';

import { Post } from '../types';

interface Props {
  post: Post;
}

const PostDetailContent = ({ post }: Props) => {
  return (
    <View>
      <View className="mb-3 flex-row items-center">
        <View className="mr-3 h-10 w-10 rounded-full bg-surface-300" />
        <View>
          <Text className="text-main-text typo-body-15-semibold">익명</Text>
          <Text className="text-surface-500 typo-caption-13-light">
            {post.school} · {post.date}
          </Text>
        </View>
      </View>

      <Text className="mb-4 text-main-text typo-sub-title-20-semibold">
        {post.title}
      </Text>

      <Text className="mb-6 leading-6 text-main-text typo-body-15-regular-post-detail">
        {post.content}
      </Text>
    </View>
  );
};

export default PostDetailContent;
