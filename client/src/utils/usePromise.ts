import { useState, useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "./api";
import { get } from "lodash";

type ResponseValueType<T> = null | AxiosResponse<T> | { error: AxiosError };

const usePromise = <ResponseType = any>(url: string, dependencies = []): [ResponseType, boolean, ResponseValueType<ResponseType>] => {
  const [response, setResponse] = useState<ResponseValueType<ResponseType>>(null);
  const [loaded, setLoaded] = useState(false);
  const api = useApi();

  useEffect(() => {
    setLoaded(false);

    api
      .get(url)
      .then((result: AxiosResponse<ResponseType>) => {
        setResponse(result);
      })
      .catch((error: AxiosError) => {
        setResponse({ error });
      })
      .finally(() => {
        setLoaded(true);
      });
  }, dependencies);

  return [get(response, "data", {}), loaded, response];
};

export default usePromise;
