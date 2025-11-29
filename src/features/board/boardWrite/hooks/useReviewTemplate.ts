import { useState } from 'react';

// ReviewTemplate Form 데이터 타입(인턴십 기준)
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
    setFormData(prev => {
      const updated = {
        ...prev,
        [field]: value,
      };
      console.log(`Field updated: ${field}`, value);
      console.log('Updated formData:', updated);
      return updated;
    });
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
    resetForm,
    toggleCalendar,
  };
};
