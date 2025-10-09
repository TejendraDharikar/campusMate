import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAttendance = async (studentId) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/attendance/get`, {
      student_id: studentId,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch attendance');
  }
};


export const addAttendance = async (studentId,courseId,date,status)=>{
   try {
    const res = await axios.post(`${BASE_URL}/api/attendance/add`, {
      student_id: studentId,
      course_id: courseId,
      date: date,
      status: status,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to add attendance');
  }
};

export const updateAttendance = async (Id,status)=>{
   try {
    const res = await axios.put(`${BASE_URL}/api/attendance/update`, {
      id: Id,
      status: status,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to update attendance');
  }
};



export const deleteAttendance = async (Id)=>{
   try {
    const res = await axios.delete(`${BASE_URL}/api/attendance/delete?id=${Id}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to delete attendance');
  }
};