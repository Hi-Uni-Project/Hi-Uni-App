import React from 'react';

import clsx from 'clsx';
import { View, Text } from 'react-native';

import { Comment } from '../types/comment';

import CommentActionBox from './CommentActionBox';
import ReplyItem from './ReplyItem';

import { OptionItem } from '@/shared/components/Board/OptionPopup';
import OptionPopup from '@/shared/components/Board/OptionPopup';
import BoardActionIcons from '@/shared/icons/BoardActionIcons';
import { formatMajor } from '@/shared/utils/formatter';

interface Props {
  comment: Comment;
  isLast: boolean;
  activeOption: string | null;
  commentOptions: OptionItem[];
  scrollY: number;
  topOffset: number;
  topInset: number;
  commentLayouts: { [key: string]: number };
  onLayout: (id: string, y: number) => void;
  onToggleOption: (id: string) => void;
  onCloseOption: () => void;
}

const CommentItem = ({
  comment,
  isLast,
  activeOption,
  commentOptions,
  scrollY,
  topOffset,
  topInset,
  commentLayouts,
  onLayout,
  onToggleOption,
  onCloseOption,
}: Props) => {
  const commentId = `comment-${comment.id}`;
  const isActive = activeOption === commentId;

  return (
    <View
      className="pb-6"
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        onLayout(commentId, layout.y);
      }}>
      <View
        className={clsx(
          !isLast && 'border-b border-b-surface-200',
          'flex-col justify-between pb-6',
        )}>
        <View className="w-full">
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="mr-3 h-8 w-8 rounded-full bg-surface-300" />
              <Text className="mr-2 text-main-text typo-caption-14-semibold">
                익명{comment.id}
              </Text>
              <Text className="text-surface-500 typo-caption-14-regular">
                · {formatMajor(comment.majorName)}
              </Text>
            </View>

            <CommentActionBox
              onCommentPress={() => console.log('답글 작성')}
              onLikePress={() => console.log('좋아요')}
              onTogglePress={() => onToggleOption(commentId)}
            />
          </View>

          <Text className="mb-2 text-main-text typo-body-15-regular">
            {comment.content}
          </Text>

          <View className="flex-row items-center space-x-2">
            <Text className="text-surface-500 typo-caption-13-light">
              {comment.date}
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
              activeOption={activeOption}
              commentOptions={commentOptions}
              scrollY={scrollY}
              topOffset={topOffset}
              topInset={topInset}
              commentLayouts={commentLayouts}
              onLayout={onLayout}
              onToggleOption={onToggleOption}
              onCloseOption={onCloseOption}
            />
          ))}
      </View>

      <OptionPopup
        visible={isActive}
        onClose={onCloseOption}
        options={commentOptions}
        position={{
          top:
            topInset +
            topOffset +
            (commentLayouts[commentId] || 0) -
            scrollY +
            420,
          right: 20,
        }}
      />
    </View>
  );
};

export default CommentItem;
