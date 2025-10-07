import axios from 'axios';
import Login from '../pages/other-pages/Login';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async ({ email, password}) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/login`, { email, password});
     console.log("Backend response:", res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Login failed');
  }
};
