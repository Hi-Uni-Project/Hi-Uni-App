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
  MOCK_COMMENTS,
  MOCK_POST,
  TOP_OFFSET,
} from '@/features/board/boardDetail/constants';
import { useKeyboard } from '@/features/board/boardDetail/hooks/useKeyboard';
import { usePostInteractions } from '@/features/board/boardDetail/hooks/usePostInteractions';
import OptionPopup from '@/shared/components/Board/OptionPopup';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';

/**
 * 게시글 상세 화면 navigation 연결 필요
 * 추후 진행
 * rp 작업
 * 서버와 API 연결하면서 route.params or data 값을 어떻게 내려줄지 로직 설계 필요
 */

const BoardDetailPosts = () => {
  const insets = useSafeAreaInsets();

  // 상태관리 state
  // 추후 서버와 연결하면서 리팩토링 진행
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
  // 추후 서버와 연결하면서 리팩토링 진행
  const handleSendComment = () => {
    if (comment.trim()) {
      console.log('댓글 전송:', comment);
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

  return (
    <View className="flex-1 bg-white">
      <KeyboardInputBackdrop
        visible={isKeyboardVisible}
        opacity={backdropOpacity}
      />

      <BoardDetailHeader
        category={MOCK_POST.category}
        subcategory={MOCK_POST.subcategory}
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
            <PostDetailContent post={MOCK_POST} />

            <PostDetailStats
              views={MOCK_POST.views}
              likes={MOCK_POST.likes}
              bookmarks={MOCK_POST.bookmarks}
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

            <CommentList
              comments={MOCK_COMMENTS}
              commentCount={MOCK_POST.commentCount}
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
          </View>
        </ScrollView>

        <CommentInput
          value={comment}
          onChangeText={setComment}
          onSubmit={handleSendComment}
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
