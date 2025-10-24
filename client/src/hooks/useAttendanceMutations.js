import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAttendance, deleteAttendance, updateAttendance } from "../services/attendanceService";

export const useAttendanceMutations = (studentId)=>{
  const queryClient = useQueryClient();

  const add = useMutation({
    mutationFn: ({studentId, courseId, date, status }) =>
      addAttendance(studentId, courseId, date, status),
    onSuccess: (data,variables) => {
      const { studentId, courseId, date, status } = variables;
      console.log("hook data:",studentId, courseId, date, status);
      queryClient.invalidateQueries({ queryKey: ["attendance", studentId] });

      alert("Attendance added successfully");
      
    },
    onError: (error) => {
    console.error("Error adding attendance:", error);
    alert("Failed to add attendance. Please try again.");
  },

  });

  const update = useMutation({
    mutationFn: ({ id, status }) => updateAttendance(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance", studentId] });
    },
  });

  const remove = useMutation({
    mutationFn: (id) => deleteAttendance(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance", studentId] });
    },
  });

  return {
    addAttendance:add.mutate,
    updateAttendance: update.mutate,
    deleteAttendance: remove.mutate,
  };

};