import axios from "axios";

const request = axios.create({
  timeout: 10000,
});

// request interceptor
request.interceptors.request.use(
  (config) => {
    // do something before request is sent

    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  (response) => {
    // do something with response data

    return response.data;
  },
  (error) => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default request;
