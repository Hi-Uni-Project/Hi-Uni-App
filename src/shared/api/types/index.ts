export interface ResponseTypes<T = unknown> {
  data: T;
  localDateTime: string;
  message: string;
  responseCode: number;
  statusCode: string;
}

export interface Refresh {
  accessToken: string;
}
