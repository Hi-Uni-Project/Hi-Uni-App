import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';

import { Post } from '@/features/board/shared/types/DefaultPostType';
import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';
import { formatDateOrTime } from '@/shared/utils/formatter';
import CommentsIcon from '@/static/icons/comment.svg';
import ThumbsUpIcon from '@/static/icons/thumbs_up.svg';

interface Props {
  item: Post;
}

const HotPostWidgetItem = ({ item }: Props) => {
  const navigation = useNavigation<MainStackNavigationProp>();

  return (
    <View className="flex-row items-center justify-between p-4">
      <Pressable
        className="flex-1"
        onPress={() =>
          navigation.navigate('BoardRoute', {
            screen: 'BoardDetailPosts',
            params: {
              postId: item.id,
              isReview: item.isReview,
            },
          })
        }>
        <Text className="text-secondary-black typo-body-16-medium">
          {item.title}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text className="text-surface-600 typo-caption-13-light">
            {formatDateOrTime(item.createdAt)}
          </Text>
          <View className="flex-row items-center">
            <View className="mr-[7px] w-[37px] flex-row items-center">
              <ThumbsUpIcon width={16} height={16} />
              <Text className="ml-1 text-error-red typo-caption-13-medium">
                {item.likeCount}
              </Text>
            </View>
            <View className="w-[34px] flex-row items-center">
              <CommentsIcon width={15} height={15} />
              <Text className="ml-1 text-primary-purple typo-caption-13-medium">
                {item.commentCount}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default HotPostWidgetItem;
