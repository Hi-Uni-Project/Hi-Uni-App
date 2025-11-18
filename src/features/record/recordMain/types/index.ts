export interface RecordOverviewResponse {
  localDateTime: string;
  responseCode: number;
  statusCode: string;
  message: string;
  data: {
    title: string;
    coverLetters: {
      question: string;
      answer: string;
    }[];
    imageUrl: string;
  };
}
