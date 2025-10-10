import { CodeSendRequest, CodeSendResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const validEmailCodeApi = async ({
  authCode,
  authMailId,
}: CodeSendRequest): Promise<CodeSendResponse> => {
  const response = await axiosInstance.post<CodeSendResponse>(
    '/mail/validate-code',
    {
      authCode,
      authMailId,
    },
  );

  return response.data;
};
