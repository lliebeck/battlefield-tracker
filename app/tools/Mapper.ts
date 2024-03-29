import { AxiosError } from "axios";
import { ApiErrorMessageObject } from "../lib/exceptions";

export const AxiosErrorToApiError = (
  axiosError: AxiosError
): ApiErrorMessageObject => {
  const config = axiosError.config;

  const path = `
      ${config?.baseURL}
      ${config?.url?.substring(1, config?.url?.length - 1)}?
      ${new URLSearchParams(config?.params)}
    `;

  let message: ApiErrorMessageObject = {
    name: axiosError.name,
    status: axiosError.response?.status,
    path: path,
    statusText: axiosError.response?.statusText,
    method: config?.method,
  };
  return message;
};
