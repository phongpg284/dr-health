import React, { createContext, useContext, useEffect } from "react";
import { AxiosInstance } from "axios";
import { useStore } from "react-redux";
import axiosInstance from "config/axios-config";

const ApiContext = createContext(axiosInstance);

const ApiProvider: React.FC = ({ children }) => {
  const store = useStore();

  useEffect(() => {
    axiosInstance.interceptors.request.use(
      (config) => {
        const state = store.getState();
        const {
          global_reducer: {
            current_user: { attributes },
          },
        } = state;

        config.headers = {
          "Content-Type": "application/json",
          ...config.headers,
          "access-token": attributes["access-token"],
          client: attributes.client,
          uid: attributes.uid,
        };

        if (attributes["jwt-token"]) {
          config.headers.Authorization = `Bearer ${attributes["jwt-token"]}`;
        }

        const segmentAID = localStorage.getItem("ajs_anonymous_id");

        if (segmentAID) {
          config.headers["X-AnonymousId"] = segmentAID.replace(/['"]+/g, "");
        }

        return config;
      },
      (error) => {
        throw error;
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
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
