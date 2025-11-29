import { useReviewTemplate } from './useReviewTemplate';

/**
 * BoardWrite의 모든 폼 데이터를 통합 관리하는 Hook
 * - 일반 글쓰기: title, content
 * - 후기 글쓰기: title + ReviewFormData (회사명, 날짜, 직무 등)
 */

export const useBoardWriteForm = (
  reviewForm: ReturnType<typeof useReviewTemplate>,
) => {
  // 일반 글쓰기 데이터가 있는지 확인
  const hasNormalWriteContent = (title: string, content: string): boolean => {
    return title.trim() !== '' || content.trim() !== '';
  };

  // 후기 글쓰기 데이터가 있는지 확인
  const hasReviewContent = (): boolean => {
    const { formData } = reviewForm;
    return (
      formData.companyName.trim() !== '' ||
      formData.position.trim() !== '' ||
      formData.tasks.trim() !== '' ||
      formData.learnings.trim() !== '' ||
      formData.feelings.trim() !== '' ||
      formData.additionalExperience.trim() !== ''
    );
  };

  // 전체 폼이 비어있는지 확인
  const isFormEmpty = (
    title: string,
    content: string,
    isReview: boolean,
  ): boolean => {
    if (isReview) {
      return !hasReviewContent() && title.trim() === '';
    }
    return !hasNormalWriteContent(title, content);
  };

  // 후기 폼 전체 초기화
  const resetReviewForm = () => {
    reviewForm.resetForm();
  };

  return {
    // Review Form Hook 전체 노출
    reviewForm,

    // 유틸 함수
    hasNormalWriteContent,
    hasReviewContent,
    isFormEmpty,
    resetReviewForm,
  };
};
