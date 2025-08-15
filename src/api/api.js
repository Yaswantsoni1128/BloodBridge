import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {},
  withCredentials: true,
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

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/user/logout");
    console.log("Logout response:", response.data);
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


// ✅ Fetch hospital inventory
// export const fetchHospitalInventory = async () => {
//   const token = localStorage.getItem("token"); // get JWT
//   return await axios.get(`${BASE_URL}/inventory/getHospitalInventory`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
export const fetchHospitalInventory = async () => {
  try {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    console.log(user)
    const id = user._id;
    console.log(`/inventory/getHospitalInventory/${id}`)
    const response = await axiosInstance.get(`/inventory/getHospitalInventory/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// ✅ Update inventory units
export const updateInventoryUnits = async (id, bloodType, newUnits) => {
  const token = localStorage.getItem("token");
  return await axios.put(
    `${BASE_URL}/inventory/updateInventory/${id}`,
    { bloodType: bloodType, unitsAvailable: newUnits }, // both required
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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

export const createInventory = async (inventoryData) => {
  try {
    const response = await axiosInstance.post("/inventory/createInventory", inventoryData);
    console.log("Inventory added successfully:", response);
    return response;
  } catch (error) {
    throw error;
  }
};
