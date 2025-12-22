import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { generateAiAboutMe } from '../api/resumeApi';
import { AiAboutMeDataResponse } from '../types/responseType';

import { ResponseTypes } from '@/shared/api/types';

interface UseAiAboutMeMutationOptions {
  onSuccess?: (data: AiAboutMeDataResponse) => void;
  onError?: (error: AxiosError<ResponseTypes>, statusCode?: string) => void;
}

const useAiAboutMeMutation = (options?: UseAiAboutMeMutationOptions) => {
  const mutation = useMutation<
    AiAboutMeDataResponse,
    AxiosError<ResponseTypes>
  >({
    mutationFn: generateAiAboutMe,
    onSuccess: options?.onSuccess,
    onError: error => {
      options?.onError?.(error, error.response?.data?.statusCode);
    },
  });

  const statusCode = mutation.error?.response?.data?.statusCode;

  return {
    generateAboutMe: mutation.mutate,
    isGenerating: mutation.isPending,
    generatedData: mutation.data,
    generateError: mutation.error,
    statusCode,
    isSuccess: mutation.isSuccess,
    isPostNotFound: statusCode === '404',
    isQuotaExceeded: statusCode === '403',
    reset: mutation.reset,
  };
};

export default useAiAboutMeMutation;
