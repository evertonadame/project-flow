export type ResponseDataDto<T> = {
  data: T;
  success: boolean;
  code: number;
  description?: string | object;
  ts: string;
};
