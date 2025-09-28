export interface ResponseType<T = unknown> {
  data: T;
  localDateTime: string;
  message: string;
  responseCode: number;
  statusCode: string;
}
