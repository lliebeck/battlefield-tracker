import { AxiosError } from "axios";
import { ApiErrorMessageObject } from "../lib/exceptions";

export const AxiosErrorToApiError = (
  axiosError: AxiosError
): ApiErrorMessageObject => {
  let message: ApiErrorMessageObject = {
    name: axiosError.name,
    status: axiosError.response?.status,
    path: axiosError.response?.config?.url,
    statusText: axiosError.response?.statusText,
    method: axiosError.config?.method,
  };
  return message;
};
