import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/', //cổng backend-url api
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.response.use(
  response => {
    return response.data ? response.data : response;
  },
  error => {
    return Promise.reject(error);
  }
)

export default axiosInstance;