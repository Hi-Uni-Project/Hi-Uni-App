import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { ModalState } from '../types';

import { useReviewTemplate } from './useReviewTemplate';

import { PostType } from '@/features/board/shared/types/enum/postEnum';

export const useBoardWrite = () => {
  const navigation = useNavigation();

  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(
    null,
  );
  const [title, setTitle] = useState('');
  const [isReview, setIsReview] = useState(false);
  const [content, setContent] = useState('');
  const [modalState, setModalState] = useState<ModalState>({ type: 'none' });
  const { formData } = useReviewTemplate();

  const hasContent = () => content.trim() !== '' || title.trim() !== '';

  const handlePressedClosed = () => {
    if (hasContent() || formData) {
      setModalState({ type: 'exit' });
    } else {
      navigation.goBack();
    }
  };

  const handlePostTypeChange = (newType: PostType) => {
    setSelectedPostType(newType);
    setModalState({ type: 'none' });
  };

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

  const handleExitModalConfirm = () => {
    setModalState({ type: 'none' });
  };

  const handleExitModalCancel = () => {
    setModalState({ type: 'none' });
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const handleChangeToReviewConfirm = () => {
    setContent('');
    setTitle('');
    setIsReview(true);
    setModalState({ type: 'none' });

    if (!selectedPostType) {
      setModalState({ type: 'optionSheet' });
    }
  };

  const handleChangeToReviewCancel = () => {
    setModalState({ type: 'none' });
  };

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

    // Setters
    setTitle,
    setContent,
    setSelectedPostType,
    setModalState,

    // Handlers
    handlePressedClosed,
    handlePostTypeChange,
    handleReviewToggle,
    handleExitModalConfirm,
    handleExitModalCancel,
    handleChangeToReviewConfirm,
    handleChangeToReviewCancel,
    toggleDropdown,
  };
};
