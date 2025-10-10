import { ResponseTypes } from '@/shared/api/types';

export interface MailSendRequest {
  email: string;
  univName: string;
}

export interface MailRes {
  authMailId: string;
}

export type MailSendResponse = ResponseTypes<MailRes>;
