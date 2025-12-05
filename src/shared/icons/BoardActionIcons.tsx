import React from 'react';

import CommentsIcon from '@/static/icons/comment.svg';
import ScrabGrayIcon from '@/static/icons/scrab-gray.svg';
import ScrabIcon from '@/static/icons/scrab.svg';
import ThumbsUpGaryIcon from '@/static/icons/thumbs_up-gray.svg';
import ThumbsUpIcon from '@/static/icons/thumbs_up.svg';

interface Props {
  action: 'like' | 'comment' | 'scrab' | 'like-gray' | 'scrab-gray';
  width?: number;
  height?: number;
}

const BoardActionIcons = ({ action, height, width }: Props) => {
  switch (action) {
    case 'like':
      return <ThumbsUpIcon width={width} height={height} />;
    case 'comment':
      return <CommentsIcon width={width} height={height} />;
    case 'scrab':
      return <ScrabIcon width={width} height={height} />;
    case 'like-gray':
      return <ThumbsUpGaryIcon width={width} height={height} />;
    case 'scrab-gray':
      return <ScrabGrayIcon width={width} height={height} />;
    default:
      return null;
  }
};

export default BoardActionIcons;
