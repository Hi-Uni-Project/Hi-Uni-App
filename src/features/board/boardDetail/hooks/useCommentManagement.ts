import { useState, useRef } from 'react';

import { Keyboard } from 'react-native';

import { createComment } from '../api/comment/createComment';
import { createReply } from '../api/comment/createReply';
import { deleteComment, deleteReply } from '../api/comment/deleteComment';
import {
  addCommentLike,
  removeCommentLike,
} from '../api/comment/toggleCommentLike';
import { addReplyLike, removeReplyLike } from '../api/comment/toggleReplyLike';
import { updateComment, updateReply } from '../api/comment/updateComment';
import { CommentInputRef } from '../components/CommentInput';

interface UseCommentManagementProps {
  postId: number;
  onRefetch: () => Promise<void>;
}

export const useCommentManagement = ({
  postId,
  onRefetch,
}: UseCommentManagementProps) => {
  const commentInputRef = useRef<CommentInputRef>(null);
  const [comment, setComment] = useState('');
  const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(
    null,
  );
  const [editingCommentInfo, setEditingCommentInfo] = useState<{
    commentId: number;
    parentId?: number;
    originalContent: string;
  } | null>(null);

  // 답글 작성 모드
  const handleReplyPress = (commentId: number) => {
    setReplyingToCommentId(commentId);
    setTimeout(() => {
      commentInputRef.current?.focus();
    }, 100);
  };

  // 댓글/답글 수정 모드
  const handleEditComment = (
    commentId: number,
    content: string,
    parentId?: number,
  ) => {
    setEditingCommentInfo({ commentId, parentId, originalContent: content });
    setComment(content);
    setReplyingToCommentId(null);
    setTimeout(() => {
      commentInputRef.current?.focus();
    }, 100);
  };

  // 댓글/답글 작성 및 수정
  const handleSendComment = async () => {
    if (comment.trim()) {
      try {
        if (editingCommentInfo) {
          // 댓글/답글 수정
          if (editingCommentInfo.parentId) {
            // 답글 수정
            await updateReply(
              editingCommentInfo.parentId,
              editingCommentInfo.commentId,
              comment,
            );
          } else {
            // 댓글 수정
            await updateComment(editingCommentInfo.commentId, comment);
          }
          setEditingCommentInfo(null);
        } else if (replyingToCommentId !== null) {
          // 답글 작성
          await createReply(postId, replyingToCommentId, comment);
          setReplyingToCommentId(null);
        } else {
          // 댓글 작성
          await createComment(comment, postId);
        }
        await onRefetch();
        setComment('');
        Keyboard.dismiss();
      } catch (error) {
        console.error('댓글/답글 작성/수정 실패:', error);
      }
    }
  };

  // 댓글 좋아요
  const handleCommentLikePress = async (
    commentId: number,
    currentIsLiked: boolean,
  ) => {
    try {
      if (currentIsLiked) {
        await removeCommentLike(commentId);
      } else {
        await addCommentLike(commentId);
      }
      await onRefetch();
    } catch (error) {
      console.error('댓글 좋아요 처리 실패:', error);
    }
  };

  // 답글 좋아요
  const handleReplyLikePress = async (
    commentId: number,
    replyId: number,
    currentIsLiked: boolean,
  ) => {
    try {
      if (currentIsLiked) {
        await removeReplyLike(commentId, replyId);
      } else {
        await addReplyLike(commentId, replyId);
      }
      await onRefetch();
    } catch (error) {
      console.error('답글 좋아요 처리 실패:', error);
    }
  };

  // 댓글/답글 삭제
  const handleDeleteComment = async (commentId: number, parentId?: number) => {
    try {
      if (parentId) {
        await deleteReply(parentId, commentId);
      } else {
        await deleteComment(commentId);
      }
      await onRefetch();
    } catch (error) {
      console.error('댓글/답글 삭제 실패:', error);
    }
  };

  return {
    // Refs
    commentInputRef,

    // State
    comment,
    setComment,
    replyingToCommentId,
    editingCommentInfo,

    // Handlers
    handleReplyPress,
    handleEditComment,
    handleSendComment,
    handleCommentLikePress,
    handleReplyLikePress,
    handleDeleteComment,
  };
};
