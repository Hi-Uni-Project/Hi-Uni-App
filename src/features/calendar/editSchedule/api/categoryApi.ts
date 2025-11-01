import { Category } from '../types/categoryTypes';

import { axiosInstance } from '@/shared/api/axiosInstance';
import { ResponseTypes } from '@/shared/api/types';

export type CategoryResponse = ResponseTypes<Category[]>;

const getCategories = async () => {
  const response = await axiosInstance.get('/schedules/categories');

  return response.data;
};

export { getCategories };
