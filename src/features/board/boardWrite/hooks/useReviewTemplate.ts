import { useState } from 'react';

// ReviewTemplate Form 데이터 타입 -> 템플릿 마다 다르기 때문에 수정
// 현재 인턴십 기준

export interface ReviewFormData {
  companyName: string; // 회사명 (필수)
  startDate: Date; // 시작일 (필수)
  endDate: Date; // 종료일 (필수)
  position: string; // 직무 (필수)
  tasks: string; // 담당했던 업무 (필수)
  learnings: string; // 실무에서 배운 점 (필수)
  feelings: string; // 느낀 점 (선택)
  additionalExperience: string; // 추가 경험 (선택)
}

// 필수 필드 타입
type RequiredFields =
  | 'companyName'
  | 'startDate'
  | 'endDate'
  | 'position'
  | 'tasks'
  | 'learnings';

export const useReviewTemplate = () => {
  const [showCal, setShowCal] = useState(false);

  const formatDate = (date: Date) => {
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const [formData, setFormData] = useState<ReviewFormData>({
    companyName: '',
    startDate: new Date(),
    endDate: (() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    })(),
    position: '',
    tasks: '',
    learnings: '',
    feelings: '',
    additionalExperience: '',
  });

  const updateField = <K extends keyof ReviewFormData>(
    field: K,
    value: ReviewFormData[K],
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateRequiredFields = (): boolean => {
    const requiredFields: RequiredFields[] = [
      'companyName',
      'startDate',
      'endDate',
      'position',
      'tasks',
      'learnings',
    ];

    return requiredFields.every(field => {
      const value = formData[field];
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      return value !== null && value !== undefined;
    });
  };

  const isFieldEmpty = (field: keyof ReviewFormData): boolean => {
    const value = formData[field];
    if (typeof value === 'string') {
      return value.trim() === '';
    }
    return value === null || value === undefined;
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      startDate: new Date(),
      endDate: (() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
      })(),
      position: '',
      tasks: '',
      learnings: '',
      feelings: '',
      additionalExperience: '',
    });
  };

  const toggleCalendar = () => {
    setShowCal(prev => !prev);
  };

  return {
    // State
    showCal,
    formData,

    // Computed
    startDate: formData.startDate,
    endDate: formData.endDate,

    // Methods
    formatDate,
    updateField,
    validateRequiredFields,
    isFieldEmpty,
    resetForm,
    toggleCalendar,
  };
};
