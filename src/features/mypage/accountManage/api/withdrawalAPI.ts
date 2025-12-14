import { axiosInstance } from '@/shared/api/axiosInstance';

export const withdrawalAPI = async () => {
  const response = await axiosInstance.delete('/users/me');

  return response.data;
};
