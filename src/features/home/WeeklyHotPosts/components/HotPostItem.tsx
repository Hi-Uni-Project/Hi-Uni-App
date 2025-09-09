import React from 'react';

import { View, Text, Pressable } from 'react-native';

import { HotPost } from '../mocks/mockHotPosts';

import CommentsIcon from '@/static/icons/comment.svg';
import ThumbsUpIcon from '@/static/icons/thumbs_up.svg';

interface HotPostItemProps {
  item: HotPost;
}

const HotPostItem = ({ item }: HotPostItemProps) => {
  return (
    <View className="flex-row items-center justify-between p-4">
      <Pressable
        className="flex-1"
        onPress={() => {
          console.log(`post ${item.id} pressed`);
        }}>
        <Text className="text-[#1E2128] typo-body-16-medium">{item.title}</Text>

        <View className="flex-row items-center justify-between">
          <Text className="ml-[2px] text-gray-500 typo-caption-13-light">
            {item.date}
          </Text>
          <View className="flex-row items-center">
            <View className="mr-[7px] w-[37px] flex-row items-center">
              <ThumbsUpIcon width={16} height={16} />
              <Text className="ml-1 text-[#FB6C6C] typo-caption-13-medium">
                {item.likes}
              </Text>
            </View>
            <View className="w-[34px] flex-row items-center">
              <CommentsIcon width={15} height={15} />
              <Text className="ml-1 text-[#6568EB] typo-caption-13-medium">
                {item.comments}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default HotPostItem;
