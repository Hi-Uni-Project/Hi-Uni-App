import { deletePost } from '../api/post/deletePost';
import { PostDetail } from '../types';

import { BoardStackNavigationProp } from '@/navigation/types/navigationTypes';

interface UsePostActionsProps {
  postId: number;
  post: PostDetail | undefined;
  navigation: BoardStackNavigationProp;
}

export const usePostActions = ({
  postId,
  post,
  navigation,
}: UsePostActionsProps) => {
  // 게시글 삭제
  const handleDeletePost = async () => {
    try {
      await deletePost(postId);
      navigation.goBack();
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
    }
  };

  // 게시글 수정
  const handleEditPost = () => {
    if (!post) {
      return;
    }

    navigation.navigate('BoardWrite', {
      editMode: true,
      postId: post.id,
      postData: post,
    });
  };

  return {
    handleDeletePost,
    handleEditPost,
  };
};
