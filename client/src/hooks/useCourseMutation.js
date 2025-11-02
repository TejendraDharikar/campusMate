import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCourse, deleteCourse, updateCourse } from "../services/courseService";

export const useCourseMutation = () => {
  const queryClient = useQueryClient(); 


  const addCourseMutation = useMutation({
    mutationFn:(data)=>{
      console.log("mutation data :",data);
      return addCourse(data)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({ 
        queryKey:["allStudentCourses"]
      });
      alert("Course added successfully");
    },
    onError: (error) => {
      console.error("Error adding course from mutation:", error);
      alert("Failed to add course");
    },
  })


  const update= useMutation({
    mutationFn:(data)=>{
      console.log("mutation data:",data);
      return updateCourse(data)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["allStudentCourses"]
      });
      alert("Course updated successfully");
    },
    onError:(error)=>{
      console.error("error updating course in mutation",error);
      alert("failed to update course")
    }
  })


  const deleteCourseMutation = useMutation({
    mutationFn: (student_id) => deleteCourse(student_id),
    onSuccess: () => {    
      queryClient.invalidateQueries({ queryKey: ["allStudentCourses"] });
      alert("Course enrollment deleted successfully");
    },
  });

  return {
    addCourse: addCourseMutation.mutate,
    updateCourse:update.mutate,
    deleteCourse: deleteCourseMutation.mutate,
  };
};