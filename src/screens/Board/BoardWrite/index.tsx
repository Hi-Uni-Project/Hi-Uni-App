import React from 'react';

import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BoardWriteHeader from '@/features/board/boardWrite/components/layouts/BoardWriteHeader';
import BoardWriteModals from '@/features/board/boardWrite/components/Modal/BoardWriteModals';
import NormalWriteView from '@/features/board/boardWrite/components/NormalWriteView';
import ReviewView from '@/features/board/boardWrite/components/ReviewView';
import { useBoardWrite } from '@/features/board/boardWrite/hooks/useBoardWrite';
import {
  POST_TYPE_DISPLAY_NAME,
  POST_TYPE_OPTIONS,
  PostType,
} from '@/features/board/shared/types/enum/postEnum';

const BoardWrite = () => {
  const insets = useSafeAreaInsets();

  const {
    selectedPostType,
    title,
    isReview,
    content,
    modalState,
    setTitle,
    setContent,
    setSelectedPostType,
    setModalState,
    handlePressedClosed,
    handlePostTypeChange,
    handleReviewToggle,
    handleExitModalConfirm,
    handleExitModalCancel,
    handleChangeToReviewConfirm,
    handleChangeToReviewCancel,
    toggleDropdown,
  } = useBoardWrite();

  const displayName = POST_TYPE_DISPLAY_NAME[selectedPostType] ?? '선택';
  const placeholder = selectedPostType
    ? `자유롭게 ${POST_TYPE_DISPLAY_NAME[selectedPostType]} 경험을 공유해주세요.`
    : '자유롭게 취업 정보에 대한 내용을 작성해주세요.';

  return (
    <View className="flex-1 bg-surface-50">
      <BoardWriteHeader
        paddingTop={insets.top}
        height={insets.top + 70}
        onClose={handlePressedClosed}
      />

      {isReview ? (
        <ReviewView
          selectedPostType={selectedPostType}
          displayName={displayName}
          isDropdownOpen={modalState.type === 'dropdown'}
          title={title}
          isReview={isReview}
          onPostTypeSelectorPress={toggleDropdown}
          onTitleChange={setTitle}
          onReviewToggle={handleReviewToggle}
        />
      ) : (
        <NormalWriteView
          selectedPostType={selectedPostType}
          displayName={displayName}
          isDropdownOpen={modalState.type === 'dropdown'}
          title={title}
          content={content}
          isReview={isReview}
          placeholder={placeholder}
          onPostTypeSelectorPress={toggleDropdown}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onReviewToggle={handleReviewToggle}
        />
      )}

      <BoardWriteModals
        modalState={modalState}
        dropdownOptions={POST_TYPE_OPTIONS}
        dropdownPosition={{
          top: insets.top + 70 + 28 + 42,
          left: 20,
        }}
        onDropdownClose={() => setModalState({ type: 'none' })}
        onDropdownSelect={value => handlePostTypeChange(value as PostType)}
        onExitModalClose={() => setModalState({ type: 'none' })}
        onExitModalConfirm={handleExitModalConfirm}
        onExitModalCancel={handleExitModalCancel}
        onChangeToReviewModalClose={() => setModalState({ type: 'none' })}
        onChangeToReviewConfirm={handleChangeToReviewConfirm}
        onChangeToReviewCancel={handleChangeToReviewCancel}
        onOptionSheetVisibleChange={visible =>
          setModalState(visible ? { type: 'optionSheet' } : { type: 'none' })
        }
        onOptionSelect={setSelectedPostType}
      />
    </View>
  );
};

export default BoardWrite;
