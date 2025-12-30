import React, { useCallback } from 'react';

import {
  RouteProp,
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import CommentInput from '@/features/board/boardDetail/components/CommentInput';
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
import { useCommentManagement } from '@/features/board/boardDetail/hooks/useCommentManagement';
import { useCommentUI } from '@/features/board/boardDetail/hooks/useCommentUI';
import { useKeyboard } from '@/features/board/boardDetail/hooks/useKeyboard';
import { usePostActions } from '@/features/board/boardDetail/hooks/usePostActions';
import { usePostCommentsQuery } from '@/features/board/boardDetail/hooks/usePostCommentsQuery';
import { usePostDetailModals } from '@/features/board/boardDetail/hooks/usePostDetailModals';
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

  const {
    data: post,
    isLoading: isPostLoading,
    refetch: postRefetch,
  } = usePostDetailQuery(postId, isReview);

  const {
    data: comments = [],
    isLoading: isCommentsLoading,
    refetch: commentRefetch,
  } = usePostCommentsQuery(postId);

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

  const commentManagement = useCommentManagement({
    postId,
    onRefetch: async () => {
      await Promise.all([commentRefetch(), postRefetch()]);
    },
  });

  const commentUI = useCommentUI();

  const modals = usePostDetailModals();

  const postActions = usePostActions({
    postId,
    post,
    navigation,
  });

  // 화면 포커스 시 데이터 refetch
  useFocusEffect(
    useCallback(() => {
      postRefetch();
      commentRefetch();
    }, [postRefetch, commentRefetch]),
  );

  // 댓글/답글 삭제 핸들러 (모달 포함)
  const handleConfirmDeleteComment = async () => {
    if (!modals.deletingCommentInfo) {
      return;
    }

    try {
      await commentManagement.handleDeleteComment(
        modals.deletingCommentInfo.commentId,
        modals.deletingCommentInfo.parentId,
      );
      modals.closeDeleteCommentModal();
    } catch (error) {
      modals.closeDeleteCommentModal();
    }
  };

  const handleConfirmDeletePost = async () => {
    try {
      await postActions.handleDeletePost();
      modals.closeDeletePostModal();
    } catch (error) {
      modals.closeDeletePostModal();
    }
  };

  const postOptions = createPostOptions(
    post?.isUser || false,
    modals.openDeletePostModal,
    postActions.handleEditPost,
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
        onMorePress={modals.togglePostOption}
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
            commentUI.setScrollY(event.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled">
          <View className="p-5">
            <PostDetailContent post={post} />

            <PostDetailStats
              // views={post.views}
              isUser={post.isUser}
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
                activeOption={commentUI.activeCommentOption}
                scrollY={commentUI.scrollY}
                commentLayouts={commentUI.commentLayouts}
                onCommentLayout={commentUI.handleCommentLayout}
                onToggleOption={commentUI.handleToggleCommentOption}
                onCloseOption={commentUI.handleCloseCommentOption}
                onReplyPress={commentManagement.handleReplyPress}
                onCommentLikePress={commentManagement.handleCommentLikePress}
                onReplyLikePress={commentManagement.handleReplyLikePress}
                onDeleteComment={modals.openDeleteCommentModal}
                onEditComment={commentManagement.handleEditComment}
              />
            )}
          </View>
        </ScrollView>

        <CommentInput
          ref={commentManagement.commentInputRef}
          value={commentManagement.comment}
          onChangeText={commentManagement.setComment}
          onSubmit={commentManagement.handleSendComment}
          keyboardHeight={keyboardHeight}
          bottomInset={insets.bottom}
          isEditing={!!commentManagement.editingCommentInfo}
          originalContent={
            commentManagement.editingCommentInfo?.originalContent || ''
          }
        />
      </KeyboardAvoidingView>

      <OptionPopup
        visible={modals.isPostOptionVisible}
        onClose={modals.closePostOption}
        options={postOptions}
        position={{
          top: insets.top + TOP_OFFSET,
          right: 30,
        }}
      />

      <ConfirmModal
        visible={modals.deleteCommentModalVisible}
        onClose={modals.closeDeleteCommentModal}
        title="댓글을 삭제할까요?"
        confirmText="네, 삭제할래요."
        cancelText="아니요, 그대로 둘게요."
        status="caution"
        onConfirm={handleConfirmDeleteComment}
        onCancel={modals.closeDeleteCommentModal}
      />

      <ConfirmModal
        visible={modals.deletePostModalVisible}
        onClose={modals.closeDeletePostModal}
        title="게시글을 삭제할까요?"
        confirmText="네, 삭제할래요."
        cancelText="아니요, 그대로 둘게요."
        status="caution"
        onConfirm={handleConfirmDeletePost}
        onCancel={modals.closeDeletePostModal}
      />

      <Toast config={toastConfig} />
    </View>
  );
};

export default BoardDetailPosts;
