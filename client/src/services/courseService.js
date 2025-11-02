import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const getAllCourses = async (teacher_id) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/courses/all`,{
      teacher_id,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch courses');
  }}


  export const getById = async (id)=>{
    try{
      const res = await axios.post(`${BASE_URL}/api/courses/byid`,{
        id:id,
      });
      return res.data;
    }catch (err){
      throw new Error(err.response?.data?.message ||'failed to fetch course by id')
    }
  }



export const getCourses = async (studentId) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/courses/student`,{
      student_id:studentId,
    });
    console.log("fetched successfully",res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch courses');
  }
};

export const addCourse = async (data) => {
  console.log("Adding course:", data);
  try {
    const res = await axios.post(`${BASE_URL}/api/courses/add`,data);
    console.log("added successfully",res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Course creation failed');
  }
};

export const updateCourse = async (id,student_id,course_id) => {
  console.log("sending to backend:",id,student_id,course_id);
  
  try {
    const res = await axios.patch(`${BASE_URL}api/courses/id=${id}`,{
id:id,
student_id:student_id,
course_id:course_id,
    });
    console.log("response from backend",res.data);
    
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Course update failed');
  }
};

export const deleteCourse = async (student_id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/courses/delete?student_id=${student_id}`);
    console.log("deleted successfully",res.data);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Course deletion failed');
  }
};
