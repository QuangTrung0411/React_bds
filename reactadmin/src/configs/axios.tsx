import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const baseURL = 'http://127.0.0.1:8000/api/v1/';

const apiCall: AxiosInstance = axios.create({
  baseURL: baseURL,
  // baseURL: 'http://127.0.0.1:8000/api/v1/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

const refreshToken = async () => {

  try {
    const response = await apiCall.post('auth/refresh');
    console.log(response);


  } catch (error) {



    throw new Error('không thể khởi tạo access token');
  }
}

axios.interceptors.response.use(
  response => {
    return response;
  },
  async (error) => {

    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        return apiCall(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }

    }

    return Promise.reject(error);
  }
)
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseURL;
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export default axios;