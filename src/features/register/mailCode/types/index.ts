import { ResponseTypes } from '@/shared/api/types';

export interface CodeSendRequest {
  authCode: string;
  authMailId: string;
}

export type CodeSendResponse = ResponseTypes;
