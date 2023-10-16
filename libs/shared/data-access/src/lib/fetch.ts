import Axios, { AxiosRequestConfig } from 'axios';

type AxiosInstanceArgs = {
  token?: string;
  config?: AxiosRequestConfig<unknown>;
  customUrl?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axios = (params: AxiosInstanceArgs = {}) => {
  const { token, config, customUrl } = params;

  const axiosInstance = Axios.create({
    baseURL: customUrl ?? BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    ...config,
  });
  return axiosInstance;
};
