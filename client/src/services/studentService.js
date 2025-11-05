import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const studentByCourse=async(courseId)=>{
     console.log("Sending to backend:", courseId);
  try{
    const res=await axios.post(`${BASE_URL}/api/student/bycourse?courseId=${courseId}`,{
      courseId:courseId
    })
    console.log("recieved from backend:",res.data);
    return res.data;
  }catch(err){
    throw new Error(err.response?.data?.message || "Register failed");
  }
}