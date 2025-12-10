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
      options?.onSuccess?.(data);
    },
    onError: (error: any) => {
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
