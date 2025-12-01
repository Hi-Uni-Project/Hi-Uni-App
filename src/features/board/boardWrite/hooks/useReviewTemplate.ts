import { useState } from 'react';

import { PostType } from '../../shared/types/enum/postEnum';
import {
  getInitialFormData,
  InternshipFormData,
  InterviewFormData,
  JobFormData,
  LicenseFormData,
  ReviewFormData,
  WorkStoryFormData,
} from '../types';

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

  const validateRequiredFields = (): boolean => {
    if (!selectedPostType) {
      return false;
    }

    const isCorrectType = () => {
      switch (selectedPostType) {
        case 'INTERNSHIP':
          return 'learnings' in formData && 'startDate' in formData;
        case 'JOB':
          return 'applicationMethod' in formData;
        case 'INTERVIEW':
          return 'interviewType' in formData;
        case 'EXPERIENCE':
          return 'jobLevel' in formData && 'startDate' in formData;
        case 'LICENSE':
          return 'licenseName' in formData;
        default:
          return false;
      }
    };

    if (!isCorrectType()) {
      return false;
    }

    switch (selectedPostType) {
      case 'INTERNSHIP': {
        const data = formData as InternshipFormData;
        return !!(
          data.companyName?.trim() &&
          data.startDate &&
          data.endDate &&
          data.position?.trim() &&
          data.tasks?.trim() &&
          data.learnings?.trim()
        );
      }

      case 'JOB': {
        const data = formData as JobFormData;
        return !!(
          data.companyName?.trim() &&
          data.position?.trim() &&
          data.applicationMethod?.trim() &&
          data.focusArea?.trim() &&
          data.preparation?.trim() &&
          data.result?.trim()
        );
      }

      case 'INTERVIEW': {
        const data = formData as InterviewFormData;
        return !!(
          data.companyName?.trim() &&
          data.position?.trim() &&
          data.interviewType?.trim() &&
          data.questions?.trim() &&
          data.answerPreparation?.trim() &&
          data.atmosphere?.trim()
        );
      }

      case 'EXPERIENCE': {
        const data = formData as WorkStoryFormData;
        return !!(
          data.companyName?.trim() &&
          data.startDate &&
          data.endDate &&
          data.position?.trim() &&
          data.jobLevel?.trim() &&
          data.tasks?.trim() &&
          data.requiredSkills?.trim()
        );
      }

      case 'LICENSE': {
        const data = formData as LicenseFormData;
        return !!(
          data.licenseName?.trim() &&
          data.preparationPeriod?.trim() &&
          data.materials?.trim() &&
          data.difficulty?.trim() &&
          data.studyMethod?.trim() &&
          data.tips?.trim()
        );
      }

      default:
        return false;
    }
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
    validateRequiredFields,
  };
};

export default useReviewTemplate;
