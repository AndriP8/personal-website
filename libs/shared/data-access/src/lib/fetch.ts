import Axios, { AxiosRequestConfig } from 'axios';

type AxiosInstanceArgs = {
  token?: string;
  config?: AxiosRequestConfig<unknown>;
  externalUrl?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const axios = (params: AxiosInstanceArgs = {}) => {
  const { token, config, externalUrl } = params;

  const axiosInstance = Axios.create({
    baseURL: externalUrl ?? BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    ...config,
  });
  return axiosInstance;
};
