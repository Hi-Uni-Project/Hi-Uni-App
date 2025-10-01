import { DepartmentListRequest, DepartmentListResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const getDepartmentListApi = async ({
  univName,
}: DepartmentListRequest): Promise<DepartmentListResponse> => {
  const response = await axiosInstance.get<DepartmentListResponse>(
    `/majors/${encodeURIComponent(univName)}`,
  );

  return response.data;
};
