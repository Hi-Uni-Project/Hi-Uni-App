import { ResponseTypes } from '@/shared/api/types';

export interface UnivSearchRequest {
  keyword: string;
}

export interface University {
  univName: string;
  univTypeName: string;
  websiteUrl: string;
}

export interface UnivSearch {
  data: University[];
}

export type UnivSearchResponse = ResponseTypes<UnivSearch>;
