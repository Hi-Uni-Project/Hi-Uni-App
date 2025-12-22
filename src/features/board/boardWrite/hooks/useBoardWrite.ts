import { useState, useEffect } from 'react';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { ModalState } from '../types';

import { usePostSubmit } from './usePostSubmit';
import { useReviewTemplate } from './useReviewTemplate';

import { PostType } from '@/features/board/shared/types/enum/postEnum';
import {
  BoardNavigationProps,
  HomeStackNavigationProp,
} from '@/navigation/types/navigationTypes';

type BoardWriteRouteProp = RouteProp<BoardNavigationProps, 'BoardWrite'>;

const useBoardWrite = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const route = useRoute<BoardWriteRouteProp>();

  const editMode = route.params?.editMode || false;
  const postId = route.params?.postId;
  const postData = route.params?.postData;

  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(
    null,
  );
  const [title, setTitle] = useState('');
  const [isReview, setIsReview] = useState(false);
  const [content, setContent] = useState('');
  const [modalState, setModalState] = useState<ModalState>({ type: 'none' });
  const [changeType, setChangeType] = useState<PostType | null>(null);

  // 수정 모드 초기 데이터 설정
  const [initialData, setInitialData] = useState({
    title: '',
    content: '',
    postType: null as PostType | null,
    isReview: false,
    reviewData: null as any,
  });

  const reviewTemplate = useReviewTemplate(selectedPostType);
  const { hasReviewContent, resetForm } = reviewTemplate;

  // 게시글 제출 훅 (일반 글 + 후기 글)
  const { handleSubmit } = usePostSubmit({
    selectedPostType,
    title,
    content,
    isReview,
    reviewFormData: reviewTemplate.formData,
    navigation,
    editMode,
    postId,
  });

  // 수정 모드 초기화
  useEffect(() => {
    if (editMode && postData) {
      setTitle(postData.title);
      setSelectedPostType(postData.postType);
      setIsReview(postData.isReview);

      if (postData.isReview && postData.reviewQuestions) {
        // 후기 글 데이터 설정
        setInitialData({
          title: postData.title,
          content: '',
          postType: postData.postType,
          isReview: true,
          reviewData: postData.reviewQuestions,
        });
      } else {
        // 일반 글 데이터 설정
        setContent(postData.content || '');
        setInitialData({
          title: postData.title,
          content: postData.content || '',
          postType: postData.postType,
          isReview: false,
          reviewData: null,
        });
      }
    }
  }, [editMode, postData]);

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

  // 변경 감지 함수
  const hasChanges = () => {
    if (!editMode) {
      return false;
    }

    if (title !== initialData.title) {
      return true;
    }
    if (selectedPostType !== initialData.postType) {
      return true;
    }

    if (isReview) {
      // 후기 글 변경 감지 - reviewTemplate의 formData와 비교
      return true; // TODO: 후기 데이터 비교 로직
    } else {
      if (content !== initialData.content) {
        return true;
      }
    }

    return false;
  };

  return {
    // State
    selectedPostType,
    title,
    isReview,
    content,
    modalState,
    reviewTemplate,
    editMode,
    initialData,

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
    hasChanges,
  };
};

export default useBoardWrite;
