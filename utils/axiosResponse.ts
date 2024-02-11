import { AxiosResponse } from "axios";

export const createEmptyAxiosResponse = <T>(
  data?: T
): AxiosResponse<T, any> | undefined => {
  if (!data) return;
  return {
    data: data,
    config: { headers: undefined as any },
    headers: {},
    status: 200,
    statusText: "",
    request: undefined,
  };
};
