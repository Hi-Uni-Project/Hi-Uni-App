import React from 'react';

import { View, Text } from 'react-native';

import { Reply } from '../types/comment';

import CommentActionBox from './CommentActionBox';

import OptionPopup from '@/shared/components/Board/OptionPopup';
import { OptionItem } from '@/shared/components/Board/OptionPopup';
import BoardActionIcons from '@/shared/icons/BoardActionIcons';
import CommentArrowIcon from '@/static/icons/comment-arrow.svg';

interface Props {
  reply: Reply;
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

const ReplyItem = ({
  reply,
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
  const replyId = `reply-${reply.id}`;
  const isActive = activeOption === replyId;

  return (
    <View
      className="flex-row space-x-2 px-5 pl-2 pt-4"
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        onLayout(replyId, layout.y);
      }}>
      <CommentArrowIcon className="top-2" />

      <View className="w-full flex-col rounded-[10px] bg-surface-100 p-3.5">
        <View className="mb-3 flex-row justify-between">
          <View className="flex-row items-center">
            <View className="mr-3 h-8 w-8 rounded-full bg-surface-300" />
            <Text className="mr-2 text-main-text typo-caption-14-semibold">
              익명{reply.id}
            </Text>
            <Text className="text-surface-500 typo-caption-14-regular">
              · {reply.univ}
            </Text>
          </View>

          <View className="flex-row items-center rounded-[100px]">
            <CommentActionBox
              hasReply={false}
              onLikePress={() => console.log('답글 좋아요')}
              onTogglePress={() => onToggleOption(replyId)}
            />
          </View>
        </View>

        <Text className="mb-2 text-main-text typo-body-15-regular">
          {reply.content}
        </Text>

        <View className="flex-row items-center space-x-2">
          <Text className="text-surface-500 typo-caption-13-light">
            {reply.date}
          </Text>
          {reply.likes && reply.likes > 0 && (
            <View className="flex-row items-center">
              <BoardActionIcons width={14} height={14} action="like" />
              <Text className="ml-1 text-xs text-red-500">{reply.likes}</Text>
            </View>
          )}
        </View>
      </View>

      {/* 답글 옵션 팝업 */}
      {/* 게시글 컨텐츠가 길어지면 절대값이 달라지는 이슈 수정 필요 */}
      <OptionPopup
        visible={isActive}
        onClose={onCloseOption}
        options={commentOptions}
        position={{
          top:
            topInset +
            topOffset +
            (commentLayouts[replyId] || 0) -
            scrollY +
            665,
          right: 35,
        }}
      />
    </View>
  );
};

export default ReplyItem;
