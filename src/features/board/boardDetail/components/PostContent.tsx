import React from 'react';

import { View, Text } from 'react-native';

import { formatDateOrTime, formatMajor } from '@/shared/utils/formatter';

interface ReviewQuestion {
  label: string;
  value: string;
}

interface Post {
  id: number;
  firstMajorName: string;
  secondMajorName: string;
  date: string;
  title: string;
  content: string;
  isReview?: boolean;
  reviewQuestions?: ReviewQuestion[];
  additionalReview?: string;
}

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
            {formatMajor(post.firstMajorName, post.secondMajorName)} ·{' '}
            {formatDateOrTime(post.date)}
          </Text>
        </View>
      </View>

      <Text className="mb-4 text-main-text typo-sub-title-20-semibold">
        {post.title}
      </Text>

      {/* 일반 글일 경우 */}
      {!post.isReview && (
        <Text className="leading-6 text-main-text typo-body-15-regular-post-detail">
          {post.content}
        </Text>
      )}

      {/* 후기 글일 경우 */}
      {post.isReview && post.reviewQuestions && (
        <View className="space-y-2">
          {post.reviewQuestions
            .filter(question => {
              if (question.label === '느낀 점') {
                return question.value && question.value.trim() !== '';
              }
              return true;
            })
            .map((question, index) => (
              <View key={index} className="flex-row">
                <Text className="w-[80px] text-surface-700 typo-body-16-medium">
                  {question.label}
                </Text>

                <Text
                  className="flex-1 text-main-text typo-body-16-bold"
                  numberOfLines={0}>
                  {question.value}
                </Text>
              </View>
            ))}
        </View>
      )}

      {post.isReview && post.additionalReview && (
        <View className="mt-4 rounded-[15px] border border-gray-200 p-4">
          <Text className="text-main-text typo-body-15-regular">
            {post.additionalReview}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PostDetailContent;
