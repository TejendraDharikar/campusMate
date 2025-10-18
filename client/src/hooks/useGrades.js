import { useQuery } from '@tanstack/react-query';
import { fetchAllStudentGrades, fetchStudentGrades } from '../services/gradeService';


export const useStudentGrades = (student_id) => {
  return useQuery({
    queryKey:["studentgrade",student_id],
       queryFn:()=>fetchStudentGrades(student_id),
       enabled: !!student_id,
       onError :(err)=>{
         console.error("failed to fetch student courses",err);
         
       }
  });
};


export const useAllStudentGrades=(teacher_id)=>{
  return useQuery({
    queryKey:["allStudentGrades",teacher_id],
    queryFn:()=>fetchAllStudentGrades(teacher_id),
     enabled: !!teacher_id,
  
  })
}