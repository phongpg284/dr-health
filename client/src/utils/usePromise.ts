import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { useApi } from "./api";

type ResponseValueType<T> = null | AxiosResponse<T> | { error: AxiosResponse };

const usePromise = <ResponseType = unknown>(url: string, dependencies = []): [ResponseValueType<ResponseType>, boolean] => {
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
      .catch((error: AxiosResponse) => {
        setResponse({ error });
      })
      .finally(() => {
        setLoaded(true);
      });
  }, dependencies);

  return [response, loaded];
};

export default usePromise;
