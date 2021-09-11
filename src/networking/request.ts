import axios, { AxiosError } from 'axios';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestHeader {
  [key: string]: string;
}

interface CreateCustomErrorFunc<ErrorType> {
  (error: ErrorType): Error;
}

interface RequestOptions<Body, ErrorType> {
  method?: RequestMethod;
  headers?: RequestHeader;
  data?: Body;
  timeout?: number;
  createCustomError?: CreateCustomErrorFunc<ErrorType>;
}

function defaultCreateCustomError(error: AxiosError) {
  let customError: Error;

  if (error.response) {
    // Server responded, but not with 2xx
    customError = new Error(
      `Server responded with error: ${JSON.stringify(error)}`
    );
  } else if (error.request) {
    // Server did not respond
    customError = new Error('The server is not available.');
  } else {
    // Another error happened while setting up the request
    customError = new Error('A client error happened.');
  }

  return customError;
}

export async function request<Resource = unknown, Body = void>(
  url: string,
  options?: RequestOptions<Body, AxiosError>
) {
  const method = options?.method || 'GET';
  const headers = options?.headers;
  const data = options?.data;
  const timeout = options?.timeout || 0;
  const createCustomError =
    options?.createCustomError || defaultCreateCustomError;

  try {
    const response = await axios.request({
      url,
      method,
      headers,
      data,
      timeout,
    });

    return response.data as Resource;
  } catch (error) {
    return createCustomError(error as AxiosError);
  }
}
