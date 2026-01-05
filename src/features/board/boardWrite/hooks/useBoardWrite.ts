import { useState, useEffect } from 'react';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import {
  ModalState,
  ReviewFormData,
  JobFormData,
  InternshipFormData,
  InterviewFormData,
  WorkStoryFormData,
  LicenseFormData,
} from '../types';

import { usePostSubmit } from './usePostSubmit';
import { useReviewTemplate } from './useReviewTemplate';

import { PostType } from '@/features/board/shared/types/enum/postEnum';
import {
  BoardNavigationProps,
  BoardStackNavigationProp,
} from '@/navigation/types/navigationTypes';
import { parseDateString } from '@/shared/utils/date/parseDateString';

type BoardWriteRouteProp = RouteProp<BoardNavigationProps, 'BoardWrite'>;

const useBoardWrite = () => {
  const navigation = useNavigation<BoardStackNavigationProp>();
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

  const [initialData, setInitialData] = useState({
    title: '',
    content: '',
    postType: null as PostType | null,
    isReview: false,
    reviewData: null as any,
  });

  const reviewTemplate = useReviewTemplate(selectedPostType);
  const { hasReviewContent, resetForm, setFormData } = reviewTemplate;

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

  // reviewQuestions를 formData로 변환하는 함수
  const convertReviewQuestionsToFormData = (
    questions: { label: string; value: string }[],
    type: PostType,
  ): ReviewFormData => {
    const questionMap: { [key: string]: string } = {};
    questions.forEach(q => {
      questionMap[q.label] = q.value;
    });

    const additionalExperience = postData?.additionalReview || '';

    switch (type) {
      case PostType.JOB:
        return {
          companyName: questionMap['회사명'] || '',
          position: questionMap['직무'] || '',
          applicationMethod: questionMap['지원 방법'] || '',
          focusArea: questionMap['면접 질문'] || '',
          preparation: postData?.content || '',
          result: questionMap['결과'] || '',
          feelings: questionMap['느낀 점'] || '',
          additionalExperience,
        } as JobFormData;
      case PostType.INTERNSHIP:
        return {
          companyName: questionMap['회사명'] || '',
          position: questionMap['부서/직무'] || '',
          tasks: questionMap['담당 업무'] || '',
          learnings: postData?.content || '',
          startDate: parseDateString(questionMap['시작일']),
          endDate: parseDateString(questionMap['종료일']),
          feelings: questionMap['느낀 점'] || '',
          additionalExperience,
        } as InternshipFormData;
      case PostType.INTERVIEW:
        return {
          companyName: questionMap['회사명'] || '',
          position: questionMap['직무'] || '',
          interviewType: questionMap['면접 유형'] || '',
          questions: questionMap['질문 내용'] || '',
          answerPreparation: postData?.content || '',
          atmosphere: questionMap['면접 분위기'] || '',
          feelings: questionMap['느낀 점'] || '',
          additionalExperience,
        } as InterviewFormData;
      case PostType.EXPERIENCE:
        return {
          companyName: questionMap['조직명'] || '',
          position: questionMap['직무'] || '',
          jobLevel: questionMap['직급'] || '',
          tasks: questionMap['담당 업무'] || '',
          requiredSkills: postData?.content || '',
          startDate: parseDateString(questionMap['시작일']),
          endDate: parseDateString(questionMap['종료일']),
          feelings: questionMap['느낀 점'] || '',
          additionalExperience,
        } as WorkStoryFormData;
      case PostType.LICENSE:
        return {
          licenseName: questionMap['자격증명'] || '',
          preparationPeriod: questionMap['준비 기간'] || '',
          materials: questionMap['교재'] || '',
          difficulty: questionMap['난이도'] || '',
          studyMethod: postData?.content || '',
          tips: questionMap['합격 팁'] || '',
          feelings: questionMap['느낀 점'] || '',
          additionalExperience,
        } as LicenseFormData;
      default:
        return {
          companyName: '',
          startDate: new Date(),
          endDate: new Date(),
          position: '',
          tasks: '',
          learnings: '',
          feelings: '',
          additionalExperience: '',
        } as InternshipFormData;
    }
  };

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

  // 후기 글 수정 모드일 때 reviewTemplate이 준비된 후 데이터 로드
  useEffect(() => {
    if (
      editMode &&
      postData?.isReview &&
      postData.reviewQuestions &&
      selectedPostType &&
      setFormData
    ) {
      const formDataFromQuestions = convertReviewQuestionsToFormData(
        postData.reviewQuestions,
        postData.postType,
      );
      setFormData(formDataFromQuestions);
    }
  }, [editMode, postData, selectedPostType, setFormData]);

  useEffect(() => {
    // 수정 모드가 아닐 때만 resetForm 호출
    if (selectedPostType && isReview && !editMode) {
      resetForm();
    }
  }, [selectedPostType, isReview, editMode]);

  const hasContent = () => content.trim() !== '' || title.trim() !== '';

  // X 버튼 핸들러
  const handlePressedClosed = () => {
    // 수정 모드: 변경사항이 있을 때만 모달 표시
    if (editMode) {
      const changed = hasChanges();
      if (changed) {
        setModalState({ type: 'exit' });
      } else {
        navigation.goBack();
      }
    } else {
      // 작성 모드: 내용이 있을 때만 모달 표시
      if (hasContent() || hasReviewContent()) {
        setModalState({ type: 'exit' });
      } else {
        navigation.goBack();
      }
    }
  };

  const handleModalClose = () => {
    setModalState({ type: 'none' });
  };

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
    // 수정 모드에서는 일반 ↔ 후기 변경 불가
    if (editMode) {
      return;
    }

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
    // 수정 모드에서는 말머리 변경 불가
    if (editMode) {
      return;
    }

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
      // 후기 글 변경 감지 - reviewTemplate의 formData와 initialData.reviewData 비교
      if (initialData.isReview && initialData.reviewData) {
        const initialFormData = convertReviewQuestionsToFormData(
          initialData.reviewData,
          initialData.postType!,
        );
        // formData를 JSON으로 변환하여 비교 (Date 객체는 ISO string으로 변환)
        const currentData = JSON.stringify(
          reviewTemplate.formData,
          (key, value) => (value instanceof Date ? value.toISOString() : value),
        );
        const initialDataStr = JSON.stringify(initialFormData, (key, value) =>
          value instanceof Date ? value.toISOString() : value,
        );
        return currentData !== initialDataStr;
      }
      return false;
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
