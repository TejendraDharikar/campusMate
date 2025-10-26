import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchStudentGrades = async (student_id) => {
  const res = await axios.post(`${BASE_URL}/api/grade/student`,{
      student_id,
    });
  return res.data;
};

export const fetchAllStudentGrades = async (teacher_id) => {
  const res = await axios.post(`${BASE_URL}/api/grade/all`,{
      teacher_id,
    });
    console.log("fetch data:",teacher_id);
    
  return res.data;
};

export const addGrade = async ({student_id,course_id,grade,remarks})=>{
  console.log("sending to backend:",student_id,course_id,grade,remarks);
  
  try{
    const res =await axios.post(`${BASE_URL}/api/grade/add`,{
      student_id,
      course_id,
      grade,  
      remarks,
    });
    console.log("backend response:",res.data);
    
    return res.data;
  } catch (err) {
    throw new Error("Backend:",err.response?.data?.message || 'Failed to add grade');
  }
};



export const deleteGrade = async (grade_id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/grade/delete?grade_id=${grade_id}`);
    
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to delete grade');
  }
};


