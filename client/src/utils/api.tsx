/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createContext, useContext, useEffect } from "react";
import { AxiosError, AxiosInstance } from "axios";
import { useStore } from "react-redux";
import axiosInstance from "config/axios-config";
import { useAppDispatch } from "app/store";
import { logOut, updateToken } from "app/authSlice";
import { message } from "antd";

const ApiContext = createContext(axiosInstance);

const ApiProvider: React.FC<any> = ({ children }: any) => {
  const store = useStore();
  const dispatch = useAppDispatch();
  let refreshTokenRequest = null;

  const getnewAccessToken = async (instance: AxiosInstance, refreshToken: string): Promise<string> => {
    const state = store.getState();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { account } = state;
    return instance
      .get("/auth/refresh", {
        headers: {
          Authorization: "Bearer " + refreshToken,
        },
      })
      .then((res) => {
        dispatch(
          updateToken({
            id: account.id,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            email: account.email,
            role: account.role,
            roleId: account.roleId,
          })
        );
        return res.data.refreshToken;
      })
      .catch(() => {
        dispatch(logOut());
        message.error("Token expired! Please login again!", 4);
        window.location.replace("/");
      });
  };

  useEffect(() => {
    axiosInstance.interceptors.request.use(
      (config) => {
        const state = store.getState();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const { account } = state;
        const getAuthorizationHeader = () => `Bearer ${config.url === "/auth/refresh" ? account?.refreshToken : account?.accessToken}`;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        config.headers = {
          "Content-Type": "application/json",
          ...config.headers,
          Authorization: getAuthorizationHeader(),
        };

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError<{ message?: string }>) => {
        const originalConfig = error.config;
        const state = store.getState();
        //@ts-ignore
        const { account } = state;
        console.log(error.response);
        if (error.response.status === 401 && error.response?.data?.message === "Unauthorized" && originalConfig.url !== "/auth/refresh") {
          if (!refreshTokenRequest) {
            refreshTokenRequest = getnewAccessToken(axiosInstance, account.refreshToken).then((token) => {
              refreshTokenRequest = null;
              return token;
            });
          }
          return refreshTokenRequest
            .then(() => {
              return axiosInstance(originalConfig);
            })
            .catch((err: AxiosError) => Promise.reject(err));
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return <ApiContext.Provider value={axiosInstance}>{children}</ApiContext.Provider>;
};

const useApi = (): AxiosInstance => useContext(ApiContext);

export { ApiProvider, ApiContext, useApi };
