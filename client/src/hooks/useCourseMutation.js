import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse } from "../services/courseService";

export const useCourseMutation = () => {
  const queryClient = useQueryClient(); 
  const deleteCourseMutation = useMutation({
    mutationFn: (student_id) => deleteCourse(student_id),
    onSuccess: () => {    
      queryClient.invalidateQueries({ queryKey: ["allStudentCourses"] });
      alert("Course enrollment deleted successfully");
    },
  });

  return {
    deleteCourse: deleteCourseMutation.mutate,
  };
};