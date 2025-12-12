import {
  InternshipFormData,
  InterviewFormData,
  JobFormData,
  LicenseFormData,
  ReviewFormData,
  WorkStoryFormData,
} from '../../boardWrite/types';
import { PostType } from '../../shared/types/enum/postEnum';
import { CreateReviewPostRequest } from '../types';

import { formatDateTime } from '@/shared/utils/formatter';

export const convertReviewFormToRequest = (
  title: string,
  type: PostType,
  formData: ReviewFormData,
): CreateReviewPostRequest => {
  const request: CreateReviewPostRequest = {
    title,
    content: formData.feelings || '',
    type,
  };

  switch (type) {
    case 'INTERNSHIP': {
      const data = formData as InternshipFormData;
      request.firstQuestion = data.companyName;
      request.secondQuestion = formatDateTime(data.startDate);
      request.thirdQuestion = formatDateTime(data.endDate);
      request.fourthQuestion = data.position;
      request.fifthQuestion = data.tasks;
      request.sixthQuestion = data.learnings;
      request.seventhQuestion = data.additionalExperience;
      request.startDate = formatDateTime(data.startDate);
      request.endDate = formatDateTime(data.endDate);
      break;
    }

    case 'JOB': {
      const data = formData as JobFormData;
      request.firstQuestion = data.companyName;
      request.secondQuestion = data.position;
      request.thirdQuestion = data.applicationMethod;
      request.fourthQuestion = data.focusArea;
      request.fifthQuestion = data.preparation;
      request.sixthQuestion = data.result;
      request.seventhQuestion = data.additionalExperience;
      break;
    }

    case 'INTERVIEW': {
      const data = formData as InterviewFormData;
      request.firstQuestion = data.companyName;
      request.secondQuestion = data.position;
      request.thirdQuestion = data.interviewType;
      request.fourthQuestion = data.questions;
      request.fifthQuestion = data.answerPreparation;
      request.sixthQuestion = data.atmosphere;
      request.seventhQuestion = data.additionalExperience;
      break;
    }

    case 'EXPERIENCE': {
      const data = formData as WorkStoryFormData;
      request.firstQuestion = data.companyName;
      request.secondQuestion = formatDateTime(data.startDate);
      request.thirdQuestion = formatDateTime(data.endDate);
      request.fourthQuestion = data.position;
      request.fifthQuestion = data.jobLevel;
      request.sixthQuestion = data.tasks;
      request.seventhQuestion = data.requiredSkills;
      request.eighthQuestion = data.additionalExperience;
      request.startDate = formatDateTime(data.startDate);
      request.endDate = formatDateTime(data.endDate);
      break;
    }

    case 'LICENSE': {
      const data = formData as LicenseFormData;
      request.firstQuestion = data.licenseName;
      request.secondQuestion = data.preparationPeriod;
      request.thirdQuestion = data.materials;
      request.fourthQuestion = data.difficulty;
      request.fifthQuestion = data.studyMethod;
      request.sixthQuestion = data.tips;
      request.seventhQuestion = data.additionalExperience;
      break;
    }
  }

  return request;
};
