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

export const fetchRecentDonors = async () => {
  try {
    const response = await axiosInstance.get("/donor/recent");
    console.log("Recent Donors in api.js:", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/user/me");
    console.log("User Data in api.js:", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchDonors = async () => {
  try {
    const response = await axiosInstance.get("/donor/getAllDonors");
    console.log("Donors Data in api.js:", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addDonor = async (donorData) => {
  try {
    const response = await axiosInstance.post("/donor/addDonor", donorData);
    console.log("Add Donor response:", response);
    return response;
  } catch (error) {
    throw error;
  }
};


export const updateDonor = async (id, data) => {
  try {
    // Ensure amount is a number
    const updatedData = { ...data, amount: Number(data.amount) };
    console.log("Updated data: ", updatedData);
    console.log("type of amount: ",typeof(updatedData.amount))
    const response = await axiosInstance.put(
      `/donor/updateDonor/${id}`,
      updatedData
    );

    console.log("Update Donor response:", response);
    return response;
  } catch (error) {
    throw error;
  }
};


export const deleteDonor = async (id) => {
  try {
    const response = await axiosInstance.delete(`/donor/deleteDonor/${id}`);
    console.log("Delete Donor response:", response);
    return response;
  } catch (error) {
    throw error;
  }
};