import React from 'react';

import clsx from 'clsx';
import { View, Pressable } from 'react-native';

import CommentActionIcons from '@/shared/icons/CommentActionIcons';

interface Props {
  hasReply?: boolean;
  onCommentPress?: () => void;
  onLikePress: () => void;
  onTogglePress: () => void;
}

const CommentActionBox = ({
  hasReply = true,
  onCommentPress,
  onLikePress,
  onTogglePress,
}: Props) => {
  return (
    <View
      className={clsx(
        `${hasReply ? 'bg-surface-100' : 'bg-surface-200'}`,
        'flex-row items-center space-x-2 rounded-[100px] px-3 py-2',
      )}>
      {hasReply && onCommentPress && (
        <>
          <Pressable onPress={onCommentPress} className="mr-2">
            <CommentActionIcons action="comment" height={18} width={18} />
          </Pressable>

          <View className="h-3 w-[1px] bg-surface-300" />
        </>
      )}

      <Pressable onPress={onLikePress}>
        <CommentActionIcons action="like" height={18} width={18} />
      </Pressable>

      <View className="h-3 w-[1px] bg-surface-300" />

      <Pressable onPress={onTogglePress}>
        <CommentActionIcons action="toggle" height={18} width={18} />
      </Pressable>
    </View>
  );
};

export default CommentActionBox;
