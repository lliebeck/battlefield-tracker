export class CustomApiError extends Error {
  constructor(message = "Failed to fetch data") {
    super(message);
    this.name = "CustomApiError";
    Object.setPrototypeOf(this, CustomApiError.prototype);
  }
}

export type ApiErrorMessageObject = {
  name: string;
  status: number | undefined;
  path: string | undefined;
  statusText: string | undefined;
  method: string | undefined;
};
