import { ResponseTypes } from '@/shared/api/types';

export interface RegisterToken {
  accessToken: string;
  refreshToken: string;
}

export type RegisterResponse = ResponseTypes<RegisterToken>;
