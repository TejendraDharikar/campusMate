import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGrade, deleteGrade } from "../services/gradeService";

export const useGradeMutations = (teacher_id)=>{
  const queryClient = useQueryClient();


  const add=useMutation({
    mutationFn:(data)=>{
      console.log("MutationFn received:",data);
      return addGrade(data);
    },
      
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["allStudentGrades", teacher_id] });
      alert("Grade added successfully on mutation");
    },
    onError: (error) => {
      console.error("Error adding grade:", error);
      alert("Failed to add grade");
    }, 
  })


  const remove = useMutation({
    mutationFn: (grade_id) => deleteGrade(grade_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStudentGrades", teacher_id] });
      alert("Grade deleted successfully");
    },
  });
   
  return {
    addGrade: add.mutate,
    deleteGrade: remove.mutate,
  };
}
