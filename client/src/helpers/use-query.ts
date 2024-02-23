import { useCallback, useEffect, useState } from "react";
import useSWR, { SWRConfiguration } from "swr";
import { MaybeNull } from "./types";
import { useToken } from "./use-token";
import { FetcherData, fetcher } from "./fetcher";

type UseQueryOptions<T> = {
  shouldNavigateToNewKey?: boolean;
  secured?: boolean;
  initData?: T;
};

type UseQueryResponse<T> = {
  data: MaybeNull<T>;
  mutate: (optimisticData?: T) => void;
  isLoading: boolean;
  error: any;
  isValidating: boolean;
};

export const useQuery = <OutputInterface>(
  query: string | undefined | null,
  swrOptions?: SWRConfiguration,
  fetchOptions?: RequestInit,
  useQueryOptions?: UseQueryOptions<OutputInterface>
): UseQueryResponse<OutputInterface> => {
  // const router = useRouter()
  const { userToken, loading } = useToken();
  const { data, isLoading, error, isValidating, mutate } = useSWR<FetcherData<OutputInterface>>(
    useQueryOptions?.secured ? (userToken ? query : null) : query,
    (query: string) =>
      fetcher<OutputInterface>({
        url: query,
        method: "GET",
        ...(useQueryOptions?.secured && { userToken }),
        fetchReqConfig: fetchOptions,
      }),
    {
      ...swrOptions,
      refreshInterval: swrOptions?.refreshInterval || 120000,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      fallbackData: {
        statusCode: 200,
        code: "",
        message: "",
        data: useQueryOptions?.initData,
      },
    }
  );

  const mutateData = useCallback(
    async (optimisticData?: OutputInterface) => {
      await mutate(
        optimisticData
          ? {
              data: optimisticData,
              message: data?.message,
              code: data?.code,
              statusCode: data?.statusCode,
            }
          : undefined
      );
    },
    [mutate, data]
  );
  // useEffect(() => {
  //   if (useQueryOptions?.shouldNavigateToNewKey && query) {
  //     router.push(query, { scroll: true })
  //   }
  // }, [query, useQueryOptions?.shouldNavigateToNewKey, router])

  return {
    data: data?.data || null,
    mutate: mutateData,
    isLoading: useQueryOptions?.secured ? loading || isLoading : isLoading,
    error,
    isValidating,
  };
};
