import { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { ModalState } from '../types';

import { usePostSubmit } from './usePostSubmit';
import { useReviewTemplate } from './useReviewTemplate';

import { PostType } from '@/features/board/shared/types/enum/postEnum';

const useBoardWrite = () => {
  const navigation = useNavigation();

  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(
    null,
  );
  const [title, setTitle] = useState('');
  const [isReview, setIsReview] = useState(false);
  const [content, setContent] = useState('');
  const [modalState, setModalState] = useState<ModalState>({ type: 'none' });
  const [changeType, setChangeType] = useState<PostType | null>(null);

  const reviewTemplate = useReviewTemplate(selectedPostType);
  const { hasReviewContent, resetForm } = reviewTemplate;

  const { handleSubmit } = usePostSubmit({
    selectedPostType,
    title,
    content,
    navigation,
  });

  useEffect(() => {
    if (selectedPostType && isReview) {
      resetForm();
    }
  }, [selectedPostType, isReview]);

  const hasContent = () => content.trim() !== '' || title.trim() !== '';

  // X 버튼 핸들러
  const handlePressedClosed = () => {
    if (hasContent() || hasReviewContent()) {
      setModalState({ type: 'exit' });
    } else {
      navigation.goBack();
    }
  };

  const handleModalClose = () => {
    setModalState({ type: 'none' });
  };

  // 말머리 관련 핸들러
  const handlePostTypeChange = (newType: PostType) => {
    setSelectedPostType(newType);
    handleModalClose();
  };

  const handlePostTypeSelect = (value: string) => {
    if (hasReviewContent() && selectedPostType !== value) {
      setModalState({ type: 'optionChange' });
      setChangeType(value as PostType);
    } else {
      handlePostTypeChange(value as PostType);
      handleModalClose();
    }
  };

  const handleConfirmPostTypeChange = () => {
    if (changeType) {
      handlePostTypeChange(changeType);
      resetForm();
      setTitle('');
    }
  };

  // review 모드 변경
  const handleReviewToggle = () => {
    if (!isReview && hasContent()) {
      setModalState({ type: 'changeToReview' });
    } else {
      setIsReview(prev => !prev);
    }

    if (!selectedPostType && !hasContent()) {
      setModalState({ type: 'optionSheet' });
    }
  };

  // 글쓰기 도중 나가는 모달 핸들러
  const handleExitModalCancel = () => {
    handleModalClose();
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  // 일반글에서 후기글로 변경시 핸들러
  const handleChangeToReviewConfirm = () => {
    setContent('');
    setTitle('');
    setIsReview(true);
    handleModalClose();

    if (!selectedPostType) {
      setModalState({ type: 'optionSheet' });
    }
  };

  // dropdown
  const toggleDropdown = () => {
    setModalState(prev =>
      prev.type === 'dropdown' ? { type: 'none' } : { type: 'dropdown' },
    );
  };

  return {
    // State
    selectedPostType,
    title,
    isReview,
    content,
    modalState,
    reviewTemplate,

    // Setters
    setTitle,
    setContent,
    setSelectedPostType,
    setModalState,

    // Handlers
    handlePressedClosed,
    handlePostTypeChange,
    handleReviewToggle,
    handleExitModalCancel,
    handleModalClose,
    handleChangeToReviewConfirm,
    toggleDropdown,
    handlePostTypeSelect,
    handleConfirmPostTypeChange,
    handleSubmit,
  };
};

export default useBoardWrite;
