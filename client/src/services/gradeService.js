import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchStudentGrades = async (student_id) => {
  const res = await axios.post(`${BASE_URL}/api/grade/student`,{
      student_id,
    });
  return res.data;
};

export const fetchAllStudentGrades = async (user_id) => {
  const res = await axios.post(`${BASE_URL}/api/grade/all`,{
      teacher_id,
    });
  return res.data;
};

// export const addGrade = async (payload) => {
//   return axios.post(API_URL, {
//     action: 'store',
//     ...payload,
//   });
// };

// export const updateGrade = async (payload) => {
//   return axios.post(API_URL, {
//     action: 'update',
//     ...payload,
//   });
// };

// export const deleteGrade = async (grade_id) => {
//   return axios.get(`${API_URL}?action=destroy&grade_id=${grade_id}`);
// };
