import React from 'react';

import { View, Text } from 'react-native';

import { createCommentOptions } from '../constants';
import { Comment } from '../types/comment';

import CommentItem from './CommentItem';

interface Props {
  comments: Comment[];
  activeOption: string | null;
  scrollY: number;
  commentLayouts: {
    [key: string]: { actionBoxY: number; actionBoxHeight: number };
  };
  onCommentLayout: (
    id: string,
    actionBoxY: number,
    actionBoxHeight: number,
  ) => void;
  onToggleOption: (id: string) => void;
  onCloseOption: () => void;
  onReplyPress: (commentId: number) => void;
  onCommentLikePress: (commentId: number, currentIsLiked: boolean) => void;
  onReplyLikePress: (
    commentId: number,
    replyId: number,
    currentIsLiked: boolean,
  ) => void;
  onDeleteComment: (commentId: number, parentId?: number) => void;
}

const CommentList = ({
  comments,
  activeOption,
  scrollY,
  commentLayouts,
  onCommentLayout,
  onToggleOption,
  onCloseOption,
  onReplyPress,
  onCommentLikePress,
  onReplyLikePress,
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
          commentLayouts={commentLayouts}
          onLayout={onCommentLayout}
          onToggleOption={onToggleOption}
          onCloseOption={onCloseOption}
          onReplyPress={onReplyPress}
          onCommentLikePress={onCommentLikePress}
          onReplyLikePress={onReplyLikePress}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </View>
  );
};

export default CommentList;
