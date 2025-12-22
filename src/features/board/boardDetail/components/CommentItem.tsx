import React, { useRef, useEffect } from 'react';

import clsx from 'clsx';
import { View, Text, Platform } from 'react-native';

import { createCommentOptions } from '../constants';
import { Comment } from '../types/comment';

import CommentActionBox from './CommentActionBox';
import ReplyItem from './ReplyItem';

import { OptionItem } from '@/shared/components/Board/OptionPopup';
import OptionPopup from '@/shared/components/Board/OptionPopup';
import BoardActionIcons from '@/shared/icons/BoardActionIcons';
import { formatDateOrTime, formatMajor } from '@/shared/utils/formatter';

interface Props {
  comment: Comment;
  isLast: boolean;
  activeOption: string | null;
  commentOptions: OptionItem[];
  scrollY: number;
  commentLayouts: {
    [key: string]: { actionBoxY: number; actionBoxHeight: number };
  };
  onLayout: (id: string, actionBoxY: number, actionBoxHeight: number) => void;
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

const CommentItem = ({
  comment,
  isLast,
  activeOption,
  commentOptions,
  scrollY,
  commentLayouts,
  onLayout,
  onToggleOption,
  onCloseOption,
  onReplyPress,
  onCommentLikePress,
  onReplyLikePress,
  onDeleteComment,
}: Props) => {
  const commentId = `comment-${comment.id}`;
  const isActive = activeOption === commentId;
  const actionBoxRef = useRef<View>(null);
  const TOP_OFF_SET = Platform.OS === 'ios' ? 10 : 25;

  const handleActionBoxLayout = () => {
    if (actionBoxRef.current) {
      actionBoxRef.current.measureInWindow((y, height) => {
        onLayout(commentId, y, height);
      });
    }
  };

  useEffect(() => {
    if (isActive) {
      handleActionBoxLayout();
    }
  }, [scrollY, isActive]);

  return (
    <View className="pb-6">
      <View
        className={clsx(
          !isLast && 'border-b border-b-surface-200',
          'flex-col justify-between pb-6',
        )}>
        <View className="w-full">
          <View
            ref={actionBoxRef}
            className="mb-3 flex-row items-center justify-between"
            onLayout={handleActionBoxLayout}>
            <View className="flex-row items-center">
              <View className="mr-3 h-8 w-8 rounded-full bg-surface-300" />
              <Text className="mr-1 text-main-text typo-caption-14-semibold">
                익명{comment.id}
              </Text>
              <Text className="text-surface-500 typo-caption-14-regular">
                · {formatMajor(comment.firstMajorName, comment.secondMajorName)}
              </Text>
            </View>

            <CommentActionBox
              onCommentPress={() => onReplyPress(comment.id)}
              onLikePress={() =>
                onCommentLikePress(comment.id, comment.isLiked)
              }
              onTogglePress={() => onToggleOption(commentId)}
            />
          </View>

          <Text className="mb-2 text-main-text typo-body-15-regular">
            {comment.content}
          </Text>

          <View className="flex-row items-center space-x-2">
            <Text className="text-surface-500 typo-caption-13-light">
              {formatDateOrTime(comment.date)}
            </Text>
            {comment.likes > 0 && (
              <View className="flex-row items-center">
                <BoardActionIcons width={14} height={14} action="like" />
                <Text className="ml-1 text-xs text-red-500">
                  {comment.likes}
                </Text>
              </View>
            )}
          </View>
        </View>

        {comment.replies &&
          comment.replies.map(reply => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              parentCommentId={comment.id}
              activeOption={activeOption}
              commentOptions={createCommentOptions(reply.isUser || false, () =>
                onDeleteComment(reply.id, comment.id),
              )}
              scrollY={scrollY}
              commentLayouts={commentLayouts}
              onLayout={onLayout}
              onToggleOption={onToggleOption}
              onCloseOption={onCloseOption}
              onReplyLikePress={onReplyLikePress}
            />
          ))}
      </View>

      <OptionPopup
        visible={isActive}
        onClose={onCloseOption}
        options={commentOptions}
        position={{
          top:
            (commentLayouts[commentId]?.actionBoxY || 0) +
            (commentLayouts[commentId]?.actionBoxHeight || 0) +
            TOP_OFF_SET,
          right: 20,
        }}
      />
    </View>
  );
};

export default CommentItem;
