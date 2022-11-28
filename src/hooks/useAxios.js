import React from "react";
import useRefresh from "./useRefresh";
import { useDispatch, useSelector } from "react-redux";
import { privateAxios } from "../../utils/privateAxios";
import { useEffect } from "react";

const useAxios = () => {
  const refreshAccessToken = useRefresh();
  const setToken = useDispatch();
  const token = useSelector((state) => state.token.value);

  useEffect(() => {
    const responseInterceptor = privateAxios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        console.log(error);
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refreshAccessToken();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return privateAxios(prevRequest);
        }
        if (error?.response?.status === 403 && prevRequest?.sent) {
        }
        return Promise.reject(error);
      }
    );

    const requestInterceptor = privateAxios.interceptors.request.use(
      (config) => {
        if (!config?.headers?.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      privateAxios.interceptors.response.eject(responseInterceptor);
      privateAxios.interceptors.request.eject(requestInterceptor);
    };
  }, [setToken, refreshAccessToken]);
  return privateAxios;
};

export default useAxios;
