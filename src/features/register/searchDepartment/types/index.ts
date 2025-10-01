import { ResponseTypes } from '@/shared/api/types';

export interface DepartmentListRequest {
  univName: string;
}

export interface Department {
  univName: string;
  majorName: string;
  collegeName: string;
}

export interface DepartmentSearch {
  data: Department[];
}

export type DepartmentListResponse = ResponseTypes<DepartmentSearch>;
