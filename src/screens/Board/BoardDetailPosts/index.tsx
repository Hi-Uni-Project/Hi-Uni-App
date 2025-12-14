import React, { useState } from 'react';

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
import CommentInput from '@/features/board/boardDetail/components/CommentInput';
import CommentList from '@/features/board/boardDetail/components/CommentList';
import BoardDetailHeader from '@/features/board/boardDetail/components/layouts/BoardHeader';
import KeyboardInputBackdrop from '@/features/board/boardDetail/components/modal/KeyboardBackdrop';
import PostDetailContent from '@/features/board/boardDetail/components/PostContent';
import PostDetailStats from '@/features/board/boardDetail/components/PostStats';
import { toastConfig } from '@/features/board/boardDetail/config/toast';
import {
  createCommentOptions,
  createPostOptions,
  TOP_OFFSET,
} from '@/features/board/boardDetail/constants';
import { useKeyboard } from '@/features/board/boardDetail/hooks/useKeyboard';
import { usePostCommentsQuery } from '@/features/board/boardDetail/hooks/usePostCommentsQuery';
import { usePostDetailQuery } from '@/features/board/boardDetail/hooks/usePostDetailQuery';
import { usePostInteractions } from '@/features/board/boardDetail/hooks/usePostInteractions';
import OptionPopup from '@/shared/components/Board/OptionPopup';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';
import Loading from '@/shared/ui/organisms/Loading';

// type BoardDetailRouteParams = {
//   postId: number;
//   isReview: boolean;
// };

const BoardDetailPosts = () => {
  const insets = useSafeAreaInsets();
  // const route = useRoute<RouteProp<{ params: BoardDetailRouteParams }>>();
  // const { postId, isReview } = route.params || { postId: 0, isReview: false };

  // 게시글 데이터 조회
  const { data: post, isLoading: isPostLoading } = usePostDetailQuery(
    3328,
    false,
  );

  // 댓글 데이터 조회
  const {
    data: comments = [],
    isLoading: isCommentsLoading,
    refetch: commentRefetch,
  } = usePostCommentsQuery(3328);

  console.log(comments);

  // 상태관리 state
  const [comment, setComment] = useState('');
  const [isPostOptionVisible, setIsPostOptionVisible] = useState(false);
  const [activeCommentOption, setActiveCommentOption] = useState<string | null>(
    null,
  );
  const [scrollY, setScrollY] = useState(0);
  const [commentLayouts, setCommentLayouts] = useState<{
    [key: string]: number;
  }>({});
  const [deleteCommentModalVisible, setDeleteCommentModalVisible] =
    useState(false);
  const [deletePostModalVisible, setDeletePostModalVisible] = useState(false);

  const { isKeyboardVisible, keyboardHeight, backdropOpacity } = useKeyboard();
  const {
    isLiked,
    isBookmarked,
    likeScale,
    bookmarkScale,
    handleLikePress,
    handleBookmarkPress,
  } = usePostInteractions();

  // API 호출 관련 핸들러
  const handleSendComment = (postId: number) => {
    if (comment.trim()) {
      createComment(comment, postId);
      commentRefetch();
      setComment('');
      Keyboard.dismiss();
    }
  };

  const handleCommentLayout = (id: string, y: number) => {
    setCommentLayouts(prev => ({ ...prev, [id]: y }));
  };

  const handleToggleCommentOption = (id: string) => {
    setActiveCommentOption(activeCommentOption === id ? null : id);
  };

  const postOptions = createPostOptions(() => setDeletePostModalVisible(true));
  const commentOptions = createCommentOptions(() =>
    setDeleteCommentModalVisible(true),
  );

  if (isPostLoading || !post) {
    return (
      <View className="flex-1 bg-white">
        <BoardDetailHeader
          univ=""
          paddingTop={insets.top}
          onBackPress={() => console.log('뒤로가기')}
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
        onBackPress={() => console.log('뒤로가기')}
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
                activeOption={activeCommentOption}
                commentOptions={commentOptions}
                scrollY={scrollY}
                topOffset={TOP_OFFSET}
                topInset={insets.top}
                commentLayouts={commentLayouts}
                onCommentLayout={handleCommentLayout}
                onToggleOption={handleToggleCommentOption}
                onCloseOption={() => setActiveCommentOption(null)}
              />
            )}
          </View>
        </ScrollView>

        <CommentInput
          value={comment}
          onChangeText={setComment}
          onSubmit={() => handleSendComment(post.id)}
          keyboardHeight={keyboardHeight}
          bottomInset={insets.bottom}
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
        onClose={() => setDeleteCommentModalVisible(false)}
        title="댓글을 삭제할까요?"
        confirmText="네, 삭제할래요."
        cancelText="아니요, 그대로 둘게요."
        status="caution"
        onConfirm={() => {
          console.log('댓글 삭제');
          setDeleteCommentModalVisible(false);
        }}
        onCancel={() => setDeleteCommentModalVisible(false)}
      />

      <ConfirmModal
        visible={deletePostModalVisible}
        onClose={() => setDeletePostModalVisible(false)}
        title="게시글을 삭제할까요?"
        confirmText="네, 삭제할래요."
        cancelText="아니요, 그대로 둘게요."
        status="caution"
        onConfirm={() => {
          console.log('게시글 삭제');
          setDeletePostModalVisible(false);
        }}
        onCancel={() => setDeletePostModalVisible(false)}
      />

      <Toast config={toastConfig} />
    </View>
  );
};

export default BoardDetailPosts;
