import { useMutation } from '@tanstack/react-query';

import { generateAiAboutMe } from '../api/resumeApi';
import { AiAboutMeDataResponse } from '../types/responseType';

interface UseAiAboutMeMutationOptions {
  onSuccess?: (data: AiAboutMeDataResponse) => void;
  onError?: (error: Error, statusCode?: string) => void;
}

const useAiAboutMeMutation = (options?: UseAiAboutMeMutationOptions) => {
  const mutation = useMutation({
    mutationFn: generateAiAboutMe,
    onSuccess: data => {
      console.log('AI 내 소개 생성 성공:', data);
      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
      console.error('AI 내 소개 생성 실패:', error);
      console.error('Error response:', error?.response?.data);
      console.error('Error status:', error?.response?.status);
      console.error('Error message:', error?.message);

      const statusCode = error?.response?.data?.statusCode;
      options?.onError?.(error as Error, statusCode);
    },
  });

  return {
    generateAboutMe: mutation.mutate,
    isGenerating: mutation.isPending,
    generatedData: mutation.data,
    generateError: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export default useAiAboutMeMutation;
