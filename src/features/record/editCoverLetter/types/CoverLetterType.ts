import { ResponseTypes } from '@/shared/api/types';

export type CoverLetter =
  | {
      coverLetterId: number;
      tempId: null;
      question: string;
      answer: string;
    }
  | {
      coverLetterId: null;
      tempId: string;
      question: string;
      answer: string;
    };

export interface CoverLetterRequest {
  coverLetterId: number | null;
  question: string;
  answer: string;
}

export interface CoverLetterDataResponse {
  coverLetters: CoverLetter[];
  coverletterCnt: number;
}

export type CoverLetterResponse = ResponseTypes<CoverLetterRequest[]>;

export interface AiCoverLetterRequest {
  role: string;
  question: string;
}

export interface AiCoverLetterDataResponse {
  answer: string;
  coverletterCnt: number;
}

export type AiCoverLetterResponse = ResponseTypes<AiCoverLetterDataResponse>;
