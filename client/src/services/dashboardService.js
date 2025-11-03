import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTeacherDashboardStats = async (teacher_id) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/dashboard/teacher`, {
      teacher_id: teacher_id,
    });
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message ||
        "failed to load dashboard data from services"
    );
  }
};
export const getStudentDashboardStats = async (student_id) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/dashboard/student`, {
      student_id: student_id,
    });
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message ||
        "failed to load dashboard data from services"
    );
  }
};
