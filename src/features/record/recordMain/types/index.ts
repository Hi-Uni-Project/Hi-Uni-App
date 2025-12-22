import { ResponseTypes } from '@/shared/api/types';

export interface RecordOverview {
  title: string | null;
  coverLetters: {
    question: string;
    answer: string;
  }[];
  imageUrl: string | null;
}

export type RecordOverviewResponse = ResponseTypes<RecordOverview>;
