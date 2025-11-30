import { PostType } from '@/features/board/shared/types/enum/postEnum';

export type ModalState =
  | { type: 'none' }
  | { type: 'exit' }
  | { type: 'changeToReview' }
  | { type: 'dropdown' }
  | { type: 'optionSheet' }
  | { type: 'optionChange' };

export interface InternshipFormData {
  companyName: string;
  startDate: Date;
  endDate: Date;
  position: string;
  tasks: string;
  learnings: string;
  feelings: string;
  additionalExperience: string;
}

export interface JobFormData {
  companyName: string;
  position: string;
  applicationMethod: string;
  focusArea: string;
  preparation: string;
  result: string;
  feelings: string;
  additionalExperience: string;
}

export interface InterviewFormData {
  companyName: string;
  position: string;
  interviewType: string;
  questions: string;
  answerPreparation: string;
  atmosphere: string;
  feelings: string;
  additionalExperience: string;
}

export interface WorkStoryFormData {
  companyName: string;
  startDate: Date;
  endDate: Date;
  position: string;
  jobLevel: string;
  tasks: string;
  requiredSkills: string;
  feelings: string;
  additionalExperience: string;
}

export interface LicenseFormData {
  licenseName: string;
  preparationPeriod: string;
  materials: string;
  difficulty: string;
  studyMethod: string;
  tips: string;
  feelings: string;
  additionalExperience: string;
}

export type ReviewFormData =
  | InternshipFormData
  | JobFormData
  | InterviewFormData
  | WorkStoryFormData
  | LicenseFormData;

export const getInitialFormData = (
  postType: PostType | null,
): ReviewFormData => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  switch (postType) {
    case 'INTERNSHIP':
      return {
        companyName: '',
        startDate: new Date(),
        endDate: tomorrow,
        position: '',
        tasks: '',
        learnings: '',
        feelings: '',
        additionalExperience: '',
      } as InternshipFormData;

    case 'JOB':
      return {
        companyName: '',
        position: '',
        applicationMethod: '',
        focusArea: '',
        preparation: '',
        result: '',
        feelings: '',
        additionalExperience: '',
      } as JobFormData;

    case 'INTERVIEW':
      return {
        companyName: '',
        position: '',
        interviewType: '',
        questions: '',
        answerPreparation: '',
        atmosphere: '',
        feelings: '',
        additionalExperience: '',
      } as InterviewFormData;

    case 'EXPERIENCE':
      return {
        companyName: '',
        startDate: new Date(),
        endDate: tomorrow,
        position: '',
        jobLevel: '',
        tasks: '',
        requiredSkills: '',
        feelings: '',
        additionalExperience: '',
      } as WorkStoryFormData;

    case 'LICENSE':
      return {
        licenseName: '',
        preparationPeriod: '',
        materials: '',
        difficulty: '',
        studyMethod: '',
        tips: '',
        feelings: '',
        additionalExperience: '',
      } as LicenseFormData;

    default:
      return {
        companyName: '',
        startDate: new Date(),
        endDate: tomorrow,
        position: '',
        tasks: '',
        learnings: '',
        feelings: '',
        additionalExperience: '',
      } as InternshipFormData;
  }
};
