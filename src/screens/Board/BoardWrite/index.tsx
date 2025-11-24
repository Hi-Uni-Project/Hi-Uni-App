import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, Pressable, TextInput, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DropdownModal from '@/features/board/boardWrite/DropdownModal';
import {
  POST_TYPE_DISPLAY_NAME,
  POST_TYPE_OPTIONS,
  PostType,
} from '@/features/board/shared/types/enum/postEnum';
import ActionIcons from '@/shared/icons/ActionIcons';
import ChevronIcons from '@/shared/icons/ChevronIcons';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';
import Checked from '@/static/icons/check_fill.svg';
import NonChecked from '@/static/icons/non_check.svg';

type ModalType = 'exit' | 'changeToReview';

const BoardWrite = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(
    null,
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [isReview, setIsReview] = useState(false);
  const [content, setContent] = useState('');

  const [modalType, setModalType] = useState<ModalType | null>(null);

  const handlePressedClosed = () => {
    if (content || title) {
      setModalType('exit');
    } else {
      navigation.goBack();
    }
  };

  const handlePostTypeChange = (newType: PostType) => {
    setSelectedPostType(newType);
    // setDropdownOpen(false) 제거 - 모달이 자동 처리
  };

  const handleReviewToggle = () => {
    if (!isReview && content) {
      setModalType('changeToReview');
    } else {
      setIsReview(prev => !prev);
    }
  };

  const handleModalConfirm = () => {
    if (modalType === 'exit') {
      setModalType(null);
    } else if (modalType === 'changeToReview') {
      setIsReview(true);
      setContent('');
      setTitle('');
      setModalType(null);
    }
  };

  const handleModalCancel = () => {
    if (modalType === 'exit') {
      setModalType(null);
      navigation.goBack();
    } else if (modalType === 'changeToReview') {
      setModalType(null);
    }
  };

  const getModalContent = () => {
    if (modalType === 'exit') {
      return {
        title: '작성 중인 내용이 있어요.\n이대로 나갈까요?',
        confirmText: '아니요, 계속 작성할래요.',
        cancelText: '네, 이대로 나갈래요.',
      };
    }
    return {
      title: '후기글로 바꾸면\n지금 작성한 내용은 사라져요.\n계속 진행할까요?',
      confirmText: '네, 후기글로 바꿀래요.',
      cancelText: '아니요, 계속 작성할래요.',
    };
  };

  const modalContent = modalType !== null ? getModalContent() : null;

  return (
    <View className="flex-1 bg-surface-50">
      {/* Header */}
      <View
        className="bg-white px-5"
        style={{
          paddingTop: insets.top,
          height: insets.top + 70,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 20,
        }}>
        <View className="h-[70px] flex-row items-center justify-between">
          <Pressable onPress={handlePressedClosed}>
            <ActionIcons type="close" width={24} height={20} color="#1E2128" />
          </Pressable>

          <Text className="text-main-text typo-sub-title-20-semibold">
            글쓰기
          </Text>

          <Pressable>
            <Text className="text-surface-300 typo-sub-title-18-medium">
              완료
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Body */}
      <View className="flex-1 px-5 pt-7">
        {/* Category Selector */}
        <View className="border-b-[1.5px] border-b-surface-300">
          <View className="flex-row pb-3">
            <Pressable
              className={`flex-row items-center justify-center rounded-[20px] ${selectedPostType ? 'bg-primary-purple' : 'border border-surface-300'} px-3 py-0.5`}
              onPress={() => setDropdownOpen(prev => !prev)}>
              <Text
                className={`mr-2 ${selectedPostType ? 'text-white' : 'text-surface-600'} typo-body-16-regular`}>
                {POST_TYPE_DISPLAY_NAME[selectedPostType] ?? '선택'}
              </Text>

              <ChevronIcons
                direction={isDropdownOpen ? 'top' : 'bottom'}
                width={11}
                height={9}
                color={selectedPostType ? '#ffffff' : '#b7b7b7'}
              />
            </Pressable>

            {/* Title Input */}
            <TextInput
              placeholder="제목을 입력해주세요."
              placeholderTextColor="#979797"
              value={title}
              onChangeText={setTitle}
              className="pl-4 text-main-text typo-sub-title-20-semibold"
            />
          </View>
        </View>

        {/* Review Checkbox */}
        <View className="flex-row items-start justify-start pt-5">
          <Pressable className="mt-[3px]" onPress={handleReviewToggle}>
            {isReview ? (
              <Checked color="#6568ea" />
            ) : (
              <NonChecked color="#DADADA" />
            )}
          </Pressable>

          <View className="pl-3">
            <Text className="text-surface-700 typo-body-17-semibold">
              후기로 작성할게요.
            </Text>

            <Text className="pt-1 text-surface-500 typo-body-16-regular">
              {selectedPostType
                ? '후기 글의 경우 기록에 자동 저장되어 포트폴리오,\n이력서, 자기소개서가 자동으로 작성돼요.'
                : '후기 글의 경우 기록에 자동 저장되어 자기소개서가 \n자동으로 작성돼요.'}
            </Text>
          </View>
        </View>

        {/* Content Input */}
        <TextInput
          multiline
          value={content}
          onChangeText={setContent}
          placeholder={
            selectedPostType
              ? `자유롭게 ${POST_TYPE_DISPLAY_NAME[selectedPostType]} 경험을 공유해주세요.`
              : '자유롭게 취업 정보에 대한 내용을 작성해주세요.'
          }
          placeholderTextColor="#b7b7b7"
          className="mt-5 h-[420px] rounded-[15px] border border-surface-200 bg-white p-4 py-5 text-main-text typo-body-15-regular"
        />
      </View>

      {/* Dropdown Modal - 여기를 변경 */}
      <DropdownModal
        visible={isDropdownOpen}
        onClose={() => setDropdownOpen(false)}
        options={POST_TYPE_OPTIONS}
        onSelect={value => handlePostTypeChange(value as PostType)}
        position={{
          top: insets.top + 70 + 28 + 42,
          left: 20,
        }}
        triggerButton={
          <Pressable
            className={`flex-row items-center justify-center rounded-[20px] ${selectedPostType ? 'bg-primary-purple' : 'border border-surface-300'} px-3 py-0.5`}
            onPress={() => setDropdownOpen(prev => !prev)}>
            <Text
              className={`mr-2 ${selectedPostType ? 'text-white' : 'text-surface-600'} typo-body-16-regular`}>
              {POST_TYPE_DISPLAY_NAME[selectedPostType] ?? '선택'}
            </Text>

            <ChevronIcons
              direction="top"
              width={11}
              height={9}
              color={selectedPostType ? '#ffffff' : '#b7b7b7'}
            />
          </Pressable>
        }
      />

      {modalType !== null && modalContent && (
        <ConfirmModal
          visible={true}
          onClose={() => setModalType(null)}
          title={modalContent.title}
          confirmText={modalContent.confirmText}
          cancelText={modalContent.cancelText}
          status="caution"
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        />
      )}
    </View>
  );
};

export default BoardWrite;
