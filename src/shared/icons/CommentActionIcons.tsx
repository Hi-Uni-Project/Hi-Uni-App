import React from 'react';

import CommentsIcon from '@/static/icons/comment-box.svg';
import SendOnIcon from '@/static/icons/comment-send-on.svg';
import SendIcon from '@/static/icons/comment-send.svg';
import ThumbsUpIcon from '@/static/icons/like-box.svg';
import ToggleIcon from '@/static/icons/toggle-box.svg';

interface Props {
  action: 'like' | 'comment' | 'toggle' | 'send' | 'send-on';
  width?: number;
  height?: number;
}

const CommentActionIcons = ({ action, height, width }: Props) => {
  switch (action) {
    case 'like':
      return <ThumbsUpIcon width={width} height={height} />;
    case 'comment':
      return <CommentsIcon width={width} height={height} />;
    case 'toggle':
      return <ToggleIcon width={width} height={height} />;
    case 'send':
      return <SendIcon width={width} height={height} />;
    case 'send-on':
      return <SendOnIcon width={width} height={height} />;
    default:
      return null;
  }
};

export default CommentActionIcons;
