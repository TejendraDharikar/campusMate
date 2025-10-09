import { getCourses } from "../services/courseService"
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