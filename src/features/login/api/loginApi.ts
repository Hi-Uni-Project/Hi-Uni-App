import { LoginRequest, LoginResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const loginApi = async ({
  authToken,
  provider,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/auth/social', {
    authToken,
    provider,
  });

  return response.data;
};
