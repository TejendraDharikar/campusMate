import { getAllCourses, getCourses } from "../services/courseService"
import {useQuery} from "@tanstack/react-query"

export const useStudentCourses =(studentId)=>{
  return useQuery({
    queryKey:["studentCourses",studentId],
    queryFn:()=>getCourses(studentId),
    enabled: !!studentId,
    onError :(err)=>{
      console.error("failed to fetch student courses",err);
      
    }
  })
}

export const useAllStudentCourses=(teacher_id)=>{
  return useQuery({
    queryKey:["allStudentCourses",teacher_id],
    queryFn:()=>getAllCourses(teacher_id),
     enabled: !!teacher_id,
  
  })
}