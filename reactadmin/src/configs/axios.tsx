import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api/v1/', //cổng backend-url api
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'WithCredentials': true
//   }
// });

// axiosInstance.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     return Promise.reject(error);
//   }
// )


//chatfix 
// const axiosInstance = axios.create({
//     baseURL: 'http://127.0.0.1:8000/api/v1/',
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     }
// });

// axiosInstance.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;

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