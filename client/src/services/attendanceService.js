import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAttendance = async (studentId) => {
  try {
    const res = await axios.post(`${BASE_URL}api/attendance`, {
      student_id: studentId,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch attendance');
  }
};