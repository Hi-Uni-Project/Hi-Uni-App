import React from 'react';

import { View, Text } from 'react-native';

import BoardActionIcons from '@/shared/icons/BoardActionIcons';

interface Props {
  likeCount: number;
  commentCount: number;
  bookmarkCount?: number;
}

const PostActions = ({ likeCount, commentCount, bookmarkCount }: Props) => {
  return (
    <View className="-mb-2 mr-1.5 mt-1.5 flex-row space-x-2.5">
      <View className="flex-row items-center space-x-[2px]">
        <BoardActionIcons action="like" />
        <Text className="text-error-red typo-caption-13-medium">
          {likeCount}
        </Text>
      </View>

      <View className="flex-row items-center space-x-[2px]">
        <BoardActionIcons action="comment" />
        <Text className="text-primary-purple typo-caption-13-medium">
          {commentCount}
        </Text>
      </View>

      {bookmarkCount && bookmarkCount > 0 && (
        <View className="flex-row items-center space-x-[2px]">
          <BoardActionIcons action="scrab" />
          <Text className="text-tertiary-yellow typo-caption-13-medium">
            {bookmarkCount}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PostActions;
