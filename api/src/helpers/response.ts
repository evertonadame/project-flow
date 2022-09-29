import { ResponseDataDto } from './types/response.dto';

export const formatResponseData = <Type>(
  data: Type,
  success = true,
  description?: string | object,
  code = 1,
): ResponseDataDto<Type> => {
  return {
    data,
    success,
    code,
    description,
    ts: new Date().toISOString(),
  };
};
