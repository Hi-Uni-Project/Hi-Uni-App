import React from 'react';

import CommentsIcon from '@/static/icons/comment.svg';
import ScrabIcon from '@/static/icons/scrab.svg';
import ThumbsUpIcon from '@/static/icons/thumbs_up.svg';

interface Props {
  action: 'like' | 'comment' | 'scrab';
}

const BoardActionIcons = ({ action }: Props) => {
  switch (action) {
    case 'like':
      return <ThumbsUpIcon />;
    case 'comment':
      return <CommentsIcon />;
    case 'scrab':
      return <ScrabIcon />;
    default:
      return null;
  }
};

export default BoardActionIcons;
