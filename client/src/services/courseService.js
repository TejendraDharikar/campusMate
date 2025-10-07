import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCourses = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/courses`);
    return res.data.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch courses');
  }
};

export const addCourse = async (courseData) => {
  try {
    const res = await axios.post(`${BASE_URL}api/courses`, courseData);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Course creation failed');
  }
};

export const updateCourse = async (id, courseData) => {
  try {
    const res = await axios.put(`${BASE_URL}api/courses/${id}`, courseData);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Course update failed');
  }
};

export const deleteCourse = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}api/courses/${id}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Course deletion failed');
  }
};
