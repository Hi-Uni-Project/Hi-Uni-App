import { RegisterResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';
import { RegisterFormData } from '@/shared/stores/register/types';

export const userRegisterApi = async (
  formData: RegisterFormData,
): Promise<RegisterResponse> => {
  const { tos, univ, social } = formData;
  const response = await axiosInstance.post<RegisterResponse>('/auth/signup', {
    tos,
    univ,
    social,
  });

  return response.data;
};
