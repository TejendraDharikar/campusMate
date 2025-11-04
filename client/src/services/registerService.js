import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (formData) => {

  
  try {
    const res = await axios.post(`${BASE_URL}/api/register`, formData);
    console.log("data in service :",res.data);
    
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Register failed");
  }
};
