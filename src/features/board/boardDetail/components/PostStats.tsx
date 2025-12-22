import React from 'react';

import clsx from 'clsx';
import { View, Text, Pressable, Animated } from 'react-native';

import BoardActionIcons from '@/shared/icons/BoardActionIcons';
import ToggleIcons from '@/shared/icons/ToggleIcons';

interface Props {
  views: number;
  likes: number;
  bookmarks: number;
  isLiked: boolean;
  isBookmarked: boolean;
  likeScale: Animated.Value;
  bookmarkScale: Animated.Value;
  onLikePress: () => void;
  onBookmarkPress: () => void;
}

const PostDetailStats = ({
  views,
  likes,
  bookmarks,
  isLiked,
  isBookmarked,
  likeScale,
  bookmarkScale,
  onLikePress,
  onBookmarkPress,
}: Props) => {
  return (
    <View className="flex-row items-center justify-between space-x-6 py-6">
      <View className="flex-row items-center">
        <ToggleIcons
          type="eyeOpenStroke"
          color="#979797"
          width={24}
          height={24}
        />
        <Text className="ml-1 text-surface-500 typo-body-15-medium">
          {views}명이 봤어요
        </Text>
      </View>

      <View className="flex-row gap-2">
        <Pressable
          onPress={onLikePress}
          className={clsx(
            'flex-row items-center rounded-[50px] border-[1.5px] px-3.5 py-1.5',
            isLiked ? 'border-main-red bg-main-red/10' : 'border-surface-200',
          )}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
          <Animated.View style={{ transform: [{ scale: likeScale }] }}>
            <BoardActionIcons
              action={isLiked ? 'like-fill' : 'like-gray'}
              width={20}
              height={20}
            />
          </Animated.View>
          <Text
            className={clsx(
              'ml-1 min-w-[18px] text-right typo-caption-14-semibold',
              isLiked ? 'text-main-red' : 'text-surface-600',
            )}>
            {likes}
          </Text>
        </Pressable>

        <Pressable
          onPress={onBookmarkPress}
          className={clsx(
            'flex-row items-center rounded-[50px] border-[1.5px] px-3.5 py-1.5',
            isBookmarked
              ? 'border-tertiary-yellow bg-tertiary-yellow/[7%]'
              : 'border-surface-200',
          )}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
          <Animated.View style={{ transform: [{ scale: bookmarkScale }] }}>
            <BoardActionIcons
              action={isBookmarked ? 'scrab-on' : 'scrab-gray'}
              width={20}
              height={20}
            />
          </Animated.View>
          <Text
            className={clsx(
              'ml-1 min-w-[18px] text-right typo-caption-14-semibold',
              isBookmarked ? 'text-tertiary-yellow' : 'text-surface-600',
            )}>
            {bookmarks}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PostDetailStats;
