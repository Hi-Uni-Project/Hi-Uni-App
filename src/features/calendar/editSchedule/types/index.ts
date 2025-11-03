import { Category } from '@/shared/types/categoryType';

export interface ScheduleUpdateRequest {
  startDate: string;
  endDate: string;
  categoryId: number;
  detail: string;
  memo: string;
}

export interface ScheduleCreateRequest extends ScheduleUpdateRequest {}

export interface ScheduleEditForm {
  id: number | null;
  startDate: Date;
  endDate: Date;
  category: Category | null;
  detail: string;
  memo: string;
}
