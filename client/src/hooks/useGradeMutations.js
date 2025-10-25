import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGrade } from "../services/gradeService";

export const useGradeMutations = (teacher_id)=>{
  const queryClient = useQueryClient();

  const remove = useMutation({
    mutationFn: (grade_id) => deleteGrade(grade_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStudentGrades", teacher_id] });
      alert("Grade deleted successfully");
    },
  });
   
  return {
    deleteGrade: remove.mutate,
  };
}
