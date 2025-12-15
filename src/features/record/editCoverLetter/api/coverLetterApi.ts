import {
  AiCoverLetterResponse,
  CoverLetter,
  CoverLetterResponse,
} from '../types/CoverLetterType';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const getCoverLetter = async (): Promise<CoverLetterResponse> => {
  const response = await axiosInstance.get('/cover-letter');

  console.log('getCoverLetter response:', response);
  return response.data;
};

export const generateCoverLetterByAI = async ({
  role,
  question,
}: {
  role: string;
  question: string;
}): Promise<AiCoverLetterResponse> => {
  const response = await axiosInstance.post('/cover-letter/ai-cover-letter', {
    role,
    question,
  });

  return response.data;
};

export const saveCoverLetter = async (data: CoverLetter[]) => {
  const response = await axiosInstance.post('/cover-letter', data);

  return response.data;
};

export const deleteCoverLetter = async (coverLetterId: number) => {
  const response = await axiosInstance.delete(`/cover-letter/${coverLetterId}`);

  return response.data;
};

export const getAiGenerateCount = async () => {
  const response = await axiosInstance.get(
    '/cover-letter/ai-cover-letter/remaining',
  );

  return response.data;
};
