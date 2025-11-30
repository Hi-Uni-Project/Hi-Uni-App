import { useState } from 'react';

import { PostType } from '../../shared/types/enum/postEnum';
import { getInitialFormData, ReviewFormData } from '../types';

export const useReviewTemplate = (selectedPostType: PostType | null) => {
  const [showCal, setShowCal] = useState(false);

  const formatDate = (date: Date) => {
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const [formData, setFormData] = useState<ReviewFormData>(
    getInitialFormData(selectedPostType),
  );

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const hasReviewContent = (): boolean => {
    return Object.entries(formData).some(([key, value]) => {
      if (key === 'startDate' || key === 'endDate') {
        return false;
      }
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      return false;
    });
  };

  const resetForm = () => {
    setFormData(getInitialFormData(selectedPostType));
  };

  const toggleCalendar = () => {
    setShowCal(prev => !prev);
  };

  const startDate =
    'startDate' in formData ? (formData as any).startDate : new Date();
  const endDate =
    'endDate' in formData ? (formData as any).endDate : new Date();

  return {
    // State
    showCal,
    formData,

    // Computed
    startDate,
    endDate,

    // Methods
    formatDate,
    updateField,
    resetForm,
    toggleCalendar,
    hasReviewContent,
  };
};

export default useReviewTemplate;
