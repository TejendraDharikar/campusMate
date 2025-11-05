import { useQuery } from "@tanstack/react-query";
import {
  fetchAllStudentGrades,
  fetchGradeById,
  fetchStudentGrades,
  gradeByCourse,
} from "../services/gradeService";
import { useSearchParams } from "react-router-dom";

export const useStudentGrades = (student_id) => {
  return useQuery({
    queryKey: ["studentgrade", student_id],
    queryFn: () => fetchStudentGrades(student_id),
    enabled: !!student_id,
    onError: (err) => {
      console.error("failed to fetch student courses", err);
    },
  });
};


export const useGradeByCourse=(courseId)=>{
  

  return useQuery({
    queryKey:["gradebycourse",courseId],
    queryFn:()=>gradeByCourse(courseId),
    enabled:!!courseId,
     onError: (err) => {
      console.error("failed to fetch grade by courseID in hooks", err);
    },
  })
}


export const useGradeById = (grade_id) => {
  return useQuery({
    queryKey: ["gradeById", grade_id],
    queryFn: () => fetchGradeById(grade_id),
    enabled: !!grade_id,
    onError: (err) => {
      console.error("failed to fetch grade by ID in hooks", err);
    },
  });
};

export const useAllStudentGrades = (teacher_id) => {
  return useQuery({
    queryKey: ["allStudentGrades", teacher_id],
    queryFn: () => fetchAllStudentGrades(teacher_id),
    enabled: !!teacher_id,
    onError: (err) => {
      console.error("failed to fetch all student grades", err);
      console.log("hook data:", teacher_id);
    },
  });
};
