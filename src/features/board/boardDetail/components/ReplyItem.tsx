import React from 'react';

import { View, Text } from 'react-native';

import { useCommentLayout } from '../hooks/useCommentLayout';
import { Reply } from '../types/comment';

import CommentActionBox from './CommentActionBox';

import OptionPopup from '@/shared/components/Board/OptionPopup';
import { OptionItem } from '@/shared/components/Board/OptionPopup';
import BoardActionIcons from '@/shared/icons/BoardActionIcons';
import { formatDateOrTime, formatMajor } from '@/shared/utils/formatter';
import CommentArrowIcon from '@/static/icons/comment-arrow.svg';

interface Props {
  reply: Reply;
  anonymousMap: Map<string, number>;
  parentCommentId: number;
  activeOption: string | null;
  commentOptions: OptionItem[];
  scrollY: number;
  commentLayouts: {
    [key: string]: { actionBoxY: number; actionBoxHeight: number };
  };
  onLayout: (id: string, actionBoxY: number, actionBoxHeight: number) => void;
  onToggleOption: (id: string) => void;
  onCloseOption: () => void;
  onReplyLikePress: (
    commentId: number,
    replyId: number,
    currentIsLiked: boolean,
  ) => void;
}

const ReplyItem = ({
  reply,
  anonymousMap,
  parentCommentId,
  activeOption,
  commentOptions,
  scrollY,
  commentLayouts,
  onLayout,
  onToggleOption,
  onCloseOption,
  onReplyLikePress,
}: Props) => {
  const replyId = `reply-${reply.id}`;
  const isActive = activeOption === replyId;

  const { actionBoxRef, handleActionBoxLayout } = useCommentLayout({
    id: replyId,
    isActive,
    scrollY,
    onLayout,
  });

  return (
    <View className="flex-row space-x-2 px-5 pl-2 pt-4">
      <CommentArrowIcon className="top-2" />

      <View className="w-full flex-col rounded-[10px] bg-surface-100 p-3.5">
        <View
          ref={actionBoxRef}
          className="mb-3 flex-row justify-between"
          onLayout={handleActionBoxLayout}>
          <View className="flex-row items-center">
            <View className="mr-3 h-8 w-8 rounded-full bg-surface-300" />
            <Text className="mr-2 text-main-text typo-caption-14-semibold">
              익명{anonymousMap.get(reply.author) || 0}
            </Text>
            <Text className="text-surface-500 typo-caption-14-regular">
              · {formatMajor(reply.firstMajorName, reply.secondMajorName)}
            </Text>
          </View>

          <View className="flex-row items-center rounded-[100px]">
            <CommentActionBox
              hasReply={false}
              onLikePress={() =>
                onReplyLikePress(parentCommentId, reply.id, reply.isLiked)
              }
              onTogglePress={() => onToggleOption(replyId)}
            />
          </View>
        </View>

        <Text className="mb-2 text-main-text typo-body-15-regular">
          {reply.content}
        </Text>

        <View className="flex-row items-center space-x-2">
          <Text className="text-surface-500 typo-caption-13-light">
            {formatDateOrTime(reply.date)}
          </Text>
          {reply.likes > 0 && (
            <View className="flex-row items-center">
              <BoardActionIcons width={14} height={14} action="like" />
              <Text className="ml-1 text-xs text-red-500">{reply.likes}</Text>
            </View>
          )}
        </View>
      </View>

      <OptionPopup
        visible={isActive}
        onClose={onCloseOption}
        options={commentOptions}
        position={{
          top:
            (commentLayouts[replyId]?.actionBoxY || 0) +
            (commentLayouts[replyId]?.actionBoxHeight || 0) +
            -20,
          right: 35,
        }}
      />
    </View>
  );
};

export default ReplyItem;
