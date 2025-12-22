import React, { useState, useRef, useCallback } from 'react';

import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { createComment } from '@/features/board/boardDetail/api/comment/createComment';
import { createReply } from '@/features/board/boardDetail/api/comment/createReply';
import {
  deleteComment,
  deleteReply,
} from '@/features/board/boardDetail/api/comment/deleteComment';
import {
  addCommentLike,
  removeCommentLike,
} from '@/features/board/boardDetail/api/comment/toggleCommentLike';
import {
  addReplyLike,
  removeReplyLike,
} from '@/features/board/boardDetail/api/comment/toggleReplyLike';
import { deletePost } from '@/features/board/boardDetail/api/post/deletePost';
import CommentInput, {
  CommentInputRef,
} from '@/features/board/boardDetail/components/CommentInput';
import CommentList from '@/features/board/boardDetail/components/CommentList';
import BoardDetailHeader from '@/features/board/boardDetail/components/layouts/BoardHeader';
import KeyboardInputBackdrop from '@/features/board/boardDetail/components/modal/KeyboardBackdrop';
import PostDetailContent from '@/features/board/boardDetail/components/PostContent';
import PostDetailStats from '@/features/board/boardDetail/components/PostStats';
import { toastConfig } from '@/features/board/boardDetail/config/toast';
import {
  createPostOptions,
  TOP_OFFSET,
} from '@/features/board/boardDetail/constants';
import { useKeyboard } from '@/features/board/boardDetail/hooks/useKeyboard';
import { usePostCommentsQuery } from '@/features/board/boardDetail/hooks/usePostCommentsQuery';
import { usePostDetailQuery } from '@/features/board/boardDetail/hooks/usePostDetailQuery';
import { usePostInteractions } from '@/features/board/boardDetail/hooks/usePostInteractions';
import {
  BoardNavigationProps,
  BoardStackNavigationProp,
} from '@/navigation/types/navigationTypes';
import OptionPopup from '@/shared/components/Board/OptionPopup';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';
import Loading from '@/shared/ui/organisms/Loading';

type BoardDetailRouteParams = RouteProp<
  BoardNavigationProps,
  'BoardDetailPosts'
>;

const BoardDetailPosts = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<BoardStackNavigationProp>();
  const route = useRoute<BoardDetailRouteParams>();
  const { postId, isReview } = route.params || { postId: 0, isReview: false };
  const commentInputRef = useRef<CommentInputRef>(null);

  // 게시글 데이터 조회
  const {
    data: post,
    isLoading: isPostLoading,
    refetch: postRefetch,
  } = usePostDetailQuery(postId, isReview);

  // 댓글 데이터 조회
  const {
    data: comments = [],
    isLoading: isCommentsLoading,
    refetch: commentRefetch,
  } = usePostCommentsQuery(postId);

  // 상태관리 state
  const [comment, setComment] = useState('');
  const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(
    null,
  );
  const [editingCommentInfo, setEditingCommentInfo] = useState<{
    commentId: number;
    parentId?: number;
    originalContent: string;
  } | null>(null);
  const [isPostOptionVisible, setIsPostOptionVisible] = useState(false);
  const [activeCommentOption, setActiveCommentOption] = useState<string | null>(
    null,
  );
  const [scrollY, setScrollY] = useState(0);
  const [commentLayouts, setCommentLayouts] = useState<{
    [key: string]: { actionBoxY: number; actionBoxHeight: number };
  }>({});
  const [deleteCommentModalVisible, setDeleteCommentModalVisible] =
    useState(false);
  const [deletePostModalVisible, setDeletePostModalVisible] = useState(false);
  const [deletingCommentInfo, setDeletingCommentInfo] = useState<{
    commentId: number;
    parentId?: number;
  } | null>(null);

  const { isKeyboardVisible, keyboardHeight, backdropOpacity } = useKeyboard();
  const {
    isLiked,
    isBookmarked,
    likeScale,
    bookmarkScale,
    handleLikePress,
    handleBookmarkPress,
  } = usePostInteractions({
    postId,
    initialIsLiked: post?.isLiked || false,
    initialIsBookmarked: post?.isBookmarked || false,
    onRefetch: postRefetch,
  });

  // 화면 포커스 시 데이터 refetch (수정 후 돌아왔을 때 반영)
  useFocusEffect(
    useCallback(() => {
      postRefetch();
      commentRefetch();
    }, [postRefetch, commentRefetch]),
  );

  // API 호출 관련 핸들러
  const handleReplyPress = (commentId: number) => {
    setReplyingToCommentId(commentId);
    // 입력창 포커스
    setTimeout(() => {
      commentInputRef.current?.focus();
    }, 100);
  };

  const handleSendComment = async () => {
    if (comment.trim()) {
      try {
        if (editingCommentInfo) {
          // 댓글/답글 수정
          const { updateComment, updateReply } = await import(
            '../../../features/board/boardDetail/api/comment/updateComment'
          );

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
        await Promise.all([commentRefetch(), postRefetch()]);
        setComment('');
        Keyboard.dismiss();
      } catch (error) {
        console.error('댓글/답글 작성/수정 실패:', error);
      }
    }
  };

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
      // API 호출 성공 후 댓글 목록 새로고침
      await commentRefetch();
    } catch (error) {
      console.error('댓글 좋아요 처리 실패:', error);
    }
  };

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
      // API 호출 성공 후 댓글 목록 새로고침
      await commentRefetch();
    } catch (error) {
      console.error('답글 좋아요 처리 실패:', error);
    }
  };

  // 게시글 삭제
  const handleDeletePost = async () => {
    try {
      await deletePost(postId);
      setDeletePostModalVisible(false);
      navigation.goBack();
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      setDeletePostModalVisible(false);
    }
  };

  // 댓글/답글 삭제
  const handleDeleteComment = async () => {
    if (!deletingCommentInfo) {
      return;
    }

    try {
      if (deletingCommentInfo.parentId) {
        // 답글 삭제
        await deleteReply(
          deletingCommentInfo.parentId,
          deletingCommentInfo.commentId,
        );
      } else {
        // 댓글 삭제
        await deleteComment(deletingCommentInfo.commentId);
      }
      await Promise.all([commentRefetch(), postRefetch()]);
      setDeleteCommentModalVisible(false);
      setDeletingCommentInfo(null);
    } catch (error) {
      console.error('댓글/답글 삭제 실패:', error);
      setDeleteCommentModalVisible(false);
      setDeletingCommentInfo(null);
    }
  };

  const handleCommentLayout = (
    id: string,
    actionBoxY: number,
    actionBoxHeight: number,
  ) => {
    setCommentLayouts(prev => ({
      ...prev,
      [id]: { actionBoxY, actionBoxHeight },
    }));
  };

  const handleToggleCommentOption = (id: string) => {
    setActiveCommentOption(activeCommentOption === id ? null : id);
  };

  // 댓글/답글 수정 핸들러
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

  // 게시글 수정 핸들러
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

  const postOptions = createPostOptions(
    post?.isUser || false,
    () => setDeletePostModalVisible(true),
    handleEditPost,
  );

  if (isPostLoading || !post) {
    return (
      <View className="flex-1 bg-white">
        <BoardDetailHeader
          univ=""
          paddingTop={insets.top}
          onBackPress={() => navigation.goBack()}
          onMorePress={() => {}}
        />
        <Loading />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <KeyboardInputBackdrop
        visible={isKeyboardVisible}
        opacity={backdropOpacity}
      />

      <BoardDetailHeader
        univ={post.univ}
        subcategory={post.postType}
        paddingTop={insets.top}
        onBackPress={() => navigation.goBack()}
        onMorePress={() => setIsPostOptionVisible(!isPostOptionVisible)}
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -20 : 0}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          onScroll={event => {
            setScrollY(event.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled">
          <View className="p-5">
            <PostDetailContent post={post} />

            <PostDetailStats
              views={post.views}
              likes={post.likes}
              bookmarks={post.bookmarks}
              isLiked={isLiked}
              isBookmarked={isBookmarked}
              likeScale={likeScale}
              bookmarkScale={bookmarkScale}
              onLikePress={handleLikePress}
              onBookmarkPress={handleBookmarkPress}
            />

            <View
              className="h-1.5 bg-surface-50"
              style={{ marginLeft: -20, marginRight: -20 }}
            />

            {isCommentsLoading ? (
              <View className="py-10">
                <Loading />
              </View>
            ) : (
              <CommentList
                comments={comments}
                commentCount={post.commentCount}
                activeOption={activeCommentOption}
                scrollY={scrollY}
                commentLayouts={commentLayouts}
                onCommentLayout={handleCommentLayout}
                onToggleOption={handleToggleCommentOption}
                onCloseOption={() => setActiveCommentOption(null)}
                onReplyPress={handleReplyPress}
                onCommentLikePress={handleCommentLikePress}
                onReplyLikePress={handleReplyLikePress}
                onDeleteComment={(commentId: number, parentId?: number) => {
                  setDeletingCommentInfo({ commentId, parentId });
                  setDeleteCommentModalVisible(true);
                }}
                onEditComment={handleEditComment}
              />
            )}
          </View>
        </ScrollView>

        <CommentInput
          ref={commentInputRef}
          value={comment}
          onChangeText={setComment}
          onSubmit={handleSendComment}
          keyboardHeight={keyboardHeight}
          bottomInset={insets.bottom}
          isEditing={!!editingCommentInfo}
          originalContent={editingCommentInfo?.originalContent || ''}
        />
      </KeyboardAvoidingView>

      <OptionPopup
        visible={isPostOptionVisible}
        onClose={() => setIsPostOptionVisible(false)}
        options={postOptions}
        position={{
          top: insets.top + TOP_OFFSET,
          right: 30,
        }}
      />

      <ConfirmModal
        visible={deleteCommentModalVisible}
        onClose={() => {
          setDeleteCommentModalVisible(false);
          setDeletingCommentInfo(null);
        }}
        title="댓글을 삭제할까요?"
        confirmText="네, 삭제할래요."
        cancelText="아니요, 그대로 둘게요."
        status="caution"
        onConfirm={handleDeleteComment}
        onCancel={() => {
          setDeleteCommentModalVisible(false);
          setDeletingCommentInfo(null);
        }}
      />

      <ConfirmModal
        visible={deletePostModalVisible}
        onClose={() => setDeletePostModalVisible(false)}
        title="게시글을 삭제할까요?"
        confirmText="네, 삭제할래요."
        cancelText="아니요, 그대로 둘게요."
        status="caution"
        onConfirm={handleDeletePost}
        onCancel={() => setDeletePostModalVisible(false)}
      />

      <Toast config={toastConfig} />
    </View>
  );
};

export default BoardDetailPosts;
