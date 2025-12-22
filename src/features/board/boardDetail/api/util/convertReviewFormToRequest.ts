import { CreateReviewPostRequest } from '../types';

import {
  InternshipFormData,
  InterviewFormData,
  JobFormData,
  LicenseFormData,
  ReviewFormData,
  WorkStoryFormData,
} from '@/features/board/boardWrite/types';
import { PostType } from '@/features/board/shared/types/enum/postEnum';

const formatToISO = (date: Date): string => {
  return date.toISOString();
};

export const convertReviewFormToRequest = (
  title: string,
  type: PostType,
  formData: ReviewFormData,
): CreateReviewPostRequest => {
  switch (type) {
    case 'JOB': {
      const data = formData as JobFormData;
      return {
        title,
        content: data.feelings || '',
        type,
        firstQuestion: data.companyName,
        secondQuestion: data.position,
        thirdQuestion: data.applicationMethod,
        fourthQuestion: data.focusArea,
        fifthQuestion: data.preparation,
        sixthQuestion: data.result,
        seventhQuestion: data.feelings,
        eighthQuestion: data.additionalExperience || '',
      };
    }

    case 'INTERNSHIP': {
      const data = formData as InternshipFormData;
      return {
        title,
        content: data.feelings || '',
        type,
        firstQuestion: data.companyName,
        secondQuestion: data.position,
        thirdQuestion: data.tasks,
        fourthQuestion: data.learnings,
        fifthQuestion: '',
        sixthQuestion: '',
        seventhQuestion: data.feelings,
        eighthQuestion: data.additionalExperience || '',
        startDate: formatToISO(data.startDate),
        endDate: formatToISO(data.endDate),
      };
    }

    case 'INTERVIEW': {
      const data = formData as InterviewFormData;
      return {
        title,
        content: data.feelings || '',
        type,
        firstQuestion: data.companyName,
        secondQuestion: data.position,
        thirdQuestion: data.interviewType,
        fourthQuestion: data.questions,
        fifthQuestion: data.answerPreparation,
        sixthQuestion: data.atmosphere,
        seventhQuestion: data.feelings,
        eighthQuestion: data.additionalExperience || '',
      };
    }

    case 'EXPERIENCE': {
      const data = formData as WorkStoryFormData;
      return {
        title,
        content: data.feelings || '',
        type,
        firstQuestion: data.companyName,
        secondQuestion: data.position,
        thirdQuestion: data.jobLevel,
        fourthQuestion: data.tasks,
        fifthQuestion: data.requiredSkills,
        sixthQuestion: '',
        seventhQuestion: data.feelings,
        eighthQuestion: data.additionalExperience || '',
        startDate: formatToISO(data.startDate),
        endDate: formatToISO(data.endDate),
      };
    }

    case 'LICENSE': {
      const data = formData as LicenseFormData;
      return {
        title,
        content: data.feelings || '',
        type,
        firstQuestion: data.licenseName,
        secondQuestion: data.preparationPeriod,
        thirdQuestion: data.materials,
        fourthQuestion: data.difficulty,
        fifthQuestion: data.studyMethod,
        sixthQuestion: data.tips,
        seventhQuestion: data.feelings,
        eighthQuestion: data.additionalExperience || '',
      };
    }
  }
};
