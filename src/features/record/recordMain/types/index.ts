import { ResponseTypes } from '@/shared/api/types';

export interface RecordOverview {
  title: string;
  coverLetters: {
    question: string;
    answer: string;
  }[];
  imageUrl: string;
}

export type RecordOverviewResponse = ResponseTypes<RecordOverview>;
