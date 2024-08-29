import axios from "axios";
import { baseURL } from "./constants";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Request interceptor for Bearer Auth
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers["Authorization"]) {
      config.headers["Authorization"] = null;
    }
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for 401 and 403
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);
