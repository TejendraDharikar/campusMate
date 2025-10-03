import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async ({ name, email, password, role }) => {
  const res = await axios.post(`${BASE_URL}register.php`, { name, email, password, role });
  return res.data;
};