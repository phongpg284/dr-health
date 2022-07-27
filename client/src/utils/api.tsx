import React, { createContext, useContext, useEffect } from "react";
import { AxiosInstance } from "axios";
import { useStore } from "react-redux";
import axiosInstance from "config/axios-config";
import { useAppDispatch } from "app/store";
import { updateToken } from "app/authSlice";

const ApiContext = createContext(axiosInstance);

const ApiProvider: React.FC = ({ children }) => {
  const store = useStore();
  const dispatch = useAppDispatch();
  const state = store.getState();
  const { account } = state;

  const getnewAccessToken = (instance: AxiosInstance, refreshToken: string) => {
    return instance
      .post(
        "/auth/refresh",
        {},
        {
          headers: {
            Authorization: "Bearer " + refreshToken,
          },
        }
      )
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
      });
  };

  useEffect(() => {
    axiosInstance.interceptors.request.use(
      (config) => {
        config.headers = {
          "Content-Type": "application/json",
          ...config.headers,
          Authorization: "Bearer " + account.accessToken,
        };
        return config;
      },
      (error) => {
        throw error;
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        const { status, data } = response;
        if (status === 401 && data?.message === "Unauthorized") {
          getnewAccessToken(axiosInstance, account.refreshToken);
        }
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }, []);

  return <ApiContext.Provider value={axiosInstance}>{children}</ApiContext.Provider>;
};

// const withApi = (Component: React.ComponentType<{ api: AxiosInstance }>): React.FC => {
//   return (props) => {
//     const api = useContext(ApiContext);
//     return (
//       <Component {...props} api={api}>
//         {props.children}
//       </Component>
//     );
//   };
// };

const useApi = (): AxiosInstance => useContext(ApiContext);

export { ApiProvider, ApiContext, useApi };
