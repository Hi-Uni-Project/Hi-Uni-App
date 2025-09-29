import axios from 'axios';
import Config from 'react-native-config';

export const axiosInstance = axios.create({
  baseURL: Config.API_KEY,
  timeout: 60000,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
});

// accessToken Header interceptor
// axiosInstance.interceptors.request.use(
//   config => {
//     const accessToken = useUserStore.getState().accessToken;

//     console.log(accessToken);

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     console.log('axios config : ', config);

//     return config;
//   },

//   error => {
//     console.log('axios config : ', error);
//     return Promise.reject(error);
//   },
// );

// // accessToken 재발급 interceptor
// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const { refreshToken, setAccessToken, logout } = useUserStore.getState();

//     // 리프레시 토큰 만료 → 로그아웃 처리 -> MainStack에서 관리
//     if (error.response?.status === 1002) {
//       logout();
//       return Promise.reject(error);
//     }

//     // 액세스 토큰 만료 → 재발급
//     if (error.response?.status === 1001) {
//       try {
//         const res = await axiosInstance.post<ResponseTypes<Refresh>>(
//           '/auth/refresh',
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${refreshToken}`,
//             },
//           },
//         );

//         const newAccessToken = res.data.data.accessToken;

//         setAccessToken(newAccessToken);
//         error.config.headers.Authorization = `Bearer ${newAccessToken}`;

//         return axiosInstance.request(error.config);
//       } catch (refreshError) {
//         // 재발급 실패 → 로그아웃 처리
//         logout();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );
