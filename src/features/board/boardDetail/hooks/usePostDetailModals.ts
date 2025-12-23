import { useState } from 'react';

export const usePostDetailModals = () => {
  const [isPostOptionVisible, setIsPostOptionVisible] = useState(false);
  const [deleteCommentModalVisible, setDeleteCommentModalVisible] =
    useState(false);
  const [deletePostModalVisible, setDeletePostModalVisible] = useState(false);
  const [deletingCommentInfo, setDeletingCommentInfo] = useState<{
    commentId: number;
    parentId?: number;
  } | null>(null);

  const openDeleteCommentModal = (commentId: number, parentId?: number) => {
    setDeletingCommentInfo({ commentId, parentId });
    setDeleteCommentModalVisible(true);
  };

  const closeDeleteCommentModal = () => {
    setDeleteCommentModalVisible(false);
    setDeletingCommentInfo(null);
  };

  const openDeletePostModal = () => {
    setDeletePostModalVisible(true);
  };

  const closeDeletePostModal = () => {
    setDeletePostModalVisible(false);
  };

  const togglePostOption = () => {
    setIsPostOptionVisible(prev => !prev);
  };

  const closePostOption = () => {
    setIsPostOptionVisible(false);
  };

  return {
    // State
    isPostOptionVisible,
    deleteCommentModalVisible,
    deletePostModalVisible,
    deletingCommentInfo,

    // Handlers
    openDeleteCommentModal,
    closeDeleteCommentModal,
    openDeletePostModal,
    closeDeletePostModal,
    togglePostOption,
    closePostOption,
  };
};
