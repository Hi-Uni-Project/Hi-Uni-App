import React from 'react';

import { View, Text } from 'react-native';

import { createCommentOptions } from '../constants';
import { Comment } from '../types/comment';

import CommentItem from './CommentItem';

interface Props {
  comments: Comment[];
  activeOption: string | null;
  scrollY: number;
  topOffset: number;
  topInset: number;
  commentLayouts: { [key: string]: number };
  onCommentLayout: (id: string, y: number) => void;
  onToggleOption: (id: string) => void;
  onCloseOption: () => void;
  onReplyPress: (commentId: number) => void;
  onCommentLikePress: (commentId: number, currentIsLiked: boolean) => void;
  onDeleteComment: (commentId: number, parentId?: number) => void;
}

const CommentList = ({
  comments,
  activeOption,
  scrollY,
  topOffset,
  topInset,
  commentLayouts,
  onCommentLayout,
  onToggleOption,
  onCloseOption,
  onReplyPress,
  onCommentLikePress,
  onDeleteComment,
}: Props) => {
  return (
    <View className="border-surface-200 pt-5">
      <Text className="mb-6 text-main-text typo-body-16-semibold">
        댓글 {comments.length}
      </Text>

      {comments.map((comment, idx) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isLast={idx === comments.length - 1}
          activeOption={activeOption}
          commentOptions={createCommentOptions(comment.isUser || false, () =>
            onDeleteComment(comment.id),
          )}
          scrollY={scrollY}
          topOffset={topOffset}
          topInset={topInset}
          commentLayouts={commentLayouts}
          onLayout={onCommentLayout}
          onToggleOption={onToggleOption}
          onCloseOption={onCloseOption}
          onReplyPress={onReplyPress}
          onCommentLikePress={onCommentLikePress}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </View>
  );
};

export default CommentList;
