import { IGenericErrorMessage } from './error';
export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
export type IGenericErrResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
