import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {},
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {

    console.log("baseurl",BASE_URL)
    const response = await axiosInstance.post("/user/register", userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/user/login", credentials);
    console.log("baseurl",BASE_URL)
    console.log("Login response:", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};
