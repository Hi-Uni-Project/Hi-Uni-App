import React, { useMemo } from 'react';

import { View, Text } from 'react-native';

import { createCommentOptions } from '../constants';
import { Comment } from '../types/comment';
import { createAnonymousMap } from '../utils/createAnonymousMap';

import CommentItem from './CommentItem';

interface Props {
  comments: Comment[];
  activeOption: string | null;
  scrollY: number;
  commentLayouts: {
    [key: string]: { actionBoxY: number; actionBoxHeight: number };
  };
  commentCount: number;
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
  onEditComment: (
    commentId: number,
    content: string,
    parentId?: number,
  ) => void;
}

const CommentList = ({
  comments,
  commentCount,
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
  onEditComment,
}: Props) => {
  // 작성자별 익명 번호 매핑 (작성 순서대로 익명1, 익명2, ...)
  const anonymousMap = useMemo(() => createAnonymousMap(comments), [comments]);

  return (
    <View className="border-surface-200 pt-5">
      <Text className="mb-6 text-main-text typo-body-16-semibold">
        댓글 {commentCount}
      </Text>

      {comments.map((comment, idx) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          anonymousMap={anonymousMap}
          isLast={idx === comments.length - 1}
          activeOption={activeOption}
          commentOptions={createCommentOptions(
            comment.isUser || false,
            () => onDeleteComment(comment.id),
            () => onEditComment(comment.id, comment.content),
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
          onEditComment={onEditComment}
        />
      ))}
    </View>
  );
};

export default CommentList;
