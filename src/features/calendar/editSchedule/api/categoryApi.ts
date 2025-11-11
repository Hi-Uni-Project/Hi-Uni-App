import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';
import { Category } from '@/shared/types/categoryType';

export type CategoryResponse = ResponseTypes<Category[]>;

const getCategories = async () => {
  const response = await axiosInstance.get('/schedules/categories');

  return response.data;
};

export { getCategories };
