import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteCoverLetter,
  generateCoverLetterByAI,
  saveCoverLetter,
} from '../api/coverLetterApi';
import {
  AiCoverLetterDataResponse,
  AiCoverLetterRequest,
  CoverLetter,
} from '../types/CoverLetterType';

const useCoverLetterMutation = () => {
  const queryClient = useQueryClient();

  const saveCoverLetterMutation = useMutation({
    mutationFn: (data: CoverLetter[]) => saveCoverLetter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coverLetter'] });
    },
    onError: error => {
      console.error('자기소개서 저장 실패:', error);
    },
  });

  const deleteCoverLetterMutation = useMutation({
    mutationFn: (coverLetterId: number) => deleteCoverLetter(coverLetterId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coverLetter'] });
    },
    onError: error => {
      console.error('자기소개서 삭제 실패:', error);
    },
  });

  const generateAiCoverLetterMutation = useMutation<
    AiCoverLetterDataResponse,
    Error,
    AiCoverLetterRequest
  >({
    mutationFn: ({ role, question }: AiCoverLetterRequest) =>
      generateCoverLetterByAI({ role, question }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coverLetter'] });
    },
    onError: error => {
      console.error('AI 자기소개서 생성 실패:', error);
    },
  });

  return {
    saveCoverLetter: saveCoverLetterMutation.mutate,
    saveCoverLetterAsync: saveCoverLetterMutation.mutateAsync,
    isSaving: saveCoverLetterMutation.isPending,
    saveError: saveCoverLetterMutation.error,
    isSaveSuccess: saveCoverLetterMutation.isSuccess,

    deleteCoverLetter: deleteCoverLetterMutation.mutate,
    deleteCoverLetterAsync: deleteCoverLetterMutation.mutateAsync,
    isDeleting: deleteCoverLetterMutation.isPending,
    deleteError: deleteCoverLetterMutation.error,
    isDeleteSuccess: deleteCoverLetterMutation.isSuccess,

    generateAiCoverLetter: generateAiCoverLetterMutation.mutate,
    generateAiCoverLetterAsync: generateAiCoverLetterMutation.mutateAsync,
    isGenerating: generateAiCoverLetterMutation.isPending,
    generateError: generateAiCoverLetterMutation.error,
    isGenerateSuccess: generateAiCoverLetterMutation.isSuccess,
    generatedAnswer: generateAiCoverLetterMutation.data?.answer,
  };
};

export default useCoverLetterMutation;
