import { MailSendRequest, MailSendResponse } from '../types';

import { axiosInstance } from '@/shared/api/axiosInstance';

export const sendMailApi = async ({
  email,
  univName,
}: MailSendRequest): Promise<MailSendResponse> => {
  const response = await axiosInstance.post<MailSendResponse>('/mail/send', {
    email,
    univName,
  });

  return response.data;
};
