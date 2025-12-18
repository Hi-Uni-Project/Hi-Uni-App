import {
  CreateExperienceReviewRequest,
  CreateInternshipReviewRequest,
  CreateInterviewReviewRequest,
  CreateJobReviewRequest,
  CreateLicenseReviewRequest,
  CreateReviewPostRequest,
} from '../types';

import {
  InternshipFormData,
  InterviewFormData,
  JobFormData,
  LicenseFormData,
  ReviewFormData,
  WorkStoryFormData,
} from '@/features/board/boardWrite/types';
import { PostType } from '@/features/board/shared/types/enum/postEnum';
import { formatDateTime } from '@/shared/utils/formatter';

export const convertReviewFormToRequest = (
  title: string,
  type: PostType,
  formData: ReviewFormData,
): CreateReviewPostRequest => {
  switch (type) {
    case 'JOB': {
      const data = formData as JobFormData;
      const request: CreateJobReviewRequest = {
        title,
        content: data.feelings || '',
        type: 'JOB',
        companyName: data.companyName,
        appliedPosition: data.position,
        applyMethod: data.applicationMethod,
        interviewQuestions: data.focusArea,
        preparation: data.preparation,
        result: data.result,
        feelings: data.feelings,
        additional: data.additionalExperience || undefined,
      };
      return request;
    }

    case 'INTERNSHIP': {
      const data = formData as InternshipFormData;
      const request: CreateInternshipReviewRequest = {
        title,
        content: data.feelings || '',
        type: 'INTERNSHIP',
        companyName: data.companyName,
        department: data.position,
        tasks: data.tasks,
        learned: data.learnings,
        feelings: data.feelings,
        additional: data.additionalExperience || undefined,
        startDate: formatDateTime(data.startDate),
        endDate: formatDateTime(data.endDate),
      };
      return request;
    }

    case 'INTERVIEW': {
      const data = formData as InterviewFormData;
      const request: CreateInterviewReviewRequest = {
        title,
        content: data.feelings || '',
        type: 'INTERVIEW',
        companyName: data.companyName,
        appliedPosition: data.position,
        interviewFormat: data.interviewType,
        interviewQuestions: data.questions,
        preparation: data.answerPreparation,
        atmosphere: data.atmosphere,
        feelings: data.feelings,
        additional: data.additionalExperience || undefined,
      };
      return request;
    }

    case 'EXPERIENCE': {
      const data = formData as WorkStoryFormData;
      const request: CreateExperienceReviewRequest = {
        title,
        content: data.feelings || '',
        type: 'EXPERIENCE',
        organizationName: data.companyName,
        position: data.position,
        positionRank: data.jobLevel,
        whatWork: data.tasks,
        requiredSkills: data.requiredSkills,
        feelings: data.feelings,
        additional: data.additionalExperience || undefined,
        startDate: formatDateTime(data.startDate),
        endDate: formatDateTime(data.endDate),
      };
      return request;
    }

    case 'LICENSE': {
      const data = formData as LicenseFormData;
      const request: CreateLicenseReviewRequest = {
        title,
        content: data.feelings || '',
        type: 'LICENSE',
        certificationName: data.licenseName,
        prepDuration: data.preparationPeriod,
        materials: data.materials,
        difficulty: data.difficulty,
        studyMethod: data.studyMethod,
        tips: data.tips,
        feelings: data.feelings,
        additional: data.additionalExperience || undefined,
      };
      return request;
    }

    default:
      throw new Error(`Unsupported post type: ${type}`);
  }
};
