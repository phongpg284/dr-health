import { MaybeNull, UserToken } from "./types";

type GetAccessTokenResponse = {
  accessToken: string;
};

type FetcherParams<B> = {
  url: string;
  body?: B;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  userToken?: MaybeNull<UserToken>;
  onNewTokenSuccess?: (token: string) => void;
  onNewTokenError?: (token: string) => void;
  fetchReqConfig?: RequestInit;
};

export type FetcherData<T> = {
  message?: string;
  code?: string;
  statusCode?: number;
  data?: T;
};

const baseURL = process.env.REACT_APP_SERVER_URL;

const processFetchRequest = async <B = any>({ url, method = "GET", body, userToken, fetchReqConfig }: FetcherParams<B>) => {
  const response = await fetch(`${baseURL}/${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(userToken && { Authorization: `Bearer ${userToken.accessToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    ...fetchReqConfig,
  });

  return response;
};

export const fetcher = async <T, B = any>({
  url,
  method = "GET",
  body,
  userToken,
  fetchReqConfig,
  onNewTokenSuccess,
  onNewTokenError,
}: FetcherParams<B>): Promise<FetcherData<T>> => {
  // let response: Response;
  // let data: any;

  const response = await processFetchRequest<B>({
    url,
    method,
    body,
    userToken,
    fetchReqConfig,
  });
  const data = await response.json();

  return {
    message: data?.message,
    statusCode: response?.status,
    data,
  };
};
