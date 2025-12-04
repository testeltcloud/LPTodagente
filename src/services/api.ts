import axios from 'axios';
import type { AxiosInstance } from 'axios';


const url = import.meta.env.VITE_API_URL;

export function setupApiClient(): AxiosInstance {
  const api = axios.create({
    baseURL: url,
  });

  api.interceptors.request.use(async (config) => {
    // const token = getCookieJWT();

    // if (token && token !== null) {
    //   if (config.headers) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    // }
    return config;
  });

  api.interceptors.response.use(
    (response) => Promise.resolve(response),
    async (error) => {
      if (error.response && error.response.status === 401 && error.response.data) {
        await {}
      }
      else if (error.response && error.response.status === 432 && error.response.data) {
        // signOutNotRedirect();
      }
      else if (error.response && error.response.status === 403 && error.response.data) {

        // redirectToNoAuth();
      }

      if (!error.response || !error.response.status) {
        return Promise.reject({
          status: 'offline',
          message: 'A aplicação está em manutenção no momento, tente novamente mais tarde'
        });
      }

      return Promise.reject(error.response.data);
    },
  );

  return api;
}
