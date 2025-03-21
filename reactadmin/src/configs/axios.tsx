import axios from "axios";

axios.interceptors.request.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
)
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export default axios;