import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Asset } from 'react-native-image-picker';

import { postResume } from '../api/resumeApi';
import { ResumeUpdateRequest } from '../types/requestType';

interface ResumeSubmitParams {
  resumeData: ResumeUpdateRequest;
  photo: Asset | null;
}

const useResumeMutation = () => {
  const queryClient = useQueryClient();

  const submitResumeMutation = useMutation({
    mutationFn: ({ resumeData, photo }: ResumeSubmitParams) =>
      postResume({ resumeData, photo }),
    onSuccess: () => {
      console.log('이력서 저장 성공');
      queryClient.invalidateQueries({ queryKey: ['resumeData'] });
    },
    onError: error => {
      console.error('이력서 저장 실패:', error);
    },
  });

  return {
    submitResume: submitResumeMutation.mutate,
    isSubmitting: submitResumeMutation.isPending,
    submitError: submitResumeMutation.error,
    isSuccess: submitResumeMutation.isSuccess,
  };
};

export default useResumeMutation;
