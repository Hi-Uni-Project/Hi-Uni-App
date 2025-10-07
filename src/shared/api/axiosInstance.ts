import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';

import { useUserStore } from '../stores/user';

import { Refresh, ResponseTypes } from './types';

export const axiosInstance = axios.create({
  baseURL: Config.API_KEY,
  timeout: 60000,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
});

// accessToken Header interceptor
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = useUserStore.getState().accessToken;

    console.log(accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.log('axios config : ', config);

    return config;
  },

  error => {
    console.log('axios config : ', error);
    return Promise.reject(error);
  },
);

// accessToken 재발급 interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError<ResponseTypes>) => {
    const { refreshToken, setAccessToken, logout } = useUserStore.getState();

    const code = error.response.data.responseCode;

    console.log('axios: ', code);

    // 리프레시 토큰 만료 → 로그아웃 처리 -> MainStack에서 관리
    if (code === 1002) {
      logout();
      return Promise.reject(error);
    }

    // 액세스 토큰 만료 → 재발급
    if (code === 1001) {
      try {
        const res = await axios.post<ResponseTypes<Refresh>>(
          `${Config.API_KEY}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        const newAccessToken = res.data.data.accessToken;

        setAccessToken(newAccessToken);
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance.request(error.config);
      } catch (refreshError) {
        // 재발급 실패 → 로그아웃 처리
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
