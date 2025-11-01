import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGrade, deleteGrade, updateGrade } from "../services/gradeService";

export const useGradeMutations = (teacher_id)=>{
  const queryClient = useQueryClient();


  const add=useMutation({
    mutationFn:(data)=>{
      console.log("MutationFn received:",data);
      return addGrade(data);
    },
      
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["allStudentGrades"] });
      alert("Grade added successfully on mutation");
    },
    onError: (error) => {
      console.error("Error adding grade:", error);
      alert("Failed to add grade");
    }, 
  })


  const update=useMutation({
    mutationFn:({grade_id,grade,remarks})=>updateGrade(grade_id,grade,remarks),
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["allStudentGrades"] });
      alert("Grade updated successfully");
    },
    onError: (error) => {
      alert("Failed to update grade");
    },
  })


  const remove = useMutation({
    mutationFn: (grade_id) => deleteGrade(grade_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allStudentGrades"] });
      alert("Grade deleted successfully");
    },
  });
   
  return {
    addGrade: add.mutate,
    updateGrade: update.mutate,
    deleteGrade: remove.mutate,
  };
}
