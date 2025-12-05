import React from 'react';

import CommentsIcon from '@/static/icons/comment-box.svg';
import ThumbsUpIcon from '@/static/icons/like-box.svg';
import ToggleIcon from '@/static/icons/toggle-box.svg';

interface Props {
  action: 'like' | 'comment' | 'toggle';
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
    default:
      return null;
  }
};

export default CommentActionIcons;
